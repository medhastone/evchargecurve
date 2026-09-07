const fs = require('fs');

const pageContent = `import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import PreconditioningTool from '@/components/PreconditioningTool';
import { Flame, Clock, CheckCircle2, ShieldAlert, Cpu, Sparkles, Navigation, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Battery Preconditioning Calculator | Cold Gate vs Time Saved',
  description:
    'Calculate if battery preconditioning saves net highway travel time. Compare energy spent heating the pack against minutes saved at DC fast chargers.',
  alternates: {
    canonical: 'https://evchargecurve.com/preconditioning',
  },
};

export default function PreconditioningPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'EV Battery Preconditioning Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'WebBrowser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Calculate if battery preconditioning saves net highway travel time versus cold-gating penalties.',
      },
      {
        '@type': 'ImageObject',
        contentUrl: 'https://evchargecurve.com/icon.png',
        name: 'EV Battery Thermal Preconditioning Model',
        description: 'Internal resistance and battery preconditioning thermal model diagram.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Does preconditioning save time fast charging if my battery is very low?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Preconditioning consumes significant traction energy (5 kW–7 kW). If your state of charge is below 10%, heating can induce range anxiety. In critical low-SOC situations, turn off preconditioning to safely arrive at the charger, accepting a temporary cold-gate taper instead of risking running out of charge.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does battery preconditioning show high energy costs on road trips?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Modern EVs utilize high-voltage Positive Temperature Coefficient (PTC) resistive heaters or heat pump loops consuming between 4.5 kWh and 7.0 kWh per heating session to elevate 1,000+ lbs of battery cells from ambient winter temperatures to the 85°F sweet spot.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does preconditioning protect against lithium plating?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'At sub-freezing temperatures, lithium ions cannot intercalate quickly into graphite anode layers. Forcing high charging currents into cold cells causes metallic lithium to plate onto anode surfaces, accelerating capacity degradation and dendrite risks. Preconditioning prevents lithium plating entirely.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I manually trigger battery preconditioning without built-in navigation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vehicles from Hyundai, Kia, Porsche, and select GM models provide a manual dashboard preconditioning button. For vehicles requiring native navigation (such as Tesla), setting a DC fast charger as the GPS waypoint triggers the preconditioning coolant loop automatically.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full">
      {/* Page Header & Tool Mounting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-20 md:pb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300">
            EV Battery Preconditioning Calculator
          </span>{' '}
          & Cold-Gate Time Tradeoff Tool
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-6">
          Preconditioning burns 4 to 8 kWh of driving range to warm your pack before charging. Calculate whether heating the battery saves net travel time or wastes battery power.
        </p>
        <div className="inline-flex items-center justify-center gap-2 bg-slate-900/90 text-cyan-400 text-xs sm:text-sm font-medium py-2.5 px-5 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Models internal cell impedance (R_int) thermal curves and high-voltage heater power draws (5 kW to 7 kW PTC coolant loops).</span>
        </div>
      </section>

      {/* Interactive Tool Mounting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <PreconditioningTool />
      </section>

      {/* Section 1: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            How Our Cold Gate vs Preconditioning Calculator Measures Net Road-Trip Time
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Stop guessing if preconditioning is worth the range drop. Here is the engineering behind the tradeoff in our cold gate vs preconditioning calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors">
              1
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Flame className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Preconditioning Energy Cost</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Our ev battery heating energy cost tool models the 5 kW–7 kW thermal load drawn by the BMS while driving, determining exact miles of highway range sacrificed.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors">
              2
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Cold-Gate Penalty Math</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Arriving cold avoids highway consumption, but stalls charging at 35 kW–50 kW while cells slowly warm. Our ev battery preconditioning calculator quantifies this stall delay.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors">
              3
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Net Travel Time Verdict</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Answering does preconditioning save time fast charging, the system compares total minutes spent driving and charging to deliver an indisputable stop-time verdict.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications & Benchmarks Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Technical Specifications: Charging Station Benchmarks
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Performance metrics generated by our ev battery preconditioning calculator on a 25°F highway stop. Our cold gate vs preconditioning calculator demonstrates the thermal impact on charge curves.
          </p>
        </div>

        <div className="bg-[#0B101A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#131C2D]">
            <div className="p-6 border-b md:border-b-0 md:border-r border-slate-800">
              <h3 className="font-semibold text-slate-200 text-base">Cold-Gated Arrival (No Preconditioning)</h3>
            </div>
            <div className="p-6 border-b md:border-b-0 border-emerald-500/40 bg-emerald-950/20 shadow-[inset_0_-2px_0_rgba(16,185,129,0.5)]">
              <h3 className="font-semibold text-emerald-400 text-base">Preconditioned Pack (Optimal 85°F Core Temp)</h3>
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Initial Power Acceptance</span>
                Restricted to 35 kW - 55 kW
              </div>
              <div className="p-5 text-emerald-400 bg-emerald-950/10 font-medium">
                <span className="text-xs uppercase tracking-wider text-emerald-500/70 block mb-1">Initial Power Acceptance</span>
                Instant peak acceptance (150 kW - 250 kW)
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Time Spent in Deep Taper</span>
                15 to 22 minutes wasted warming cells
              </div>
              <div className="p-5 text-slate-300 bg-slate-900/30">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Time Spent in Deep Taper</span>
                0 minutes wasted; immediate high-speed energy flow
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">10% to 80% Session Duration</span>
                46 to 55 minutes total duration
              </div>
              <div className="p-5 text-slate-300 bg-slate-900/30">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">10% to 80% Session Duration</span>
                18 to 28 minutes total duration
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Energy Burned Before Arrival</span>
                0 kWh sacrificed during transit
              </div>
              <div className="p-5 text-slate-300 bg-slate-900/30">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Energy Burned Before Arrival</span>
                4.5 to 6.5 kWh burned from traction pack
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Net Stop Efficiency</span>
                Adds 18-25 minutes of net journey delay
              </div>
              <div className="p-5 text-emerald-400 font-semibold bg-emerald-950/20">
                <span className="text-xs uppercase tracking-wider text-emerald-500/70 block mb-1">Net Stop Efficiency</span>
                Saves 12-18 minutes of net highway journey time
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-center text-slate-500">
          Evaluated via our ev battery heating energy cost tool based on split-loop heat pump and resistive coolant telemetry across winter temperatures.
        </p>
      </section>

      {/* Section 3: Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Clear engineering answers to does preconditioning save time fast charging under real winter driving conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                <ShieldAlert className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Does preconditioning save time fast charging if my battery is very low?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              If your battery is below 10% SOC upon approach, preconditioning can burn 3% to 6% of remaining pack capacity, inducing severe range anxiety. In low-SOC situations where arrival margin is slim, disable preconditioning and accept a temporary cold-gate stall to guarantee reaching the charger safely.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                <Cpu className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Why does the ev battery preconditioning calculator show high energy costs?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Elevating hundreds of kilograms of battery mass from sub-freezing temperatures to 85°F requires substantial energy. Our ev battery heating energy cost tool shows that dedicated 5 kW–7 kW high-voltage PTC coolant heaters require significant watt-hours before reaching peak ionic conductivity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                <Layers className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How does preconditioning protect against lithium plating?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              When fast-charging cold cells, slow lithium-ion diffusion causes metallic lithium to permanently deposit on the graphite anode rather than inserting safely. Preconditioning raises cell temperature, eliminating lithium plating risks, protecting cycle life, and unlocking manufacturer peak charge curves.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                <Navigation className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Can I manually trigger battery preconditioning without built-in navigation?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Certain vehicles (Hyundai E-GMP, Kia EV6/EV9, Porsche Taycan) offer manual dashboard preconditioning toggles. For brands requiring built-in navigation (such as Tesla), selecting a DC fast charger as the GPS waypoint activates preconditioning 20–45 minutes before arrival automatically.
            </p>
          </div>
        </div>
      </section>

      <Script
        id="preconditioning-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </div>
  );
}
`;

fs.writeFileSync('app/preconditioning/page.tsx', pageContent);
console.log('Adjusted app/preconditioning/page.tsx');
