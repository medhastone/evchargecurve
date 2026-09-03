import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import BatteryHealthTool from '@/components/BatteryHealthTool';

export const metadata = {
  title: 'EV Battery Degradation Calculator & State of Health Test',
  description: 'Analyze EV battery health, non-linear degradation, and warranty thresholds based on cell chemistry and charging habits.',
};

export default function BatteryHealthPage() {
  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-200 font-medium">Battery Health</span>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Battery State-of-Health (SoH)
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
          Analyze long-term non-linear degradation based on chemistry (LFP vs NMC), age, mileage, and your daily charging habits.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <BatteryHealthTool />

      {/* Educational Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
            Understanding Lithium-Ion Degradation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">Calendar Aging</h3>
              <p className="text-slate-400 leading-relaxed">
                Even when an EV is parked and turned off, the battery slowly degrades over time. This is known as calendar aging. It is heavily influenced by the State of Charge (SoC) it sits at and ambient temperatures. Leaving an NMC battery sitting at 100% in hot weather accelerates this chemical wear.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Cyclic Aging</h3>
              <p className="text-slate-400 leading-relaxed">
                Every time you charge and discharge the battery, physical stress occurs within the cell structures (such as lithium plating and dendrite growth). The depth of discharge (DoD) matters—smaller, frequent top-ups (e.g., 50% to 80%) are significantly better for longevity than deep cycles (0% to 100%).
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Chemistry Nuances: LFP vs NMC</h3>
              <p className="text-slate-400 leading-relaxed">
                Lithium Iron Phosphate (LFP) cells are structurally more robust than Nickel Manganese Cobalt (NMC) cells. While NMC provides higher energy density (more range in the same footprint), LFP batteries withstand 100% daily charging without rapid degradation and generally offer thousands of more cycles before failure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-3">Thermal Stress & Fast Charging</h3>
              <p className="text-slate-400 leading-relaxed">
                DC Fast Charging pushes massive amounts of current into the battery, generating significant heat. While modern EVs have excellent liquid cooling systems, frequent supercharging without preconditioning can accelerate lithium plating, causing a slight but permanent drop in usable capacity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
