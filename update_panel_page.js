const fs = require('fs');

const pageContent = `import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import PanelCapacityTool from '@/components/PanelCapacityTool';
import { SlidersVertical, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Charger Breaker Size Calculator | 100A Panel Capacity',
  description:
    'Calculate if your 100A or 200A home electrical panel can handle an EV charger without a costly upgrade. Computes NEC 80% continuous loads and breaker sizes.',
  alternates: {
    canonical: 'https://evchargecurve.com/panel-capacity',
  },
};

export default function PanelCapacityPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'EV Charger Breaker Size Calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'WebBrowser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Calculate if your 100A or 200A home electrical panel can handle an EV charger without a costly upgrade. Computes NEC 80% continuous loads and breaker sizes.',
      },
      {
        '@type': 'TechnicalArticle',
        headline: 'EV Charger Breaker Size Calculator & Electrical Panel Capacity Tool',
        description:
          'Professional electrical guide to calculating home service capacity, breaker sizing, and NEC 80% continuous load compliance for Level 2 EV charging.',
        author: {
          '@type': 'Organization',
          name: 'EV Charge Curve Engineering Team',
          url: 'https://evchargecurve.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'EV Charge Curve',
          url: 'https://evchargecurve.com',
        },
        mainEntityOfPage: 'https://evchargecurve.com/panel-capacity',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can my 100 amp panel handle an ev charger without upgrading to 200 amps?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Most commuters driving under 60 miles per day only require a 20A or 30A circuit (delivering 16A to 24A continuous at 240V). Sizing a Level 2 charger to your real daily commute prevents unnecessary $4,000 panel upgrades.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is an EV energy management system (EVEMS) load-shedder?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'An EVEMS or smart energy manager dynamically monitors your main panel service. If large appliances like an electric dryer or oven turn on, the EVEMS automatically throttles or pauses the EV charger to prevent main breaker overloads.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does the NEC enforce the 80% rule on EV circuits?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'NEC Article 625 classifies EV charging as a continuous load (drawing power for 3+ hours). Standard breakers generate internal heat under prolonged current; the 20% derating safety margin prevents thermal fatigue and nuisance tripping.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is hardwiring safer than installing a NEMA 14-50 receptacle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Hardwiring eliminates plug-and-receptacle contact resistance, prevents GFCI breaker nuisance tripping (double-GFCI conflicts), and supports full 48A (60A breaker) continuous charging.',
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            EV Charger Breaker Size Calculator
          </span>{' '}
          & Electrical Panel Capacity Tool
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-6">
          Avoid unnecessary $4,000 electrical service upgrades. Calculate real household continuous demand and determine safe breaker amperage under NEC Article 625 standards with our home electrical panel ev capacity tool.
        </p>
        <p className="text-sm text-emerald-400/90 max-w-3xl mx-auto font-medium flex items-center justify-center gap-2 bg-emerald-500/10 py-2.5 px-5 rounded-full border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Calculations generated by our ev continuous load calculator nec follow NFPA 70 National Electrical Code (NEC) Article 220 load calculation methods and the 80% continuous breaker rule.</span>
        </p>
      </section>

      {/* Interactive Tool Mounting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <PanelCapacityTool />
      </section>

      {/* Section 1: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            How Our EV Charger Breaker Size Calculator Works
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Electricians frequently recommend a 200A service replacement by default. Here is how our home electrical panel ev capacity tool finds safe, code-compliant alternatives.
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
                <SlidersVertical className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Audit Main Service</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Input your main panel size (100A, 125A, 150A, or 200A). The home electrical panel ev capacity tool evaluates your baseline split-phase 240V amperage.
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
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Deduct Major Heavy Loads</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Our ev continuous load calculator nec tallies major draws (central A/C, electric range, water heater, clothes dryer) to determine remaining unreserved capacity.
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
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Sizing the Circuit Breaker</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Determining can my 100 amp panel handle an ev charger, the system calculates whether a 16A (3.8 kW), 24A (5.7 kW), or 32A (7.7 kW) unit can be installed without tripping main lugs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications & Continuous Amps Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Technical Specifications: NEC 80% Continuous Load Ratings
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Review official amp-draw rules verified by our ev charger breaker size calculator.
          </p>
        </div>

        <div className="bg-[#0B101A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#131C2D]">
            <div className="p-6 border-b md:border-b-0 md:border-r border-slate-800">
              <h3 className="font-semibold text-slate-200 text-base">Dedicated Circuit Breaker Size</h3>
            </div>
            <div className="p-6 border-b md:border-b-0 border-emerald-500/30 bg-emerald-950/20 shadow-[inset_0_-2px_0_rgba(16,185,129,0.5)]">
              <h3 className="font-semibold text-emerald-400 text-base">Maximum Continuous EV Charging Draw (80% NEC Limit)</h3>
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                20-Amp Breaker (12 AWG Copper)
              </div>
              <div className="p-5 text-slate-400 bg-slate-900/30">
                16 Amps continuous (3.84 kW at 240V) — Adds 12-15 miles per hour
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                30-Amp Breaker (10 AWG Copper)
              </div>
              <div className="p-5 text-slate-400 bg-slate-900/30">
                24 Amps continuous (5.76 kW at 240V) — Adds 18-24 miles per hour
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                40-Amp Breaker (8 AWG Copper)
              </div>
              <div className="p-5 text-slate-400 bg-slate-900/30">
                32 Amps continuous (7.68 kW at 240V) — Adds 25-32 miles per hour
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                50-Amp Breaker (6 AWG Copper)
              </div>
              <div className="p-5 text-slate-400 bg-slate-900/30">
                40 Amps continuous (9.60 kW at 240V) — Adds 30-38 miles per hour
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
              <div className="p-5 font-medium text-slate-300 md:border-r border-slate-800">
                60-Amp Breaker (4-6 AWG THHN)
              </div>
              <div className="p-5 text-emerald-400/90 font-medium bg-emerald-950/10">
                48 Amps continuous (11.52 kW at 240V) — Requires hardwired connection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-3 text-lg">
              Can my 100 amp panel handle an ev charger without upgrading to 200 amps?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes, when homeowners ask can my 100 amp panel handle an ev charger without upgrading to 200 amps, the answer for most daily commuters is an emphatic yes. Sizing a 24A or 32A charger provides 180+ miles of range in an 8-hour overnight charging window, fully covering daily driving routines without overloading a 100A main service.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-3 text-lg">
              What is an EV energy management system (EVEMS) load-shedder?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              An EVEMS is an intelligent current monitor that dynamically regulates charging amperage based on total panel draw. When evaluating electrical service limits with existing electric heat or water tanks, an EVEMS pauses or reduces EV charging automatically whenever the dryer or stove turns on, preserving total safety.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-3 text-lg">
              Why does the NEC enforce the 80% rule on EV circuits?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Under NEC Article 625, electric vehicle supply equipment operates as a continuous load (drawing power for over 3 hours). The ev continuous load calculator nec accounts for continuous thermal accumulation inside circuit breakers, requiring a 20% safety overhead margin to prevent nuisance tripping and contact degradation.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-3 text-lg">
              Is hardwiring safer than installing a NEMA 14-50 receptacle?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Direct hardwiring eliminates plug contact resistance, prevents thermal melting on builder-grade outlets under sustained 40A draws, and eliminates double-GFCI nuisance tripping. Precise torque specs verified by our ev charger breaker size calculator ensure maximum long-term fire safety and reliability.
            </p>
          </div>
        </div>
      </section>

      <Script
        id="panel-capacity-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </div>
  );
}
`;

fs.writeFileSync('app/panel-capacity/page.tsx', pageContent);
console.log('Successfully written app/panel-capacity/page.tsx without image');
