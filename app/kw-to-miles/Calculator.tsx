"use client";

import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Gauge, 
  Clock, 
  BatteryCharging, 
  AlertTriangle, 
  Sliders, 
  ShieldCheck, 
  Car, 
  CheckCircle2, 
  ChevronRight, 
  Info,
  Flame,
  ArrowRight,
  TrendingUp,
  Cpu,
  RefreshCw
} from 'lucide-react';

export interface VehiclePreset {
  id: string;
  name: string;
  category: string;
  batteryKwh: number;
  whPerMile: number;
  whPerKm: number;
  kwhPer100km: number;
  maxAcKw: number;
  maxDcKw: number;
  archVoltage: number; // 400V or 800V
}

export const VEHICLE_PRESETS: VehiclePreset[] = [
  {
    id: 'lucid-air-pure',
    name: 'Lucid Air Pure',
    category: 'Ultra-Efficient Sedan',
    batteryKwh: 88,
    whPerMile: 220,
    whPerKm: 137,
    kwhPer100km: 13.7,
    maxAcKw: 19.2,
    maxDcKw: 250,
    archVoltage: 900
  },
  {
    id: 'tesla-model-3-rwd',
    name: 'Tesla Model 3 RWD',
    category: 'Aerodynamic Sedan',
    batteryKwh: 60,
    whPerMile: 240,
    whPerKm: 149,
    kwhPer100km: 14.9,
    maxAcKw: 7.7,
    maxDcKw: 170,
    archVoltage: 400
  },
  {
    id: 'tesla-model-y-lr',
    name: 'Tesla Model Y Long Range',
    category: 'Popular Compact SUV',
    batteryKwh: 75,
    whPerMile: 270,
    whPerKm: 168,
    kwhPer100km: 16.8,
    maxAcKw: 11.5,
    maxDcKw: 250,
    archVoltage: 400
  },
  {
    id: 'hyundai-ioniq-5',
    name: 'Hyundai Ioniq 5 / Kia EV6',
    category: 'Mid-Size Crossover',
    batteryKwh: 77.4,
    whPerMile: 300,
    whPerKm: 186,
    kwhPer100km: 18.6,
    maxAcKw: 10.9,
    maxDcKw: 235,
    archVoltage: 800
  },
  {
    id: 'ford-mach-e-er',
    name: 'Ford Mustang Mach-E ER',
    category: 'Standard Crossover',
    batteryKwh: 91,
    whPerMile: 340,
    whPerKm: 211,
    kwhPer100km: 21.1,
    maxAcKw: 10.5,
    maxDcKw: 150,
    archVoltage: 400
  },
  {
    id: 'rivian-r1t',
    name: 'Rivian R1T / F-150 Lightning',
    category: 'Heavy Pickup / SUV',
    batteryKwh: 131,
    whPerMile: 460,
    whPerKm: 286,
    kwhPer100km: 28.6,
    maxAcKw: 11.5,
    maxDcKw: 220,
    archVoltage: 400
  },
  {
    id: 'custom-ev',
    name: 'Custom Electric Vehicle',
    category: 'User Configured',
    batteryKwh: 75,
    whPerMile: 280,
    whPerKm: 174,
    kwhPer100km: 17.4,
    maxAcKw: 11.5,
    maxDcKw: 250,
    archVoltage: 400
  }
];

export interface ChargerPreset {
  label: string;
  sublabel: string;
  kw: number;
  type: 'AC_L1' | 'AC_L2' | 'DCFC';
  voltage: string;
  amperage: string;
}

export const CHARGER_PRESETS: ChargerPreset[] = [
  { label: 'Standard L1', sublabel: '120V / 12A Trickle', kw: 1.4, type: 'AC_L1', voltage: '120V', amperage: '12A' },
  { label: 'Hotel / Public L2', sublabel: '208V / 32A Commercial', kw: 6.6, type: 'AC_L2', voltage: '208V', amperage: '32A' },
  { label: 'Home NEMA 14-50', sublabel: '240V / 32A Standard', kw: 7.7, type: 'AC_L2', voltage: '240V', amperage: '32A' },
  { label: 'High-Power Wallbox', sublabel: '240V / 48A Hardwire', kw: 11.5, type: 'AC_L2', voltage: '240V', amperage: '48A' },
  { label: 'EU Commercial AC', sublabel: '400V 3-Phase 32A', kw: 22.0, type: 'AC_L2', voltage: '400V', amperage: '32A' },
  { label: 'Urban DCFC', sublabel: '50 kW Fast Charger', kw: 50.0, type: 'DCFC', voltage: '400V', amperage: '125A' },
  { label: 'Highway DCFC', sublabel: '150 kW CCS / NACS', kw: 150.0, type: 'DCFC', voltage: '400V', amperage: '375A' },
  { label: 'Ultra-Fast 800V', sublabel: '350 kW High-Speed', kw: 350.0, type: 'DCFC', voltage: '800V', amperage: '437A' },
];

export default function KwToMilesCalculator() {
  // Global Unit System: Imperial vs Metric
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');

  // Selected Vehicle
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('tesla-model-y-lr');
  const [customBatteryKwh, setCustomBatteryKwh] = useState<number>(75);
  const [customWhPerMile, setCustomWhPerMile] = useState<number>(270);
  const [customMaxAcKw, setCustomMaxAcKw] = useState<number>(11.5);
  const [customMaxDcKw, setCustomMaxDcKw] = useState<number>(250);

  // Charger Settings
  const [chargerKw, setChargerKw] = useState<number>(7.7);
  const [durationHours, setDurationHours] = useState<number>(1.0);
  const [startSoc, setStartSoc] = useState<number>(20);

  // Advanced Tuning Drawer
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [customAcEfficiency, setCustomAcEfficiency] = useState<number>(90.5); // %
  const [customDcEfficiency, setCustomDcEfficiency] = useState<number>(96.0); // %
  const [applyDcTaper, setApplyDcTaper] = useState<boolean>(true);

  // Active Vehicle Object
  const currentVehicle = useMemo(() => {
    const preset = VEHICLE_PRESETS.find(v => v.id === selectedVehicleId) || VEHICLE_PRESETS[2];
    if (preset.id === 'custom-ev') {
      const whKm = Math.round(customWhPerMile / 1.60934);
      return {
        ...preset,
        batteryKwh: customBatteryKwh,
        whPerMile: customWhPerMile,
        whPerKm: whKm,
        kwhPer100km: Number((whKm / 10).toFixed(1)),
        maxAcKw: customMaxAcKw,
        maxDcKw: customMaxDcKw
      };
    }
    return preset;
  }, [selectedVehicleId, customBatteryKwh, customWhPerMile, customMaxAcKw, customMaxDcKw]);

  // Handle vehicle change
  const handleVehicleChange = (id: string) => {
    setSelectedVehicleId(id);
    const preset = VEHICLE_PRESETS.find(v => v.id === id);
    if (preset && id !== 'custom-ev') {
      setCustomBatteryKwh(preset.batteryKwh);
      setCustomWhPerMile(preset.whPerMile);
      setCustomMaxAcKw(preset.maxAcKw);
      setCustomMaxDcKw(preset.maxDcKw);
    }
  };

  // Determine Charging Mode & Physical Conversion
  const isAcCharging = chargerKw <= 22.0;
  const isLevel1 = isAcCharging && chargerKw <= 1.8;

  // Onboard Charger (OBC) Bottleneck evaluation
  const obcLimit = currentVehicle.maxAcKw;
  const isObcBottleneck = isAcCharging && chargerKw > obcLimit;
  const effectiveAcKw = isAcCharging ? Math.min(chargerKw, obcLimit) : 0;

  // DC Fast Charging evaluation
  const dcMaxLimit = currentVehicle.maxDcKw;
  const isDcStationExceedingCar = !isAcCharging && chargerKw > dcMaxLimit;
  const peakDcKw = !isAcCharging ? Math.min(chargerKw, dcMaxLimit) : 0;

  // Taper Modeling for DCFC (average 10-80% power vs peak)
  const averageDcKw = useMemo(() => {
    if (isAcCharging) return 0;
    if (!applyDcTaper) return peakDcKw;
    if (peakDcKw <= 50) return peakDcKw * 0.98;
    if (peakDcKw <= 100) return peakDcKw * 0.92;
    if (peakDcKw <= 175) return peakDcKw * 0.85; // 150kW typical 10-80% average is ~125kW
    if (peakDcKw <= 250) return peakDcKw * 0.78; // 250kW average is ~180-195kW
    return peakDcKw * 0.72; // 350kW 800V average is ~240-255kW due to step taper
  }, [isAcCharging, applyDcTaper, peakDcKw]);

  // Actual Effective Power delivered at the connector
  const effectivePowerKw = isAcCharging ? effectiveAcKw : averageDcKw;

  // Conversion Efficiency Factor
  const conversionEfficiency = useMemo(() => {
    if (isLevel1) return 0.80; // 80% due to fixed BMS compute & coolant pumping overhead
    if (isAcCharging) return customAcEfficiency / 100; // default 90.5%
    return customDcEfficiency / 100; // default 96%
  }, [isLevel1, isAcCharging, customAcEfficiency, customDcEfficiency]);

  // Energy Delivered per hour
  const netEnergyPerHrKwh = effectivePowerKw * conversionEfficiency;
  const grossEnergyPerHrKwh = effectivePowerKw;

  // Range Recovery Velocity (Speed)
  // Imperial: Wh/mi -> 1 kWh = (1000 / whPerMile) miles
  const milesPerHourAdded = (netEnergyPerHrKwh * 1000) / currentVehicle.whPerMile;
  const kmPerHourAdded = milesPerHourAdded * 1.60934;

  // Session Totals based on Dwell Duration
  const totalGrossKwhDrawn = grossEnergyPerHrKwh * durationHours;
  const totalNetKwhDelivered = netEnergyPerHrKwh * durationHours;
  const totalLossKwh = totalGrossKwhDrawn - totalNetKwhDelivered;

  const totalMilesAdded = milesPerHourAdded * durationHours;
  const totalKmAdded = kmPerHourAdded * durationHours;

  // Battery percentage delta
  const socAdded = Math.min(100 - startSoc, (totalNetKwhDelivered / currentVehicle.batteryKwh) * 100);
  const endSoc = Math.min(100, startSoc + socAdded);

  // DC Fast Charging Quick Benchmarks (Miles or Km per 10 & 15 minutes)
  const rangePer10MinMiles = (milesPerHourAdded / 60) * 10;
  const rangePer10MinKm = (kmPerHourAdded / 60) * 10;
  const rangePer15MinMiles = (milesPerHourAdded / 60) * 15;
  const rangePer15MinKm = (kmPerHourAdded / 60) * 15;

  // Minutes needed to add 100 miles / 100 km
  const minutesFor100Miles = milesPerHourAdded > 0 ? (100 / milesPerHourAdded) * 60 : 0;
  const minutesFor100Km = kmPerHourAdded > 0 ? (100 / kmPerHourAdded) * 60 : 0;

  // Preset quick click handler
  const handlePresetSelect = (preset: ChargerPreset) => {
    setChargerKw(preset.kw);
  };

  return (
    <div id="kw-to-miles-calculator" className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 sm:p-7 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" /> First-Principles Physics Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              EV Charging Speed Calculator
            </span>{' '}
            <span className="text-white">: kW to Miles &amp; Km/hr</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Convert station kW into real-world miles and km recovered per hour, factoring onboard AC inverter drag and BMS thermal limits.
          </p>
        </div>

        {/* Global Units Selector Toggle */}
        <div className="flex items-center bg-[#0B0F17] p-1 rounded-xl border border-slate-700/80 shadow-inner shrink-0">
          <button
            type="button"
            onClick={() => setUnitSystem('imperial')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              unitSystem === 'imperial'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Imperial (Miles / mph)
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem('metric')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              unitSystem === 'metric'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Metric (KM / km/h)
          </button>
        </div>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Interactive Inputs (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Vehicle Selection */}
          <div className="bg-[#0B0F17]/90 border border-slate-800/90 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="vehicle-select" className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Car className="w-4 h-4 text-emerald-400" />
                1. Select Vehicle Profile
              </label>
              <span className="text-xs text-emerald-400/90 font-medium">
                {currentVehicle.category}
              </span>
            </div>

            <select
              id="vehicle-select"
              value={selectedVehicleId}
              onChange={(e) => handleVehicleChange(e.target.value)}
              className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3.5 py-2.5 text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
            >
              {VEHICLE_PRESETS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({unitSystem === 'imperial' ? `${v.whPerMile} Wh/mi` : `${v.kwhPer100km} kWh/100km`} | AC Max: {v.maxAcKw} kW)
                </option>
              ))}
            </select>

            {/* Custom Vehicle Inputs if selected */}
            {selectedVehicleId === 'custom-ev' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 animate-in fade-in duration-200">
                <div>
                  <label htmlFor="custom-battery" className="text-[11px] font-medium text-slate-400 block mb-1">
                    Usable Pack (kWh)
                  </label>
                  <input
                    id="custom-battery"
                    type="number"
                    min="20"
                    max="220"
                    step="1"
                    value={customBatteryKwh}
                    onChange={(e) => setCustomBatteryKwh(Math.max(10, Number(e.target.value)))}
                    className="w-full bg-[#131B2A] border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="custom-consumption" className="text-[11px] font-medium text-slate-400 block mb-1">
                    {unitSystem === 'imperial' ? 'Consumption (Wh/mi)' : 'Wh per km'}
                  </label>
                  <input
                    id="custom-consumption"
                    type="number"
                    min="150"
                    max="700"
                    step="5"
                    value={unitSystem === 'imperial' ? customWhPerMile : Math.round(customWhPerMile / 1.60934)}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomWhPerMile(unitSystem === 'imperial' ? val : Math.round(val * 1.60934));
                    }}
                    className="w-full bg-[#131B2A] border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="custom-obc" className="text-[11px] font-medium text-slate-400 block mb-1">
                    AC OBC Cap (kW)
                  </label>
                  <input
                    id="custom-obc"
                    type="number"
                    min="3.3"
                    max="22.0"
                    step="0.1"
                    value={customMaxAcKw}
                    onChange={(e) => setCustomMaxAcKw(Number(e.target.value))}
                    className="w-full bg-[#131B2A] border border-slate-700 rounded-md px-3 py-1.5 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Quick Specs Pill Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md text-slate-300">
                Battery: <strong className="text-white">{currentVehicle.batteryKwh} kWh</strong>
              </span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md text-slate-300">
                Efficiency:{' '}
                <strong className="text-emerald-400">
                  {unitSystem === 'imperial'
                    ? `${currentVehicle.whPerMile} Wh/mi (${(1000 / currentVehicle.whPerMile).toFixed(1)} mi/kWh)`
                    : `${currentVehicle.whPerKm} Wh/km (${currentVehicle.kwhPer100km} kWh/100km)`}
                </strong>
              </span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md text-slate-300">
                OBC Limit: <strong className="text-amber-300">{currentVehicle.maxAcKw} kW AC</strong>
              </span>
            </div>
          </div>

          {/* 2. Charger Power Level (Presets + Custom Slider) */}
          <div className="bg-[#0B0F17]/90 border border-slate-800/90 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                2. Charger Power Output (kW)
              </label>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
                {chargerKw} kW {isAcCharging ? '(AC Inverter)' : '(DC Fast Direct)'}
              </span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {CHARGER_PRESETS.map((preset) => {
                const isSelected = Math.abs(chargerKw - preset.kw) < 0.05;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-2.5 rounded-lg text-left transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-950/80 to-slate-900 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                        : 'bg-[#131B2A] border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-white">{preset.kw} kW</span>
                      <span className={`text-[10px] uppercase font-bold px-1 rounded ${
                        preset.type === 'DCFC' ? 'bg-amber-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {preset.type === 'DCFC' ? 'DC' : 'AC'}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-300 truncate mt-0.5">{preset.label}</div>
                    <div className="text-[10px] text-slate-500 truncate">{preset.sublabel}</div>
                  </button>
                );
              })}
            </div>

            {/* Continuous Slider & Manual Input */}
            <div className="space-y-2 mt-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Custom Station Power</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="1.0"
                    max="350.0"
                    step="0.1"
                    value={chargerKw}
                    onChange={(e) => setChargerKw(Math.max(1, Math.min(350, Number(e.target.value))))}
                    className="w-20 bg-[#131B2A] border border-slate-700 rounded px-2 py-1 text-right text-xs font-mono font-bold text-white focus:ring-1 focus:ring-cyan-400 outline-none"
                  />
                  <span className="text-slate-400 text-xs">kW</span>
                </div>
              </div>
              <input
                type="range"
                min="1.0"
                max="350.0"
                step={chargerKw <= 22 ? 0.1 : 1}
                value={chargerKw}
                onChange={(e) => setChargerKw(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1.4 kW (L1)</span>
                <span>7.7 kW (Home L2)</span>
                <span>22 kW (3-Phase)</span>
                <span>50 kW (DCFC)</span>
                <span>150 kW</span>
                <span>350 kW (800V)</span>
              </div>
            </div>
          </div>

          {/* 3. Dwell Duration & Starting SoC */}
          <div className="bg-[#0B0F17]/90 border border-slate-800/90 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                3. Charging Session Duration &amp; State of Charge
              </label>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/30">
                {durationHours < 1
                  ? `${Math.round(durationHours * 60)} Minutes`
                  : `${durationHours.toFixed(durationHours % 1 === 0 ? 0 : 1)} Hours`}
              </span>
            </div>

            {/* Duration Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Plug-in Dwell Time:</span>
                <span className="text-white font-medium">
                  {durationHours >= 1 ? `${durationHours} hr (${Math.round(durationHours * 60)} min)` : `${Math.round(durationHours * 60)} minutes`}
                </span>
              </div>
              <input
                type="range"
                min="0.25"
                max="12.0"
                step="0.25"
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>15m</span>
                <span>30m</span>
                <span>1h</span>
                <span>2h</span>
                <span>4h</span>
                <span>8h (Overnight)</span>
                <span>12h</span>
              </div>
            </div>

            {/* Starting SoC slider */}
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Starting Battery Percentage (SoC):</span>
                <span className="text-amber-400 font-mono font-bold">{startSoc}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="90"
                step="5"
                value={startSoc}
                onChange={(e) => setStartSoc(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Advanced Physics Tuning Accordion */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#0B0F17]/50">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full px-5 py-3 flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                Advanced Inverter Rectification &amp; DC Thermal Taper Settings
              </span>
              <span className="text-slate-500 text-xs">{showAdvanced ? 'Hide ▲' : 'Tune ▼'}</span>
            </button>

            {showAdvanced && (
              <div className="p-5 border-t border-slate-800 space-y-4 text-xs text-slate-300 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">
                      AC Level 2 Inverter Efficiency ({customAcEfficiency}%)
                    </label>
                    <input
                      type="range"
                      min="85"
                      max="95"
                      step="0.5"
                      value={customAcEfficiency}
                      onChange={(e) => setCustomAcEfficiency(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded accent-emerald-400"
                    />
                    <span className="text-[10px] text-slate-500">Typical: 88% to 92% (heat &amp; parasitic pump loss)</span>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">
                      DC Direct Pack Transfer ({customDcEfficiency}%)
                    </label>
                    <input
                      type="range"
                      min="92"
                      max="98"
                      step="0.5"
                      value={customDcEfficiency}
                      onChange={(e) => setCustomDcEfficiency(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded accent-cyan-400"
                    />
                    <span className="text-[10px] text-slate-500">Bypasses onboard inverter directly to cell contacts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div>
                    <div className="font-medium text-white">Apply DC Fast Charge BMS Thermal Taper</div>
                    <div className="text-[11px] text-slate-400">
                      Calculates average session power across 10%–80% rather than unrealistically assuming sustained peak.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={applyDcTaper}
                    onChange={(e) => setApplyDcTaper(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Output Dashboard (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Onboard Charger Bottleneck Warning Banner */}
          {isObcBottleneck && (
            <div className="bg-amber-950/50 border border-amber-500/50 rounded-xl p-4 text-amber-200 animate-in fade-in duration-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <strong className="text-amber-300 block font-semibold mb-0.5">
                    Hardware Bottleneck: Capped at {obcLimit} kW by Vehicle OBC
                  </strong>
                  The AC charger supplies <strong>{chargerKw} kW</strong>, but your {currentVehicle.name} has a factory onboard inverter limit of <strong>{obcLimit} kW</strong>. Net intake is clamped to {obcLimit} kW.
                </div>
              </div>
            </div>
          )}

          {/* DC Fast Charging Peak vs Average Banner */}
          {!isAcCharging && applyDcTaper && (
            <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-3.5 text-cyan-200 text-xs">
              <div className="flex items-center gap-2 font-semibold text-cyan-300 mb-1">
                <TrendingUp className="w-4 h-4" />
                DCFC Taper Model: {averageDcKw.toFixed(1)} kW Session Average
              </div>
              <p className="text-slate-300 text-[11px] leading-normal">
                Station peak is {chargerKw} kW, but battery thermal curve tapering drops intake as cells heat and fill. Average 10%–80% throughput is estimated at {averageDcKw.toFixed(1)} kW.
              </p>
            </div>
          )}

          {/* Primary Velocity Metric Card: Miles / KM Added per Hour */}
          <div className="bg-gradient-to-b from-[#182338] to-[#101726] border-2 border-emerald-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-400" />
                Range Recovery Rate
              </span>
              <span className="bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                Hourly Velocity
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                +{unitSystem === 'imperial' ? milesPerHourAdded.toFixed(1) : kmPerHourAdded.toFixed(1)}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400">
                {unitSystem === 'imperial' ? 'Miles / Hour' : 'Km / Hour'}
              </span>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
              <span>Equivalent to:</span>
              <strong className="text-slate-200">
                {unitSystem === 'imperial'
                  ? `+${kmPerHourAdded.toFixed(1)} km/h`
                  : `+${milesPerHourAdded.toFixed(1)} mph`}
              </strong>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">
                {((netEnergyPerHrKwh * 1000) / (currentVehicle.whPerMile * 60)).toFixed(2)} mi/min
              </span>
            </div>

            {/* Total Range Added for Selected Dwell */}
            <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                  Total Range Added in {durationHours} hr:
                </span>
                <span className="text-2xl font-extrabold text-white">
                  +{unitSystem === 'imperial' ? Math.round(totalMilesAdded) : Math.round(totalKmAdded)}{' '}
                  <span className="text-sm font-semibold text-emerald-400">
                    {unitSystem === 'imperial' ? 'Miles' : 'Kilometers'}
                  </span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                  State of Charge:
                </span>
                <span className="text-lg font-bold text-amber-300">
                  {startSoc}% → {Math.round(endSoc)}%
                </span>
                <span className="text-[10px] text-slate-400 block">
                  (+{Math.round(socAdded)}% added)
                </span>
              </div>
            </div>

            {/* Visual Battery Progress Bar */}
            <div className="mt-3 space-y-1">
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700 flex">
                <div
                  style={{ width: `${startSoc}%` }}
                  className="h-full bg-slate-600 rounded-l-full transition-all duration-300"
                  title={`Starting SoC: ${startSoc}%`}
                />
                <div
                  style={{ width: `${socAdded}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  title={`Added SoC: +${Math.round(socAdded)}%`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0% Empty</span>
                <span className="text-slate-300">
                  End: {Math.round(endSoc)}% {endSoc >= 80 ? '(BMS Throttles Past 80%)' : ''}
                </span>
                <span>100% Full</span>
              </div>
            </div>
          </div>

          {/* Secondary Telemetry Breakdown Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Net Energy Delivered */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                Net Energy Added
              </div>
              <div className="text-xl font-extrabold text-white">
                {totalNetKwhDelivered.toFixed(1)}{' '}
                <span className="text-xs font-medium text-slate-400">kWh</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Drawn: {totalGrossKwhDrawn.toFixed(1)} kWh ({totalLossKwh.toFixed(1)} kWh lost to {isAcCharging ? 'AC heat' : 'DC cabling'})
              </div>
            </div>

            {/* Time to 100 Miles / 100 Km */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Time to +100 {unitSystem === 'imperial' ? 'Miles' : 'KM'}
              </div>
              <div className="text-xl font-extrabold text-white">
                {unitSystem === 'imperial'
                  ? minutesFor100Miles < 60
                    ? `${Math.round(minutesFor100Miles)} min`
                    : `${(minutesFor100Miles / 60).toFixed(1)} hr`
                  : minutesFor100Km < 60
                    ? `${Math.round(minutesFor100Km)} min`
                    : `${(minutesFor100Km / 60).toFixed(1)} hr`}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                At {effectivePowerKw.toFixed(1)} kW effective delivery
              </div>
            </div>
          </div>

          {/* DC Fast Charge Pace Quick-View (10 & 15 Minute Highway Stop) */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Highway Quick-Stop Range Velocity
              </span>
              <span className="text-[10px] text-slate-400">Pace Per Stop</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-[#131B2A] p-2.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400 font-medium">10-Minute Rest Stop:</div>
                <div className="text-base font-extrabold text-white mt-0.5">
                  +{unitSystem === 'imperial' ? Math.round(rangePer10MinMiles) : Math.round(rangePer10MinKm)}{' '}
                  <span className="text-xs font-semibold text-emerald-400">
                    {unitSystem === 'imperial' ? 'Miles' : 'KM'}
                  </span>
                </div>
              </div>

              <div className="bg-[#131B2A] p-2.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400 font-medium">15-Minute Coffee Stop:</div>
                <div className="text-base font-extrabold text-white mt-0.5">
                  +{unitSystem === 'imperial' ? Math.round(rangePer15MinMiles) : Math.round(rangePer15MinKm)}{' '}
                  <span className="text-xs font-semibold text-emerald-400">
                    {unitSystem === 'imperial' ? 'Miles' : 'KM'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Hardware Tiers Reference Table */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-bold text-slate-300 mb-2.5">
              {currentVehicle.name} Range Velocity by Hardware Tier:
            </div>
            <div className="space-y-1.5 text-xs">
              {[
                { name: '1.4 kW (Level 1 120V)', kw: 1.4, isAc: true },
                { name: '7.7 kW (Home Level 2 32A)', kw: 7.7, isAc: true },
                { name: '11.5 kW (Home Wallbox 48A)', kw: 11.5, isAc: true },
                { name: '50 kW (Urban DC Fast)', kw: 50, isAc: false },
                { name: '150 kW (Highway DCFC)', kw: 150, isAc: false }
              ].map((tier) => {
                const effKw = tier.isAc ? Math.min(tier.kw, currentVehicle.maxAcKw) : tier.kw;
                const eff = tier.kw <= 1.8 ? 0.80 : tier.isAc ? 0.905 : 0.96;
                const mph = (effKw * eff * 1000) / currentVehicle.whPerMile;
                const kmh = mph * 1.60934;
                const isCurrent = Math.abs(chargerKw - tier.kw) < 0.1;
                return (
                  <div
                    key={tier.name}
                    className={`flex items-center justify-between p-1.5 rounded transition-colors ${
                      isCurrent ? 'bg-emerald-950/60 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[11px] truncate max-w-[180px]">{tier.name}</span>
                    <span className="font-mono text-white text-xs">
                      +{unitSystem === 'imperial' ? Math.round(mph) : Math.round(kmh)}{' '}
                      <span className="text-[10px] text-slate-400">{unitSystem === 'imperial' ? 'mph' : 'km/h'}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
