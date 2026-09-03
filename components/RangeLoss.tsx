'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

export default function RangeLoss() {
 const [tempF, setTempF] = useState<number>(15);
 const [speed, setSpeed] = useState<number>(75);
 const [climate, setClimate] = useState<string>('heatpump');
 const [towingLbs, setTowingLbs] = useState<number>(1200);
 const [activePreset, setActivePreset] = useState<string>('preset-subzero');

 const baseEPA = 310;
 const baseBatteryCapacity = 75; // kWh usable

 const tempC = Math.round((tempF - 32) * (5 / 9));

 // 1. Thermal penalty Calculation
 let thermalLossPct = 0;
 if (tempF < 70) {
 thermalLossPct = Math.min(22, (70 - tempF) * 0.25);
 }
 thermalLossPct = Math.round(thermalLossPct);

 // 2. Climate Mode Penalty
 let climateLossPct = 0;
 let climateName = 'Heat Pump';
 if (climate === 'resistive') {
 climateLossPct = 18;
 climateName = 'Resistive PTC Max';
 } else if (climate === 'heatpump') {
 climateLossPct = tempF < 30 ? 9 : (tempF < 55 ? 5 : 2);
 climateName = `Heat Pump @ ${tempF}°F`;
 } else if (climate === 'aceco') {
 climateLossPct = 4;
 climateName = 'A/C Eco 72°F';
 } else {
 climateLossPct = 1;
 climateName = 'Seat Warmers Only';
 }

 // 3. Aero Speed Penalty
 let aeroLossPct = 0;
 let speedAeroNote = "";
 if (speed === 55) {
 aeroLossPct = 0;
 speedAeroNote = "Baseline EPA highway speed benchmark";
 } else if (speed === 65) {
 aeroLossPct = 6;
 speedAeroNote = "+14% aerodynamic drag increase over 55 mph baseline";
 } else if (speed === 75) {
 aeroLossPct = 11;
 speedAeroNote = "+31% aerodynamic drag increase over 55 mph baseline";
 } else if (speed === 85) {
 aeroLossPct = 21;
 speedAeroNote = "+56% exponential drag increase over 55 mph baseline";
 }

 // 4. Towing/Payload Penalty
 let towingLossPct = Math.round((towingLbs / 7500) * 26);

 // Total Penalty
 const totalPenaltyPct = Math.min(65, thermalLossPct + climateLossPct + aeroLossPct + towingLossPct);
 const remainingRange = Math.round(baseEPA * (1 - totalPenaltyPct / 100));
 const milesLost = baseEPA - remainingRange;
 const retainedPct = ((remainingRange / baseEPA) * 100).toFixed(1);

 // Metrics
 const totalKwhDrawn = baseBatteryCapacity * (totalPenaltyPct / 100);
 const whPerMile = remainingRange > 0 ? Math.round((baseBatteryCapacity * 1000) / remainingRange) : 0;
 const miPerKwh = (remainingRange / baseBatteryCapacity).toFixed(2);
 const driveHours = speed > 0 ? (remainingRange / speed).toFixed(2) : "0.00";
 const stopMult = (totalPenaltyPct > 40 ? 1.9 : (totalPenaltyPct > 25 ? 1.6 : 1.2)).toFixed(1);

 const applyPreset = (id: string) => {
 setActivePreset(id);
 if (id === 'preset-subzero') {
 setTempF(15);
 setTowingLbs(1200);
 setSpeed(75);
 setClimate('heatpump');
 } else if (id === 'preset-towing') {
 setTempF(65);
 setTowingLbs(4500);
 setSpeed(65);
 setClimate('aceco');
 } else if (id === 'preset-roofbox') {
 setTempF(50);
 setTowingLbs(600);
 setSpeed(75);
 setClimate('heatpump');
 } else if (id === 'preset-summer') {
 setTempF(70);
 setTowingLbs(0);
 setSpeed(65);
 setClimate('aceco');
 }
 };

 return (
 <div className="flex flex-col w-full">
 {/* Subtle Ambient Glow Canvas Decor */}
 <div className="relative w-full overflow-hidden">
 <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
 <div className="absolute top-48 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

 {/* Main Container Grid */}
 <div className="max-w-7xl mx-auto px-gutter-desktop py-8 flex flex-col gap-8">
 {/* Header Module */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-3">
 <div className="flex flex-col gap-2 max-w-3xl">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 w-fit">
 <span className="material-symbols-outlined text-cyan-400 text-[16px]">thermostat</span>
 <span className="uppercase tracking-widest text-[10px] uppercase tracking-widest text-cyan-400 font-semibold">Aerodynamic & Thermal Loss Engine</span>
 </div>
 <h1 className="font-headline-xl text-slate-100 tracking-tight font-bold">
 Cold Weather, Highway Speed & Towing Range Calculator
 </h1>
 <p className="text-base text-slate-300 leading-relaxed">
 Simulate real-world highway range penalties from sub-zero temperatures, aerodynamic drag at speed, heavy payload, and cabin heating consumption.
 </p>
 </div>
 
 {/* Vehicle Spec Capsule */}
 <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 shadow-sm shrink-0">
 <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shadow-inner">
 <span className="material-symbols-outlined text-[26px]">electric_car</span>
 </div>
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] uppercase text-slate-500">Active Vehicle Baseline</span>
 <span className="font-bold text-lg text-slate-100 font-semibold leading-tight">Tesla Model Y Long Range</span>
 <span className="font-mono text-[11px] text-slate-300">75 kWh Usable &bull; 310 mi EPA Baseline</span>
 </div>
 </div>
 </div>

 {/* Quick Scenario Presets Row */}
 <div className="flex flex-col gap-2">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] uppercase text-slate-500 tracking-wider">Quick Calibration Scenarios</span>
 <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
 <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
 Real-time Telemetry Synthesis
 </span>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
 <button 
 className={`preset-pill group flex items-center justify-between p-4 rounded-xl shadow-sm transition-all text-left ${activePreset === 'preset-subzero' ? 'bg-slate-600 text-emerald-400 hover:brightness-110' : 'bg-slate-900 text-slate-300 hover:bg-slate-700 hover:text-slate-100'}`}
 onClick={() => applyPreset('preset-subzero')}
 >
 <div className="flex items-center gap-3">
 <span className={`material-symbols-outlined text-[20px] ${activePreset === 'preset-subzero' ? 'text-emerald-400' : 'text-emerald-400'}`}>ac_unit</span>
 <div className="flex flex-col">
 <span className="font-bold text-lg font-semibold leading-none">Sub-Zero Winter Highway</span>
 <span className={`uppercase tracking-widest text-[10px] mt-1 ${activePreset === 'preset-subzero' ? 'text-slate-300' : 'text-slate-500'}`}>15&deg;F &bull; 75 mph &bull; Heat Pump</span>
 </div>
 </div>
 <span className={`material-symbols-outlined text-[18px] ${activePreset === 'preset-subzero' ? 'text-emerald-400' : 'text-slate-500'}`}>
 {activePreset === 'preset-subzero' ? 'radio_button_checked' : 'radio_button_unchecked'}
 </span>
 </button>

 <button 
 className={`preset-pill group flex items-center justify-between p-4 rounded-xl shadow-sm transition-all text-left ${activePreset === 'preset-towing' ? 'bg-slate-600 text-emerald-400 hover:brightness-110' : 'bg-slate-900 text-slate-300 hover:bg-slate-700 hover:text-slate-100'}`}
 onClick={() => applyPreset('preset-towing')}
 >
 <div className="flex items-center gap-3">
 <span className={`material-symbols-outlined text-[20px] ${activePreset === 'preset-towing' ? 'text-purple-400' : 'text-purple-400'}`}>rv_hookup</span>
 <div className="flex flex-col">
 <span className="font-bold text-lg font-semibold leading-none">Heavy Towing (4,500 lbs)</span>
 <span className={`uppercase tracking-widest text-[10px] mt-1 ${activePreset === 'preset-towing' ? 'text-slate-300' : 'text-slate-500'}`}>65&deg;F &bull; 65 mph &bull; Camper Aero</span>
 </div>
 </div>
 <span className={`material-symbols-outlined text-[18px] ${activePreset === 'preset-towing' ? 'text-emerald-400' : 'text-slate-500'}`}>
 {activePreset === 'preset-towing' ? 'radio_button_checked' : 'radio_button_unchecked'}
 </span>
 </button>

 <button 
 className={`preset-pill group flex items-center justify-between p-4 rounded-xl shadow-sm transition-all text-left ${activePreset === 'preset-roofbox' ? 'bg-slate-600 text-emerald-400 hover:brightness-110' : 'bg-slate-900 text-slate-300 hover:bg-slate-700 hover:text-slate-100'}`}
 onClick={() => applyPreset('preset-roofbox')}
 >
 <div className="flex items-center gap-3">
 <span className={`material-symbols-outlined text-[20px] ${activePreset === 'preset-roofbox' ? 'text-cyan-400' : 'text-cyan-400'}`}>luggage</span>
 <div className="flex flex-col">
 <span className="font-bold text-lg font-semibold leading-none">Roof Box &amp; Bike Rack</span>
 <span className={`uppercase tracking-widest text-[10px] mt-1 ${activePreset === 'preset-roofbox' ? 'text-slate-300' : 'text-slate-500'}`}>50&deg;F &bull; 75 mph &bull; Frontal Drag</span>
 </div>
 </div>
 <span className={`material-symbols-outlined text-[18px] ${activePreset === 'preset-roofbox' ? 'text-emerald-400' : 'text-slate-500'}`}>
 {activePreset === 'preset-roofbox' ? 'radio_button_checked' : 'radio_button_unchecked'}
 </span>
 </button>

 <button 
 className={`preset-pill group flex items-center justify-between p-4 rounded-xl shadow-sm transition-all text-left ${activePreset === 'preset-summer' ? 'bg-slate-600 text-emerald-400 hover:brightness-110' : 'bg-slate-900 text-slate-300 hover:bg-slate-700 hover:text-slate-100'}`}
 onClick={() => applyPreset('preset-summer')}
 >
 <div className="flex items-center gap-3">
 <span className={`material-symbols-outlined text-[20px] ${activePreset === 'preset-summer' ? 'text-emerald-400' : 'text-emerald-400'}`}>wb_sunny</span>
 <div className="flex flex-col">
 <span className="font-bold text-lg font-semibold leading-none">Mild Summer Commute</span>
 <span className={`uppercase tracking-widest text-[10px] mt-1 ${activePreset === 'preset-summer' ? 'text-slate-300' : 'text-slate-500'}`}>70&deg;F &bull; 65 mph &bull; Optimal Cell</span>
 </div>
 </div>
 <span className={`material-symbols-outlined text-[18px] ${activePreset === 'preset-summer' ? 'text-emerald-400' : 'text-slate-500'}`}>
 {activePreset === 'preset-summer' ? 'radio_button_checked' : 'radio_button_unchecked'}
 </span>
 </button>
 </div>
 </div>

 {/* Two-Column Architecture */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
 
 {/* LEFT COLUMN: Parameter Controls (5 Cols) */}
 <div className="lg:col-span-5 flex flex-col gap-4">
 <div className="p-6 rounded-xl bg-slate-900 shadow-md flex flex-col gap-6">
 <div className="flex items-center justify-between pb-3 border-b border-slate-600">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[22px]">tune</span>
 <h2 className="font-bold text-xl text-slate-100 font-semibold">Environmental Conditions</h2>
 </div>
 <span className="uppercase tracking-widest text-[10px] px-2 py-1 rounded bg-slate-700 text-slate-300 uppercase">Interactive Mode</span>
 </div>

 {/* Slider 1: Ambient Temperature */}
 <div className="flex flex-col gap-2">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-cyan-400 text-[18px]">ac_unit</span>
 <label className="text-sm font-semibold text-slate-100" htmlFor="input-temp">Outside Ambient Temp</label>
 </div>
 <div className="flex items-center gap-2">
 <span className="font-mono text-xs text-cyan-400 font-bold">{tempF}&deg;F ({tempC}&deg;C)</span>
 </div>
 </div>
 
 {/* Frost warning micro pill */}
 {tempF <= 40 && (
 <div className="flex items-center gap-2 p-2 rounded bg-slate-800 px-3 w-full">
 {tempF <= 20 ? (
 <>
 <span className="material-symbols-outlined text-error text-[16px]">warning</span>
 <span className="font-mono text-[11px] text-error">Severe Sub-Zero Pack Chill: High cell internal impedance</span>
 </>
 ) : (
 <>
 <span className="material-symbols-outlined text-cyan-400 text-[16px]">ac_unit</span>
 <span className="font-mono text-[11px] text-cyan-400">Cold Battery State: Regenerative braking limited</span>
 </>
 )}
 </div>
 )}

 <div className="relative flex items-center py-2">
 <input 
 className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-600 accent-secondary focus:outline-none" 
 id="input-temp" max="100" min="-20" step="1" type="range" 
 value={tempF}
 onChange={(e) => {
 setTempF(Number(e.target.value));
 setActivePreset('');
 }}
 />
 </div>
 <div className="flex justify-between font-mono text-[11px] text-slate-500">
 <span>-20&deg;F (-29&deg;C)</span>
 <span>32&deg;F Freezing</span>
 <span>70&deg;F Optimal</span>
 <span>100&deg;F</span>
 </div>
 </div>

 {/* Slider 2: Highway Cruising Speed */}
 <div className="flex flex-col gap-3 pt-2">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[18px]">speed</span>
 <span className="text-sm font-semibold text-slate-100">Highway Cruising Speed</span>
 </div>
 <span className="font-mono text-xs text-emerald-400 font-bold">{speed} mph</span>
 </div>
 
 {/* Segmented Speed Pills */}
 <div className="grid grid-cols-4 gap-2 p-1 rounded-xl bg-slate-800-lowest">
 {[55, 65, 75, 85].map((spd) => (
 <button 
 key={spd}
 className={`py-2 rounded-lg font-mono text-[11px] text-center transition-all ${speed === spd ? 'bg-slate-600 text-emerald-400 font-bold shadow-sm' : 'text-slate-300 hover:text-slate-100'}`}
 onClick={() => {
 setSpeed(spd);
 setActivePreset('');
 }}
 >
 {spd} mph
 </button>
 ))}
 </div>
 <div className="flex items-center gap-2 p-2 rounded bg-slate-800 px-3">
 <span className="material-symbols-outlined text-purple-400 text-[16px]">air</span>
 <span className="font-mono text-[11px] text-slate-300">{speedAeroNote || 'Baseline efficiency'}</span>
 </div>
 </div>

 {/* Radio Selector: Cabin Climate Control Setting */}
 <div className="flex flex-col gap-2 pt-2">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-purple-400 text-[18px]">hvac</span>
 <span className="text-sm font-semibold text-slate-100">Cabin Climate System</span>
 </div>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Thermal Draw</span>
 </div>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors">
 <input 
 checked={climate === 'heatpump'}
 className="mt-1 accent-primary focus:ring-0" 
 name="climate" type="radio" value="heatpump"
 onChange={() => {
 setClimate('heatpump');
 setActivePreset('');
 }}
 />
 <div className="flex flex-col">
 <span className="text-xs font-semibold text-slate-100">Heat Pump Auto</span>
 <span className="uppercase tracking-widest text-[10px] text-emerald-400">High Efficiency COP</span>
 </div>
 </label>
 <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors">
 <input 
 checked={climate === 'resistive'}
 className="mt-1 accent-error focus:ring-0" 
 name="climate" type="radio" value="resistive"
 onChange={() => {
 setClimate('resistive');
 setActivePreset('');
 }}
 />
 <div className="flex flex-col">
 <span className="text-xs font-semibold text-slate-100">Resistive PTC Max</span>
 <span className="uppercase tracking-widest text-[10px] text-error">-18% Range Drain</span>
 </div>
 </label>
 <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors">
 <input 
 checked={climate === 'aceco'}
 className="mt-1 accent-secondary focus:ring-0" 
 name="climate" type="radio" value="aceco"
 onChange={() => {
 setClimate('aceco');
 setActivePreset('');
 }}
 />
 <div className="flex flex-col">
 <span className="text-xs font-semibold text-slate-100">A/C Eco 72&deg;F</span>
 <span className="uppercase tracking-widest text-[10px] text-slate-300">-4% Range Drain</span>
 </div>
 </label>
 <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors">
 <input 
 checked={climate === 'off'}
 className="mt-1 accent-primary focus:ring-0" 
 name="climate" type="radio" value="off"
 onChange={() => {
 setClimate('off');
 setActivePreset('');
 }}
 />
 <div className="flex flex-col">
 <span className="text-xs font-semibold text-slate-100">Seat Warmers Only</span>
 <span className="uppercase tracking-widest text-[10px] text-slate-300">&lt; 0.3 kW Base</span>
 </div>
 </label>
 </div>
 </div>

 {/* Slider 3: Added Payload & Towing Weight */}
 <div className="flex flex-col gap-2 pt-2">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-purple-400-fixed text-[18px]">weight</span>
 <label className="text-sm font-semibold text-slate-100" htmlFor="input-towing">Added Towing &amp; Gear Weight</label>
 </div>
 <span className="font-mono text-xs text-purple-400 font-bold">{towingLbs.toLocaleString()} lbs</span>
 </div>
 <div className="relative flex items-center py-2">
 <input 
 className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-600 accent-tertiary focus:outline-none" 
 id="input-towing" max="7500" min="0" step="100" type="range" 
 value={towingLbs}
 onChange={(e) => {
 setTowingLbs(Number(e.target.value));
 setActivePreset('');
 }}
 />
 </div>
 <div className="flex justify-between font-mono text-[11px] text-slate-500">
 <span>0 lbs (Solo)</span>
 <span>2,500 lbs (Utility)</span>
 <span>4,500 lbs (Boat)</span>
 <span>7,500 lbs (Max)</span>
 </div>
 </div>

 {/* Vehicle Quick Spec Badge Footer */}
 <div className="pt-3 border-t border-slate-600 flex items-center justify-between text-xs text-slate-300">
 <span>Drive Configuration: Dual Motor AWD</span>
 <span className="font-mono text-[11px] text-emerald-400">Cd: 0.23 (Base)</span>
 </div>
 </div>

 {/* Scenario Visual Asset Placeholder */}
 <div className="relative rounded-xl overflow-hidden shadow-lg h-44 group">
 <Image 
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
 alt="A sleek modern electric SUV driving down a snow-swept mountain highway at dusk, subtle neon tail lights glowing emerald and cyan, frosty winter scenery with mountain silhouettes in high contrast obsidian lighting" 
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZF0gtUKfKz9uRc2EimDkfDQ6Z8ndMJky4YXGdg_MhuO2lpnvpAAov3eX1cNTmPy5aDQcGC6YCUYyQuj9T4qGSHUq0cdmtvr7qs70wlfsX9xGfBFUQTe3dDjk3wx-EBQVIGVLZKBz7_Ajz5niTNtCtPJFasdCuictRqPlvekIA2o0cHxniLa64HQ49xaAwMwnTFnZCp4UJbmE7NTVS-g5UAosSWjYnLy7vqHVMtO1ymJ4ggsG2fi1i"
 fill
 referrerPolicy="no-referrer"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface/60 to-transparent flex flex-col justify-end p-4">
 <span className="uppercase tracking-widest text-[10px] uppercase text-emerald-400 font-semibold">Live Simulation Physics</span>
 <p className="text-xs text-slate-100 font-medium leading-tight">Simulated at 4,200 ft elevation with cold wind resistance coefficients.</p>
 </div>
 </div>
 </div>

 {/* RIGHT COLUMN: Dynamic Range & Telemetry Results (7 Cols) */}
 <div className="lg:col-span-7 flex flex-col gap-4">
 
 {/* Primary Telemetry Output Card */}
 <div className="p-6 rounded-xl bg-slate-800 shadow-xl flex flex-col gap-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[24px]">analytics</span>
 <h3 className="font-bold text-xl text-slate-100 font-bold">Projected Usable Range</h3>
 </div>
 <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-error-container text-on-error-container">
 <span className="material-symbols-outlined text-[14px]">trending_down</span>
 <span className="font-mono text-[11px] font-bold">-{totalPenaltyPct}% Range Penalty</span>
 </div>
 </div>
 
 {/* Comparative Range Visual Bar */}
 <div className="flex flex-col gap-4 bg-slate-800-lowest p-6 rounded-xl">
 {/* Factory EPA Benchmark Bar */}
 <div className="flex flex-col gap-1">
 <div className="flex justify-between items-baseline text-xs ">
 <span className="text-slate-300 font-medium flex items-center gap-2">
 <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
 Factory EPA Rated Range (100% Ideal Benchmark)
 </span>
 <span className="font-mono text-xs text-cyan-400 font-bold">310 Miles</span>
 </div>
 <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden p-1">
 <div className="h-full bg-secondary rounded-full shadow-[0_0_12px_rgba(137,206,255,0.4)] transition-all duration-500 w-full"></div>
 </div>
 </div>
 
 {/* Calculated Real World Bar */}
 <div className="flex flex-col gap-1">
 <div className="flex justify-between items-baseline text-xs ">
 <span className="text-slate-100 font-semibold flex items-center gap-2">
 <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
 Calculated Real-World Highway Range
 </span>
 <div className="flex items-center gap-2">
 <span className="font-label-numeric-hero text-purple-400 font-bold leading-none">{remainingRange}</span>
 <span className="font-mono text-xs text-slate-300">Miles</span>
 </div>
 </div>
 <div className="w-full h-5 bg-slate-700 rounded-full overflow-hidden p-1 relative">
 <div className="h-full bg-gradient-to-r from-primary via-tertiary to-error rounded-full transition-all duration-500 shadow-md" style={{ width: `${retainedPct}%` }}></div>
 </div>
 <div className="flex justify-between font-mono text-[11px] text-slate-300 pt-1">
 <span className="text-error flex items-center gap-1">
 <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
 <span>{milesLost} Miles Lost to Aero &amp; Cold</span>
 </span>
 <span className="text-slate-500">{retainedPct}% of EPA Retained</span>
 </div>
 </div>
 </div>

 {/* 4 Key Energy & Trip Multipliers Grid */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {/* Metric 1: Consumption */}
 <div className="p-4 rounded-xl bg-slate-900 flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Consumption</span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-sm font-bold text-slate-100">{whPerMile}</span>
 <span className="font-mono text-[11px] text-slate-500">Wh/mi</span>
 </div>
 <span className="font-mono text-[11px] text-cyan-400-fixed-dim">Base: 242 Wh/mi</span>
 </div>
 {/* Metric 2: Efficiency */}
 <div className="p-4 rounded-xl bg-slate-900 flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Efficiency</span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-sm font-bold text-slate-100">{miPerKwh}</span>
 <span className="font-mono text-[11px] text-slate-500">mi/kWh</span>
 </div>
 <span className="font-mono text-[11px] text-cyan-400-fixed-dim">Base: 4.13 mi/kWh</span>
 </div>
 {/* Metric 3: Drive Time */}
 <div className="p-4 rounded-xl bg-slate-900 flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Pack Leg Time</span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-sm font-bold text-slate-100">{driveHours}</span>
 <span className="font-mono text-[11px] text-slate-500">Hours</span>
 </div>
 <span className="font-mono text-[11px] text-slate-500">@ {speed} mph non-stop</span>
 </div>
 {/* Metric 4: Stop Frequency */}
 <div className="p-4 rounded-xl bg-slate-900 flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Supercharge Rate</span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-sm font-bold text-purple-400">{stopMult}x</span>
 <span className="font-mono text-[11px] text-slate-500">Freq</span>
 </div>
 <span className="font-mono text-[11px] text-purple-400">3 stops vs 2 summer</span>
 </div>
 </div>

 {/* Loss Factor Breakdown Table */}
 <div className="flex flex-col gap-2">
 <div className="flex items-center justify-between">
 <span className="font-bold text-lg font-semibold text-slate-100">Telemetry Loss Factor Attribution</span>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Decomposed Physics</span>
 </div>
 <div className="w-full rounded-xl bg-slate-800-lowest overflow-hidden">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-slate-700/60 uppercase tracking-widest text-[10px] uppercase text-slate-500">
 <th className="py-2 px-4">Factor Vector</th>
 <th className="py-2 px-4 text-right">Penalty Impact</th>
 <th className="py-2 px-4 text-right">Energy Shift</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-surface-container-high text-xs ">
 <tr>
 <td className="py-2 px-4 flex items-center gap-2 text-slate-100">
 <span className="w-2 h-2 rounded-full bg-secondary"></span>
 Thermal Battery Preconditioning &amp; Cell Resistance
 </td>
 <td className="py-2 px-4 text-right font-mono text-[11px] text-error font-semibold">-{thermalLossPct}%</td>
 <td className="py-2 px-4 text-right font-mono text-[11px] text-slate-300">{(baseBatteryCapacity * (thermalLossPct / 100)).toFixed(1)} kWh</td>
 </tr>
 <tr>
 <td className="py-2 px-4 flex items-center gap-2 text-slate-100">
 <span className="w-2 h-2 rounded-full bg-tertiary"></span>
 Cabin Climate Load ({climateName})
 </td>
 <td className="py-2 px-4 text-right font-mono text-[11px] text-error font-semibold">-{climateLossPct}%</td>
 <td className="py-2 px-4 text-right font-mono text-[11px] text-slate-300">{(baseBatteryCapacity * (climateLossPct / 100)).toFixed(1)} kWh</td>
 </tr>
 <tr>
 <td className="py-2 px-4 flex items-center gap-2 text-slate-100">
 <span className="w-2 h-2 rounded-full bg-primary"></span>
 Aerodynamic Highway Drag ({speed} mph vs 55 mph)
 </td>
 <td className="py-2 px-4 text-right font-mono text-[11px] text-error font-semibold">-{aeroLossPct}%</td>
 <td className="py-2 px-4 text-right font-mono text-[11px] text-slate-300">{(baseBatteryCapacity * (aeroLossPct / 100)).toFixed(1)} kWh</td>
 </tr>
 <tr>
 <td className="py-2 px-4 flex items-center gap-2 text-slate-100">
 <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
 Towing Payload Inertia &amp; Extra Turbulence
 </td>
 <td className="py-2 px-4 text-right font-mono text-[11px] text-error font-semibold">-{towingLossPct}%</td>
 <td className="py-2 px-4 text-right font-mono text-[11px] text-slate-300">{(baseBatteryCapacity * (towingLossPct / 100)).toFixed(1)} kWh</td>
 </tr>
 <tr className="bg-slate-700/40 font-semibold">
 <td className="py-3 px-4 text-slate-100">Total Cumulative Highway Penalty</td>
 <td className="py-3 px-4 text-right font-mono text-[11px] text-error font-bold">-{totalPenaltyPct}%</td>
 <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-100 font-bold">{totalKwhDrawn.toFixed(1)} kWh</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* Actionable Cold Weather Pro-Tip Card */}
 <div className="p-4 rounded-xl bg-slate-700 flex items-start gap-4">
 <div className="w-10 h-10 rounded-lg bg-tertiary-container/30 flex items-center justify-center shrink-0 text-purple-400 mt-0.5">
 <span className="material-symbols-outlined text-[20px]">lightbulb</span>
 </div>
 <div className="flex flex-col gap-1">
 <span className="font-bold text-lg font-bold text-slate-100">Cold Weather In-Flight Pro-Tip</span>
 <p className="text-xs text-slate-300 leading-relaxed">
 Route with the in-car Navigation at least <strong>45 minutes prior to Supercharging</strong> so the vehicle automatically preheats the battery pack using heat scavenged directly from the electric drive units. Cold cells accept less than 60 kW until pack temperatures hit 86&deg;F (30&deg;C).
 </p>
 </div>
 </div>
 </div>

 {/* Secondary Visual Component: Cold Supercharging Speed degradation */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="p-4 rounded-xl bg-slate-900 flex items-center gap-4">
 <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
 <span className="material-symbols-outlined text-[22px]">ev_charger</span>
 </div>
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Cold Battery Charge Penalty</span>
 <span className="font-bold text-lg text-slate-100 font-semibold">+19 min to 80% SOC</span>
 <span className="text-xs text-slate-300">Without automated preconditioning</span>
 </div>
 </div>
 <div className="p-4 rounded-xl bg-slate-900 flex items-center gap-4">
 <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-emerald-400 shrink-0">
 <span className="material-symbols-outlined text-[22px]">nest_heat_link_gen_3</span>
 </div>
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Scheduled Departure</span>
 <span className="font-bold text-lg text-slate-100 font-semibold">+12% Range Recovered</span>
 <span className="text-xs text-slate-300">When preconditioned on grid power</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
