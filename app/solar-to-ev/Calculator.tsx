'use client';

import React, { useState, useMemo } from 'react';
import { Sun, Battery, Car, Zap, DollarSign, Leaf, Settings, PanelTop, ArrowRight } from 'lucide-react';

type UnitSystem = 'imperial' | 'metric';
type Strategy = 'direct' | 'battery';

const VEHICLE_PRESETS = [
  { id: 'tesla-3-y', name: 'Tesla Model Y / Model 3', effImperial: 260, effMetric: 162 },
  { id: 'ioniq-5', name: 'Hyundai Ioniq 5 / Kia EV6', effImperial: 300, effMetric: 186 },
  { id: 'rivian-r1t', name: 'Rivian R1T / F-150 Lightning', effImperial: 440, effMetric: 273 },
  { id: 'custom', name: 'Custom EV Profile', effImperial: 300, effMetric: 186 },
];

const SUN_EXPOSURE = [
  { id: 'low', label: 'Low / Cloudy (e.g. Seattle, UK)', psh: 3.0 },
  { id: 'moderate', label: 'Moderate (e.g. Midwest US, France)', psh: 4.0 },
  { id: 'high', label: 'High / Sunny (e.g. California, Spain)', psh: 5.5 },
];

export default function SolarCalculator() {
  const [units, setUnits] = useState<UnitSystem>('imperial');
  const [vehicleId, setVehicleId] = useState('tesla-3-y');
  const [customEff, setCustomEff] = useState(300);
  const [distance, setDistance] = useState(35);
  const [panelWattage, setPanelWattage] = useState(400);
  const [exposure, setExposure] = useState<number>(4.0);
  const [strategy, setStrategy] = useState<Strategy>('direct');

  const selectedVehicle = VEHICLE_PRESETS.find((v) => v.id === vehicleId) || VEHICLE_PRESETS[0];
  const efficiency = vehicleId === 'custom' 
    ? customEff 
    : (units === 'imperial' ? selectedVehicle.effImperial : selectedVehicle.effMetric);

  const results = useMemo(() => {
    const obcEfficiency = 0.90; // 90% AC-to-DC conversion
    const batteryLoss = strategy === 'battery' ? 0.90 : 1.0; // 10% roundtrip loss for home battery
    const pvDerate = 0.84; // NREL standard derate

    const dailyEnergyRequiredWh = distance * efficiency;
    const annualEnergyRequiredKwh = (dailyEnergyRequiredWh * 365) / 1000 / obcEfficiency / batteryLoss;

    const dailyPanelHarvestWh = panelWattage * exposure * pvDerate;
    const annualPanelHarvestKwh = (dailyPanelHarvestWh * 365) / 1000;

    const panelsNeeded = Math.ceil(annualEnergyRequiredKwh / annualPanelHarvestKwh);
    const arraySizeKw = (panelsNeeded * panelWattage) / 1000;
    const annualProductionKwh = panelsNeeded * annualPanelHarvestKwh;
    
    const annualDistanceAdded = (annualProductionKwh * 1000 * obcEfficiency * batteryLoss) / efficiency;
    
    // Assumed gas savings: 25 MPG, $3.50/gal -> $0.14/mi | Or Metric: 8L/100km, €1.70/L -> €0.136/km
    const costPerDistance = units === 'imperial' ? 0.14 : 0.136;
    const currency = units === 'imperial' ? '$' : '€';
    const fuelCostAvoided = distance * 365 * costPerDistance;

    return {
      panelsNeeded,
      arraySizeKw: arraySizeKw.toFixed(1),
      annualProductionKwh: Math.round(annualProductionKwh).toLocaleString(),
      annualDistanceAdded: Math.round(annualDistanceAdded).toLocaleString(),
      fuelCostAvoided: `${currency}${Math.round(fuelCostAvoided).toLocaleString()}`,
    };
  }, [distance, efficiency, panelWattage, exposure, strategy, units]);

  return (
    <div className="bg-[#131B2A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mb-16">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            Solar to EV Charging Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-1">NREL PVWatts Derate Validated</p>
        </div>
        
        {/* Unit Toggle */}
        <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => {
              setUnits('imperial');
              setDistance(Math.round(distance * 0.621371));
            }}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              units === 'imperial' ? 'bg-cyan-900/50 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Imperial
          </button>
          <button
            onClick={() => {
              setUnits('metric');
              setDistance(Math.round(distance * 1.60934));
            }}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              units === 'metric' ? 'bg-cyan-900/50 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Metric
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Controls */}
        <div className="lg:col-span-7 p-6 sm:p-8 border-r border-slate-800/50 space-y-8">
          
          {/* Vehicle Profile */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Car className="w-4 h-4 text-emerald-400" />
              Vehicle Efficiency Profile
            </label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
            >
              {VEHICLE_PRESETS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({units === 'imperial' ? `${v.effImperial} Wh/mi` : `${v.effMetric} Wh/km`})
                </option>
              ))}
            </select>
            
            {vehicleId === 'custom' && (
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="number"
                  value={customEff}
                  onChange={(e) => setCustomEff(Number(e.target.value))}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white w-32 focus:ring-2 focus:ring-cyan-500/50 outline-none"
                />
                <span className="text-slate-400 text-sm">
                  {units === 'imperial' ? 'Wh/mi' : 'Wh/km'}
                </span>
              </div>
            )}
          </div>

          {/* Commute Distance */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                Daily Commute Distance
              </label>
              <span className="text-lg font-bold text-white bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
                {distance} {units === 'imperial' ? 'miles/day' : 'km/day'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max={units === 'imperial' ? 120 : 200}
              step="5"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Panel Wattage */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <PanelTop className="w-4 h-4 text-emerald-400" />
                Solar Panel Rating
              </label>
              <select
                value={panelWattage}
                onChange={(e) => setPanelWattage(Number(e.target.value))}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none"
              >
                <option value={370}>370W (Standard)</option>
                <option value={400}>400W (High Output)</option>
                <option value={430}>430W (Premium Tier-1)</option>
              </select>
            </div>

            {/* Sun Exposure */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Sun className="w-4 h-4 text-amber-400" />
                Regional Sun Exposure
              </label>
              <select
                value={exposure}
                onChange={(e) => setExposure(Number(e.target.value))}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none"
              >
                {SUN_EXPOSURE.map((exp) => (
                  <option key={exp.id} value={exp.psh}>
                    {exp.label} - {exp.psh} PSH
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Charging Strategy */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Settings className="w-4 h-4 text-emerald-400" />
              Charging Strategy
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setStrategy('direct')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  strategy === 'direct'
                    ? 'bg-cyan-900/20 border-cyan-500/50'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-white mb-1">Direct Solar Consumption</div>
                <div className="text-xs text-slate-400">Charge during the day. Higher efficiency, zero storage loss.</div>
              </button>
              <button
                onClick={() => setStrategy('battery')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  strategy === 'battery'
                    ? 'bg-cyan-900/20 border-cyan-500/50'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-white mb-1">Home Battery Storage</div>
                <div className="text-xs text-slate-400">Store day solar, charge at night. Factors in 10% roundtrip loss.</div>
              </button>
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] to-[#0B0F19] p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <h3 className="text-lg font-bold text-white mb-8 relative z-10 flex items-center gap-2">
            System Requirements
            <div className="h-px bg-slate-800 flex-1 ml-4"></div>
          </h3>

          <div className="space-y-8 relative z-10">
            {/* Primary Metric */}
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 shadow-inner">
              <div className="text-sm font-medium text-cyan-400 mb-2">Physical Solar Panels Needed</div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">{results.panelsNeeded}</span>
                <span className="text-xl font-bold text-slate-400">Panels</span>
              </div>
              <div className="text-sm text-slate-500 mt-2">({panelWattage}W each)</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Array Size</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  {results.arraySizeKw} kW
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Annual Generation</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-400" />
                  {results.annualProductionKwh} <span className="text-sm text-slate-500 font-normal">kWh</span>
                </div>
              </div>

              <div className="space-y-1 mt-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">100% Solar Range</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                  {results.annualDistanceAdded} <span className="text-sm text-slate-500 font-normal">{units === 'imperial' ? 'mi' : 'km'}</span>
                </div>
              </div>

              <div className="space-y-1 mt-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Annual Fuel Savings</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  {results.fuelCostAvoided}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
