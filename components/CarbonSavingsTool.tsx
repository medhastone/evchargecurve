'use client';

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Share2, Copy, Check, PlusCircle, Leaf, Zap, Fuel, TreePine } from 'lucide-react';
import { useSettings } from '@/components/providers/SettingsProvider';
import { useVehicles } from '@/components/providers/VehicleContext';

const GRID_INTENSITY_OPTIONS = [
  { label: "100% Rooftop Solar (0 g CO2/kWh)", value: 0 },
  { label: "Clean Hydro/Nuclear Mix (45 g CO2/kWh)", value: 45 },
  { label: "UK National Grid (130 g CO2/kWh)", value: 130 },
  { label: "US National Average (350 g CO2/kWh)", value: 350 },
  { label: "Carbon-Heavy Coal Grid (600 g CO2/kWh)", value: 600 }
];

export default function CarbonSavingsTool() {
  const { unit, distanceLabel } = useSettings();
  const { allVehicles, vehiclesMap, openStudio, customVehicles, isCustomVehicle } = useVehicles();
  
  const [selectedVehicleId, setSelectedVehicleId] = useState(allVehicles[0]?.id || 'tesla-model-y-lr');
  const [annualDistance, setAnnualDistance] = useState(12000);
  const [gasEfficiency, setGasEfficiency] = useState(28); // always stores MPG internally for math
  const [gridIntensity, setGridIntensity] = useState(350);
  const [copied, setCopied] = useState(false);

  const vehicle = useMemo(() => vehiclesMap[selectedVehicleId] || allVehicles[0], [selectedVehicleId, vehiclesMap, allVehicles]);

  // Computations
  const stats = useMemo(() => {
    const packKwh = vehicle?.usablePackKwh || vehicle?.batteryCapacity || 75;
    const epaRange = vehicle?.epaRangeMiles || 300;
    const whPerMile = (packKwh * 1000) / epaRange;
    
    // convert user input to miles if they entered km
    const annualMiles = unit === 'km' ? annualDistance / 1.60934 : annualDistance;
    
    // ICE Well-to-Wheel (WTW): 8,887g tailpipe + 2,213g upstream refining per gallon
    const iceTailpipe = (annualMiles / gasEfficiency) * 8887;
    const iceUpstream = (annualMiles / gasEfficiency) * 2213;
    const iceTotal = iceTailpipe + iceUpstream;

    // EV Well-to-Wheel (incorporating 12% charging and inverter losses -> / 0.88)
    const evTotal = (annualMiles * (whPerMile / 1000) / 0.88) * gridIntensity;

    const netSavedGrams = Math.max(0, iceTotal - evTotal);
    const netSavedMT = netSavedGrams / 1_000_000;
    
    const reductionPercent = iceTotal > 0 ? ((iceTotal - evTotal) / iceTotal) * 100 : 0;
    const equivalentTrees = netSavedGrams / 21000; // EPA standard: ~21kg (48 lbs) CO2 per mature tree/year
    const avoidedBarrels = netSavedMT / 0.43; // ~0.43 metric tons CO2 per barrel of crude oil

    const chartData = [
      {
        name: 'Gasoline Car (WTW)',
        'Tailpipe CO2': Number((iceTailpipe / 1_000_000).toFixed(2)),
        'Upstream Refining': Number((iceUpstream / 1_000_000).toFixed(2)),
        'EV Grid Power': 0,
      },
      {
        name: `${vehicle?.name?.split(' ')?.[0] || 'Electric'} EV (WTW)`,
        'Tailpipe CO2': 0,
        'Upstream Refining': 0,
        'EV Grid Power': Number((evTotal / 1_000_000).toFixed(2)),
      }
    ];

    return {
      netSavedMT,
      reductionPercent,
      equivalentTrees,
      avoidedBarrels,
      chartData,
      iceTotalMT: iceTotal / 1_000_000,
      evTotalMT: evTotal / 1_000_000
    };
  }, [vehicle, annualDistance, gasEfficiency, gridIntensity, unit]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
       const text = `I just calculated my EV carbon offset on EVChargeCurve! Switching to a ${vehicle?.name || 'EV'} saves ${stats.netSavedMT.toFixed(2)} metric tons of CO2 per year (equivalent to ${Math.round(stats.equivalentTrees).toLocaleString()} trees planted).`;
       const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
       window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
       const text = `EV Carbon Offset: Driving a ${vehicle?.name || 'EV'} for ${annualDistance.toLocaleString()} ${distanceLabel}/yr saves ${stats.netSavedMT.toFixed(2)} metric tons of CO2 annually (-${Math.round(stats.reductionPercent)}% vs gas car), equivalent to planting ${Math.round(stats.equivalentTrees).toLocaleString()} trees. Calculated via EVChargeCurve.`;
       navigator.clipboard.writeText(text);
       setCopied(true);
       setTimeout(() => setCopied(false), 2500);
    }
  };

  const displayEfficiency = unit === 'km' 
    ? (235.215 / gasEfficiency).toFixed(1) + " L/100km" // conversion: L/100km = 235.215 / MPG
    : gasEfficiency + " MPG";

  return (
    <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-6xl mx-auto" role="region" aria-label="EV CO2 Emissions Saved and Carbon Offset Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* EV Model Selection */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="carbon-ev-select" className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                Select EV Model
              </label>
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
            <select
              id="carbon-ev-select"
              aria-label="Select Electric Vehicle Model"
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-medium text-sm appearance-none"
            >
              {customVehicles.length > 0 && (
                <optgroup label="⭐ My Custom Vehicles">
                  {customVehicles.map(v => (
                    <option key={v.id} value={v.id}>[Custom] {v.name} ({v.usablePackKwh || v.batteryCapacity} kWh)</option>
                  ))}
                </optgroup>
              )}
              <optgroup label="🚘 Production Vehicles">
                {allVehicles.filter(v => !isCustomVehicle(v.id)).map(v => (
                  <option key={v.id} value={v.id}>{v.name} ({v.usablePackKwh || v.batteryCapacity} kWh)</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Annual Distance */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="annual-distance-slider" className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Annual Driving Distance
              </label>
              <span className="text-emerald-400 font-bold text-sm">{annualDistance.toLocaleString()} {distanceLabel}</span>
            </div>
            <input
              id="annual-distance-slider"
              aria-label="Annual driving distance slider"
              type="range"
              min={unit === 'mi' ? 5000 : 8000}
              max={unit === 'mi' ? 35000 : 55000}
              step={unit === 'mi' ? 500 : 1000}
              value={annualDistance}
              onChange={(e) => setAnnualDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Gas Car Efficiency */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="gas-efficiency-slider" className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Replaced Gas Car Efficiency
              </label>
              <span className="text-amber-400 font-bold text-sm">{displayEfficiency}</span>
            </div>
            <input
              id="gas-efficiency-slider"
              aria-label="Replaced gas car fuel efficiency slider"
              type="range"
              min="15"
              max="55"
              step="1"
              value={gasEfficiency}
              onChange={(e) => setGasEfficiency(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Grid Source */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <label htmlFor="grid-intensity-select" className="text-xs text-slate-400 uppercase tracking-wider block font-semibold mb-2">
              Electricity Grid Carbon Mix
            </label>
            <select
              id="grid-intensity-select"
              aria-label="Select regional electricity grid carbon intensity"
              value={gridIntensity}
              onChange={(e) => setGridIntensity(Number(e.target.value))}
              className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-medium text-sm appearance-none"
            >
              {GRID_INTENSITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Visualization & Metrics */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-semibold">Net CO2 Saved</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                {stats.netSavedMT.toFixed(1)} <span className="text-xs font-normal text-slate-400">MT/yr</span>
              </div>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-semibold">Reduction</div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {stats.reductionPercent <= 0 ? '0%' : `-${Math.round(stats.reductionPercent)}%`}
              </div>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-semibold">Trees Planted</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                {Math.round(stats.equivalentTrees).toLocaleString()}
              </div>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-semibold">Oil Barrels Saved</div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">
                {Math.round(stats.avoidedBarrels).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-[270px] w-full bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }} 
                  contentStyle={{ backgroundColor: '#131B2A', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#e2e8f0', fontSize: '13px' }}
                  formatter={(value: any) => [`${Number(value).toFixed(2)} Metric Tons CO2`, undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#cbd5e1', paddingTop: '8px' }} />
                <Bar dataKey="Tailpipe CO2" stackId="a" fill="#f59e0b" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Upstream Refining" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="EV Grid Power" stackId="b" fill="#10b981" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Social Proof & Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button 
              type="button"
              onClick={handleCopy}
              aria-label="Copy carbon offset calculation slip to clipboard"
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl border border-slate-700 transition-colors text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Calculation Slip</span>
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={handleShare}
              aria-label="Share carbon impact on WhatsApp"
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Impact on WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
