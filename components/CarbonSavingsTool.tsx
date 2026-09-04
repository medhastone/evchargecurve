'use client';

import React, { useState, useMemo } from 'react';
import { VEHICLES } from '@/data/evModels';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Share2, Copy } from 'lucide-react';
import { useSettings } from '@/components/providers/SettingsProvider';

export default function CarbonSavingsTool() {
  const { unit, distanceLabel, currency } = useSettings();
  
  const [selectedVehicle, setSelectedVehicle] = useState('tesla-model-y-lr');
  // Store the raw slider value; it represents miles if unit='mi', or km if unit='km'
  const [annualDistance, setAnnualDistance] = useState(12000);
  
  // For simplicity, we'll keep gas efficiency as MPG for now, or adapt it.
  // If unit === 'km', users might prefer L/100km. Let's make the slider represent MPG internally, 
  // but we can just label it as "Efficiency" and if they select km, maybe we just do km/L? 
  // Let's keep it as MPG but show km/L if unit is km.
  const [gasEfficiency, setGasEfficiency] = useState(28); // always stores MPG internally for math

  const gridIntensityOptions = [
    { label: "100% Rooftop Solar (0 g CO2/kWh)", value: 0 },
    { label: "Clean Hydro/Nuclear Mix (45 g CO2/kWh)", value: 45 },
    { label: "UK National Grid (130 g CO2/kWh)", value: 130 },
    { label: "US National Average (350 g CO2/kWh)", value: 350 },
    { label: "Carbon-Heavy Grid (600 g CO2/kWh)", value: 600 }
  ];
  const [gridIntensity, setGridIntensity] = useState(350);

  // Computations
  const stats = useMemo(() => {
    const vehicle = VEHICLES[selectedVehicle];
    const whPerMile = (vehicle.usablePackKwh * 1000) / vehicle.epaRangeMiles;
    
    // convert user input to miles if they entered km
    const annualMiles = unit === 'km' ? annualDistance / 1.60934 : annualDistance;
    
    // ICE Well-to-Wheel
    const iceTailpipe = (annualMiles / gasEfficiency) * 8887;
    const iceUpstream = (annualMiles / gasEfficiency) * 2213;
    const iceTotal = iceTailpipe + iceUpstream;

    // EV Well-to-Wheel (incorporating 12% loss -> / 0.88)
    const evTotal = (annualMiles * (whPerMile / 1000) / 0.88) * gridIntensity;

    const netSavedGrams = Math.max(0, iceTotal - evTotal);
    const netSavedMT = netSavedGrams / 1_000_000;
    
    const reductionPercent = iceTotal > 0 ? ((iceTotal - evTotal) / iceTotal) * 100 : 0;
    const equivalentTrees = netSavedGrams / 21000;
    const avoidedBarrels = netSavedMT / 0.43;

    const chartData = [
      {
        name: 'ICE Vehicle',
        'Tailpipe CO2': iceTailpipe / 1_000_000,
        'Upstream CO2': iceUpstream / 1_000_000,
        'EV Grid CO2': 0,
      },
      {
        name: 'Electric Vehicle',
        'Tailpipe CO2': 0,
        'Upstream CO2': 0,
        'EV Grid CO2': evTotal / 1_000_000,
      }
    ];

    return {
      netSavedMT,
      reductionPercent,
      equivalentTrees,
      avoidedBarrels,
      chartData,
    };
  }, [selectedVehicle, annualDistance, gasEfficiency, gridIntensity, unit]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
       const text = `I just calculated my carbon offset! Switching to an EV saves ${stats.netSavedMT.toFixed(2)} metric tons of CO2 annually.`;
       const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
       window.open(url, '_blank');
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
       navigator.clipboard.writeText(`I save ${stats.netSavedMT.toFixed(2)} metric tons of CO2 per year by driving an EV!`);
       alert('Calculation slip copied to clipboard!');
    }
  };

  const displayEfficiency = unit === 'km' 
    ? (235.215 / gasEfficiency).toFixed(1) + " L/100km" // conversion: L/100km = 235.215 / MPG
    : gasEfficiency + " MPG";

  return (
    <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">EV Model Selection</label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow appearance-none"
            >
              {Object.keys(VEHICLES).map((key) => (
                <option key={key} value={key}>{VEHICLES[key].name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium text-slate-400">Annual Driving Distance</label>
              <span className="text-emerald-400 font-bold">{annualDistance.toLocaleString()} {distanceLabel}</span>
            </div>
            <input
              type="range"
              min={unit === 'mi' ? "5000" : "8000"}
              max={unit === 'mi' ? "30000" : "50000"}
              step={unit === 'mi' ? "1000" : "1000"}
              value={annualDistance}
              onChange={(e) => setAnnualDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium text-slate-400">Replaced Gas Car Efficiency</label>
              <span className="text-amber-400 font-bold">{displayEfficiency}</span>
            </div>
            <input
              type="range"
              min="15"
              max="55"
              step="1"
              value={gasEfficiency}
              onChange={(e) => setGasEfficiency(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Electricity Grid Source</label>
            <select
              value={gridIntensity}
              onChange={(e) => setGridIntensity(Number(e.target.value))}
              className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow appearance-none"
            >
              {gridIntensityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Visualization & Metrics */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Net CO2 Saved</div>
              <div className="text-2xl md:text-3xl font-black text-emerald-400">{stats.netSavedMT.toFixed(1)} <span className="text-sm font-medium text-slate-500">MT/yr</span></div>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Reduction</div>
              <div className="text-2xl md:text-3xl font-black text-white">{stats.reductionPercent <= 0 ? '0%' : `-${stats.reductionPercent.toFixed(0)}%`}</div>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Equivalent Trees</div>
              <div className="text-2xl md:text-3xl font-black text-emerald-400">{Math.round(stats.equivalentTrees).toLocaleString()}</div>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Barrels Avoided</div>
              <div className="text-2xl md:text-3xl font-black text-cyan-400">{Math.round(stats.avoidedBarrels).toLocaleString()}</div>
            </div>
          </div>

          <div className="h-[250px] w-full bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }} 
                  contentStyle={{ backgroundColor: '#131B2A', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  formatter={(value: any) => [`${Number(value).toFixed(2)} MT`, undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                <Bar dataKey="Tailpipe CO2" stackId="a" fill="#f59e0b" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Upstream CO2" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="EV Grid CO2" stackId="b" fill="#10b981" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
            >
              <Copy className="w-5 h-5 text-slate-400" />
              Copy Calculation Slip
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-medium py-3 px-4 rounded-xl transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share Impact on WhatsApp
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
