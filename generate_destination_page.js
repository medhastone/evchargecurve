const fs = require('fs');

const pageContent = `import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import DestinationChargingTool from '@/components/DestinationChargingTool';
import { Hotel, Zap, Sparkles, Building2, HelpCircle, ShieldCheck, DollarSign, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hotel EV Charger Speed Calculator | Overnight Charging Sizer',
  description:
    'Calculate if hotel Level 2 destination chargers will fully recharge your EV overnight. Models 208V commercial voltage drop, check-in durations, and eliminated stops.',
  alternates: {
    canonical: 'https://evchargecurve.com/destination-charging',
  },
};

export default function DestinationChargingPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Hotel EV Charger Speed Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'WebBrowser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Calculate if hotel Level 2 destination chargers will fully recharge your EV overnight. Models 208V commercial voltage drop, check-in durations, and eliminated stops.',
      },
      {
        '@type': 'ImageObject',
        contentUrl: 'https://evchargecurve.com/icon.png',
        name: 'Hotel EV Overnight Charging Sizer',
        description: 'Level 2 destination charging curve and 208V commercial power delivery diagram.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why do hotel EV chargers charge slower than home Level 2 chargers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Commercial hospitality properties utilize 208V 3-phase commercial electrical services rather than residential 240V split-phase power. At identical amperage (such as 32A), 208V delivers 6.6 kW compared to 7.7 kW at home, resulting in an automatic 13% reduction in charging speed.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does our destination charger kw to miles calculator factor power sharing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Many hotels deploy dual-head charging pedestals on a single circuit breaker (such as a shared 40A circuit). When two vehicles plug in simultaneously, power-sharing logic halves the amperage to 16A (3.3 kW each), doubling total session duration.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens if another EV owner unplugs my car overnight?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most modern electric vehicles automatically lock the J1772 or NACS charge port while the car is locked. Additionally, setting mobile app charging notifications alerts you if a power disruption occurs before your departure time.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can relying on an overnight ev charging time calculator cut road trip travel costs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Recharging 60–80 kWh overnight on complimentary or low-cost hotel Level 2 chargers saves between $25 and $40 compared to high-rate daytime DC fast chargers ($0.45 to $0.60 per kWh), while eliminating 30 to 45 minutes of morning dwell time.',
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400">
            Hotel EV Charger Speed Calculator
          </span>{' '}
          & Overnight Charging Sizer
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-6">
          Eliminate morning highway Supercharger stops. Calculate exact departure battery percentages based on hotel check-in duration and shared commercial AC voltages.
        </p>
        <div className="inline-flex items-center justify-center gap-2 bg-slate-900/90 text-amber-300 text-xs sm:text-sm font-medium py-2.5 px-5 rounded-full border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Most hotel chargers deliver 208V commercial 3-phase power rather than residential 240V, resulting in an automatic 13% reduction in charging speed.</span>
        </div>
      </section>

      {/* Interactive Tool Mounting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <DestinationChargingTool />
      </section>

      {/* Section 1: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            How Our Hotel EV Charger Speed Calculator Optimizes Road Trips
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Waking up to a full 100% battery saves 45 minutes of daytime travel. Here is how our calculator plans your stay.
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
                <Hotel className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Set Stay Duration</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Input your check-in and checkout times. The overnight ev charging time calculator maps your exact sleep window (e.g., 9:00 PM to 7:30 AM = 10.5 hours).
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
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">208V Commercial Hardware Profiling</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Using our commercial 208v ev charging calculator logic, the engine accounts for lower commercial line voltage and dual-pedestal power sharing.
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
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Eliminate Highway Stops</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Our destination charger kw to miles calculator shows miles added by morning and highlights the exact DC fast-charge stop eliminated from your route.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Technical Specifications: Hotel Charging Hardware Tiers
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Compare real charging throughput using our hotel ev charger speed calculator.
          </p>
        </div>

        <div className="bg-[#0B101A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#131C2D]">
            <div className="p-6 border-b md:border-b-0 md:border-r border-slate-800">
              <h3 className="font-semibold text-slate-200 text-base">Destination Hardware Profile</h3>
            </div>
            <div className="p-6 border-b md:border-b-0 border-emerald-500/40 bg-emerald-950/20 shadow-[inset_0_-2px_0_rgba(16,185,129,0.5)]">
              <h3 className="font-semibold text-emerald-400 text-base">Real Hourly Speed & 10-Hour Overnight Delivery</h3>
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Shared Low Power</span>
                Shared 16A Commercial (208V / 3.3 kW)
              </div>
              <div className="p-5 text-slate-300 bg-slate-900/30">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Overnight Throughput</span>
                Adds 10-12 miles/hour (Delivers ~30 kWh — 40% battery added)
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Standard Pedestal</span>
                Standard 30A Pedestal (208V / 6.2 kW)
              </div>
              <div className="p-5 text-slate-300 bg-slate-900/30">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Overnight Throughput</span>
                Adds 18-22 miles/hour (Delivers ~56 kWh — 75% battery added)
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">High-Speed Pedestal</span>
                Full 40A Destination Charger (208V / 8.3 kW)
              </div>
              <div className="p-5 text-emerald-400 bg-emerald-950/10 font-medium">
                <span className="text-xs uppercase tracking-wider text-emerald-500/70 block mb-1">Overnight Throughput</span>
                Adds 26-32 miles/hour (Delivers ~75 kWh — 100% full refill)
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Premium High Power</span>
                Premium 48A High-Power (240V / 11.5 kW)
              </div>
              <div className="p-5 text-emerald-400 font-semibold bg-emerald-950/20">
                <span className="text-xs uppercase tracking-wider text-emerald-500/70 block mb-1">Overnight Throughput</span>
                Adds 35-44 miles/hour (Full refill achieved in 6.5 hours)
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-center text-slate-500">
          Evaluated via our commercial 208v ev charging calculator engine across standard 3-phase hospitality electrical infrastructures.
        </p>
      </section>

      {/* Section 3: Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Essential hospitality and highway charging insights from our overnight ev charging time calculator team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                <Building2 className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Why do hotel EV chargers charge slower than home Level 2 chargers?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Residential homes utilize 240V single-phase power, whereas hotels operate on 208V 3-phase commercial electrical systems. This lower voltage results in approximately 13% less power delivered at the same amperage (e.g., 6.6 kW vs 7.7 kW at 32A).
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                <Zap className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How does our destination charger kw to miles calculator factor power sharing?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              When two vehicles share a dual-pedestal station, dynamic load sharing divides available circuit amperage between both vehicles. A 40A station delivers 20A per car until one vehicle finishes charging, at which point the remaining vehicle receives full power.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                <ShieldCheck className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                What happens if another EV owner unplugs my car overnight?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Most modern electric vehicles lock the charging connector into the vehicle's port automatically while the doors are locked. Displaying a small EV courtesy card on the dashboard also communicates expected unplug times respectfully with fellow travelers.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                <DollarSign className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Can relying on an overnight ev charging time calculator cut road trip travel costs?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes. Recharging a full 60–80 kWh battery pack overnight on free or flat-rate hotel chargers replaces expensive daytime DC fast charging sessions that typically cost $25 to $45, while saving 30 to 45 minutes of morning highway driving.
            </p>
          </div>
        </div>
      </section>

      <Script
        id="destination-charging-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </div>
  );
}
`;

fs.writeFileSync('app/destination-charging/page.tsx', pageContent);
console.log('Successfully written app/destination-charging/page.tsx');
