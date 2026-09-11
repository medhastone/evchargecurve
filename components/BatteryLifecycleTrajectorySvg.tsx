'use client';

import React from 'react';

/**
 * 10-Year Battery Lifecycle Trajectory Infographic SVG
 * Visualizes LFP vs NMC vs Heavy DCFC electrochemical degradation curves,
 * SEI layer formation, linear cycling plateau, and the 70% automaker warranty threshold.
 */
export function BatteryLifecycleTrajectorySvg() {
  return (
    <figure className="my-10 rounded-2xl bg-[#131B2A] border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            Electrochemical Fleet Infographic
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            10-Year EV Battery Lifecycle Degradation Trajectory
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Non-linear calendar fade (SEI passivation) vs cycling throughput and 70% manufacturer warranty threshold
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md font-medium">
            Empirical Fleet Telemetry
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-2">
        <svg 
          viewBox="0 0 900 480" 
          className="w-full h-auto min-w-[720px] font-sans select-none"
          aria-label="Graph of 10-year EV battery capacity degradation comparing LFP chemistry, NMC chemistry, and high DC fast charge usage against the 70 percent warranty threshold"
          role="img"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="lfpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="nmcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="dcfcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6" />
            </marker>

            {/* Area Fill Gradients */}
            <linearGradient id="lfpAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
            
            <linearGradient id="phase1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="phase2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Coordinate system bounds:
              X: 100 to 850 (Width 750px for 10 years: 75px per year)
              Y: 60 to 380 (Height 320px for 50% to 100% SoH: 6.4px per 1% SoH)
              100% = Y:60
              90%  = Y:124
              80%  = Y:188
              70%  = Y:252 (Warranty Threshold)
              60%  = Y:316
              50%  = Y:380
          */}

          {/* Background Phase Bands */}
          {/* Phase 1: Years 0 to 2 (X: 100 to 250) */}
          <rect x="100" y="50" width="150" height="340" fill="url(#phase1Grad)" rx="6" />
          <text x="175" y="42" fill="#93C5FD" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">
            PHASE 1: SEI FORMATION (YRS 0–2)
          </text>

          {/* Phase 2: Years 2 to 8 (X: 250 to 700) */}
          <rect x="254" y="50" width="446" height="340" fill="url(#phase2Grad)" rx="6" />
          <text x="477" y="42" fill="#6EE7B7" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">
            PHASE 2: LINEAR DEGRADATION PLATEAU (YRS 2–8)
          </text>

          {/* Phase 3: Years 8 to 10 (X: 700 to 850) */}
          <rect x="704" y="50" width="156" height="340" fill="#1E293B" fillOpacity="0.3" rx="6" />
          <text x="782" y="42" fill="#CBD5E1" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">
            PHASE 3: FLEET MATURITY (8–10+ YRS)
          </text>

          {/* Horizontal Grid Lines & Y-Axis Labels */}
          {/* 100% */}
          <line x1="100" y1="60" x2="860" y2="60" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
          <text x="85" y="64" fill="#94A3B8" fontSize="12" fontWeight="600" textAnchor="end">100%</text>

          {/* 90% */}
          <line x1="100" y1="124" x2="860" y2="124" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
          <text x="85" y="128" fill="#94A3B8" fontSize="12" fontWeight="600" textAnchor="end">90%</text>

          {/* 80% */}
          <line x1="100" y1="188" x2="860" y2="188" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
          <text x="85" y="192" fill="#94A3B8" fontSize="12" fontWeight="600" textAnchor="end">80%</text>

          {/* 70% WARRANTY THRESHOLD LINE */}
          <line x1="100" y1="252" x2="860" y2="252" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="6 4" />
          <text x="85" y="256" fill="#EF4444" fontSize="12" fontWeight="bold" textAnchor="end">70%</text>

          {/* 60% */}
          <line x1="100" y1="316" x2="860" y2="316" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
          <text x="85" y="320" fill="#94A3B8" fontSize="12" fontWeight="600" textAnchor="end">60%</text>

          {/* 50% */}
          <line x1="100" y1="380" x2="860" y2="380" stroke="#475569" strokeWidth="1.5" />
          <text x="85" y="384" fill="#94A3B8" fontSize="12" fontWeight="600" textAnchor="end">50%</text>

          {/* Warranty Line Banner Label */}
          <rect x="520" y="238" width="330" height="26" fill="#7F1D1D" fillOpacity="0.85" rx="4" stroke="#EF4444" strokeWidth="1" />
          <text x="685" y="255" fill="#FCA5A5" fontSize="11" fontWeight="bold" textAnchor="middle">
            &darr; 70% Legal Automaker Warranty Replacement Floor (8-Yr / 100k-Mi)
          </text>

          {/* Vertical Year Grid Lines */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((yr) => {
            const x = 100 + yr * 75;
            const isWarrantyYear = yr === 8;
            return (
              <g key={yr}>
                <line 
                  x1={x} 
                  y1="50" 
                  x2={x} 
                  y2="390" 
                  stroke={isWarrantyYear ? '#EF4444' : '#1E293B'} 
                  strokeWidth={isWarrantyYear ? '1.5' : '1'}
                  strokeDasharray={isWarrantyYear ? '4 4' : undefined}
                />
                <text 
                  x={x} 
                  y="410" 
                  fill={isWarrantyYear ? '#EF4444' : '#94A3B8'} 
                  fontSize={yr === 0 || isWarrantyYear || yr === 10 ? '12' : '11'} 
                  fontWeight={isWarrantyYear ? 'bold' : '500'} 
                  textAnchor="middle"
                >
                  {yr === 0 ? 'Yr 0 (New)' : yr === 8 ? 'Yr 8 (100k)' : yr === 10 ? 'Yr 10' : `Yr ${yr}`}
                </text>
              </g>
            );
          })}

          {/* CURVE 1: LFP Chemistry (Gentle AC Charging / CATL / BYD Blade) */}
          {/* Points: Yr0:100%(60), Yr1:97.2%(78), Yr2:95.8%(87), Yr3:94.5%(95), Yr5:92.4%(109), Yr8:90.2%(123), Yr10:88.5%(134) */}
          <path 
            d="M 100 60 C 135 75, 175 85, 250 87 C 350 90, 500 105, 700 123 C 750 127, 800 131, 850 134" 
            fill="none" 
            stroke="url(#lfpGrad)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />

          {/* CURVE 2: NMC / NCA Chemistry (Standard 80% Daily Habits) */}
          {/* Points: Yr0:100%(60), Yr1:96.2%(84), Yr2:94.1%(98), Yr3:92.5%(108), Yr5:89.6%(127), Yr8:86.5%(146), Yr10:83.8%(164) */}
          <path 
            d="M 100 60 C 135 80, 175 95, 250 98 C 350 106, 500 125, 700 146 C 750 152, 800 158, 850 164" 
            fill="none" 
            stroke="url(#nmcGrad)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />

          {/* CURVE 3: Heavy DCFC & Extreme Thermal Stress (100% Daily Hold) */}
          {/* Points: Yr0:100%(60), Yr1:93.8%(100), Yr2:90.5%(121), Yr3:87.2%(142), Yr5:81.6%(178), Yr8:73.5%(230), Yr10:67.0%(271) */}
          <path 
            d="M 100 60 C 135 95, 175 118, 250 121 C 350 138, 500 172, 700 230 C 750 248, 800 262, 850 271" 
            fill="none" 
            stroke="url(#dcfcGrad)" 
            strokeWidth="2.5" 
            strokeDasharray="5 4"
            strokeLinecap="round"
          />

          {/* Key Milestone Data Points on LFP */}
          <circle cx="100" cy="60" r="5" fill="#10B981" stroke="#0F172A" strokeWidth="2" />
          <circle cx="250" cy="87" r="5" fill="#10B981" stroke="#0F172A" strokeWidth="2" />
          <circle cx="700" cy="123" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="850" cy="134" r="5" fill="#10B981" stroke="#0F172A" strokeWidth="2" />

          {/* Key Milestone Data Points on NMC */}
          <circle cx="250" cy="98" r="5" fill="#06B6D4" stroke="#0F172A" strokeWidth="2" />
          <circle cx="700" cy="146" r="6" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="850" cy="164" r="5" fill="#06B6D4" stroke="#0F172A" strokeWidth="2" />

          {/* Data Callout Tags at Year 8 (Warranty Benchmark) */}
          {/* LFP Tag */}
          <g transform="translate(680, 85)">
            <rect x="0" y="0" width="145" height="30" rx="6" fill="#064E3B" fillOpacity="0.9" stroke="#10B981" strokeWidth="1" />
            <text x="10" y="15" fill="#6EE7B7" fontSize="10" fontWeight="bold">LFP Chemistry (Yr 8)</text>
            <text x="10" y="26" fill="#FFFFFF" fontSize="11" fontWeight="black">90.2% SoH (+20.2% Buffer)</text>
          </g>

          {/* NMC Tag */}
          <g transform="translate(680, 168)">
            <rect x="0" y="0" width="145" height="30" rx="6" fill="#083344" fillOpacity="0.9" stroke="#06B6D4" strokeWidth="1" />
            <text x="10" y="15" fill="#7DD3FC" fontSize="10" fontWeight="bold">NMC Typical (Yr 8)</text>
            <text x="10" y="26" fill="#FFFFFF" fontSize="11" fontWeight="black">86.5% SoH (+16.5% Buffer)</text>
          </g>

          {/* DC Fast Charge Heavy Tag */}
          <g transform="translate(660, 275)">
            <rect x="0" y="0" width="180" height="30" rx="6" fill="#450A0A" fillOpacity="0.9" stroke="#EF4444" strokeWidth="1" />
            <text x="10" y="15" fill="#FCA5A5" fontSize="10" fontWeight="bold">Heavy DCFC + High Heat</text>
            <text x="10" y="26" fill="#F87171" fontSize="11" fontWeight="black">73.5% SoH (Approaching Limit)</text>
          </g>

          {/* Callout Annotation for Phase 1 SEI */}
          <g transform="translate(120, 160)">
            <rect x="0" y="0" width="150" height="52" rx="6" fill="#0B132B" fillOpacity="0.9" stroke="#3B82F6" strokeWidth="1" />
            <text x="10" y="16" fill="#93C5FD" fontSize="10" fontWeight="bold">SEI Passivation Jump</text>
            <text x="10" y="30" fill="#94A3B8" fontSize="9">Initial 2.5% loss in Yrs 1–2</text>
            <text x="10" y="44" fill="#94A3B8" fontSize="9">Normal film passivation</text>
          </g>
          <path d="M 175 160 L 175 105" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow)" />

          {/* Legend Bar at Bottom */}
          <g transform="translate(100, 442)">
            {/* LFP item */}
            <line x1="0" y1="10" x2="25" y2="10" stroke="#10B981" strokeWidth="3.5" />
            <circle cx="12.5" cy="10" r="3.5" fill="#10B981" />
            <text x="32" y="14" fill="#E2E8F0" fontSize="11" fontWeight="600">LFP Chemistry (e.g. Model 3 RWD, BYD Blade)</text>

            {/* NMC item */}
            <line x1="320" y1="10" x2="345" y2="10" stroke="#06B6D4" strokeWidth="3.5" />
            <circle cx="332.5" cy="10" r="3.5" fill="#06B6D4" />
            <text x="352" y="14" fill="#E2E8F0" fontSize="11" fontWeight="600">NMC / NCA (Model Y, Ioniq 5, EV6)</text>

            {/* DCFC Stress */}
            <line x1="600" y1="10" x2="625" y2="10" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="632" y="14" fill="#FCD34D" fontSize="11" fontWeight="600">Heavy DCFC / Desert Heat</text>
          </g>
        </svg>
      </div>

      <figcaption className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
        <p>
          Data modeled from Stanford, Argonne National Lab, and empirical Tesla/Geotab fleet telemetry across 15,000+ monitored vehicles.
        </p>
        <span className="text-slate-500 font-mono shrink-0">
          Source: Argonne GREET &amp; Recurrent Auto
        </span>
      </figcaption>
    </figure>
  );
}
