import React from 'react';

export default function SimulatorSkeleton() {
  return (
    <div className="w-full bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm animate-pulse">
      {/* Top action header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
        <div>
          <div className="h-7 w-64 bg-slate-800 rounded-lg mb-2"></div>
          <div className="h-4 w-80 bg-slate-800/60 rounded-md"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-28 bg-slate-800 rounded-xl"></div>
          <div className="h-9 w-24 bg-slate-800 rounded-xl"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Controls Skeleton */}
        <div className="xl:col-span-5 space-y-6">
          {/* Card 1: Vehicle Profile */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-32 bg-slate-700 rounded-md"></div>
              <div className="h-6 w-28 bg-slate-700/60 rounded-xl"></div>
            </div>
            <div className="h-11 w-full bg-slate-900/80 rounded-xl mb-4"></div>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/40">
              <div className="h-6 w-20 bg-slate-700/40 rounded-lg"></div>
              <div className="h-6 w-24 bg-slate-700/40 rounded-lg"></div>
              <div className="h-6 w-20 bg-slate-700/40 rounded-lg"></div>
              <div className="h-6 w-28 bg-slate-700/40 rounded-lg"></div>
            </div>
          </div>

          {/* Card 2: Dispenser Power */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl">
            <div className="h-5 w-44 bg-slate-700 rounded-md mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              <div className="h-14 bg-slate-900/80 rounded-xl"></div>
              <div className="h-14 bg-slate-900/80 rounded-xl"></div>
              <div className="h-14 bg-slate-900/80 rounded-xl"></div>
              <div className="h-14 bg-slate-900/80 rounded-xl"></div>
            </div>
          </div>

          {/* Card 3: SoC Range */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl">
            <div className="h-5 w-48 bg-slate-700 rounded-md mb-4"></div>
            <div className="space-y-4 mb-4">
              <div className="h-8 bg-slate-900/80 rounded-xl"></div>
              <div className="h-8 bg-slate-900/80 rounded-xl"></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-10 bg-slate-900/60 rounded-lg"></div>
              <div className="h-10 bg-slate-900/60 rounded-lg"></div>
              <div className="h-10 bg-slate-900/60 rounded-lg"></div>
            </div>
          </div>

          {/* Card 4: Weather & Rate */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-slate-800/40 border border-slate-700/60 rounded-2xl"></div>
            <div className="h-20 bg-slate-800/40 border border-slate-700/60 rounded-2xl"></div>
          </div>
        </div>

        {/* RIGHT COLUMN: Dashboard & Chart Skeleton */}
        <div className="xl:col-span-7 space-y-6">
          {/* KPI Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl">
              <div className="h-3 w-16 bg-slate-700 rounded mb-2"></div>
              <div className="h-8 w-20 bg-slate-600 rounded"></div>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl">
              <div className="h-3 w-16 bg-slate-700 rounded mb-2"></div>
              <div className="h-8 w-20 bg-slate-600 rounded"></div>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl">
              <div className="h-3 w-20 bg-slate-700 rounded mb-2"></div>
              <div className="h-8 w-20 bg-slate-600 rounded"></div>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl">
              <div className="h-3 w-20 bg-slate-700 rounded mb-2"></div>
              <div className="h-8 w-20 bg-slate-600 rounded"></div>
            </div>
          </div>

          {/* Chart Skeleton */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl h-[400px] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="h-5 w-44 bg-slate-700 rounded"></div>
              <div className="h-4 w-36 bg-slate-700/60 rounded"></div>
            </div>
            <div className="flex-1 my-4 flex items-end gap-3 px-4 pb-2 border-b border-l border-slate-700/50">
              <div className="h-[20%] w-full bg-emerald-500/10 rounded-t"></div>
              <div className="h-[65%] w-full bg-emerald-500/20 rounded-t"></div>
              <div className="h-[90%] w-full bg-emerald-500/30 rounded-t"></div>
              <div className="h-[80%] w-full bg-teal-500/25 rounded-t"></div>
              <div className="h-[60%] w-full bg-teal-500/20 rounded-t"></div>
              <div className="h-[45%] w-full bg-cyan-500/20 rounded-t"></div>
              <div className="h-[30%] w-full bg-cyan-500/15 rounded-t"></div>
              <div className="h-[15%] w-full bg-slate-700/20 rounded-t"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-mono">
              <span>0% SoC</span>
              <span>50% SoC</span>
              <span>100% SoC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
