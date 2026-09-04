import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import CarbonSavingsTool from '@/components/CarbonSavingsTool';
import { Fuel, Zap, Leaf, ShieldCheck, TreePine, Beaker, Car } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV CO2 Emissions Saved Calculator | Well-to-Wheel Offset',
  description: 'Calculate real carbon dioxide reduction from switching to an EV. Models Well-to-Wheel grid carbon intensity, gasoline upstream extraction, and tree offset equivalents.',
  alternates: {
    canonical: 'https://evchargecurve.com/carbon-offset',
  },
};

export default function CarbonOffsetPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "EV CO2 Emissions Saved Calculator",
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
            "name": "Is an EV really cleaner if charged on a fossil fuel grid?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Large combined-cycle power plants generate power at ~60% efficiency compared to internal combustion engines at ~20-25%. Our electric car carbon footprint calculator shows net savings even on fossil grids due to this immense thermal efficiency difference."
            }
          },
          {
            "@type": "Question",
            "name": "What is the manufacturing carbon 'payback period' of an EV battery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Manufacturing an EV battery creates a 'carbon debt' from mining and cathode synthesis. However, the ev vs gas co2 emissions calculator shows that this payback is typically achieved within 14,000 to 22,000 driving miles, after which the EV is permanently cleaner."
            }
          },
          {
            "@type": "Question",
            "name": "Why does our ev co2 emissions saved calculator include upstream fuel refining?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Extracting, transporting, and refining crude oil into gasoline requires extensive energy before fuel ever reaches a car's tank. Omitting this (like many generic calculators do) gives gasoline an unfair advantage."
            }
          },
          {
            "@type": "Question",
            "name": "How does charging on 100% rooftop solar change emissions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Charging via home solar ensures zero-carbon local generation. By optimizing daytime solar self-consumption, your well to wheel ev emissions tool profile drops to effectively zero grams of CO2 per mile."
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
          EV CO2 Emissions Saved Calculator &amp; Well-to-Wheel Offset
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto mb-10 relative z-10">
          Calculate real carbon dioxide reduction from switching to an EV using our comprehensive <strong>electric car carbon footprint calculator</strong>. Models Well-to-Wheel grid carbon intensity, gasoline upstream extraction, and tree offset equivalents with our precise <strong>ev co2 emissions saved calculator</strong>.
        </p>
      </section>

      {/* Main Interactive Tool Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-4 mb-20">
        <CarbonSavingsTool />
      </div>

      {/* Section 1: How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How Our EV CO2 Emissions Saved Calculator Works
          </h2>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Most generic green calculators assume electric cars produce zero emissions, ignoring power grid generation. Here is how our <strong>well to wheel ev emissions tool</strong> models true lifecycle carbon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-slate-800/40 select-none group-hover:text-slate-800/60 transition-colors">1</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
                <Fuel className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Model Upstream Gasoline Extraction</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Burning a gallon of gasoline produces 8,887 grams of tailpipe CO2. Our <strong>ev vs gas co2 emissions calculator</strong> adds an extra 2,213 grams per gallon for crude drilling, pipeline transit, and refining, calculating true Well-to-Wheel impact.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-slate-800/40 select-none group-hover:text-slate-800/60 transition-colors">2</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)]">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Localize Grid Carbon Intensity</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                An <strong>electric car carbon footprint calculator</strong> must factor in where you plug in. We calculate power plant fuel mixes—from hydro and solar to coal and natural gas—incorporating a 12% AC charging and line loss penalty.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-slate-800/40 select-none group-hover:text-slate-800/60 transition-colors">3</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
                <Leaf className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Quantify Environmental Offset</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The <strong>ev co2 emissions saved calculator</strong> determines your net atmospheric offset in metric tons, converting raw data into tangible metrics like equivalent urban tree absorption and avoided barrels of oil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications & Methodology */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Specifications: Full-Cycle Carbon Comparison
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            Comparing standard generic tools against our verified <strong>well to wheel ev emissions tool</strong>.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131B2A] shadow-2xl">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-[#0B0F17]">
              <tr>
                <th className="p-5 font-semibold text-slate-400 w-1/2 border-b border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-lg text-slate-300">Generic Online Calculators (Flawed)</span>
                  </div>
                </th>
                <th className="p-5 font-semibold text-emerald-400 w-1/2 border-b border-emerald-500/50 bg-emerald-950/10 relative shadow-[inset_0_2px_10px_-5px_rgba(16,185,129,0.3)] border-t border-t-emerald-500/30">
                  <div className="flex flex-col relative z-10">
                    <span className="text-lg text-emerald-400">EVChargeCurve Lifecycle Engine</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Tailpipe only (Falsely claims EV is 0 g CO2)</td>
                <td className="p-5 border-l border-emerald-500/20 text-white font-medium bg-emerald-950/5">Full Well-to-Wheel (WTW) lifecycle fuel analysis</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Static national average with no regional grid options</td>
                <td className="p-5 border-l border-emerald-500/20 text-white font-medium bg-emerald-950/5">Selectable regional grid carbon intensities (0 to 600 g/kWh)</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Ignores refinery energy (assumes 0 upstream emissions)</td>
                <td className="p-5 border-l border-emerald-500/20 text-white font-medium bg-emerald-950/5">Includes 25% upstream extraction and transportation overhead via our <strong>ev vs gas co2 emissions calculator</strong></td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Assumes 100% charger efficiency</td>
                <td className="p-5 border-l border-emerald-500/20 text-white font-medium bg-emerald-950/5">Models 12% thermal rectification and transmission losses</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5 text-slate-400">Uncited rough estimates</td>
                <td className="p-5 border-l border-emerald-500/20 text-emerald-300 font-medium bg-emerald-950/5">
                  Calibrated to EPA eGRID, DESNZ, and Ember climate datasets within this <strong>ev co2 emissions saved calculator</strong>
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
              <Zap className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              Is an EV really cleaner if charged on a fossil fuel grid?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes. Large combined-cycle power plants generate power at ~60% efficiency compared to internal combustion engines at ~20-25%. Our <strong>electric car carbon footprint calculator</strong> shows net savings even on fossil grids due to this immense thermal efficiency difference.
            </p>
          </div>

          {/* FAQ Card 2 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              What is the manufacturing carbon 'payback period' of an EV battery?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Manufacturing an EV battery creates a 'carbon debt' from mining and cathode synthesis. However, the <strong>ev vs gas co2 emissions calculator</strong> shows that this payback is typically achieved within 14,000 to 22,000 driving miles, after which the EV is permanently cleaner.
            </p>
          </div>

          {/* FAQ Card 3 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <Beaker className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              Why does our ev co2 emissions saved calculator include upstream fuel refining?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Extracting, transporting, and refining crude oil into gasoline requires extensive energy before fuel ever reaches a car's tank. Omitting this (like many generic calculators do) gives gasoline an unfair advantage in the total emissions equation.
            </p>
          </div>

          {/* FAQ Card 4 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <TreePine className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              How does charging on 100% rooftop solar change emissions?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Charging via home solar ensures zero-carbon local generation. By optimizing daytime solar self-consumption, your <strong>well to wheel ev emissions tool</strong> profile drops to effectively zero grams of CO2 per mile, accelerating environmental offset instantly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
