import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRightLeft } from 'lucide-react';
import CompareTool from '@/components/CompareTool';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Compare EV Fast Charging Curves',
  description: 'EV Charging Curve Comparison Tool: 10-80% Fast Charge Faceoff. Compare charging speeds, 800V vs 400V architecture, and road trip times.',
};

export default function ComparePage() {
  return (
    <div className="w-full bg-[#0B0F17] min-h-screen">
      {/* Header / Hero */}
      <div className="bg-slate-900 border-b border-slate-800 pt-12 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Compare EVs</span>
          </nav>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <ArrowRightLeft className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Head-to-Head <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Faceoff</span>
            </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Not all EVs charge the same. Some sprint to 50% and crash, while others hold steady power all the way to 80%. Compare charging curves, road trip wait times, and miles added in a 15-minute quick stop.
          </p>
        </div>
      </div>

      {/* Tool Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        <Suspense fallback={<div className="text-white p-8">Loading compare tool...</div>}><CompareTool /></Suspense>
      </div>

      {/* Editorial Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="prose prose-invert prose-emerald max-w-none">
          <h2 className="text-2xl font-bold text-white mb-6">Why 800V Architecture Matters</h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            When comparing charging speeds, you'll notice a massive difference between native <strong>800-volt architectures</strong> (like the Hyundai E-GMP platform or Porsche Taycan) and standard <strong>400-volt architectures</strong>. 
          </p>
          <p className="text-slate-400 leading-relaxed mb-6">
            At a high level, power equals voltage times current (P = V &times; I). Because charging cables are limited in how much current (Amps) they can safely carry without melting, the only way to significantly increase total power (kW) is to increase the voltage. 800V systems can absorb double the power at the exact same current level as a 400V system.
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">The "Charge Curve" Illusion</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automakers love to advertise "Peak Charging Speed." However, an EV might only hold its peak speed for 2 or 3 minutes before thermal limits force the battery management system (BMS) to step down the power. This is why the <strong>Average Sustained Power</strong> (which you can see in the scorecard above) is the most critical metric for estimating real-world wait times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
