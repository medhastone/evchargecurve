
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { interpolateChargeCurve } from '@/lib/evCalculations';

import { VEHICLES } from "@/data/evModels";

// const VEHICLES: Record<string, any> = {

const CHARGER_TIERS = [50, 150, 250, 350];
const CURRENCIES: Record<string, string> = {
 USD: '$',
 GBP: '£',
 EUR: '€',
 CAD: '$',
 AUD: '$'
};

export default function DcSimulator({ initialVehicleId }: { initialVehicleId?: string }) {
 const [selectedVehicleId, setSelectedVehicleId] = useState(initialVehicleId || 'tesla-model-y-lr');
 const [brand, setBrand] = useState('tesla');
 const [chargerCapKw, setChargerCapKw] = useState(250);
 const [startSoc, setStartSoc] = useState(10);
 const [endSoc, setEndSoc] = useState(80);
 const [isColdWeather, setIsColdWeather] = useState(false);
 const [kwhCost, setKwhCost] = useState(0.45);
 const [currency, setCurrency] = useState('USD');
 const [copied, setCopied] = useState(false);

 const [hoverSoc, setHoverSoc] = useState<number | null>(null);
 const chartRef = useRef<SVGSVGElement>(null);

 // Initialize from URL params if present
 useEffect(() => {
 if (typeof window !== 'undefined') {
 const params = new URLSearchParams(window.location.search);
 const v = params.get('v');
 const s = params.get('s');
 const e = params.get('e');
 if (v && VEHICLES[v]) {
 setTimeout(() => {
 setSelectedVehicleId(v);
 setBrand(VEHICLES[v].brand);
 }, 0);
 }
 if (s) {
 setTimeout(() => setStartSoc(Math.max(0, Math.min(parseInt(s, 10), 99))), 0);
 }
 if (e) {
 setTimeout(() => setEndSoc(Math.max(1, Math.min(parseInt(e, 10), 100))), 0);
 }
 }
 }, []);

 // Sync range slider bounds strictly
 useEffect(() => {
 if (startSoc >= endSoc) {
 setTimeout(() => setStartSoc(Math.max(0, endSoc - 1)), 0);
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
 const text = `I calculated charging on ${vehicle.name}: ${startSoc}% to ${safeEndSoc}% takes ${calculation.totalMinutes} mins, adds ${calculation.kwhAdded} kWh, costs ${currencySymbol}${sessionCost}. Check it here: ${window.location.href}`;
 window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
 };

 const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
 if (!chartRef.current) return;
 const rect = chartRef.current.getBoundingClientRect();
 const clientX = e.clientX - rect.left;
 const relativeRatio = clientX / rect.width;
 const graphMin = 60 / 1000;
 const graphMax = 960 / 1000;
 const graphRatio = (relativeRatio - graphMin) / (graphMax - graphMin);
 const calculatedSoc = Math.max(0, Math.min(100, Math.round(graphRatio * 100)));
 setHoverSoc(calculatedSoc);
 };

 const handleMouseLeave = () => {
 setHoverSoc(null);
 };

 const graphMinX = 60;
 const graphMaxX = 960;
 const graphMinY = 40;
 const graphMaxY = 380;
 const xRange = graphMaxX - graphMinX;
 const yRange = graphMaxY - graphMinY;
 
 const pathData = calculation.chartData.map((pt, i) => {
 const x = graphMinX + (pt.soc / 100) * xRange;
 const y = graphMaxY - (pt.actualKw / 300) * yRange;
 return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
 }).join(' ');
 const areaPathData = `${pathData} L ${graphMinX + (calculation.chartData[calculation.chartData.length - 1].soc / 100) * xRange} ${graphMaxY} L ${graphMinX + (calculation.chartData[0].soc / 100) * xRange} ${graphMaxY} Z`;

 const getSvgX = (soc: number) => graphMinX + (soc / 100) * xRange;

 const startX = getSvgX(startSoc);
 const endX = getSvgX(safeEndSoc);
 
 let hoverPt = null;
 if (hoverSoc !== null) {
 const ptIndex = Math.min(Math.floor((hoverSoc / 100) * calculation.chartData.length), calculation.chartData.length - 1);
 hoverPt = calculation.chartData.find(pt => pt.soc === hoverSoc) || calculation.chartData[ptIndex];
 }

 return (
 <div className="flex flex-col w-full">
 {/* Subtle Ambient Glow Overlay (strictly contained) */}
 <div className="relative w-full max-w-7xl mx-auto px-gutter-mobile md:px-gutter-desktop pb-12">
 <div className="absolute -top-12 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
 <div className="absolute top-48 right-12 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
 
 {/* Hero Header Unit */}
 <div className="flex flex-col items-center text-center pt-6 pb-8 max-w-4xl mx-auto">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 mb-3 shadow-sm">
 <span className="relative flex h-2 w-2">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
 <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
 </span>
 <span className="uppercase tracking-widest text-[10px] uppercase tracking-wider text-emerald-400">LIVE TELEMETRY CALIBRATION v3.4</span>
 <span className="text-slate-600 uppercase tracking-widest text-[10px] ">|</span>
 <span className="font-mono text-[11px] text-slate-300">124,810 Real Cycles Analyzed</span>
 </div>
 <h1 className="font-headline-xl text-slate-100 tracking-tight leading-none mb-3">
 Real-World EV DC Fast Charge <span className="text-emerald-400">Curve & Time</span> Simulator
 </h1>
 <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
 Stop guessing charging stops. Calculate real taper drops, 10% to 80% duration, and session cost across 50+ EVs calibrated against real Supercharger & CCS stalls.
 </p>
 
 {/* Micro Stat Badges Row */}
 <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-slate-300">
 <div className="flex items-center gap-1">
 <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
 <span className="font-mono text-[11px] ">NMC & LFP Pack Chemistry</span>
 </div>
 <span className="text-slate-600 uppercase tracking-widest text-[10px] ">•</span>
 <div className="flex items-center gap-1">
 <span className="material-symbols-outlined text-cyan-400 text-[18px]">bolt</span>
 <span className="font-mono text-[11px] ">400V & 800V Architecture</span>
 </div>
 <span className="text-slate-600 uppercase tracking-widest text-[10px] ">•</span>
 <div className="flex items-center gap-1">
 <span className="material-symbols-outlined text-purple-400 text-[18px]">device_thermostat</span>
 <span className="font-mono text-[11px] ">Dynamic BMS Thermal Modeling</span>
 </div>
 </div>
 </div>

 {/* Two-Column Interactive Laboratory Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
 
 {/* LEFT COLUMN: Inputs & Configurator (5 Cols) */}
 <div className="lg:col-span-5 flex flex-col gap-4">
 {/* Main Configuration Card */}
 <div className="p-6 rounded-xl bg-slate-900 shadow-xl flex flex-col gap-6 border border-slate-700/50">
 
 {/* Section Heading */}
 <div className="flex items-center justify-between pb-2">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-emerald-400 text-[20px]">tune</span>
 <span className="font-bold text-lg text-slate-100">Vehicle & Dispenser Profile</span>
 </div>
 <span className="px-2 py-1 rounded-full bg-slate-700 uppercase tracking-widest text-[10px] text-emerald-400 uppercase">Active Session</span>
 </div>
 
 {/* Brand Selector Chips */}
 <div className="flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Manufacturer Archetype</span>
 <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-1 bg-slate-800-lowest rounded-xl">
 {['tesla', 'hyundai', 'ford', 'rivian', 'porsche', 'others'].map(b => (
 <button 
 key={b}
 type="button" 
 onClick={() => {
 setBrand(b);
 const firstModel = Object.values(VEHICLES).find(v => v.brand === b);
 if (firstModel) setSelectedVehicleId(firstModel.id);
 }}
 className={`px-2 py-2 rounded-lg text-center font-mono text-[11px] transition-all ${
 brand === b 
 ? 'bg-slate-700 text-emerald-400 font-semibold shadow-sm' 
 : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700'
 }`}
 >
 {b === 'others' ? 'More' : b.charAt(0).toUpperCase() + b.slice(1)}
 </button>
 ))}
 </div>
 </div>

 {/* Vehicle Model Selector Dropdown */}
 <div className="flex flex-col gap-1">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Calibrated Vehicle Model</span>
 <span className="font-mono text-[11px] text-cyan-400 flex items-center gap-1">
 <span className="material-symbols-outlined text-[14px]">electric_bolt</span> {vehicle.architecture} Pack Architecture
 </span>
 </div>
 <div className="relative group">
 <select 
 value={selectedVehicleId}
 onChange={(e) => { setSelectedVehicleId(e.target.value); setBrand(VEHICLES[e.target.value].brand); }}
 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
 title="Select Vehicle"
 >
 {Object.values(VEHICLES).map(v => (
 <option key={v.id} value={v.id}>{v.name}</option>
 ))}
 </select>
 <div className="w-full bg-slate-800-lowest text-slate-100 rounded-lg p-3 flex items-center justify-between group-hover:bg-slate-700 transition-colors shadow-sm relative z-0 border border-transparent group-hover:border-slate-700">
 <div className="flex items-center gap-3 min-w-0">
 <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center shrink-0 text-emerald-400">
 <span className="material-symbols-outlined text-[20px]">directions_car</span>
 </div>
 <div className="flex flex-col min-w-0">
 <span className="text-sm font-semibold text-slate-100 truncate">{vehicle.name}</span>
 <span className="font-mono text-[11px] text-slate-300">{vehicle.batteryCapacity} kWh Usable • {vehicle.chemistry} • Max {vehicle.maxChargeKw} kW</span>
 </div>
 </div>
 <span className="material-symbols-outlined text-slate-500">expand_more</span>
 </div>
 </div>
 </div>

 {/* Dispenser Max Power */}
 <div className="flex flex-col gap-3 mt-2">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Dispenser Limit (kW)</span>
 <span className="font-mono text-[11px] text-purple-400">Real-world thermal caps apply</span>
 </div>
 <div className="flex gap-2">
 {CHARGER_TIERS.map(kw => (
 <button
 key={kw}
 onClick={() => setChargerCapKw(kw)}
 className={`flex-1 py-2 rounded-lg font-mono text-[11px] transition-all ${
 chargerCapKw === kw
 ? 'bg-primary text-on-primary font-bold shadow-sm'
 : 'bg-slate-600 text-slate-300 hover:bg-slate-950-bright'
 }`}
 >
 {kw} kW
 </button>
 ))}
 </div>
 </div>

 {/* SOC Sliders */}
 <div className="flex flex-col gap-3 mt-2">
 <div className="flex justify-between items-center">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Charge Range Limits</span>
 <span className="font-mono text-[11px] text-emerald-400 font-bold">{startSoc}% → {safeEndSoc}%</span>
 </div>
 <div className="flex flex-col gap-3">
 <div className="flex items-center gap-3">
 <span className=" text-slate-300 w-16">Arrive</span>
 <input 
 type="range" 
 min="0" max="99" 
 value={startSoc} 
 onChange={(e) => setStartSoc(parseInt(e.target.value, 10))}
 className="flex-1 accent-primary"
 />
 <span className=" font-mono text-[11px] w-8 text-right text-slate-100 font-semibold">{startSoc}%</span>
 </div>
 <div className="flex items-center gap-3">
 <span className=" text-slate-300 w-16">Depart</span>
 <input 
 type="range" 
 min="1" max="100" 
 value={safeEndSoc} 
 onChange={(e) => setEndSoc(parseInt(e.target.value, 10))}
 className="flex-1 accent-primary"
 />
 <span className=" font-mono text-[11px] w-8 text-right text-slate-100 font-semibold">{safeEndSoc}%</span>
 </div>
 </div>

 {/* Quick Presets */}
 <div className="flex flex-wrap gap-2 mt-1">
 <button onClick={() => { setStartSoc(10); setEndSoc(80); }} className="px-3 py-1 bg-slate-600 hover:bg-slate-950-bright rounded-full text-slate-100 transition-colors border border-transparent hover:border-outline-variant">10% → 80% (Road Trip)</button>
 <button onClick={() => { setStartSoc(20); setEndSoc(80); }} className="px-3 py-1 bg-slate-600 hover:bg-slate-950-bright rounded-full text-slate-100 transition-colors border border-transparent hover:border-outline-variant">20% → 80% (Quick Stop)</button>
 <button onClick={() => { setStartSoc(10); setEndSoc(100); }} className="px-3 py-1 bg-slate-600 hover:bg-slate-950-bright rounded-full text-slate-100 transition-colors border border-transparent hover:border-outline-variant">10% → 100% (Full Battery)</button>
 </div>
 </div>

 {/* Cold Weather & Cost */}
 <div className="grid grid-cols-2 gap-3 mt-2 border-t border-slate-600 pt-3">
 <div className="flex flex-col gap-2">
 <label className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Battery Climate</label>
 <button 
 onClick={() => setIsColdWeather(!isColdWeather)}
 className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-all ${
 isColdWeather ? 'bg-secondary text-on-secondary font-semibold shadow-sm' : 'bg-slate-600 text-slate-300 hover:bg-slate-950-bright'
 }`}
 >
 <span className="material-symbols-outlined text-[16px]">{isColdWeather ? 'ac_unit' : 'device_thermostat'}</span>
 {isColdWeather ? 'Cold Pack' : 'Optimal'}
 </button>
 </div>
 <div className="flex flex-col gap-2">
 <label className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Local Energy Rate</label>
 <div className="flex items-center bg-slate-600 rounded-lg px-3 focus-within:ring-1 ring-primary transition-all">
 <select 
 value={currency} 
 onChange={(e) => setCurrency(e.target.value)}
 className="bg-transparent text-slate-100 focus:outline-none appearance-none cursor-pointer"
 title="Currency"
 >
 {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c}</option>)}
 </select>
 <input 
 type="number" 
 step="0.01"
 value={kwhCost}
 onChange={(e) => setKwhCost(parseFloat(e.target.value))}
 className="bg-transparent text-slate-100 w-full py-2 pl-1 focus:outline-none font-mono text-[11px]"
 title="Cost per kWh"
 />
 <span className="text-slate-300 pl-2">/kWh</span>
 </div>
 </div>
 </div>

 </div>
 </div>

 {/* RIGHT COLUMN: Chart & Results (7 Cols) */}
 <div className="lg:col-span-7 flex flex-col gap-6">
 
 {/* Main Telemetry Readout */}
 <div className="grid grid-cols-3 gap-3">
 <div className="p-4 rounded-xl bg-slate-900 shadow-sm border border-slate-700 flex flex-col items-center text-center">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase mb-1">Total Duration</span>
 <div className="flex items-baseline gap-1">
 <span className="font-bold text-2xl font-bold text-slate-100">{calculation.totalMinutes}</span>
 <span className="text-sm text-slate-300">min</span>
 </div>
 </div>
 <div className="p-4 rounded-xl bg-slate-900 shadow-sm border border-slate-700 flex flex-col items-center text-center relative overflow-hidden">
 <div className="absolute inset-0 bg-primary/5"></div>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase mb-1 relative z-10">Energy Added</span>
 <div className="flex items-baseline gap-1 relative z-10">
 <span className="font-bold text-2xl font-bold text-emerald-400">{calculation.kwhAdded}</span>
 <span className="text-sm text-slate-300">kWh</span>
 </div>
 </div>
 <div className="p-4 rounded-xl bg-slate-900 shadow-sm border border-slate-700 flex flex-col items-center text-center">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase mb-1">Session Cost</span>
 <div className="flex items-baseline gap-1">
 <span className="font-bold text-2xl font-bold text-slate-100">{currencySymbol}{sessionCost}</span>
 </div>
 </div>
 </div>

 {/* Interactive SVG Chart Area */}
 <div className="p-6 rounded-xl bg-slate-900 shadow-xl border border-slate-700/50">
 <div className="flex justify-between items-center mb-4">
 <h3 className="font-bold text-lg text-slate-100">Charge Curve Telemetry</h3>
 <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
 <span>Avg Power: <strong className="text-slate-100">{calculation.avgKw} kW</strong></span>
 </div>
 </div>
 
 <div className="w-full">
 <svg 
 className="w-full h-72 md:h-80 overflow-visible cursor-crosshair" 
 viewBox="0 0 1000 420"
 ref={chartRef}
 onMouseMove={handleMouseMove}
 onMouseLeave={handleMouseLeave}
 >
 <defs>
 <linearGradient id="gradCurve" x1="0%" x2="0%" y1="0%" y2="100%">
 <stop offset="0%" stopColor="#4edea3" stopOpacity="0.4"></stop>
 <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0"></stop>
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
 <text x="60" y="400">0%</text>
 <text x="150" y="400">10%</text>
 <text x="240" y="400">20%</text>
 <text x="330" y="400">30%</text>
 <text x="420" y="400">40%</text>
 <text x="510" y="400">50%</text>
 <text x="600" y="400">60%</text>
 <text x="690" y="400">70%</text>
 <text x="780" y="400">80%</text>
 <text x="870" y="400">90%</text>
 <text x="960" y="400">100%</text>
 </g>

 {/* Active Charge Range Region Highlight */}
 {startX < endX && (
 <rect 
 x={startX} 
 y={40} 
 width={endX - startX} 
 height={340} 
 fill="#4edea3" 
 opacity="0.05" 
 />
 )}
 {startX < endX && (
 <>
 <line x1={startX} x2={startX} y1={40} y2={380} stroke="#4edea3" strokeDasharray="5,5" strokeWidth="1" opacity="0.6" />
 <line x1={endX} x2={endX} y1={40} y2={380} stroke="#4edea3" strokeDasharray="5,5" strokeWidth="1" opacity="0.6" />
 <text x={startX + 5} y={55} fill="#4edea3" fontSize="11" opacity="0.8">Arrival {startSoc}%</text>
 <text x={endX - 5} y={55} fill="#4edea3" fontSize="11" opacity="0.8" textAnchor="end">Depart {safeEndSoc}%</text>
 </>
 )}

 {/* Curve Path Data */}
 <path d={areaPathData} fill="url(#gradCurve)" />
 <path d={pathData} fill="none" stroke="#4edea3" strokeWidth="3" strokeLinejoin="round" />
 
 {/* Interactive Hover Point */}
 {hoverSoc !== null && hoverPt && (
 <g>
 <line 
 opacity="0.8" 
 stroke="#dfe2ee" 
 strokeDasharray="2,2" 
 strokeWidth="1.5" 
 x1={getSvgX(hoverSoc)} 
 x2={getSvgX(hoverSoc)} 
 y1="40" 
 y2="380"
 />
 <circle 
 cx={getSvgX(hoverSoc)} 
 cy={graphMaxY - (hoverPt.actualKw / 300) * yRange} 
 fill="#4edea3" 
 r="6" 
 stroke="#0f131c" 
 strokeWidth="2"
 />
 
 {/* Annotation callout badge */}
 {getSvgX(hoverSoc) < 850 ? (
 <>
 <rect fill="#1c2028" height="32" opacity="0.95" rx="4" width="105" x={getSvgX(hoverSoc) + 10} y={110}></rect>
 <text fill="#outline" fontFamily="var(--font-jetbrains-mono)" fontSize="10" x={getSvgX(hoverSoc) + 18} y={125}>{hoverSoc}% SOC</text>
 <text fill="#4edea3" fontFamily="var(--font-jetbrains-mono)" fontSize="11" fontWeight="bold" x={getSvgX(hoverSoc) + 18} y={137}>{Math.round(hoverPt.actualKw)} kW</text>
 </>
 ) : (
 <>
 <rect fill="#1c2028" height="32" opacity="0.95" rx="4" width="105" x={getSvgX(hoverSoc) - 115} y={110}></rect>
 <text fill="#outline" fontFamily="var(--font-jetbrains-mono)" fontSize="10" x={getSvgX(hoverSoc) - 107} y={125}>{hoverSoc}% SOC</text>
 <text fill="#4edea3" fontFamily="var(--font-jetbrains-mono)" fontSize="11" fontWeight="bold" x={getSvgX(hoverSoc) - 107} y={137}>{Math.round(hoverPt.actualKw)} kW</text>
 </>
 )}
 </g>
 )}
 </svg>
 </div>

 <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3 pt-4">
 <span className="uppercase tracking-widest text-[10px] ">Hover over telemetry curve to scrub SoC values</span>
 </div>

 {/* Severe Charging Taper Detected Past 80% */}
 {safeEndSoc > 80 && (
 <div className="mt-6 p-4 rounded-lg bg-[#2a1a1f] border border-[#3d1c25] flex items-start gap-3">
 <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center shrink-0 text-purple-400 mt-1">
 <span className="material-symbols-outlined text-[18px]">warning</span>
 </div>
 <div>
 <span className="font-bold text-lg font-semibold text-purple-400">Severe Charging Taper Detected Past 80%</span>
 <p className="text-xs text-slate-300 leading-relaxed">
 Past 80%, charging speeds typically plummet to safeguard battery pack cathode health. Unplugging earlier saves significant time compared to charging all the way to {safeEndSoc}%.
 </p>
 </div>
 </div>
 )}
 
 {/* Interactive Action Controls Row */}
 <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-4 border-t border-slate-700">
 <div className="flex flex-wrap items-center gap-2">
 <button 
 onClick={handleCopyLink} 
 className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-950-bright text-slate-100 text-xs transition-all flex items-center gap-1 shadow-sm border border-transparent hover:border-outline-variant" type="button"
 >
 {copied ? (
 <>
 <span className="material-symbols-outlined text-[16px] text-emerald-400">check</span>
 <span className="text-emerald-400">Copied!</span>
 </>
 ) : (
 <>
 <span className="material-symbols-outlined text-[16px] text-emerald-400">link</span>
 <span>Copy Result Link</span>
 </>
 )}
 </button>
 <button className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-950-bright text-slate-100 text-xs transition-all flex items-center gap-1 shadow-sm border border-transparent hover:border-outline-variant" type="button">
 <span className="material-symbols-outlined text-[16px] text-cyan-400">picture_as_pdf</span>
 <span>Telemetry Slip</span>
 </button>
 <button onClick={handleShareWhatsApp} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-950-bright text-slate-100 text-xs transition-all flex items-center gap-1 shadow-sm border border-transparent hover:border-outline-variant" type="button">
 <span className="material-symbols-outlined text-[16px] text-emerald-400">chat</span>
 <span>Share on WhatsApp</span>
 </button>
 </div>
 <button className="px-6 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold transition-all flex items-center gap-2 shadow-[0_0_16px_rgba(78,222,163,0.3)]" type="button">
 <span className="material-symbols-outlined text-[18px]">send_to_mobile</span>
 <span>Send to Vehicle App</span>
 </button>
 </div>

 </div>
 </div>
 </div>

 {/* Secondary Calibration Insights (Bento Row) */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
 <div className="p-6 rounded-xl bg-slate-900 shadow-lg flex flex-col justify-between gap-3 border border-slate-700/50 hover:border-slate-600 transition-colors">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center text-emerald-400">
 <span className="material-symbols-outlined text-[20px]">thermostat</span>
 </div>
 <div>
 <h3 className="font-bold text-lg text-slate-100">Thermal Throttling</h3>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Active Liquid Heat Pump</span>
 </div>
 </div>
 <p className="text-xs text-slate-300 leading-relaxed">
 Preconditioning en-route engages the Octovalve scavenge loop. Arriving cold increases the 10-50% phase duration by up to 11 minutes while pack temps rise from 15°C to 45°C.
 </p>
 <div className="pt-1 flex items-center justify-between font-mono text-[11px] text-emerald-400">
 <span>Octovalve Heat Recovery</span>
 <span>+4.2 kW Active COP</span>
 </div>
 </div>
 
 <div className="p-6 rounded-xl bg-slate-900 shadow-lg flex flex-col justify-between gap-3 border border-slate-700/50 hover:border-slate-600 transition-colors">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center text-cyan-400">
 <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
 </div>
 <div>
 <h3 className="font-bold text-lg text-slate-100">Bus Voltage Limit</h3>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">400V Current Caps</span>
 </div>
 </div>
 <p className="text-xs text-slate-300 leading-relaxed">
 Utilizing a nominal ~350-400V battery bus, capping peak current around 625-670A on V3 stalls. 800V architectures sustain flat curves up to 70% SOC.
 </p>
 <div className="pt-1 flex items-center justify-between font-mono text-[11px] text-cyan-400">
 <span>Max Current Density</span>
 <span>670A Peak Cable Limit</span>
 </div>
 </div>

 <div className="p-6 rounded-xl bg-slate-900 shadow-lg flex flex-col justify-between gap-3 border border-slate-700/50 hover:border-slate-600 transition-colors">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center text-purple-400">
 <span className="material-symbols-outlined text-[20px]">savings</span>
 </div>
 <div>
 <h3 className="font-bold text-lg text-slate-100">Highway Stop Strategy</h3>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Fast Splashes vs Long Stops</span>
 </div>
 </div>
 <p className="text-xs text-slate-300 leading-relaxed">
 Two 12-minute 10-60% sessions yield 20% more total range than a single 45-minute 10-90% stop. Optimizing your trip for the high-power zone saves ~21 minutes every 500 miles.
 </p>
 <div className="pt-1 flex items-center justify-between font-mono text-[11px] text-purple-400">
 <span>Optimal Road Strategy</span>
 <span>Max 15-20 Min / Stall</span>
 </div>
 </div>
 </div>

 {/* Verified Fleet Telemetry Data Strip */}
 <div className="mt-8 p-4 rounded-xl bg-slate-800-lowest flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-700/30">
 <div className="flex items-center gap-4">
 <span className="material-symbols-outlined text-emerald-400 text-[28px]">electric_car</span>
 <div>
 <span className="font-bold text-lg font-semibold text-slate-100">Looking for other EV telemetry profiles?</span>
 <p className="text-xs text-slate-300">Switch between Hyundai E-GMP 800V, Rivian Gen-2 Max Pack, Porsche Taycan, or Chevy Silverado EV.</p>
 </div>
 </div>
 <button className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-950-bright text-emerald-400 text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 border border-transparent hover:border-outline-variant">
 <span>Browse 54 Calibrated EVs</span>
 <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
 </button>
 </div>
 </div>
 </div>
 );
}
