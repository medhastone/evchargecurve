/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceArea } from 'recharts';
import { Share2, Zap, Snowflake, Sun, Settings2, Info, PlusCircle } from 'lucide-react';
import { useVehicles } from '@/components/providers/VehicleContext';

function interpolateKw(curve: {soc: number, kw: number}[], targetSoc: number) {
  if (!curve || curve.length === 0) return 0;
  
  const exact = curve.find(p => p.soc === targetSoc);
  if (exact) return exact.kw;
  
  const lower = [...curve].reverse().find(p => p.soc < targetSoc);
  const upper = curve.find(p => p.soc > targetSoc);
  
  if (!lower) return upper ? upper.kw : 0;
  if (!upper) return lower.kw;
  
  const ratio = (targetSoc - lower.soc) / (upper.soc - lower.soc);
  return lower.kw + ratio * (upper.kw - lower.kw);
}

function calculateChargingStats(
  vehicle: any,
  startSoc: number,
  endSoc: number,
  chargerCap: number,
  tempMultiplier: number
) {
  let totalMinutes = 0;
  const packKwh = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;
  const epaRange = vehicle.epaRangeMiles || 300;
  const efficiency = epaRange / packKwh; // miles per kWh
  const curve = vehicle.curve || vehicle.curvePoints || [];
  
  // Calculate time for Start -> End SOC
  for (let s = startSoc; s < endSoc; s++) {
    const rawKw = interpolateKw(curve, s);
    const actualKw = Math.min(rawKw * tempMultiplier, chargerCap);
    if (actualKw > 0) {
      const minsFor1Percent = ((packKwh * 0.01) / actualKw) * 60;
      totalMinutes += minsFor1Percent;
    }
  }

  // Calculate 15-min miles added from startSoc
  let tempSoc15 = startSoc;
  let energy15 = 0;
  for (let m = 0; m < 15; m++) {
    if (tempSoc15 >= 100) break;
    const rawKw = interpolateKw(curve, Math.floor(tempSoc15));
    const actualKw = Math.min(rawKw * tempMultiplier, chargerCap);
    const energyThisMin = actualKw / 60;
    energy15 += energyThisMin;
    tempSoc15 += (energyThisMin / packKwh) * 100;
  }
  const milesAdded15Min = energy15 * efficiency;

  return {
    timeMinutes: Math.round(totalMinutes),
    miles15Min: Math.round(milesAdded15Min),
    avgKw: totalMinutes > 0 ? Math.round(((endSoc - startSoc) / 100 * packKwh) / (totalMinutes / 60)) : 0
  };
}

export default function CompareTool() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { allVehicles, vehiclesMap, openStudio, customVehicles, isCustomVehicle } = useVehicles();

  const [carAId, setCarAId] = useState(searchParams?.get('carA') || 'tesla-model-y-lr');
  const [carBId, setCarBId] = useState(searchParams?.get('carB') || 'hyundai-ioniq-5');
  const [chargerCap, setChargerCap] = useState(Number(searchParams?.get('cap')) || 350);
  const [startSoc, setStartSoc] = useState(Number(searchParams?.get('start')) || 10);
  const [endSoc, setEndSoc] = useState(Number(searchParams?.get('end')) || 80);
  const [temp, setTemp] = useState(searchParams?.get('temp') || 'mild');
  const [copied, setCopied] = useState(false);

  const carA = vehiclesMap[carAId] || allVehicles[0];
  const carB = vehiclesMap[carBId] || allVehicles[1] || allVehicles[0];
  const tempMultiplier = temp === 'mild' ? 1.0 : 0.65;

  const chartData = useMemo(() => {
    const data = [];
    if (!carA || !carB) return [];
    
    for (let i = 0; i <= 100; i++) {
      const kwA = Math.min(interpolateKw(carA.curve || carA.curvePoints || [], i) * tempMultiplier, chargerCap);
      const kwB = Math.min(interpolateKw(carB.curve || carB.curvePoints || [], i) * tempMultiplier, chargerCap);
      data.push({
        soc: i,
        carA_kw: Math.round(kwA),
        carB_kw: Math.round(kwB)
      });
    }
    return data;
  }, [carA, carB, chargerCap, tempMultiplier]);

  const statsA = useMemo(() => calculateChargingStats(carA, startSoc, endSoc, chargerCap, tempMultiplier), [carA, startSoc, endSoc, chargerCap, tempMultiplier]);
  const statsB = useMemo(() => calculateChargingStats(carB, startSoc, endSoc, chargerCap, tempMultiplier), [carB, startSoc, endSoc, chargerCap, tempMultiplier]);

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set('carA', carAId);
    params.set('carB', carBId);
    params.set('cap', chargerCap.toString());
    params.set('start', startSoc.toString());
    params.set('end', endSoc.toString());
    params.set('temp', temp);
    
    const url = `${window.location.origin}/compare?${params.toString()}`;
    navigator.clipboard.writeText(url).catch(e => console.error("Clipboard error", e));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!carA || !carB) return <div className="text-white p-8">Loading comparison models...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Pickers & Controls */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">Compare EV Fast-Charging Telemetry</h2>
            <p className="text-xs text-slate-400">Head-to-head comparison of BMS taper curves, average speeds, and 15-minute range gains.</p>
          </div>
          <button
            type="button"
            onClick={() => openStudio()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            + Add Custom EV
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Vehicle Pickers */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /> Vehicle A (Emerald)
            </h3>
            <select 
              value={carAId} 
              onChange={(e) => setCarAId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium text-sm"
            >
              {customVehicles.length > 0 && (
                <optgroup label="⭐ My Custom Vehicles">
                  {customVehicles.map(v => (
                    <option key={v.id} value={v.id}>[Custom] {v.name}</option>
                  ))}
                </optgroup>
              )}
              <optgroup label="🚘 Production Vehicles">
                {allVehicles.filter(v => !isCustomVehicle(v.id)).map((v: any) => (
                  <option key={v.id} value={v.id}>{v.name} ({v.architecture})</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Vehicle B (Cyan)
            </h3>
            <select 
              value={carBId} 
              onChange={(e) => setCarBId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-medium text-sm"
            >
              {customVehicles.length > 0 && (
                <optgroup label="⭐ My Custom Vehicles">
                  {customVehicles.map(v => (
                    <option key={v.id} value={v.id}>[Custom] {v.name}</option>
                  ))}
                </optgroup>
              )}
              <optgroup label="🚘 Production Vehicles">
                {allVehicles.filter(v => !isCustomVehicle(v.id)).map((v: any) => (
                  <option key={v.id} value={v.id}>{v.name} ({v.architecture})</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Shared Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800/50">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Charger Max Output</label>
            <div className="flex bg-slate-950 rounded-lg p-1">
              {[150, 250, 350].map((cap) => (
                <button
                  key={cap}
                  onClick={() => setChargerCap(cap)}
                  className={`flex-1 text-sm py-1.5 rounded-md transition-all ${
                    chargerCap === cap 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {cap} kW
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">
              Charge Window ({startSoc}% - {endSoc}%)
            </label>
            <div className="flex items-center gap-4 px-2">
              <input 
                type="range" 
                min="0" max="40" 
                value={startSoc} 
                onChange={(e) => setStartSoc(Number(e.target.value))}
                className="w-full accent-slate-500"
              />
              <span className="text-slate-500">to</span>
              <input 
                type="range" 
                min="50" max="100" 
                value={endSoc} 
                onChange={(e) => setEndSoc(Number(e.target.value))}
                className="w-full accent-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Temperature</label>
            <div className="flex bg-slate-950 rounded-lg p-1">
              <button
                onClick={() => setTemp('mild')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-sm py-1.5 rounded-md transition-all ${
                  temp === 'mild' 
                  ? 'bg-amber-500/20 text-amber-400 shadow-sm border border-amber-500/30' 
                  : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-4 h-4" /> Mild 70°F
              </button>
              <button
                onClick={() => setTemp('freezing')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-sm py-1.5 rounded-md transition-all ${
                  temp === 'freezing' 
                  ? 'bg-blue-500/20 text-blue-400 shadow-sm border border-blue-500/30' 
                  : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Snowflake className="w-4 h-4" /> Cold 20°F
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <h2 className="text-xl font-bold text-white mb-6 flex justify-between items-center">
          <span>Charging Power Over State of Charge</span>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
          >
            <Share2 className="w-4 h-4" /> {copied ? 'Copied!' : 'Share'}
          </button>
        </h2>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCarA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCarB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="soc" stroke="#64748B" tickFormatter={(v) => `${v}%`} />
              <YAxis stroke="#64748B" unit=" kW" domain={[0, Math.max(350, (carA.maxChargeKw || 250), (carB.maxChargeKw || 250)) + 20]} />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
                        <p className="font-bold text-white">SoC: {label}%</p>
                        <p className="text-emerald-400 font-semibold">{carA.name}: {payload[0]?.value} kW</p>
                        <p className="text-cyan-400 font-semibold">{carB.name}: {payload[1]?.value} kW</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceArea x1={startSoc} x2={endSoc} fill="#334155" fillOpacity={0.1} stroke="#475569" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="carA_kw" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCarA)" name={carA.name} />
              <Area type="monotone" dataKey="carB_kw" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorCarB)" name={carB.name} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Head to Head Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">{carA.name}</h3>
            <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full font-bold border border-emerald-500/20">
              {carA.architecture} &bull; {carA.usablePackKwh || carA.batteryCapacity} kWh
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <p className="text-xs text-slate-400 mb-1">Time ({startSoc}-{endSoc}%)</p>
              <p className="text-xl font-bold text-emerald-400">{statsA.timeMinutes} min</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <p className="text-xs text-slate-400 mb-1">Avg Power</p>
              <p className="text-xl font-bold text-white">{statsA.avgKw} kW</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <p className="text-xs text-slate-400 mb-1">15-Min Range</p>
              <p className="text-xl font-bold text-amber-400">+{statsA.miles15Min} mi</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">{carB.name}</h3>
            <span className="text-xs px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-full font-bold border border-cyan-500/20">
              {carB.architecture} &bull; {carB.usablePackKwh || carB.batteryCapacity} kWh
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <p className="text-xs text-slate-400 mb-1">Time ({startSoc}-{endSoc}%)</p>
              <p className="text-xl font-bold text-cyan-400">{statsB.timeMinutes} min</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <p className="text-xs text-slate-400 mb-1">Avg Power</p>
              <p className="text-xl font-bold text-white">{statsB.avgKw} kW</p>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <p className="text-xs text-slate-400 mb-1">15-Min Range</p>
              <p className="text-xl font-bold text-amber-400">+{statsB.miles15Min} mi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
