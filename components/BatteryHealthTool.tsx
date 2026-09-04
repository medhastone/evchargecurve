'use client';

import React, { useState, useMemo } from 'react';
import { VEHICLES } from '@/data/evModels';
import { calculateBatteryDegradation } from '@/lib/evCalculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Zap, Activity, ShieldCheck, ShieldAlert, HeartPulse, Battery, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useSettings } from '@/components/providers/SettingsProvider';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-sm">
          <p className="text-slate-300 font-medium mb-2">Year {label}</p>
          <p className="text-emerald-400 font-bold">Projected SoH: {payload[0].value}%</p>
          {payload[1] && <p className="text-red-400 font-bold text-sm mt-1">Warranty Limit: {payload[1].value}%</p>}
        </div>
      );
    }
    return null;
  };

export default function BatteryHealthTool() {
  const { unit, distanceLabel } = useSettings();
  const isKm = unit === 'km';
  const evModels = Object.values(VEHICLES);
  const [vehicleId, setVehicleId] = useState(evModels[0].id);
  const [modelYear, setModelYear] = useState(2022);
  const [mileage, setMileage] = useState(40000);
  
  const [habit, setHabit] = useState<'ac_gentle' | 'mixed' | 'dc_heavy'>('mixed');

  const currentYear = 2026;
  const ageYears = Math.max(0, currentYear - modelYear);
  const mileageMiles = isKm ? mileage * 0.621371 : mileage;

  const vehicle = useMemo(() => evModels.find((v: any) => v.id === vehicleId) || evModels[0], [vehicleId, evModels]);

  const degradation = useMemo(() => {
    return calculateBatteryDegradation(
      vehicle.batteryChemistry || vehicle.chemistry || 'NMC',
      ageYears,
      mileageMiles,
      habit,
      vehicle.usablePackKwh || vehicle.batteryCapacity || 75,
      vehicle.epaRangeMiles || 300
    );
  }, [vehicle, ageYears, mileageMiles, habit]);

  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (degradation.currentSohPct / 100) * circumference;
  
  const gaugeColor = degradation.currentSohPct > 85 ? 'text-emerald-500' : degradation.currentSohPct >= 70 ? 'text-amber-500' : 'text-red-500';

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="xl:col-span-5 space-y-6">
          
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Battery className="w-5 h-5 text-emerald-400" /> Vehicle Configuration
            </h3>
            
            <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Select Model</label>
            <select 
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors mb-6 appearance-none"
            >
              {evModels.map((v: any) => (
                <option key={v.id} value={v.id}>{v.name} ({v.batteryChemistry || v.chemistry} - {v.usablePackKwh || v.batteryCapacity} kWh)</option>
              ))}
            </select>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-300">Model Year</span>
                  <span className="text-sm font-bold text-emerald-400">{modelYear}</span>
                </div>
                <input 
                  type="range" min="2017" max="2026" step="1"
                  value={modelYear} onChange={(e) => setModelYear(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2 items-center">
                  <span className="text-sm font-semibold text-slate-300">Odometer</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-emerald-400">{mileage.toLocaleString()}</span>
                    <button 
                      
                      className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400"
                    >
                      {distanceLabel.toUpperCase()}
                    </button>
                  </div>
                </div>
                <input 
                  type="range" min="0" max="200000" step="1000"
                  value={mileage} onChange={(e) => setMileage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Charging Habits</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'ac_gentle', name: 'Gentle AC', desc: 'Mostly Level 2 Home, 80% daily cap', icon: <Zap className="w-5 h-5" /> },
                { id: 'mixed', name: 'Balanced', desc: '50% Home AC / 50% DC Fast', icon: <Activity className="w-5 h-5" /> },
                { id: 'dc_heavy', name: 'Heavy DC Fast', desc: 'Frequent Supercharging / 100% cap', icon: <Zap className="w-5 h-5 text-orange-400" /> },
              ].map(h => (
                <button
                  key={h.id}
                  onClick={() => setHabit(h.id as any)}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl border text-left transition-all",
                    habit === h.id 
                      ? "bg-emerald-500/10 border-emerald-500/50" 
                      : "bg-slate-900 border-slate-700 hover:border-slate-500"
                  )}
                >
                  <div className={cn("p-2 rounded-lg", habit === h.id ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400")}>
                    {h.icon}
                  </div>
                  <div>
                    <h4 className={cn("text-sm font-bold", habit === h.id ? "text-emerald-400" : "text-white")}>{h.name}</h4>
                    <p className="text-xs text-slate-400">{h.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: OUTPUTS & CHARTS */}
        <div className="xl:col-span-7 space-y-6">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* SoH Gauge */}
            <div className="col-span-2 bg-slate-800/50 border border-slate-700 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">State of Health</h4>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-white">{degradation.currentSohPct}%</p>
                  <HeartPulse className={cn("w-5 h-5", gaugeColor)} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Estimated physical retention</p>
              </div>
              
              <div className="relative flex items-center justify-center shrink-0">
                <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                  <circle stroke="currentColor" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} className="text-slate-800" />
                  <circle stroke="currentColor" fill="transparent" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset }} strokeLinecap="round" r={normalizedRadius} cx={radius} cy={radius} className={cn("transition-all duration-1000", gaugeColor)} />
                </svg>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex flex-col justify-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Usable Cap.</p>
              <p className="text-xl font-black text-white">{degradation.remainingKwh.toFixed(1)} <span className="text-xs font-normal text-slate-400">kWh</span></p>
              <p className="text-[10px] text-slate-500 mt-1">of {vehicle.usablePackKwh || vehicle.batteryCapacity} kWh</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex flex-col justify-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Lost Range</p>
              <p className="text-xl font-black text-orange-400">-{Math.round(degradation.lostMiles)} <span className="text-xs font-normal text-slate-400">{distanceLabel}</span></p>
              <p className="text-[10px] text-slate-500 mt-1">Permanent fade</p>
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-xl border flex items-start gap-3",
            degradation.isUnderWarranty 
              ? "bg-red-500/10 border-red-500/30" 
              : "bg-emerald-500/10 border-emerald-500/30"
          )}>
            {degradation.isUnderWarranty ? (
              <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            )}
            <div>
              <h4 className={cn("text-sm font-bold", degradation.isUnderWarranty ? "text-red-400" : "text-emerald-400")}>
                {degradation.isUnderWarranty ? "Warranty Claim Triggered" : "Battery is within spec"}
              </h4>
              <p className={cn("text-xs mt-1", degradation.isUnderWarranty ? "text-red-300/80" : "text-emerald-300/80")}>
                {degradation.isUnderWarranty 
                  ? "Based on this profile, the battery has fallen below the 70% standard retention threshold before the 8-year/100k-mile limit."
                  : "The estimated degradation is currently above the 70% standard manufacturer warranty replacement threshold."}
              </p>
            </div>
          </div>

          {/* 10-Year Lifecycle Chart */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl h-[350px] flex flex-col relative">
            <h3 className="text-lg font-bold text-white mb-6">10-Year Lifecycle Trajectory</h3>
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={degradation.projectionPoints} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickFormatter={(val) => `Yr ${val}`} tickMargin={10} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val}%`} domain={[50, 100]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  
                  <Line 
                    type="monotone" 
                    name="Projected SoH" 
                    dataKey="sohPct" 
                    stroke="#10B981" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="stepAfter" 
                    name="70% Warranty Floor" 
                    dataKey="warrantyThreshold" 
                    stroke="#EF4444" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Advice */}
          <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">BMS Engineering Insight</h4>
              <p className="text-sm text-blue-200/80 leading-relaxed">
                {(vehicle.batteryChemistry || vehicle.chemistry) === 'LFP' 
                  ? "Lithium Iron Phosphate (LFP) cells exhibit extremely low cycle degradation and robust thermal stability. Charging to 100% daily is actually recommended by manufacturers to keep the Battery Management System (BMS) calibrated without causing excessive wear."
                  : "Nickel Manganese Cobalt (NMC) cells suffer from increased stress at high voltages and temperatures. For maximum longevity, it is recommended to limit daily AC charging to 80% and avoid deep discharges below 10%, minimizing both calendar aging and dendrite formation."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
