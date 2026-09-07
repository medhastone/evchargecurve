import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import V2HBackupTool from '@/components/V2HBackupTool';
import StructuredData from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { getToolMetadata } from '@/lib/seoConfig';
import { 
  BatteryCharging, 
  Home, 
  ShieldAlert, 
  Zap, 
  ShieldCheck, 
  Info,
  Cpu,
  Sun,
  Flame,
  VolumeX,
  Layers,
  Power,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Gauge,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = getToolMetadata('v2hBackup');

export default function V2HBackupPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "EV V2H Backup Calculator & Home Emergency Run-Time Sizer",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "description": "Calculate exact blackout survival days, household appliance run-time, and battery reserve thresholds using our comprehensive how long can an ev power my house calculator.",
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
            "name": "How long can an EV power my house during a power outage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical 77 kWh to 131 kWh EV battery can power essential household circuits (refrigerator, LED lighting, Wi-Fi router, medical CPAP, and gas furnace blower) consuming 8–12 kWh/day for 6 to 14 consecutive days. Under whole-home loads with heat pumps (25–35 kWh/day), an EV provides 2.5 to 4.5 days of continuous power."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between Vehicle-to-Load (V2L) and Vehicle-to-Home (V2H)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "V2L (Vehicle-to-Load) provides standalone 120V/240V AC outlets on the car delivering 1.8 kW to 3.6 kW to run specific appliances via extension cords. V2H (Vehicle-to-Home) integrates directly with your home main electrical panel via a bidirectional inverter and automatic transfer switch to energize whole-house circuits at 7.2 kW to 11.5 kW."
            }
          },
          {
            "@type": "Question",
            "name": "Can an EV battery with V2H run a central air conditioner or heat pump?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, provided the bidirectional inverter output (e.g., 9.6 kW on Ford F-150 Lightning, 11.5 kW on Tesla Cybertruck Powershare, or 10.2 kW on GM Energy) meets the running wattage. For older single-stage compressors, installing an HVAC soft-starter (Micro-Air EasyStart) reduces locked rotor inrush current by up to 70%, preventing inverter trip-outs."
            }
          },
          {
            "@type": "Question",
            "name": "Does bidirectional V2H discharge damage or void the vehicle battery warranty?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Automakers with native V2H and V2L architecture (including Ford, Tesla, GM, Hyundai, Kia, and Nissan) officially cover bidirectional discharge under their standard 8-year / 100,000-mile high-voltage battery warranties. Discharging 10 kWh/day creates minimal electrochemical stress (~0.1 C-rate), equivalent to driving just 30 gentle miles."
            }
          },
          {
            "@type": "Question",
            "name": "How does an EV compare to a Tesla Powerwall or home standby generator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A single EV battery pack (75 to 205 kWh) holds the equivalent energy of 5 to 15 stationary Tesla Powerwalls (13.5 kWh each) at a fraction of the cost per kWh. Compared to fossil fuel generators, V2H produces zero toxic carbon monoxide exhaust, operates at 0 dB silent volume, and requires zero gasoline storage or oil changes."
            }
          },
          {
            "@type": "Question",
            "name": "Can rooftop solar recharge an EV during an extended blackout using V2H microgrid forming?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. With a microgrid-forming V2H gateway (such as Tesla Powershare Gateway, Ford Home Integration System, or Enphase IQ Bidirectional EV Charger), the system establishes an isolated 60 Hz reference voltage. This black-starts rooftop solar inverters during an outage, charging the EV from solar by day and powering the home by night for indefinite grid independence."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      <Script
        id="v2h-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Search Engine Pre-rendered JSON-LD Rich Snippet */}
      <StructuredData toolKey="v2hBackup" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 md:pt-14 md:pb-10 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none" aria-hidden="true"></div>

        {/* Visual Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'V2H Home Emergency Power' }]} />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs sm:text-sm font-semibold mb-6 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)] relative z-10">
          <Zap className="w-4 h-4" />
          <span>UL 1741 SA / IEEE 1547 Microgrid Interconnection &amp; NEC Article 705 Compliance</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 relative z-10 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400">
            EV V2H Backup Calculator
          </span>{' '}
          &amp; Home Emergency Run-Time Sizer
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8 relative z-10">
          Transform your electric vehicle into an emergency whole-home microgrid generator. Calculate exact blackout survival days, household appliance run-time, and battery reserve thresholds using our comprehensive <strong>how long can an ev power my house calculator</strong> and <strong>vehicle to home bidirectional power sizer</strong>.
        </p>

        {/* Engineering Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium relative z-10 mb-4">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span>5x to 15x Capacity of Tesla Powerwall (65–205 kWh)</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <VolumeX className="w-4 h-4 text-cyan-400" />
            <span>0 dB Silent &amp; Zero Carbon Monoxide Exhaust</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>OEM Warranty-Safe Bidirectional Discharge</span>
          </div>
        </div>
      </section>

      {/* Interactive Tool Mounting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-20">
        <V2HBackupTool />

        {/* Trust Banner */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm text-center">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Calculations model bidirectional inverter tare loss (~35W standby draw), 88% round-trip DC-to-AC conversion efficiency, and automatic evacuation state-of-charge (SoC) reserves.</span>
        </div>
      </section>

      {/* Section 1: How It Works - 3 Pillars of Residential V2H Modeling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Our V2H Backup Duration Calculator Models Real Blackout Autonomy
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Eliminate noisy, hazardous combustion generators. Here is how our <strong>f150 lightning home power outage calculator</strong> and <strong>vehicle to home bidirectional power sizer</strong> compute whole-house microgrid resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors shadow-lg">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors" aria-hidden="true">
              1
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <BatteryCharging className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Usable Pack &amp; Evacuation Floor</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Select your EV platform (e.g., Ford F-150 Lightning 131 kWh, Cybertruck 123 kWh, or Ioniq 5 77.4 kWh). The engine locks an emergency driving reserve (15%–25% SoC) so you always retain 35–60 miles of escape range for highway charging evacuation (plan stops with our <Link href="/" className="text-amber-400 hover:text-amber-300 underline underline-offset-4">DC fast charging curve calculator</Link>).
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors shadow-lg">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors" aria-hidden="true">
              2
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Home className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Appliance Duty Cycles &amp; Inrush</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Configure real residential loads: French-door refrigeration (1.2–1.8 kWh/day), Wi-Fi &amp; LED lighting (0.8 kWh/day), sump pump cycles (1.4 kWh/day), and variable-speed heat pumps (12–25 kWh/day).
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors shadow-lg">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors" aria-hidden="true">
              3
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Depletion Curve &amp; Days of Power</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Our <strong>how long can an ev power my house calculator</strong> produces hour-by-hour discharge curves, peak kW surge margins, and total survival days across critical, moderate, and full whole-home modes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Deep Electrical Engineering & Microgrid System Architecture */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Electrical Engineering &amp; Microgrid Systems
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4">
              V2H Microgrid Architecture, Inverter Physics &amp; Safety Engineering
            </h2>
            <p className="text-slate-400 leading-relaxed">
              How does a high-voltage automotive battery safely island a home electrical service panel and power 120V/240V split-phase household circuits without backfeeding the utility grid?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Box 1: AC vs DC Bidirectional Architecture */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                AC Bidirectional vs DC Off-Board Inverter Topology
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Bidirectional EV power follows two distinct engineering topologies defined under <strong className="text-amber-300">ISO 15118-20</strong>:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-[#131B2A] p-3 rounded-xl border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">1. AC Bidirectional (Onboard Inverter / V2L)</div>
                  <p className="text-slate-400 text-xs">The vehicle uses its internal bidirectional OBC (On-Board Charger) to rectify DC battery voltage into 120V/240V AC before outputting through a standard charge inlet or cabin outlets (e.g., Hyundai E-GMP 1.9–3.6 kW, Tesla Cybertruck Powershare 11.5 kW).</p>
                </div>
                <div className="bg-[#131B2A] p-3 rounded-xl border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">
                    <h3 className="inline text-emerald-400 font-bold text-sm">2. DC Bidirectional (External Power Conversion System / PCS)</h3>
                  </div>
                  <h3 className="text-xs font-bold text-slate-300 mt-2 mb-1">F-150 Lightning Home Power Outage Calculator: 9.6 kW Intelligent Backup Power</h3>
                  <p className="text-slate-400 text-xs">The vehicle sends raw 400V–800V DC power directly through the DC pins of the CCS1 or NACS plug to an external wall-mounted inverter and isolation gateway (e.g., Ford Home Integration System / GM Energy Ultium Home 10.2 kW, Wallbox Quasar 2).</p>
                </div>
              </div>
            </div>

            {/* Box 2: UL 1741 SA & Anti-Islanding Lineworker Protection */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                UL 1741 &amp; Microgrid Anti-Islanding Protection
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">
                During a blackout, high-voltage vehicle power must <strong className="text-rose-400">never backfeed the utility grid</strong>, which could electrocute utility line crews working to repair downed power lines.
              </p>
              <div className="bg-[#131B2A] rounded-xl p-3 text-xs font-mono text-slate-300 border border-slate-800 mb-3 space-y-1">
                <div className="text-amber-400 font-bold">NEC Article 705.13 &amp; 702.6 Compliance:</div>
                <div className="text-slate-400">&bull; Microgrid Interconnection Device (MID) physically opens main grid breaker in &lt;16 milliseconds.</div>
                <div className="text-slate-400">&bull; Automatic home panel transfer switches (size yours with our <Link href="/panel-capacity" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">EV charger breaker size &amp; 100A panel capacity calculator</Link>) form an isolated local 60 Hz split-phase microgrid.</div>
              </div>
              <p className="text-xs text-slate-400">
                When grid power is restored, the V2H gateway senses stable voltage and frequency for 5 consecutive minutes before safely resynchronizing and reconnecting to the utility.
              </p>
            </div>
          </div>

          {/* Solar Coupling & Black-Start Resilience */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-400" />
              Solar PV Microgrid Black-Start &amp; Infinite Outage Autonomy
            </h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Standard grid-tied rooftop solar systems shut down completely during a power outage to prevent dangerous backfeeding. A bidirectional EV system with a microgrid-forming gateway acts as a reference voltage generator, enabling <strong>solar black-start</strong> during extended multi-week emergencies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-[#131B2A] border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 font-medium mb-1">Daytime (Solar Generation)</div>
                <div className="text-yellow-400 font-bold text-base mb-1">EV Charges at 5–10 kW</div>
                <p className="text-slate-500 text-xs">Excess rooftop solar recharges the EV battery while simultaneously running household air conditioning and appliances. Maximizing solar self-consumption significantly reduces your footprint; use our <Link href="/carbon-offset" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4">EV CO2 emissions saved calculator</Link> to learn more.</p>
              </div>
              <div className="bg-[#131B2A] border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 font-medium mb-1">Nighttime (EV Discharge)</div>
                <div className="text-cyan-400 font-bold text-base mb-1">V2H Powers Home</div>
                <p className="text-slate-500 text-xs">The EV discharges 1.0–2.5 kW overnight to keep refrigeration, lighting, security, and ventilation operating seamlessly.</p>
              </div>
              <div className="bg-[#131B2A] border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 font-medium mb-1">Multi-Week Resilience</div>
                <div className="text-emerald-400 font-bold text-base mb-1">Indefinite Survival</div>
                <p className="text-slate-500 text-xs">The solar + EV loop operates indefinitely without burning a single drop of fuel or requiring utility grid availability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Production EV Bidirectional Capability Matrix */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Long Can an EV Power My House? V2H Backup Duration Benchmarks by Model
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            Detailed engineering comparison of factory bidirectional charging power, battery capacity, discharge protocol, and home backup hardware requirements across top electric vehicles.
          </p>
        </div>

        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">
                V2H Backup Duration Benchmarks: Bidirectional Power and Emergency Days by Model
              </caption>
              <thead className="bg-[#0B0F17] border-b border-slate-800">
                <tr>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-slate-300">EV Model</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-amber-400">Battery Pack Size</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-cyan-400">Max V2H/V2L Power</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-slate-300">Bidirectional Protocol</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-emerald-400">Emergency Backup Days</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-slate-300">Required Home Hardware</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Ford F-150 Lightning Extended</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">131 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">9.6 kW (240V / 40A)</td>
                  <td className="p-4 sm:p-5 text-slate-400">DC CCS1 + ISO 15118</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">10 &ndash; 14 Days</td>
                  <td className="p-4 sm:p-5 text-slate-400">Ford Charge Station Pro + Home Integration System</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Tesla Cybertruck</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">123 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">11.5 kW (240V / 48A)</td>
                  <td className="p-4 sm:p-5 text-slate-400">AC NACS Powershare</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">9 &ndash; 13 Days</td>
                  <td className="p-4 sm:p-5 text-slate-400">Tesla Universal Wall Connector + Powershare Gateway</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Chevrolet Silverado EV RST</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">205 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">10.2 kW (240V / 42.5A)</td>
                  <td className="p-4 sm:p-5 text-slate-400">DC CCS1/NACS Ultium</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">16 &ndash; 22 Days</td>
                  <td className="p-4 sm:p-5 text-slate-400">GM Energy Powershift Charger + V2H Enablement Kit</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Hyundai Ioniq 5 / Kia EV6</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">77.4 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">1.9 kW (120V / 16A)</td>
                  <td className="p-4 sm:p-5 text-slate-400">V2L Onboard Adapter</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">6 &ndash; 9 Days</td>
                  <td className="p-4 sm:p-5 text-slate-400">J1772 V2L Discharge Adapter + Manual Generator Inlet</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Kia EV9 AWD</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">99.8 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">3.6 kW / 10.5 kW V2H ready</td>
                  <td className="p-4 sm:p-5 text-slate-400">ISO 15118-20 Bidirectional</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">8 &ndash; 11 Days</td>
                  <td className="p-4 sm:p-5 text-slate-400">Wallbox Quasar 2 / Wallbox Bidirectional Gateway</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Nissan Leaf Plus</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">62 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">6.0 kW (240V / 25A)</td>
                  <td className="p-4 sm:p-5 text-slate-400">DC CHAdeMO V2G/V2H</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">5 &ndash; 7 Days</td>
                  <td className="p-4 sm:p-5 text-slate-400">Fermata Energy FE-15 / Wallbox Quasar 1</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Rivian R1T / R1S Large Pack</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">135 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">1.5 kW (120V V2L outlets)</td>
                  <td className="p-4 sm:p-5 text-slate-400">V2L (Gen 2 V2H Ready)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">10 &ndash; 14 Days</td>
                  <td className="p-4 sm:p-5 text-slate-400">Cabin/Bed AC outlets + Manual Transfer Switch</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Household Outage Energy Tiers & Survival Playbook */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Emergency Preparedness &amp; Load Management
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              EV Home Backup Run Time Calculator: Outage Energy Tiers &amp; Autonomy Days
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Careful electrical load prioritization dramatically extends your EV battery&apos;s backup duration. Review the three standard residential load profiles below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="bg-[#0B0F17] border border-emerald-500/30 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold">
                Max Runtime
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase mb-3">
                <ShieldCheck className="w-4 h-4" /> Tier 1: Critical Survival
              </div>
              <div className="text-2xl font-black text-white mb-2">6 &ndash; 9 kWh / Day</div>
              <p className="text-slate-400 text-xs mb-4">
                Enables <strong>10 to 18+ days</strong> of autonomy on a 100 kWh battery pack.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>ENERGY STAR Refrigerator &amp; Freezer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Wi-Fi Router, Phone/Laptop Charging</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>LED Lighting in main rooms (30W)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>CPAP machine &amp; essential medical devices</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Natural gas furnace blower fan (intermittent)</span>
                </li>
              </ul>
            </div>

            {/* Tier 2 */}
            <div className="bg-[#0B0F17] border border-cyan-500/30 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-400 text-xs px-2.5 py-1 rounded-full font-bold">
                Balanced
              </div>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase mb-3">
                <Home className="w-4 h-4" /> Tier 2: Standard Comfort
              </div>
              <div className="text-2xl font-black text-white mb-2">14 &ndash; 20 kWh / Day</div>
              <p className="text-slate-400 text-xs mb-4">
                Enables <strong>5 to 8 days</strong> of autonomy on a 100 kWh battery pack.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>All Tier 1 critical survival loads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Microwave oven &amp; induction cooktop</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Smart TV &amp; full desktop workstation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Sump pump &amp; well water pressure pump</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Portable room heater or mini-split zone</span>
                </li>
              </ul>
            </div>

            {/* Tier 3 */}
            <div className="bg-[#0B0F17] border border-amber-500/30 rounded-2xl p-6 relative">
              <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 text-xs px-2.5 py-1 rounded-full font-bold">
                High Draw
              </div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase mb-3">
                <Flame className="w-4 h-4" /> Tier 3: Whole-Home Luxury
              </div>
              <div className="text-2xl font-black text-white mb-2">28 &ndash; 45 kWh / Day</div>
              <p className="text-slate-400 text-xs mb-4">
                Enables <strong>2.5 to 4 days</strong> of autonomy on a 100 kWh battery pack.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Central heat pump / 3–4 ton central A/C</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Electric water heater &amp; dishwasher</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Electric clothes dryer &amp; laundry washer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Full whole-house architectural lighting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Electric oven and cooking range</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Battery Longevity & Degradation Facts */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Does V2H Emergency Backup Degrade or Damage My EV Battery?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                The electrochemistry behind slow stationary discharge vs. high-stress driving.
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            A common concern among EV owners is whether powering a household will accelerate battery capacity loss. In reality, residential emergency backup is among the <strong>least stressful electrochemical operations</strong> an automotive lithium-ion battery can undergo:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#131B2A] border border-slate-800 p-5 rounded-xl">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Ultra-Low C-Rate Discharging (&lt;0.05 C)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Driving at 70 mph or accelerating draws 30 kW to 250 kW (0.5C to 3.0C rate). Powering a home draws only 0.5 kW to 3.0 kW (<strong>0.01C to 0.03C rate</strong>). This generates virtually zero internal cell heat and produces no measurable mechanical stress on cathode materials.
              </p>
            </div>
            <div className="bg-[#131B2A] border border-slate-800 p-5 rounded-xl">
              <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Minimal Full Cycle Count
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A severe 5-day blackout consuming 50 kWh represents just <strong>0.5 of a single full battery cycle</strong> on a 100 kWh pack (to model cycle aging, use our <Link href="/battery-health" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">EV battery degradation calculator &amp; State of Health test</Link>). Modern automotive packs are rated for 1,500 to 2,500 full equivalent cycles (300,000+ miles). An occasional emergency outage uses less than 0.03% of total lifetime pack endurance.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>OEM Factory Warranty Coverage:</strong> Major automakers with native V2H and V2L support (Ford, Tesla, General Motors, Hyundai, Kia, and Nissan) explicitly include bidirectional discharge under their standard 8-year / 100,000-mile factory battery warranty terms.
            </span>
          </div>
        </div>
      </section>

      {/* Section 6: Technical Comparison: Bidirectional EV vs Powerwall vs Standby Generator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Comparison: Bidirectional EV vs Stationary Battery vs Standby Generator
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl mx-auto">
            Comparing total stored energy, continuous output power, operating noise, safety, and cost economics.
          </p>
        </div>

        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">
                Technical Comparison: Bidirectional EV vs Stationary Battery vs Standby Generator
              </caption>
              <thead className="bg-[#0B0F17] border-b border-slate-800">
                <tr>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-slate-300">Feature / Specification</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-emerald-400 bg-emerald-950/20">Bidirectional EV (V2H)</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-cyan-400">Stationary Battery (Tesla Powerwall 3)</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-amber-400">Whole-Home Standby Generator (22 kW)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Stored Usable Energy</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold bg-emerald-950/10">65 &ndash; 205 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">13.5 kWh (per unit)</td>
                  <td className="p-4 sm:p-5 text-slate-400">Unlimited (requires continuous fuel supply)</td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Continuous Power Output</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold bg-emerald-950/10">9.6 &ndash; 11.5 kW</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">11.5 kW</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">18 &ndash; 22 kW</td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Acoustic Sound Level</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-emerald-950/10">0 dB (Completely Silent)</td>
                  <td className="p-4 sm:p-5 text-cyan-300">0 dB (Completely Silent)</td>
                  <td className="p-4 sm:p-5 text-amber-400 font-medium">68 &ndash; 74 dB (Loud engine rumble)</td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Exhaust &amp; CO Hazard</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-emerald-950/10">Zero emissions / safe indoors</td>
                  <td className="p-4 sm:p-5 text-cyan-300">Zero emissions / safe indoors</td>
                  <td className="p-4 sm:p-5 text-rose-400 font-semibold">Toxic CO hazard / requires outdoor clearance</td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Dual-Use Mobility Value</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-emerald-950/10">Yes (Daily transportation + Home backup)</td>
                  <td className="p-4 sm:p-5 text-slate-400">No (Stationary wall mount only)</td>
                  <td className="p-4 sm:p-5 text-slate-400">No (Stationary outdoor unit only)</td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Cost per kWh of Storage</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold bg-emerald-950/10">&lt;$40 / kWh (Incentivized by vehicle purchase)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">~$750 &ndash; $900 / kWh installed</td>
                  <td className="p-4 sm:p-5 text-slate-400">N/A (Fuel cost ~$40&ndash;$70/day during outage)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Expert guidance on electric vehicle home backup, bidirectional hardware installation, HVAC surge currents, battery degradation, and solar integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQ 1 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                <Zap className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How long can an EV power my house during a power outage?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A typical 77 kWh to 131 kWh EV battery can power essential household circuits (refrigerator, LED lighting, Wi-Fi router, medical CPAP, and gas furnace blower) consuming 8–12 kWh/day for 6 to 14 consecutive days. Under whole-home loads with heat pumps (25–35 kWh/day), an EV provides 2.5 to 4.5 days of continuous power.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                <Home className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                What is the difference between Vehicle-to-Load (V2L) and Vehicle-to-Home (V2H)?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              V2L (Vehicle-to-Load) provides standalone 120V/240V AC outlets on the car delivering 1.8 kW to 3.6 kW to run specific appliances via extension cords. V2H (Vehicle-to-Home) integrates directly with your home main electrical panel via a bidirectional inverter and automatic transfer switch to energize whole-house circuits at 7.2 kW to 11.5 kW.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                <Cpu className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Can an EV battery with V2H run a central air conditioner or heat pump?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes, provided the bidirectional inverter output (e.g., 9.6 kW on Ford F-150 Lightning, 11.5 kW on Tesla Cybertruck Powershare, or 10.2 kW on GM Energy) meets the running wattage. For older single-stage compressors, installing an HVAC soft-starter (Micro-Air EasyStart) reduces locked rotor inrush current by up to 70%, preventing inverter trip-outs.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                <ShieldCheck className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Does bidirectional V2H discharge damage or void the vehicle battery warranty?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              No. Automakers with native V2H and V2L architecture (including Ford, Tesla, GM, Hyundai, Kia, and Nissan) officially cover bidirectional discharge under their standard 8-year / 100,000-mile high-voltage battery warranties. Discharging 10 kWh/day creates minimal electrochemical stress (~0.1 C-rate), equivalent to driving just 30 gentle miles.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                <BatteryCharging className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How does an EV compare to a Tesla Powerwall or home standby generator?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A single EV battery pack (75 to 205 kWh) holds the equivalent energy of 5 to 15 stationary Tesla Powerwalls (13.5 kWh each) at a fraction of the cost per kWh. Compared to fossil fuel generators, V2H produces zero toxic carbon monoxide exhaust, operates at 0 dB silent volume, and requires zero gasoline storage or oil changes.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 mt-0.5">
                <Sun className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Can rooftop solar recharge an EV during an extended blackout using V2H microgrid forming?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes. With a microgrid-forming V2H gateway (such as Tesla Powershare Gateway, Ford Home Integration System, or Enphase IQ Bidirectional EV Charger), the system establishes an isolated 60 Hz reference voltage. This black-starts rooftop solar inverters during an outage, charging the EV from solar by day and powering the home by night for indefinite grid independence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
