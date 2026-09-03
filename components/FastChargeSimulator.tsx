'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { VEHICLES } from '@/data/evModels';
import { calculateChargingSession } from '@/lib/evCalculations';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Zap, Battery, BatteryCharging, AlertTriangle, ThermometerSnowflake, 
  ThermometerSun, Share2, Copy, CheckCircle2, Info 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CHARGER_TIERS = [50, 150, 250, 350];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-sm">
          <p className="text-slate-300 font-medium mb-1">State of Charge: <span className="text-white font-bold">{label}%</span></p>
          <p className="text-emerald-400 font-bold text-lg">{p.kw} kW</p>
          {p.active ? (
            <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">Charging</span>
          ) : (
            <span className="inline-block mt-1 px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded-full">Outside Range</span>
          )}
        </div>
      );
    }
    return null;
  };

export default function FastChargeSimulator({ defaultVehicleId }: { defaultVehicleId?: string }) {
  const evModels = Object.values(VEHICLES);
  
  // State
  const [vehicleId, setVehicleId] = useState<string>(evModels[0].id);
  const [chargerKw, setChargerKw] = useState<number>(250);
  const [startSoc, setStartSoc] = useState<number>(10);
  const [endSoc, setEndSoc] = useState<number>(80);
  const [isCold, setIsCold] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0.45);
  
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const params = new URLSearchParams(window.location.search);
    if (params.get('vid')) setVehicleId(params.get('vid') as string);
    if (params.get('kw')) setChargerKw(Number(params.get('kw')));
    if (params.get('start')) setStartSoc(Number(params.get('start')));
    if (params.get('end')) setEndSoc(Number(params.get('end')));
    if (params.get('cold')) setIsCold(params.get('cold') === 'true');
    if (params.get('rate')) setRate(Number(params.get('rate')));
  }, []);

  const vehicle = useMemo(() => evModels.find(v => v.id === vehicleId) || evModels[0], [vehicleId, evModels]);

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
    // Note: The curve array in VEHICLES is called 'curve' not 'curvePoints' based on the cat output
    const curveArray = vehicle.curve || vehicle.curvePoints || [];
    const usablePack = vehicle.batteryCapacity || vehicle.usablePackKwh || 75;

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
    const usablePack = vehicle.batteryCapacity || vehicle.usablePackKwh || 75;

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
    
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = `🔌 EVChargeCurve Simulation:\n${vehicle.name} charging at a ${chargerKw}kW station.\n\n📊 ${startSoc}% to ${endSoc}%\n⏱️ Time: ${simulation.totalMinutes} mins\n🔋 Added: ${simulation.kwhAdded} kWh\n💵 Cost: $${simulation.sessionCost}\n\nPlan your trip at evchargecurve.com!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Custom Chart Tooltip
  

  if (!isMounted) return null;

  const usablePack = vehicle.batteryCapacity || vehicle.usablePackKwh || 75;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* 1. Vehicle Selector */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" /> Vehicle Profile
            </h3>
            
            <select 
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors mb-4 appearance-none"
            >
              {evModels.map((v: any) => (
                <option key={v.id} value={v.id}>{v.name} ({v.batteryCapacity || v.usablePackKwh} kWh)</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2">
              {evModels.slice(0, 4).map((v: any) => (
                <button
                  key={v.id}
                  onClick={() => setVehicleId(v.id)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full transition-all border",
                    vehicleId === v.id 
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300" 
                      : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500"
                  )}
                >
                  {v.brand ? (v.brand.charAt(0).toUpperCase() + v.brand.slice(1)) : ''} {v.name.replace(/\\(.*\\)/,'').replace(v.brand ? (v.brand.charAt(0).toUpperCase() + v.brand.slice(1)) : '','').trim().substring(0, 15)}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Charger Limits */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Dispenser Limit (kW)</h3>
            <div className="grid grid-cols-4 gap-2">
              {CHARGER_TIERS.map(tier => (
                <button
                  key={tier}
                  onClick={() => setChargerKw(tier)}
                  className={cn(
                    "py-2 px-1 rounded-xl font-medium text-sm transition-all border",
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
              <h3 className="text-lg font-bold text-white">Target Charge</h3>
              <div className="text-right">
                <p className="text-sm text-slate-400">Range</p>
                <p className="text-xl font-bold text-emerald-400">{startSoc}% → {endSoc}%</p>
              </div>
            </div>

            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-300">Arrival SOC</span>
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
                  <span className="text-sm text-slate-300">Departure SOC</span>
                  <span className="text-sm font-bold text-white">{endSoc}%</span>
                </div>
                <input 
                  type="range" min="1" max="100" 
                  value={endSoc} onChange={(e) => handleEndChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button onClick={() => { setStartSoc(10); setEndSoc(80); }} className="text-xs bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-300 py-2 rounded-lg transition-colors">10% → 80%<br/><span className="text-slate-500 text-[10px]">Road Trip</span></button>
              <button onClick={() => { setStartSoc(20); setEndSoc(80); }} className="text-xs bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-300 py-2 rounded-lg transition-colors">20% → 80%<br/><span className="text-slate-500 text-[10px]">Quick Stop</span></button>
              <button onClick={() => { setStartSoc(10); setEndSoc(100); }} className="text-xs bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-300 py-2 rounded-lg transition-colors">10% → 100%<br/><span className="text-slate-500 text-[10px]">Full Fill</span></button>
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
              <span className="text-sm font-medium text-center leading-tight">
                {isCold ? "Freezing 20°F\n(Cold Pack)" : "Mild 70°F\n(Preconditioned)"}
              </span>
            </button>

            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex flex-col justify-center">
              <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">Energy Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input 
                  type="number" step="0.01" min="0"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-2 pl-7 pr-3 focus:outline-none focus:border-emerald-500 transition-colors"
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
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Total Time</p>
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
              <p className="text-2xl font-black text-white"><span className="text-lg text-slate-400">$</span>{simulation.sessionCost}</p>
            </div>
          </div>

          {/* Warning Box */}
          {taperPenalty > 0 && (
            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-orange-400">Taper Penalty Warning</h4>
                <p className="text-xs text-orange-300/80 mt-1 leading-relaxed">
                  Charging past 80% is extremely slow. The final {endSoc - 80}% is adding <strong>{Math.round(taperPenalty)} extra minutes</strong> to your session. Unless necessary to reach your destination, unplug and drive.
                </p>
              </div>
            </div>
          )}

          {/* Chart */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl h-[400px] flex flex-col relative">
            <h3 className="text-lg font-bold text-white mb-6">Charge Curve Telemetry</h3>
            
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulation.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="activeGradient" x1="0" y1="0" x2="1" y2="0">
                      {/* Before Start SOC */}
                      <stop offset="0%" stopColor="#334155" stopOpacity={0.1} />
                      <stop offset={`${startSoc}%`} stopColor="#334155" stopOpacity={0.1} />
                      
                      {/* Active Zone */}
                      <stop offset={`${startSoc}%`} stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset={`${endSoc}%`} stopColor="#06B6D4" stopOpacity={0.8} />
                      
                      {/* After End SOC */}
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
