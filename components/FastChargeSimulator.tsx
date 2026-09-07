'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { calculateChargingSession } from '@/lib/evCalculations';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Zap, Battery, BatteryCharging, AlertTriangle, ThermometerSnowflake, 
  ThermometerSun, Share2, Copy, CheckCircle2, Info, PlusCircle, Edit3, Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/components/providers/SettingsProvider';
import { useVehicles } from '@/components/providers/VehicleContext';

const CHARGER_TIERS = [50, 150, 250, 350];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-sm">
        <p className="text-slate-300 font-medium mb-1">State of Charge: <span className="text-white font-bold">{label}%</span></p>
        <p className="text-emerald-400 font-bold text-lg">{p.kw} kW</p>
        {p.active ? (
          <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">Active In Simulation</span>
        ) : (
          <span className="inline-block mt-1 px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded-full">Outside Target SoC</span>
        )}
      </div>
    );
  }
  return null;
};

export default function FastChargeSimulator({ defaultVehicleId }: { defaultVehicleId?: string }) {
  const { currency } = useSettings();
  const { allVehicles, vehiclesMap, openStudio, isCustomVehicle, customVehicles } = useVehicles();
  
  // State
  const [vehicleId, setVehicleId] = useState<string>(defaultVehicleId || allVehicles[0]?.id || 'tesla-model-y-lr');
  const [chargerKw, setChargerKw] = useState<number>(250);
  const [startSoc, setStartSoc] = useState<number>(10);
  const [endSoc, setEndSoc] = useState<number>(80);
  const [isCold, setIsCold] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0.45);
  
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const params = new URLSearchParams(window.location.search);
    if (params.get('vid')) setVehicleId(params.get('vid') as string);
    else if (defaultVehicleId) setVehicleId(defaultVehicleId);
    if (params.get('kw')) setChargerKw(Number(params.get('kw')));
    if (params.get('start')) setStartSoc(Number(params.get('start')));
    if (params.get('end')) setEndSoc(Number(params.get('end')));
    if (params.get('cold')) setIsCold(params.get('cold') === 'true');
    if (params.get('rate')) setRate(Number(params.get('rate')));
  }, [defaultVehicleId]);

  const vehicle = useMemo(() => {
    return vehiclesMap[vehicleId] || allVehicles[0] || {
      id: 'tesla-model-y-lr',
      name: 'Tesla Model Y Long Range (2024)',
      batteryCapacity: 75,
      usablePackKwh: 75,
      maxChargeKw: 250,
      curve: []
    };
  }, [vehicleId, vehiclesMap, allVehicles]);

  // Ensure Start < Target
  const handleStartChange = (val: number) => {
    if (val >= endSoc) setEndSoc(Math.min(100, val + 5));
    setStartSoc(val);
  };
  const handleEndChange = (val: number) => {
    if (val <= startSoc) setStartSoc(Math.max(0, val - 5));
    setEndSoc(val);
  };

  const simulation = useMemo(() => {
    const curveArray = vehicle.curve || vehicle.curvePoints || [];
    const usablePack = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;

    return calculateChargingSession(
      curveArray,
      chargerKw,
      startSoc,
      endSoc,
      usablePack,
      isCold,
      rate
    );
  }, [vehicle, chargerKw, startSoc, endSoc, isCold, rate]);

  // Calculate 80% penalty if applicable
  const taperPenalty = useMemo(() => {
    if (endSoc <= 80) return 0;
    const curveArray = vehicle.curve || vehicle.curvePoints || [];
    const usablePack = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;

    const simTo80 = calculateChargingSession(
      curveArray,
      chargerKw,
      startSoc,
      80,
      usablePack,
      isCold,
      rate
    );
    return simulation.totalMinutes - simTo80.totalMinutes;
  }, [vehicle, chargerKw, startSoc, endSoc, isCold, rate, simulation.totalMinutes]);

  const handleCopyUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('vid', vehicleId);
    url.searchParams.set('kw', chargerKw.toString());
    url.searchParams.set('start', startSoc.toString());
    url.searchParams.set('end', endSoc.toString());
    url.searchParams.set('cold', isCold.toString());
    url.searchParams.set('rate', rate.toString());
    
    navigator.clipboard.writeText(url.toString()).catch(() => {
      // Ignore clipboard errors in iframe/preview
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = `🔌 EVChargeCurve Simulation:\n${vehicle.name} charging at a ${chargerKw}kW station.\n\n📊 ${startSoc}% to ${endSoc}%\n⏱️ Time: ${simulation.totalMinutes} mins\n🔋 Added: ${simulation.kwhAdded} kWh\n💵 Cost: ${currency.symbol}${simulation.sessionCost}\n\nPlan your trip at evchargecurve.com!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isMounted) return null;

  const isCustom = isCustomVehicle(vehicle.id);
  const usablePack = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* 1. Vehicle Selector & Pro Architect */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" /> Vehicle Profile
              </h3>
              <button
                type="button"
                onClick={() => openStudio()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Custom EV Studio</span>
              </button>
            </div>
            
            <div className="relative mb-3">
              <select 
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors appearance-none font-medium text-sm pr-10"
              >
                {customVehicles.length > 0 && (
                  <optgroup label="⭐ My Custom Vehicles">
                    {customVehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        [Custom] {v.name} ({v.usablePackKwh || v.batteryCapacity} kWh - {v.maxChargeKw} kW)
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="🚘 Global Production EV Fleet">
                  {allVehicles.filter(v => !isCustomVehicle(v.id)).map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.usablePackKwh || v.batteryCapacity} kWh • {v.architecture})
                    </option>
                  ))}
                </optgroup>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {/* Custom vehicle details / quick actions */}
            {isCustom ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Curve Active ({vehicle.architecture}, {usablePack} kWh)</span>
                </div>
                <button
                  type="button"
                  onClick={() => openStudio(vehicle)}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit Curve
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
                <span>Arch: <strong className="text-slate-200">{vehicle.architecture || '400V'}</strong> &bull; Chem: <strong className="text-slate-200">{vehicle.chemistry || 'NMC'}</strong></span>
                <button
                  type="button"
                  onClick={() => openStudio(vehicle)}
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <Sparkles className="w-3 h-3" /> Clone &amp; Modify
                </button>
              </div>
            )}

            {/* Quick selector chips */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-700/50">
              {allVehicles.slice(0, 6).map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVehicleId(v.id)}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-lg transition-all border font-medium truncate max-w-[140px]",
                    vehicleId === v.id 
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm" 
                      : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500"
                  )}
                >
                  {isCustomVehicle(v.id) ? '⭐ ' : ''}{v.brand} {v.model}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Charger Limits */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Dispenser Power Limit</h3>
            <div className="grid grid-cols-4 gap-2">
              {CHARGER_TIERS.map(tier => (
                <button
                  key={tier}
                  onClick={() => setChargerKw(tier)}
                  className={cn(
                    "py-2.5 px-1 rounded-xl font-bold text-sm transition-all border",
                    chargerKw === tier
                      ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                      : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500"
                  )}
                >
                  {tier} kW
                </button>
              ))}
            </div>
          </div>

          {/* 3. Range Sliders & Presets */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-lg font-bold text-white">Target Charge Interval</h3>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">State of Charge</p>
                <p className="text-xl font-black text-emerald-400">{startSoc}% &rarr; {endSoc}%</p>
              </div>
            </div>

            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Arrival SoC</span>
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Departure SoC</span>
                  <span className="text-sm font-bold text-white">{endSoc}%</span>
                </div>
                <input 
                  type="range" min="1" max="100" 
                  value={endSoc} onChange={(e) => handleEndChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => { setStartSoc(10); setEndSoc(80); }} className="text-xs bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-300 py-2 rounded-lg transition-colors font-semibold">10% &rarr; 80%<br/><span className="text-slate-500 text-[10px] font-normal">Optimal Stop</span></button>
              <button onClick={() => { setStartSoc(20); setEndSoc(80); }} className="text-xs bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-300 py-2 rounded-lg transition-colors font-semibold">20% &rarr; 80%<br/><span className="text-slate-500 text-[10px] font-normal">Quick Splash</span></button>
              <button onClick={() => { setStartSoc(10); setEndSoc(100); }} className="text-xs bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-300 py-2 rounded-lg transition-colors font-semibold">10% &rarr; 100%<br/><span className="text-slate-500 text-[10px] font-normal">Full Fill</span></button>
            </div>
          </div>

          {/* 4. Weather & Rates */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setIsCold(!isCold)}
              className={cn(
                "p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2",
                isCold 
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                  : "bg-orange-500/10 border-orange-500/30 text-orange-300"
              )}
            >
              {isCold ? <ThermometerSnowflake className="w-6 h-6" /> : <ThermometerSun className="w-6 h-6" />}
              <span className="text-xs font-semibold text-center leading-tight">
                {isCold ? "Freezing (Cold-Gated Pack)" : "Optimal (Preconditioned Pack)"}
              </span>
            </button>

            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex flex-col justify-center">
              <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">DC Fast Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{currency.symbol}</span>
                <input 
                  type="number" step="0.01" min="0"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-2 pl-7 pr-3 focus:outline-none focus:border-emerald-500 transition-colors font-mono font-bold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">/kWh</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DASHBOARD & CHART */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Total Dwell</p>
              <p className="text-2xl font-black text-white">{simulation.totalMinutes} <span className="text-sm font-normal text-slate-400">min</span></p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Avg Power</p>
              <p className="text-2xl font-black text-cyan-400">{simulation.avgKw} <span className="text-sm font-normal text-slate-400">kW</span></p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Energy Added</p>
              <p className="text-2xl font-black text-emerald-400">{simulation.kwhAdded} <span className="text-sm font-normal text-slate-400">kWh</span></p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Session Cost</p>
              <p className="text-2xl font-black text-white"><span className="text-lg text-slate-400">{currency.symbol}</span>{simulation.sessionCost}</p>
            </div>
          </div>

          {/* Warning Box */}
          {taperPenalty > 0 && (
            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-orange-400">Taper Penalty Warning</h4>
                <p className="text-xs text-orange-300/80 mt-1 leading-relaxed">
                  Charging past 80% is exponentially slower. The final {endSoc - 80}% is adding <strong>{Math.round(taperPenalty)} extra minutes</strong> to your session. Unless necessary to reach your next destination, unplug at 80% and continue driving.
                </p>
              </div>
            </div>
          )}

          {/* Chart */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl h-[400px] flex flex-col relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Charge Curve Telemetry</span>
                {isCustom && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    Custom Mod
                  </span>
                )}
              </h3>
              <span className="text-xs text-slate-400">
                Peak: <strong className="text-emerald-400">{vehicle.maxChargeKw} kW</strong> &bull; Pack: <strong className="text-slate-200">{usablePack} kWh</strong>
              </span>
            </div>
            
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulation.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="activeGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#334155" stopOpacity={0.1} />
                      <stop offset={`${startSoc}%`} stopColor="#334155" stopOpacity={0.1} />
                      
                      <stop offset={`${startSoc}%`} stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset={`${endSoc}%`} stopColor="#06B6D4" stopOpacity={0.8} />
                      
                      <stop offset={`${endSoc}%`} stopColor="#334155" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#334155" stopOpacity={0.1} />
                    </linearGradient>
                    
                    <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#475569" stopOpacity={0.3} />
                      <stop offset={`${startSoc}%`} stopColor="#475569" stopOpacity={0.3} />
                      <stop offset={`${startSoc}%`} stopColor="#34d399" stopOpacity={1} />
                      <stop offset={`${endSoc}%`} stopColor="#22d3ee" stopOpacity={1} />
                      <stop offset={`${endSoc}%`} stopColor="#475569" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#475569" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="soc" 
                    stroke="#64748b" 
                    fontSize={12}
                    tickFormatter={(val) => `${val}%`}
                    tickMargin={10}
                    minTickGap={20}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12}
                    tickFormatter={(val) => `${val} kW`}
                    domain={[0, Math.max(350, (vehicle.maxChargeKw || 250) + 20)]}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  
                  <Area
                    type="monotone"
                    dataKey="kw"
                    stroke="url(#strokeGradient)"
                    strokeWidth={3}
                    fill="url(#activeGradient)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={handleCopyUrl}
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Link Copied!' : 'Copy Result URL'}
            </button>
            <button 
              onClick={handleWhatsApp}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <Share2 className="w-5 h-5" />
              Share on WhatsApp
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
