"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Zap, DollarSign, TrendingDown, BatteryCharging, ArrowRight, Fuel, Calculator } from 'lucide-react';

const PRESETS = [
  { name: 'Tesla Model 3 RWD', kwh: 60, wh_mi: 240, kwh_100km: 15.0 },
  { name: 'Tesla Model Y Long Range', kwh: 75, wh_mi: 270, kwh_100km: 16.8 },
  { name: 'Hyundai Ioniq 5 / Kia EV6', kwh: 77.4, wh_mi: 300, kwh_100km: 18.6 },
  { name: 'Ford Mustang Mach-E ER', kwh: 91, wh_mi: 330, kwh_100km: 20.5 },
  { name: 'Rivian R1T / F-150 Lightning', kwh: 131, wh_mi: 460, kwh_100km: 28.5 },
  { name: 'Custom EV', kwh: 80, wh_mi: 300, kwh_100km: 18.6 }
];

const LOCATIONS = [
  { name: 'Home Level 2 (Off-Peak TOU)', defaultRate: 0.12, efficiency: 0.90, fee: 0 },
  { name: 'Home Level 2 (Standard Peak)', defaultRate: 0.28, efficiency: 0.90, fee: 0 },
  { name: 'Public DC Fast Charger', defaultRate: 0.44, efficiency: 0.95, fee: 1.50 }
];

const CURRENCIES = [
  { symbol: '$', code: 'USD' },
  { symbol: '€', code: 'EUR' },
  { symbol: '£', code: 'GBP' },
  { symbol: '$', code: 'CAD' },
  { symbol: '$', code: 'AUD' },
  { symbol: '₹', code: 'INR' }
];

const REGIONS = [
  { id: 'us', name: '🇺🇸 United States', currency: 'USD', units: 'imperial', elecRate: 0.16, gasPrice: 3.50, iceEff: 28, distance: 12000 },
  { id: 'uk', name: '🇬🇧 United Kingdom', currency: 'GBP', units: 'imperial', elecRate: 0.24, gasPrice: 5.50, iceEff: 35, distance: 8000 },
  { id: 'eu', name: '🇪🇺 Europe (Avg)', currency: 'EUR', units: 'metric', elecRate: 0.28, gasPrice: 1.70, iceEff: 7.0, distance: 15000 },
  { id: 'ca', name: '🇨🇦 Canada', currency: 'CAD', units: 'metric', elecRate: 0.14, gasPrice: 1.60, iceEff: 8.5, distance: 15000 },
  { id: 'au', name: '🇦🇺 Australia', currency: 'AUD', units: 'metric', elecRate: 0.30, gasPrice: 1.90, iceEff: 8.0, distance: 13000 },
  { id: 'in', name: '🇮🇳 India', currency: 'INR', units: 'metric', elecRate: 8.00, gasPrice: 100.0, iceEff: 7.0, distance: 10000 }
];

export default function CalculatorComponent() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [selectedRegion, setSelectedRegion] = useState('us');
  
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customKwh, setCustomKwh] = useState(60);
  const [customConsumption, setCustomConsumption] = useState(240); // wh/mi or kwh/100km based on unitSystem

  const [startSoc, setStartSoc] = useState(10);
  const [targetSoc, setTargetSoc] = useState(80);

  const [selectedLocation, setSelectedLocation] = useState(0);
  const [electricityRate, setElectricityRate] = useState(0.12);
  const [efficiency, setEfficiency] = useState(90);

  const [gasPrice, setGasPrice] = useState(3.65);
  const [iceEfficiency, setIceEfficiency] = useState(28); // MPG or L/100km
  const [annualDistance, setAnnualDistance] = useState(12000);

  // Sync custom values when preset changes
  useEffect(() => {
    if (selectedPreset !== 5) {
      setCustomKwh(PRESETS[selectedPreset].kwh);
      setCustomConsumption(unitSystem === 'imperial' ? PRESETS[selectedPreset].wh_mi : PRESETS[selectedPreset].kwh_100km);
    }
  }, [selectedPreset, unitSystem]);

  // Sync location defaults
  useEffect(() => {
    setElectricityRate(LOCATIONS[selectedLocation].defaultRate);
    setEfficiency(LOCATIONS[selectedLocation].efficiency * 100);
  }, [selectedLocation]);

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    const r = REGIONS.find(x => x.id === regionId);
    if (r) {
      setCurrency(CURRENCIES.find(c => c.code === r.currency) || CURRENCIES[0]);
      setUnitSystem(r.units as 'imperial' | 'metric');
      setElectricityRate(r.elecRate);
      setGasPrice(r.gasPrice);
      setIceEfficiency(r.iceEff);
      setAnnualDistance(r.distance);
    }
  };

  // Calculations
  const batterySize = customKwh;
  const energyNeeded = batterySize * ((targetSoc - startSoc) / 100);
  const actualEnergyDrawn = energyNeeded / (efficiency / 100);
  
  const sessionCost = (actualEnergyDrawn * electricityRate) + LOCATIONS[selectedLocation].fee;

  // Cost Per Distance
  let evCostPerDistance = 0;
  if (unitSystem === 'imperial') {
    // customConsumption is Wh/mi
    evCostPerDistance = (customConsumption / 1000 / (efficiency / 100)) * electricityRate;
  } else {
    // customConsumption is kWh/100km. So kWh/km = customConsumption / 100
    evCostPerDistance = ((customConsumption / 100) / (efficiency / 100)) * electricityRate;
  }

  const annualEvCost = evCostPerDistance * annualDistance;

  // ICE Equivalent
  let iceCostPerDistance = 0;
  if (unitSystem === 'imperial') {
    // MPG
    iceCostPerDistance = gasPrice / iceEfficiency;
  } else {
    // L/100km
    iceCostPerDistance = (iceEfficiency / 100) * gasPrice;
  }

  const annualIceCost = iceCostPerDistance * annualDistance;
  const netSavings = annualIceCost - annualEvCost;
  const savingsPercent = Math.max(0, ((annualIceCost - annualEvCost) / annualIceCost) * 100);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.code }).format(val);
  };

  return (
    <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 sm:p-8 mt-12 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-emerald-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              EV Charging Cost Calculator
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">Configure your vehicle, rates, and region</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select 
            className="bg-[#0B0F17] border border-emerald-500/30 rounded-lg px-3 py-2 text-emerald-400 font-bold text-sm focus:ring-2 focus:ring-emerald-400 outline-none w-full md:w-auto"
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
          >
            <option value="none" disabled>Select Region...</option>
            {REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <select 
            className="bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-emerald-400 outline-none flex-1 md:flex-none"
            value={currency.code}
            onChange={(e) => setCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
          >
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
          </select>
          <div className="bg-[#0B0F17] rounded-lg p-1 border border-slate-700 flex flex-1 md:flex-none">
            <button 
              className={`flex-1 px-4 py-1.5 text-sm rounded-md transition-colors ${unitSystem === 'imperial' ? 'bg-emerald-500/20 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setUnitSystem('imperial')}
            >
              Imperial
            </button>
            <button 
              className={`flex-1 px-4 py-1.5 text-sm rounded-md transition-colors ${unitSystem === 'metric' ? 'bg-emerald-500/20 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setUnitSystem('metric')}
            >
              Metric
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-2 space-y-8 pr-0 lg:pr-8 lg:border-r border-slate-800">
          
          {/* Section 1: Vehicle */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <BatteryCharging className="w-4 h-4 text-amber-400" /> 1. Vehicle & Battery
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Vehicle Preset</label>
                <select 
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(Number(e.target.value))}
                >
                  {PRESETS.map((p, i) => <option key={i} value={i}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Usable Battery (kWh)</label>
                <input 
                  type="number" 
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  value={customKwh}
                  onChange={(e) => setCustomKwh(Number(e.target.value))}
                  disabled={selectedPreset !== 5}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Efficiency ({unitSystem === 'imperial' ? 'Wh/mi (e.g. 250)' : 'kWh/100km (e.g. 15.5)'})
                </label>
                <input 
                  type="number" step="0.1"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  value={customConsumption}
                  onChange={(e) => setCustomConsumption(Number(e.target.value))}
                  disabled={selectedPreset !== 5}
                />
              </div>
            </div>
            
            {/* SoC Sliders */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Start SoC: {startSoc}%</label>
                <input 
                  type="range" min="0" max="99" value={startSoc} 
                  onChange={(e) => setStartSoc(Math.min(Number(e.target.value), targetSoc - 1))}
                  className="w-full accent-amber-400" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Target SoC: {targetSoc}%</label>
                <input 
                  type="range" min="1" max="100" value={targetSoc} 
                  onChange={(e) => setTargetSoc(Math.max(Number(e.target.value), startSoc + 1))}
                  className="w-full accent-amber-400" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Electricity & Charging */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> 2. Electricity & Charging Profile
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-2">Charging Location</label>
                <select 
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(Number(e.target.value))}
                >
                  {LOCATIONS.map((l, i) => <option key={i} value={i}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Rate ({currency.symbol}/kWh)</label>
                <input 
                  type="number" step="0.01"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Net Efficiency (%)</label>
                <input 
                  type="number" min="50" max="100"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                  value={efficiency}
                  onChange={(e) => setEfficiency(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Section 3: ICE Comparison */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Fuel className="w-4 h-4 text-slate-400" /> 3. ICE Benchmark Comparison
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Gas ({currency.symbol}/{unitSystem === 'imperial' ? 'gal' : 'L'})</label>
                <input 
                  type="number" step="0.01"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  value={gasPrice}
                  onChange={(e) => setGasPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">ICE Efficiency ({unitSystem === 'imperial' ? 'MPG' : 'L/100km'})</label>
                <input 
                  type="number" step="0.1"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  value={iceEfficiency}
                  onChange={(e) => setIceEfficiency(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Annual {unitSystem === 'imperial' ? 'Miles' : 'KM'}</label>
                <input 
                  type="number" step="100"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  value={annualDistance}
                  onChange={(e) => setAnnualDistance(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-6 h-max sticky top-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-400" /> Cost Analysis
          </h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Session Cost ({startSoc}% to {targetSoc}%)</p>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-black text-white">{formatMoney(sessionCost)}</p>
                <p className="text-sm text-slate-500 mb-1">for {actualEnergyDrawn.toFixed(1)} kWh drawn</p>
              </div>
            </div>

            <div className="h-px bg-slate-800 w-full" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-400 mb-1">EV Cost / {unitSystem === 'imperial' ? 'Mile' : 'KM'}</p>
                <p className="text-2xl font-bold text-cyan-400">{formatMoney(evCostPerDistance)}</p>
                {unitSystem === 'metric' && <p className="text-xs text-slate-500 mt-1">{formatMoney(evCostPerDistance * 100)} / 100km</p>}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 mb-1">Gas Cost / {unitSystem === 'imperial' ? 'Mile' : 'KM'}</p>
                <p className="text-2xl font-bold text-slate-300">{formatMoney(iceCostPerDistance)}</p>
                {unitSystem === 'metric' && <p className="text-xs text-slate-500 mt-1">{formatMoney(iceCostPerDistance * 100)} / 100km</p>}
              </div>
            </div>

            <div className="h-px bg-slate-800 w-full" />

            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Annual Fuel Bill</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Electric Vehicle</span>
                <span className="text-sm font-bold text-white">{formatMoney(annualEvCost)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Gas Vehicle</span>
                <span className="text-sm font-medium text-slate-400 line-through decoration-slate-500">{formatMoney(annualIceCost)}</span>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mt-6">
              <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider mb-1">Net Annual Savings</p>
              <p className="text-3xl font-black text-emerald-400">{formatMoney(netSavings)}</p>
              <p className="text-xs text-emerald-400/80 mt-1">You save {savingsPercent.toFixed(1)}% compared to gasoline</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
