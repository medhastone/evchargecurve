/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Share2, Zap, Snowflake, Sun, Settings2, Info } from 'lucide-react';
import { VEHICLES } from '@/data/evModels';

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
  vehicle: /* eslint-disable-next-line @typescript-eslint/no-explicit-any */ any,
  startSoc: number,
  endSoc: number,
  chargerCap: number,
  tempMultiplier: number
) {
  let totalMinutes = 0;
  let energyAdded = 0;
  let currentSoc = startSoc;
  const efficiency = vehicle.epaRangeMiles / vehicle.usablePackKwh; // miles per kWh
  
  // Calculate time for Start -> End SOC
  for (let s = startSoc; s < endSoc; s++) {
    const rawKw = interpolateKw(vehicle.curve, s);
    const actualKw = Math.min(rawKw * tempMultiplier, chargerCap);
    // time to add 1% = (pack * 0.01) / kw (hours) * 60 = mins
    if (actualKw > 0) {
      const minsFor1Percent = ((vehicle.usablePackKwh * 0.01) / actualKw) * 60;
      totalMinutes += minsFor1Percent;
    }
  }

  // Calculate 15-min miles added from startSoc
  let tempSoc15 = startSoc;
  let energy15 = 0;
  for (let m = 0; m < 15; m++) {
    if (tempSoc15 >= 100) break;
    const rawKw = interpolateKw(vehicle.curve, Math.floor(tempSoc15));
    const actualKw = Math.min(rawKw * tempMultiplier, chargerCap);
    const energyThisMin = actualKw / 60;
    energy15 += energyThisMin;
    tempSoc15 += (energyThisMin / vehicle.usablePackKwh) * 100;
  }
  const milesAdded15Min = energy15 * efficiency;

  return {
    timeMinutes: Math.round(totalMinutes),
    miles15Min: Math.round(milesAdded15Min),
    avgKw: totalMinutes > 0 ? Math.round(((endSoc - startSoc) / 100 * vehicle.usablePackKwh) / (totalMinutes / 60)) : 0
  };
}

export default function CompareTool() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [carAId, setCarAId] = useState(searchParams?.get('carA') || 'tesla-model-y-lr');
  const [carBId, setCarBId] = useState(searchParams?.get('carB') || 'hyundai-ioniq-5');
  const [chargerCap, setChargerCap] = useState(Number(searchParams?.get('cap')) || 350);
  const [startSoc, setStartSoc] = useState(Number(searchParams?.get('start')) || 10);
  const [endSoc, setEndSoc] = useState(Number(searchParams?.get('end')) || 80);
  const [temp, setTemp] = useState(searchParams?.get('temp') || 'mild');
  const [copied, setCopied] = useState(false);

  const carA = VEHICLES[carAId];
  const carB = VEHICLES[carBId];
  const tempMultiplier = temp === 'mild' ? 1.0 : 0.65;

  const chartData = useMemo(() => {
    const data = [];
    if (!carA || !carB) return [];
    
    for (let i = 0; i <= 100; i++) {
      const kwA = Math.min(interpolateKw(carA.curve, i) * tempMultiplier, chargerCap);
      const kwB = Math.min(interpolateKw(carB.curve, i) * tempMultiplier, chargerCap);
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

  if (!carA || !carB) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Pickers & Controls */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Vehicle Pickers */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /> Vehicle A (Emerald)
            </h3>
            <select 
              value={carAId} 
              onChange={(e) => setCarAId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              {Object.values(VEHICLES).map((v: any) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Vehicle B (Cyan)
            </h3>
            <select 
              value={carBId} 
              onChange={(e) => setCarBId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              {Object.values(VEHICLES).map((v: any) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
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
              <XAxis 
                dataKey="soc" 
                stroke="#64748B" 
                tick={{fill: '#64748B'}} 
                tickFormatter={(val) => `${val}%`} 
                minTickGap={20}
              />
              <YAxis 
                stroke="#64748B" 
                tick={{fill: '#64748B'}} 
                tickFormatter={(val) => `${val} kW`} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '8px' }}
                itemStyle={{ color: '#F8FAFC' }}
                labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
                formatter={(value: any, name: any) => {
                  return [`${value} kW`, name === 'carA_kw' ? carA.name : carB.name];
                }}
                labelFormatter={(label) => `State of Charge: ${label}%`}
              />
              {/* Highlight active charging region */}
              {startSoc > 0 && (
                <rect x="0" y="0" width={`${startSoc}%`} height="100%" fill="#000000" fillOpacity={0.5} />
              )}
              {endSoc < 100 && (
                <rect x={`${endSoc}%`} y="0" width={`${100 - endSoc}%`} height="100%" fill="#000000" fillOpacity={0.5} />
              )}

              <Area type="monotone" dataKey="carB_kw" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorCarB)" activeDot={{ r: 6 }} />
              <Area type="monotone" dataKey="carA_kw" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCarA)" activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Delta Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="w-24 h-24" />
          </div>
          <h3 className="text-slate-400 font-medium mb-1">Time to Charge ({startSoc}% to {endSoc}%)</h3>
          <div className="flex items-end gap-3 mt-4">
            <div className="text-emerald-400">
              <span className="text-4xl font-bold">{statsA.timeMinutes}</span>
              <span className="text-sm ml-1">mins</span>
            </div>
            <div className="text-slate-500 pb-1">vs</div>
            <div className="text-cyan-400">
              <span className="text-4xl font-bold">{statsB.timeMinutes}</span>
              <span className="text-sm ml-1">mins</span>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            {statsA.timeMinutes < statsB.timeMinutes ? (
              <span className="text-white font-medium">{carA.name} charges {statsB.timeMinutes - statsA.timeMinutes} minutes faster</span>
            ) : statsA.timeMinutes > statsB.timeMinutes ? (
              <span className="text-white font-medium">{carB.name} charges {statsA.timeMinutes - statsB.timeMinutes} minutes faster</span>
            ) : (
              <span className="text-white font-medium">Both vehicles take exactly the same time</span>
            )} for this session.
          </p>
        </div>

        {/* 15-Min Miles Added */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Settings2 className="w-24 h-24" />
          </div>
          <h3 className="text-slate-400 font-medium mb-1">Miles Added in a 15-Min Quick Stop</h3>
          <div className="flex items-end gap-3 mt-4">
            <div className="text-emerald-400">
              <span className="text-4xl font-bold">{statsA.miles15Min}</span>
              <span className="text-sm ml-1">mi</span>
            </div>
            <div className="text-slate-500 pb-1">vs</div>
            <div className="text-cyan-400">
              <span className="text-4xl font-bold">{statsB.miles15Min}</span>
              <span className="text-sm ml-1">mi</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            Starting at {startSoc}%, the <span className="text-white">{statsA.miles15Min > statsB.miles15Min ? carA.name : carB.name}</span> adds more range in a 15-minute bio-break, thanks to its {statsA.miles15Min > statsB.miles15Min ? 'efficiency and curve' : 'efficiency and curve'}.
          </p>
        </div>

        {/* Avg kW */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="w-24 h-24" />
          </div>
          <h3 className="text-slate-400 font-medium mb-1">Average Sustained Power</h3>
          <div className="flex items-end gap-3 mt-4">
            <div className="text-emerald-400">
              <span className="text-3xl font-bold">{statsA.avgKw}</span>
              <span className="text-sm ml-1">kW</span>
            </div>
            <div className="text-slate-500 pb-1">vs</div>
            <div className="text-cyan-400">
              <span className="text-3xl font-bold">{statsB.avgKw}</span>
              <span className="text-sm ml-1">kW</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Peak kW is for marketing. Average kW dictates your wait time.
          </p>
        </div>

        {/* Architecture */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Info className="w-24 h-24" />
          </div>
          <h3 className="text-slate-400 font-medium mb-4">Architecture Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="block text-sm font-semibold text-emerald-400">{carA.name}</span>
                <span className="block text-xs text-slate-500">Max: {carA.maxChargeKw} kW</span>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full font-bold">
                {carA.architecture}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="block text-sm font-semibold text-cyan-400">{carB.name}</span>
                <span className="block text-xs text-slate-500">Max: {carB.maxChargeKw} kW</span>
              </div>
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded-full font-bold">
                {carB.architecture}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
