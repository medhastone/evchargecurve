import React from 'react';

export const CalendarAgingSvg = () => (
  <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 sm:p-6 mb-6 overflow-hidden">
    <h4 className="text-white font-bold text-sm sm:text-base mb-2">Calendar Aging Profile: SEI Layer Formation</h4>
    <p className="text-slate-400 text-xs mb-4">Capacity loss follows a non-linear &radic;t (square root of time) function.</p>
    
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] h-[300px]">
        <svg viewBox="0 0 800 300" className="w-full h-full font-sans">
          <defs>
            <linearGradient id="fadeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
            </linearGradient>
            
            <marker id="axisArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Grid */}
          {[20, 70, 120, 170, 220, 270].map(y => (
            <line key={`h-${y}`} x1="50" y1={y} x2="750" y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          ))}
          
          {[100, 200, 300, 400, 500, 600, 700].map(x => (
            <line key={`v-${x}`} x1={x} y1="20" x2={x} y2="270" stroke="#1e293b" strokeWidth="1" />
          ))}

          {/* Axes */}
          <line x1="50" y1="270" x2="770" y2="270" stroke="#64748b" strokeWidth="2" markerEnd="url(#axisArrow)" />
          <line x1="50" y1="270" x2="50" y2="10" stroke="#64748b" strokeWidth="2" markerEnd="url(#axisArrow)" />

          {/* Labels */}
          <text x="35" y="145" fill="#94a3b8" fontSize="12" transform="rotate(-90 35,145)" textAnchor="middle">Capacity Loss (%)</text>
          <text x="400" y="295" fill="#94a3b8" fontSize="12" textAnchor="middle">Time (Months)</text>

          {/* X Axis Ticks */}
          {[0, 12, 24, 36, 48, 60].map((val, i) => (
            <text key={`x-${val}`} x={50 + i * 140} y="285" fill="#64748b" fontSize="12" textAnchor="middle">{val}</text>
          ))}
          
          {/* Y Axis Ticks */}
          {['0%', '2%', '4%', '6%', '8%', '10%'].map((val, i) => (
            <text key={`y-${val}`} x="40" y={274 - i * 50} fill="#64748b" fontSize="12" textAnchor="end">{val}</text>
          ))}

          {/* Background Highlight for SEI Growth Phase */}
          <rect x="50" y="20" width="140" height="250" fill="#38bdf8" opacity="0.05" />
          <text x="120" y="40" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">Initial SEI Growth</text>
          <text x="120" y="55" fill="#7dd3fc" fontSize="10" textAnchor="middle">(Rapid Li+ Consumption)</text>
          <line x1="190" y1="20" x2="190" y2="270" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />

          {/* Square Root Time Curve Math: y = a * sqrt(x). a ~ 1.2. Path building */}
          {/* x=0,y=0(270) -> x=140(12mo),y=3.5%(270-3.5*25=182.5) -> x=280(24mo),y=4.9%(270-4.9*25=147.5) -> etc... */}
          <path d="M 50 270 Q 120 180 190 170 T 330 135 T 470 115 T 610 95 T 750 80" fill="none" stroke="#ef4444" strokeWidth="4" />
          
          <path d="M 50 270 Q 120 180 190 170 T 330 135 T 470 115 T 610 95 T 750 80 L 750 270 L 50 270 Z" fill="url(#fadeGradient)" />
          
          {/* Points */}
          <circle cx="50" cy="270" r="5" fill="#ef4444" />
          <circle cx="190" cy="170" r="5" fill="#ef4444" />
          <circle cx="330" cy="135" r="5" fill="#ef4444" />
          <circle cx="470" cy="115" r="5" fill="#ef4444" />
          <circle cx="750" cy="80" r="5" fill="#ef4444" />
          
          <text x="200" y="155" fill="#fca5a5" fontSize="11">~3.5% Loss</text>
          <text x="340" y="120" fill="#fca5a5" fontSize="11">~4.9% Loss</text>
          <text x="760" y="70" fill="#fca5a5" fontSize="11">~7.2% Loss</text>
          
          {/* The math annotation */}
          <rect x="580" y="140" width="160" height="40" rx="8" fill="#1e293b" stroke="#334155" />
          <text x="660" y="165" fill="#ef4444" fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Loss &prop; t&frac12;</text>
        </svg>
      </div>
    </div>
  </div>
);

export const ThermalStressSvg = () => (
  <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 sm:p-6 mb-6 overflow-hidden">
    <h4 className="text-white font-bold text-sm sm:text-base mb-2">Arrhenius Kinetics: Temperature vs Aging</h4>
    <p className="text-slate-400 text-xs mb-4">Chemical degradation rate doubles for roughly every 10&deg;C increase.</p>
    
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] h-[300px]">
        <svg viewBox="0 0 800 300" className="w-full h-full font-sans">
          {/* Grid */}
          {[30, 80, 130, 180, 230].map(y => (
            <line key={`h-${y}`} x1="80" y1={y} x2="750" y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          ))}
          
          {/* Bars */}
          <g transform="translate(130, 0)">
            <rect x="0" y="210" width="80" height="20" fill="#3b82f6" rx="4" />
            <text x="40" y="200" fill="#93c5fd" fontSize="12" textAnchor="middle">1x Rate</text>
            <text x="40" y="250" fill="#cbd5e1" fontSize="13" textAnchor="middle" fontWeight="bold">20&deg;C</text>
            <text x="40" y="265" fill="#64748b" fontSize="11" textAnchor="middle">(68&deg;F)</text>
          </g>

          <g transform="translate(280, 0)">
            <rect x="0" y="190" width="80" height="40" fill="#f59e0b" rx="4" />
            <text x="40" y="180" fill="#fcd34d" fontSize="12" textAnchor="middle">2x Rate</text>
            <text x="40" y="250" fill="#cbd5e1" fontSize="13" textAnchor="middle" fontWeight="bold">30&deg;C</text>
            <text x="40" y="265" fill="#64748b" fontSize="11" textAnchor="middle">(86&deg;F)</text>
          </g>
          
          <g transform="translate(430, 0)">
            <rect x="0" y="150" width="80" height="80" fill="#ef4444" rx="4" />
            <text x="40" y="140" fill="#fca5a5" fontSize="12" textAnchor="middle">4x Rate</text>
            <text x="40" y="250" fill="#cbd5e1" fontSize="13" textAnchor="middle" fontWeight="bold">40&deg;C</text>
            <text x="40" y="265" fill="#64748b" fontSize="11" textAnchor="middle">(104&deg;F)</text>
          </g>

          <g transform="translate(580, 0)">
            <rect x="0" y="70" width="80" height="160" fill="#b91c1c" rx="4" />
            <text x="40" y="60" fill="#f87171" fontSize="12" textAnchor="middle" fontWeight="bold">8x Rate</text>
            <text x="40" y="250" fill="#cbd5e1" fontSize="13" textAnchor="middle" fontWeight="bold">50&deg;C</text>
            <text x="40" y="265" fill="#64748b" fontSize="11" textAnchor="middle">(122&deg;F)</text>
          </g>

          {/* Connection Arrows (Exponential curve approximation) */}
          <path d="M 170 190 Q 250 190 320 170" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#axisArrow)"/>
          <path d="M 320 170 Q 400 130 470 130" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#axisArrow)"/>
          <path d="M 470 130 Q 550 50 620 50" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#axisArrow)"/>

          <line x1="80" y1="230" x2="750" y2="230" stroke="#64748b" strokeWidth="2" />
          <text x="60" y="130" fill="#94a3b8" fontSize="12" transform="rotate(-90 60,130)" textAnchor="middle">Relative Degradation Velocity</text>
        </svg>
      </div>
    </div>
  </div>
);
