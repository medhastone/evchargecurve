import { ChargingCurvePoint, Vehicle } from '@/data/evModels';

export type CurveArchetype = 
  | 'auto'
  | '800v_sustained' 
  | '400v_steep' 
  | 'conservative_step' 
  | 'lfp_flat';

export interface SynthesisParams {
  usablePackKwh: number;
  maxChargeKw: number;
  architecture: '400V' | '800V' | '900V' | string;
  chemistry: 'NMC' | 'LFP' | 'NCA' | string;
  archetype?: CurveArchetype;
}

/**
 * Mathematically synthesizes a high-fidelity charging curve from core electrochemistry parameters
 */
export function synthesizeChargingCurve(params: SynthesisParams): ChargingCurvePoint[] {
  const { usablePackKwh, maxChargeKw, architecture, chemistry } = params;
  let archetype = params.archetype || 'auto';

  if (archetype === 'auto') {
    if (architecture === '800V' || architecture === '900V') {
      archetype = '800v_sustained';
    } else if (chemistry === 'LFP') {
      archetype = 'lfp_flat';
    } else if (maxChargeKw > usablePackKwh * 2.5) {
      archetype = '400v_steep'; // High C-rate on 400V requires steep thermal taper
    } else {
      archetype = 'conservative_step';
    }
  }

  const p = Math.max(10, maxChargeKw);

  // Default curve multiplier profiles at [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] % SOC
  let multipliers: number[] = [];

  switch (archetype) {
    case '800v_sustained':
      // Sustains 95-100% of peak power up to 55-60% SOC due to lower resistive heating
      multipliers = [0.65, 0.95, 1.0, 1.0, 0.98, 0.96, 0.82, 0.65, 0.48, 0.18, 0.04];
      break;

    case '400v_steep':
      // Fast early peak (10-25%), then aggressive exponential thermal taper
      multipliers = [0.45, 1.0, 1.0, 0.82, 0.65, 0.50, 0.35, 0.25, 0.18, 0.11, 0.02];
      break;

    case 'conservative_step':
      // Step-plateau design prioritizing battery longevity (Ford, VW, Toyota)
      multipliers = [0.55, 1.0, 1.0, 0.95, 0.85, 0.68, 0.52, 0.40, 0.30, 0.14, 0.04];
      break;

    case 'lfp_flat':
      // Flat voltage profile across 20-70%, stable thermal behavior, sharp taper at 90%+
      multipliers = [0.60, 1.0, 1.0, 0.98, 0.95, 0.90, 0.80, 0.65, 0.45, 0.22, 0.08];
      break;

    default:
      multipliers = [0.50, 1.0, 0.95, 0.85, 0.70, 0.55, 0.42, 0.32, 0.22, 0.12, 0.03];
  }

  const socs = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  return socs.map((soc, idx) => ({
    soc,
    kw: Math.max(5, Math.round(p * multipliers[idx]))
  }));
}

/**
 * Piecewise linear interpolation to calculate power at any integer SOC 0..100
 */
export function interpolateKwAtSoc(curve: ChargingCurvePoint[], targetSoc: number): number {
  if (!curve || curve.length === 0) return 0;
  
  const exact = curve.find(p => p.soc === targetSoc);
  if (exact) return exact.kw;
  
  const lower = [...curve].reverse().find(p => p.soc < targetSoc);
  const upper = curve.find(p => p.soc > targetSoc);
  
  if (!lower) return upper ? upper.kw : 0;
  if (!upper) return lower.kw;
  
  const ratio = (targetSoc - lower.soc) / (upper.soc - lower.soc);
  return Math.round(lower.kw + ratio * (upper.kw - lower.kw));
}

/**
 * Computes quick simulation benchmarks (10-80% duration, avg speed, 15-min added range)
 */
export function computeQuickBenchmarks(
  vehicle: Pick<Vehicle, 'usablePackKwh' | 'batteryCapacity' | 'epaRangeMiles' | 'curve'>
) {
  const packKwh = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;
  const rangeMiles = vehicle.epaRangeMiles || 300;
  const efficiency = rangeMiles / packKwh; // mi/kWh
  const curve = vehicle.curve || [];

  let totalMins10to80 = 0;
  let totalEnergy10to80 = (70 / 100) * packKwh;

  for (let s = 10; s < 80; s++) {
    const kw = Math.max(5, interpolateKwAtSoc(curve, s));
    const kwhStep = packKwh * 0.01;
    const mins = (kwhStep / kw) * 60;
    totalMins10to80 += mins;
  }

  const avgKw10to80 = totalMins10to80 > 0 ? (totalEnergy10to80 / (totalMins10to80 / 60)) : 0;

  // 15-min fast charge from 10% SOC
  let currentSoc = 10;
  let energyAdded15 = 0;
  for (let m = 0; m < 15; m++) {
    if (currentSoc >= 100) break;
    const kw = Math.max(5, interpolateKwAtSoc(curve, Math.floor(currentSoc)));
    const energyThisMin = kw / 60;
    energyAdded15 += energyThisMin;
    currentSoc += (energyThisMin / packKwh) * 100;
  }

  const milesAdded15Min = Math.round(energyAdded15 * efficiency);

  return {
    time10to80Minutes: Math.round(totalMins10to80),
    avgKw10to80: Math.round(avgKw10to80),
    milesAdded15Min,
    peakCRate: (Math.max(...curve.map(p => p.kw), 1) / packKwh).toFixed(2)
  };
}

/**
 * Intelligent parser for user telemetry, OBD2 CAN-bus logs, CSV, or formatted text
 */
export function parseTelemetryOrText(input: string): ChargingCurvePoint[] | null {
  if (!input || !input.trim()) return null;

  try {
    // Attempt 1: JSON array of {soc, kw}
    const parsedJson = JSON.parse(input);
    if (Array.isArray(parsedJson) && parsedJson.length >= 2) {
      const valid = parsedJson.map(item => ({
        soc: Number(item.soc ?? item.SOC ?? item.x),
        kw: Number(item.kw ?? item.KW ?? item.power ?? item.y)
      })).filter(p => !isNaN(p.soc) && !isNaN(p.kw));

      if (valid.length >= 2) {
        return normalizeCurvePoints(valid);
      }
    }
  } catch {
    // Not valid JSON, continue with text parsing
  }

  // Attempt 2: Key-value / CSV / TSV text parsing (e.g., "10: 250, 20: 230" or "10% -> 250kW")
  const lines = input.split(/[\n,;]+/);
  const extractedPoints: ChargingCurvePoint[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Matches formats like "10: 250", "10, 250", "10 250", "10% = 250kW", "SOC 10 -> 250 kW"
    const match = trimmed.match(/(\d{1,3})\s*[%:]?\s*[-=,:\s/|]+\s*(\d{1,4}(?:\.\d+)?)/);
    if (match) {
      const soc = parseInt(match[1], 10);
      const kw = parseFloat(match[2]);
      if (soc >= 0 && soc <= 100 && kw >= 0) {
        extractedPoints.push({ soc, kw: Math.round(kw) });
      }
    }
  }

  if (extractedPoints.length >= 2) {
    return normalizeCurvePoints(extractedPoints);
  }

  return null;
}

/**
 * Ensures curve points have standard 0% to 100% boundaries and ascending order
 */
export function normalizeCurvePoints(points: ChargingCurvePoint[]): ChargingCurvePoint[] {
  const sorted = [...points].sort((a, b) => a.soc - b.soc);

  // Deduplicate by SOC
  const map = new Map<number, number>();
  for (const p of sorted) {
    map.set(Math.min(100, Math.max(0, Math.round(p.soc))), Math.round(p.kw));
  }

  // Ensure standard intervals if needed
  const uniquePoints = Array.from(map.entries()).map(([soc, kw]) => ({ soc, kw }));

  if (!map.has(0)) {
    const first = uniquePoints[0];
    uniquePoints.unshift({ soc: 0, kw: Math.round(first.kw * 0.7) });
  }
  if (!map.has(100)) {
    uniquePoints.push({ soc: 100, kw: 5 });
  }

  return uniquePoints.sort((a, b) => a.soc - b.soc);
}
