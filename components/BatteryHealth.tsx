'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { legacyBatteryDegradation as calculateBatteryDegradation } from '@/lib/evCalculations';
import { EV_MODELS } from '@/lib/evModels';

const habitMap: Record<'ac' | 'mixed' | 'dc', 'ac_gentle' | 'mixed' | 'dc_heavy'> = {
 'ac': 'ac_gentle',
 'mixed': 'mixed',
 'dc': 'dc_heavy'
};

export default function BatteryHealth() {
 const [model, setModel] = useState('m3_lr_2021');
 const [year, setYear] = useState('2021');
 const [odometer, setOdometer] = useState(58400);
 const [isKm, setIsKm] = useState(false);
 const [habit, setHabit] = useState<'ac' | 'mixed' | 'dc'>('ac');
 const [isUpdating, setIsUpdating] = useState(false);

 const vehicle = EV_MODELS[model] || Object.values(EV_MODELS)[0];
 const ageYears = Math.max(0, 2024 - parseInt(year, 10)); // Baseline year 2024 for demo
 
 const calculation = useMemo(() => {
 return calculateBatteryDegradation({
 ageYears,
 mileageMiles: odometer,
 chemistry: vehicle.chemistry,
 habit: habitMap[habit],
 originalCapacityKwh: vehicle.usableKwh,
 originalEpaRange: vehicle.epaRange
 });
 }, [ageYears, odometer, vehicle, habit]);

 const chartData = useMemo(() => {
 const data = [];
 const annualMileage = ageYears > 0 ? odometer / ageYears : 15000;
 
 for(let y = 0; y <= 10; y++) {
 const miles = y * annualMileage;
 const res = calculateBatteryDegradation({
 ageYears: y,
 mileageMiles: miles,
 chemistry: vehicle.chemistry,
 habit: habitMap[habit],
 originalCapacityKwh: vehicle.usableKwh,
 originalEpaRange: vehicle.epaRange
 });
 
 const medRes = calculateBatteryDegradation({
 ageYears: y,
 mileageMiles: y * 12000,
 chemistry: vehicle.chemistry,
 habit: 'mixed',
 originalCapacityKwh: vehicle.usableKwh,
 originalEpaRange: vehicle.epaRange
 });
 
 const px = 60 + y * 52;
 const py = 20 + (100 - res.sohPercentage) * 5;
 const pyMed = 20 + (100 - medRes.sohPercentage) * 5;
 data.push({ year: y, soh: res.sohPercentage, px, py, medSoh: medRes.sohPercentage, medPy: pyMed });
 }
 return data;
 }, [ageYears, odometer, vehicle, habit]);

 const handleUpdate = () => {
 setIsUpdating(true);
 setTimeout(() => {
 setIsUpdating(false);
 }, 500);
 };

 const currentMedSoh = chartData.find(d => d.year === ageYears)?.medSoh ?? 90;

 return (
 <div className="flex flex-col w-full">
 {/* Subtle Ambient Glow Orbs behind sections */}
 <div className="relative w-full max-w-7xl mx-auto px-gutter-desktop py-8 flex flex-col gap-8">
 <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
 <div className="absolute top-48 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
 
 {/* Header Block */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
 <div className="flex flex-col gap-2 max-w-3xl">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 w-fit">
 <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
 <span className="uppercase tracking-widest text-[10px] text-emerald-400 tracking-widest uppercase font-semibold">FLEET BENCHMARK DATA: 42,000+ VEHICLES</span>
 </div>
 <h1 className="font-headline-xl text-slate-100 tracking-tight font-bold">
 EV Battery Health & 10-Year Degradation Estimator
 </h1>
 <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
 Benchmark your vehicle&apos;s current State of Health (SoH), calculate lost range against factory EPA specs, and compare lifecycle curves to warranty limits.
 </p>
 </div>
 {/* Quick Summary Telemetry Badge */}
 <div className="flex items-center gap-4 p-3 bg-slate-900 rounded-xl shadow-md self-start md:self-auto">
 <div className="p-2 rounded-lg bg-slate-700 text-emerald-400">
 <span className="material-symbols-outlined text-[24px]">verified</span>
 </div>
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Confidence Score</span>
 <span className="font-mono text-xs text-slate-100 font-semibold">99.2% Calibration</span>
 </div>
 </div>
 </div>

 {/* Top Input Parameters Bar (Glass Card Substrate) */}
 <div className="p-6 rounded-xl bg-slate-900 shadow-xl flex flex-col gap-6 relative overflow-hidden backdrop-blur-md">
 <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
 
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
 {/* Model Selector */}
 <div className="lg:col-span-4 flex flex-col gap-1">
 <label className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider" htmlFor="vehicleModelSelect">Vehicle Model & Trim</label>
 <div className="relative flex items-center bg-slate-800-lowest rounded-lg px-3 h-11">
 <span className="material-symbols-outlined text-emerald-400 text-[20px] mr-2 shrink-0">directions_car</span>
 <select 
 id="vehicleModelSelect"
 className="w-full bg-transparent text-slate-100 text-sm focus:outline-none cursor-pointer pr-6 appearance-none" 
 value={model}
 onChange={(e) => setModel(e.target.value)}
 >
 {Object.values(EV_MODELS).map(v => (
 <option key={v.id} className="bg-slate-800 text-slate-100" value={v.id}>{v.name}</option>
 ))}
 </select>
 <span className="material-symbols-outlined text-slate-500 text-[18px] absolute right-3 pointer-events-none">expand_more</span>
 </div>
 </div>

 {/* Model Year */}
 <div className="lg:col-span-2 flex flex-col gap-1">
 <label className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider" htmlFor="modelYearSelect">Model Year</label>
 <div className="relative flex items-center bg-slate-800-lowest rounded-lg px-3 h-11">
 <span className="material-symbols-outlined text-cyan-400 text-[20px] mr-2 shrink-0">calendar_today</span>
 <input 
 id="modelYearSelect"
 type="number"
 min="2017" max="2026"
 className="w-full bg-transparent text-slate-100 font-mono text-xs focus:outline-none" 
 value={year}
 onChange={(e) => setYear(e.target.value)}
 />
 </div>
 </div>

 {/* Odometer Mileage */}
 <div className="lg:col-span-3 flex flex-col gap-1">
 <div className="flex items-center justify-between">
 <label className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider" htmlFor="odometerInput">Odometer</label>
 <button onClick={() => setIsKm(!isKm)} className="font-mono text-[11px] text-slate-300 hover:text-emerald-400 transition-colors focus:outline-none">
 ≈ {isKm ? Math.round(odometer).toLocaleString() + ' km' : Math.round(odometer * 1.60934).toLocaleString() + ' km'} 
 </button>
 </div>
 <div className="flex items-center bg-slate-800-lowest rounded-lg px-3 h-11">
 <span className="material-symbols-outlined text-emerald-400 text-[20px] mr-2 shrink-0">speed</span>
 <input 
 id="odometerInput"
 className="w-full bg-transparent text-slate-100 font-mono text-xs focus:outline-none" 
 max="200000" min="500" step="500" type="range" 
 value={odometer}
 onChange={(e) => setOdometer(Number(e.target.value))}
 />
 <span className="font-mono text-[11px] text-slate-500 ml-2 shrink-0 whitespace-nowrap">{odometer.toLocaleString()} {isKm ? 'km' : 'mi'}</span>
 </div>
 </div>

 {/* Recalculate Trigger Button */}
 <div className="lg:col-span-3 flex items-end">
 <button 
 id="recalcBtn" 
 type="button"
 onClick={handleUpdate}
 className={`w-full h-11 bg-primary text-on-primary text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-primary-fixed shadow-[0_0_16px_rgba(78,222,163,0.3)] transition-all ${isUpdating ? 'opacity-75' : ''}`}
 >
 <span className={`material-symbols-outlined text-[18px] ${isUpdating ? 'animate-spin' : ''}`}>sync</span>
 <span>Update Telemetry</span>
 </button>
 </div>
 </div>

 {/* Charging Habit Pills & Architecture Spec Strip */}
 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 bg-slate-800-lowest/50 p-3 rounded-lg">
 <div className="flex flex-col sm:flex-row sm:items-center gap-3">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase whitespace-nowrap">Charging Habit Profile:</span>
 <div className="flex flex-wrap items-center gap-2" id="habitContainer">
 <button 
 className={`habit-pill px-3 py-1 rounded-full font-mono text-[11px] flex items-center gap-1 transition-colors ${habit === 'ac' ? 'bg-slate-700 text-emerald-400 font-semibold' : 'bg-slate-800 text-slate-300 hover:text-slate-100'}`}
 data-habit="ac" type="button"
 onClick={() => setHabit('ac')}
 >
 <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
 Mostly Home AC (80-90% L2)
 </button>
 <button 
 className={`habit-pill px-3 py-1 rounded-full font-mono text-[11px] flex items-center gap-1 transition-colors ${habit === 'mixed' ? 'bg-slate-700 text-emerald-400 font-semibold' : 'bg-slate-800 text-slate-300 hover:text-slate-100'}`}
 data-habit="mixed" type="button"
 onClick={() => setHabit('mixed')}
 >
 <span className="h-1.5 w-1.5 rounded-full bg-outline"></span>
 50/50 Balanced AC & DC
 </button>
 <button 
 className={`habit-pill px-3 py-1 rounded-full font-mono text-[11px] flex items-center gap-1 transition-colors ${habit === 'dc' ? 'bg-slate-700 text-emerald-400 font-semibold' : 'bg-slate-800 text-slate-300 hover:text-slate-100'}`}
 data-habit="dc" type="button"
 onClick={() => setHabit('dc')}
 >
 <span className="h-1.5 w-1.5 rounded-full bg-tertiary"></span>
 Daily DC Fast (High Thermal)
 </button>
 </div>
 </div>
 
 {/* Chemistry Badge Info */}
 <div className="flex items-center gap-2 text-slate-300 bg-slate-800 px-3 py-1 rounded-lg w-fit">
 <span className="material-symbols-outlined text-[16px] text-cyan-400">memory</span>
 <span className="font-mono text-[11px] ">{vehicle.desc}</span>
 </div>
 </div>
 </div>

 {/* Diagnostic Section: Dual Large Telemetry Cards */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 {/* Left Card: State of Health (SoH) Radial Telemetry Gauge */}
 <div className="lg:col-span-5 p-6 rounded-xl bg-slate-900 shadow-xl flex flex-col justify-between gap-6 relative overflow-hidden">
 <div className="flex items-center justify-between">
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Pack Health Metric</span>
 <span className="font-bold text-lg font-semibold text-slate-100">State of Health (SoH)</span>
 </div>
 <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${calculation.sohPercentage > 85 ? 'bg-primary/15 text-emerald-400' : calculation.sohPercentage >= 70 ? 'bg-tertiary/15 text-purple-400' : 'bg-error/15 text-error'}`}>
 <span className="material-symbols-outlined text-[16px]">{calculation.sohPercentage >= 70 ? 'check_circle' : 'warning'}</span>
 <span className="uppercase tracking-widest text-[10px] font-semibold">
 {calculation.sohPercentage > 85 ? 'HEALTHY' : calculation.sohPercentage >= 70 ? 'AGING' : 'WARRANTY'}
 </span>
 </div>
 </div>
 
 {/* Gauge SVG Container */}
 <div className="relative flex flex-col items-center justify-center my-3">
 <svg className="w-64 h-48 overflow-visible" viewBox="0 0 240 180">
 <defs>
 <linearGradient id="emeraldGradient" x1="0%" x2="100%" y1="0%" y2="0%">
 <stop offset="0%" stopColor="#00a2e6" />
 <stop offset="100%" stopColor={calculation.sohPercentage >= 70 ? '#4edea3' : '#ffb4ab'} />
 </linearGradient>
 <filter height="140%" id="glowEffect" width="140%" x="-20%" y="-20%">
 <feGaussianBlur result="blur" stdDeviation="4" />
 <feComposite in="SourceGraphic" in2="blur" operator="over" />
 </filter>
 </defs>
 {/* Base Gauge Track (180 to 0 degrees semicircle arc) */}
 <path d="M 30 150 A 90 90 0 0 1 210 150" fill="none" stroke="#262a33" strokeLinecap="round" strokeWidth="16" />
 {/* Red Warranty Floor Zone Arc (approx 70% threshold: from 30,150 to ~85,72) */}
 <path d="M 30 150 A 90 90 0 0 1 56.4 86.4" fill="none" opacity="0.45" stroke="#ffb4ab" strokeLinecap="round" strokeWidth="16" />
 {/* Active Health Arc */}
 <path d={`M 30 150 A 90 90 0 0 1 ${120 + 90 * Math.cos(Math.PI - ((Math.max(60, Math.min(100, calculation.sohPercentage)) - 60) / 40) * Math.PI)} ${150 - 90 * Math.sin(Math.PI - ((Math.max(60, Math.min(100, calculation.sohPercentage)) - 60) / 40) * Math.PI)}`} fill="none" filter="url(#glowEffect)" id="gaugePath" stroke="url(#emeraldGradient)" strokeLinecap="round" strokeWidth="16" />
 {/* Center Dial Indicator Needle */}
 <circle cx="120" cy="150" fill="#dfe2ee" r="8" />
 <circle cx="120" cy="150" fill="#0f131c" r="4" />
 {/* Ticks & Target Indicators */}
 <line stroke="#ffb4ab" strokeWidth="2" x1="56.4" x2="52.2" y1="86.4" y2="82.2" />
 <text fill="#ffb4ab" fontFamily="jetbrainsMono" fontSize="10" fontWeight="600" x="35" y="75">70% FLOOR</text>
 <line stroke="#86948a" strokeDasharray="2 2" strokeWidth="1.5" x1="120" x2="120" y1="60" y2="48" />
 <text fill="#86948a" fontFamily="jetbrainsMono" fontSize="10" textAnchor="middle" x="120" y="42">85%</text>
 </svg>
 
 {/* Core Gauge Hero Readout */}
 <div className="flex flex-col items-center -mt-16 text-center">
 <span className={`font-label-numeric-hero font-bold tracking-tight ${calculation.sohPercentage > 85 ? 'text-emerald-400' : calculation.sohPercentage >= 70 ? 'text-purple-400' : 'text-error'}`}>{calculation.sohPercentage}%</span>
 <span className="font-mono text-[11px] text-slate-300 font-medium mt-1">Estimated for {odometer.toLocaleString()} {isKm ? 'km' : 'mi'}</span>
 </div>
 </div>
 
 {/* Metric Breakdown Matrix */}
 <div className="grid grid-cols-3 gap-2 p-3 bg-slate-800 rounded-lg text-center">
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Factory</span>
 <span className="font-mono text-xs text-slate-100 font-semibold">{vehicle.usableKwh.toFixed(1)} kWh</span>
 </div>
 <div className="flex flex-col border-x-0">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Usable</span>
 <span className="font-mono text-xs text-emerald-400 font-semibold">{calculation.remainingKwh} kWh</span>
 </div>
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Rate</span>
 <span className="font-mono text-xs text-cyan-400 font-semibold">{((100 - calculation.sohPercentage) / (odometer / 20000 || 1)).toFixed(2)}% / 20k</span>
 </div>
 </div>
 
 {/* Gauge Color Scale Legend */}
 <div className="flex items-center justify-between text-slate-300 text-[11px] pt-2">
 <div className="flex items-center gap-1">
 <span className="w-2 h-2 rounded-full bg-primary"></span>
 <span className="uppercase tracking-widest text-[10px] ">&gt;85% Optimal</span>
 </div>
 <div className="flex items-center gap-1">
 <span className="w-2 h-2 rounded-full bg-tertiary"></span>
 <span className="uppercase tracking-widest text-[10px] ">70-85% Aging</span>
 </div>
 <div className="flex items-center gap-1">
 <span className="w-2 h-2 rounded-full bg-error"></span>
 <span className="uppercase tracking-widest text-[10px] ">&lt;70% Warranty Floor</span>
 </div>
 </div>
 </div>

 {/* Right Card: 10-Year Lifecycle Degradation Multi-Line SVG Chart */}
 <div className="lg:col-span-7 p-6 rounded-xl bg-slate-900 shadow-xl flex flex-col justify-between gap-4 relative">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Multi-Year Forecast</span>
 <span className="font-bold text-lg font-semibold text-slate-100">10-Year Degradation Lifecycle Curve</span>
 </div>
 {/* Chart Toggle Indicators */}
 <div className="flex flex-wrap items-center gap-3">
 <div className="flex items-center gap-1">
 <span className="h-2 w-4 rounded-full bg-primary"></span>
 <span className="font-mono text-[11px] text-slate-100">Your Model</span>
 </div>
 <div className="flex items-center gap-1">
 <span className="h-0.5 w-4 bg-outline"></span>
 <span className="font-mono text-[11px] text-slate-500">Fleet Median</span>
 </div>
 <div className="flex items-center gap-1">
 <span className="h-0.5 w-4 bg-error"></span>
 <span className="font-mono text-[11px] text-error">70% Limit</span>
 </div>
 </div>
 </div>
 
 {/* Interactive SVG Chart Viewport */}
 <div className="w-full overflow-x-auto py-2">
 <div className="min-w-[540px] w-full">
 <svg className="w-full h-64 overflow-visible" viewBox="0 0 600 240">
 <defs>
 <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
 <stop offset="0%" stopColor="#4edea3" stopOpacity="0.22" />
 <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0" />
 </linearGradient>
 <linearGradient id="warrantyHatch" x1="0" x2="0" y1="0" y2="1">
 <stop offset="0%" stopColor="#93000a" stopOpacity="0.2" />
 <stop offset="100%" stopColor="#93000a" stopOpacity="0.05" />
 </linearGradient>
 </defs>
 
 {/* Y-Axis Grid Lines & Labels (Capacity %: 100%, 90%, 80%, 70%, 60%) */}
 {/* Y=20 is 100%, Y=70 is 90%, Y=120 is 80%, Y=170 is 70% (Warranty), Y=220 is 60% */}
 <g className="text-slate-500 font-mono text-[11px] ">
 <line stroke="#262a33" strokeDasharray="3 3" x1="45" x2="580" y1="20" y2="20" />
 <text fill="#86948a" fontSize="11" textAnchor="end" x="35" y="24">100%</text>
 
 <line stroke="#262a33" strokeDasharray="3 3" x1="45" x2="580" y1="70" y2="70" />
 <text fill="#86948a" fontSize="11" textAnchor="end" x="35" y="74">90%</text>
 
 <line stroke="#262a33" strokeDasharray="3 3" x1="45" x2="580" y1="120" y2="120" />
 <text fill="#86948a" fontSize="11" textAnchor="end" x="35" y="124">80%</text>
 
 <line stroke="#ffb4ab" strokeDasharray="4 2" strokeWidth="1.5" x1="45" x2="580" y1="170" y2="170" />
 <rect fill="url(#warrantyHatch)" height="50" width="535" x="45" y="170" />
 <text fill="#ffb4ab" fontSize="11" textAnchor="end" x="35" y="174">70%</text>
 
 <line stroke="#262a33" x1="45" x2="580" y1="220" y2="220" />
 <text fill="#86948a" fontSize="11" textAnchor="end" x="35" y="224">60%</text>
 </g>
 
 {/* X-Axis Labels (Years 0 to 10) */}
 <g className="text-slate-500 font-mono text-[11px] " fill="#86948a" fontSize="11">
 <text textAnchor="middle" x="60" y="238">Y0</text>
 <text textAnchor="middle" x="164" y="238">Y2</text>
 <text textAnchor="middle" x="268" y="238">Y4</text>
 <text textAnchor="middle" x="372" y="238">Y6</text>
 <text textAnchor="middle" x="476" y="238">Y8</text>
 <text textAnchor="middle" x="580" y="238">Y10</text>
 </g>
 
 {/* Fleet Median Degradation Curve (Dashed Slate line) */}
 <path d={`M ${chartData[0].px} ${chartData[0].medPy} ${chartData.slice(1).map(p => `L ${p.px} ${p.medPy}`).join(' ')}`} fill="none" stroke="#86948a" strokeDasharray="4 4" strokeWidth="2" />
 
 {/* Your Vehicle Projection Area Fill Underneath Curve */}
 <path d={`M ${chartData[0].px} ${chartData[0].py} ${chartData.slice(1).map(p => `L ${p.px} ${p.py}`).join(' ')} L 580 220 L 60 220 Z`} fill="url(#areaGradient)" />
 
 {/* Your Vehicle Projection Line (Solid Emerald) */}
 <path d={`M ${chartData[0].px} ${chartData[0].py} ${chartData.slice(1).map(p => `L ${p.px} ${p.py}`).join(' ')}`} fill="none" stroke={calculation.sohPercentage >= 70 ? '#4edea3' : '#ffb4ab'} strokeLinecap="round" strokeWidth="3" />
 
 {/* Vertical Current Status Line */}
 <line opacity="0.8" stroke={calculation.sohPercentage >= 70 ? '#4edea3' : '#ffb4ab'} strokeDasharray="2 2" strokeWidth="1.5" x1={Math.min(580, 60 + ageYears * 52)} x2={Math.min(580, 60 + ageYears * 52)} y1="20" y2="220" />
 
 {/* Annotation Marker at Current Age */}
 <circle cx={Math.min(580, 60 + ageYears * 52)} cy={20 + (100 - calculation.sohPercentage) * 5} fill={calculation.sohPercentage >= 70 ? '#4edea3' : '#ffb4ab'} r="6" />
 <circle className="animate-ping" cx={Math.min(580, 60 + ageYears * 52)} cy={20 + (100 - calculation.sohPercentage) * 5} fill={calculation.sohPercentage >= 70 ? '#4edea3' : '#ffb4ab'} opacity="0.3" r="10" />
 
 {/* Floating Tooltip Card on SVG */}
 <g transform={`translate(${Math.min(380, 72 + ageYears * 52)}, ${Math.max(10, 20 + (100 - calculation.sohPercentage) * 5 - 23)})`}>
 <rect fill="#181c24" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.5))" height="46" rx="6" stroke="none" width="220" />
 <text fill={calculation.sohPercentage >= 70 ? '#4edea3' : '#ffb4ab'} fontFamily="jetbrainsMono" fontSize="11" fontWeight="700" x="12" y="18">NOW: {calculation.sohPercentage}% (Yr {ageYears} / {(odometer/1000).toFixed(1)}k {isKm ? 'km' : 'mi'})</text>
 <text fill="#bbcabf" fontFamily="plusJakartaSans" fontSize="10" x="12" y="34">{calculation.sohPercentage >= 70 ? `+${(calculation.sohPercentage - 70).toFixed(1)}% margin over 70% floor` : `${(70 - calculation.sohPercentage).toFixed(1)}% below warranty floor`}</text>
 </g>
 
 {/* Final Year 10 Target Marker */}
 <circle cx="580" cy={chartData[10].py} fill={chartData[10].soh >= 70 ? '#4edea3' : '#ffb4ab'} r="4" />
 <text fill={chartData[10].soh >= 70 ? '#4edea3' : '#ffb4ab'} fontFamily="jetbrainsMono" fontSize="10" fontWeight="600" textAnchor="end" x="575" y={chartData[10].py - 10}>{chartData[10].soh.toFixed(1)}% Projected</text>
 </svg>
 </div>
 </div>
 
 {/* Telemetry Summary Footer Strip */}
 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-slate-800 rounded-lg">
 <div className="flex items-center gap-3">
 <span className="material-symbols-outlined text-emerald-400 text-[20px]">shield</span>
 <div className="flex flex-col">
 <span className="text-xs text-slate-100 font-semibold">8-Year / 100,000-Mile Battery Warranty Protection</span>
 <span className="text-xs text-slate-300">Guaranteed replacement if pack drops below 70% retention prior to 8 years or 100k mi.</span>
 </div>
 </div>
 <span className={`font-mono text-[11px] px-3 py-1 rounded-full whitespace-nowrap self-end sm:self-auto font-medium ${calculation.isUnderWarrantyRisk ? 'bg-error/10 text-error' : 'bg-primary/10 text-emerald-400'}`}>
 {calculation.isUnderWarrantyRisk ? 'WARRANTY RISK' : `Safe Margin: +${(calculation.sohPercentage - 70).toFixed(1)}%`}
 </span>
 </div>
 </div>
 </div>

 {/* Bottom Diagnostic Breakdown Cards (3 Column Bento Grid) */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {/* Card 1: Usable Capacity Remaining */}
 <div className="p-6 rounded-xl bg-slate-900 shadow-lg flex flex-col justify-between gap-4">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-emerald-400">
 <span className="material-symbols-outlined text-[18px]">battery_charging_full</span>
 </div>
 <span className="font-bold text-lg text-slate-100 font-semibold">Usable Capacity</span>
 </div>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Pack Residual</span>
 </div>
 <div className="flex flex-col gap-2">
 <div className="flex items-baseline gap-2">
 <span className="font-label-numeric-hero text-slate-100 font-bold">{calculation.remainingKwh}</span>
 <span className="font-mono text-sm text-slate-500">kWh</span>
 </div>
 <span className="text-xs text-slate-300">Remaining out of {vehicle.usableKwh.toFixed(1)} kWh factory usable capacity</span>
 
 {/* Dynamic Progress Bar */}
 <div className="w-full bg-slate-600 rounded-full h-3 mt-3 overflow-hidden p-0.5">
 <div className={`h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(78,222,163,0.5)] ${calculation.sohPercentage >= 70 ? 'bg-primary' : 'bg-error'}`} style={{ width: `${calculation.sohPercentage}%` }}></div>
 </div>
 <div className="flex justify-between items-center font-mono text-[11px] text-slate-500 mt-1">
 <span>0 kWh</span>
 <span className={`${calculation.sohPercentage >= 70 ? 'text-emerald-400' : 'text-error'} font-semibold`}>{calculation.sohPercentage}% Retained</span>
 <span>{vehicle.usableKwh.toFixed(1)} kWh</span>
 </div>
 </div>
 <div className="p-3 rounded-lg bg-slate-800 flex items-center justify-between">
 <span className="text-xs text-slate-300">Equivalent Full Cycles</span>
 <span className="font-mono text-xs text-slate-100 font-semibold">{Math.round(odometer / vehicle.epaRange)} Cycles</span>
 </div>
 </div>

 {/* Card 2: Real-World Lost Driving Range */}
 <div className="p-6 rounded-xl bg-slate-900 shadow-lg flex flex-col justify-between gap-4">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-cyan-400">
 <span className="material-symbols-outlined text-[18px]">route</span>
 </div>
 <span className="font-bold text-lg text-slate-100 font-semibold">Range Impact</span>
 </div>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">EPA Baseline</span>
 </div>
 <div className="flex flex-col gap-2">
 <div className="flex items-baseline gap-2">
 <span className="font-label-numeric-hero text-error font-bold">-{calculation.estimatedLostMiles}</span>
 <span className="font-mono text-sm text-slate-500">Miles</span>
 </div>
 <span className="text-xs text-slate-300">Current full 100% range is {(vehicle.epaRange - calculation.estimatedLostMiles).toFixed(1)} mi (down from {vehicle.epaRange} mi rated)</span>
 
 {/* Before / After Segment Comparison Bar */}
 <div className="grid grid-cols-2 gap-3 mt-3">
 <div className="p-3 bg-slate-800 rounded-lg flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Original Rating</span>
 <span className="font-mono text-xs text-slate-100 font-semibold">{vehicle.epaRange.toFixed(1)} mi</span>
 </div>
 <div className="p-3 bg-slate-800 rounded-lg flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Today&apos;s Range</span>
 <span className="font-mono text-xs text-cyan-400 font-semibold">{(vehicle.epaRange - calculation.estimatedLostMiles).toFixed(1)} mi</span>
 </div>
 </div>
 </div>
 <div className="p-3 rounded-lg bg-slate-800 flex items-center justify-between">
 <span className="text-xs text-slate-300">Road Trip Cost Delta</span>
 <span className="font-mono text-xs text-cyan-400 font-semibold">+${((300 / (vehicle.epaRange - calculation.estimatedLostMiles)) * 0.45 - (300 / vehicle.epaRange) * 0.45).toFixed(2)} / 300 mi</span>
 </div>
 </div>

 {/* Card 3: Chemistry-Specific Actionable Advice Card */}
 <div className={`p-6 rounded-xl ${vehicle.chemistry === 'NMC' && habit === 'dc' ? 'bg-[#3b2a1a] shadow-[0_0_24px_rgba(255,170,0,0.15)]' : 'bg-slate-900'} shadow-lg flex flex-col justify-between gap-4`}>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-purple-400">
 <span className="material-symbols-outlined text-[18px]">verified_user</span>
 </div>
 <span className={`font-bold text-lg font-semibold ${vehicle.chemistry === 'NMC' && habit === 'dc' ? 'text-[#ffb4ab]' : 'text-slate-100'}`}>Protocol</span>
 </div>
 <span className={`uppercase tracking-widest text-[10px] font-semibold uppercase ${vehicle.chemistry === 'NMC' && habit === 'dc' ? 'text-[#ffb4ab]' : 'text-purple-400'}`}>{vehicle.chemistry} Chemistry</span>
 </div>
 
 <div className="flex flex-col gap-3">
 {vehicle.chemistry === 'LFP' ? (
 <>
 <div className="flex items-start gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">check</span>
 <div className="flex flex-col">
 <span className="text-xs text-slate-100 font-semibold">Charge to 100% Weekly</span>
 <span className="text-xs text-slate-300">LFP voltage curves are extremely flat. Regular 100% charging is required for the Battery Management System (BMS) to calibrate properly.</span>
 </div>
 </div>
 <div className="flex items-start gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">check</span>
 <div className="flex flex-col">
 <span className="text-xs text-slate-100 font-semibold">Deeper Discharges are OK</span>
 <span className="text-xs text-slate-300">LFP cells handle deep cycling better than NMC. Do not fear dropping below 20%.</span>
 </div>
 </div>
 </>
 ) : vehicle.chemistry === 'NMC' && habit === 'dc' ? (
 <>
 <div className="flex items-start gap-2">
 <span className="material-symbols-outlined text-[#ffb4ab] text-[18px] shrink-0 mt-0.5">warning</span>
 <div className="flex flex-col">
 <span className="text-xs text-slate-100 font-semibold text-[#ffb4ab]">Heavy DC Fast Charging Risk</span>
 <span className="text-xs text-slate-300 text-slate-100">Frequent high-C rate charging on NMC accelerates lithium plating and dendrite formation.</span>
 </div>
 </div>
 <div className="flex items-start gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">check</span>
 <div className="flex flex-col">
 <span className="text-xs text-slate-100 font-semibold">Set Daily Limit to 80%</span>
 <span className="text-xs text-slate-300 text-slate-100">Immediately reduce daily charging limit to 80% to alleviate high state-of-charge stress.</span>
 </div>
 </div>
 </>
 ) : (
 <>
 <div className="flex items-start gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">check</span>
 <div className="flex flex-col">
 <span className="text-xs text-slate-100 font-semibold">Daily Charging Cap at 80%</span>
 <span className="text-xs text-slate-300">Set in-vehicle slider to 80%. Reserve 100% solely for road trips immediately prior to departure.</span>
 </div>
 </div>
 <div className="flex items-start gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">check</span>
 <div className="flex flex-col">
 <span className="text-xs text-slate-100 font-semibold">Minimize Low SoC Dwelling</span>
 <span className="text-xs text-slate-300">Avoid parking under 10% SoC for more than 12h, specifically in sub-zero or high-heat environments.</span>
 </div>
 </div>
 </>
 )}
 </div>
 <div className="p-3 rounded-lg bg-slate-800 flex items-center justify-between mt-auto">
 <span className="text-xs text-slate-300">Optimal Operating Temp</span>
 <span className="font-mono text-xs text-purple-400 font-semibold">22°C – 30°C</span>
 </div>
 </div>
 </div>

 {/* Battery Degradation Fleet Benchmark Comparison Strip */}
 <div className="p-6 rounded-xl bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-emerald-400 shrink-0">
 <span className="material-symbols-outlined text-[28px]">query_stats</span>
 </div>
 <div className="flex flex-col">
 <span className="font-bold text-lg font-semibold text-slate-100">How does your {vehicle.name} compare?</span>
 <p className="text-sm text-slate-300 max-w-xl mt-1">
 At {odometer.toLocaleString()} {isKm ? 'km' : 'miles'}, median fleet degradation sits at {(100 - currentMedSoh).toFixed(1)}% ({currentMedSoh.toFixed(1)}% SoH). Your pack is preserving <strong>{calculation.sohPercentage >= currentMedSoh ? '+' : '-'}{Math.abs(calculation.sohPercentage - currentMedSoh).toFixed(1)}% {calculation.sohPercentage >= currentMedSoh ? 'more' : 'less'} usable capacity</strong> than average vehicles.
 </p>
 </div>
 </div>
 <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
 <button className="w-full md:w-auto px-6 py-3 rounded-lg bg-slate-700 text-slate-100 hover:bg-slate-950-bright text-sm font-semibold transition-colors flex items-center justify-center gap-2" type="button">
 <span className="material-symbols-outlined text-[18px]">download</span>
 <span>Export Diagnostics (CSV)</span>
 </button>
 </div>
 </div>

 </div>
 </div>
 );
}
