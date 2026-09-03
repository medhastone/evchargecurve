import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VEHICLES } from '@/data/evModels';
import FastChargeSimulator from '@/components/FastChargeSimulator';
import { ChevronRight, Clock, Zap, AlertTriangle } from 'lucide-react';
import { calculateChargingSession } from '@/lib/evCalculations';

export async function generateStaticParams() {
  return Object.keys(VEHICLES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = VEHICLES[slug];
  
  if (!vehicle) {
    return { title: 'Not Found' };
  }

  const title = `${vehicle.brand} ${vehicle.model} DC Fast Charging Curve & 10-80% Time | EVChargeCurve`;
  const description = `Analyze the real charging speed, taper curve, 10-80% fast-charge duration, and winter degradation for the ${vehicle.year} ${vehicle.brand} ${vehicle.model}. Interactive calculator and real battery specs.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://evchargecurve.com/curve/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://evchargecurve.com/curve/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function CurvePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = VEHICLES[slug];

  if (!vehicle) {
    notFound();
  }

  const pack = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;

  // Generate table metrics using the existing calculateChargingSession function
  const sim10to50 = calculateChargingSession(vehicle.curve, 350, 10, 50, pack, false);
  const sim50to80 = calculateChargingSession(vehicle.curve, 350, 50, 80, pack, false);
  const sim80to100 = calculateChargingSession(vehicle.curve, 350, 80, 100, pack, false);
  const sim10to80 = calculateChargingSession(vehicle.curve, 350, 10, 80, pack, false);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `${vehicle.brand} ${vehicle.model} Charging Calculator`,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": (vehicle.faqs || []).map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center gap-2 text-sm text-slate-400 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <Link href="/curves" className="hover:text-emerald-400 transition-colors">Charging Curves</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-slate-300">{vehicle.brand}</span>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-slate-100 font-medium">{vehicle.model}</span>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          {vehicle.year} {vehicle.brand} {vehicle.model} Charging Curve
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl">
          Detailed analysis of the DC fast charging curve, including peak rates, tapering behavior, and true 10-80% times for the {vehicle.name}.
        </p>
      </section>

      {/* Simulator */}
      <FastChargeSimulator defaultVehicleId={slug} />

      {/* Editorial Table & Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Charging Bracket Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-emerald-400" />
              Real-World Charging Speed
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div>
                  <h3 className="font-bold text-white">10% to 50%</h3>
                  <p className="text-xs text-slate-400">Peak kW zone</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-emerald-400">{sim10to50.totalMinutes} min</p>
                  <p className="text-xs text-slate-400">Avg {sim10to50.avgKw} kW</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div>
                  <h3 className="font-bold text-white">50% to 80%</h3>
                  <p className="text-xs text-slate-400">Taper step-down zone</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-cyan-400">{sim50to80.totalMinutes} min</p>
                  <p className="text-xs text-slate-400">Avg {sim50to80.avgKw} kW</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-xl border border-orange-500/30">
                <div>
                  <h3 className="font-bold text-orange-400 flex items-center gap-2">
                    80% to 100%
                    <AlertTriangle className="w-4 h-4" />
                  </h3>
                  <p className="text-xs text-orange-300/70">Deep trickle zone</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-orange-400">{sim80to100.totalMinutes} min</p>
                  <p className="text-xs text-orange-300/70">Avg {sim80to100.avgKw} kW</p>
                </div>
              </div>
            </div>
          </div>

          {/* Segment Comparison */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-cyan-400" />
              Segment Benchmark
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="pb-3 text-sm font-semibold text-slate-400">Model</th>
                    <th className="pb-3 text-sm font-semibold text-slate-400">Peak kW</th>
                    <th className="pb-3 text-sm font-semibold text-slate-400">10-80% Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr className="bg-slate-800/20">
                    <td className="py-4 font-bold text-white">{vehicle.name}</td>
                    <td className="py-4 text-emerald-400 font-medium">{vehicle.maxChargeKw} kW</td>
                    <td className="py-4 text-emerald-400 font-medium">{sim10to80.totalMinutes} min</td>
                  </tr>
                  
                  {vehicle.topCompetitorIds?.map((compId: string) => {
                    const comp = VEHICLES[compId];
                    if (!comp) return null;
                    const compPack = comp.usablePackKwh || comp.batteryCapacity || 75;
                    const compSim = calculateChargingSession(comp.curve, 350, 10, 80, compPack, false);
                    return (
                      <tr key={compId}>
                        <td className="py-4 text-slate-300">
                          <Link href={`/curve/${compId}`} className="hover:text-cyan-400 transition-colors">
                            {comp.name}
                          </Link>
                        </td>
                        <td className="py-4 text-slate-400">{comp.maxChargeKw} kW</td>
                        <td className="py-4 text-slate-400">{compSim.totalMinutes} min</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </section>

      {/* FAQ Accordion */}
      {vehicle.faqs && vehicle.faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {vehicle.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-200 mb-3">{faq.question}</h3>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </div>
  );
}
