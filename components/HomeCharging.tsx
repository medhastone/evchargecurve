import { useSettings } from '@/components/providers/SettingsProvider';
'use client';

import React, { useState } from 'react';

export default function HomeCharging() {
  const { currency: globalCurrency } = useSettings();
 const [offPeakRate, setOffPeakRate] = useState(0.09);
 const [peakRate, setPeakRate] = useState(0.38);
 const [annualMiles, setAnnualMiles] = useState(13500);
 const [activePlug, setActivePlug] = useState('wall');
 
 const plugs = [
 { id: 'level1', label: '120V / 12A', name: 'NEMA 5-15', kw: 1.4, miHr: 3 },
 { id: 'level2_slow', label: '240V / 24A', name: 'NEMA 10-30', kw: 5.7, miHr: 22 },
 { id: 'level2_med', label: '240V / 32A', name: 'NEMA 14-50', kw: 7.6, miHr: 30 },
 { id: 'wall', label: '240V / 48A', name: 'Wall Connector', kw: 11.5, miHr: 44 }
 ];
 
 const selectedPlug = plugs.find(p => p.id === activePlug) || plugs[3];
 
 const efficiency = 0.28; // kWh / mi
 const dailyMiles = annualMiles / 365;
 const dailyKwh = dailyMiles * efficiency;
 const hoursToReplenish = dailyKwh / selectedPlug.kw;
 
 const offPeakCost = (annualMiles * efficiency * offPeakRate) / 12;
 const peakCost = (annualMiles * efficiency * peakRate) / 12;
 const savings = peakCost - offPeakCost;

 return (
 <div className="max-w-7xl mx-auto px-gutter-desktop py-8 animate-fade-in pb-32">
 <div className="mb-8">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-emerald-400 uppercase tracking-widest text-[10px] mb-3">
 <span className="material-symbols-outlined text-[14px]">home</span>
 <span>Residential</span>
 </div>
 <h1 className="font-headline-xl text-slate-100 tracking-tight mb-2">Home Charging Calculator</h1>
 <p className="text-base text-slate-300 max-w-2xl">
 Model charging speeds based on hardware and calculate Time-of-Use (TOU) tariff savings.
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
 <div className="lg:col-span-8 flex flex-col gap-6">
 <div className="bg-slate-800 rounded-[24px] p-8 border border-slate-600 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
 <h2 className="font-bold text-xl text-slate-100 mb-6">Hardware Setup</h2>
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
 {plugs.map(p => (
 <button 
 key={p.id}
 onClick={() => setActivePlug(p.id)}
 className={`flex flex-col gap-2 p-4 rounded-xl border text-left transition-all ${
 activePlug === p.id 
 ? 'bg-primary/10 border-primary text-emerald-400' 
 : 'bg-slate-600 border-transparent hover:bg-slate-950-bright text-slate-300'
 }`}
 >
 <span className="uppercase tracking-widest text-[10px] uppercase tracking-wider">{p.name}</span>
 <span className={`font-bold text-lg ${activePlug === p.id ? 'text-slate-100' : ''}`}>
 {p.kw} kW
 </span>
 <span className="text-xs ">{p.label}</span>
 </button>
 ))}
 </div>

 <h2 className="font-bold text-xl text-slate-100 mb-6">Time of Use (TOU) Rates</h2>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="flex flex-col gap-2">
 <div className="flex justify-between items-end">
 <label className="uppercase tracking-widest text-[10px] text-slate-300">Off-Peak Rate</label>
 <span key={globalCurrency.symbol} className="font-mono text-sm text-emerald-400">{globalCurrency.symbol}{offPeakRate.toFixed(2)}</span>
 </div>
 <input 
 type="range" min="0.01" max="0.30" step="0.01" value={offPeakRate} 
 onChange={(e) => setOffPeakRate(parseFloat(e.target.value))}
 className="w-full accent-primary h-2 bg-slate-600 rounded-full appearance-none cursor-pointer"
 />
 </div>

 <div className="flex flex-col gap-2">
 <div className="flex justify-between items-end">
 <label className="uppercase tracking-widest text-[10px] text-slate-300">Peak Rate</label>
 <span key={globalCurrency.symbol} className="font-mono text-sm text-error">{globalCurrency.symbol}{peakRate.toFixed(2)}</span>
 </div>
 <input 
 type="range" min="0.10" max="0.80" step="0.01" value={peakRate} 
 onChange={(e) => setPeakRate(parseFloat(e.target.value))}
 className="w-full accent-error h-2 bg-slate-600 rounded-full appearance-none cursor-pointer"
 />
 </div>
 </div>

 <div className="mt-8 pt-8 border-t border-slate-600">
 <div className="flex justify-between items-end mb-3">
 <label className="uppercase tracking-widest text-[10px] text-slate-300">Annual Mileage</label>
 <span className="font-mono text-sm text-slate-100">{annualMiles.toLocaleString()} mi</span>
 </div>
 <input 
 type="range" min="5000" max="30000" step="500" value={annualMiles} 
 onChange={(e) => setAnnualMiles(parseInt(e.target.value, 10))}
 className="w-full accent-surface-tint h-2 bg-slate-600 rounded-full appearance-none cursor-pointer"
 />
 </div>
 </div>
 </div>

 <div className="lg:col-span-4 flex flex-col gap-6">
 <div className="bg-slate-800 rounded-[24px] p-8 border border-slate-600 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
 <h2 className="uppercase tracking-widest text-[10px] text-slate-300 mb-8">Charging Projection</h2>
 
 <div className="flex flex-col gap-2 mb-6 border-b border-slate-600 pb-6">
 <span className="font-label-numeric-hero text-slate-100 leading-none">
 {hoursToReplenish.toFixed(1)} <span className="font-bold text-lg text-slate-300">hrs</span>
 </span>
 <span className="text-xs text-slate-300">Daily time to replenish {(dailyMiles).toFixed(0)} miles</span>
 </div>
 
 <div className="space-y-4 pt-2">
 <div className="flex justify-between items-center">
 <span className="text-xs text-slate-300">Speed (Mi/Hr)</span>
 <span className="font-mono text-xs text-emerald-400">+{selectedPlug.miHr} mi/hr</span>
 </div>
 <div className="flex justify-between items-center mt-6">
 <span className="text-xs text-slate-300">Est. Off-Peak (Monthly)</span>
 <span key={globalCurrency.symbol} className="font-mono text-xs text-slate-100">{globalCurrency.symbol}{offPeakCost.toFixed(0)}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-xs text-slate-300">Est. Peak (Monthly)</span>
 <span key={globalCurrency.symbol} className="font-mono text-xs text-slate-300 line-through">{globalCurrency.symbol}{peakCost.toFixed(0)}</span>
 </div>
 <div className="flex justify-between items-center bg-primary/10 -mx-3 px-3 py-2 rounded-lg mt-3">
 <span className="text-xs text-emerald-400 font-semibold">Monthly Savings</span>
 <span key={globalCurrency.symbol} className="font-mono text-xs text-emerald-400 font-bold">{globalCurrency.symbol}{savings.toFixed(0)}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
