'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function CompareVehicles() {
 const [crosshairSoc, setCrosshairSoc] = useState(45);
 const [targetSoc, setTargetSoc] = useState(80);
 const [copied, setCopied] = useState(false);
 const chartRef = useRef<SVGSVGElement>(null);

 const getPowerTeslaModelY = (soc: number) => {
 if (soc < 10) return 180 + soc * 7;
 if (soc <= 15) return 250;
 if (soc <= 30) return 250 - (soc - 15) * 4.5;
 if (soc <= 50) return 182 - (soc - 30) * 3.8;
 if (soc <= 70) return 106 - (soc - 50) * 2.5;
 if (soc <= 85) return 56 - (soc - 70) * 2.2;
 return Math.max(12, 23 - (soc - 85) * 0.7);
 };

 const getPowerHyundaiIoniq5 = (soc: number) => {
 if (soc < 10) return 150 + soc * 8;
 if (soc <= 55) return 228 + (soc % 3);
 if (soc <= 60) return 220 - (soc - 55) * 9;
 if (soc <= 75) return 175 - (soc - 60) * 2.5;
 if (soc <= 82) return 137 - (soc - 75) * 13;
 return Math.max(15, 45 - (soc - 82) * 1.5);
 };

 const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
 if (!chartRef.current) return;
 const rect = chartRef.current.getBoundingClientRect();
 const clientX = e.clientX - rect.left;
 const relativeRatio = clientX / rect.width;
 const graphMin = 60 / 1000;
 const graphMax = 960 / 1000;
 const graphRatio = (relativeRatio - graphMin) / (graphMax - graphMin);
 const calculatedSoc = Math.max(0, Math.min(100, graphRatio * 100));
 setCrosshairSoc(calculatedSoc);
 };

 const handleShareClick = () => {
 navigator.clipboard?.writeText(window.location.href);
 setCopied(true);
 setTimeout(() => {
 setCopied(false);
 }, 2200);
 };

 const pTesla = getPowerTeslaModelY(crosshairSoc).toFixed(1);
 const pIoniq = getPowerHyundaiIoniq5(crosshairSoc).toFixed(1);
 const delta = (parseFloat(pIoniq) - parseFloat(pTesla)).toFixed(1);
 const isIoniqAhead = parseFloat(delta) > 0;

 const svgX = 60 + (crosshairSoc / 100) * 900;
 
 // Quick interpolation to determine marker Y position visually based on the path
 const getMarkerYTesla = (kw: number) => 380 - (kw / 300) * (380 - 40) * (300/340); // Approximate scaling based on SVG path
 const getMarkerYIoniq = (kw: number) => 380 - (kw / 300) * (380 - 40) * (300/340); // Will adjust with closer approximation

 // Y scaling from CSS: 300kW = ~40, 0kW = 380. (340 range for 300kW => 1.133px per kW). Y = 380 - kw * 1.133
 const yTesla = Math.max(40, Math.min(380, 380 - parseFloat(pTesla) * 1.1333));
 const yIoniq = Math.max(40, Math.min(380, 380 - parseFloat(pIoniq) * 1.1333));


 return (
 <div className="flex flex-col w-full pb-32 animate-fade-in">
 {/* BENCHMARK HEADER & TOP METADATA */}
 <section className="w-full bg-slate-800-lowest py-8">
 <div className="max-w-7xl mx-auto px-gutter-desktop flex flex-col gap-4">
 <div className="flex flex-wrap items-center justify-between gap-3">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-emerald-400 uppercase tracking-widest text-[10px] tracking-widest uppercase">
 <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
 <span>Telemetry Benchmark Engine &bull; 400V vs 800V Architecture</span>
 </div>
 <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
 <span className="flex items-center gap-1 text-emerald-400-fixed-dim">
 <span className="material-symbols-outlined text-[15px]">verified</span> Lab Calibrated
 </span>
 <span>&bull;</span>
 <span>N=14,280 Verified Charge Logs</span>
 </div>
 </div>
 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
 <div className="max-w-3xl flex flex-col gap-2">
 <h1 className="font-headline-xl text-slate-100 tracking-tight">
 Dual EV Charge Curve &amp; Head-to-Head Telemetry
 </h1>
 <p className="text-base text-slate-300">
 Compare real BMS charging taper profiles, 10% to 80% stop times, real-world highway range replenishment rates (mi/min), and charging economics side-by-side.
 </p>
 </div>
 <div className="flex items-center gap-3 shrink-0">
 <button onClick={handleShareClick} className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-700 text-slate-100 hover:bg-slate-950-bright font-mono text-xs transition-colors shadow-sm">
 {copied ? (
 <>
 <span className="material-symbols-outlined text-[18px] text-emerald-400">done</span>
 <span className="text-emerald-400">Copied!</span>
 </>
 ) : (
 <>
 <span className="material-symbols-outlined text-[18px]">share</span>
 <span>Share Link</span>
 </>
 )}
 </button>
 <button className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-on-primary font-mono text-xs font-semibold hover:opacity-95 transition-all shadow-md">
 <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
 <span>Export Benchmark</span>
 </button>
 </div>
 </div>
 
 {/* Quick Preset Selector Bar */}
 <div className="flex flex-col gap-2 pt-2">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Curated Matchup Presets</span>
 <div className="flex flex-wrap gap-2">
 <button className="px-4 py-2 rounded-full bg-slate-700 text-emerald-400 font-mono text-[11px] transition-all hover:bg-slate-950-bright flex items-center gap-2">
 <span className="material-symbols-outlined text-[14px]">bolt</span>
 <span>Tesla Model Y LR vs Hyundai Ioniq 5 AWD (400V vs 800V)</span>
 </button>
 <button className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px] transition-all hover:bg-slate-950-bright hover:text-slate-100 flex items-center gap-2">
 <span>Porsche Taycan Plus vs Tesla Model S Plaid</span>
 </button>
 <button className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px] transition-all hover:bg-slate-950-bright hover:text-slate-100 flex items-center gap-2">
 <span>Rivian R1T Dual Max vs Ford F-150 Lightning ER</span>
 </button>
 <button className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px] transition-all hover:bg-slate-950-bright hover:text-slate-100 flex items-center gap-2">
 <span>Kia EV6 GT-Line vs Ford Mustang Mach-E ER</span>
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* VEHICLE SELECTION CARDS & CONFIGURATION */}
 <section className="w-full py-8">
 <div className="max-w-7xl mx-auto px-gutter-desktop flex flex-col gap-6">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Vehicle A */}
 <div className="bg-slate-800 rounded-xl p-6 flex flex-col justify-between gap-4 shadow-md">
 <div className="flex flex-col gap-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="px-3 py-1 rounded-full bg-primary/10 text-emerald-400 uppercase tracking-widest text-[10px] uppercase font-bold tracking-wider">
 Vehicle Alpha (400V Class)
 </span>
 <span className="h-2 w-2 rounded-full bg-primary"></span>
 </div>
 <span className="font-mono text-[11px] text-slate-500">Ref ID: #TSL-MY24-LR</span>
 </div>
 <div className="flex items-start justify-between gap-4">
 <div className="flex flex-col">
 <h2 className="font-bold text-xl text-slate-100">Tesla Model Y Long Range AWD</h2>
 <span className="text-xs text-slate-300">2024 Refresh &bull; 4680/2170 Ternary NMC Chemistry</span>
 </div>
 <span className="px-3 py-2 rounded-full bg-slate-600 text-slate-100 font-mono text-[11px] shrink-0">
 400V Nominal
 </span>
 </div>
 {/* Vehicle Visual Spec Snapshot */}
 <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-800-lowest flex items-center justify-center p-4">
 <Image 
 className="object-cover opacity-60 rounded-lg" 
 alt="A sleek minimalist Tesla Model Y Long Range in stealth grey parked at a modern illuminated DC fast charging terminal under ambient dark obsidian cybernetic lighting with neon emerald current indicators." 
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtHsv0Nhy7lk0IlsEIPip6Lhg68OLRYg0umsedmzudd4ySYtkDAn9ebmAfqnM_w8Fskykin1TNmNqODVJO07xeeXcN172eAkWeRay3In2hdWaDgJ2Za3PQo7JA6rIJm56MjKBeJeXfbstuP4_LJAW_F5E3x6WkfBmc5oOXcmcXpIjfrE8KmcFyU0_GfD4F3xMOdXKIQucwgJ8WFxkSyqNY8isfQkOkijdwptjC7_hxa8aW34OBs_Eb"
 fill
 referrerPolicy="no-referrer"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>
 <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] ">
 <span className="text-slate-100 bg-slate-600/80 backdrop-blur-md px-3 py-1 rounded">310 mi EPA Range</span>
 <span className="text-emerald-400 bg-primary/15 backdrop-blur-md px-3 py-1 rounded font-semibold">250 kW Peak Rated</span>
 </div>
 </div>
 {/* Vehicle A Micro-Selectors */}
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
 <div className="bg-slate-800-lowest p-3 rounded">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">USABLE CAPACITY</span>
 <span className="font-mono text-xs text-slate-100">75.0 kWh</span>
 </div>
 <div className="bg-slate-800-lowest p-3 rounded">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">PACK VOLTAGE</span>
 <span className="font-mono text-xs text-slate-100">360V - 402V</span>
 </div>
 <div className="bg-slate-800-lowest p-3 rounded col-span-2 sm:col-span-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">MAX CURRENT</span>
 <span className="font-mono text-xs text-slate-100">675A (V3 Disp.)</span>
 </div>
 </div>
 </div>
 <div className="flex items-center justify-between pt-2 text-xs text-slate-300">
 <span>Trim: Dual Motor AWD 19&quot; Gemini</span>
 <button className="text-emerald-400 hover:underline uppercase tracking-widest text-[10px] uppercase flex items-center gap-1">
 Change Model <span className="material-symbols-outlined text-[14px]">tune</span>
 </button>
 </div>
 </div>

 {/* Vehicle B */}
 <div className="bg-slate-800 rounded-xl p-6 flex flex-col justify-between gap-4 shadow-md">
 <div className="flex flex-col gap-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-cyan-400 uppercase tracking-widest text-[10px] uppercase font-bold tracking-wider">
 Vehicle Bravo (800V Class)
 </span>
 <span className="h-2 w-2 rounded-full bg-secondary"></span>
 </div>
 <span className="font-mono text-[11px] text-slate-500">Ref ID: #HYU-IQ5-800V</span>
 </div>
 <div className="flex items-start justify-between gap-4">
 <div className="flex flex-col">
 <h2 className="font-bold text-xl text-slate-100">Hyundai Ioniq 5 AWD Long Range</h2>
 <span className="text-xs text-slate-300">2024 AWD Limited &bull; E-GMP Modular Silicon Carbide</span>
 </div>
 <span className="px-3 py-2 rounded-full bg-secondary-container/30 text-cyan-400 font-mono text-[11px] font-semibold shrink-0">
 800V Ultra-Fast
 </span>
 </div>
 {/* Vehicle Visual Spec Snapshot */}
 <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-800-lowest flex items-center justify-center p-4">
 <Image 
 className="object-cover opacity-60 rounded-lg" 
 alt="A modern matte cyber gray Hyundai Ioniq 5 electric vehicle plugged into an ultra-fast 350kW liquid-cooled charging station at twilight with cold electric blue glow accents." 
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuANb4-kehpnlCjoK05LvW1NbynulQ3T1faNfS8IUwMco086IXbN9wtnBF_7bJcdzV13tMaLKSbq7VyY6bvrf0d1c_RCKR4nAugLObDFtvTeu-dyCvoxznvTQADjA41GuUkS7WSli7IeAD1ix5_6TvKR50vmMjqkYDZOf81_uDCUsyccUnDOyIZmX8zipPhwJsCLIzNopM3t7yu6r0X66AJPr7LNPJL8-FQWlxC7TwjYMQ3sJXxp0j0i"
 fill
 referrerPolicy="no-referrer"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>
 <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] ">
 <span className="text-slate-100 bg-slate-600/80 backdrop-blur-md px-3 py-1 rounded">260 mi EPA Range</span>
 <span className="text-cyan-400 bg-secondary-container/30 backdrop-blur-md px-3 py-1 rounded font-semibold">235 kW Peak Rated</span>
 </div>
 </div>
 {/* Vehicle B Micro-Selectors */}
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
 <div className="bg-slate-800-lowest p-3 rounded">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">USABLE CAPACITY</span>
 <span className="font-mono text-xs text-slate-100">77.4 kWh</span>
 </div>
 <div className="bg-slate-800-lowest p-3 rounded">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">PACK VOLTAGE</span>
 <span className="font-mono text-xs text-slate-100">697V - 800V</span>
 </div>
 <div className="bg-slate-800-lowest p-3 rounded col-span-2 sm:col-span-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">MAX CURRENT</span>
 <span className="font-mono text-xs text-slate-100">320A (Cooled)</span>
 </div>
 </div>
 </div>
 <div className="flex items-center justify-between pt-2 text-xs text-slate-300">
 <span>Trim: Limited AWD 20&quot; Aero</span>
 <button className="text-cyan-400 hover:underline uppercase tracking-widest text-[10px] uppercase flex items-center gap-1">
 Change Model <span className="material-symbols-outlined text-[14px]">tune</span>
 </button>
 </div>
 </div>
 </div>
 
 {/* GLOBAL SIMULATION CONTROLS MATRIX */}
 <div className="bg-slate-900 rounded-xl p-4 lg:p-6 flex flex-col gap-4 shadow-sm">
 <div className="flex flex-wrap items-center justify-between gap-3">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-slate-500 text-[20px]">tune</span>
 <span className="uppercase tracking-widest text-[10px] text-slate-100 uppercase tracking-wider">Test Scenario Simulator Variables</span>
 </div>
 <span className="font-mono text-[11px] text-emerald-400">Simulation Active &bull; Standard 10% &rarr; {targetSoc}% Baseline</span>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
 {/* Dispenser Stall Type */}
 <div className="flex flex-col gap-2">
 <label className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">DC Fast Charger Hardware</label>
 <div className="grid grid-cols-3 gap-1 bg-slate-800-lowest p-1 rounded-lg">
 <button className="py-2 text-center rounded font-mono text-[11px] text-slate-300 hover:text-slate-100 transition-colors">150kW</button>
 <button className="py-2 text-center rounded font-mono text-[11px] text-slate-300 hover:text-slate-100 transition-colors">250kW</button>
 <button className="py-2 text-center rounded font-mono text-[11px] bg-slate-700 text-emerald-400 font-bold">350kW (800V)</button>
 </div>
 </div>
 {/* SoC Range Range Scrub */}
 <div className="flex flex-col gap-2">
 <div className="flex justify-between items-center">
 <label className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Target State of Charge</label>
 <span className="font-mono text-[11px] text-slate-100 font-semibold">10% &rarr; {targetSoc}%</span>
 </div>
 <div className="flex items-center gap-3 bg-slate-800-lowest px-3 py-2 rounded-lg h-[42px]">
 <span className="font-mono text-[11px] text-slate-500">10%</span>
 <input 
 className="w-full accent-primary cursor-pointer h-1.5 bg-slate-600 rounded-lg" 
 max="95" min="5" type="range" 
 value={targetSoc}
 onChange={(e) => setTargetSoc(parseInt(e.target.value) || 0)}
 />
 <span className="font-mono text-[11px] text-slate-500">90%</span>
 </div>
 </div>
 {/* Ambient & Thermal Conditioning */}
 <div className="flex flex-col gap-2">
 <label className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Pack Temperature &amp; Condition</label>
 <div className="grid grid-cols-2 gap-1 bg-slate-800-lowest p-1 rounded-lg">
 <button className="py-2 text-center rounded font-mono text-[11px] bg-slate-700 text-emerald-400 font-semibold flex items-center justify-center gap-1 transition-colors">
 <span className="material-symbols-outlined text-[15px]">thermostat</span> 70&deg;F Optimal
 </button>
 <button className="py-2 text-center rounded font-mono text-[11px] text-slate-300 hover:text-slate-100 flex items-center justify-center gap-1 transition-colors">
 <span className="material-symbols-outlined text-[15px]">ac_unit</span> 25&deg;F Cold
 </button>
 </div>
 </div>
 {/* Tariff Rate Cost */}
 <div className="flex flex-col gap-2">
 <label className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">DC Fast Charge Electricity Tariff</label>
 <div className="flex items-center justify-between bg-slate-800-lowest px-3 rounded-lg h-[42px]">
 <div className="flex items-center gap-2">
 <span className="font-mono text-xs text-slate-300">$</span>
 <input className="bg-transparent font-mono text-xs text-slate-100 w-16 focus:outline-none" step="0.01" type="number" defaultValue="0.42" />
 <span className="font-mono text-[11px] text-slate-500">/ kWh</span>
 </div>
 <span className="uppercase tracking-widest text-[10px] text-slate-500">Electrify America Avg</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* PRIMARY DUAL CHARGING CURVE VISUALIZATION */}
 <section className="w-full py-6">
 <div className="max-w-7xl mx-auto px-gutter-desktop flex flex-col gap-6">
 <div className="bg-slate-800 rounded-xl p-6 flex flex-col gap-4 shadow-xl">
 {/* Curve Header & Live Hover Data Stream */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div className="flex flex-col gap-1">
 <h3 className="font-bold text-lg text-slate-100">Synchronized DC Charging Curve Overlay</h3>
 <p className="text-xs text-slate-300">Instantaneous battery pack power draw across 0% to 100% State of Charge (SoC).</p>
 </div>
 <div className="flex flex-wrap items-center gap-4 bg-slate-800-lowest p-2 rounded-full">
 <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-slate-100 font-mono text-[11px] ">
 <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
 <span>Model Y LR (400V)</span>
 </button>
 <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 text-slate-100 font-mono text-[11px] ">
 <span className="h-2.5 w-2.5 rounded-full bg-secondary"></span>
 <span>Ioniq 5 AWD (800V)</span>
 </button>
 </div>
 </div>
 
 {/* Interactive Telemetry Crosshair Readout Bar */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-800-lowest p-3 rounded-lg">
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500">INSPECTED SOC POINT</span>
 <span className="font-mono text-sm text-slate-100">{Math.round(crosshairSoc)}% SoC</span>
 </div>
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-emerald-400">MODEL Y POWER</span>
 <span className="font-mono text-sm text-emerald-400">{pTesla} kW</span>
 </div>
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-cyan-400">IONIQ 5 POWER</span>
 <span className="font-mono text-sm text-cyan-400">{pIoniq} kW</span>
 </div>
 <div className="flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-purple-400">POWER DELTA ADVANTAGE</span>
 <span className="font-mono text-sm text-purple-400">
 {isIoniqAhead ? '+' : ''}{delta} kW ({isIoniqAhead ? 'Ioniq 5' : 'Model Y'} ahead)
 </span>
 </div>
 </div>
 
 {/* High-Precision SVG Graph Overlay */}
 <div className="relative w-full overflow-hidden bg-slate-800-lowest rounded-xl p-3 lg:p-4">
 <svg 
 className="w-full h-72 md:h-96 overflow-visible cursor-crosshair" 
 viewBox="0 0 1000 420"
 ref={chartRef}
 onMouseMove={handleMouseMove}
 >
 <defs>
 <linearGradient id="gradModelY" x1="0%" x2="0%" y1="0%" y2="100%">
 <stop offset="0%" stopColor="#10b981" stopOpacity="0.32"></stop>
 <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"></stop>
 </linearGradient>
 <linearGradient id="gradIoniq5" x1="0%" x2="0%" y1="0%" y2="100%">
 <stop offset="0%" stopColor="#00a2e6" stopOpacity="0.25"></stop>
 <stop offset="100%" stopColor="#00a2e6" stopOpacity="0.0"></stop>
 </linearGradient>
 </defs>
 
 {/* Horizontal Grid Lines */}
 <g className="text-surface-container-highest" stroke="#262a33" strokeDasharray="3,3" strokeWidth="1">
 <line x1="60" x2="960" y1="40" y2="40"></line>
 <line x1="60" x2="960" y1="100" y2="100"></line>
 <line x1="60" x2="960" y1="160" y2="160"></line>
 <line x1="60" x2="960" y1="220" y2="220"></line>
 <line x1="60" x2="960" y1="280" y2="280"></line>
 <line x1="60" x2="960" y1="340" y2="340"></line>
 </g>
 
 {/* Y-Axis Labels */}
 <g className="fill-outline font-mono text-[11px] text-[11px]" textAnchor="end">
 <text x="50" y="44">300 kW</text>
 <text x="50" y="104">250 kW</text>
 <text x="50" y="164">200 kW</text>
 <text x="50" y="224">150 kW</text>
 <text x="50" y="284">100 kW</text>
 <text x="50" y="344">50 kW</text>
 <text x="50" y="380">0 kW</text>
 </g>
 
 {/* Vertical Grid Lines */}
 <g className="text-surface-container-highest" stroke="#262a33" strokeDasharray="3,3" strokeWidth="1">
 <line x1="60" x2="60" y1="40" y2="380"></line>
 <line x1="150" x2="150" y1="40" y2="380"></line>
 <line x1="240" x2="240" y1="40" y2="380"></line>
 <line x1="330" x2="330" y1="40" y2="380"></line>
 <line x1="420" x2="420" y1="40" y2="380"></line>
 <line x1="510" x2="510" y1="40" y2="380"></line>
 <line x1="600" x2="600" y1="40" y2="380"></line>
 <line x1="690" x2="690" y1="40" y2="380"></line>
 <line x1="780" x2="780" y1="40" y2="380"></line>
 <line x1="870" x2="870" y1="40" y2="380"></line>
 <line x1="960" x2="960" y1="40" y2="380"></line>
 </g>
 
 {/* X-Axis Labels */}
 <g className="fill-outline font-mono text-[11px] text-[11px]" textAnchor="middle">
 <text x="60" y="405">0%</text>
 <text x="150" y="405">10%</text>
 <text x="240" y="405">20%</text>
 <text x="330" y="405">30%</text>
 <text x="420" y="405">40%</text>
 <text x="510" y="405">50%</text>
 <text x="600" y="405">60%</text>
 <text x="690" y="405">70%</text>
 <text x="780" y="405">80%</text>
 <text x="870" y="405">90%</text>
 <text x="960" y="405">100%</text>
 </g>
 
 {/* Standard 10% to 80% Sweetspot Highlight Zone */}
 <rect fill="#4edea3" fillOpacity="0.03" height="340" width="630" x="150" y="40"></rect>
 <line stroke="#4edea3" strokeDasharray="4,4" strokeWidth="1.5" x1="150" x2="150" y1="40" y2="380"></line>
 <line stroke="#4edea3" strokeDasharray="4,4" strokeWidth="1.5" x1="780" x2="780" y1="40" y2="380"></line>
 <text fill="#86948a" fontFamily="var(--font-jetbrains-mono)" fontSize="10" letterSpacing="0.1em" textAnchor="middle" x="465" y="55">PRIMARY FAST CHARGE ROADTRIP DWELL ZONE (10% &rarr; 80%)</text>
 
 {/* Model Y Curve */}
 <path d="M 60,260 
 C 100,160 130,100 168,100 
 C 220,100 300,160 375,208 
 C 440,250 520,290 600,305 
 C 680,320 740,335 780,352 
 C 840,370 900,375 960,378 
 L 960,380 L 60,380 Z" fill="url(#gradModelY)"></path>
 <path d="M 60,260 
 C 100,160 130,100 168,100 
 C 220,100 300,160 375,208 
 C 440,250 520,290 600,305 
 C 680,320 740,335 780,352 
 C 840,370 900,375 960,378" fill="none" stroke="#4edea3" strokeLinecap="round" strokeWidth="3"></path>
 
 {/* Ioniq 5 Curve */}
 <path d="M 60,320 
 C 100,240 140,128 175,124 
 L 520,120 
 C 560,122 575,150 600,190 
 L 720,205 
 C 760,215 770,270 798,352 
 C 830,370 890,374 960,378 
 L 960,380 L 60,380 Z" fill="url(#gradIoniq5)"></path>
 <path d="M 60,320 
 C 100,240 140,128 175,124 
 L 520,120 
 C 560,122 575,150 600,190 
 L 720,205 
 C 760,215 770,270 798,352 
 C 830,370 890,374 960,378" fill="none" stroke="#89ceff" strokeLinecap="round" strokeWidth="3"></path>
 
 {/* Sample Crosshair Vertical */}
 <g>
 <line opacity="0.8" stroke="#dfe2ee" strokeDasharray="2,2" strokeWidth="1.5" x1={svgX} x2={svgX} y1="40" y2="380"></line>
 <circle cx={svgX} cy={yTesla} fill="#4edea3" r="6" stroke="#0f131c" strokeWidth="2"></circle>
 <circle cx={svgX} cy={yIoniq} fill="#89ceff" r="6" stroke="#0f131c" strokeWidth="2"></circle>
 
 {/* Annotation callout badge */}
 {svgX < 850 ? (
 <>
 <rect fill="#1c2028" height="42" opacity="0.95" rx="4" width="125" x={svgX + 10} y={110}></rect>
 <text fill="#89ceff" fontFamily="var(--font-jetbrains-mono)" fontSize="11" fontWeight="bold" x={svgX + 18} y={127}>Ioniq 5: {pIoniq} kW</text>
 <text fill="#4edea3" fontFamily="var(--font-jetbrains-mono)" fontSize="11" fontWeight="bold" x={svgX + 18} y={143}>Model Y: {pTesla} kW</text>
 </>
 ) : (
 <>
 <rect fill="#1c2028" height="42" opacity="0.95" rx="4" width="125" x={svgX - 135} y={110}></rect>
 <text fill="#89ceff" fontFamily="var(--font-jetbrains-mono)" fontSize="11" fontWeight="bold" x={svgX - 127} y={127}>Ioniq 5: {pIoniq} kW</text>
 <text fill="#4edea3" fontFamily="var(--font-jetbrains-mono)" fontSize="11" fontWeight="bold" x={svgX - 127} y={143}>Model Y: {pTesla} kW</text>
 </>
 )}
 </g>
 </svg>
 </div>
 
 <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3 pt-1">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-[16px] text-purple-400">info</span>
 <span>Notice: Model Y initiates higher peak (250 kW), but Ioniq 5 sustains a flat 230 kW plateau through 55% State of Charge.</span>
 </div>
 <span className="uppercase tracking-widest text-[10px] ">Hover over telemetry curve to scrub SoC values</span>
 </div>
 </div>
 </div>
 </section>

 {/* HEAD-TO-HEAD METRIC SCORECARDS */}
 <section className="w-full py-8">
 <div className="max-w-7xl mx-auto px-gutter-desktop flex flex-col gap-6">
 <div className="flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Comparative Benchmarks</span>
 <h3 className="font-bold text-2xl text-slate-100">10% to {targetSoc}% Dwell &amp; Efficiency Head-to-Head</h3>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
 {/* Metric 1: Stop Time */}
 <div className="bg-slate-800 rounded-xl p-space-base flex flex-col justify-between gap-4 shadow-md">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Charge Duration (10-{targetSoc}%)</span>
 <span className="px-2 py-1 rounded bg-secondary-container/20 text-cyan-400 uppercase tracking-widest text-[10px] font-bold">
 WINNER: IONIQ 5
 </span>
 </div>
 <div className="flex flex-col gap-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-primary"></span>
 <span className="text-xs text-slate-300">Model Y LR</span>
 </div>
 <span className="font-mono text-sm text-slate-100">27.0 <span className=" text-slate-500">min</span></span>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-secondary"></span>
 <span className="text-xs text-slate-100">Ioniq 5 AWD</span>
 </div>
 <span className="font-mono text-sm text-cyan-400 font-bold">18.0 <span className=" text-cyan-400">min</span></span>
 </div>
 <div className="w-full bg-slate-800-lowest h-2 rounded-full overflow-hidden flex">
 <div className="bg-secondary h-full" style={{ width: '40%' }}></div>
 <div className="bg-primary h-full" style={{ width: '60%' }}></div>
 </div>
 </div>
 <div className="p-2 bg-slate-800-lowest rounded font-mono text-[11px] text-emerald-400 flex items-center gap-2">
 <span className="material-symbols-outlined text-[16px]">timer</span>
 <span>9 mins faster (-33% roadtrip charging downtime)</span>
 </div>
 </div>
 
 {/* Metric 2: Average Power */}
 <div className="bg-slate-800 rounded-xl p-space-base flex flex-col justify-between gap-4 shadow-md">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Average Sustained Power</span>
 <span className="px-2 py-1 rounded bg-secondary-container/20 text-cyan-400 uppercase tracking-widest text-[10px] font-bold">
 WINNER: IONIQ 5
 </span>
 </div>
 <div className="flex flex-col gap-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-primary"></span>
 <span className="text-xs text-slate-300">Model Y LR</span>
 </div>
 <span className="font-mono text-sm text-slate-100">116.6 <span className=" text-slate-500">kW</span></span>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-secondary"></span>
 <span className="text-xs text-slate-100">Ioniq 5 AWD</span>
 </div>
 <span className="font-mono text-sm text-cyan-400 font-bold">182.4 <span className=" text-cyan-400">kW</span></span>
 </div>
 <div className="w-full bg-slate-800-lowest h-2 rounded-full overflow-hidden flex">
 <div className="bg-secondary h-full" style={{ width: '61%' }}></div>
 <div className="bg-slate-700 h-full" style={{ width: '39%' }}></div>
 </div>
 </div>
 <div className="p-2 bg-slate-800-lowest rounded font-mono text-[11px] text-cyan-400 flex items-center gap-2">
 <span className="material-symbols-outlined text-[16px]">electric_bolt</span>
 <span>+65.8 kW higher sustained output through 800V</span>
 </div>
 </div>
 
 {/* Metric 3: Range Replenishment Rate */}
 <div className="bg-slate-800 rounded-xl p-space-base flex flex-col justify-between gap-4 shadow-md">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Highway Replenish Rate</span>
 <span className="px-2 py-1 rounded bg-secondary-container/20 text-cyan-400 uppercase tracking-widest text-[10px] font-bold">
 WINNER: IONIQ 5
 </span>
 </div>
 <div className="flex flex-col gap-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-primary"></span>
 <span className="text-xs text-slate-300">Model Y LR</span>
 </div>
 <span className="font-mono text-sm text-slate-100">+8.0 <span className=" text-slate-500">mi / min</span></span>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-secondary"></span>
 <span className="text-xs text-slate-100">Ioniq 5 AWD</span>
 </div>
 <span className="font-mono text-sm text-cyan-400 font-bold">+10.1 <span className=" text-cyan-400">mi / min</span></span>
 </div>
 <div className="w-full bg-slate-800-lowest h-2 rounded-full overflow-hidden flex">
 <div className="bg-secondary h-full" style={{ width: '56%' }}></div>
 <div className="bg-primary h-full" style={{ width: '44%' }}></div>
 </div>
 </div>
 <div className="p-2 bg-slate-800-lowest rounded font-mono text-[11px] text-cyan-400 flex items-center gap-2">
 <span className="material-symbols-outlined text-[16px]">speed</span>
 <span>+2.1 miles added per minute connected</span>
 </div>
 </div>
 
 {/* Metric 4: Stop Economics */}
 <div className="bg-slate-800 rounded-xl p-space-base flex flex-col justify-between gap-4 shadow-md">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">10-{targetSoc}% Session Cost</span>
 <span className="px-2 py-1 rounded bg-primary/20 text-emerald-400 uppercase tracking-widest text-[10px] font-bold">
 WINNER: MODEL Y
 </span>
 </div>
 <div className="flex flex-col gap-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-primary"></span>
 <span className="text-xs text-slate-100">Model Y LR</span>
 </div>
 <span className="font-mono text-sm text-emerald-400 font-bold">$22.05 <span className=" text-slate-500">(52.5 kWh)</span></span>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-secondary"></span>
 <span className="text-xs text-slate-300">Ioniq 5 AWD</span>
 </div>
 <span className="font-mono text-sm text-slate-100">$22.75 <span className=" text-slate-500">(54.1 kWh)</span></span>
 </div>
 <div className="w-full bg-slate-800-lowest h-2 rounded-full overflow-hidden flex">
 <div className="bg-primary h-full" style={{ width: '49%' }}></div>
 <div className="bg-slate-700 h-full" style={{ width: '51%' }}></div>
 </div>
 </div>
 <div className="p-2 bg-slate-800-lowest rounded font-mono text-[11px] text-emerald-400 flex items-center gap-2">
 <span className="material-symbols-outlined text-[16px]">savings</span>
 <span>$0.70 cheaper session (due to superior drag efficiency)</span>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* STAGE-BY-STAGE TAPER DRILL-DOWN TABLE */}
 <section className="w-full py-6">
 <div className="max-w-7xl mx-auto px-gutter-desktop flex flex-col gap-4">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
 <div>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Phase Decomposition</span>
 <h3 className="font-bold text-xl text-slate-100">Segmented Charging Stage Analysis</h3>
 </div>
 <p className="text-xs text-slate-300 max-w-lg">
 Fast-charging curves shift through distinct electro-chemical states. Here is where the 800V E-GMP pulls ahead of traditional 400V packs.
 </p>
 </div>
 
 <div className="w-full overflow-x-auto rounded-xl bg-slate-800 shadow-md">
 <table className="w-full text-left text-xs ">
 <thead className="bg-slate-800-lowest text-slate-500 uppercase tracking-widest text-[10px] uppercase">
 <tr>
 <th className="py-4 px-4">Charging Interval</th>
 <th className="py-4 px-4">Tesla Model Y (400V)</th>
 <th className="py-4 px-4">Hyundai Ioniq 5 (800V)</th>
 <th className="py-4 px-4">Time Delta</th>
 <th className="py-4 px-4">BMS Limiting Factor</th>
 </tr>
 </thead>
 <tbody className="text-slate-100 font-mono text-[11px] divide-y-0">
 <tr className="hover:bg-slate-700/50 transition-colors border-b border-slate-800-low">
 <td className="py-4 px-4 font-semibold text-slate-100">
 10% &rarr; 40%
 <span className="block text-xs text-slate-500 font-normal">Initial High-Velocity Burst</span>
 </td>
 <td className="py-4 px-4 text-emerald-400">
 7.5 min
 <span className="block text-xs text-slate-500">Avg: 180 kW (Peak 250 kW)</span>
 </td>
 <td className="py-4 px-4 text-cyan-400">
 5.8 min
 <span className="block text-xs text-slate-500">Avg: 232 kW (Peak 235 kW)</span>
 </td>
 <td className="py-4 px-4 text-cyan-400 font-bold">
 -1.7 min (-23%)
 </td>
 <td className="py-4 px-4 text-xs text-slate-300">
 Model Y hits 650A+ liquid-cooled cable limit; Ioniq runs cool at ~300A.
 </td>
 </tr>
 <tr className="hover:bg-slate-700/50 transition-colors bg-slate-900/40 border-b border-slate-800-low">
 <td className="py-4 px-4 font-semibold text-slate-100">
 40% &rarr; 70%
 <span className="block text-xs text-slate-500 font-normal">Mid-Charge Plateau Phase</span>
 </td>
 <td className="py-4 px-4 text-emerald-400">
 12.0 min
 <span className="block text-xs text-slate-500">Avg: 112 kW (Thermal Taper)</span>
 </td>
 <td className="py-4 px-4 text-cyan-400">
 6.9 min
 <span className="block text-xs text-slate-500">Avg: 195 kW (Stable 800V)</span>
 </td>
 <td className="py-4 px-4 text-cyan-400 font-bold">
 -5.1 min (-42%)
 </td>
 <td className="py-4 px-4 text-xs text-slate-300">
 Major divergence: Model Y aggressive taper to protect cell chemistry.
 </td>
 </tr>
 <tr className="hover:bg-slate-700/50 transition-colors border-b border-slate-800-low">
 <td className="py-4 px-4 font-semibold text-slate-100">
 70% &rarr; 80%
 <span className="block text-xs text-slate-500 font-normal">Late Fast Charge Window</span>
 </td>
 <td className="py-4 px-4 text-emerald-400">
 7.5 min
 <span className="block text-xs text-slate-500">Avg: 58 kW</span>
 </td>
 <td className="py-4 px-4 text-cyan-400">
 5.3 min
 <span className="block text-xs text-slate-500">Avg: 120 kW</span>
 </td>
 <td className="py-4 px-4 text-cyan-400 font-bold">
 -2.2 min (-29%)
 </td>
 <td className="py-4 px-4 text-xs text-slate-300">
 E-GMP drops from 160 kW to 100 kW around 78% SoC; Model Y settles at ~45 kW.
 </td>
 </tr>
 <tr className="hover:bg-slate-700/50 transition-colors bg-slate-900/40">
 <td className="py-4 px-4 font-semibold text-slate-100">
 80% &rarr; 100%
 <span className="block text-xs text-slate-500 font-normal">Thermal &amp; Voltage Saturation</span>
 </td>
 <td className="py-4 px-4 text-slate-500">
 32.0 min
 <span className="block text-xs text-slate-500">Avg: 28 kW (CV Mode)</span>
 </td>
 <td className="py-4 px-4 text-slate-500">
 24.0 min
 <span className="block text-xs text-slate-500">Avg: 38 kW (CV Mode)</span>
 </td>
 <td className="py-4 px-4 text-slate-500 font-bold">
 -8.0 min (Both Slow)
 </td>
 <td className="py-4 px-4 text-xs text-slate-300">
 Constant Voltage phase. Not recommended on road trips for either EV.
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </section>

 {/* DEEP DIVE ENGINEERING TELEMETRY INSIGHTS */}
 <section className="w-full py-8">
 <div className="max-w-7xl mx-auto px-gutter-desktop">
 <div className="bg-slate-800 rounded-xl p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-xl">
 <div className="flex-1 flex flex-col gap-4">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-purple-400 text-[22px]">electrical_services</span>
 <span className="uppercase tracking-widest text-[10px] text-purple-400 uppercase tracking-wider font-bold">Engineering Physics Breakdown</span>
 </div>
 <h3 className="font-bold text-2xl text-slate-100 tracking-tight">
 Why 800V E-GMP Crushes 400V Charging Dwell Times
 </h3>
 <p className="text-sm text-slate-300 leading-relaxed">
 Fast charging speed is fundamentally constrained by current ($I$) and Joule heating ($P = I^2 R$). At 400V nominal, drawing 200 kW requires <strong>500 Amperes</strong> of continuous current, triggering severe thermal degradation limits and cable throttling.
 </p>
 <p className="text-sm text-slate-300 leading-relaxed">
 By doubling pack voltage to ~800V, the Hyundai Ioniq 5 delivers identical 200 kW at only <strong>250 Amperes</strong>. With quarter the resistive heat generation inside the battery busbars and charging cable, the vehicle can safely sustain flat 220+ kW power all the way to 55% State of Charge.
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
 <div className="bg-slate-800-lowest p-4 rounded-lg">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">CABLE RESISTIVE HEAT (AT 200 KW)</span>
 <span className="font-mono text-sm text-cyan-400">75% Lower Heat</span>
 <span className="text-xs text-slate-500 block mt-1">Minimal thermal throttling at 800V</span>
 </div>
 <div className="bg-slate-800-lowest p-4 rounded-lg">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">ROAD TRIP PIT STOP STRATEGY</span>
 <span className="font-mono text-sm text-emerald-400">Unplug at 70-80%</span>
 <span className="text-xs text-slate-500 block mt-1">Sub-20 min stop yields 180 mi added</span>
 </div>
 </div>
 </div>
 
 {/* Telemetry Infographic / Visual Spec Card */}
 <div className="w-full lg:w-96 bg-slate-800-lowest rounded-xl p-6 flex flex-col gap-4 shrink-0 shadow-inner">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Hardware Matrix</span>
 <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
 </div>
 <div className="flex flex-col gap-2 font-mono text-[11px] text-slate-100">
 <div className="flex justify-between py-1">
 <span className="text-slate-500">Max CCS Amp Rating</span>
 <span className="font-bold">500A (CCS1/NACS Liquid)</span>
 </div>
 <div className="flex justify-between py-1">
 <span className="text-slate-500">400V Max Theoretical</span>
 <span className="text-emerald-400 font-bold">200 kW @ 400V / 500A</span>
 </div>
 <div className="flex justify-between py-1">
 <span className="text-slate-500">800V Max Theoretical</span>
 <span className="text-cyan-400 font-bold">400 kW @ 800V / 500A</span>
 </div>
 <div className="flex justify-between py-1">
 <span className="text-slate-500">Tesla V3 Supercharger</span>
 <span className="text-slate-100 font-bold">400V Custom (Up to 675A)</span>
 </div>
 </div>
 <div className="p-3 rounded bg-slate-700 text-xs text-slate-300 flex items-start gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[18px] shrink-0 mt-0.5">verified_user</span>
 <span>Tesla&apos;s proprietary V3 boost permits brief 250 kW on 400V, but pack heat induces early taper past 20% SoC.</span>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ACTION & PRO TOOL BAR */}
 <section className="w-full bg-slate-800-lowest py-8">
 <div className="max-w-7xl mx-auto px-gutter-desktop flex flex-col md:flex-row items-center justify-between gap-6">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-emerald-400 shrink-0">
 <span className="material-symbols-outlined text-[28px]">compare</span>
 </div>
 <div className="flex flex-col">
 <span className="font-bold text-lg text-slate-100 font-semibold">Want to benchmark a third EV?</span>
 <span className="text-xs text-slate-300">Unlock 3-Way and 4-Way fleet comparison telemetry with EVChargeCurve Pro.</span>
 </div>
 </div>
 <div className="flex items-center gap-3 w-full md:w-auto">
 <button className="flex-1 md:flex-none px-6 py-3 rounded-full bg-slate-800 text-slate-100 font-mono text-[11px] hover:bg-slate-950-bright transition-colors">
 Browse All 54 EV Curves
 </button>
 <button className="flex-1 md:flex-none px-6 py-3 rounded-full bg-primary text-on-primary font-mono text-[11px] font-bold hover:opacity-90 transition-all shadow-md">
 Add 3rd Vehicle (Pro)
 </button>
 </div>
 </div>
 </section>
 </div>
 );
}
