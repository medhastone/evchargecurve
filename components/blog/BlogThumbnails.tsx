import React from 'react';

export const BatteryDegradationThumbnail = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="thumbBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B0F19" />
        <stop offset="100%" stopColor="#131B2A" />
      </linearGradient>
      <linearGradient id="thumbLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="thumbFill" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
      </linearGradient>
      <pattern id="thumbGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
      </pattern>
    </defs>
    
    <rect width="400" height="200" fill="url(#thumbBg)" />
    <rect width="400" height="200" fill="url(#thumbGrid)" />
    
    {/* Abstract Battery Outline */}
    <g transform="translate(140, 40)" opacity="0.1">
      <rect x="0" y="0" width="120" height="60" rx="8" fill="none" stroke="#64748b" strokeWidth="4" />
      <rect x="120" y="20" width="8" height="20" rx="2" fill="#64748b" />
    </g>

    {/* The SEI Curve */}
    <path d="M 20 180 Q 80 100 160 80 T 380 40 L 380 180 Z" fill="url(#thumbFill)" />
    <path d="M 20 180 Q 80 100 160 80 T 380 40" fill="none" stroke="url(#thumbLine)" strokeWidth="4" strokeLinecap="round" />
    
    <circle cx="20" cy="180" r="4" fill="#ef4444" />
    <circle cx="160" cy="80" r="4" fill="#8b5cf6" />
    <circle cx="380" cy="40" r="4" fill="#3b82f6" />

    {/* Small decorative text */}
    <text x="30" y="30" fill="#64748b" fontSize="12" fontFamily="monospace" fontWeight="bold">SOH CALC</text>
    <text x="350" y="180" fill="#64748b" fontSize="12" fontFamily="monospace" fontWeight="bold">10 YR</text>
  </svg>
);

export const ColdGateThumbnail = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="coldBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B0F19" />
        <stop offset="100%" stopColor="#131B2A" />
      </linearGradient>
      <linearGradient id="coldBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <pattern id="coldGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="400" height="200" fill="url(#coldBg)" />
    <rect width="400" height="200" fill="url(#coldGrid)" />
    
    {/* Abstract Thermometer/Ice */}
    <rect x="60" y="60" width="280" height="30" rx="15" fill="#1e293b" />
    <rect x="60" y="60" width="80" height="30" rx="15" fill="url(#coldBar)" />
    
    <rect x="60" y="110" width="280" height="30" rx="15" fill="#1e293b" />
    <rect x="60" y="110" width="240" height="30" rx="15" fill="#ef4444" />

    <text x="75" y="80" fill="#fff" fontSize="12" fontWeight="bold">32°F / 0°C</text>
    <text x="75" y="130" fill="#fff" fontSize="12" fontWeight="bold">77°F / 25°C</text>
  </svg>
);

export const Level2Thumbnail = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="panelBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B0F19" />
        <stop offset="100%" stopColor="#131B2A" />
      </linearGradient>
      <pattern id="panelGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="400" height="200" fill="url(#panelBg)" />
    <rect width="400" height="200" fill="url(#panelGrid)" />
    
    <circle cx="200" cy="100" r="60" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="250 100" transform="rotate(-90 200 100)" />
    <circle cx="200" cy="100" r="40" fill="none" stroke="#34d399" strokeWidth="8" strokeDasharray="180 100" transform="rotate(-90 200 100)" />
    
    <text x="200" y="95" fill="#fff" fontSize="18" fontWeight="bold" textAnchor="middle">80%</text>
    <text x="200" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">NEC RULE</text>
  </svg>
);

export const Nema1450Thumbnail = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="nemaBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B0F19" />
        <stop offset="100%" stopColor="#131B2A" />
      </linearGradient>
      <pattern id="nemaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
      </pattern>
      <filter id="nemaGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <rect width="400" height="200" fill="url(#nemaBg)" />
    <rect width="400" height="200" fill="url(#nemaGrid)" />
    
    <path d="M0 100 Q 100 80, 200 120 T 400 90" fill="none" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.3" filter="url(#nemaGlow)" />
    <path d="M0 130 Q 150 160, 250 90 T 400 110" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.3" />

    <g transform="translate(140, 40)">
      <circle cx="60" cy="60" r="50" fill="#0f172a" stroke="#334155" strokeWidth="4" />
      <circle cx="60" cy="60" r="40" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.5" />
      
      <path d="M 50 35 C 50 25, 70 25, 70 35 L 70 45 C 70 55, 50 55, 50 45 Z" fill="#94a3b8" />
      
      <rect x="30" y="55" width="10" height="25" rx="2" fill="#94a3b8" />
      
      <rect x="80" y="55" width="10" height="25" rx="2" fill="#94a3b8" />
      
      <rect x="45" y="85" width="30" height="10" rx="2" fill="#94a3b8" />
      
      <path d="M 125 30 L 140 10 L 135 40 Z" fill="#22d3ee" opacity="0.6" filter="url(#nemaGlow)" />
      <path d="M -15 80 L -30 60 L -25 90 Z" fill="#818cf8" opacity="0.6" filter="url(#nemaGlow)" />
    </g>
    
    <text x="200" y="180" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.7">
      240V • 50A • 9.6kW
    </text>
  </svg>
);

export const Level3Thumbnail = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="l3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B0F19" />
        <stop offset="100%" stopColor="#131B2A" />
      </linearGradient>
      <linearGradient id="l3BoltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>
      <linearGradient id="l3CurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="60%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <pattern id="l3Grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
      </pattern>
      <filter id="l3Glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <rect width="400" height="200" fill="url(#l3Bg)" />
    <rect width="400" height="200" fill="url(#l3Grid)" />
    
    {/* DC Fast Charge Taper Curve */}
    <path d="M 30 150 L 70 55 Q 120 50 190 65 Q 260 85 310 135 L 370 155" fill="none" stroke="url(#l3CurveGrad)" strokeWidth="4" strokeLinecap="round" filter="url(#l3Glow)" />
    <path d="M 30 150 L 70 55 Q 120 50 190 65 Q 260 85 310 135 L 370 155 L 370 170 L 30 170 Z" fill="url(#l3CurveGrad)" fillOpacity="0.12" />

    {/* Dispenser & Battery Icon Overlay */}
    <g transform="translate(160, 25)">
      {/* 350 kW Badge */}
      <rect x="0" y="0" width="80" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="40" y="17" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">350 kW DC</text>
    </g>
    
    <g transform="translate(45, 45)">
      <circle cx="10" cy="10" r="4" fill="#22d3ee" />
      <text x="20" y="14" fill="#94a3b8" fontSize="10" fontFamily="monospace">10% SoC (Peak)</text>
    </g>

    <g transform="translate(260, 115)">
      <circle cx="10" cy="10" r="4" fill="#ef4444" />
      <text x="20" y="14" fill="#f87171" fontSize="10" fontFamily="monospace">80% Taper</text>
    </g>
    
    <text x="200" y="188" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle" opacity="0.8">
      480V 3-PHASE • 50-350kW • DC DIRECT
    </text>
  </svg>
);

export const ChargeCurveThumbnail = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="ccBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B0F19" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </linearGradient>
      <linearGradient id="ccCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="50%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
      <pattern id="ccGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#312e81" strokeWidth="1" />
      </pattern>
      <filter id="ccGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <rect width="400" height="200" fill="url(#ccBg)" />
    <rect width="400" height="200" fill="url(#ccGrid)" />
    
    {/* Multiple Charging Curves for comparison */}
    {/* Level 1 */}
    <path d="M 30 170 L 370 160" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
    <text x="360" y="155" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="end">Level 1 (1.4 kW)</text>

    {/* Level 2 */}
    <path d="M 30 170 L 150 140 L 370 90" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" />
    <text x="360" y="80" fill="#60a5fa" fontSize="10" fontFamily="monospace" textAnchor="end">Level 2 (9.6 kW)</text>

    {/* Level 3 */}
    <path d="M 30 170 L 50 70 Q 150 50 250 100 Q 320 130 370 140" fill="none" stroke="url(#ccCurveGrad)" strokeWidth="4" strokeLinecap="round" filter="url(#ccGlow)" />
    
    <g transform="translate(160, 20)">
      <rect x="0" y="0" width="80" height="26" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
      <text x="40" y="17" fill="#818cf8" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CHARGING</text>
    </g>

    <text x="200" y="188" fill="#818cf8" fontSize="11" fontFamily="monospace" textAnchor="middle" opacity="0.8">
      TIME (MINUTES) VS CHARGE LEVEL (%)
    </text>
  </svg>
);


