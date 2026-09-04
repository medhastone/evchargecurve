import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import FastChargeSimulator from '@/components/FastChargeSimulator';
import { 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Flame, 
  Snowflake, 
  Gauge, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Charging Curve Calculator & DC Fast Charge Time Tool',
  description: 'Accurate EV charging curve calculator and DC fast charge time tool. Simulate real 10% to 80% taper drop-offs, charging speed, and charging session costs.',
  alternates: {
    canonical: 'https://evchargecurve.com',
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "EV DC Fast Charge Curve Simulator",
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
            "name": "Why do I need a specialized ev charging curve calculator instead of using peak kW?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Peak kW is only held briefly. An ev charging curve calculator is essential for realistic trip planning because it accounts for the inevitable taper as the battery fills, providing a mathematically accurate session duration."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is this dc fast charge time calculator for highway road trips?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Highly accurate. This dc fast charge time calculator is validated against real-world OBD2 CAN bus telemetry, perfectly modeling standard 10% to 80% charging windows and normal highway battery preconditioning."
            }
          },
          {
            "@type": "Question",
            "name": "Why does this dc fast charging speed drop off calculator warn against charging to 100%?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Because the 80% to 100% bracket takes longer than 10% to 80%. This dc fast charging speed drop off calculator highlights how staying plugged in increases per-minute DC stall fees while adding minimal range."
            }
          },
          {
            "@type": "Question",
            "name": "Can this ev charging taper curve simulator account for cold weather?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. This ev charging taper curve simulator factors in ambient temperature penalties. A cold battery without preconditioning will suffer severe speed throttling to prevent lithium plating."
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 relative z-10 leading-tight">
          Real-World <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">EV DC Fast Charging Curve Calculator</span> & Taper Simulator
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto mb-10 relative z-10">
          Stop estimating road trips with theoretical averages. Our ev charging curve calculator and dc fast charge time calculator simulate real battery taper drop-offs and session costs across 50+ electric vehicles.
        </p>
      </section>

      {/* Main Simulator Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-4 mb-20">
        <FastChargeSimulator />
        
        {/* Trust Badge */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 bg-[#131B2A]/80 border border-slate-800 rounded-2xl p-4 max-w-4xl mx-auto backdrop-blur-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-slate-300 font-medium text-center md:text-left tracking-wide">
            100% Client-Side Engine &bull; Validated Against SAE J1772 & ISO 15118 &bull; Real OBD2 CAN-Bus Curves
          </p>
        </div>
      </div>

      {/* Section 1: How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How Our EV Charging Curve Calculator Works
          </h2>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Most online tools use a single flat power average. Here is how our ev charging taper curve simulator models true battery chemistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">1</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
                <Cpu className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Select Vehicle & Hardware</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose your vehicle and charging station (50 kW to 350 kW 800V). Our ev charging curve calculator automatically loads your car's verified pack capacity, voltage architecture, and baseline C-rate limits.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">2</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(234,179,8,0.2)]">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Piecewise Taper Integration</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Instead of flat averages, this dc fast charge time calculator integrates charging power at 1% State of Charge (SOC) steps, calculating the exact voltage plateau and thermal throttling as cells fill.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">3</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Calculate Speed Drop-Off</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Acting as an interactive dc fast charging speed drop off calculator, the tool reveals your exact 10% to 80% duration and flags the steep time penalties of staying plugged in past 80% SOC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications & Competitor Comparison */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Specifications: EVChargeCurve vs Generic Tools
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            Why conventional online calculators fail on real road trips. Compare how our ev charging taper curve simulator calculates real sessions.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131B2A] shadow-2xl">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-[#0B0F17]">
              <tr>
                <th className="p-5 font-semibold text-slate-400 w-1/2 border-b border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-lg text-slate-300">Generic Calculators (Flat Math)</span>
                  </div>
                </th>
                <th className="p-5 font-semibold text-emerald-400 w-1/2 border-b border-emerald-500/30 bg-emerald-950/10 relative">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500/50"></div>
                  <div className="flex flex-col">
                    <span className="text-lg">EVChargeCurve Piecewise Engine</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Divides kWh by peak kW (Ignores taper)</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Integrated ev charging curve calculator using 1% SOC telemetry steps</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Assumes flat max speed to 100%</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Accurate dc fast charging speed drop off calculator modeling cell resistance</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Underestimates charging stops by 15-30 mins</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Precise dc fast charge time calculator with real taper curves</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Assumes ideal 72&deg;F lab conditions</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Integrated ev charging taper curve simulator with freezing pack penalties</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5 text-slate-400">Server-side page reloads and heavy trackers</td>
                <td className="p-5 border-l border-slate-800/60 text-emerald-300 font-medium bg-emerald-950/5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> 100% Client-side instant WebAssembly-grade calculation
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
              <Flame className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              Why do I need a specialized ev charging curve calculator instead of using peak kW?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Peak kW is only held briefly. An ev charging curve calculator is essential for realistic trip planning because it accounts for the inevitable taper as the battery fills, providing a mathematically accurate session duration.
            </p>
          </div>

          {/* FAQ Card 2 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <Snowflake className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              How accurate is this dc fast charge time calculator for highway road trips?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Highly accurate. This dc fast charge time calculator is validated against real-world OBD2 CAN bus telemetry, perfectly modeling standard 10% to 80% charging windows and normal highway battery preconditioning.
            </p>
          </div>

          {/* FAQ Card 3 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <Gauge className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Why does this dc fast charging speed drop off calculator warn against charging to 100%?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Because the 80% to 100% bracket takes longer than 10% to 80%. This dc fast charging speed drop off calculator highlights how staying plugged in increases per-minute DC stall fees while adding minimal range.
            </p>
          </div>

          {/* FAQ Card 4 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <Layers className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
              Can this ev charging taper curve simulator account for cold weather?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes. This ev charging taper curve simulator factors in ambient temperature penalties. A cold battery without preconditioning will suffer severe speed throttling to prevent lithium plating.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
