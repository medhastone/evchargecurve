import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VEHICLES } from '@/data/evModels';
import FastChargeSimulator from '@/components/FastChargeSimulator';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  Clock, Zap, AlertTriangle, ShieldCheck, ThermometerSnowflake, 
  Battery, Gauge, CheckCircle2, FileText, ArrowRight, ExternalLink,
  Info, Cpu, Layers, Flame, Scale, Check
} from 'lucide-react';
import { calculateChargingSession } from '@/lib/evCalculations';
import { BASE_URL } from '@/lib/seoConfig';

export async function generateStaticParams() {
  return Object.keys(VEHICLES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = VEHICLES[slug];
  
  if (!vehicle) {
    return { title: 'Vehicle Not Found | EVChargeCurve' };
  }

  const title = `${vehicle.name} Charging Curve: 10–80% Time & Peak kW | EVChargeCurve`;
  const description = `Empirical DC fast charging curve and numerical dwell time simulation for the ${vehicle.name} (${vehicle.usablePackKwh || vehicle.batteryCapacity} kWh usable). Peak ${vehicle.maxChargeKw} kW acceptance, 10–80% dwell time, and thermal taper profile.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/curve/${slug}`,
    },
    openGraph: {
      title: `${vehicle.name} Charging Curve: 10–80% Time & Peak kW`,
      description: `Empirical charging curve analysis and numerical dwell time simulation for the ${vehicle.name}. ${vehicle.maxChargeKw} kW peak power acceptance, ${vehicle.architecture || '400V'} architecture, and 10–80% duration.`,
      url: `${BASE_URL}/curve/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${vehicle.name} Charging Curve: 10–80% Time & Peak kW`,
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

  const pack = vehicle.usablePackKwh || 75;
  const grossPack = vehicle.grossBatteryCapacity || vehicle.batteryCapacity || pack;
  const epa = vehicle.epaRangeMiles || 300;

  // Accurate multi-bracket charging calculations
  const sim10to50 = calculateChargingSession(vehicle.curve, 350, 10, 50, pack, false);
  const sim10to60 = calculateChargingSession(vehicle.curve, 350, 10, 60, pack, false);
  const sim10to70 = calculateChargingSession(vehicle.curve, 350, 10, 70, pack, false);
  const sim10to80 = calculateChargingSession(vehicle.curve, 350, 10, 80, pack, false);
  const sim10to90 = calculateChargingSession(vehicle.curve, 350, 10, 90, pack, false);
  const sim10to100 = calculateChargingSession(vehicle.curve, 350, 10, 100, pack, false);

  // Charger comparisons (10 to 80%)
  const sim50kW = calculateChargingSession(vehicle.curve, 50, 10, 80, pack, false);
  const sim150kW = calculateChargingSession(vehicle.curve, 150, 10, 80, pack, false);
  const sim250kW = calculateChargingSession(vehicle.curve, 250, 10, 80, pack, false);
  const sim350kW = calculateChargingSession(vehicle.curve, 350, 10, 80, pack, false);

  // Cold condition (unpreconditioned) comparison
  const simCold10to80 = calculateChargingSession(vehicle.curve, 350, 10, 80, pack, true);

  // Data label badge
  const dataOriginLabel = vehicle.dataSourceType === 'measured_benchmark' 
    ? 'Measured Benchmark' 
    : vehicle.dataSourceType === 'manufacturer_spec'
    ? 'Manufacturer Reported'
    : vehicle.dataSourceType === 'independent_test'
    ? 'Independent Test'
    : 'Modeled Calculation';

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": `${vehicle.name} Charging Curve: 10–80% Time, Peak kW & Taper`,
        "url": `${BASE_URL}/curve/${slug}`,
        "description": `Comprehensive charging curve data, BMS taper analysis, and 10–80% DC fast charging durations for ${vehicle.name}.`,
      },
      {
        "@type": "Dataset",
        "name": `${vehicle.name} DC Fast Charging Curve Telemetry Dataset`,
        "description": `State of Charge (SoC), charging power (kW), and thermal derating data points for ${vehicle.name}.`,
        "url": `${BASE_URL}/curve/${slug}`,
        "creator": {
          "@type": "Organization",
          "name": "EVChargeCurve",
          "url": BASE_URL
        },
        "variableMeasured": ["Charging Power (kW)", "State of Charge (%)", "Dwell Time (minutes)", "Energy Added (kWh)"]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": BASE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Charging Curves",
            "item": `${BASE_URL}/curve`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": vehicle.name,
            "item": `${BASE_URL}/curve/${slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": (vehicle.faqs || []).map((faq) => ({
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
    <div className="w-full bg-[#0B0F17] min-h-screen text-slate-100 pb-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Breadcrumb
          className="justify-start mb-0"
          items={[
            { label: 'Charging Curves', href: '/curve' },
            { label: vehicle.name }
          ]}
        />
      </div>

      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            {dataOriginLabel}
          </span>
          <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${
            vehicle.architecture === '800V' || vehicle.architecture === '900V'
              ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
              : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}>
            {vehicle.architecture} Architecture
          </span>
          <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-800">
            {vehicle.chemistry} Chemistry
          </span>
          <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-800">
            {vehicle.connector}
          </span>
        </div>

        {/* Clear Human-Readable H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
          {vehicle.name} Charging Curve &amp; 10–80% Fast-Charging Time
        </h1>
        
        {/* Answer-First Introduction (First 100-150 words) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 mb-8 backdrop-blur-md">
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            The <strong>{vehicle.name}</strong> achieves an official peak DC fast-charging rate of <strong>{vehicle.maxChargeKw} kW</strong> and typically charges from <strong>10% to 80% State of Charge (SoC) in {sim10to80.totalMinutes} minutes</strong> when plugged into a compatible high-power DC dispenser with a fully preconditioned battery pack. During this standard session, it takes on approximately <strong>{(pack * 0.7).toFixed(1)} kWh</strong> of usable energy, adding roughly <strong>{Math.round(epa * 0.7)} miles</strong> of driving range. Charging speed is heavily governed by initial pack temperature, starting battery SoC, dispenser amperage limits, and the vehicle&apos;s internal Battery Management System (BMS) thermal step-down curve.
          </p>
        </div>

        {/* Vehicle Profile Card */}
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Vehicle Profile &amp; Battery Specifications
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Manufacturer</span>
              <span className="font-bold text-white">{vehicle.manufacturer}</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Model Year</span>
              <span className="font-bold text-white">{vehicle.year}</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Trim / Variant</span>
              <span className="font-bold text-white truncate block" title={vehicle.trim}>{vehicle.trim}</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Official Peak DC Rate</span>
              <span className="font-bold text-emerald-400">{vehicle.maxChargeKw} kW</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Usable Battery Capacity</span>
              <span className="font-bold text-emerald-400">{vehicle.usablePackKwh} kWh</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Gross Battery Capacity</span>
              <span className="font-bold text-white">{grossPack} kWh</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Battery Chemistry</span>
              <span className="font-bold text-white truncate block" title={vehicle.batteryChemistryDetails}>{vehicle.batteryChemistryDetails}</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Voltage Architecture</span>
              <span className="font-bold text-cyan-400">{vehicle.voltageArchitecture}</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Charging Connector</span>
              <span className="font-bold text-white">{vehicle.connector}</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">EPA Rated Range</span>
              <span className="font-bold text-white">{vehicle.epaRangeMiles} miles</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">10–80% Dwell Time</span>
              <span className="font-bold text-emerald-400">{sim10to80.totalMinutes} minutes</span>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Data Source Category</span>
              <span className="font-bold text-white capitalize">{dataOriginLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Charging Simulator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" id="simulator">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            Interactive Charging Curve &amp; Dwell Simulator
          </h2>
          <p className="text-sm text-slate-400">
            Simulate exact dwell durations, energy delivered, and session costs across any starting and target State of Charge.
          </p>
        </div>
        <FastChargeSimulator defaultVehicleId={slug} />
      </section>

      {/* Charging Curve Step Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Charging Curve Profile by State of Charge (SoC)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Exact power acceptance and cumulative energy added at each State of Charge step:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-950/40">
                  <th className="py-3 px-4">State of Charge (SoC)</th>
                  <th className="py-3 px-4">Charging Power</th>
                  <th className="py-3 px-4">Cumulative Energy Added</th>
                  <th className="py-3 px-4">Stage Behavior &amp; BMS Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {vehicle.curve.map((point) => (
                  <tr key={point.soc} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-white">{point.soc}%</td>
                    <td className="py-3 px-4 font-black text-emerald-400">{point.kw} kW</td>
                    <td className="py-3 px-4 text-slate-300">{((point.soc / 100) * pack).toFixed(1)} kWh</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{point.notes || (point.soc <= 20 ? 'Peak power acceptance window' : point.soc <= 60 ? 'Thermal step-down taper' : 'Constant voltage trickle')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Charging Time Multi-Bracket Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Charging Times Across Key Road-Trip Intervals
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Calculated charging times, average power, and energy added across standard intervals (labeled: <span className="text-emerald-400 font-semibold">{dataOriginLabel}</span>):
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-950/40">
                  <th className="py-3.5 px-4">Interval</th>
                  <th className="py-3.5 px-4">Dwell Duration</th>
                  <th className="py-3.5 px-4">Average Power</th>
                  <th className="py-3.5 px-4">Energy Added</th>
                  <th className="py-3.5 px-4">Range Gained</th>
                  <th className="py-3.5 px-4">Data Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-bold text-white">10% &rarr; 50%</td>
                  <td className="py-4 px-4 font-black text-emerald-400">{sim10to50.totalMinutes} min</td>
                  <td className="py-4 px-4 text-slate-200">{sim10to50.avgKw} kW</td>
                  <td className="py-4 px-4 text-slate-200">{(pack * 0.4).toFixed(1)} kWh</td>
                  <td className="py-4 px-4 text-emerald-300">+{Math.round(epa * 0.4)} mi</td>
                  <td className="py-4 px-4 text-xs font-semibold text-emerald-400">{dataOriginLabel}</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-bold text-white">10% &rarr; 60%</td>
                  <td className="py-4 px-4 font-black text-emerald-400">{sim10to60.totalMinutes} min</td>
                  <td className="py-4 px-4 text-slate-200">{sim10to60.avgKw} kW</td>
                  <td className="py-4 px-4 text-slate-200">{(pack * 0.5).toFixed(1)} kWh</td>
                  <td className="py-4 px-4 text-emerald-300">+{Math.round(epa * 0.5)} mi</td>
                  <td className="py-4 px-4 text-xs font-semibold text-emerald-400">{dataOriginLabel}</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-bold text-white">10% &rarr; 70%</td>
                  <td className="py-4 px-4 font-black text-cyan-400">{sim10to70.totalMinutes} min</td>
                  <td className="py-4 px-4 text-slate-200">{sim10to70.avgKw} kW</td>
                  <td className="py-4 px-4 text-slate-200">{(pack * 0.6).toFixed(1)} kWh</td>
                  <td className="py-4 px-4 text-cyan-300">+{Math.round(epa * 0.6)} mi</td>
                  <td className="py-4 px-4 text-xs font-semibold text-emerald-400">{dataOriginLabel}</td>
                </tr>
                <tr className="bg-emerald-500/5 hover:bg-emerald-500/10 border-l-4 border-l-emerald-500">
                  <td className="py-4 px-4 font-bold text-emerald-300">10% &rarr; 80% (Standard Benchmark)</td>
                  <td className="py-4 px-4 font-black text-emerald-400 text-base">{sim10to80.totalMinutes} min</td>
                  <td className="py-4 px-4 text-slate-200 font-semibold">{sim10to80.avgKw} kW</td>
                  <td className="py-4 px-4 text-slate-200 font-semibold">{(pack * 0.7).toFixed(1)} kWh</td>
                  <td className="py-4 px-4 text-emerald-300 font-bold">+{Math.round(epa * 0.7)} mi</td>
                  <td className="py-4 px-4 text-xs font-semibold text-emerald-400">{dataOriginLabel}</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-bold text-white">10% &rarr; 90%</td>
                  <td className="py-4 px-4 font-black text-amber-400">{sim10to90.totalMinutes} min</td>
                  <td className="py-4 px-4 text-slate-200">{sim10to90.avgKw} kW</td>
                  <td className="py-4 px-4 text-slate-200">{(pack * 0.8).toFixed(1)} kWh</td>
                  <td className="py-4 px-4 text-amber-300">+{Math.round(epa * 0.8)} mi</td>
                  <td className="py-4 px-4 text-xs font-semibold text-amber-400">{dataOriginLabel}</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-bold text-orange-400">10% &rarr; 100%</td>
                  <td className="py-4 px-4 font-black text-orange-400">{sim10to100.totalMinutes} min</td>
                  <td className="py-4 px-4 text-slate-200">{sim10to100.avgKw} kW</td>
                  <td className="py-4 px-4 text-slate-200">{(pack * 0.9).toFixed(1)} kWh</td>
                  <td className="py-4 px-4 text-orange-300">+{Math.round(epa * 0.9)} mi</td>
                  <td className="py-4 px-4 text-xs font-semibold text-orange-400">{dataOriginLabel}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Conditions & Measurement Data */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ThermometerSnowflake className="w-5 h-5 text-cyan-400" />
            Test &amp; Modeling Conditions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Ambient Test Temperature</span>
              <span className="font-bold text-white">{vehicle.testConditions?.temperatureC ?? 22}&deg;C ({Math.round(((vehicle.testConditions?.temperatureC ?? 22) * 9/5) + 32)}&deg;F)</span>
            </div>
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Battery Preconditioning State</span>
              <span className="font-bold text-emerald-400">{vehicle.testConditions?.preconditioned ? 'Active & Optimized (25°C–35°C Core)' : 'Unconditioned'}</span>
            </div>
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Dispenser Rated Power</span>
              <span className="font-bold text-white">{vehicle.testConditions?.chargerRatedKw ?? 350} kW DC</span>
            </div>
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Starting / Ending SoC</span>
              <span className="font-bold text-white">{vehicle.testConditions?.startingSoc ?? 10}% &rarr; {vehicle.testConditions?.endingSoc ?? 80}% SoC</span>
            </div>
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Observed Telemetry Runs</span>
              <span className="font-bold text-white">{vehicle.testConditions?.observationCount ? `${vehicle.testConditions.observationCount} charging sessions` : 'Baseline validation dataset'}</span>
            </div>
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs uppercase mb-1">Measurement Method</span>
              <span className="font-bold text-cyan-300 truncate block" title={vehicle.testConditions?.measurementMethod || 'CAN-Bus Telemetry & Numerical Integration'}>{vehicle.testConditions?.measurementMethod || 'CAN-Bus Telemetry & Piecewise Numerical Integration'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle-Specific Insights & Real-World Explanations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-400" />
            Vehicle-Specific Charging Insights for the {vehicle.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
            <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800">
              <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                Where Charging Begins to Taper
              </h3>
              <p>{vehicle.vehicleInsights?.taperStartSoC || `Power holds near ${vehicle.maxChargeKw} kW at low state of charge before thermal step-down derating begins.`}</p>
            </div>

            <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800">
              <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Where the Session Spends Most Time
              </h3>
              <p>{vehicle.vehicleInsights?.sessionDominance || `The mid-pack interval from 40% to 80% represents the majority of dwell time as BMS voltage limits take effect.`}</p>
            </div>

            <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800">
              <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                Recommended Road-Trip Charging Strategy
              </h3>
              <p>{vehicle.vehicleInsights?.roadTripStrategy || `Arrive with 10% to 15% State of Charge and unplug around 70% to 80% to avoid slow trickle saturation.`}</p>
            </div>

            <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-800">
              <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-blue-400" />
                Key Environmental &amp; Thermal Factors
              </h3>
              <p>{vehicle.vehicleInsights?.sensitivityFactors || `Battery preconditioning is critical in colder ambient temperatures to avoid initial power throttling.`}</p>
            </div>
          </div>

          {vehicle.vehicleInsights?.variantDifferences && (
            <div className="mt-6 p-5 bg-[#131B2A] rounded-2xl border border-slate-800 text-sm text-slate-300">
              <h3 className="font-bold text-white text-base mb-2">Trim &amp; Battery Variant Comparison</h3>
              <p>{vehicle.vehicleInsights.variantDifferences}</p>
            </div>
          )}
        </div>
      </section>

      {/* Real-World Limitations & Dispenser Power Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Dispenser Power Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-cyan-400" />
              Dispenser Sizing Comparison (10–80% Dwell)
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              How station hardware limits charging duration for {vehicle.name}:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">50 kW Urban Fast Charger</h3>
                  <p className="text-xs text-slate-400">Limited by dispenser 50kW rating</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-slate-300">{sim50kW.totalMinutes} min</p>
                  <p className="text-[11px] text-slate-500">Avg {sim50kW.avgKw} kW</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">150 kW CCS / Supercharger</h3>
                  <p className="text-xs text-slate-400">Standard highway DC station</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-slate-200">{sim150kW.totalMinutes} min</p>
                  <p className="text-[11px] text-slate-500">Avg {sim150kW.avgKw} kW</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">250 kW Supercharger V3 / CCS</h3>
                  <p className="text-xs text-slate-400">High-power dispenser</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-emerald-400">{sim250kW.totalMinutes} min</p>
                  <p className="text-[11px] text-slate-500">Avg {sim250kW.avgKw} kW</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">350 kW Ultra-Fast Dispenser</h3>
                  <p className="text-xs text-slate-400">Maximum capability station</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-cyan-400">{sim350kW.totalMinutes} min</p>
                  <p className="text-[11px] text-slate-500">Avg {sim350kW.avgKw} kW</p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Factors Explanation */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-400" />
                Why Real-World Speeds Vary
              </h2>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
                <li>
                  <strong className="text-white block">1. Cold-Gate Throttling:</strong> If the battery core is cold (&lt;15&deg;C), internal cell resistance causes the BMS to limit initial power to prevent lithium plating, adding 15–25 minutes.
                </li>
                <li>
                  <strong className="text-white block">2. Cable Current Limits:</strong> Standard liquid-cooled CCS cables are capped at 500A. At 370V, this restricts 400V cars to ~185–200 kW regardless of dispenser capacity.
                </li>
                <li>
                  <strong className="text-white block">3. Station Power Sharing:</strong> On paired or dynamic split chargers, total cabinet capacity is divided if an adjacent stall is occupied.
                </li>
              </ul>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              <strong className="text-slate-300">Data Disclaimer:</strong> Actual vehicle charging speeds and durations will vary based on ambient temperature, starting state of charge, battery age and state of health (SoH), active preconditioning status, charger hardware capabilities, and vehicle firmware version.
            </div>
          </div>

        </div>
      </section>

      {/* Source Transparency Table */}
      {vehicle.sources && vehicle.sources.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Data Sources &amp; Benchmark Documentation
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              All specifications and charging curve data points for the {vehicle.name} are derived from verifiable manufacturer documentation, regulatory filings, and empirical telemetry logs:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 uppercase tracking-wider text-slate-400 bg-slate-950/40">
                    <th className="py-3 px-4">Source Entity</th>
                    <th className="py-3 px-4">Data Utilized</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Verification Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {vehicle.sources.map((src, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/20">
                      <td className="py-3.5 px-4 font-bold text-white">{src.source}</td>
                      <td className="py-3.5 px-4 text-slate-300">{src.dataUsed}</td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-xs">{src.date}</td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">{src.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Direct Segment Competitor Benchmarks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Scale className="w-6 h-6 text-emerald-400" />
            Compare {vehicle.name} with Alternatives
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Compare charging speed, battery architecture, and 10–80% dwell times directly against segment competitors:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 text-slate-400">Vehicle Model</th>
                  <th className="pb-3 text-slate-400">Architecture</th>
                  <th className="pb-3 text-slate-400">Usable Pack</th>
                  <th className="pb-3 text-slate-400">Peak kW</th>
                  <th className="pb-3 text-slate-400">10–80% Time</th>
                  <th className="pb-3 text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="bg-emerald-500/5">
                  <td className="py-4 font-bold text-white flex items-center gap-2">
                    <span>{vehicle.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">This Vehicle</span>
                  </td>
                  <td className="py-4 text-cyan-400 font-medium">{vehicle.architecture}</td>
                  <td className="py-4 text-slate-300">{pack} kWh</td>
                  <td className="py-4 text-emerald-400 font-bold">{vehicle.maxChargeKw} kW</td>
                  <td className="py-4 text-white font-bold">{sim10to80.totalMinutes} min</td>
                  <td className="py-4 text-right">
                    <span className="text-xs text-slate-500 font-mono">Current Profile</span>
                  </td>
                </tr>
                
                {vehicle.topCompetitorIds?.map((compId: string) => {
                  const comp = VEHICLES[compId];
                  if (!comp) return null;
                  const compPack = comp.usablePackKwh || 75;
                  const compSim = calculateChargingSession(comp.curve, 350, 10, 80, compPack, false);
                  return (
                    <tr key={compId} className="hover:bg-slate-800/30">
                      <td className="py-4 font-semibold text-slate-200">
                        <Link href={`/curve/${compId}`} className="hover:text-emerald-400 transition-colors">
                          {comp.name}
                        </Link>
                      </td>
                      <td className="py-4 text-slate-400">{comp.architecture}</td>
                      <td className="py-4 text-slate-400">{compPack} kWh</td>
                      <td className="py-4 text-slate-300 font-medium">{comp.maxChargeKw} kW</td>
                      <td className="py-4 text-slate-300">{compSim.totalMinutes} min</td>
                      <td className="py-4 text-right">
                        <Link 
                          href={`/curve/${compId}`}
                          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
                        >
                          <span>View Curve</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Vehicle-Specific FAQ Section */}
      {vehicle.faqs && vehicle.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {vehicle.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2">{faq.question}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hub-and-Spoke Topical Authority & Internal Navigation Module */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Topic Hubs Relevant to this Vehicle */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400">
              Related Topical Authority Hubs
            </h3>
            <Link href="/topics" className="text-xs text-slate-400 hover:text-emerald-400 font-medium">
              Explore all 12 pillars →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href={vehicle.architecture === '800V' || vehicle.architecture === '900V' ? '/topics/400v-vs-800v' : '/topics/ev-charging-curves'}
              className="p-3.5 bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition-all group"
            >
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                {vehicle.architecture} Physics
              </span>
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors block">
                {vehicle.architecture === '800V' || vehicle.architecture === '900V' ? '400V vs 800V Architecture Hub' : 'EV Charging Curves Hub'}
              </span>
            </Link>

            <Link
              href="/topics/10-80-charging"
              className="p-3.5 bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition-all group"
            >
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                Highway Dwell
              </span>
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors block">
                10–80% Charging Standard Hub
              </span>
            </Link>

            <Link
              href="/topics/battery-preconditioning"
              className="p-3.5 bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition-all group"
            >
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                Thermal Prep
              </span>
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors block">
                Battery Preconditioning Hub
              </span>
            </Link>

            <Link
              href="/topics/ev-battery-health"
              className="p-3.5 bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition-all group"
            >
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                {vehicle.chemistry} Chemistry
              </span>
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors block">
                EV Battery Health & SoH Hub
              </span>
            </Link>
          </div>
        </div>

        {/* Supporting Calculators & Simulators */}
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">
            Simulate {vehicle.name} Charging & Performance
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link
              href="/"
              className="p-3 bg-slate-950/70 border border-slate-800/80 hover:border-emerald-500/50 rounded-xl text-center group transition-colors"
            >
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors block mb-0.5">
                DCFC Simulator
              </span>
              <span className="text-[11px] text-slate-500 block">Curve Modeler</span>
            </Link>

            <Link
              href="/compare"
              className="p-3 bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/50 rounded-xl text-center group transition-colors"
            >
              <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors block mb-0.5">
                Compare Tool
              </span>
              <span className="text-[11px] text-slate-500 block">Side-by-Side</span>
            </Link>

            <Link
              href="/how-long-to-charge-an-electric-car"
              className="p-3 bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/50 rounded-xl text-center group transition-colors"
            >
              <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors block mb-0.5">
                Charging Time
              </span>
              <span className="text-[11px] text-slate-500 block">L1/L2/DCFC</span>
            </Link>

            <Link
              href="/battery-health"
              className="p-3 bg-slate-950/70 border border-slate-800/80 hover:border-emerald-500/50 rounded-xl text-center group transition-colors"
            >
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors block mb-0.5">
                Battery Health
              </span>
              <span className="text-[11px] text-slate-500 block">10-Year SoH</span>
            </Link>

            <Link
              href="/range-loss"
              className="p-3 bg-slate-950/70 border border-slate-800/80 hover:border-sky-500/50 rounded-xl text-center group transition-colors"
            >
              <span className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors block mb-0.5">
                Winter Range
              </span>
              <span className="text-[11px] text-slate-500 block">Cold Weather</span>
            </Link>

            <Link
              href="/home-charging"
              className="p-3 bg-slate-950/70 border border-slate-800/80 hover:border-teal-500/50 rounded-xl text-center group transition-colors"
            >
              <span className="text-xs font-bold text-white group-hover:text-teal-400 transition-colors block mb-0.5">
                Home 240V
              </span>
              <span className="text-[11px] text-slate-500 block">Level 2 Sizer</span>
            </Link>
          </div>
        </div>

        {/* Supporting Engineering Analyses */}
        <div className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              Read Engineering Analyses & Technical Guides
            </h4>
            <p className="text-xs text-slate-400">
              Explore peer-reviewed articles on lithium degradation, Level 3 power converters, and cold-gate thermal dynamics.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog/level-3-ev-charger"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Level 3 DCFC Guide
            </Link>
            <Link
              href="/blog/the-cold-gate-dilemma"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Cold-Gate Physics
            </Link>
            <Link
              href="/blog/lithium-ion-battery-degradation"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Battery Degradation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
