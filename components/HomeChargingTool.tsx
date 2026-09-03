'use client';

import React, { useState, useMemo } from 'react';
import { VEHICLES } from '@/data/evModels';
import { 
  Zap, Plug, Home, Battery, Fuel, DollarSign, Clock, CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CHARGERS = [
  { id: 'l1', name: 'Standard Outlet (L1)', specs: '120V / 12A', kw: 1.4 },
  { id: 'nema', name: 'NEMA 14-50 (L2)', specs: '240V / 32A', kw: 7.7 },
  { id: 'wallbox', name: 'Hardwired Wallbox', specs: '240V / 48A', kw: 11.5 },
  { id: 'eu', name: '3-Phase (EU/UK)', specs: '400V / 16A', kw: 11.0 },
];

export default function HomeChargingTool() {
  const evModels = Object.values(VEHICLES);
  const [vehicleId, setVehicleId] = useState(evModels[0].id);
  
  const [chargerId, setChargerId] = useState('wallbox');
  const [startSoc, setStartSoc] = useState(20);
  const [endSoc, setEndSoc] = useState(80);
  
  const [offPeakRate, setOffPeakRate] = useState(0.12);
  const [peakRate, setPeakRate] = useState(0.35);
  
  const [mpg, setMpg] = useState(30);
  const [gasPrice, setGasPrice] = useState(3.80);
  const [annualMiles, setAnnualMiles] = useState(12000);

  const vehicle = useMemo(() => evModels.find(v => v.id === vehicleId) || evModels[0], [vehicleId, evModels]);
  const charger = CHARGERS.find(c => c.id === chargerId) || CHARGERS[2];

  // Enforce Start < End
  const handleStartChange = (val: number) => {
    if (val >= endSoc) setEndSoc(Math.min(100, val + 5));
    setStartSoc(val);
  };
  const handleEndChange = (val: number) => {
    if (val <= startSoc) setStartSoc(Math.max(0, val - 5));
    setEndSoc(val);
  };

  const results = useMemo(() => {
    const packKwh = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;
    const epaRange = vehicle.epaRangeMiles || 300;
    const miPerKwh = epaRange / packKwh;
    
    // Session calculations
    const socDiff = (endSoc - startSoc) / 100;
    const rawEnergyNeededKwh = packKwh * socDiff;
    const actualEnergyNeededKwh = rawEnergyNeededKwh / 0.90; // 90% AC inverter efficiency
    
    const chargeTimeHours = actualEnergyNeededKwh / charger.kw;
    const milesAddedPerHour = charger.kw * 0.90 * miPerKwh;
    
    const offPeakCost = actualEnergyNeededKwh * offPeakRate;
    const peakCost = actualEnergyNeededKwh * peakRate;

    // Annual comparisons
    const annualEnergyKwh = (annualMiles / miPerKwh) / 0.90;
    const annualHomeCost = annualEnergyKwh * offPeakRate;
    const annualDcCost = (annualMiles / miPerKwh) * 0.45; // Approx $0.45/kWh for public DC Fast
    const annualGasCost = (annualMiles / mpg) * gasPrice;

    return {
      chargeTimeHours,
      milesAddedPerHour,
      offPeakCost,
      peakCost,
      annualHomeCost,
      annualDcCost,
      annualGasCost,
      savingsVsGas: annualGasCost - annualHomeCost,
      savingsVsDc: annualDcCost - annualHomeCost,
      actualEnergyNeededKwh
    };
  }, [vehicle, charger, startSoc, endSoc, offPeakRate, peakRate, mpg, gasPrice, annualMiles]);

  const formatHrs = (decimalHrs: number) => {
    const hrs = Math.floor(decimalHrs);
    const mins = Math.round((decimalHrs - hrs) * 60);
    if (hrs === 0) return `${mins}m`;
    if (mins === 0) return `${hrs}h`;
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* Vehicle */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Select EV Model</label>
            <select 
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
            >
              {evModels.map((v: any) => (
                <option key={v.id} value={v.id}>{v.name} ({v.batteryCapacity} kWh)</option>
              ))}
            </select>
          </div>

          {/* Charger Types */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Home Setup</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHARGERS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setChargerId(c.id)}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all flex flex-col gap-1",
                    chargerId === c.id 
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                      : "bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300"
                  )}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-sm">{c.name}</span>
                    <Zap className={cn("w-4 h-4", chargerId === c.id ? "text-emerald-400" : "text-slate-500")} />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs text-slate-500">{c.specs}</span>
                    <span className="text-xs font-bold bg-slate-800 px-2 py-0.5 rounded">{c.kw} kW</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Charge Window */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-lg font-bold text-white">Daily Session Target</h3>
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-400">{startSoc}% → {endSoc}%</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-300">Plug-in SOC</span>
                  <span className="text-sm font-bold text-white">{startSoc}%</span>
                </div>
                <input 
                  type="range" min="0" max="99" 
                  value={startSoc} onChange={(e) => handleStartChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-300">Target SOC</span>
                  <span className="text-sm font-bold text-white">{endSoc}%</span>
                </div>
                <input 
                  type="range" min="1" max="100" 
                  value={endSoc} onChange={(e) => handleEndChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Economics Inputs */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Utility & Fuel Costs</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Off-Peak ($/kWh)</label>
                <input 
                  type="number" step="0.01" min="0"
                  value={offPeakRate} onChange={(e) => setOffPeakRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-emerald-400 font-bold rounded-xl p-2 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Peak ($/kWh)</label>
                <input 
                  type="number" step="0.01" min="0"
                  value={peakRate} onChange={(e) => setPeakRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-orange-400 font-bold rounded-xl p-2 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Gas Price ($/gal)</label>
                <input 
                  type="number" step="0.1" min="0"
                  value={gasPrice} onChange={(e) => setGasPrice(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Gas Car (MPG)</label>
                <input 
                  type="number" step="1" min="10"
                  value={mpg} onChange={(e) => setMpg(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Annual Driving</label>
                <span className="text-sm font-bold text-white">{annualMiles.toLocaleString()} mi</span>
              </div>
              <input 
                type="range" min="5000" max="35000" step="500"
                value={annualMiles} onChange={(e) => setAnnualMiles(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: RESULTS */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* Current Session Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Speed & Duration */}
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl relative overflow-hidden">
              <Clock className="absolute top-4 right-4 w-16 h-16 text-slate-700/50" />
              <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Session Duration</h4>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black text-white">{formatHrs(results.chargeTimeHours)}</span>
              </div>
              
              <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Charging Speed</span>
                  <span className="text-sm font-bold text-emerald-400">+{Math.round(results.milesAddedPerHour)} mi/hr</span>
                </div>
              </div>
            </div>

            {/* Session Cost */}
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl relative overflow-hidden">
              <DollarSign className="absolute top-4 right-4 w-16 h-16 text-slate-700/50" />
              <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Session Cost (Off-Peak)</h4>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl text-emerald-400 font-bold">$</span>
                <span className="text-5xl font-black text-emerald-400">{results.offPeakCost.toFixed(2)}</span>
              </div>
              
              <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Peak Rate Warning</span>
                  <span className="text-sm font-bold text-orange-400">${results.peakCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">AC Inverter Loss Factored In</h4>
              <p className="text-sm text-blue-200/80 leading-relaxed">
                Home chargers supply AC power, but the battery stores DC power. The vehicle&apos;s onboard converter handles this conversion, resulting in approximately <strong>10% energy loss as heat</strong>. This calculator automatically bills you for {results.actualEnergyNeededKwh.toFixed(1)} kWh drawn from the wall to safely put {(results.actualEnergyNeededKwh * 0.9).toFixed(1)} kWh into the pack.
              </p>
            </div>
          </div>

          {/* Annual Fuel Savings Dashboard */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl mt-6">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Annual Economics Breakdown</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Home EV */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Home className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Home EV</span>
                </div>
                <div className="text-3xl font-black text-white mb-1">${Math.round(results.annualHomeCost)}<span className="text-sm font-normal text-slate-400">/yr</span></div>
                <p className="text-xs text-slate-500">Charging off-peak 100%</p>
              </div>

              {/* Public Fast */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Public DC</span>
                </div>
                <div className="text-3xl font-black text-white mb-1">${Math.round(results.annualDcCost)}<span className="text-sm font-normal text-slate-400">/yr</span></div>
                <p className="text-xs text-slate-500">Assumes avg $0.45/kWh</p>
              </div>

              {/* Gas Car */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Fuel className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-bold text-red-400 uppercase tracking-wider">Gas Car</span>
                </div>
                <div className="text-3xl font-black text-white mb-1">${Math.round(results.annualGasCost)}<span className="text-sm font-normal text-slate-400">/yr</span></div>
                <p className="text-xs text-slate-500">{mpg} MPG @ ${gasPrice.toFixed(2)}/gal</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-slate-400 font-medium mb-1">Total Savings Charging at Home vs Gas</h4>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-emerald-400">+${Math.round(results.savingsVsGas)}</span>
                  <span className="text-sm text-emerald-500/80 uppercase tracking-wider font-bold">In Your Pocket<br/>Every Year</span>
                </div>
              </div>
              
              <div className="hidden sm:block h-16 w-px bg-slate-700"></div>

              <div>
                <h4 className="text-slate-400 font-medium mb-1">Total Savings vs Exclusively Fast Charging</h4>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-cyan-400">+${Math.round(results.savingsVsDc)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
