#!/bin/bash
cat << 'INNER_EOF' > components/DcSimulator.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { interpolateChargeCurve } from '@/lib/evCalculations';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const VEHICLES: Record<string, any> = {
  'tesla-model-y-lr': {
    id: 'tesla-model-y-lr',
    name: 'Tesla Model Y Long Range',
    brand: 'tesla',
    batteryCapacity: 75.0,
    maxChargeKw: 250,
    architecture: '400V',
    chemistry: 'NMC',
    curve: [
      { soc: 0, kw: 100 },
      { soc: 10, kw: 250 },
      { soc: 20, kw: 250 },
      { soc: 30, kw: 200 },
      { soc: 40, kw: 160 },
      { soc: 50, kw: 120 },
      { soc: 60, kw: 80 },
      { soc: 70, kw: 60 },
      { soc: 80, kw: 45 },
      { soc: 90, kw: 25 },
      { soc: 100, kw: 5 }
    ]
  },
  'hyundai-ioniq-5': {
    id: 'hyundai-ioniq-5',
    name: 'Hyundai Ioniq 5 AWD',
    brand: 'hyundai',
    batteryCapacity: 77.4,
    maxChargeKw: 235,
    architecture: '800V',
    chemistry: 'NMC',
    curve: [
      { soc: 0, kw: 150 },
      { soc: 10, kw: 200 },
      { soc: 30, kw: 230 },
      { soc: 50, kw: 235 },
      { soc: 70, kw: 175 },
      { soc: 80, kw: 120 },
      { soc: 90, kw: 40 },
      { soc: 100, kw: 10 }
    ]
  },
  'ford-mustang-mach-e': {
    id: 'ford-mustang-mach-e',
    name: 'Ford Mustang Mach-E ER',
    brand: 'ford',
    batteryCapacity: 91.0,
    maxChargeKw: 150,
    architecture: '400V',
    chemistry: 'NMC',
    curve: [
      { soc: 0, kw: 80 },
      { soc: 10, kw: 150 },
      { soc: 30, kw: 150 },
      { soc: 40, kw: 110 },
      { soc: 60, kw: 80 },
      { soc: 80, kw: 45 },
      { soc: 90, kw: 20 },
      { soc: 100, kw: 5 }
    ]
  }
};

const CHARGER_TIERS = [50, 150, 250, 350];
const CURRENCIES: Record<string, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  CAD: '$',
  AUD: '$'
};

export default function DcSimulator() {
  const [selectedVehicleId, setSelectedVehicleId] = useState('tesla-model-y-lr');
  const [chargerCapKw, setChargerCapKw] = useState(250);
  const [startSoc, setStartSoc] = useState(10);
  const [endSoc, setEndSoc] = useState(80);
  const [isColdWeather, setIsColdWeather] = useState(false);
  const [kwhCost, setKwhCost] = useState(0.45);
  const [currency, setCurrency] = useState('USD');
  const [copied, setCopied] = useState(false);

  // Initialize from URL params if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('v');
      const s = params.get('s');
      const e = params.get('e');
      if (v && VEHICLES[v]) setSelectedVehicleId(v);
      if (s) setStartSoc(Math.max(0, Math.min(parseInt(s, 10), 99)));
      if (e) setEndSoc(Math.max(1, Math.min(parseInt(e, 10), 100)));
    }
  }, []);

  // Sync range slider bounds strictly
  useEffect(() => {
    if (startSoc >= endSoc) {
      setStartSoc(Math.max(0, endSoc - 1));
    }
  }, [startSoc, endSoc]);

  const vehicle = VEHICLES[selectedVehicleId];
  const safeEndSoc = Math.max(endSoc, startSoc + 1);

  // Core Math computations via useMemo
  const calculation = useMemo(() => {
    const ambientTempF = isColdWeather ? 30 : 70;
    const isPreconditioned = !isColdWeather;
    
    return interpolateChargeCurve(
      vehicle.curve,
      Math.min(chargerCapKw, vehicle.maxChargeKw),
      startSoc,
      safeEndSoc,
      vehicle.batteryCapacity,
      ambientTempF,
      isPreconditioned
    );
  }, [vehicle, chargerCapKw, startSoc, safeEndSoc, isColdWeather]);

  const sessionCost = (calculation.kwhAdded * kwhCost).toFixed(2);
  const currencySymbol = CURRENCIES[currency] || '$';

  // Action Buttons
  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('v', selectedVehicleId);
    url.searchParams.set('s', startSoc.toString());
    url.searchParams.set('e', safeEndSoc.toString());
    navigator.clipboard.writeText(url.toString());
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `I calculated charging on my ${vehicle.name}: ${startSoc}% to ${safeEndSoc}% takes ${calculation.totalMinutes} mins, adds ${calculation.kwhAdded} kWh, costs ${currencySymbol}${sessionCost}. Check it here: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Recharts custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface-container-high border border-outline-variant p-space-sm rounded-lg shadow-lg">
          <p className="font-label-caps text-label-caps text-outline uppercase">{label}% SOC</p>
          <p className="font-body-md text-body-md font-semibold text-primary">{data.actualKw} kW</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-gutter-mobile md:px-gutter-desktop pb-space-2xl">
      {/* Background ambient glow */}
      <div className="absolute -top-12 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* Header */}
      <div className="flex flex-col items-center text-center pt-space-lg pb-space-xl max-w-4xl mx-auto">
        <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-sm">
          DC Fast Charge <span className="text-primary">Simulator</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Interactive charging curve telemetry and time simulator powered by real-world BMS metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Col: Controls */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="p-space-lg rounded-xl bg-surface-container-low shadow-xl flex flex-col gap-space-lg">
            
            {/* Vehicle Selection */}
            <div className="flex flex-col gap-space-sm">
              <label className="font-label-caps text-label-caps text-outline uppercase">Select Vehicle</label>
              <select 
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full bg-surface-container-highest text-on-surface p-space-sm rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              >
                {Object.values(VEHICLES).map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
              <div className="flex gap-space-xs text-on-surface-variant text-label-numeric-sm font-label-numeric-sm">
                <span>{vehicle.batteryCapacity} kWh Usable</span>
                <span>•</span>
                <span>{vehicle.architecture} Architecture</span>
                <span>•</span>
                <span>Max {vehicle.maxChargeKw} kW</span>
              </div>
            </div>

            {/* Dispenser Max Power */}
            <div className="flex flex-col gap-space-sm">
              <label className="font-label-caps text-label-caps text-outline uppercase">Charger Capacity (kW)</label>
              <div className="flex gap-space-xs">
                {CHARGER_TIERS.map(kw => (
                  <button
                    key={kw}
                    onClick={() => setChargerCapKw(kw)}
                    className={`flex-1 py-space-xs rounded-lg font-label-numeric-sm text-label-numeric-sm transition-all ${
                      chargerCapKw === kw
                        ? 'bg-primary text-on-primary font-bold shadow-sm'
                        : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                    }`}
                  >
                    {kw} kW
                  </button>
                ))}
              </div>
            </div>

            {/* SOC Sliders */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex justify-between items-center">
                <label className="font-label-caps text-label-caps text-outline uppercase">Charge Range</label>
                <span className="font-label-numeric-sm text-label-numeric-sm text-primary font-bold">{startSoc}% → {safeEndSoc}%</span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="text-body-sm text-on-surface-variant w-12">Start</span>
                  <input 
                    type="range" 
                    min="0" max="99" 
                    value={startSoc} 
                    onChange={(e) => setStartSoc(parseInt(e.target.value, 10))}
                    className="flex-1 accent-primary"
                  />
                  <span className="text-label-numeric-sm font-label-numeric-sm w-8 text-right">{startSoc}%</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="text-body-sm text-on-surface-variant w-12">End</span>
                  <input 
                    type="range" 
                    min="1" max="100" 
                    value={safeEndSoc} 
                    onChange={(e) => setEndSoc(parseInt(e.target.value, 10))}
                    className="flex-1 accent-primary"
                  />
                  <span className="text-label-numeric-sm font-label-numeric-sm w-8 text-right">{safeEndSoc}%</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-space-xs mt-space-xs">
                <button onClick={() => { setStartSoc(10); setEndSoc(80); }} className="px-space-sm py-space-2xs bg-surface-container-highest hover:bg-surface-bright rounded-full text-label-numeric-sm text-on-surface transition-colors">10% → 80% (Road Trip)</button>
                <button onClick={() => { setStartSoc(20); setEndSoc(80); }} className="px-space-sm py-space-2xs bg-surface-container-highest hover:bg-surface-bright rounded-full text-label-numeric-sm text-on-surface transition-colors">20% → 80% (Quick Stop)</button>
                <button onClick={() => { setStartSoc(10); setEndSoc(100); }} className="px-space-sm py-space-2xs bg-surface-container-highest hover:bg-surface-bright rounded-full text-label-numeric-sm text-on-surface transition-colors">10% → 100% (Full)</button>
              </div>
            </div>

            {/* Cold Weather & Cost */}
            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-caps text-label-caps text-outline uppercase">Conditions</label>
                <button 
                  onClick={() => setIsColdWeather(!isColdWeather)}
                  className={`py-space-xs px-space-sm rounded-lg flex items-center justify-center gap-space-2xs transition-all ${
                    isColdWeather ? 'bg-secondary text-on-secondary font-semibold' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">ac_unit</span>
                  {isColdWeather ? 'Cold Pack' : 'Optimal'}
                </button>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-caps text-label-caps text-outline uppercase">Energy Rate</label>
                <div className="flex items-center bg-surface-container-highest rounded-lg px-space-sm focus-within:ring-1 ring-primary transition-all">
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-transparent text-on-surface text-body-sm focus:outline-none appearance-none cursor-pointer"
                  >
                    {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input 
                    type="number" 
                    step="0.01"
                    value={kwhCost}
                    onChange={(e) => setKwhCost(parseFloat(e.target.value))}
                    className="bg-transparent text-on-surface w-full py-space-xs pl-space-xs focus:outline-none font-label-numeric-sm"
                  />
                  <span className="text-on-surface-variant text-body-sm pl-space-xs">/kWh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Chart & Results */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          
          {/* Main Telemetry Readout */}
          <div className="grid grid-cols-3 gap-space-sm">
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm border border-surface-container-high flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase mb-space-2xs">Total Duration</span>
              <div className="flex items-baseline gap-space-2xs">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{calculation.totalMinutes}</span>
                <span className="font-body-md text-body-md text-on-surface-variant">min</span>
              </div>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm border border-surface-container-high flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase mb-space-2xs">Energy Added</span>
              <div className="flex items-baseline gap-space-2xs">
                <span className="font-headline-lg text-headline-lg font-bold text-primary">{calculation.kwhAdded}</span>
                <span className="font-body-md text-body-md text-on-surface-variant">kWh</span>
              </div>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm border border-surface-container-high flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase mb-space-2xs">Session Cost</span>
              <div className="flex items-baseline gap-space-2xs">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{currencySymbol}{sessionCost}</span>
              </div>
            </div>
          </div>

          {/* Recharts Area */}
          <div className="p-space-lg rounded-xl bg-surface-container-low shadow-xl">
            <div className="flex justify-between items-center mb-space-md">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Charge Curve Telemetry</h3>
              <div className="flex items-center gap-space-xs text-label-numeric-sm font-label-numeric-sm text-on-surface-variant">
                <span>Avg: {calculation.avgKw} kW</span>
              </div>
            </div>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculation.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorKw" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4edea3" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4edea3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262a33" vertical={false} />
                  <XAxis 
                    dataKey="soc" 
                    stroke="#8c919d" 
                    tick={{ fill: '#8c919d', fontSize: 12 }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <YAxis 
                    stroke="#8c919d" 
                    tick={{ fill: '#8c919d', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine x={startSoc} stroke="#4edea3" strokeDasharray="3 3" />
                  <ReferenceLine x={safeEndSoc} stroke="#4edea3" strokeDasharray="3 3" />
                  <Area 
                    type="monotone" 
                    dataKey="actualKw" 
                    stroke="#4edea3" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorKw)" 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-space-md justify-end pt-space-xs">
            <button 
              onClick={handleCopyLink}
              className="px-space-md py-space-xs bg-surface-container-high hover:bg-surface-bright rounded-lg text-body-sm font-body-sm text-on-surface flex items-center gap-space-2xs transition-all"
            >
              {copied ? (
                <><span className="material-symbols-outlined text-[16px] text-primary">check</span><span className="text-primary">Copied!</span></>
              ) : (
                <><span className="material-symbols-outlined text-[16px]">link</span><span>Copy Result Link</span></>
              )}
            </button>
            <button 
              onClick={handleShareWhatsApp}
              className="px-space-md py-space-xs bg-surface-container-high hover:bg-surface-bright rounded-lg text-body-sm font-body-sm text-on-surface flex items-center gap-space-2xs transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">chat</span>
              <span>Share on WhatsApp</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
INNER_EOF
