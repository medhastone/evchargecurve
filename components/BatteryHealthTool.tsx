'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { calculateBatteryDegradation } from '@/lib/evCalculations';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, ReferenceDot 
} from 'recharts';
import { 
  Zap, Activity, ShieldCheck, ShieldAlert, HeartPulse, Battery, 
  Info, PlusCircle, Calendar, BarChart2, Table, CheckCircle2, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/components/providers/SettingsProvider';
import { useVehicles } from '@/components/providers/VehicleContext';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number | string; payload?: any }>;
  label?: string | number;
  distanceLabel?: string;
  totalPackKwh?: number;
  epaRange?: number;
  isKm?: boolean;
}

const CustomTooltip = ({ active, payload, label, distanceLabel = 'mi', totalPackKwh = 75, epaRange = 300, isKm = false }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const soh = Number(payload[0]?.value || 0);
    const usableKwh = (totalPackKwh * (soh / 100)).toFixed(1);
    const rangeMiles = Math.round(epaRange * (soh / 100));
    const displayedRange = isKm ? Math.round(rangeMiles * 1.60934) : rangeMiles;
    const warrantyMargin = (soh - 70).toFixed(1);
    const yearNum = Number(label);

    return (
      <div className="bg-slate-900/95 border border-slate-700 p-3.5 rounded-xl shadow-2xl backdrop-blur-md min-w-[210px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
          <span className="text-white font-bold text-sm">Year {label} Forecast</span>
          <span className={cn(
            "text-[10px] px-2 py-0.5 rounded-full font-bold",
            yearNum === 0 
              ? "bg-blue-500/20 text-blue-300" 
              : yearNum <= 8 
                ? "bg-emerald-500/20 text-emerald-300" 
                : "bg-slate-700 text-slate-300"
          )}>
            {yearNum === 0 ? 'Factory Spec' : yearNum <= 8 ? '8-Yr Warranty Era' : 'Post-Warranty'}
          </span>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">State of Health:</span>
            <span className="text-emerald-400 font-bold">{soh}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Usable Battery:</span>
            <span className="text-slate-200 font-medium">{usableKwh} kWh</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Projected Range:</span>
            <span className="text-slate-200 font-medium">{displayedRange} {distanceLabel}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-800/80">
            <span className="text-slate-400">70% Warranty Buffer:</span>
            <span className={Number(warrantyMargin) >= 0 ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
              {Number(warrantyMargin) >= 0 ? `+${warrantyMargin}% Safe` : `${warrantyMargin}% Replacement`}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const MILESTONE_YEARS = [1, 3, 5, 8, 10];

export default function BatteryHealthTool() {
  const { unit, setUnit, distanceLabel } = useSettings();
  const isKm = unit === 'km';
  const { allVehicles, vehiclesMap, openStudio, customVehicles, isCustomVehicle } = useVehicles();
  const [vehicleId, setVehicleId] = useState(allVehicles[0]?.id || 'tesla-model-y-lr');
  const [modelYear, setModelYear] = useState(2022);
  const [mileage, setMileage] = useState(40000);
  
  const [habit, setHabit] = useState<'ac_gentle' | 'mixed' | 'dc_heavy'>('mixed');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentYear = 2026;
  const ageYears = Math.max(0, currentYear - modelYear);
  const mileageMiles = isKm ? mileage * 0.621371 : mileage;

  const vehicle = useMemo(() => vehiclesMap[vehicleId] || allVehicles[0], [vehicleId, vehiclesMap, allVehicles]);

  const degradation = useMemo(() => {
    const rawChem = vehicle?.chemistry?.toUpperCase() || 'NMC';
    const normalizedChem: 'NMC' | 'LFP' | 'NCA' = rawChem.includes('LFP') ? 'LFP' : rawChem.includes('NCA') ? 'NCA' : 'NMC';
    return calculateBatteryDegradation(
      normalizedChem,
      ageYears,
      mileageMiles,
      habit,
      vehicle?.usablePackKwh || vehicle?.batteryCapacity || 75,
      vehicle?.epaRangeMiles || 300
    );
  }, [vehicle, ageYears, mileageMiles, habit]);

  const milestones = useMemo(() => {
    const totalPack = vehicle?.usablePackKwh || vehicle?.batteryCapacity || 75;
    const epa = vehicle?.epaRangeMiles || 300;
    return MILESTONE_YEARS.map(yr => {
      const pt = degradation.projectionPoints.find(p => p.year === yr) || { year: yr, sohPct: 100, warrantyThreshold: 70 };
      const usableKwh = (totalPack * (pt.sohPct / 100)).toFixed(1);
      const rangeMiles = Math.round(epa * (pt.sohPct / 100));
      const displayedRange = isKm ? Math.round(rangeMiles * 1.60934) : rangeMiles;
      return {
        year: yr,
        sohPct: pt.sohPct,
        usableKwh,
        range: displayedRange,
        isCurrentAge: Math.round(ageYears) === yr,
      };
    });
  }, [degradation.projectionPoints, vehicle, isKm, ageYears]);

  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (degradation.currentSohPct / 100) * circumference;
  
  const gaugeColor = degradation.currentSohPct > 85 ? 'text-emerald-400' : degradation.currentSohPct >= 70 ? 'text-amber-400' : 'text-rose-400';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="region" aria-label="EV Battery Degradation and State of Health Calculator">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="xl:col-span-5 space-y-6">
          
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Battery className="w-5 h-5 text-emerald-400" /> Vehicle Configuration
              </h2>
              <button
                type="button"
                onClick={() => openStudio()}
                aria-label="Open Custom Electric Vehicle Studio"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                + Custom EV
              </button>
            </div>
            
            <label htmlFor="battery-health-vehicle-select" className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">
              Select Model
            </label>
            <select
              id="battery-health-vehicle-select"
              aria-label="Select Electric Vehicle Model"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors mb-6 appearance-none font-medium text-sm"
            >
              {customVehicles.length > 0 && (
                <optgroup label="⭐ My Custom Vehicles">
                  {customVehicles.map(v => (
                    <option key={v.id} value={v.id}>[Custom] {v.name} ({v.chemistry || 'NMC'} - {v.usablePackKwh || v.batteryCapacity} kWh)</option>
                  ))}
                </optgroup>
              )}
              <optgroup label="🚘 Production Vehicles">
                {allVehicles.filter(v => !isCustomVehicle(v.id)).map(v => (
                  <option key={v.id} value={v.id}>{v.name} ({v.chemistry || 'NMC'} - {v.usablePackKwh || v.batteryCapacity} kWh)</option>
                ))}
              </optgroup>
            </select>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="model-year-slider" className="text-sm font-semibold text-slate-300">
                    Model Year
                  </label>
                  <span className="text-sm font-bold text-emerald-400">{modelYear}</span>
                </div>
                <input 
                  id="model-year-slider"
                  aria-label="Vehicle model year slider"
                  type="range"
                  min="2017"
                  max="2026"
                  step="1"
                  value={modelYear}
                  onChange={(e) => setModelYear(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2 items-center">
                  <label htmlFor="odometer-slider" className="text-sm font-semibold text-slate-300">
                    Odometer Reading
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-emerald-400">{mileage.toLocaleString()}</span>
                    <button 
                      type="button"
                      onClick={() => setUnit(unit === 'mi' ? 'km' : 'mi')}
                      aria-label={`Toggle distance unit, currently ${distanceLabel}`}
                      className="px-2 py-0.5 text-xs uppercase font-bold tracking-wider rounded border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors"
                    >
                      {distanceLabel.toUpperCase()}
                    </button>
                  </div>
                </div>
                <input 
                  id="odometer-slider"
                  aria-label="Vehicle odometer mileage slider"
                  type="range"
                  min="0"
                  max="200000"
                  step="1000"
                  value={mileage}
                  onChange={(e) => setMileage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Charging Habits</h3>
            <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="Charging Habits Profile">
              {[
                { id: 'ac_gentle' as const, name: 'Gentle AC', desc: 'Mostly Level 2 Home, 80% daily cap', icon: <Zap className="w-5 h-5" /> },
                { id: 'mixed' as const, name: 'Balanced', desc: '50% Home AC / 50% DC Fast', icon: <Activity className="w-5 h-5" /> },
                { id: 'dc_heavy' as const, name: 'Heavy DC Fast', desc: 'Frequent Supercharging / 100% cap', icon: <Zap className="w-5 h-5 text-orange-400" /> },
              ].map(h => (
                <button
                  key={h.id}
                  type="button"
                  role="radio"
                  aria-checked={habit === h.id}
                  aria-label={`Select ${h.name} charging profile: ${h.desc}`}
                  onClick={() => setHabit(h.id)}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl border text-left transition-all",
                    habit === h.id 
                      ? "bg-emerald-500/10 border-emerald-500/50 text-white" 
                      : "bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300"
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
                <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">State of Health</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-white">{degradation.currentSohPct}%</p>
                  <HeartPulse className={cn("w-5 h-5", gaugeColor)} />
                </div>
                <p className="text-xs text-slate-400 mt-1">Estimated physical retention</p>
              </div>
              
              <div 
                role="progressbar"
                aria-label="Battery State of Health Retention"
                aria-valuenow={degradation.currentSohPct}
                aria-valuemin={0}
                aria-valuemax={100}
                className="relative flex items-center justify-center shrink-0"
              >
                <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                  <circle stroke="currentColor" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} className="text-slate-800" />
                  <circle stroke="currentColor" fill="transparent" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset }} strokeLinecap="round" r={normalizedRadius} cx={radius} cy={radius} className={cn("transition-all duration-700", gaugeColor)} />
                </svg>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex flex-col justify-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Usable Cap.</p>
              <p className="text-xl font-black text-white">{degradation.remainingKwh.toFixed(1)} <span className="text-xs font-normal text-slate-400">kWh</span></p>
              <p className="text-xs text-slate-400 mt-1">of {vehicle?.usablePackKwh || vehicle?.batteryCapacity} kWh</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex flex-col justify-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Lost Range</p>
              <p className="text-xl font-black text-amber-400">-{Math.round(degradation.lostMiles)} <span className="text-xs font-normal text-slate-400">{distanceLabel}</span></p>
              <p className="text-xs text-slate-400 mt-1">Permanent fade</p>
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
              <p className={cn("text-xs mt-1", degradation.isUnderWarranty ? "text-red-300" : "text-emerald-300")}>
                {degradation.isUnderWarranty 
                  ? "Based on this profile, the battery has fallen below the 70% standard retention threshold before the 8-year/100k-mile limit."
                  : "The estimated degradation is currently above the 70% standard manufacturer warranty replacement threshold."}
              </p>
            </div>
          </div>

          {/* 10-Year Lifecycle Chart & Milestone Visuals */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl flex flex-col relative shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">10-Year Lifecycle Trajectory</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full">
                    Active Physics Model
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Non-linear root decay (&radic;t) modeled for {vehicle?.chemistry || 'NMC'} cells under {habit === 'ac_gentle' ? 'gentle AC' : habit === 'dc_heavy' ? 'frequent DCFC' : 'balanced'} charging
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-900/90 border border-slate-700 rounded-xl p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('chart')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors",
                    viewMode === 'chart' 
                      ? "bg-emerald-500 text-slate-950 shadow-md font-bold" 
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  Trajectory Curve
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors",
                    viewMode === 'table' 
                      ? "bg-emerald-500 text-slate-950 shadow-md font-bold" 
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  <Table className="w-3.5 h-3.5" />
                  Milestone Matrix
                </button>
              </div>
            </div>

            {viewMode === 'chart' ? (
              <div className="w-full h-[300px] sm:h-[340px] min-h-[300px] shrink-0 relative">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%" minHeight={280}>
                    <AreaChart data={degradation.projectionPoints} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="sohGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickFormatter={(val) => `Yr ${val}`} 
                        tickMargin={10} 
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={12} 
                        tickFormatter={(val) => `${val}%`} 
                        domain={[50, 100]} 
                      />
                      <Tooltip 
                        content={
                          <CustomTooltip 
                            distanceLabel={distanceLabel}
                            totalPackKwh={vehicle?.usablePackKwh || vehicle?.batteryCapacity || 75}
                            epaRange={vehicle?.epaRangeMiles || 300}
                            isKm={isKm}
                          />
                        } 
                        cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} 
                      />
                      <Legend verticalAlign="top" height={36} iconType="circle" />
                      
                      <ReferenceLine 
                        y={70} 
                        stroke="#EF4444" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        label={{ 
                          value: '70% Legal Warranty Floor', 
                          fill: '#F87171', 
                          fontSize: 11, 
                          position: 'insideBottomRight' 
                        }} 
                      />

                      {ageYears <= 10 && (
                        <ReferenceDot 
                          x={Math.min(10, Math.round(ageYears))} 
                          y={degradation.currentSohPct} 
                          r={6} 
                          fill="#38BDF8" 
                          stroke="#FFFFFF" 
                          strokeWidth={2} 
                        />
                      )}
                      
                      <Area 
                        type="monotone" 
                        name="Projected SoH (%)" 
                        dataKey="sohPct" 
                        stroke="#10B981" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#sohGradient)"
                        dot={{ r: 3, fill: '#10B981', strokeWidth: 0 }} 
                        activeDot={{ r: 6 }} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  /* SVG Fallback while mounting */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/40 rounded-xl p-4">
                    <svg viewBox="0 0 500 200" className="w-full h-full max-h-[260px]">
                      <path d="M 20 20 Q 150 45 250 65 T 480 95" fill="none" stroke="#10B981" strokeWidth="3" />
                      <line x1="20" y1="120" x2="480" y2="120" stroke="#EF4444" strokeWidth="2" strokeDasharray="5 5" />
                      <text x="250" y="115" fill="#EF4444" fontSize="11" textAnchor="middle">70% Warranty Replacement Line</text>
                    </svg>
                  </div>
                )}
              </div>
            ) : (
              /* Milestone Data Matrix Table */
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="p-3 font-semibold">Milestone</th>
                      <th className="p-3 font-semibold">Estimated Odometer</th>
                      <th className="p-3 font-semibold text-emerald-400">State of Health</th>
                      <th className="p-3 font-semibold">Usable kWh</th>
                      <th className="p-3 font-semibold">Projected Range</th>
                      <th className="p-3 font-semibold">Warranty Headroom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {degradation.projectionPoints.map((pt) => {
                      const miles = (ageYears > 0 ? (mileageMiles / ageYears) : 12000) * pt.year;
                      const dist = isKm ? Math.round(miles * 1.60934) : Math.round(miles);
                      const kwh = ((vehicle?.usablePackKwh || vehicle?.batteryCapacity || 75) * (pt.sohPct / 100)).toFixed(1);
                      const range = Math.round((vehicle?.epaRangeMiles || 300) * (pt.sohPct / 100));
                      const dispRange = isKm ? Math.round(range * 1.60934) : range;
                      const isCurrentYear = pt.year === Math.min(10, Math.round(ageYears));
                      const isWarrantyYear = pt.year === 8;
                      return (
                        <tr 
                          key={pt.year}
                          className={cn(
                            "hover:bg-slate-800/40 transition-colors",
                            isCurrentYear && "bg-blue-500/10 font-medium",
                            isWarrantyYear && "border-l-2 border-l-amber-400"
                          )}
                        >
                          <td className="p-3 font-bold flex items-center gap-1.5">
                            Year {pt.year}
                            {isCurrentYear && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-normal">
                                Current
                              </span>
                            )}
                            {isWarrantyYear && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-normal">
                                8-Yr / 100k Limit
                              </span>
                            )}
                          </td>
                          <td className="p-3 font-mono text-slate-300">{dist.toLocaleString()} {distanceLabel}</td>
                          <td className="p-3 font-mono font-bold text-emerald-400">{pt.sohPct}%</td>
                          <td className="p-3 font-mono text-slate-300">{kwh} kWh</td>
                          <td className="p-3 font-mono text-slate-300">{dispRange} {distanceLabel}</td>
                          <td className="p-3">
                            {pt.year <= 8 ? (
                              pt.sohPct > 70 ? (
                                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                  <ShieldCheck className="w-3.5 h-3.5" /> +{(pt.sohPct - 70).toFixed(1)}% Safe
                                </span>
                              ) : (
                                <span className="text-red-400 font-semibold flex items-center gap-1">
                                  <ShieldAlert className="w-3.5 h-3.5" /> Claim Eligible
                                </span>
                              )
                            ) : (
                              <span className="text-slate-500 text-[11px]">Post-Warranty</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Quick 5-Milestone Visual Cards Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6 pt-5 border-t border-slate-800/80">
              {milestones.map((m) => (
                <div 
                  key={m.year}
                  className={cn(
                    "rounded-xl p-2.5 border text-center transition-all",
                    m.isCurrentAge 
                      ? "bg-blue-500/15 border-blue-500/40 ring-1 ring-blue-400/30" 
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  )}
                >
                  <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400 mb-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>Year {m.year}</span>
                    {m.isCurrentAge && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                  </div>
                  <div className="text-base font-black text-emerald-400">{m.sohPct}%</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">{m.range} {distanceLabel}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.usableKwh} kWh</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Advice */}
          <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">BMS Engineering Insight</h4>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                {vehicle?.chemistry === 'LFP' 
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
