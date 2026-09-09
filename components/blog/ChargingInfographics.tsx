'use client';

import React from 'react';

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
