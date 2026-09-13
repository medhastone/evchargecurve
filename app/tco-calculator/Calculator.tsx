'use client';

import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingDown,
  Zap,
  Fuel,
  Wrench,
  Shield,
  Percent,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Gauge
} from 'lucide-react';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rateVsUSD: number;
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', rateVsUSD: 1.0 },
  { code: 'EUR', symbol: '€', rateVsUSD: 0.92 },
  { code: 'GBP', symbol: '£', rateVsUSD: 0.79 },
  { code: 'CAD', symbol: 'CA$', rateVsUSD: 1.36 },
  { code: 'AUD', symbol: 'A$', rateVsUSD: 1.52 },
  { code: 'INR', symbol: '₹', rateVsUSD: 83.5 }
];

export interface PresetModel {
  id: string;
  name: string;
  category: string;
  evName: string;
  evPrice: number;
  evEfficiencyWhMi: number; // Wh/mi
  evEfficiencyKwh100km: number; // kWh/100km
  evTaxCredit: number;
  gasName: string;
  gasPrice: number;
  gasMpg: number;
  gasL100km: number;
}

export const PRESETS: PresetModel[] = [
  {
    id: 'compact-suv',
    name: 'Compact SUV: Model Y vs. RAV4 AWD',
    category: 'Compact SUV',
    evName: 'Tesla Model Y Long Range AWD',
    evPrice: 48000,
    evEfficiencyWhMi: 270,
    evEfficiencyKwh100km: 16.8,
    evTaxCredit: 7500,
    gasName: 'Toyota RAV4 Limited AWD',
    gasPrice: 36000,
    gasMpg: 28,
    gasL100km: 8.4
  },
  {
    id: 'sedan',
    name: 'Sedan: Model 3 RWD vs. Accord EX-L',
    category: 'Midsize Sedan',
    evName: 'Tesla Model 3 RWD',
    evPrice: 39000,
    evEfficiencyWhMi: 240,
    evEfficiencyKwh100km: 14.9,
    evTaxCredit: 7500,
    gasName: 'Honda Accord EX-L 1.5T',
    gasPrice: 34000,
    gasMpg: 32,
    gasL100km: 7.35
  },
  {
    id: 'truck',
    name: 'Pickup: F-150 Lightning vs. F-150 EcoBoost',
    category: 'Full-Size Truck',
    evName: 'Ford F-150 Lightning ER',
    evPrice: 55000,
    evEfficiencyWhMi: 440,
    evEfficiencyKwh100km: 27.3,
    evTaxCredit: 7500,
    gasName: 'Ford F-150 Lariat 3.5L EcoBoost',
    gasPrice: 48000,
    gasMpg: 20,
    gasL100km: 11.76
  },
  {
    id: 'custom',
    name: 'Custom Vehicle Comparison',
    category: 'Custom Matchup',
    evName: 'Custom Electric Vehicle',
    evPrice: 45000,
    evEfficiencyWhMi: 280,
    evEfficiencyKwh100km: 17.4,
    evTaxCredit: 7500,
    gasName: 'Custom Gasoline Vehicle',
    gasPrice: 35000,
    gasMpg: 27,
    gasL100km: 8.71
  }
];

export default function CalculatorComponent() {
  // Localization & Units
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES[0]);
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('compact-suv');

  // Comparison Vehicles Input
  const [evName, setEvName] = useState('Tesla Model Y Long Range AWD');
  const [evMSRP, setEvMSRP] = useState(48000);
  const [evTaxCredit, setEvTaxCredit] = useState(7500);
  const [evEfficiencyWhMi, setEvEfficiencyWhMi] = useState(270);
  const [evEfficiencyKwh100km, setEvEfficiencyKwh100km] = useState(16.8);

  const [gasName, setGasName] = useState('Toyota RAV4 Limited AWD');
  const [gasMSRP, setGasMSRP] = useState(36000);
  const [gasMpg, setGasMpg] = useState(28);
  const [gasL100km, setGasL100km] = useState(8.4);

  // Financial Parameters
  const [annualDistance, setAnnualDistance] = useState(13500); // miles or km
  const [downPayment, setDownPayment] = useState(5000);
  const [loanTermMonths, setLoanTermMonths] = useState(60);
  const [loanApr, setLoanApr] = useState(5.5);

  // Energy & Fuel
  const [homeElecRate, setHomeElecRate] = useState(0.13); // $/kWh
  const [publicElecRate, setPublicElecRate] = useState(0.42); // $/kWh
  const [homeChargingSplit, setHomeChargingSplit] = useState(85); // 85% home, 15% public
  const [gasPricePerUnit, setGasPricePerUnit] = useState(3.60); // $/gal or $/L

  // Maintenance & Consumables
  const [evTirePremiumPer35k, setEvTirePremiumPer35k] = useState(250); // extra wear cost
  const [iceAnnualMaintenance, setIceAnnualMaintenance] = useState(650); // oil, filters, belts, brakes
  const [evAnnualMaintenance, setEvAnnualMaintenance] = useState(200); // wipers, cabin filter, brake fluid

  // Insurance & Residual
  const [iceAnnualInsurance, setIceAnnualInsurance] = useState(1400);
  const [evAnnualInsurance, setEvAnnualInsurance] = useState(1570); // ~12% premium
  const [evRetainedValuePct, setEvRetainedValuePct] = useState(48); // 5-yr retained %
  const [gasRetainedValuePct, setGasRetainedValuePct] = useState(50); // 5-yr retained %

  // Load Preset
  const handlePresetSelect = (id: string) => {
    setSelectedPresetId(id);
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset) return;

    setEvName(preset.evName);
    setEvMSRP(preset.evPrice);
    setEvTaxCredit(preset.evTaxCredit);
    setEvEfficiencyWhMi(preset.evEfficiencyWhMi);
    setEvEfficiencyKwh100km(preset.evEfficiencyKwh100km);

    setGasName(preset.gasName);
    setGasMSRP(preset.gasPrice);
    setGasMpg(preset.gasMpg);
    setGasL100km(preset.gasL100km);
  };

  // Switch Unit System
  const handleUnitToggle = (newUnits: 'imperial' | 'metric') => {
    if (newUnits === unitSystem) return;
    setUnitSystem(newUnits);
    if (newUnits === 'metric') {
      setAnnualDistance(Math.round(annualDistance * 1.60934));
      setGasPricePerUnit(Number((gasPricePerUnit / 3.78541).toFixed(2)) || 1.55);
    } else {
      setAnnualDistance(Math.round(annualDistance / 1.60934));
      setGasPricePerUnit(Number((gasPricePerUnit * 3.78541).toFixed(2)) || 3.60);
    }
  };

  // Format monetary value
  const formatMoney = (amount: number) => {
    return `${currency.symbol}${Math.round(amount).toLocaleString('en-US')}`;
  };

  // Financial & Amortization Engine
  const calculation = useMemo(() => {
    // 1. Financing Calculations
    const monthlyRate = loanApr > 0 ? (loanApr / 100) / 12 : 0;
    
    // EV Loan Principal (MSRP minus Incentives minus Down payment)
    const evEffectivePrice = Math.max(0, evMSRP - evTaxCredit);
    const evPrincipal = Math.max(0, evEffectivePrice - downPayment);
    let evMonthlyPayment = 0;
    let evTotalInterest = 0;

    if (evPrincipal > 0 && loanTermMonths > 0) {
      if (monthlyRate > 0) {
        evMonthlyPayment = (evPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
          (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
        evTotalInterest = Math.max(0, (evMonthlyPayment * loanTermMonths) - evPrincipal);
      } else {
        evMonthlyPayment = evPrincipal / loanTermMonths;
        evTotalInterest = 0;
      }
    }

    // Gas Loan Principal (MSRP minus Down payment)
    const gasPrincipal = Math.max(0, gasMSRP - downPayment);
    let gasMonthlyPayment = 0;
    let gasTotalInterest = 0;

    if (gasPrincipal > 0 && loanTermMonths > 0) {
      if (monthlyRate > 0) {
        gasMonthlyPayment = (gasPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
          (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
        gasTotalInterest = Math.max(0, (gasMonthlyPayment * loanTermMonths) - gasPrincipal);
      } else {
        gasMonthlyPayment = gasPrincipal / loanTermMonths;
        gasTotalInterest = 0;
      }
    }

    // Total 5-Year Capital Outlay
    const ev5YrCapital = downPayment + (evMonthlyPayment * Math.min(60, loanTermMonths));
    const gas5YrCapital = downPayment + (gasMonthlyPayment * Math.min(60, loanTermMonths));

    // 2. 5-Year Resale & Depreciation
    const ev5YrResaleValue = (evMSRP * evRetainedValuePct) / 100;
    const gas5YrResaleValue = (gasMSRP * gasRetainedValuePct) / 100;

    const evDepreciationLoss = evMSRP - ev5YrResaleValue;
    const gasDepreciationLoss = gasMSRP - gas5YrResaleValue;

    // 3. Fuel & Energy Over 5 Years
    const total5YrDistance = annualDistance * 5;
    
    // Blended electricity rate
    const homeFraction = homeChargingSplit / 100;
    const publicFraction = (100 - homeChargingSplit) / 100;
    const blendedRateKwh = (homeFraction * homeElecRate) + (publicFraction * publicElecRate);
    const chargingEfficiency = 0.90; // AC-to-DC & BMS loss

    let annualEvKwh = 0;
    if (unitSystem === 'imperial') {
      // Wh/mi converted to kWh drawn at wall
      annualEvKwh = ((annualDistance * evEfficiencyWhMi) / 1000) / chargingEfficiency;
    } else {
      // kWh/100km drawn at wall
      annualEvKwh = ((annualDistance * (evEfficiencyKwh100km / 100))) / chargingEfficiency;
    }
    const annualEvFuelCost = annualEvKwh * blendedRateKwh;
    const ev5YrFuelCost = annualEvFuelCost * 5;

    let annualGasUnits = 0;
    if (unitSystem === 'imperial') {
      annualGasUnits = annualDistance / Math.max(1, gasMpg);
    } else {
      annualGasUnits = annualDistance * (Math.max(0.1, gasL100km) / 100);
    }
    const annualGasFuelCost = annualGasUnits * gasPricePerUnit;
    const gas5YrFuelCost = annualGasFuelCost * 5;
    const fiveYearFuelSavings = gas5YrFuelCost - ev5YrFuelCost;

    // 4. Maintenance & Consumables Over 5 Years
    // EV Tire Wear Factor: +evTirePremiumPer35k per 35,000 miles (or ~56,327 km)
    const tireCycleDistance = unitSystem === 'imperial' ? 35000 : 56327;
    const ev5YrTireCost = (total5YrDistance / tireCycleDistance) * evTirePremiumPer35k;
    const ev5YrRoutineMaint = evAnnualMaintenance * 5;
    const ev5YrTotalMaintenance = ev5YrRoutineMaint + ev5YrTireCost;

    const gas5YrTotalMaintenance = iceAnnualMaintenance * 5;
    const fiveYearMaintenanceSavings = gas5YrTotalMaintenance - ev5YrTotalMaintenance;

    // 5. Insurance Over 5 Years
    const ev5YrInsurance = evAnnualInsurance * 5;
    const gas5YrInsurance = iceAnnualInsurance * 5;

    // 6. 5-Year Total Cost of Ownership (Accounting Equation):
    // TCO = Capital Outlay (or Depreciation + Financing - Incentives) + Fuel + Maintenance + Insurance - Resale Value
    const evTotalTCO = (ev5YrCapital + ev5YrFuelCost + ev5YrTotalMaintenance + ev5YrInsurance) - ev5YrResaleValue;
    const gasTotalTCO = (gas5YrCapital + gas5YrFuelCost + gas5YrTotalMaintenance + gas5YrInsurance) - gas5YrResaleValue;

    const net5YrDelta = gasTotalTCO - evTotalTCO; // positive means EV saved money

    // 7. Month-by-Month Cumulative Cost & Break-Even Curve (Months 0 to 60)
    const monthlyData: {
      month: number;
      miles: number;
      evCumCost: number;
      gasCumCost: number;
      delta: number;
    }[] = [];

    const monthlyDistance = annualDistance / 12;
    const monthlyEvFuel = annualEvFuelCost / 12;
    const monthlyGasFuel = annualGasFuelCost / 12;
    const monthlyEvMaint = (evAnnualMaintenance + ((annualDistance / tireCycleDistance) * evTirePremiumPer35k)) / 12;
    const monthlyGasMaint = iceAnnualMaintenance / 12;
    const monthlyEvInsurance = evAnnualInsurance / 12;
    const monthlyGasInsurance = iceAnnualInsurance / 12;

    // Month 0 (Point of Sale Outlay)
    let evRunningSpent = downPayment;
    let gasRunningSpent = downPayment;

    // Track residual equity curve over 60 months
    const getEvResidualAtMonth = (m: number) => {
      // Linear-to-exponential depreciation approximation
      const totalDeprec = evMSRP - ev5YrResaleValue;
      return evMSRP - (totalDeprec * (m / 60));
    };

    const getGasResidualAtMonth = (m: number) => {
      const totalDeprec = gasMSRP - gas5YrResaleValue;
      return gasMSRP - (totalDeprec * (m / 60));
    };

    let breakEvenMonth: number | null = null;
    let breakEvenMiles = 0;

    // Check if EV is already cheaper at Day 1 (due to incentives)
    const day1EvTCO = downPayment - evTaxCredit;
    const day1GasTCO = downPayment;

    if (day1EvTCO < day1GasTCO && (evMSRP - evTaxCredit) <= gasMSRP) {
      breakEvenMonth = 0;
      breakEvenMiles = 0;
    }

    for (let m = 1; m <= 60; m++) {
      if (m <= loanTermMonths) {
        evRunningSpent += evMonthlyPayment;
        gasRunningSpent += gasMonthlyPayment;
      }
      evRunningSpent += monthlyEvFuel + monthlyEvMaint + monthlyEvInsurance;
      gasRunningSpent += monthlyGasFuel + monthlyGasMaint + monthlyGasInsurance;

      const currentEvTCO = evRunningSpent - getEvResidualAtMonth(m);
      const currentGasTCO = gasRunningSpent - getGasResidualAtMonth(m);

      const cumDist = Math.round(m * monthlyDistance);

      if (breakEvenMonth === null && currentEvTCO <= currentGasTCO) {
        breakEvenMonth = m;
        breakEvenMiles = cumDist;
      }

      // Record year milestones (months 12, 24, 36, 48, 60)
      if (m % 12 === 0 || m === 60) {
        monthlyData.push({
          month: m,
          miles: cumDist,
          evCumCost: Math.round(currentEvTCO),
          gasCumCost: Math.round(currentGasTCO),
          delta: Math.round(currentGasTCO - currentEvTCO)
        });
      }
    }

    return {
      evPrincipal,
      gasPrincipal,
      evMonthlyPayment,
      gasMonthlyPayment,
      evTotalInterest,
      gasTotalInterest,
      ev5YrCapital,
      gas5YrCapital,
      ev5YrResaleValue,
      gas5YrResaleValue,
      evDepreciationLoss,
      gasDepreciationLoss,
      annualEvFuelCost,
      annualGasFuelCost,
      ev5YrFuelCost,
      gas5YrFuelCost,
      fiveYearFuelSavings,
      ev5YrTotalMaintenance,
      gas5YrTotalMaintenance,
      fiveYearMaintenanceSavings,
      ev5YrInsurance,
      gas5YrInsurance,
      evTotalTCO,
      gasTotalTCO,
      net5YrDelta,
      breakEvenMonth,
      breakEvenMiles,
      monthlyData
    };
  }, [
    evMSRP,
    evTaxCredit,
    evEfficiencyWhMi,
    evEfficiencyKwh100km,
    gasMSRP,
    gasMpg,
    gasL100km,
    annualDistance,
    downPayment,
    loanTermMonths,
    loanApr,
    homeElecRate,
    publicElecRate,
    homeChargingSplit,
    gasPricePerUnit,
    evTirePremiumPer35k,
    iceAnnualMaintenance,
    evAnnualMaintenance,
    iceAnnualInsurance,
    evAnnualInsurance,
    evRetainedValuePct,
    gasRetainedValuePct,
    unitSystem
  ]);

  return (
    <div id="tco-calculator-container" className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-slate-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 5-Year Lifecycle Model
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              EV vs Gas
            </span>{' '}
            5-Year Total Cost of Ownership Calculator
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Simulate purchase financing, off-peak energy vs. gas, tire wear, and resale depreciation
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Currency Selector */}
          <div className="flex items-center bg-[#0B0F17] rounded-xl border border-slate-700 px-3 py-1.5 text-sm">
            <DollarSign className="w-4 h-4 text-emerald-400 mr-1.5" />
            <select
              id="currency-selector"
              aria-label="Select Currency"
              value={currency.code}
              onChange={(e) => {
                const found = CURRENCIES.find((c) => c.code === e.target.value);
                if (found) setCurrency(found);
              }}
              className="bg-transparent text-white font-medium outline-none cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-[#0B0F17] text-white">
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Imperial / Metric Unit Toggle */}
          <div className="flex items-center bg-[#0B0F17] rounded-xl border border-slate-700 p-1 text-sm font-medium">
            <button
              id="unit-toggle-imperial"
              type="button"
              onClick={() => handleUnitToggle('imperial')}
              className={`px-3 py-1 rounded-lg transition-all ${
                unitSystem === 'imperial'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Miles (US)
            </button>
            <button
              id="unit-toggle-metric"
              type="button"
              onClick={() => handleUnitToggle('metric')}
              className={`px-3 py-1 rounded-lg transition-all ${
                unitSystem === 'metric'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kilometers (Metric)
            </button>
          </div>
        </div>
      </div>

      {/* Preset Matchups */}
      <div className="py-6 border-b border-slate-800 relative z-10">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Select Vehicle Comparison Benchmark
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              id={`preset-btn-${p.id}`}
              type="button"
              onClick={() => handlePresetSelect(p.id)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                selectedPresetId === p.id
                  ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500'
                  : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="text-xs font-semibold text-emerald-400 mb-1">{p.category}</div>
              <div className="text-sm font-bold truncate">{p.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 relative z-10">
        {/* Left Side: Input Modules (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Module 1: Vehicle Purchase & Financing */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              1. Purchase Price &amp; Clean Energy Incentives
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* EV Parameters */}
              <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Electric Vehicle (EV)
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">EV Model Label</label>
                  <input
                    id="ev-model-name-input"
                    type="text"
                    value={evName}
                    onChange={(e) => setEvName(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">MSRP ({currency.symbol})</label>
                    <input
                      id="ev-msrp-input"
                      type="number"
                      step="500"
                      value={evMSRP}
                      onChange={(e) => setEvMSRP(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Tax Credit / Rebate</label>
                    <input
                      id="ev-tax-credit-input"
                      type="number"
                      step="500"
                      value={evTaxCredit}
                      onChange={(e) => setEvTaxCredit(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-emerald-400 font-semibold focus:ring-1 focus:ring-emerald-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Gas Parameters */}
              <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Gasoline (ICE) Benchmark
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Gas Model Label</label>
                  <input
                    id="gas-model-name-input"
                    type="text"
                    value={gasName}
                    onChange={(e) => setGasName(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">MSRP ({currency.symbol})</label>
                  <input
                    id="gas-msrp-input"
                    type="number"
                    step="500"
                    value={gasMSRP}
                    onChange={(e) => setGasMSRP(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Loan Financing Shared Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Down Payment ({currency.symbol})</label>
                <input
                  id="down-payment-input"
                  type="number"
                  step="500"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Financing Term</label>
                <select
                  id="loan-term-select"
                  value={loanTermMonths}
                  onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                  className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                >
                  <option value={36}>36 Months (3 Yrs)</option>
                  <option value={48}>48 Months (4 Yrs)</option>
                  <option value={60}>60 Months (5 Yrs)</option>
                  <option value={72}>72 Months (6 Yrs)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Loan APR (%)</label>
                <input
                  id="loan-apr-input"
                  type="number"
                  step="0.1"
                  value={loanApr}
                  onChange={(e) => setLoanApr(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Module 2: Driving Distance & Energy Rates */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              2. Annual Mileage &amp; Energy vs. Fuel Costs
            </h3>

            {/* Mileage Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-400 font-medium">
                  Annual Driving Distance:
                </span>
                <span className="text-white font-extrabold text-sm">
                  {annualDistance.toLocaleString()} {unitSystem === 'imperial' ? 'Miles/year' : 'KM/year'}
                </span>
              </div>
              <input
                id="annual-distance-slider"
                type="range"
                min={unitSystem === 'imperial' ? 5000 : 8000}
                max={unitSystem === 'imperial' ? 30000 : 50000}
                step={unitSystem === 'imperial' ? 500 : 1000}
                value={annualDistance}
                onChange={(e) => setAnnualDistance(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* EV Energy Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  EV Consumption ({unitSystem === 'imperial' ? 'Wh/mi' : 'kWh/100km'})
                </label>
                {unitSystem === 'imperial' ? (
                  <input
                    id="ev-consumption-imperial-input"
                    type="number"
                    step="5"
                    value={evEfficiencyWhMi}
                    onChange={(e) => setEvEfficiencyWhMi(Number(e.target.value))}
                    className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-400 outline-none"
                  />
                ) : (
                  <input
                    id="ev-consumption-metric-input"
                    type="number"
                    step="0.1"
                    value={evEfficiencyKwh100km}
                    onChange={(e) => setEvEfficiencyKwh100km(Number(e.target.value))}
                    className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-400 outline-none"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Home Off-Peak ({currency.symbol}/kWh)
                </label>
                <input
                  id="home-elec-rate-input"
                  type="number"
                  step="0.01"
                  value={homeElecRate}
                  onChange={(e) => setHomeElecRate(Number(e.target.value))}
                  className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Public Fast DCFC ({currency.symbol}/kWh)
                </label>
                <input
                  id="public-elec-rate-input"
                  type="number"
                  step="0.01"
                  value={publicElecRate}
                  onChange={(e) => setPublicElecRate(Number(e.target.value))}
                  className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-400 outline-none"
                />
              </div>
            </div>

            {/* Home vs Public charging ratio */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-400">Home Level 2 vs. Public DCFC Split:</span>
                <span className="text-cyan-400 font-bold">
                  {homeChargingSplit}% Home / {100 - homeChargingSplit}% Public
                </span>
              </div>
              <input
                id="charging-split-slider"
                type="range"
                min={0}
                max={100}
                step={5}
                value={homeChargingSplit}
                onChange={(e) => setHomeChargingSplit(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Gas Vehicle Fuel Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Gasoline Price ({currency.symbol}/{unitSystem === 'imperial' ? 'gallon' : 'liter'})
                </label>
                <input
                  id="gas-price-input"
                  type="number"
                  step="0.05"
                  value={gasPricePerUnit}
                  onChange={(e) => setGasPricePerUnit(Number(e.target.value))}
                  className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-amber-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Gas Fuel Economy ({unitSystem === 'imperial' ? 'MPG' : 'L/100km'})
                </label>
                {unitSystem === 'imperial' ? (
                  <input
                    id="gas-mpg-input"
                    type="number"
                    step="0.5"
                    value={gasMpg}
                    onChange={(e) => setGasMpg(Number(e.target.value))}
                    className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  />
                ) : (
                  <input
                    id="gas-l100km-input"
                    type="number"
                    step="0.1"
                    value={gasL100km}
                    onChange={(e) => setGasL100km(Number(e.target.value))}
                    className="w-full bg-[#131B2A] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Module 3: Maintenance, Insurance & Resale Depreciation */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              3. Maintenance, Tire Wear &amp; 5-Year Resale Value
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* EV Service & Tire Premium */}
              <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  EV Service &amp; Tire Consumables
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    EV Annual Service (cabin filter, wipers)
                  </label>
                  <input
                    id="ev-annual-service-input"
                    type="number"
                    step="25"
                    value={evAnnualMaintenance}
                    onChange={(e) => setEvAnnualMaintenance(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    EV Tire Wear Premium (+{currency.symbol} per 35k mi)
                  </label>
                  <input
                    id="ev-tire-premium-input"
                    type="number"
                    step="25"
                    value={evTirePremiumPer35k}
                    onChange={(e) => setEvTirePremiumPer35k(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Accounts for instant torque and curb weight on rubber wear.
                  </span>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    EV 5-Year Retained Resale Value (%)
                  </label>
                  <input
                    id="ev-retained-value-input"
                    type="number"
                    min="10"
                    max="90"
                    value={evRetainedValuePct}
                    onChange={(e) => setEvRetainedValuePct(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-400 outline-none"
                  />
                </div>
              </div>

              {/* Gas Service & Resale */}
              <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Gas (ICE) Routine Service &amp; Resale
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    ICE Annual Service (oil, plugs, brake pads)
                  </label>
                  <input
                    id="ice-annual-service-input"
                    type="number"
                    step="50"
                    value={iceAnnualMaintenance}
                    onChange={(e) => setIceAnnualMaintenance(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    ICE Annual Insurance ({currency.symbol}/yr)
                  </label>
                  <input
                    id="ice-insurance-input"
                    type="number"
                    step="50"
                    value={iceAnnualInsurance}
                    onChange={(e) => {
                      const val = Math.max(0, Number(e.target.value));
                      setIceAnnualInsurance(val);
                      // keep EV at ~12% higher unless manually overridden
                      setEvAnnualInsurance(Math.round(val * 1.12));
                    }}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    ICE 5-Year Retained Resale Value (%)
                  </label>
                  <input
                    id="ice-retained-value-input"
                    type="number"
                    min="10"
                    max="90"
                    value={gasRetainedValuePct}
                    onChange={(e) => setGasRetainedValuePct(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Real-Time Dynamic Output Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Break-Even Badge Card */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#0B0F17] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Financial Break-Even Horizon
              </span>
              <Gauge className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="mb-6">
              {calculation.breakEvenMonth === 0 ? (
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                    Immediate Day 1
                  </div>
                  <p className="text-slate-300 text-sm mt-1">
                    With available tax credits ({currency.symbol}{evTaxCredit.toLocaleString()}), the EV is cheaper from day one!
                  </p>
                </div>
              ) : calculation.breakEvenMonth !== null ? (
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Month <span className="text-emerald-400">{calculation.breakEvenMonth}</span>
                  </div>
                  <p className="text-slate-300 text-sm mt-1">
                    Reached at approximately{' '}
                    <span className="text-emerald-400 font-bold">
                      {calculation.breakEvenMiles.toLocaleString()} {unitSystem === 'imperial' ? 'Miles' : 'KM'}
                    </span>
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                    Beyond 5 Years (60+ Mos)
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    High initial MSRP delta or low annual mileage pushes parity past year 5.
                  </p>
                </div>
              )}
            </div>

            {/* Net 5-Year Disruption Delta */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 mb-6">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                Net 5-Year Ownership Delta
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-3xl sm:text-4xl font-black ${
                    calculation.net5YrDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {calculation.net5YrDelta >= 0 ? '+' : ''}
                  {formatMoney(calculation.net5YrDelta)}
                </span>
                <span className="text-xs text-slate-400">
                  {calculation.net5YrDelta >= 0 ? 'Saved with EV' : 'Cheaper with Gas'}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Includes purchase financing, fuel, consumables, and 5-yr resale recovery.
              </div>
            </div>

            {/* Total 5-Yr TCO Side-by-Side */}
            <div className="grid grid-cols-2 gap-3 pb-6 border-b border-slate-800">
              <div className="bg-[#0B0F17] rounded-xl p-3.5 border border-slate-800">
                <div className="text-xs text-emerald-400 font-bold mb-1 truncate">
                  EV 5-Yr Net TCO
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {formatMoney(calculation.evTotalTCO)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Resale: {formatMoney(calculation.ev5YrResaleValue)}
                </div>
              </div>

              <div className="bg-[#0B0F17] rounded-xl p-3.5 border border-slate-800">
                <div className="text-xs text-amber-400 font-bold mb-1 truncate">
                  Gas 5-Yr Net TCO
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {formatMoney(calculation.gasTotalTCO)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Resale: {formatMoney(calculation.gas5YrResaleValue)}
                </div>
              </div>
            </div>

            {/* 5-Year Cost Breakdown Table */}
            <div className="pt-5 space-y-3 text-xs">
              <div className="font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Category Breakdown</span>
                <span>EV vs. Gas</span>
              </div>

              {/* Fuel / Energy */}
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> 5-Yr Energy / Fuel:
                </span>
                <span className="font-semibold text-white">
                  <span className="text-emerald-400">{formatMoney(calculation.ev5YrFuelCost)}</span>
                  {' / '}
                  <span className="text-amber-400">{formatMoney(calculation.gas5YrFuelCost)}</span>
                </span>
              </div>

              {/* Scheduled Maintenance */}
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" /> Maintenance &amp; Tires:
                </span>
                <span className="font-semibold text-white">
                  <span className="text-emerald-400">{formatMoney(calculation.ev5YrTotalMaintenance)}</span>
                  {' / '}
                  <span className="text-amber-400">{formatMoney(calculation.gas5YrTotalMaintenance)}</span>
                </span>
              </div>

              {/* Insurance */}
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-400" /> 5-Yr Insurance:
                </span>
                <span className="font-semibold text-white">
                  <span className="text-slate-300">{formatMoney(calculation.ev5YrInsurance)}</span>
                  {' / '}
                  <span className="text-slate-400">{formatMoney(calculation.gas5YrInsurance)}</span>
                </span>
              </div>

              {/* Depreciation Loss */}
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" /> Depreciation Loss:
                </span>
                <span className="font-semibold text-white">
                  <span className="text-slate-300">{formatMoney(calculation.evDepreciationLoss)}</span>
                  {' / '}
                  <span className="text-slate-400">{formatMoney(calculation.gasDepreciationLoss)}</span>
                </span>
              </div>

              {/* Loan Interest */}
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-emerald-400" /> Financing Interest:
                </span>
                <span className="font-semibold text-white">
                  <span className="text-slate-300">{formatMoney(calculation.evTotalInterest)}</span>
                  {' / '}
                  <span className="text-slate-400">{formatMoney(calculation.gasTotalInterest)}</span>
                </span>
              </div>
            </div>

            {/* Visual Progress Bar of Cumulative Milestones */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Year 1–5 Cumulative Cost Trajectory
              </div>
              <div className="space-y-2">
                {calculation.monthlyData.map((item) => (
                  <div key={item.month} className="text-xs">
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Year {item.month / 12} ({item.miles.toLocaleString()} {unitSystem === 'imperial' ? 'mi' : 'km'})</span>
                      <span className={item.delta >= 0 ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                        {item.delta >= 0 ? `EV Saves ${formatMoney(item.delta)}` : `Gas ahead by ${formatMoney(-item.delta)}`}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="bg-emerald-400 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(10, (item.evCumCost / Math.max(item.evCumCost, item.gasCumCost)) * 100))}%`
                        }}
                      />
                      <div
                        className="bg-amber-400 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(10, (item.gasCumCost / Math.max(item.evCumCost, item.gasCumCost)) * 100))}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
