'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BatteryCharging,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  DollarSign,
  Info,
  Layers,
  Sparkles,
  TrendingDown,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Building2,
  Car,
  Scale,
  Percent,
  Calendar,
  Zap,
  HelpCircle,
  Clock,
  RefreshCw,
  Cpu
} from 'lucide-react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'INR';
export type UnitSystem = 'imperial' | 'metric';
export type ServiceTier = 'oem' | 'reman' | 'module';
export type ChemistryType = 'nmc' | 'lfp';

interface VehiclePreset {
  id: string;
  name: string;
  capacityKwh: number;
  chemistry: ChemistryType;
  numModules: number;
  baseKwhRetailRate: number; // in USD
  estBaseMarketValue: number; // in USD
  warrantyYears: number;
  warrantyMiles: number;
  notes: string;
}

const VEHICLE_PRESETS: VehiclePreset[] = [
  {
    id: 'tesla-m3-rwd',
    name: 'Tesla Model 3 RWD (60 kWh LFP)',
    capacityKwh: 60,
    chemistry: 'lfp',
    numModules: 8,
    baseKwhRetailRate: 125,
    estBaseMarketValue: 24500,
    warrantyYears: 8,
    warrantyMiles: 100000,
    notes: 'Prismatic LFP blade architecture with superior cycle durability (>3,000 cycles). Pack level replacement only from Tesla; independent shops repair individual sub-strings.'
  },
  {
    id: 'tesla-my-lr',
    name: 'Tesla Model Y Long Range (75 kWh NMC)',
    capacityKwh: 75,
    chemistry: 'nmc',
    numModules: 4,
    baseKwhRetailRate: 155,
    estBaseMarketValue: 31000,
    warrantyYears: 8,
    warrantyMiles: 120000,
    notes: '2170 cylindrical cell configuration across 4 large internal modules. Glued polyurethane foam encapsulation makes module-level splitting labor-intensive.'
  },
  {
    id: 'hyundai-ioniq5',
    name: 'Hyundai Ioniq 5 / Kia EV6 (77.4 kWh NMC)',
    capacityKwh: 77.4,
    chemistry: 'nmc',
    numModules: 32,
    baseKwhRetailRate: 160,
    estBaseMarketValue: 28500,
    warrantyYears: 10,
    warrantyMiles: 100000,
    notes: '800V E-GMP platform with 32 highly serviceable modular pouch packs. Ideal candidate for isolated module replacement without dropping the entire pack.'
  },
  {
    id: 'ford-mache-er',
    name: 'Ford Mustang Mach-E ER (91 kWh NMC)',
    capacityKwh: 91,
    chemistry: 'nmc',
    numModules: 10,
    baseKwhRetailRate: 165,
    estBaseMarketValue: 29500,
    warrantyYears: 8,
    warrantyMiles: 100000,
    notes: 'LG Energy Solution pouch cells across 10 serviceable cassette arrays. Ford dealers authorize individual array replacements under Technical Service Bulletins.'
  },
  {
    id: 'ford-f150-er',
    name: 'Ford F-150 Lightning ER (131 kWh NMC)',
    capacityKwh: 131,
    chemistry: 'nmc',
    numModules: 36,
    baseKwhRetailRate: 150,
    estBaseMarketValue: 45000,
    warrantyYears: 8,
    warrantyMiles: 100000,
    notes: 'Dual-layer internal array housing 36 modules. High scrap core valuation ($2,200+) due to high total nickel/cobalt mass.'
  },
  {
    id: 'chevy-bolt',
    name: 'Chevrolet Bolt EV (65 kWh NMC)',
    capacityKwh: 65,
    chemistry: 'nmc',
    numModules: 10,
    baseKwhRetailRate: 145,
    estBaseMarketValue: 14800,
    warrantyYears: 8,
    warrantyMiles: 100000,
    notes: 'Most recalled packs were updated with new 65 kWh chemistry and fresh 8-year warranties. Very high refurbished market availability.'
  },
  {
    id: 'nissan-leaf',
    name: 'Nissan Leaf (40 kWh Passive Air-Cooled)',
    capacityKwh: 40,
    chemistry: 'nmc',
    numModules: 24,
    baseKwhRetailRate: 170,
    estBaseMarketValue: 11500,
    warrantyYears: 8,
    warrantyMiles: 100000,
    notes: 'Passive air-cooling accelerates heat degradation in warm climates. Huge aftermarket for 24-canister module balancing and third-party 62 kWh retrofits.'
  },
  {
    id: 'porsche-taycan',
    name: 'Porsche Taycan / Audi e-tron GT (93.4 kWh NMC)',
    capacityKwh: 93.4,
    chemistry: 'nmc',
    numModules: 33,
    baseKwhRetailRate: 175,
    estBaseMarketValue: 56000,
    warrantyYears: 8,
    warrantyMiles: 100000,
    notes: '800V Performance Battery Plus with 33 individually serviceable modules. Dealer pack exchange costs exceed $22,000, making certified module repair the primary economic route.'
  },
  {
    id: 'custom',
    name: 'Custom EV Configuration',
    capacityKwh: 70,
    chemistry: 'nmc',
    numModules: 12,
    baseKwhRetailRate: 155,
    estBaseMarketValue: 26000,
    warrantyYears: 8,
    warrantyMiles: 100000,
    notes: 'Specify your bespoke battery pack size, cell chemistry, and in-service parameters.'
  }
];

const CURRENCY_CONFIG: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  CAD: { symbol: 'C$', rate: 1.36, label: 'CAD ($)' },
  AUD: { symbol: 'A$', rate: 1.52, label: 'AUD ($)' },
  INR: { symbol: '₹', rate: 83.5, label: 'INR (₹)' }
};

export default function BatteryReplacementCalculator() {
  // Localization State
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial');
  const [warrantyStandard, setWarrantyStandard] = useState<'federal' | 'carb'>('federal');

  // Selected Preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>('tesla-my-lr');

  // Interactive Inputs
  const [customCapacity, setCustomCapacity] = useState<number>(75);
  const [customChemistry, setCustomChemistry] = useState<ChemistryType>('nmc');
  const [customModules, setCustomModules] = useState<number>(12);
  const [inServiceYear, setInServiceYear] = useState<number>(2020);
  const [odometerMiles, setOdometerMiles] = useState<number>(78000);
  const [serviceTier, setServiceTier] = useState<ServiceTier>('oem');
  const [laborRatePerHour, setLaborRatePerHour] = useState<number>(140);
  const [coreScrapCredit, setCoreScrapCredit] = useState<number>(1500);
  const [customMarketValue, setCustomMarketValue] = useState<number>(27000);

  // Active preset reference
  const currentPreset = useMemo(() => {
    return VEHICLE_PRESETS.find(p => p.id === selectedPresetId) || VEHICLE_PRESETS[0];
  }, [selectedPresetId]);

  // Sync preset changes to editable inputs
  const handlePresetSelect = (id: string) => {
    setSelectedPresetId(id);
    const p = VEHICLE_PRESETS.find(x => x.id === id);
    if (p && p.id !== 'custom') {
      setCustomCapacity(p.capacityKwh);
      setCustomChemistry(p.chemistry);
      setCustomModules(p.numModules);
      setCustomMarketValue(p.estBaseMarketValue);
    }
  };

  // Conversions & Currency helpers
  const curr = CURRENCY_CONFIG[currency];
  const formatMoney = (valInUsd: number): string => {
    const converted = Math.round(valInUsd * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const formatDistance = (milesVal: number): string => {
    if (unitSystem === 'imperial') {
      return `${Math.round(milesVal).toLocaleString()} mi`;
    }
    const km = Math.round(milesVal * 1.60934);
    return `${km.toLocaleString()} km`;
  };

  // Warranty Logic Calculations
  const currentCalendarYear = 2026;
  const vehicleAgeYears = Math.max(0, currentCalendarYear - inServiceYear);
  
  const effectiveWarrantyYears = warrantyStandard === 'carb' ? 10 : currentPreset.warrantyYears;
  const effectiveWarrantyMiles = warrantyStandard === 'carb' ? 150000 : currentPreset.warrantyMiles;

  const remainingYears = effectiveWarrantyYears - vehicleAgeYears;
  const remainingMiles = effectiveWarrantyMiles - odometerMiles;

  const isOutOfWarranty = remainingYears <= 0 || remainingMiles <= 0;
  const isWarrantyExpiringSoon = !isOutOfWarranty && (remainingYears <= 1 || remainingMiles <= 15000);

  // Financial Cost Formulation
  // Base raw battery pricing per kWh:
  // LFP: $115 - $135/kWh retail replacement level
  // NMC: $145 - $175/kWh retail replacement level
  const effectiveChemistryRate = useMemo(() => {
    if (selectedPresetId !== 'custom') {
      return currentPreset.baseKwhRetailRate;
    }
    return customChemistry === 'lfp' ? 125 : 160;
  }, [selectedPresetId, currentPreset, customChemistry]);

  const activeCapacity = selectedPresetId === 'custom' ? customCapacity : currentPreset.capacityKwh;
  const activeModules = selectedPresetId === 'custom' ? customModules : currentPreset.numModules;

  // Costs Breakdown Calculations
  // 1. OEM Brand-New Pack:
  // Hardware: capacity * rate * 1.0 + pack housing / contactor fee ($1,200)
  // Labor: 11 hours @ labor rate
  // Coolant & Firmware Flash: $350
  // Core scrap credit deducted from net out-of-pocket
  const oemHardware = Math.round(activeCapacity * effectiveChemistryRate + 1200);
  const oemLaborHours = 11;
  const oemLaborCost = oemLaborHours * laborRatePerHour;
  const oemFluidsFirmware = 350;
  const oemNetTotal = Math.max(0, oemHardware + oemLaborCost + oemFluidsFirmware - coreScrapCredit);

  // 2. Remanufactured Pack:
  // Hardware: capacity * rate * 0.55 + reconditioning cert fee ($600)
  // Labor: 9.5 hours @ labor rate
  // Coolant & Firmware Flash: $300
  // Core scrap credit deducted
  const remanHardware = Math.round(activeCapacity * effectiveChemistryRate * 0.55 + 600);
  const remanLaborHours = 9.5;
  const remanLaborCost = Math.round(remanLaborHours * laborRatePerHour);
  const remanFluidsFirmware = 300;
  const remanNetTotal = Math.max(0, remanHardware + remanLaborCost + remanFluidsFirmware - coreScrapCredit);

  // 3. Single Module Swapping (Module-Level Repair):
  // Hardware: (capacity / numModules) * rate * 1.65 (isolated module markup)
  // Labor: 7.5 hours bench diagnostics, isolation, ultrasonic/busbar reconnect, cell voltage balancing
  // Coolant & Sealant: $180
  // NOTE: In module repair, the owner keeps the rest of their pack, so NO core credit is surrendered!
  const singleModuleHardware = Math.round((activeCapacity / Math.max(1, activeModules)) * effectiveChemistryRate * 1.65);
  const moduleLaborHours = 7.5;
  const moduleLaborCost = Math.round(moduleLaborHours * laborRatePerHour);
  const moduleDiagnosticFee = 180;
  const moduleNetTotal = singleModuleHardware + moduleLaborCost + moduleDiagnosticFee;

  // Selected Service Tier Totals
  const currentSelectionData = useMemo(() => {
    switch (serviceTier) {
      case 'oem':
        return {
          title: 'Brand-New OEM Dealership Pack Replacement',
          hardware: oemHardware,
          laborHours: oemLaborHours,
          laborCost: oemLaborCost,
          fees: oemFluidsFirmware,
          coreCredit: coreScrapCredit,
          netTotal: oemNetTotal,
          warrantyProvided: '3 to 4 Years / 50,000 Miles OEM Factory Warranty',
          turnaround: '5 to 12 Business Days (Crate Transit)',
          cellHealth: '100% Brand-New Grade-A Fresh Production Cells'
        };
      case 'reman':
        return {
          title: 'Remanufactured Pack (Certified Independent Workshop)',
          hardware: remanHardware,
          laborHours: remanLaborHours,
          laborCost: remanLaborCost,
          fees: remanFluidsFirmware,
          coreCredit: coreScrapCredit,
          netTotal: remanNetTotal,
          warrantyProvided: '1 to 2 Years / 24,000 Miles Reconditioner Warranty',
          turnaround: '3 to 7 Business Days',
          cellHealth: 'Tested & Balanced Modules with >90% State of Health'
        };
      case 'module':
        return {
          title: 'Module-Level Repair (Single Bad Block Swapping)',
          hardware: singleModuleHardware,
          laborHours: moduleLaborHours,
          laborCost: moduleLaborCost,
          fees: moduleDiagnosticFee,
          coreCredit: 0, // Keeps existing pack
          netTotal: moduleNetTotal,
          warrantyProvided: '6 Months to 1 Year on Swapped Module Only',
          turnaround: '2 to 4 Business Days',
          cellHealth: 'Isolates Weak Cell/Module (<40mV delta); Preserves Good 90%+ Original Pack'
        };
    }
  }, [
    serviceTier,
    oemHardware,
    oemLaborHours,
    oemLaborCost,
    oemFluidsFirmware,
    coreScrapCredit,
    oemNetTotal,
    remanHardware,
    remanLaborHours,
    remanLaborCost,
    remanFluidsFirmware,
    remanNetTotal,
    singleModuleHardware,
    moduleLaborHours,
    moduleLaborCost,
    moduleDiagnosticFee,
    moduleNetTotal
  ]);

  // Vehicle Residual Depreciation Formulation
  // Models Kelly Blue Book residual curve: ~12% year 1, 9% annual after, with mileage penalty
  const estimatedMarketValue = useMemo(() => {
    const baseVal = selectedPresetId === 'custom' ? customMarketValue : currentPreset.estBaseMarketValue;
    const ageDiscountFactor = Math.max(0.25, Math.pow(0.91, vehicleAgeYears));
    const expectedMiles = vehicleAgeYears * 12500;
    const excessMiles = Math.max(0, odometerMiles - expectedMiles);
    const mileagePenalty = excessMiles * 0.08; // $0.08 / excess mile
    const calculated = Math.max(2500, Math.round(baseVal * ageDiscountFactor - mileagePenalty));
    return calculated;
  }, [selectedPresetId, customMarketValue, currentPreset, vehicleAgeYears, odometerMiles]);

  // Economic Repair-to-Value Ratio
  const repairToValueRatio = Math.round((currentSelectionData.netTotal / estimatedMarketValue) * 100);
  const exceedsEconomicThreshold = repairToValueRatio > 50;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8" id="battery-replacement-calculator">
      {/* Top Quick Bar: Localization, Currency & Distance Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#131B2A] border border-slate-800 text-sm">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200">Calculator Settings:</span>
          <span className="text-xs text-slate-400 hidden sm:inline">Configure currency, units & warranty rules</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Currency Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#0B0F17] px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Currency:</span>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value as CurrencyCode)}
              className="bg-transparent text-emerald-400 text-xs font-semibold focus:outline-none cursor-pointer"
              aria-label="Select currency"
            >
              {(Object.keys(CURRENCY_CONFIG) as CurrencyCode[]).map(c => (
                <option key={c} value={c} className="bg-[#131B2A] text-slate-200">
                  {CURRENCY_CONFIG[c].label}
                </option>
              ))}
            </select>
          </div>

          {/* Unit System Toggle */}
          <div className="flex items-center bg-[#0B0F17] rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                unitSystem === 'imperial'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Miles (US/UK)
            </button>
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                unitSystem === 'metric'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Kilometers (EU/Intl)
            </button>
          </div>

          {/* Warranty Standard Toggle */}
          <div className="flex items-center bg-[#0B0F17] rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setWarrantyStandard('federal')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                warrantyStandard === 'federal'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Federal US & Global Standard: 8 Years / 100,000 Miles"
            >
              Federal (8-Yr / 100k)
            </button>
            <button
              onClick={() => setWarrantyStandard('carb')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                warrantyStandard === 'carb'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="CARB California & PZEV States: 10 Years / 150,000 Miles"
            >
              CARB (10-Yr / 150k)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls Left, Live Financial Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Parameters & Sliders (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: EV Model Preset */}
          <div className="p-6 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Car className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Select Vehicle & Traction Pack</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Preset Model
              </span>
            </div>

            <div className="space-y-3">
              <label htmlFor="vehicle-preset-select" className="text-xs font-medium text-slate-300">
                Vehicle Platform & Battery Architecture:
              </label>
              <select
                id="vehicle-preset-select"
                value={selectedPresetId}
                onChange={e => handlePresetSelect(e.target.value)}
                className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              >
                {VEHICLE_PRESETS.map(preset => (
                  <option key={preset.id} value={preset.id} className="bg-[#131B2A] text-slate-100">
                    {preset.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-400 italic leading-relaxed">
                {currentPreset.notes}
              </p>
            </div>

            {/* If Custom Selected, show custom inputs */}
            {selectedPresetId === 'custom' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Pack Capacity (kWh)</label>
                  <input
                    type="number"
                    min="20"
                    max="220"
                    value={customCapacity}
                    onChange={e => setCustomCapacity(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Cell Chemistry</label>
                  <select
                    value={customChemistry}
                    onChange={e => setCustomChemistry(e.target.value as ChemistryType)}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="nmc">NMC / NCA ($160/kWh)</option>
                    <option value="lfp">LFP Blade ($125/kWh)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Internal Modules</label>
                  <input
                    type="number"
                    min="1"
                    max="48"
                    value={customModules}
                    onChange={e => setCustomModules(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Age, Mileage & Factory Warranty Baseline */}
          <div className="p-6 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-semibold text-white">Vehicle Age & Odometer Reading</h3>
              </div>
              <span className="text-xs text-slate-400">
                In-Service: {inServiceYear} ({vehicleAgeYears} yrs old)
              </span>
            </div>

            {/* Slider 1: In-Service Year */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Vehicle In-Service Year:</span>
                <span className="text-cyan-400 font-semibold">{inServiceYear}</span>
              </div>
              <input
                type="range"
                min="2014"
                max="2026"
                step="1"
                value={inServiceYear}
                onChange={e => setInServiceYear(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>2014 (Legacy Early Adopter)</span>
                <span>2020 (5 Yrs Old)</span>
                <span>2026 (Brand New)</span>
              </div>
            </div>

            {/* Slider 2: Current Odometer */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Current Odometer Reading:</span>
                <span className="text-cyan-400 font-semibold">{formatDistance(odometerMiles)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="220000"
                step="2500"
                value={odometerMiles}
                onChange={e => setOdometerMiles(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{formatDistance(10000)}</span>
                <span>{formatDistance(100000)} (Federal Line)</span>
                <span>{formatDistance(200000)}</span>
              </div>
            </div>

            {/* Estimated Current Market Value of Vehicle */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>Estimated Residual Market Value (KBB / Residual):</span>
                </div>
                <span className="text-amber-400 font-semibold">{formatMoney(estimatedMarketValue)}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Derived from standard EV residual depreciation curve. Used to compute the 50% economic repair limit.
              </p>
            </div>
          </div>

          {/* Card 3: Service Route Selection & Repair Pathway */}
          <div className="p-6 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Wrench className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Repair Pathway & Replacement Tier</h3>
              </div>
              <span className="text-xs text-emerald-400 font-medium">3 Financial Routes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Route 1: OEM */}
              <button
                type="button"
                onClick={() => setServiceTier('oem')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  serviceTier === 'oem'
                    ? 'bg-emerald-500/15 border-emerald-500 ring-1 ring-emerald-500/50'
                    : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Building2 className={`w-4 h-4 ${serviceTier === 'oem' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    OEM Dealer
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-white mb-1">New OEM Pack</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Brand-new factory crated pack with 100% capacity and 3-4 year warranty.
                </p>
              </button>

              {/* Route 2: Reman */}
              <button
                type="button"
                onClick={() => setServiceTier('reman')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  serviceTier === 'reman'
                    ? 'bg-cyan-500/15 border-cyan-500 ring-1 ring-cyan-500/50'
                    : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <RefreshCw className={`w-4 h-4 ${serviceTier === 'reman' ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    Refurbished
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-white mb-1">Remanufactured</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Balanced pre-owned modules tested to 90%+ SoH by specialized shops.
                </p>
              </button>

              {/* Route 3: Module */}
              <button
                type="button"
                onClick={() => setServiceTier('module')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  serviceTier === 'module'
                    ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-500/50'
                    : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Layers className={`w-4 h-4 ${serviceTier === 'module' ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    High ROI
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-white mb-1">Module Swap</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Replaces only the 1 defective cell block causing pack code errors.
                </p>
              </button>
            </div>
          </div>

          {/* Card 4: Labor Rate & Core Buyback Scrap Credit */}
          <div className="p-6 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Labor Rates & Core Pack Scrap Credits</h3>
              </div>
              <span className="text-xs text-slate-400">Shop Customization</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Labor Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Certified HV Labor Rate:</span>
                  <span className="text-emerald-400 font-semibold">{formatMoney(laborRatePerHour)}/hr</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="240"
                  step="5"
                  value={laborRatePerHour}
                  onChange={e => setLaborRatePerHour(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>{formatMoney(90)} (Indy)</span>
                  <span>{formatMoney(150)} (Average)</span>
                  <span>{formatMoney(240)} (Metro OEM)</span>
                </div>
              </div>

              {/* Scrap Core Credit Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Decommissioned Core Scrap Credit:</span>
                  <span className="text-emerald-400 font-semibold">-{formatMoney(coreScrapCredit)}</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="3000"
                  step="100"
                  value={coreScrapCredit}
                  onChange={e => setCoreScrapCredit(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>-{formatMoney(800)} (LFP base)</span>
                  <span>-{formatMoney(1500)} (Standard NMC)</span>
                  <span>-{formatMoney(3000)} (130kWh+)</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 italic">
              *Note: When executing a Module-Level Repair, your original pack remains in the vehicle, meaning no core scrap credit is forfeited.
            </p>
          </div>
        </div>

        {/* Right Dashboard: Results & Financial Verdict (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Warranty Status Shield Banner */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isOutOfWarranty
                ? 'bg-red-500/10 border-red-500/40 text-red-200'
                : isWarrantyExpiringSoon
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isOutOfWarranty ? (
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              ) : isWarrantyExpiringSoon ? (
                <Clock className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="text-sm font-bold tracking-tight">
                  {isOutOfWarranty
                    ? 'OUT OF WARRANTY (Customer Pays 100%)'
                    : isWarrantyExpiringSoon
                    ? 'FACTORY WARRANTY EXPIRES SOON'
                    : '100% COVERED UNDER FACTORY WARRANTY'}
                </h4>
                <p className="text-xs leading-relaxed opacity-90">
                  {isOutOfWarranty ? (
                    <>
                      Vehicle has exceeded the {effectiveWarrantyYears}-year / {formatDistance(effectiveWarrantyMiles)} threshold (
                      {vehicleAgeYears} yrs old, {formatDistance(odometerMiles)}). Any replacement or cell balancing is an out-of-pocket customer expense.
                    </>
                  ) : isWarrantyExpiringSoon ? (
                    <>
                      Urgent action recommended: Remaining window is approximately{' '}
                      <strong className="underline">{remainingYears * 12} Months</strong> or{' '}
                      <strong className="underline">{formatDistance(Math.max(0, remainingMiles))}</strong>. Schedule an authorized OBD2 diagnostic test immediately to verify if State of Health is under the 70% warranty cutoff.
                    </>
                  ) : (
                    <>
                      Your battery is legally protected under factory mandates for another{' '}
                      <strong>{remainingYears} years</strong> and <strong>{formatDistance(remainingMiles)}</strong>. If capacity drops below 70%, the automaker is federally required to replace or rebalance it at <strong>$0 cost</strong>.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Primary Cost Summary Card */}
          <div className="p-6 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-6 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Net Out-of-Pocket Estimate ({serviceTier.toUpperCase()})
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {formatMoney(currentSelectionData.netTotal)}
                </span>
                <span className="text-xs text-slate-400">all-in net</span>
              </div>
              <p className="text-xs text-emerald-400 font-medium">
                {currentSelectionData.title}
              </p>
            </div>

            {/* Itemized Cost Breakdown Table */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-slate-400" />
                  Hardware Battery Assembly:
                </span>
                <span className="font-semibold text-white">{formatMoney(currentSelectionData.hardware)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-slate-400" />
                  Labor ({currentSelectionData.laborHours} hrs @ {formatMoney(laborRatePerHour)}/hr):
                </span>
                <span className="font-semibold text-white">{formatMoney(currentSelectionData.laborCost)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                  Coolant Flush & HV Calibration:
                </span>
                <span className="font-semibold text-white">{formatMoney(currentSelectionData.fees)}</span>
              </div>

              {currentSelectionData.coreCredit > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" />
                    End-of-Life Core Scrap Credit:
                  </span>
                  <span>-{formatMoney(currentSelectionData.coreCredit)}</span>
                </div>
              )}
            </div>

            {/* Service & Warranty Specifications */}
            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Warranty Coverage:</span>
                <span className="font-medium text-emerald-400 text-right">{currentSelectionData.warrantyProvided}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Typical Turnaround:</span>
                <span className="font-medium text-slate-200">{currentSelectionData.turnaround}</span>
              </div>
              <div className="flex items-start justify-between gap-2 text-slate-300">
                <span className="text-slate-400 shrink-0">Cell Specification:</span>
                <span className="text-[11px] text-slate-300 text-right">{currentSelectionData.cellHealth}</span>
              </div>
            </div>
          </div>

          {/* Quick 3-Tier Side-by-Side Comparison */}
          <div className="p-5 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Pathway Price Comparison</span>
              <span className="text-[10px] text-emerald-400 font-normal">Instant Side-by-Side</span>
            </h4>

            <div className="space-y-2.5">
              {/* OEM Tier Row */}
              <div
                onClick={() => setServiceTier('oem')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  serviceTier === 'oem'
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : 'bg-[#0B0F17] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-white">Brand-New OEM Pack</div>
                  <div className="text-[11px] text-slate-400">Dealer crated, 100% capacity</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{formatMoney(oemNetTotal)}</div>
                  <div className="text-[10px] text-slate-500">3-4 yr warranty</div>
                </div>
              </div>

              {/* Remanufactured Row */}
              <div
                onClick={() => setServiceTier('reman')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  serviceTier === 'reman'
                    ? 'bg-cyan-500/10 border-cyan-500/50'
                    : 'bg-[#0B0F17] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-white">Remanufactured Pack</div>
                  <div className="text-[11px] text-slate-400">Balanced cells, certified indy</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-cyan-400">{formatMoney(remanNetTotal)}</div>
                  <div className="text-[10px] text-slate-500">Save ~{Math.round((1 - remanNetTotal / oemNetTotal) * 100)}%</div>
                </div>
              </div>

              {/* Module Swap Row */}
              <div
                onClick={() => setServiceTier('module')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  serviceTier === 'module'
                    ? 'bg-amber-500/10 border-amber-500/50'
                    : 'bg-[#0B0F17] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-white">Single Module Repair</div>
                  <div className="text-[11px] text-slate-400">Targets isolated bad cell block</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-amber-400">{formatMoney(moduleNetTotal)}</div>
                  <div className="text-[10px] text-slate-500">Save ~{Math.round((1 - moduleNetTotal / oemNetTotal) * 100)}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Economic Replacement vs. Vehicle Market Value Verdict */}
          <div className="p-5 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  Economic Feasibility Verdict
                </h4>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded font-bold ${
                  exceedsEconomicThreshold
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {repairToValueRatio}% of Value
              </span>
            </div>

            {/* Visual Ratio Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-500 ${
                    exceedsEconomicThreshold ? 'bg-red-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, repairToValueRatio)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0%</span>
                <span className="font-medium text-amber-400">50% Financial Threshold</span>
                <span>100%+</span>
              </div>
            </div>

            {/* Actionable Recommendation Verdict */}
            <div className="text-xs leading-relaxed text-slate-300 p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-2">
              {exceedsEconomicThreshold ? (
                <>
                  <p className="font-semibold text-red-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    Financial Recommendation: Do NOT Purchase a Full OEM Pack
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    At {formatMoney(currentSelectionData.netTotal)}, this repair represents{' '}
                    <strong className="text-white">{repairToValueRatio}%</strong> of the vehicle’s current{' '}
                    {formatMoney(estimatedMarketValue)} residual value. Spending this exceeds the recommended automotive total-loss threshold.
                  </p>
                  <p className="text-amber-300 text-[11px]">
                    <strong>Best Financial Alternatives:</strong> Opt for a{' '}
                    <button
                      onClick={() => setServiceTier('module')}
                      className="underline font-medium hover:text-white"
                    >
                      Module-Level Repair ({formatMoney(moduleNetTotal)})
                    </button>{' '}
                    or sell the vehicle as a rolling chassis to salvage recyclers for stationary solar storage.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    Financial Recommendation: Economically Sound Repair
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    The replacement cost ({formatMoney(currentSelectionData.netTotal)}) is well within the acceptable threshold ({repairToValueRatio}% of the vehicle’s {formatMoney(estimatedMarketValue)} value).
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Completing this service resets the traction pack lifespan for another 150,000+ miles while preserving vehicle resale value.
                  </p>
                </>
              )}
            </div>

            {/* Contextual Link to TCO Calculator */}
            <div className="pt-2 text-center">
              <Link
                href="/tco-calculator"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 group"
              >
                <span>Compare vs. buying another vehicle in our 5-year EV TCO calculator</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
