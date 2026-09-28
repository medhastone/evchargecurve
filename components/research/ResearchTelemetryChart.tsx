'use client';

import React, { useState } from 'react';
import { Activity, Info, Eye, EyeOff } from 'lucide-react';

interface ChartSeries {
  key: string;
  name: string;
  color: string;
  dashed?: boolean;
  unit: string;
}

interface TelemetryPoint {
  soc: number;
  [key: string]: number;
}

interface ResearchTelemetryChartProps {
  title: string;
  subtitle?: string;
  data: TelemetryPoint[];
  series: ChartSeries[];
  yAxisLabel?: string;
}

export default function ResearchTelemetryChart({
  title,
  subtitle,
  data,
  series,
  yAxisLabel = 'Power Delivery (kW)',
}: ResearchTelemetryChartProps) {
  const [activeHoverSoC, setActiveHoverSoC] = useState<number | null>(null);
  const [disabledSeries, setDisabledSeries] = useState<Record<string, boolean>>({});

  const toggleSeries = (key: string) => {
    setDisabledSeries((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Dimensions
  const width = 800;
  const height = 360;
  const padding = { top: 30, right: 30, bottom: 45, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Domain Calculations
  const minSoC = 10;
  const maxSoC = 80;

  // Max value among active series
  let maxVal = 0;
  data.forEach((d) => {
    series.forEach((s) => {
      if (!disabledSeries[s.key] && d[s.key] !== undefined) {
        if (d[s.key] > maxVal) maxVal = d[s.key];
      }
    });
  });
  const yMax = Math.ceil((maxVal * 1.1) / 50) * 50 || 350;

  const getX = (soc: number) => padding.left + ((soc - minSoC) / (maxSoC - minSoC)) * chartWidth;
  const getY = (val: number) => padding.top + chartHeight - (val / yMax) * chartHeight;

  // Generate SVG path for a series
  const generatePath = (sKey: string) => {
    const validPoints = data.filter((d) => d[sKey] !== undefined);
    if (validPoints.length === 0) return '';
    return validPoints
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.soc)} ${getY(d[sKey])}`)
      .join(' ');
  };

  // Hover data point
  const hoverPoint = activeHoverSoC !== null ? data.find((d) => d.soc === activeHoverSoC) : null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>High-Resolution Telemetry Overlay</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        {/* Series Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {series.map((s) => {
            const isDisabled = disabledSeries[s.key];
            return (
              <button
                key={s.key}
                onClick={() => toggleSeries(s.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  isDisabled
                    ? 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                    : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-600'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: s.color }}
                />
                <span className="truncate max-w-[140px]">{s.name}</span>
                {isDisabled ? <EyeOff className="w-3 h-3 text-slate-600 ml-0.5" /> : <Eye className="w-3 h-3 text-slate-400 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-x-auto select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[650px] font-mono text-xs"
        >
          {/* Background Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding.top + chartHeight * (1 - ratio);
            const val = Math.round(yMax * ratio);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#1E293B"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="#64748B"
                  className="text-[10px]"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* X Axis Grid & Labels */}
          {data.map((d, i) => {
            const x = getX(d.soc);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke="#1E293B"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 18}
                  textAnchor="middle"
                  fill="#94A3B8"
                  className="text-[11px] font-semibold"
                >
                  {d.soc}%
                </text>
              </g>
            );
          })}

          {/* Axis Labels */}
          <text
            x={width / 2}
            y={height - 8}
            textAnchor="middle"
            fill="#64748B"
            className="text-[10px] tracking-wider uppercase font-semibold"
          >
            State of Charge (SoC %)
          </text>
          <text
            x={-height / 2 + 10}
            y={18}
            transform="rotate(-90)"
            textAnchor="middle"
            fill="#64748B"
            className="text-[10px] tracking-wider uppercase font-semibold"
          >
            {yAxisLabel}
          </text>

          {/* Curves */}
          {series.map((s) => {
            if (disabledSeries[s.key]) return null;
            const pathData = generatePath(s.key);
            return (
              <g key={s.key}>
                <path
                  d={pathData}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2.5"
                  strokeDasharray={s.dashed ? '6 4' : undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />
                {/* Data Points */}
                {data.map((d, i) => {
                  if (d[s.key] === undefined) return null;
                  return (
                    <circle
                      key={i}
                      cx={getX(d.soc)}
                      cy={getY(d[s.key])}
                      r="4"
                      fill={s.color}
                      stroke="#0F172A"
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Interactive Hover Vertical Line */}
          {activeHoverSoC !== null && (
            <line
              x1={getX(activeHoverSoC)}
              y1={padding.top}
              x2={getX(activeHoverSoC)}
              y2={height - padding.bottom}
              stroke="#10B981"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}

          {/* Hover Interaction Overlay Rectangles */}
          {data.map((d, i) => {
            const x = getX(d.soc);
            const stepWidth = chartWidth / (data.length - 1);
            return (
              <rect
                key={i}
                x={x - stepWidth / 2}
                y={padding.top}
                width={stepWidth}
                height={chartHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActiveHoverSoC(d.soc)}
                onMouseLeave={() => setActiveHoverSoC(null)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip Box */}
        {hoverPoint && (
          <div className="absolute top-4 right-4 bg-slate-950/95 border border-slate-700/80 rounded-xl p-3.5 shadow-2xl backdrop-blur-md pointer-events-none min-w-[210px] z-10 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="text-xs font-bold text-white">SoC: {hoverPoint.soc}%</span>
              <span className="text-[10px] text-emerald-400 font-mono font-medium">CAN-Bus Logged</span>
            </div>
            <div className="space-y-1.5">
              {series.map((s) => {
                if (disabledSeries[s.key] || hoverPoint[s.key] === undefined) return null;
                return (
                  <div key={s.key} className="flex items-center justify-between text-xs gap-3">
                    <span className="text-slate-400 flex items-center gap-1.5 truncate max-w-[130px]">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="truncate">{s.name}</span>
                    </span>
                    <span className="font-mono font-bold text-white">
                      {hoverPoint[s.key]} {s.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>Hover over any SoC step to inspect instantaneous power demand. Toggle legend buttons to isolate vehicles.</span>
        </div>
        <span className="font-mono text-slate-500">1Hz Piecewise Integration</span>
      </div>
    </div>
  );
}
