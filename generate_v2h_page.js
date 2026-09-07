const fs = require('fs');

const pageContent = `import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import V2HBackupTool from '@/components/V2HBackupTool';
import { BatteryCharging, Home, ShieldAlert, Zap, HelpCircle, ShieldCheck, Flame, Info, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV V2H Backup Calculator | How Long Can an EV Power My House?',
  description:
    'Calculate how many days your electric vehicle can power your home during an electrical outage. Models Ford Lightning, Ioniq 5, and Cybertruck V2H/V2L backup.',
  alternates: {
    canonical: 'https://evchargecurve.com/v2h-backup',
  },
};

export default function V2HBackupPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'EV V2H Backup Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'WebBrowser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Calculate how many days your electric vehicle can power your home during an electrical outage. Models Ford Lightning, Ioniq 5, and Cybertruck V2H/V2L backup.',
      },
      {
        '@type': 'ImageObject',
        contentUrl: 'https://evchargecurve.com/images/diagrams/v2h-home-backup-power-duration-chart.webp',
        name: 'V2H Home Emergency Power Discharge Duration Diagram',
        description: 'Diagram illustrating vehicle to home bidirectional power discharge run times powering critical home loads over 10 days.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long can an ev power my house calculator estimate backup time during an outage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'By dividing usable EV battery capacity by average daily household kilowatt-hour consumption. With essential emergency circuits (refrigerator, lighting, Wi-Fi router, medical devices) consuming 8–10 kWh per day, a 131 kWh EV battery sustains power for 10 to 14 days.',
            },
          },
          {
            '@type': 'Question',
            name: 'What hardware is required for full V2H bidirectional charging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vehicle-to-Home (V2H) requires a bidirectional DC charger or AC inverter system coupled to an automatic transfer switch and microgrid integration hub that disconnects your home from the utility grid during blackouts.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can the f150 lightning home power outage calculator model central air conditioning?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Central AC units exhibit high inrush Locked Rotor Amps (LRA). Adding an aftermarket soft-starter reduces inrush compressor surge within the 9.6 kW continuous inverter ceiling of the Ford F-150 Lightning Pro Power Onboard system.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does powering a house via V2H void the EV battery warranty?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Major automakers including Ford, General Motors, and Nissan officially support bidirectional discharge and cover V2H usage under standard high-voltage 8-year / 100,000-mile battery degradation warranties.',
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400">
            EV V2H Backup Calculator
          </span>{' '}
          & Home Emergency Run-Time Sizer
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-6">
          Turn your electric car into an emergency whole-home generator. Calculate how many days of electricity your EV battery provides during a storm or grid blackout. Our how long can an ev power my house calculator algorithm computes exact household autonomy.
        </p>
        <div className="inline-flex items-center justify-center gap-2 bg-slate-900/90 text-emerald-300 text-xs sm:text-sm font-medium py-2.5 px-5 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>A standard home backup battery (like a Tesla Powerwall) holds 13.5 kWh. A typical EV pack holds between 65 kWh and 131 kWh—equivalent to 5 to 10 home batteries.</span>
        </div>
      </section>

      {/* Interactive Tool Mounting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <V2HBackupTool />
      </section>

      {/* Image SEO & Technical Diagram Block */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <figure className="my-10 rounded-2xl border border-slate-800 bg-[#131B2A] p-4 shadow-2xl">
          <div className="relative w-full aspect-[1200/630] overflow-hidden rounded-xl bg-slate-950">
            <Image
              src="/images/diagrams/v2h-home-backup-power-duration-chart.webp"
              alt="Diagram illustrating vehicle to home bidirectional power discharge run times powering critical home loads over 10 days"
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority={false}
              referrerPolicy="no-referrer"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-slate-400">
            Figure 5: Emergency run-time duration curves computed by our v2h backup duration calculator based on essential circuits vs full-home HVAC operation.
          </figcaption>
        </figure>
      </section>

      {/* Section 1: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            How Our V2H Backup Duration Calculator Models Outage Survival
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Avoid buying expensive diesel generators. Here is how our vehicle to home bidirectional power sizer models continuous home backup.
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
                <BatteryCharging className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Pack Capacity & Driving Reserve</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Select your vehicle (e.g., Ford F-150 Lightning 131 kWh or Ioniq 5 77 kWh). The system locks in an emergency driving buffer (e.g., 20%) so you can evacuate if needed.
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
                <Home className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Select Critical Appliances</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Toggle real-world household appliances: refrigerators (~1.5 kWh/day), LED lights & router (~0.8 kWh/day), sump pump (~1.2 kWh/day), or central heat pumps (~15 kWh/day).
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
                <ShieldAlert className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Calculate Outage Days</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Answering how long can an ev power my house calculator queries, the engine outputs exact survival hours, days, and hourly battery depletion curves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Technical Specifications: Emergency Backup Comparison
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Comparing bidirectional EV backup with noisy fuel generators using our v2h backup duration calculator.
          </p>
        </div>

        <div className="bg-[#0B101A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#131C2D]">
            <div className="p-6 border-b md:border-b-0 md:border-r border-slate-800">
              <h3 className="font-semibold text-slate-200 text-base">Gasoline / Propane Generator (7.5 kW)</h3>
            </div>
            <div className="p-6 border-b md:border-b-0 border-emerald-500/40 bg-emerald-950/20 shadow-[inset_0_-2px_0_rgba(16,185,129,0.5)]">
              <h3 className="font-semibold text-emerald-400 text-base">Bidirectional EV System (V2H / V2L)</h3>
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Energy Storage / Fuel Source</span>
                Requires 10-15 gallons of fuel daily
              </div>
              <div className="p-5 text-emerald-400 bg-slate-900/30 font-medium">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Stored Battery Power</span>
                65 to 131 kWh stored clean inside car battery
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Continuous Power Delivery</span>
                Surges and fluctuates; loud exhaust noise
              </div>
              <div className="p-5 text-slate-200 bg-slate-900/30">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Clean Output</span>
                Pure sine wave electricity (3.6 kW to 9.6 kW continuous)
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Outage Run Time (Critical Loads)</span>
                1 to 3 days (Limited by gasoline access)
              </div>
              <div className="p-5 text-emerald-400 bg-emerald-950/10 font-medium">
                <span className="text-xs uppercase tracking-wider text-emerald-500/70 block mb-1">Resiliency Window</span>
                Calculated by our f150 lightning home power outage calculator at 5 to 11 days
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">Maintenance & Safety</span>
                Oil changes, exhaust carbon monoxide hazard
              </div>
              <div className="p-5 text-emerald-400 font-semibold bg-emerald-950/20">
                <span className="text-xs uppercase tracking-wider text-emerald-500/70 block mb-1">Turnkey Operation</span>
                Silent, automatic, indoor transfer switch integration
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-center text-slate-500">
          Engineered using our vehicle to home bidirectional power sizer modeling standard microgrid transfer switches and residential loads.
        </p>
      </section>

      {/* Section 3: Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Practical emergency power insights evaluated across major EV platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                <Zap className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How long can an ev power my house calculator estimate backup time during an outage?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Calculations divide total usable kilowatt-hours by daily appliance demand. When non-essential heating loads are managed responsibly, a typical 77–131 kWh EV battery easily powers critical survival loads for over a week.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                <Home className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                What hardware is required for full V2H bidirectional charging?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Full V2H relies on an automatic transfer switch, bidirectional wall box or DC-to-AC inverter, and isolation relay to safely sever the utility grid connection and energize selected household sub-panels during an outage.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                <ShieldCheck className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Can the f150 lightning home power outage calculator model central air conditioning?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes. While heavy central AC units demand substantial running power, installing an HVAC soft-starter caps locked-rotor surge current, allowing the 9.6 kW Pro Power Onboard inverter to handle whole-home cooling safely.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                <ShieldAlert className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Does powering a house via V2H void the EV battery warranty?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automakers engineering V2H (such as Ford, GM, Hyundai, and Nissan) fully endorse and cover bidirectional power discharge under standard 8-year / 100,000-mile factory battery warranty protections.
            </p>
          </div>
        </div>
      </section>

      <Script
        id="v2h-backup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </div>
  );
}
`;

fs.writeFileSync('app/v2h-backup/page.tsx', pageContent);
console.log('Successfully written app/v2h-backup/page.tsx');
