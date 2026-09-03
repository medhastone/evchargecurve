'use client';

import React, { useState } from 'react';

const curveData = [
 { soc: 0, kw: 150, volts: 375, amps: 400 },
 { soc: 5, kw: 215, volts: 382, amps: 562 },
 { soc: 10, kw: 250, volts: 388, amps: 644 },
 { soc: 15, kw: 250, volts: 390, amps: 641 },
 { soc: 20, kw: 250, volts: 392, amps: 638 },
 { soc: 22, kw: 250, volts: 393, amps: 636 },
 { soc: 30, kw: 218, volts: 395, amps: 551 },
 { soc: 40, kw: 180, volts: 397, amps: 453 },
 { soc: 50, kw: 142, volts: 399, amps: 355 },
 { soc: 60, kw: 110, volts: 401, amps: 274 },
 { soc: 70, kw: 78, volts: 402, amps: 194 },
 { soc: 80, kw: 48, volts: 404, amps: 118 },
 { soc: 90, kw: 30, volts: 406, amps: 73 },
 { soc: 95, kw: 18, volts: 407, amps: 44 },
 { soc: 100, kw: 8, volts: 408, amps: 19 }
];

function getInterpolatedPoint(targetSoc: number) {
 if (targetSoc <= curveData[0].soc) return curveData[0];
 if (targetSoc >= curveData[curveData.length - 1].soc) return curveData[curveData.length - 1];

 for (let i = 0; i < curveData.length - 1; i++) {
 const p1 = curveData[i];
 const p2 = curveData[i + 1];
 if (targetSoc >= p1.soc && targetSoc <= p2.soc) {
 const ratio = (targetSoc - p1.soc) / (p2.soc - p1.soc);
 return {
 soc: targetSoc,
 kw: Math.round((p1.kw + ratio * (p2.kw - p1.kw)) * 10) / 10,
 volts: Math.round(p1.volts + ratio * (p2.volts - p1.volts)),
 amps: Math.round(p1.amps + ratio * (p2.amps - p1.amps))
 };
 }
 }
 return curveData[0];
}

export default function ModelYSpec() {
 const [socVal, setSocVal] = useState(22);
 const [openFaq, setOpenFaq] = useState<number | null>(null);

 const point = getInterpolatedPoint(socVal);
 const svgX = 40 + (point.soc / 100) * 740;
 const svgY = Math.max(40, Math.min(360, 360 - (point.kw / 250) * 320));

 const toggleFaq = (index: number) => {
 setOpenFaq(openFaq === index ? null : index);
 };

 return (
 <div className="flex flex-col w-full animate-fade-in pb-32">
 {/* SEO Telemetry Header Block */}
 <section className="w-full bg-slate-800-lowest px-gutter-desktop py-8">
 <div className="max-w-7xl mx-auto flex flex-col gap-6">
 {/* Breadcrumb Navigation */}
 <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-slate-300 uppercase tracking-widest text-[10px] uppercase tracking-wider">
 <a className="hover:text-emerald-400 transition-colors" href="#">Home</a>
 <span className="text-slate-500">/</span>
 <a className="hover:text-emerald-400 transition-colors" href="#">Charging Curves</a>
 <span className="text-slate-500">/</span>
 <span className="text-slate-500">Tesla</span>
 <span className="text-slate-500">/</span>
 <span className="text-emerald-400 font-bold">Model Y Long Range AWD</span>
 </nav>
 
 {/* Model Identity Title & Subtitle */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-base">
 <div className="flex flex-col gap-2">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 w-fit">
 <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
 <span className="font-mono text-[11px] text-emerald-400">BENCHMARK CALIBRATED • 12,480 SESSIONS</span>
 </div>
 <h1 className="font-headline-xl text-slate-100 tracking-tight">Tesla Model Y Long Range <span className="text-emerald-400">(2020–2024)</span></h1>
 <p className="text-base text-slate-300 max-w-3xl">Official DC fast charge curve profile, thermal taper characteristics, Supercharger V3 performance mapping, and highway road trip optimization telemetry.</p>
 </div>
 <div className="flex items-center gap-3">
 <button className="inline-flex items-center gap-2 px-space-base py-3 rounded-full bg-primary text-on-primary font-bold text-lg hover:opacity-90 transition-opacity shadow-md" type="button">
 <span className="material-symbols-outlined text-[18px]">share</span>
 <span className="uppercase tracking-widest text-[10px] uppercase">Export Curve Raw</span>
 </button>
 </div>
 </div>
 
 {/* Quick Specs Bar */}
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-slate-900 rounded-xl">
 <div className="flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Usable Pack</span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-sm text-slate-100">75.0</span>
 <span className="font-mono text-[11px] text-slate-500">kWh</span>
 </div>
 <span className="text-xs text-slate-300">81.0 kWh Gross Capacity</span>
 </div>
 <div className="flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Architecture</span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-sm text-slate-100">400</span>
 <span className="font-mono text-[11px] text-slate-500">Volts</span>
 </div>
 <span className="text-xs text-slate-300">Max ~400V Nominal Range</span>
 </div>
 <div className="flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Peak DC Rate</span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-sm text-emerald-400">250</span>
 <span className="font-mono text-[11px] text-slate-500">kW</span>
 </div>
 <span className="text-xs text-slate-300">Supercharger V3 / V4</span>
 </div>
 <div className="flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Chemistry</span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-xs text-slate-100">LG / Panasonic</span>
 </div>
 <span className="text-xs text-slate-300">NMC 2170 Cylindrical</span>
 </div>
 <div className="flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Protocol</span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-xs text-cyan-400">NACS native</span>
 </div>
 <span className="text-xs text-slate-300">CCS1 via OEM Adapter</span>
 </div>
 </div>
 </div>
 </section>

 {/* Interactive Telemetry Section: Visualized Curve & Simulator Snapshot */}
 <section className="w-full px-gutter-desktop py-12">
 <div className="max-w-7xl mx-auto flex flex-col gap-8">
 {/* Section Header */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
 <div>
 <span className="uppercase tracking-widest text-[10px] text-emerald-400 uppercase tracking-widest">Interactive Telemetry Lab</span>
 <h2 className="font-bold text-2xl text-slate-100">V3 Supercharger DC Curve Mapping</h2>
 </div>
 <div className="flex items-center gap-3 bg-slate-900 p-2 rounded-full">
 <span className="px-3 py-1 rounded-full bg-slate-700 text-emerald-400 font-mono text-[11px] ">V3 Stall (250 kW)</span>
 <span className="px-3 py-1 rounded-full text-slate-300 font-mono text-[11px] ">Preconditioned @ 38°C</span>
 </div>
 </div>
 
 {/* Bento Grid: Interactive Graph + Snapshot Telemetry Cards */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 {/* Main Interactive Graph Container (8 cols) */}
 <div className="lg:col-span-8 bg-slate-800 p-6 rounded-xl flex flex-col gap-6 shadow-xl relative overflow-hidden">
 {/* Live Cursor Readout Ribbon */}
 <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800-lowest p-4 rounded-lg">
 <div className="flex items-center gap-6">
 <div>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">STATE OF CHARGE</span>
 <span className="font-label-numeric-hero text-slate-100">{point.soc}%</span>
 </div>
 <div>
 <span className="uppercase tracking-widest text-[10px] text-slate-500 block">INSTANT POWER</span>
 <div className="flex items-baseline gap-1">
 <span className="font-label-numeric-hero text-emerald-400">{point.kw.toFixed(1)}</span>
 <span className="font-mono text-[11px] text-slate-500">kW</span>
 </div>
 </div>
 </div>
 <div className="flex items-center gap-4 font-mono text-[11px] ">
 <div className="flex items-center gap-2">
 <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
 <span className="text-slate-300">Voltage: <strong className="text-slate-100 font-semibold">{point.volts} V</strong></span>
 </div>
 <div className="flex items-center gap-2">
 <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
 <span className="text-slate-300">Amps: <strong className="text-slate-100 font-semibold">{point.amps} A</strong></span>
 </div>
 </div>
 </div>
 
 {/* Curve Canvas Container (SVG) */}
 <div className="relative w-full aspect-[16/9] min-h-[300px] flex items-center justify-center bg-slate-800-lowest/60 rounded-lg p-space-base overflow-hidden">
 <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 800 400">
 <defs>
 <linearGradient id="curveGradient" x1="0%" x2="0%" y1="0%" y2="100%">
 <stop offset="0%" stopColor="#4edea3" stopOpacity="0.35"></stop>
 <stop offset="60%" stopColor="#4edea3" stopOpacity="0.08"></stop>
 <stop offset="100%" stopColor="#4edea3" stopOpacity="0"></stop>
 </linearGradient>
 <linearGradient id="lineGlow" x1="0%" x2="100%" y1="0%" y2="0%">
 <stop offset="0%" stopColor="#4edea3"></stop>
 <stop offset="45%" stopColor="#89ceff"></stop>
 <stop offset="85%" stopColor="#ffb95f"></stop>
 <stop offset="100%" stopColor="#ffb4ab"></stop>
 </linearGradient>
 </defs>
 
 {/* Grid Horizontal */}
 <line stroke="#31353e" strokeDasharray="3,3" strokeWidth="1" x1="40" x2="780" y1="40" y2="40"></line>
 <line stroke="#31353e" strokeDasharray="3,3" strokeWidth="1" x1="40" x2="780" y1="104" y2="104"></line>
 <line stroke="#31353e" strokeDasharray="3,3" strokeWidth="1" x1="40" x2="780" y1="168" y2="168"></line>
 <line stroke="#31353e" strokeDasharray="3,3" strokeWidth="1" x1="40" x2="780" y1="232" y2="232"></line>
 <line stroke="#31353e" strokeDasharray="3,3" strokeWidth="1" x1="40" x2="780" y1="296" y2="296"></line>
 <line stroke="#31353e" strokeWidth="1.5" x1="40" x2="780" y1="360" y2="360"></line>
 
 {/* Grid Vertical */}
 <line stroke="#1c2028" strokeDasharray="4,4" strokeWidth="1" x1="114" x2="114" y1="40" y2="360"></line>
 <line stroke="#1c2028" strokeDasharray="4,4" strokeWidth="1" x1="188" x2="188" y1="40" y2="360"></line>
 <line stroke="#1c2028" strokeDasharray="4,4" strokeWidth="1" x1="336" x2="336" y1="40" y2="360"></line>
 <line stroke="#1c2028" strokeDasharray="4,4" strokeWidth="1" x1="484" x2="484" y1="40" y2="360"></line>
 <line stroke="#1c2028" strokeDasharray="4,4" strokeWidth="1" x1="632" x2="632" y1="40" y2="360"></line>
 <line stroke="#1c2028" strokeDasharray="4,4" strokeWidth="1" x1="780" x2="780" y1="40" y2="360"></line>
 
 {/* Area Fill */}
 <path d="M 40 360 L 40 168 Q 77 78, 114 40 L 203 40 C 277 55, 300 110, 336 130 C 410 170, 447 205, 484 219 C 558 248, 595 285, 632 298 C 685 315, 743 337, 780 350 L 780 360 Z" fill="url(#curveGradient)"></path>
 <path d="M 40 168 Q 77 78, 114 40 L 203 40 C 277 55, 300 110, 336 130 C 410 170, 447 205, 484 219 C 558 248, 595 285, 632 298 C 685 315, 743 337, 780 350" fill="none" stroke="url(#lineGlow)" strokeLinecap="round" strokeWidth="3.5"></path>
 
 {/* Key Data Point Markers */}
 <circle cx="203" cy="40" fill="#4edea3" r="5" stroke="#0f131c" strokeWidth="2"></circle>
 <circle cx="336" cy="130" fill="#89ceff" r="5" stroke="#0f131c" strokeWidth="2"></circle>
 <circle cx="484" cy="219" fill="#89ceff" r="5" stroke="#0f131c" strokeWidth="2"></circle>
 <circle cx="632" cy="298" fill="#ffb95f" r="5" stroke="#0f131c" strokeWidth="2"></circle>
 <circle cx="780" cy="350" fill="#ffb4ab" r="4" stroke="#0f131c" strokeWidth="2"></circle>
 
 {/* Interactive Cursor Line */}
 <line stroke="#dfe2ee" strokeDasharray="2,2" strokeWidth="1.5" x1={svgX} x2={svgX} y1="40" y2="360"></line>
 <circle cx={svgX} cy={svgY} fill="#4edea3" r="7" stroke="#0f131c" strokeWidth="3"></circle>
 </svg>
 
 {/* Y-Axis labels */}
 <div className="absolute left-2 top-4 bottom-8 flex flex-col justify-between font-mono text-[11px] text-slate-500 pointer-events-none">
 <span>250kW</span>
 <span>200kW</span>
 <span>150kW</span>
 <span>100kW</span>
 <span>50kW</span>
 <span>0kW</span>
 </div>
 {/* X-Axis SoC Labels */}
 <div className="absolute left-10 right-4 bottom-1 flex justify-between font-mono text-[11px] text-slate-500 pointer-events-none">
 <span>0%</span>
 <span>10%</span>
 <span>20%</span>
 <span>40%</span>
 <span>60%</span>
 <span>80%</span>
 <span>100%</span>
 </div>
 </div>
 
 {/* Interactive SoC Slider Scrub Track */}
 <div className="flex flex-col gap-2">
 <div className="flex items-center justify-between uppercase tracking-widest text-[10px] text-slate-500">
 <span>Scrub State of Charge (SoC)</span>
 <span className="text-emerald-400 font-bold">10% - 22% Peak Window</span>
 </div>
 <input 
 className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary focus:outline-none" 
 max="100" min="0" type="range" 
 value={socVal}
 onChange={(e) => setSocVal(parseInt(e.target.value, 10) || 0)}
 />
 <div className="flex justify-between text-xs text-slate-300">
 <span>0% (Cold pack safe ramp)</span>
 <span>22% (Taper start threshold)</span>
 <span>80% (Extreme voltage clamp)</span>
 <span>100%</span>
 </div>
 </div>
 </div>
 
 {/* Session Snapshot & Simulator Spec Card (4 cols) */}
 <div className="lg:col-span-4 flex flex-col gap-4">
 <div className="bg-slate-800 p-6 rounded-xl flex flex-col gap-4 shadow-lg">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Golden Session Benchmark</span>
 <span className="material-symbols-outlined text-emerald-400 text-[20px]">bolt</span>
 </div>
 <div className="flex flex-col gap-1">
 <span className="text-sm text-slate-300">10% &rarr; 80% Fast Session</span>
 <div className="flex items-baseline gap-2">
 <span className="font-label-numeric-hero text-slate-100">27</span>
 <span className="font-bold text-lg text-slate-500">MINUTES</span>
 </div>
 </div>
 {/* Visual Progress Bar for Highway Standard */}
 <div className="w-full bg-slate-800-lowest h-3 rounded-full overflow-hidden flex">
 <div className="bg-primary h-full transition-all duration-300" style={{ width: '70%' }}></div>
 <div className="bg-slate-700 h-full" style={{ width: '30%' }}></div>
 </div>
 <div className="grid grid-cols-2 gap-3 pt-2">
 <div className="bg-slate-900 p-3 rounded-lg flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Energy Transferred</span>
 <span className="font-mono text-xs text-slate-100">52.5 kWh</span>
 </div>
 <div className="bg-slate-900 p-3 rounded-lg flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Highway Range</span>
 <span className="font-mono text-xs text-emerald-400">+217 mi</span>
 </div>
 <div className="bg-slate-900 p-3 rounded-lg flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Session Avg Power</span>
 <span className="font-mono text-xs text-slate-100">116.6 kW</span>
 </div>
 <div className="bg-slate-900 p-3 rounded-lg flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Peak Sustained</span>
 <span className="font-mono text-xs text-cyan-400">250 kW</span>
 </div>
 </div>
 </div>
 
 {/* Quick Telemetry Context Insight */}
 <div className="bg-slate-800 p-6 rounded-xl flex flex-col gap-3">
 <div className="flex items-center gap-2 text-purple-400">
 <span className="material-symbols-outlined text-[18px]">thermostat</span>
 <span className="uppercase tracking-widest text-[10px] uppercase font-semibold">Thermal &amp; Precondition Rule</span>
 </div>
 <p className="text-xs text-slate-300 leading-relaxed">
 Model Y packs mandate cell temps around <strong className="text-slate-100">38&deg;C to 45&deg;C</strong> to trigger the initial 250 kW burst. If navigating to non-Tesla chargers without manual battery preconditioning, expect a peak lock below <strong className="text-slate-100">75 kW</strong> for the first 10 minutes.
 </p>
 </div>
 
 {/* Model Y Spec Card Quick Access */}
 <div className="bg-slate-900 p-4 rounded-xl flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-emerald-400">
 <span className="material-symbols-outlined text-[22px]">tune</span>
 </div>
 <div className="flex flex-col">
 <span className="font-bold text-lg text-slate-100">Custom Simulator</span>
 <span className="text-xs text-slate-300">Adjust SoC, ambient temp &amp; costs</span>
 </div>
 </div>
 <button className="p-3 rounded-full bg-slate-700 hover:bg-primary hover:text-on-primary text-slate-100 transition-colors">
 <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
 </button>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Editorial & Telemetry: Speed Taper Breakdown Table */}
 <section className="w-full bg-slate-900 px-gutter-desktop py-12">
 <div className="max-w-7xl mx-auto flex flex-col gap-8">
 <div className="flex flex-col gap-2">
 <span className="uppercase tracking-widest text-[10px] text-emerald-400 uppercase tracking-widest">Phase-by-Phase Telemetry</span>
 <h2 className="font-bold text-2xl text-slate-100">Speed Taper Breakdown: Where Does Time Go?</h2>
 <p className="text-sm text-slate-300 max-w-3xl">Understanding the 3 distinct phases of the Tesla Model Y 400V charge profile. Charging beyond 80% requires disproportionate dwell times due to internal cell chemistry stabilization.</p>
 </div>
 
 <div className="overflow-x-auto">
 <div className="min-w-[760px] bg-slate-800 rounded-xl overflow-hidden shadow-lg">
 {/* Table Header */}
 <div className="grid grid-cols-12 gap-space-base p-space-base bg-slate-700 uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">
 <div className="col-span-4">Charge Phase &amp; Range Band</div>
 <div className="col-span-2">Session Duration</div>
 <div className="col-span-2">Average Rate</div>
 <div className="col-span-2">Miles Added</div>
 <div className="col-span-2 text-right">Road Trip Strategy</div>
 </div>
 
 {/* Row 1: Fast Splash */}
 <div className="grid grid-cols-12 gap-space-base p-space-base items-center bg-slate-800 hover:bg-slate-600 transition-colors">
 <div className="col-span-4 flex flex-col">
 <span className="font-bold text-lg text-slate-100">10% &rarr; 50%</span>
 <span className="text-xs text-emerald-400">The Fast Splash</span>
 </div>
 <div className="col-span-2 font-mono text-sm text-slate-100">
 12 <span className="text-xs text-slate-500">mins</span>
 </div>
 <div className="col-span-2 font-mono text-xs text-emerald-400 font-bold">
 208 kW
 </div>
 <div className="col-span-2 font-mono text-xs text-slate-100">
 +124 mi
 </div>
 <div className="col-span-2 flex justify-end">
 <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container text-on-primary-container uppercase tracking-widest text-[10px] uppercase font-bold">
 Optimal Highway Stop
 </span>
 </div>
 </div>
 
 {/* Row 2: Mid Taper */}
 <div className="grid grid-cols-12 gap-space-base p-space-base items-center bg-slate-900 hover:bg-slate-600 transition-colors">
 <div className="col-span-4 flex flex-col">
 <span className="font-bold text-lg text-slate-100">50% &rarr; 80%</span>
 <span className="text-xs text-cyan-400">Mid Taper Phase</span>
 </div>
 <div className="col-span-2 font-mono text-sm text-slate-100">
 15 <span className="text-xs text-slate-500">mins</span>
 </div>
 <div className="col-span-2 font-mono text-xs text-cyan-400 font-bold">
 96 kW
 </div>
 <div className="col-span-2 font-mono text-xs text-slate-100">
 +93 mi
 </div>
 <div className="col-span-2 flex justify-end">
 <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container uppercase tracking-widest text-[10px] uppercase font-bold">
 Standard Road Trip
 </span>
 </div>
 </div>
 
 {/* Row 3: Severe Thermal Taper */}
 <div className="grid grid-cols-12 gap-space-base p-space-base items-center bg-slate-800 hover:bg-slate-600 transition-colors">
 <div className="col-span-4 flex flex-col">
 <span className="font-bold text-lg text-slate-100">80% &rarr; 100%</span>
 <span className="text-xs text-purple-400">Severe Thermal / Voltage Taper</span>
 </div>
 <div className="col-span-2 font-mono text-sm text-error">
 32 <span className="text-xs text-slate-500">mins</span>
 </div>
 <div className="col-span-2 font-mono text-xs text-error font-bold">
 24 kW
 </div>
 <div className="col-span-2 font-mono text-xs text-slate-100">
 +62 mi
 </div>
 <div className="col-span-2 flex justify-end">
 <span className="inline-flex items-center px-3 py-1 rounded-full bg-error-container text-on-error-container uppercase tracking-widest text-[10px] uppercase font-bold">
 Avoid On Road Trips
 </span>
 </div>
 </div>
 
 {/* Row 4: Summary Totals & Contrast */}
 <div className="grid grid-cols-12 gap-space-base p-6 items-center bg-slate-600">
 <div className="col-span-6 flex flex-col gap-1">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase font-semibold">Key Highway Takeaway</span>
 <span className="text-sm text-slate-100">
 Charging from <strong>80% to 100% (32 mins)</strong> takes longer than going from <strong>10% to 80% (27 mins)</strong> while yielding under half the range.
 </span>
 </div>
 <div className="col-span-3 flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">10% &rarr; 80% Total</span>
 <span className="font-mono text-sm text-emerald-400">27 mins (+217 mi)</span>
 </div>
 <div className="col-span-3 flex flex-col">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">10% &rarr; 100% Total</span>
 <span className="font-mono text-sm text-slate-500">59 mins (+279 mi)</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Comparative Benchmarks Matrix (Direct Competitors) */}
 <section className="w-full px-gutter-desktop py-12">
 <div className="max-w-7xl mx-auto flex flex-col gap-8">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-base">
 <div className="flex flex-col gap-2">
 <span className="uppercase tracking-widest text-[10px] text-emerald-400 uppercase tracking-widest">Segment Benchmark</span>
 <h2 className="font-bold text-2xl text-slate-100">Model Y Long Range vs Direct Segment Competitors</h2>
 <p className="text-sm text-slate-300 max-w-2xl">Standardized 10% to 80% DC fast charge duration comparing 400V vs 800V class electric crossovers.</p>
 </div>
 <div className="font-mono text-[11px] text-slate-500">
 Metric: Ideal Ambient (23&deg;C) Preconditioned
 </div>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {/* Tesla Model Y LR (Target) */}
 <div className="bg-slate-800 p-6 rounded-xl flex flex-col justify-between shadow-xl relative overflow-hidden">
 <div className="flex flex-col gap-4">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-emerald-400 uppercase font-bold">This Vehicle</span>
 <span className="px-2 py-1 rounded bg-slate-700 text-emerald-400 font-mono text-[11px] ">400V System</span>
 </div>
 <div className="flex flex-col">
 <h3 className="font-bold text-xl text-slate-100">Tesla Model Y LR</h3>
 <span className="text-xs text-slate-300">75 kWh Usable Pack</span>
 </div>
 <div className="flex items-baseline gap-2 my-3">
 <span className="font-label-numeric-hero text-slate-100">27</span>
 <span className="font-bold text-lg text-slate-500">MINS</span>
 </div>
 <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
 <div className="bg-primary h-full" style={{ width: '66%' }}></div>
 </div>
 <div className="flex flex-col gap-1 text-xs text-slate-300 pt-2">
 <div className="flex justify-between">
 <span>Peak DC Power:</span>
 <span className="font-mono text-[11px] text-slate-100 font-semibold">250 kW</span>
 </div>
 <div className="flex justify-between">
 <span>Curve Style:</span>
 <span className="text-xs text-emerald-400">High Peak, Steep Taper</span>
 </div>
 </div>
 </div>
 <div className="mt-4 pt-3 bg-slate-900 p-3 rounded-lg text-xs text-slate-300">
 Fastest 10-30% burst in segment, but steep drop-off after 50%.
 </div>
 </div>
 
 {/* Hyundai Ioniq 5 AWD */}
 <div className="bg-slate-900 p-6 rounded-xl flex flex-col justify-between shadow-md">
 <div className="flex flex-col gap-4">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-cyan-400 uppercase font-bold">Flat Curve Winner</span>
 <span className="px-2 py-1 rounded bg-slate-700 text-cyan-400 font-mono text-[11px] ">800V E-GMP</span>
 </div>
 <div className="flex flex-col">
 <h3 className="font-bold text-xl text-slate-100">Hyundai Ioniq 5 AWD</h3>
 <span className="text-xs text-slate-300">77.4 kWh Usable Pack</span>
 </div>
 <div className="flex items-baseline gap-2 my-3">
 <span className="font-label-numeric-hero text-cyan-400">18</span>
 <span className="font-bold text-lg text-slate-500">MINS</span>
 </div>
 <div className="w-full bg-slate-800-lowest h-2 rounded-full overflow-hidden">
 <div className="bg-secondary h-full" style={{ width: '44%' }}></div>
 </div>
 <div className="flex flex-col gap-1 text-xs text-slate-300 pt-2">
 <div className="flex justify-between">
 <span>Peak DC Power:</span>
 <span className="font-mono text-[11px] text-slate-100 font-semibold">235 kW</span>
 </div>
 <div className="flex justify-between">
 <span>Curve Style:</span>
 <span className="text-xs text-cyan-400">Flat Plateau (to 75%)</span>
 </div>
 </div>
 </div>
 <div className="mt-4 pt-3 bg-slate-800 p-3 rounded-lg text-xs text-slate-300">
 Saves 9 mins over Model Y on 350 kW CCS hardware due to 800V plateau.
 </div>
 </div>
 
 {/* Ford Mustang Mach-E ER */}
 <div className="bg-slate-900 p-6 rounded-xl flex flex-col justify-between shadow-md">
 <div className="flex flex-col gap-4">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase font-bold">Early Taper</span>
 <span className="px-2 py-1 rounded bg-slate-700 text-slate-500 font-mono text-[11px] ">400V System</span>
 </div>
 <div className="flex flex-col">
 <h3 className="font-bold text-xl text-slate-100">Mach-E Ext Range</h3>
 <span className="text-xs text-slate-300">91 kWh Usable Pack</span>
 </div>
 <div className="flex items-baseline gap-2 my-3">
 <span className="font-label-numeric-hero text-slate-500">36</span>
 <span className="font-bold text-lg text-slate-500">MINS</span>
 </div>
 <div className="w-full bg-slate-800-lowest h-2 rounded-full overflow-hidden">
 <div className="bg-outline h-full" style={{ width: '88%' }}></div>
 </div>
 <div className="flex flex-col gap-1 text-xs text-slate-300 pt-2">
 <div className="flex justify-between">
 <span>Peak DC Power:</span>
 <span className="font-mono text-[11px] text-slate-100 font-semibold">150 kW</span>
 </div>
 <div className="flex justify-between">
 <span>Curve Style:</span>
 <span className="text-xs text-slate-500">Conservative Step Taper</span>
 </div>
 </div>
 </div>
 <div className="mt-4 pt-3 bg-slate-800 p-3 rounded-lg text-xs text-slate-300">
 9 minutes slower than Model Y; drops to ~105 kW early at 45% SoC.
 </div>
 </div>
 
 {/* Rivian R1S Dual Large */}
 <div className="bg-slate-900 p-6 rounded-xl flex flex-col justify-between shadow-md">
 <div className="flex flex-col gap-4">
 <div className="flex items-center justify-between">
 <span className="uppercase tracking-widest text-[10px] text-purple-400 uppercase font-bold">Heavy Capacity</span>
 <span className="px-2 py-1 rounded bg-slate-700 text-purple-400 font-mono text-[11px] ">400V System</span>
 </div>
 <div className="flex flex-col">
 <h3 className="font-bold text-xl text-slate-100">Rivian R1S Dual</h3>
 <span className="text-xs text-slate-300">109 kWh Usable Pack</span>
 </div>
 <div className="flex items-baseline gap-2 my-3">
 <span className="font-label-numeric-hero text-purple-400">34</span>
 <span className="font-bold text-lg text-slate-500">MINS</span>
 </div>
 <div className="w-full bg-slate-800-lowest h-2 rounded-full overflow-hidden">
 <div className="bg-tertiary h-full" style={{ width: '82%' }}></div>
 </div>
 <div className="flex flex-col gap-1 text-xs text-slate-300 pt-2">
 <div className="flex justify-between">
 <span>Peak DC Power:</span>
 <span className="font-mono text-[11px] text-slate-100 font-semibold">215 kW</span>
 </div>
 <div className="flex justify-between">
 <span>Curve Style:</span>
 <span className="text-xs text-purple-400">Linear Thermal Roll-off</span>
 </div>
 </div>
 </div>
 <div className="mt-4 pt-3 bg-slate-800 p-3 rounded-lg text-xs text-slate-300">
 Larger pack requires more raw kilowatt-hours to hit 80% mark.
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Editorial Insight Banner: The 250 kW Reality */}
 <section className="w-full px-gutter-desktop py-6">
 <div className="max-w-7xl mx-auto bg-slate-800 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
 <div className="flex flex-col gap-3 max-w-2xl">
 <div className="flex items-center gap-2 text-emerald-400">
 <span className="material-symbols-outlined text-[20px]">science</span>
 <span className="uppercase tracking-widest text-[10px] uppercase font-bold">Engineering Telemetry Note</span>
 </div>
 <h3 className="font-bold text-xl text-slate-100">Why the Model Y doesn&apos;t hold 250 kW to 50%</h3>
 <p className="text-sm text-slate-300 leading-relaxed">
 The 2170 nickel-manganese-cobalt cell layout in the Long Range pack faces thermal dissipation limits at current densities above 600 Amps. Tesla&apos;s Battery Management System allows maximum current draw only while cell voltage is below 3.9V (typically 10% to 22% SoC). As the pack approaches 4.1V per cell, power is proactively tapered to prevent lithium plating and accelerated cathode degradation.
 </p>
 </div>
 <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-700 shrink-0 text-center">
 <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase">Average Power (10-80%)</span>
 <span className="font-label-numeric-hero text-emerald-400">116.6</span>
 <span className="font-bold text-lg text-slate-100">kW Session Real Average</span>
 <span className="text-xs text-slate-300 mt-2">Not the advertised 250 kW peak</span>
 </div>
 </div>
 </section>

 {/* FAQ Accordion Section (Programmatic SEO + Schema.org Structured Data) */}
 <section className="w-full bg-slate-800-lowest px-gutter-desktop py-12">
 <div className="max-w-4xl mx-auto flex flex-col gap-8">
 <div className="flex flex-col gap-2 text-center items-center">
 <span className="uppercase tracking-widest text-[10px] text-emerald-400 uppercase tracking-widest">Knowledge Base &amp; FAQ</span>
 <h2 className="font-bold text-2xl text-slate-100">Tesla Model Y Fast Charging FAQs</h2>
 <p className="text-sm text-slate-300">Validated telemetry answers for Model Y drivers and road trippers.</p>
 </div>
 
 <div className="flex flex-col gap-4">
 {/* FAQ 1 */}
 <div className="bg-slate-800 rounded-xl overflow-hidden shadow-sm">
 <button 
 className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-700 transition-colors" 
 type="button"
 onClick={() => toggleFaq(1)}
 >
 <span className="font-bold text-lg text-slate-100">What is the fastest charger for a Tesla Model Y Long Range?</span>
 <span className={`material-symbols-outlined text-slate-500 transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`}>expand_more</span>
 </button>
 {openFaq === 1 && (
 <div className="px-6 pb-6 flex flex-col gap-3 text-sm text-slate-300 border-none">
 <p>
 The fastest charger for the Tesla Model Y Long Range is a <strong className="text-slate-100">Tesla Supercharger V3 or V4</strong> rated at 250 kW (500V / 600A+ capability). At a V3 dispenser with a preconditioned battery, the Model Y pulls its maximum rated 250 kW peak from 10% to roughly 22% State of Charge.
 </p>
 <p>
 Older Supercharger V2 stalls are capped at 150 kW and share power between A/B stall pairs, resulting in typical 10% to 80% times of 38 to 44 minutes instead of the 27 minutes achieved on V3.
 </p>
 </div>
 )}
 </div>
 
 {/* FAQ 2 */}
 <div className="bg-slate-800 rounded-xl overflow-hidden shadow-sm">
 <button 
 className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-700 transition-colors" 
 type="button"
 onClick={() => toggleFaq(2)}
 >
 <span className="font-bold text-lg text-slate-100">Why does Model Y charging speed drop so much after 80%?</span>
 <span className={`material-symbols-outlined text-slate-500 transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`}>expand_more</span>
 </button>
 {openFaq === 2 && (
 <div className="px-6 pb-6 flex flex-col gap-3 text-sm text-slate-300 border-none">
 <p>
 The drop in charging speed above 80% is caused by the electrochemical transition from <strong className="text-slate-100">Constant Current (CC)</strong> mode to <strong className="text-slate-100">Constant Voltage (CV)</strong> mode.
 </p>
 <p>
 As the cells reach maximum rated terminal voltage (~4.2V), the Battery Management System (BMS) must dial down the amperage to avoid overvolting the cathode and causing irreversible metallic lithium plating. Charging from 80% to 100% takes approximately 32 minutes, delivering only 62 miles of extra range.
 </p>
 </div>
 )}
 </div>
 
 {/* FAQ 3 */}
 <div className="bg-slate-800 rounded-xl overflow-hidden shadow-sm">
 <button 
 className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-700 transition-colors" 
 type="button"
 onClick={() => toggleFaq(3)}
 >
 <span className="font-bold text-lg text-slate-100">Does cold weather significantly slow down Model Y fast charging?</span>
 <span className={`material-symbols-outlined text-slate-500 transition-transform ${openFaq === 3 ? 'rotate-180' : ''}`}>expand_more</span>
 </button>
 {openFaq === 3 && (
 <div className="px-6 pb-6 flex flex-col gap-3 text-sm text-slate-300 border-none">
 <p>
 Yes. Lithium-ion internal resistance skyrockets at temperatures below 15&deg;C (59&deg;F). Without preconditioning, a cold battery pack plugged into a 250 kW charger may initially accept as little as <strong className="text-slate-100">40 to 65 kW</strong> while the vehicle runs its heat pump and motor stators to generate waste heat.
 </p>
 <p>
 Always input your Supercharger destination into the onboard Tesla navigation 30 to 45 minutes ahead of time to allow full pack preconditioning to 38&deg;C.
 </p>
 </div>
 )}
 </div>
 
 {/* FAQ 4 */}
 <div className="bg-slate-800 rounded-xl overflow-hidden shadow-sm">
 <button 
 className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-700 transition-colors" 
 type="button"
 onClick={() => toggleFaq(4)}
 >
 <span className="font-bold text-lg text-slate-100">Can Model Y charge at 350 kW CCS / Electrify America stations?</span>
 <span className={`material-symbols-outlined text-slate-500 transition-transform ${openFaq === 4 ? 'rotate-180' : ''}`}>expand_more</span>
 </button>
 {openFaq === 4 && (
 <div className="px-6 pb-6 flex flex-col gap-3 text-sm text-slate-300 border-none">
 <p>
 Yes, using an official Tesla CCS Combo 1 Adapter (or NACS retrofitted stalls). However, it will <strong className="text-slate-100">not exceed 250 kW</strong>. 
 </p>
 <p>
 The 350 kW rating of CCS stations is calculated at 800V/900V (350A to 500A). Because the Model Y operates on a ~400V battery architecture, the max power it can extract from a 500-Amp CCS dispenser is approximately 400V &times; 500A &approx; 200 to 220 kW.
 </p>
 </div>
 )}
 </div>
 </div>
 </div>
 </section>
 </div>
 );
}
