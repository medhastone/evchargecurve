export interface CurvePoint {
  soc: number;
  kw: number;
}

export interface ChargingSessionResult {
  totalMinutes: number;
  avgKw: number;
  kwhAdded: number;
  sessionCost: number;
  chartData: Array<{
    soc: number;
    kw: number;
    active: boolean;
  }>;
}

/**
 * 1. Calculate DC Fast Charging Session
 */
export function calculateChargingSession(
  curvePoints: CurvePoint[],
  chargerMaxKw: number,
  startSoc: number,
  endSoc: number,
  packKwh: number,
  isColdWeather: boolean,
  userRatePerKwh: number = 0.40
): ChargingSessionResult {
  if (startSoc >= endSoc || startSoc < 0 || endSoc > 100 || packKwh <= 0 || chargerMaxKw <= 0) {
    throw new Error("Invalid parameters: Ensure 0 <= startSoc < endSoc <= 100 and valid pack/charger ratings.");
  }

  const sortedCurve = [...curvePoints].sort((a, b) => a.soc - b.soc);

  const getKwAtSoc = (soc: number): number => {
    if (sortedCurve.length === 0) return 0;
    if (soc <= sortedCurve[0].soc) return sortedCurve[0].kw;
    if (soc >= sortedCurve[sortedCurve.length - 1].soc) return sortedCurve[sortedCurve.length - 1].kw;

    for (let i = 0; i < sortedCurve.length - 1; i++) {
      const p1 = sortedCurve[i];
      const p2 = sortedCurve[i + 1];
      if (soc >= p1.soc && soc <= p2.soc) {
        if (p2.soc === p1.soc) return p1.kw;
        const fraction = (soc - p1.soc) / (p2.soc - p1.soc);
        return p1.kw + fraction * (p2.kw - p1.kw);
      }
    }
    return 0;
  };

  let totalMinutes = 0;
  let totalKwSum = 0;
  let stepCount = 0;
  let kwhAdded = 0;
  const chartData = [];

  let sessionSocCount = 0;

  for (let soc = 0; soc <= 100; soc++) {
    let rawKw = getKwAtSoc(soc);

    if (isColdWeather && soc >= startSoc && sessionSocCount < 15) {
      rawKw *= 0.60;
    }

    if (soc >= startSoc && soc < endSoc) {
      sessionSocCount++;
    }

    const cappedKw = Math.min(rawKw, chargerMaxKw);
    const active = soc >= startSoc && soc <= endSoc;

    chartData.push({
      soc,
      kw: Number(cappedKw.toFixed(1)),
      active
    });

    if (active && soc < endSoc) {
      const stepEnergyKwh = packKwh * 0.01;
      const stepTimeHours = cappedKw > 0 ? stepEnergyKwh / cappedKw : 0;
      totalMinutes += stepTimeHours * 60;
      kwhAdded += stepEnergyKwh;
      totalKwSum += cappedKw;
      stepCount++;
    }
  }

  const avgKw = stepCount > 0 ? totalKwSum / stepCount : 0;
  const sessionCost = kwhAdded * userRatePerKwh;

  return {
    totalMinutes: Number(totalMinutes.toFixed(1)),
    avgKw: Number(avgKw.toFixed(1)),
    kwhAdded: Number(kwhAdded.toFixed(2)),
    sessionCost: Number(sessionCost.toFixed(2)),
    chartData
  };
}

export interface DegradationResult {
  currentSohPct: number;
  remainingKwh: number;
  lostMiles: number;
  isUnderWarranty: boolean;
  projectionPoints: Array<{ year: number; sohPct: number; warrantyThreshold: number }>;
}

/**
 * 2. Non-Linear Battery Degradation
 */
export function calculateBatteryDegradation(
  chemistry: 'LFP' | 'NMC' | 'NCA',
  ageYears: number,
  mileageMiles: number,
  habit: 'ac_gentle' | 'mixed' | 'dc_heavy',
  originalCapacityKwh: number = 75,
  originalEpaRange: number = 300
): DegradationResult {
  if (ageYears < 0 || mileageMiles < 0) {
    throw new Error("Age and mileage must be non-negative.");
  }

  const alpha = chemistry === 'LFP' ? 1.5 : 2.5; 
  const beta = chemistry === 'LFP' ? 1.0 : 1.5;

  let habitPenalty = 0;
  if (habit === 'ac_gentle') habitPenalty = -1.5;
  if (habit === 'mixed') habitPenalty = 0;
  if (habit === 'dc_heavy') habitPenalty = 4.0;

  const calcSoh = (y: number, m: number, hab: number) => {
    let degradation = (alpha * Math.sqrt(y)) + (beta * (m / 10000)) + hab;
    if (degradation < 0) degradation = 0.5 * Math.sqrt(y); 
    return Math.max(0, Math.min(100, 100 - degradation));
  };

  const currentSohPct = calcSoh(ageYears, mileageMiles, habitPenalty);
  const remainingKwh = originalCapacityKwh * (currentSohPct / 100);
  const lostMiles = originalEpaRange * ((100 - currentSohPct) / 100);

  const isUnderWarranty = (ageYears <= 8 && mileageMiles <= 100000) && currentSohPct <= 70;

  const projectionPoints = [];
  const averageMilesPerYear = ageYears > 0 ? mileageMiles / ageYears : 12000;
  
  for (let y = 0; y <= 10; y++) {
    const projectedMiles = averageMilesPerYear * y;
    projectionPoints.push({
      year: y,
      sohPct: Number(calcSoh(y, projectedMiles, habitPenalty).toFixed(2)),
      warrantyThreshold: 70
    });
  }

  return {
    currentSohPct: Number(currentSohPct.toFixed(2)),
    remainingKwh: Number(remainingKwh.toFixed(2)),
    lostMiles: Number(lostMiles.toFixed(1)),
    isUnderWarranty,
    projectionPoints
  };
}

export interface RealWorldRangeResult {
  adjustedRangeMiles: number;
  percentageLoss: number;
  whPerMile: number;
  recommendedExtraStops: number;
}

/**
 * 3. Real World Range Penalty
 */
export function calculateRealWorldRange(
  baseEpaRange: number,
  tempF: number,
  speedMph: number,
  climateMode: 'heat_pump' | 'resistive' | 'ac' | 'off',
  towingWeightLbs: number,
  hasRoofBox: boolean,
  packKwh: number = 75
): RealWorldRangeResult {
  if (baseEpaRange <= 0 || speedMph < 0 || towingWeightLbs < 0) {
    throw new Error("Invalid parameters for range calculation.");
  }

  let adjustedRangeMiles = baseEpaRange;

  if (speedMph > 55) {
    const aeroLoss = Math.pow(speedMph / 55, 2) - 1;
    adjustedRangeMiles *= (1 - Math.min(aeroLoss * 0.4, 0.6));
  } else if (speedMph < 45 && speedMph > 0) {
    adjustedRangeMiles *= 1.05;
  }

  if (tempF < 70 && climateMode !== 'off') {
    const tempDiff = 70 - tempF;
    let tempLossPercent = climateMode === 'heat_pump' ? (tempDiff * 0.3) : (tempDiff * 0.6);
    if (climateMode === 'heat_pump' && tempLossPercent > 20) tempLossPercent = 20;
    if (climateMode === 'resistive' && tempLossPercent > 35) tempLossPercent = 35;
    adjustedRangeMiles *= (1 - (tempLossPercent / 100));
  } else if (tempF > 85 && climateMode !== 'off') {
    const tempDiff = tempF - 85;
    const acLossPercent = Math.min(tempDiff * 0.4, 15);
    adjustedRangeMiles *= (1 - (acLossPercent / 100));
  }

  if (hasRoofBox) {
    adjustedRangeMiles *= 0.88;
  }
  
  if (towingWeightLbs > 0) {
    const weightLossPercent = Math.min((towingWeightLbs / 1000) * 8, 50); 
    adjustedRangeMiles *= (1 - (weightLossPercent / 100));
  }

  adjustedRangeMiles = Math.max(0, adjustedRangeMiles);
  const percentageLoss = baseEpaRange > 0 ? ((baseEpaRange - adjustedRangeMiles) / baseEpaRange) * 100 : 0;
  const whPerMile = adjustedRangeMiles > 0 ? (packKwh * 1000) / adjustedRangeMiles : 0;
  
  const usableRangePerLeg = adjustedRangeMiles * 0.8;
  const recommendedExtraStops = usableRangePerLeg > 0 ? Math.max(0, Math.ceil((300 - adjustedRangeMiles) / usableRangePerLeg)) : 0;

  return {
    adjustedRangeMiles: Number(adjustedRangeMiles.toFixed(1)),
    percentageLoss: Number(percentageLoss.toFixed(1)),
    whPerMile: Number(whPerMile.toFixed(1)),
    recommendedExtraStops
  };
}

export interface HomeChargingResult {
  chargeHours: number;
  milesAddedPerHour: number;
  offPeakSessionCost: number;
  peakSessionCost: number;
  monthlyCost: number;
  annualDollarSavings: number;
}

/**
 * 4. Home Charging Economics
 */
export function calculateHomeCharging(
  packKwh: number,
  startSoc: number,
  endSoc: number,
  chargerPowerKw: number,
  offPeakRate: number,
  peakRate: number,
  gasMpg: number,
  gasPrice: number,
  vehicleEpaRange: number = 300
): HomeChargingResult {
  if (startSoc >= endSoc || startSoc < 0 || endSoc > 100 || chargerPowerKw <= 0 || packKwh <= 0) {
    throw new Error("Invalid parameters for home charging.");
  }

  const socAddedPct = endSoc - startSoc;
  const kwhToBattery = packKwh * (socAddedPct / 100);
  const energyPulledKwh = kwhToBattery / 0.90; 

  const chargeHours = energyPulledKwh / chargerPowerKw;
  const milesPerKwh = vehicleEpaRange / packKwh;
  const milesAddedPerHour = chargerPowerKw * 0.90 * milesPerKwh;

  const offPeakSessionCost = energyPulledKwh * offPeakRate;
  const peakSessionCost = energyPulledKwh * peakRate;

  const kwhPerMonth = (1000 / milesPerKwh) / 0.90;
  const monthlyCost = kwhPerMonth * offPeakRate;

  const gallonsPerMonth = 1000 / gasMpg;
  const gasCostPerMonth = gallonsPerMonth * gasPrice;
  const annualDollarSavings = (gasCostPerMonth - monthlyCost) * 12;

  return {
    chargeHours: Number(chargeHours.toFixed(2)),
    milesAddedPerHour: Number(milesAddedPerHour.toFixed(1)),
    offPeakSessionCost: Number(offPeakSessionCost.toFixed(2)),
    peakSessionCost: Number(peakSessionCost.toFixed(2)),
    monthlyCost: Number(monthlyCost.toFixed(2)),
    annualDollarSavings: Number(annualDollarSavings.toFixed(2))
  };
}

// ----------------------------------------------------------------------------
// LEGACY BRIDGES TO PREVENT BUILD FAILURE
// ----------------------------------------------------------------------------

export interface ChargeResult {
  totalMinutes: number;
  avgKw: number;
  kwhAdded: number;
  chartData: Array<{
    soc: number;
    actualKw: number;
    isInSelectedRange: boolean;
  }>;
}

export function interpolateChargeCurve(
  curvePoints: CurvePoint[],
  chargerMaxKw: number,
  startSoc: number,
  endSoc: number,
  usableCapacityKwh: number,
  ambientTempF: number = 70,
  isPreconditioned: boolean = true
): ChargeResult {
  const isColdWeather = ambientTempF < 40 && !isPreconditioned;
  const newRes = calculateChargingSession(curvePoints, chargerMaxKw, startSoc, endSoc, usableCapacityKwh, isColdWeather, 0.40);
  
  return {
    totalMinutes: newRes.totalMinutes,
    avgKw: newRes.avgKw,
    kwhAdded: newRes.kwhAdded,
    chartData: newRes.chartData.map(d => ({
      soc: d.soc,
      actualKw: d.kw,
      isInSelectedRange: d.active
    }))
  };
}

export interface DegradationInput {
  ageYears: number;
  mileageMiles: number;
  chemistry: 'LFP' | 'NMC' | 'NCA';
  habit: 'ac_gentle' | 'mixed' | 'dc_heavy';
  originalCapacityKwh: number;
  originalEpaRange: number;
}

export interface LegacyDegradationResult {
  sohPercentage: number;
  remainingKwh: number;
  estimatedLostMiles: number;
  isUnderWarrantyRisk: boolean;
}

export function legacyBatteryDegradation(input: DegradationInput): LegacyDegradationResult {
  const res = calculateBatteryDegradation(input.chemistry, input.ageYears, input.mileageMiles, input.habit, input.originalCapacityKwh, input.originalEpaRange);
  return {
    sohPercentage: res.currentSohPct,
    remainingKwh: res.remainingKwh,
    estimatedLostMiles: res.lostMiles,
    isUnderWarrantyRisk: res.isUnderWarranty && res.currentSohPct <= 70
  };
}
