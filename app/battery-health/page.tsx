import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import BatteryHealthTool from '@/components/BatteryHealthTool';
import { 
  Sliders, 
  Activity, 
  ShieldCheck, 
  BatteryWarning, 
  HeartPulse, 
  FileWarning,
  Zap 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Battery Degradation Calculator | State of Health Test',
  description: 'Calculate battery capacity loss with our EV battery degradation calculator. Run an EV battery health test, calculate State of Health, and verify warranties.',
  alternates: {
    canonical: 'https://evchargecurve.com/battery-health',
  },
};

export default function BatteryHealthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "EV Battery Degradation Calculator",
        "applicationCategory": "Utility",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does this ev battery degradation calculator model calendar vs cycle aging?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It applies non-linear square-root decay models to reflect reality. Batteries degrade faster in years 1-2 due to initial SEI layer formation before plateauing, rather than losing a flat percentage every year."
            }
          },
          {
            "@type": "Question",
            "name": "Can this ev battery health test calculator predict premature cell failure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "By analyzing State of Health (SoH) metrics and internal resistance increases, it provides a macro-level view of pack wear. While it cannot predict individual cell shorts, it highlights if your pack is degrading abnormally fast compared to fleet averages."
            }
          },
          {
            "@type": "Question",
            "name": "How does the ev battery warranty threshold calculator determine warranty claims?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most US and EU laws enforce a standard 8-year / 100,000-mile warranty that guarantees at least 70% capacity retention. This calculator projects your degradation curve to see if you will cross that 70% line before the time or mileage limits expire."
            }
          },
          {
            "@type": "Question",
            "name": "Why do daily charging habits alter the score on an ev state of health calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Charging to 100% daily, especially on NMC chemistries, holds the cells at a high voltage state. This accelerates cathode degradation and electrolyte breakdown, resulting in a significantly lower SoH score over time."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 relative z-10 leading-tight">
          EV Battery Degradation Calculator &amp; State of Health (SoH) Estimator
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto mb-10 relative z-10">
          Used EV buyers and long-term owners: Run a diagnostic ev battery health test calculator to determine remaining usable kWh, calendar wear, and factory warranty thresholds.
        </p>
      </section>

      {/* Main Simulator Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-4 mb-20">
        <BatteryHealthTool />
      </div>

      {/* Section 1: How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How Our EV Battery Degradation Calculator Analyzes Pack Wear
          </h2>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Most guides assume a flat 1% loss per year. Here is how our ev state of health calculator models real electrochemical aging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">1</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]">
                <Sliders className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Input Fleet Mileage &amp; Age</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Provide your odometer reading and vehicle age. Our ev battery degradation calculator maps these values against verified calendar aging curves across LFP and NMC battery chemistries.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">2</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]">
                <Activity className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Run State of Health Test</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Using our ev battery health test calculator, the platform applies non-linear decay curves to determine cycle wear and electrolyte breakdown from frequent DC fast charging.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">3</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Verify Warranty Thresholds</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our built-in ev battery warranty threshold calculator checks whether your capacity retention has dropped below the 70% threshold required for a free manufacturer battery pack replacement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications & Competitor Comparison */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Specifications: Degradation by Chemistry
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            Compare how different battery chemistries perform inside our ev battery degradation calculator.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131B2A] shadow-2xl">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-[#0B0F17]">
              <tr>
                <th className="p-5 font-semibold text-slate-400 w-1/2 border-b border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-lg text-slate-300">LFP (Lithium Iron Phosphate)</span>
                  </div>
                </th>
                <th className="p-5 font-semibold text-emerald-400 w-1/2 border-b border-emerald-500/30 bg-emerald-950/10 relative">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500/50"></div>
                  <div className="flex flex-col">
                    <span className="text-lg">NMC / NCA (Nickel Cobalt)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Higher retention in our ev state of health calculator</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Standard non-linear cycle fade</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Modelled with low calendar fade in our ev battery degradation calculator</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Accelerated by high ambient temperatures and sustained 100% SOC</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Requires periodic 100% calibration on an ev battery health test calculator</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Requires 80% daily charge ceiling to preserve cathode life</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Rarely triggers an ev battery warranty threshold calculator alert</td>
                <td className="p-5 border-l border-slate-800/60 text-emerald-300 font-medium bg-emerald-950/5 flex items-center gap-2">
                  Monitored closely past 100,000 miles for 70% retention limits
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Frequently Asked Questions */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQ Card 1 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <BatteryWarning className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              How does this ev battery degradation calculator model calendar vs cycle aging?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              It applies non-linear square-root decay models to reflect reality. Batteries degrade faster in years 1-2 due to initial SEI layer formation before plateauing, rather than losing a flat percentage every year.
            </p>
          </div>

          {/* FAQ Card 2 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <HeartPulse className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              Can this ev battery health test calculator predict premature cell failure?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              By analyzing State of Health (SoH) metrics and internal resistance increases, it provides a macro-level view of pack wear. While it cannot predict individual cell shorts, it highlights if your pack is degrading abnormally fast compared to fleet averages.
            </p>
          </div>

          {/* FAQ Card 3 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <FileWarning className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              How does the ev battery warranty threshold calculator determine warranty claims?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Most US and EU laws enforce a standard 8-year / 100,000-mile warranty that guarantees at least 70% capacity retention. This calculator projects your degradation curve to see if you will cross that 70% line before the time or mileage limits expire.
            </p>
          </div>

          {/* FAQ Card 4 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
              Why do daily charging habits alter the score on an ev state of health calculator?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Charging to 100% daily, especially on NMC chemistries, holds the cells at a high voltage state. This accelerates cathode degradation and electrolyte breakdown, resulting in a significantly lower SoH score over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
