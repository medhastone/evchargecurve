'use client';

import React from 'react';

export function BreakerContinuousLoadSvg() {
  return (
    <figure className="my-8 rounded-2xl bg-[#131B2A] border border-slate-800 p-4 sm:p-6 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
            Technical Infographic
          </span>
          <h4 className="text-base font-bold text-white">
            NEC 80% Rule: Breaker Size vs. Safe EV Charging Continuous Load
          </h4>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md font-mono">
          NEC Article 625 (Continuous Duty)
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg 
          viewBox="0 0 840 380" 
          className="w-full h-auto min-w-[650px] font-sans"
          aria-label="Diagram showing circuit breaker capacities and the NEC 80% rule for EV chargers"
          role="img"
        >
          <defs>
            <linearGradient id="breakerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="840" height="380" fill="#0B0F19" rx="8" />
          <rect width="840" height="380" fill="url(#grid)" rx="8" />

          {/* Axes */}
          <line x1="120" y1="320" x2="780" y2="320" stroke="#475569" strokeWidth="2" />
          <line x1="120" y1="40" x2="120" y2="320" stroke="#475569" strokeWidth="2" />

          {/* X Axis Labels (Breaker Size) */}
          <text x="220" y="345" fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle">20A Breaker</text>
          <text x="400" y="345" fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle">40A Breaker</text>
          <text x="580" y="345" fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle">50A Breaker</text>
          <text x="760" y="345" fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle">60A Breaker</text>

          {/* Y Axis Labels (Amperage) */}
          <text x="100" y="325" fill="#94a3b8" fontSize="14" textAnchor="end">0A</text>
          <text x="100" y="225" fill="#94a3b8" fontSize="14" textAnchor="end">16A</text>
          <text x="100" y="125" fill="#94a3b8" fontSize="14" textAnchor="end">32A</text>
          <text x="100" y="75" fill="#94a3b8" fontSize="14" textAnchor="end">40A</text>
          <text x="100" y="45" fill="#94a3b8" fontSize="14" textAnchor="end">48A</text>

          {/* Horizontal Reference Lines */}
          <line x1="120" y1="220" x2="780" y2="220" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="120" y1="120" x2="780" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="120" y1="70" x2="780" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="120" y1="40" x2="780" y2="40" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

          {/* Bars */}
          {/* 20A Breaker / 16A continuous */}
          <rect x="180" y="220" width="80" height="100" rx="4" fill="url(#loadGrad)" />
          <rect x="180" y="195" width="80" height="25" rx="4" fill="url(#breakerGrad)" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" strokeDasharray="2 2" />
          <text x="220" y="210" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">16A LOAD</text>
          <text x="220" y="185" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">20A MAX</text>

          {/* 40A Breaker / 32A continuous */}
          <rect x="360" y="120" width="80" height="200" rx="4" fill="url(#loadGrad)" />
          <rect x="360" y="70" width="80" height="50" rx="4" fill="url(#breakerGrad)" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" strokeDasharray="2 2" />
          <text x="400" y="110" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">32A LOAD</text>
          <text x="400" y="60" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">40A MAX</text>

          {/* 50A Breaker / 40A continuous */}
          <rect x="540" y="70" width="80" height="250" rx="4" fill="url(#loadGrad)" />
          <rect x="540" y="20" width="80" height="50" rx="4" fill="url(#breakerGrad)" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" strokeDasharray="2 2" />
          <text x="580" y="60" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">40A LOAD</text>
          <text x="580" y="10" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">50A MAX</text>

          {/* 60A Breaker / 48A continuous */}
          <rect x="720" y="40" width="80" height="280" rx="4" fill="url(#loadGrad)" />
          <rect x="720" y="-10" width="80" height="50" rx="4" fill="url(#breakerGrad)" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" strokeDasharray="2 2" />
          <text x="760" y="30" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">48A LOAD</text>
          <text x="760" y="-20" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">60A MAX</text>

          {/* Legend */}
          <rect x="140" y="20" width="16" height="16" rx="2" fill="url(#loadGrad)" />
          <text x="165" y="33" fill="#cbd5e1" fontSize="12">80% Continuous EV Load</text>

          <rect x="140" y="45" width="16" height="16" rx="2" fill="url(#breakerGrad)" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="165" y="58" fill="#cbd5e1" fontSize="12">Circuit Breaker Rating (100%)</text>
        </svg>
      </div>
    </figure>
  );
}

/**
 * 1. Charging Tier Comparison Infographic SVG

 * Illustrates Level 1 vs Level 2 vs 50kW DC vs 350kW DC with visual speedometers & telemetry
 */
export function ChargingSpeedComparisonSvg() {
  return (
    <figure className="my-8 rounded-2xl bg-[#131B2A] border border-slate-800 p-4 sm:p-6 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
            Technical Infographic #1
          </span>
          <h4 className="text-base font-bold text-white">
            EV Charging Tiers: Power Output &amp; Speed Comparison
          </h4>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md font-mono">
          Based on 60 kWh Pack (20% &rarr; 80%)
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg 
          viewBox="0 0 840 420" 
          className="w-full h-auto min-w-[650px] font-sans"
          aria-label="Comparison diagram showing Level 1, Level 2, 50kW DC fast and 350kW DC ultra-fast charging speeds"
          role="img"
        >
          <defs>
            <linearGradient id="l1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="l2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="l3Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="l3UltraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines */}
          <line x1="200" y1="40" x2="200" y2="360" stroke="#1E293B" strokeDasharray="3 3" />
          <line x1="380" y1="40" x2="380" y2="360" stroke="#1E293B" strokeDasharray="3 3" />
          <line x1="560" y1="40" x2="560" y2="360" stroke="#1E293B" strokeDasharray="3 3" />
          <line x1="740" y1="40" x2="740" y2="360" stroke="#1E293B" strokeDasharray="3 3" />

          {/* Row 1: Level 1 (120V) */}
          <g transform="translate(0, 50)">
            <text x="20" y="25" fill="#E2E8F0" fontSize="14" fontWeight="bold">Level 1 (Trickle)</text>
            <text x="20" y="44" fill="#94A3B8" fontSize="11">120V / 12A AC Outlet</text>

            <rect x="200" y="10" width="8" height="42" rx="6" fill="url(#l1Grad)" />
            <text x="220" y="27" fill="#CBD5E1" fontSize="13" fontWeight="bold" fontFamily="monospace">1.4 kW Gross (1.2 kW Net)</text>
            <text x="220" y="44" fill="#94A3B8" fontSize="11">3–5 miles/hr &bull; 20% &rarr; 80% takes <tspan fill="#F59E0B" fontWeight="bold">28.4 Hours</tspan></text>
          </g>

          {/* Row 2: Level 2 (240V 40A) */}
          <g transform="translate(0, 140)">
            <text x="20" y="25" fill="#E2E8F0" fontSize="14" fontWeight="bold">Level 2 (Wallbox)</text>
            <text x="20" y="44" fill="#34D399" fontSize="11" fontWeight="600">240V / 40A Home Charger</text>

            <rect x="200" y="10" width="75" height="42" rx="6" fill="url(#l2Grad)" />
            <text x="285" y="27" fill="#34D399" fontSize="13" fontWeight="bold" fontFamily="monospace">9.6 kW (AC)</text>
            <text x="285" y="44" fill="#94A3B8" fontSize="11">32–40 miles/hr &bull; 20% &rarr; 80% takes <tspan fill="#10B981" fontWeight="bold">4.2 Hours</tspan> (Overnight)</text>
          </g>

          {/* Row 3: Level 3 (50kW DC) */}
          <g transform="translate(0, 230)">
            <text x="20" y="25" fill="#E2E8F0" fontSize="14" fontWeight="bold">Level 3 (50 kW DC)</text>
            <text x="20" y="44" fill="#38BDF8" fontSize="11">Commercial Fast Charger</text>

            <rect x="200" y="10" width="220" height="42" rx="6" fill="url(#l3Grad)" />
            <text x="430" y="27" fill="#38BDF8" fontSize="13" fontWeight="bold" fontFamily="monospace">50 kW (DC)</text>
            <text x="430" y="44" fill="#94A3B8" fontSize="11">140 miles/hr &bull; 20% &rarr; 80% takes <tspan fill="#38BDF8" fontWeight="bold">48 Minutes</tspan></text>
          </g>

          {/* Row 4: Level 3 (350kW Ultra-Fast) */}
          <g transform="translate(0, 320)">
            <text x="20" y="25" fill="#E2E8F0" fontSize="14" fontWeight="bold">Level 3 (350 kW DC)</text>
            <text x="20" y="44" fill="#C084FC" fontSize="11">800V High-Power Station</text>

            <rect x="200" y="10" width="520" height="42" rx="6" fill="url(#l3UltraGrad)" />
            <text x="590" y="27" fill="#E9D5FF" fontSize="13" fontWeight="bold" fontFamily="monospace">Peak 250–350 kW</text>
            <text x="590" y="44" fill="#E2E8F0" fontSize="11">600+ miles/hr &bull; 20% &rarr; 80% in <tspan fill="#C084FC" fontWeight="bold">16–22 Mins</tspan></text>
          </g>

          {/* Bottom X-axis scale */}
          <g transform="translate(0, 395)">
            <line x1="200" y1="0" x2="780" y2="0" stroke="#475569" strokeWidth="1.5" />
            <text x="200" y="18" fill="#64748B" fontSize="11" textAnchor="middle">0 kW</text>
            <text x="380" y="18" fill="#64748B" fontSize="11" textAnchor="middle">100 kW</text>
            <text x="560" y="18" fill="#64748B" fontSize="11" textAnchor="middle">200 kW</text>
            <text x="740" y="18" fill="#64748B" fontSize="11" textAnchor="middle">300+ kW</text>
          </g>
        </svg>
      </div>

      <figcaption className="mt-3 text-xs text-slate-400 text-center italic">
        Figure 1: Comparison of electrical power outputs across Level 1, Level 2, and Level 3 DC fast charging tiers, highlighting the exponential speed jump on high-voltage DC hardware.
      </figcaption>
    </figure>
  );
}

/**
 * 2. EV Charging Curve & 80% Taper Curve Vector SVG
 * Visualizes the classic charging taper, lithium plating risk zone, and the optimal departure point.
 */
export function ChargingCurveTaperSvg() {
  return (
    <figure className="my-8 rounded-2xl bg-[#131B2A] border border-slate-800 p-4 sm:p-6 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
            Technical Infographic #2
          </span>
          <h4 className="text-base font-bold text-white">
            The Physics of the EV Charging Curve &amp; 80% Taper
          </h4>
        </div>
        <span className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-md font-medium">
          Constant Current &rarr; Constant Voltage (CC/CV)
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg 
          viewBox="0 0 840 440" 
          className="w-full h-auto min-w-[650px] font-sans"
          aria-label="Graph of charging power in kilowatts versus battery state of charge from 0 to 100 percent, illustrating the charging curve taper"
          role="img"
        >
          <defs>
            <linearGradient id="curveFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0B0F17" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="dangerZone" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Y-Axis Grid & Labels (Power kW) */}
          <line x1="70" y1="60" x2="800" y2="60" stroke="#1E293B" strokeDasharray="4 4" />
          <text x="60" y="65" fill="#64748B" fontSize="11" textAnchor="end">250 kW</text>

          <line x1="70" y1="125" x2="800" y2="125" stroke="#1E293B" strokeDasharray="4 4" />
          <text x="60" y="130" fill="#64748B" fontSize="11" textAnchor="end">200 kW</text>

          <line x1="70" y1="190" x2="800" y2="190" stroke="#1E293B" strokeDasharray="4 4" />
          <text x="60" y="195" fill="#64748B" fontSize="11" textAnchor="end">150 kW</text>

          <line x1="70" y1="255" x2="800" y2="255" stroke="#1E293B" strokeDasharray="4 4" />
          <text x="60" y="260" fill="#64748B" fontSize="11" textAnchor="end">100 kW</text>

          <line x1="70" y1="320" x2="800" y2="320" stroke="#1E293B" strokeDasharray="4 4" />
          <text x="60" y="325" fill="#64748B" fontSize="11" textAnchor="end">50 kW</text>

          {/* Axes */}
          <line x1="70" y1="350" x2="800" y2="350" stroke="#475569" strokeWidth="2" />
          <line x1="70" y1="40" x2="70" y2="350" stroke="#475569" strokeWidth="2" />

          {/* Danger / Extreme Taper Zone (75% to 100%) */}
          <rect x="617" y="50" width="183" height="300" fill="url(#dangerZone)" rx="4" />
          <line x1="617" y1="50" x2="617" y2="350" stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1.5" />
          <text x="625" y="75" fill="#F87171" fontSize="11" fontWeight="bold">80% TAPER CLIFF</text>
          <text x="625" y="92" fill="#FCA5A5" fontSize="10">Lithium Plating Protection</text>
          <text x="625" y="106" fill="#CBD5E1" fontSize="10">Time: 80%&rarr;100% &asymp; 10%&rarr;80%</text>

          {/* Under Curve Area */}
          <path 
            d="M 70 350 L 70 240 Q 140 70 200 65 L 350 75 Q 480 110 550 180 Q 617 240 680 300 Q 750 330 800 335 L 800 350 Z" 
            fill="url(#curveFill)" 
          />

          {/* Main Curve Stroke */}
          <path 
            d="M 70 240 Q 140 70 200 65 L 350 75 Q 480 110 550 180 Q 617 240 680 300 Q 750 330 800 335" 
            fill="none" 
            stroke="#10B981" 
            strokeWidth="3.5" 
          />

          {/* Phase 1: Peak Callout */}
          <circle cx="200" cy="65" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          <g transform="translate(190, 25)">
            <rect x="-10" y="-12" width="135" height="24" rx="4" fill="#0B0F17" stroke="#10B981" strokeWidth="1" />
            <text x="57" y="4" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">Peak Power (245 kW)</text>
          </g>

          {/* Phase 2: Sweet Spot Departure Marker (80% SoC) */}
          <circle cx="617" cy="240" r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          <g transform="translate(530, 260)">
            <rect x="0" y="0" width="130" height="42" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="65" y="16" fill="#FBBF24" fontSize="10" fontWeight="bold" textAnchor="middle">OPTIMAL ROAD TRIP STOP</text>
            <text x="65" y="32" fill="#E2E8F0" fontSize="10" textAnchor="middle">Unplug at ~75–80%</text>
          </g>

          {/* Constant Voltage Final Crawl Callout */}
          <circle cx="780" cy="333" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
          <text x="760" y="320" fill="#F87171" fontSize="10" fontWeight="bold" textAnchor="end">Trickles at 15–20 kW</text>

          {/* X-Axis Ticks (State of Charge %) */}
          <g transform="translate(0, 370)">
            <text x="70" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">0%</text>
            <text x="216" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">20%</text>
            <text x="362" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">40%</text>
            <text x="508" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">60%</text>
            <text x="654" y="0" fill="#F87171" fontSize="11" fontWeight="bold" textAnchor="middle">80%</text>
            <text x="800" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">100%</text>
            <text x="435" y="24" fill="#CBD5E1" fontSize="12" fontWeight="bold" textAnchor="middle">Battery State of Charge (SoC %)</text>
          </g>
        </svg>
      </div>

      <figcaption className="mt-3 text-xs text-slate-400 text-center italic">
        Figure 2: Empirical DC Fast Charging profile. Power drops as the internal cell voltage approaches its chemical safety threshold, causing the final 20% to take exponentially longer to charge.
      </figcaption>
    </figure>
  );
}

/**
 * 3. Cold Battery vs Preconditioned Battery SVG
 * Shows how cell temperature affects the charge curve
 */
export function ThermalPreconditioningSvg() {
  return (
    <figure className="my-8 rounded-2xl bg-[#131B2A] border border-slate-800 p-4 sm:p-6 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold block">
            Technical Infographic #3
          </span>
          <h4 className="text-base font-bold text-white">
            Thermal Preconditioning vs. Cold-Gate Throttling
          </h4>
        </div>
        <span className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md font-mono">
          32&deg;F (0&deg;C) Cold vs. 77&deg;F (25&deg;C) Preconditioned
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg 
          viewBox="0 0 840 380" 
          className="w-full h-auto min-w-[650px] font-sans"
          aria-label="Comparison diagram showing how cold battery temperatures throttle charging speeds versus a thermally preconditioned battery"
          role="img"
        >
          {/* Legend */}
          <g transform="translate(180, 20)">
            <rect x="0" y="0" width="16" height="4" rx="2" fill="#10B981" />
            <text x="24" y="6" fill="#34D399" fontSize="12" fontWeight="bold">Preconditioned Pack (77&deg;F / 25&deg;C) &mdash; 18 Min Session</text>

            <rect x="340" y="0" width="16" height="4" rx="2" fill="#38BDF8" />
            <text x="364" y="6" fill="#7DD3FC" fontSize="12" fontWeight="bold">Cold-Gated Pack (32&deg;F / 0&deg;C) &mdash; 52 Min Session</text>
          </g>

          {/* Grid lines */}
          <line x1="70" y1="80" x2="800" y2="80" stroke="#1E293B" strokeDasharray="3 3" />
          <text x="60" y="85" fill="#64748B" fontSize="11" textAnchor="end">250 kW</text>

          <line x1="70" y1="150" x2="800" y2="150" stroke="#1E293B" strokeDasharray="3 3" />
          <text x="60" y="155" fill="#64748B" fontSize="11" textAnchor="end">150 kW</text>

          <line x1="70" y1="220" x2="800" y2="220" stroke="#1E293B" strokeDasharray="3 3" />
          <text x="60" y="225" fill="#64748B" fontSize="11" textAnchor="end">50 kW</text>

          {/* Axes */}
          <line x1="70" y1="290" x2="800" y2="290" stroke="#475569" strokeWidth="2" />
          <line x1="70" y1="60" x2="70" y2="290" stroke="#475569" strokeWidth="2" />

          {/* Green Curve (Preconditioned) */}
          <path 
            d="M 70 200 Q 140 85 220 85 L 380 95 Q 520 130 610 210 Q 720 270 800 275" 
            fill="none" 
            stroke="#10B981" 
            strokeWidth="3.5" 
          />

          {/* Blue Curve (Cold Gated) */}
          <path 
            d="M 70 250 L 300 240 Q 450 230 550 225 Q 680 235 800 275" 
            fill="none" 
            stroke="#38BDF8" 
            strokeWidth="3.5" 
            strokeDasharray="6 3"
          />

          {/* Annotation for Cold Penalty */}
          <g transform="translate(250, 160)">
            <rect x="0" y="0" width="190" height="50" rx="6" fill="#0B132B" stroke="#38BDF8" strokeWidth="1" />
            <text x="95" y="20" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">&minus;75% Initial Power Loss</text>
            <text x="95" y="38" fill="#94A3B8" fontSize="10" textAnchor="middle">Throttled by BMS to prevent damage</text>
          </g>

          {/* X-axis labels */}
          <g transform="translate(0, 315)">
            <text x="70" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">10%</text>
            <text x="216" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">25%</text>
            <text x="362" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">40%</text>
            <text x="508" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">55%</text>
            <text x="654" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">70%</text>
            <text x="800" y="0" fill="#94A3B8" fontSize="11" textAnchor="middle">85%</text>
            <text x="435" y="25" fill="#CBD5E1" fontSize="12" fontWeight="bold" textAnchor="middle">State of Charge (%)</text>
          </g>
        </svg>
      </div>

      <figcaption className="mt-3 text-xs text-slate-400 text-center italic">
        Figure 3: Thermal cold-gating comparison. When a battery is cold, high internal resistance forces the vehicle to divert energy to battery heaters, extending charging sessions by 20 to 35 minutes.
      </figcaption>
    </figure>
  );
}

/**
 * 4. Level 2 Home Electrical Anatomy SVG
 * Explains 240V breakers, continuous load 80% rule, and delivered net kW
 */
export function HomeChargingAmpsSvg() {
  return (
    <figure className="my-8 rounded-2xl bg-[#131B2A] border border-slate-800 p-4 sm:p-6 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
            Technical Infographic #4
          </span>
          <h4 className="text-base font-bold text-white">
            Level 2 Electrical Anatomy: Breakers, Amperage &amp; Net Power
          </h4>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md font-mono">
          NEC 80% Continuous Load Rule
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg 
          viewBox="0 0 840 310" 
          className="w-full h-auto min-w-[650px] font-sans"
          aria-label="Diagram of household electrical breaker sizes, continuous 80 percent amperage ratings and net delivered charging power in kilowatts"
          role="img"
        >
          {/* Card 1: 40A Breaker / 32A Output */}
          <g transform="translate(30, 30)">
            <rect x="0" y="0" width="230" height="230" rx="14" fill="#0B0F17" stroke="#334155" strokeWidth="1.5" />
            <rect x="15" y="15" width="200" height="30" rx="6" fill="#1E293B" />
            <text x="115" y="35" fill="#E2E8F0" fontSize="13" fontWeight="bold" textAnchor="middle">40A Circuit Breaker</text>
            
            <text x="115" y="75" fill="#94A3B8" fontSize="11" textAnchor="middle">Continuous Current (80%)</text>
            <text x="115" y="105" fill="#F8FAFC" fontSize="26" fontWeight="bold" fontFamily="monospace" textAnchor="middle">32 Amps</text>

            <line x1="25" y1="125" x2="205" y2="125" stroke="#1E293B" />

            <text x="115" y="150" fill="#94A3B8" fontSize="11" textAnchor="middle">Delivered AC Power</text>
            <text x="115" y="180" fill="#38BDF8" fontSize="22" fontWeight="bold" fontFamily="monospace" textAnchor="middle">7.7 kW</text>
            <text x="115" y="205" fill="#64748B" fontSize="11" textAnchor="middle">~25&ndash;30 miles range/hr</text>
          </g>

          {/* Card 2: 50A Breaker / 40A Output (Most Common) */}
          <g transform="translate(305, 20)">
            <rect x="0" y="0" width="230" height="250" rx="14" fill="#0B0F17" stroke="#10B981" strokeWidth="2" />
            <rect x="15" y="15" width="200" height="30" rx="6" fill="#10B981" fillOpacity="0.2" />
            <text x="115" y="35" fill="#34D399" fontSize="13" fontWeight="bold" textAnchor="middle">50A Breaker (Standard NEMA 14-50)</text>
            
            <text x="115" y="80" fill="#94A3B8" fontSize="11" textAnchor="middle">Continuous Current (80%)</text>
            <text x="115" y="112" fill="#F8FAFC" fontSize="28" fontWeight="bold" fontFamily="monospace" textAnchor="middle">40 Amps</text>

            <line x1="25" y1="135" x2="205" y2="135" stroke="#1E293B" />

            <text x="115" y="160" fill="#94A3B8" fontSize="11" textAnchor="middle">Delivered AC Power</text>
            <text x="115" y="194" fill="#10B981" fontSize="24" fontWeight="bold" fontFamily="monospace" textAnchor="middle">9.6 kW</text>
            <text x="115" y="222" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">~32&ndash;40 miles range/hr</text>
          </g>

          {/* Card 3: 60A Breaker / 48A Hardwire */}
          <g transform="translate(580, 30)">
            <rect x="0" y="0" width="230" height="230" rx="14" fill="#0B0F17" stroke="#334155" strokeWidth="1.5" />
            <rect x="15" y="15" width="200" height="30" rx="6" fill="#1E293B" />
            <text x="115" y="35" fill="#E2E8F0" fontSize="13" fontWeight="bold" textAnchor="middle">60A Hardwired Circuit</text>
            
            <text x="115" y="75" fill="#94A3B8" fontSize="11" textAnchor="middle">Continuous Current (80%)</text>
            <text x="115" y="105" fill="#F8FAFC" fontSize="26" fontWeight="bold" fontFamily="monospace" textAnchor="middle">48 Amps</text>

            <line x1="25" y1="125" x2="205" y2="125" stroke="#1E293B" />

            <text x="115" y="150" fill="#94A3B8" fontSize="11" textAnchor="middle">Delivered AC Power</text>
            <text x="115" y="180" fill="#A855F7" fontSize="22" fontWeight="bold" fontFamily="monospace" textAnchor="middle">11.5 kW</text>
            <text x="115" y="205" fill="#64748B" fontSize="11" textAnchor="middle">~40&ndash;46 miles range/hr</text>
          </g>
        </svg>
      </div>

      <figcaption className="mt-3 text-xs text-slate-400 text-center italic">
        Figure 4: Residential Level 2 power delivery tiers. Circuit breakers must be sized 125% higher than continuous draw to prevent thermal tripping during multi-hour overnight charging.
      </figcaption>
    </figure>
  );
}

/**
 * 5. NEMA 14-50 Electrical & Safety Guide Infographic SVG
 * Illustrates 4-wire pinout configuration, NEC 80% continuous rating (40A / 9.6kW),
 * and industrial-grade receptacle requirements.
 */
export function Nema1450GuideSvg() {
  return (
    <figure className="my-10 rounded-2xl bg-[#131B2A] border border-slate-800 p-4 sm:p-6 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold block">
            Technical Electrical Schematic
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">
            NEMA 14-50 Architecture, NEC 80% Rule &amp; Receptacle Sizing
          </h4>
        </div>
        <span className="text-xs text-slate-300 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-md font-mono">
          240V &bull; 50A Breaker &bull; 40A Continuous
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg 
          viewBox="0 0 920 460" 
          className="w-full h-auto min-w-[760px] font-sans select-none"
          aria-label="Technical infographic detailing NEMA 14-50 pinout wiring, NEC 80 percent continuous load calculation, and industrial vs standard receptacle comparison"
          role="img"
        >
          <defs>
            <linearGradient id="nema1450FaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="ruleBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="80%" stopColor="#059669" />
              <stop offset="80.1%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            <filter id="nemaPinGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Section 1: 4-Wire NEMA 14-50 Pinout & Wiring */}
          <g transform="translate(15, 20)">
            <rect x="0" y="0" width="280" height="420" rx="14" fill="#0B0F17" stroke="#334155" strokeWidth="1.5" />
            <rect x="15" y="15" width="250" height="32" rx="6" fill="#1E293B" />
            <text x="140" y="36" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle">1. NEMA 14-50 Pinout &amp; Wiring</text>

            {/* Circular Outlet Face */}
            <circle cx="140" cy="140" r="70" fill="url(#nema1450FaceGrad)" stroke="#475569" strokeWidth="3" />
            <circle cx="140" cy="140" r="62" fill="none" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 2" strokeOpacity="0.4" />

            {/* Ground Pin (Top Semi-circle / U-shape) - Green */}
            <path d="M 130 95 C 130 83, 150 83, 150 95 L 150 108 C 150 114, 130 114, 130 108 Z" fill="#22C55E" />
            <text x="140" y="76" fill="#4ADE80" fontSize="11" fontWeight="bold" textAnchor="middle">Ground (Green / Bare)</text>

            {/* Hot 1 Pin (Left Vertical Slot) - Black */}
            <rect x="90" y="125" width="14" height="32" rx="3" fill="#E2E8F0" stroke="#000000" strokeWidth="1.5" />
            <text x="60" y="145" fill="#E2E8F0" fontSize="11" fontWeight="bold" textAnchor="middle">Hot 1 (X)</text>
            <text x="60" y="160" fill="#94A3B8" fontSize="10" textAnchor="middle">120V to Gnd</text>

            {/* Hot 2 Pin (Right Vertical Slot) - Red */}
            <rect x="176" y="125" width="14" height="32" rx="3" fill="#EF4444" />
            <text x="220" y="145" fill="#F87171" fontSize="11" fontWeight="bold" textAnchor="middle">Hot 2 (Y)</text>
            <text x="220" y="160" fill="#94A3B8" fontSize="10" textAnchor="middle">120V to Gnd</text>

            {/* Neutral Pin (Bottom Horizontal Slot) - White */}
            <rect x="122" y="172" width="36" height="12" rx="3" fill="#CBD5E1" />
            <text x="140" y="202" fill="#E2E8F0" fontSize="11" fontWeight="bold" textAnchor="middle">Neutral (W / White)</text>

            {/* 240V Across Hot Pins Indicator */}
            <path d="M 104 120 C 104 105, 176 105, 176 120" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
            <rect x="116" y="98" width="48" height="18" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="1" />
            <text x="140" y="111" fill="#FBBF24" fontSize="10" fontWeight="bold" textAnchor="middle">240V Phase</text>

            {/* Wire Specification Card */}
            <g transform="translate(15, 225)">
              <rect x="0" y="0" width="250" height="175" rx="8" fill="#131B2A" stroke="#1E293B" />
              <text x="12" y="22" fill="#38BDF8" fontSize="11" fontWeight="bold">CONDUIT &amp; CONDUCTOR SPECS:</text>
              
              <text x="12" y="48" fill="#E2E8F0" fontSize="11">&bull; Wire Gauge: <tspan fill="#38BDF8" fontWeight="bold">6 AWG Copper</tspan> (THHN)</text>
              <text x="12" y="68" fill="#94A3B8" fontSize="10">  (Or 4 AWG if Romex NM-B / 60&deg;C limit)</text>

              <text x="12" y="94" fill="#E2E8F0" fontSize="11">&bull; Configuration: <tspan fill="#A7F3D0" fontWeight="bold">4 Wires</tspan></text>
              <text x="12" y="112" fill="#94A3B8" fontSize="10">  2 Hots (240V) + 1 Neutral + 1 Ground</text>

              <text x="12" y="138" fill="#E2E8F0" fontSize="11">&bull; NEMA 6-50 Alternative:</text>
              <text x="12" y="156" fill="#94A3B8" fontSize="10">  3-Wire (No Neutral), saves copper cost</text>
            </g>
          </g>

          {/* Section 2: The NEC 80% Continuous Load Rule */}
          <g transform="translate(315, 20)">
            <rect x="0" y="0" width="290" height="420" rx="14" fill="#0B0F17" stroke="#334155" strokeWidth="1.5" />
            <rect x="15" y="15" width="260" height="32" rx="6" fill="#1E293B" />
            <text x="145" y="36" fill="#34D399" fontSize="13" fontWeight="bold" textAnchor="middle">2. NEC 80% Continuous Load Rule</text>

            {/* Continuous Load Definition */}
            <g transform="translate(15, 60)">
              <rect x="0" y="0" width="260" height="56" rx="8" fill="#131B2A" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
              <text x="12" y="22" fill="#34D399" fontSize="11" fontWeight="bold">NEC ARTICLE 625 &amp; 210:</text>
              <text x="12" y="42" fill="#CBD5E1" fontSize="11">EVs are continuous loads (<tspan fill="#F59E0B" fontWeight="bold">&ge; 3 hours</tspan>).</text>
            </g>

            {/* Math Formula Card */}
            <g transform="translate(15, 126)">
              <rect x="0" y="0" width="260" height="120" rx="8" fill="#131B2A" stroke="#1E293B" />
              
              <text x="130" y="25" fill="#94A3B8" fontSize="11" textAnchor="middle">Continuous Amperage Limit</text>
              <text x="130" y="52" fill="#F8FAFC" fontSize="20" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                50A &times; 80% = <tspan fill="#34D399">40 Amps</tspan>
              </text>

              <line x1="20" y1="66" x2="240" y2="66" stroke="#334155" />

              <text x="130" y="85" fill="#94A3B8" fontSize="11" textAnchor="middle">Maximum Delivered Power (kW)</text>
              <text x="130" y="108" fill="#38BDF8" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                240V &times; 40A = <tspan fill="#34D399">9.6 kW</tspan>
              </text>
            </g>

            {/* 50A Current Capacity Visual Bar */}
            <g transform="translate(15, 258)">
              <rect x="0" y="0" width="260" height="142" rx="8" fill="#131B2A" stroke="#1E293B" />
              
              <text x="12" y="20" fill="#E2E8F0" fontSize="11" fontWeight="bold">CIRCUIT CAPACITY BREAKDOWN:</text>

              {/* Progress Bar Container */}
              <rect x="12" y="32" width="236" height="28" rx="6" fill="#1E293B" />
              {/* 80% Safe Zone */}
              <rect x="12" y="32" width="188.8" height="28" rx="6" fill="#059669" />
              {/* 20% Reserved Buffer */}
              <rect x="200.8" y="32" width="47.2" height="28" rx="0 6 6 0" fill="#DC2626" opacity="0.85" />

              <text x="106" y="50" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">40A Safe Continuous (80%)</text>
              <text x="224" y="50" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">+10A</text>

              <text x="12" y="82" fill="#34D399" fontSize="10" fontWeight="bold">&bull; 40A: Real-world EV charging speed</text>
              <text x="12" y="100" fill="#94A3B8" fontSize="10">&bull; Added Range: ~30 to 38 miles per hour</text>
              <text x="12" y="118" fill="#F87171" fontSize="10">&bull; 50A: Non-continuous short appliance burst only</text>
              <text x="12" y="134" fill="#E2E8F0" fontSize="10">&bull; 60A Hardwire needed for 48A (11.5 kW)</text>
            </g>
          </g>

          {/* Section 3: Industrial Grade vs Cheap Residential Receptacles */}
          <g transform="translate(625, 20)">
            <rect x="0" y="0" width="280" height="420" rx="14" fill="#0B0F17" stroke="#334155" strokeWidth="1.5" />
            <rect x="15" y="15" width="250" height="32" rx="6" fill="#1E293B" />
            <text x="140" y="36" fill="#F43F5E" fontSize="13" fontWeight="bold" textAnchor="middle">3. Industrial Receptacle Selection</text>

            {/* Warning Banner */}
            <g transform="translate(15, 60)">
              <rect x="0" y="0" width="250" height="48" rx="6" fill="#4C0519" stroke="#E11D48" strokeWidth="1" />
              <text x="125" y="20" fill="#FDA4AF" fontSize="11" fontWeight="bold" textAnchor="middle">&#9888; PREVENT THERMAL MELTDOWN</text>
              <text x="125" y="36" fill="#FECDD3" fontSize="10" textAnchor="middle">Standard range outlets fail under EV loads</text>
            </g>

            {/* Comparison 1: Cheap $10 Standard Outlet */}
            <g transform="translate(15, 118)">
              <rect x="0" y="0" width="250" height="110" rx="8" fill="#131B2A" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.4" />
              <rect x="10" y="10" width="80" height="18" rx="4" fill="#7F1D1D" />
              <text x="50" y="23" fill="#FCA5A5" fontSize="10" fontWeight="bold" textAnchor="middle">Standard ~$10</text>
              <text x="140" y="23" fill="#94A3B8" fontSize="10">Leviton 014-05410 etc.</text>

              <text x="12" y="48" fill="#E2E8F0" fontSize="10">&bull; Thin stamped leaf contacts</text>
              <text x="12" y="66" fill="#E2E8F0" fontSize="10">&bull; Terminal screw torque: ~20 in-lbs</text>
              <text x="12" y="84" fill="#F87171" fontSize="10">&bull; High resistance &rarr; thermal looseness</text>
              <text x="12" y="100" fill="#EF4444" fontSize="10" fontWeight="bold">&bull; Risk: Melting &amp; garage fires</text>
            </g>

            {/* Comparison 2: Industrial $60-$90 Outlet */}
            <g transform="translate(15, 238)">
              <rect x="0" y="0" width="250" height="162" rx="8" fill="#131B2A" stroke="#10B981" strokeWidth="1.5" />
              <rect x="10" y="10" width="95" height="18" rx="4" fill="#064E3B" />
              <text x="57" y="23" fill="#6EE7B7" fontSize="10" fontWeight="bold" textAnchor="middle">Industrial $60&ndash;$90</text>
              <text x="155" y="23" fill="#34D399" fontSize="10" fontWeight="bold">Hubbell / Bryant</text>

              <text x="12" y="48" fill="#E2E8F0" fontSize="10">&bull; Solid heavy-duty brass contacts</text>
              <text x="12" y="66" fill="#E2E8F0" fontSize="10">&bull; Massive thermal dissipation mass</text>
              <text x="12" y="84" fill="#E2E8F0" fontSize="10">&bull; Terminal screw torque: <tspan fill="#34D399" fontWeight="bold">75 in-lbs</tspan></text>
              <text x="12" y="102" fill="#E2E8F0" fontSize="10">&bull; Glass-reinforced nylon body</text>
              <text x="12" y="120" fill="#34D399" fontSize="10" fontWeight="bold">&bull; Recommended Models:</text>
              <text x="12" y="136" fill="#38BDF8" fontSize="10" fontFamily="monospace">  Hubbell HBL9450A / 9450FR</text>
              <text x="12" y="152" fill="#38BDF8" fontSize="10" fontFamily="monospace">  Bryant 9450FR</text>
            </g>
          </g>
        </svg>
      </div>

      <figcaption className="mt-3 text-xs text-slate-400 text-center italic">
        Figure 1: Comprehensive NEMA 14-50 installation blueprint illustrating 4-wire pin assignments, continuous 40A (9.6 kW) load derivation under NEC 80% mandates, and heavy-duty industrial receptacle selection.
      </figcaption>
    </figure>
  );
}

/**
 * 6. Level 3 DC Fast Charging Infrastructure, Voltage Architectures & Taper Physics Infographic SVG
 * Illustrates offboard AC-to-DC rectification vs onboard charger, 400V vs 800V current limits,
 * and the electrochemical reasons behind the 10-80% charge curve taper.
 */
export function Level3ChargingArchitectureSvg() {
  return (
    <figure className="my-10 rounded-2xl bg-[#131B2A] border border-slate-800 p-4 sm:p-6 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold block">
            Commercial Electrical &amp; Electrochemistry Blueprint
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">
            Level 3 DC Fast Charging: Grid Rectification, 400V vs 800V, &amp; Taper Dynamics
          </h4>
        </div>
        <span className="text-xs text-slate-300 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 rounded-md font-mono">
          480V 3-Phase AC &rarr; 200V&ndash;1000V DC Direct
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg 
          viewBox="0 0 940 480" 
          className="w-full h-auto min-w-[780px] font-sans select-none"
          aria-label="Technical diagram of Level 3 DC fast charging power conversion, 400V vs 800V pack voltage dynamics, and charging curve taper mechanics"
          role="img"
        >
          <defs>
            <linearGradient id="l3CabinetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="l3AcDcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="l3TaperFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Section 1: Off-board AC-to-DC Rectification vs Onboard AC */}
          <g transform="translate(15, 20)">
            <rect x="0" y="0" width="290" height="440" rx="14" fill="#0B0F17" stroke="#334155" strokeWidth="1.5" />
            <rect x="15" y="15" width="260" height="32" rx="6" fill="#1E293B" />
            <text x="145" y="36" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle">1. Off-Board DC Rectification</text>

            {/* Grid Input 480V 3-Phase */}
            <g transform="translate(15, 60)">
              <rect x="0" y="0" width="260" height="60" rx="8" fill="#131B2A" stroke="#475569" />
              <text x="12" y="20" fill="#94A3B8" fontSize="10" fontWeight="bold">COMMERCIAL UTILITY FEED</text>
              <text x="12" y="42" fill="#E2E8F0" fontSize="13" fontWeight="bold" fontFamily="monospace">480V 3-Phase AC (300kVA+)</text>
            </g>

            {/* Power Electronics Cabinet (Rectifier) */}
            <g transform="translate(15, 130)">
              <rect x="0" y="0" width="260" height="110" rx="8" fill="url(#l3CabinetGrad)" stroke="#6366F1" strokeWidth="1.5" />
              <rect x="10" y="10" width="130" height="20" rx="4" fill="#312E81" />
              <text x="75" y="24" fill="#A5B4FC" fontSize="10" fontWeight="bold" textAnchor="middle">DC POWER CABINET</text>
              
              <text x="12" y="52" fill="#E2E8F0" fontSize="11">&bull; Massive SiC (Silicon Carbide) Inverters</text>
              <text x="12" y="72" fill="#E2E8F0" fontSize="11">&bull; AC &rarr; DC conversion happens <tspan fill="#38BDF8" fontWeight="bold">off-car</tspan></text>
              <text x="12" y="92" fill="#34D399" fontSize="11" fontWeight="bold">&bull; Liquid-cooled 500A charge cables</text>
            </g>

            {/* EV Onboard Direct Feed */}
            <g transform="translate(15, 250)">
              <path d="M 130 -10 L 130 10" stroke="#10B981" strokeWidth="3" strokeDasharray="3 3" />
              <rect x="0" y="10" width="260" height="80" rx="8" fill="#131B2A" stroke="#10B981" />
              <text x="12" y="30" fill="#34D399" fontSize="11" fontWeight="bold">DIRECT BATTERY INJECTION:</text>
              <text x="12" y="50" fill="#CBD5E1" fontSize="11">Bypasses small 11kW Onboard Inverter.</text>
              <text x="12" y="70" fill="#F8FAFC" fontSize="11" fontWeight="bold">Direct to 400V / 800V Traction Battery</text>
            </g>

            {/* Level 2 vs Level 3 Contrast Box */}
            <g transform="translate(15, 350)">
              <rect x="0" y="0" width="260" height="75" rx="6" fill="#1E293B" />
              <text x="12" y="20" fill="#F59E0B" fontSize="10" fontWeight="bold">WHY NOT AT HOME?</text>
              <text x="12" y="38" fill="#94A3B8" fontSize="10">&bull; Residential homes only have 240V split-phase</text>
              <text x="12" y="54" fill="#94A3B8" fontSize="10">&bull; Commercial step-down costs $50k&ndash;$100k+</text>
              <text x="12" y="68" fill="#F87171" fontSize="10">&bull; Requires 200A&ndash;600A commercial utility tie</text>
            </g>
          </g>

          {/* Section 2: 400V vs 800V Voltage Architecture & Amperage Bottlenecks */}
          <g transform="translate(325, 20)">
            <rect x="0" y="0" width="290" height="440" rx="14" fill="#0B0F17" stroke="#334155" strokeWidth="1.5" />
            <rect x="15" y="15" width="260" height="32" rx="6" fill="#1E293B" />
            <text x="145" y="36" fill="#A855F7" fontSize="13" fontWeight="bold" textAnchor="middle">2. 400V vs 800V Architecture</text>

            {/* Physics Law Equation */}
            <g transform="translate(15, 60)">
              <rect x="0" y="0" width="260" height="54" rx="8" fill="#131B2A" stroke="#9333EA" strokeWidth="1" strokeOpacity="0.5" />
              <text x="130" y="22" fill="#C084FC" fontSize="11" fontWeight="bold" textAnchor="middle">POWER EQUATION: P = V &times; I</text>
              <text x="130" y="42" fill="#E2E8F0" fontSize="11" textAnchor="middle">CCS1 cable thermal limit = <tspan fill="#F59E0B" fontWeight="bold">500 Amps</tspan></text>
            </g>

            {/* 400V Architecture Card */}
            <g transform="translate(15, 124)">
              <rect x="0" y="0" width="260" height="135" rx="8" fill="#131B2A" stroke="#38BDF8" strokeWidth="1" />
              <div className="flex items-center">
                <rect x="10" y="10" width="90" height="18" rx="4" fill="#0369A1" />
                <text x="55" y="23" fill="#BAE6FD" fontSize="10" fontWeight="bold" textAnchor="middle">400V Systems</text>
                <text x="110" y="23" fill="#94A3B8" fontSize="10">Tesla, Mustang, ID.4</text>
              </div>

              <text x="12" y="52" fill="#E2E8F0" fontSize="11">Max Current: <tspan fill="#38BDF8" fontWeight="bold">500A (liquid-cooled)</tspan></text>
              <text x="12" y="74" fill="#38BDF8" fontSize="15" fontWeight="bold" fontFamily="monospace">400V &times; 500A = 200&ndash;250 kW</text>
              <text x="12" y="96" fill="#94A3B8" fontSize="10">&bull; Higher current generates high I&sup2;R heat</text>
              <text x="12" y="112" fill="#94A3B8" fontSize="10">&bull; Peak speed lasts only 5&ndash;10 minutes</text>
              <text x="12" y="126" fill="#F59E0B" fontSize="10">&bull; Cannot pull 350kW from a 350kW station</text>
            </g>

            {/* 800V Architecture Card */}
            <g transform="translate(15, 269)">
              <rect x="0" y="0" width="260" height="156" rx="8" fill="#131B2A" stroke="#10B981" strokeWidth="1.5" />
              <rect x="10" y="10" width="90" height="18" rx="4" fill="#065F46" />
              <text x="55" y="23" fill="#6EE7B7" fontSize="10" fontWeight="bold" textAnchor="middle">800V Systems</text>
              <text x="110" y="23" fill="#34D399" fontSize="10" fontWeight="bold">Taycan, Ioniq 5, EV6, Lucid</text>

              <text x="12" y="52" fill="#E2E8F0" fontSize="11">Required Current for 350 kW:</text>
              <text x="12" y="74" fill="#34D399" fontSize="15" fontWeight="bold" fontFamily="monospace">800V &times; 437A = 350 kW</text>
              <text x="12" y="96" fill="#E2E8F0" fontSize="10">&bull; <tspan fill="#34D399" fontWeight="bold">Half the heat loss (P_loss = I&sup2;R)</tspan></text>
              <text x="12" y="112" fill="#E2E8F0" fontSize="10">&bull; 10% to 80% in <tspan fill="#38BDF8" fontWeight="bold">18 minutes flat</tspan></text>
              <text x="12" y="128" fill="#CBD5E1" fontSize="10">&bull; Sustains &gt;200 kW across broad SoC range</text>
              <text x="12" y="146" fill="#10B981" fontSize="10" fontWeight="bold">&bull; Unlocks full capability of 350kW chargers</text>
            </g>
          </g>

          {/* Section 3: The Non-Linear Charging Curve Taper */}
          <g transform="translate(635, 20)">
            <rect x="0" y="0" width="290" height="440" rx="14" fill="#0B0F17" stroke="#334155" strokeWidth="1.5" />
            <rect x="15" y="15" width="260" height="32" rx="6" fill="#1E293B" />
            <text x="145" y="36" fill="#F59E0B" fontSize="13" fontWeight="bold" textAnchor="middle">3. The 10%&ndash;80% Taper Physics</text>

            {/* Mini Chart of Taper */}
            <g transform="translate(15, 60)">
              <rect x="0" y="0" width="260" height="150" rx="8" fill="#131B2A" stroke="#1E293B" />
              
              {/* Axes */}
              <line x1="30" y1="120" x2="245" y2="120" stroke="#475569" strokeWidth="1.5" />
              <line x1="30" y1="20" x2="30" y2="120" stroke="#475569" strokeWidth="1.5" />

              <text x="25" y="25" fill="#94A3B8" fontSize="8" textAnchor="end">250kW</text>
              <text x="25" y="70" fill="#94A3B8" fontSize="8" textAnchor="end">125kW</text>
              <text x="25" y="118" fill="#94A3B8" fontSize="8" textAnchor="end">0</text>

              {/* Taper Curve Area */}
              <path d="M 35 110 L 55 35 Q 110 38 150 75 Q 190 100 240 112 L 240 120 L 35 120 Z" fill="url(#l3TaperFill)" />
              {/* Curve Line */}
              <path d="M 35 110 L 55 35 Q 110 38 150 75 Q 190 100 240 112" fill="none" stroke="#38BDF8" strokeWidth="2.5" />

              {/* State of Charge Labels */}
              <text x="55" y="132" fill="#38BDF8" fontSize="9" textAnchor="middle">10%</text>
              <text x="150" y="132" fill="#F59E0B" fontSize="9" textAnchor="middle">50%</text>
              <text x="195" y="132" fill="#EF4444" fontSize="9" textAnchor="middle">80%</text>
              <text x="240" y="132" fill="#94A3B8" fontSize="9" textAnchor="middle">100%</text>

              {/* Peak Tag */}
              <rect x="55" y="20" width="70" height="15" rx="3" fill="#0284C7" />
              <text x="90" y="31" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">PEAK POWER</text>

              {/* Taper Tag */}
              <rect x="175" y="65" width="65" height="15" rx="3" fill="#DC2626" />
              <text x="207" y="76" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">80% TAPER</text>
            </g>

            {/* Why Does It Slow Down? */}
            <g transform="translate(15, 220)">
              <rect x="0" y="0" width="260" height="205" rx="8" fill="#131B2A" stroke="#1E293B" />
              <text x="12" y="22" fill="#F59E0B" fontSize="11" fontWeight="bold">ELECTROCHEMICAL REASONS:</text>
              
              <text x="12" y="44" fill="#E2E8F0" fontSize="10">&bull; <tspan fill="#F87171" fontWeight="bold">Lithium Plating Danger:</tspan> At high SoC, graphite</text>
              <text x="12" y="58" fill="#94A3B8" fontSize="10">  anodes saturate; high current forms dendrites.</text>

              <text x="12" y="78" fill="#E2E8F0" fontSize="10">&bull; <tspan fill="#38BDF8" fontWeight="bold">Internal Cell Resistance:</tspan> Back-EMF rises,</text>
              <text x="12" y="92" fill="#94A3B8" fontSize="10">  requiring lower amperage to prevent overvoltage.</text>

              <text x="12" y="114" fill="#FCD34D" fontSize="10" fontWeight="bold">ROAD TRIP EFFICIENCY RULE:</text>
              <rect x="10" y="124" width="240" height="70" rx="6" fill="#1E293B" stroke="#F59E0B" strokeWidth="0.8" />
              <text x="18" y="142" fill="#34D399" fontSize="10" fontWeight="bold">&bull; 10% &rarr; 80% takes ~20 to 30 mins</text>
              <text x="18" y="160" fill="#F87171" fontSize="10" fontWeight="bold">&bull; 80% &rarr; 100% takes another 30 to 45 mins!</text>
              <text x="18" y="180" fill="#E2E8F0" fontSize="9">Pro-Tip: Unplug at 80% and drive to next stop.</text>
            </g>
          </g>
        </svg>
      </div>

      <figcaption className="mt-3 text-xs text-slate-400 text-center italic">
        Figure 1: Commercial Level 3 DC Fast Charging architecture diagram detailing off-board 480V 3-phase AC-to-DC rectification, the physics behind 400V vs. 800V pack voltage bottlenecks, and the non-linear charging curve taper.
      </figcaption>
    </figure>
  );
}


