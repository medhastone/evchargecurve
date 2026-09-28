import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code2, Database, ShieldCheck, Zap, Mail, GitPullRequest, FileCheck, Layers, HelpCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import OrganizationSchema from '@/components/OrganizationSchema';

export const metadata: Metadata = {
  title: 'About EVChargeCurve | Open EV Charging Data & Telemetry',
  description: 'Learn about EVChargeCurve: an open-source EV charging data and simulation project dedicated to transparent telemetry, empirical charging curves, and unbiased calculation models.',
  alternates: {
    canonical: 'https://evchargecurve.com/about',
  },
};

export default function AboutPage() {
  const publishedDate = '2024-01-15';
  const lastUpdated = '2026-03-15';
  const lastReviewed = '2026-03-20';

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      <OrganizationSchema />
      
      {/* Hero Section */}
      <section className="relative w-full pt-16 md:pt-24 pb-12 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Open Data &amp; Transparent Methodology</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Transparent EV Charging Data. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Grounded in Real Telemetry.
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            EVChargeCurve is an independent open-access repository and simulation suite for electric vehicle DC fast charging curves, battery thermodynamics, and charging economics. We replace peak kW marketing claims with empirical charging profiles and transparent math.
          </p>

          {/* Date Transparency Bar */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">First Published:</span>{' '}
              <time dateTime={publishedDate} className="text-slate-300 font-mono">Jan 15, 2024</time>
            </div>
            <span className="text-slate-700">|</span>
            <div>
              <span className="text-slate-500">Last Updated:</span>{' '}
              <time dateTime={lastUpdated} className="text-slate-300 font-mono">Mar 15, 2026</time>
            </div>
            <span className="text-slate-700">|</span>
            <div>
              <span className="text-slate-500">Last Reviewed:</span>{' '}
              <time dateTime={lastReviewed} className="text-emerald-400 font-mono">Mar 20, 2026</time>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* 1. What EVChargeCurve Does */}
        <section className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">What EVChargeCurve Does</h2>
          </div>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              EVChargeCurve provides free, client-side tools and reference datasets to help electric vehicle drivers, researchers, and fleet managers understand real charging performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-semibold text-white text-sm mb-1">Empirical Charging Curves</h3>
                <p className="text-xs text-slate-400">Power vs. State of Charge (SoC) profiles mapped across 0% to 100% with clearly labeled data provenance.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-semibold text-white text-sm mb-1">Session Duration Simulations</h3>
                <p className="text-xs text-slate-400">Calculations for 10–50%, 10–80%, and 10–100% dwell times using discrete numerical integration.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-semibold text-white text-sm mb-1">Temperature &amp; Thermal Modeling</h3>
                <p className="text-xs text-slate-400">Impact simulations for cold-gating, pack preconditioning, and ambient temperature extremes.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-semibold text-white text-sm mb-1">Home &amp; Energy Sizing</h3>
                <p className="text-xs text-slate-400">Level 2 circuit sizing, utility cost analysis, solar array matching, and V2H emergency backup estimations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Who Operates the Website */}
        <section className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Who Operates the Website</h2>
          </div>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              EVChargeCurve is an open-source project founded and actively maintained by <strong>Medhastone</strong> (lead developer and systems architect) alongside a distributed group of EV owner-contributors who log and submit real-world charging telemetry.
            </p>
            <p>
              We are not affiliated with, sponsored by, or funded by any automobile manufacturer, charging network, or utility company. Our code and calculation logic are structured to run 100% in the user's browser, ensuring total user privacy and zero data tracking.
            </p>
            <div className="pt-2">
              <Link href="/authors" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                <span>Meet the maintainers and contributors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. What Problem It Solves */}
        <section className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">What Problem It Solves</h2>
          </div>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Automotive marketing routinely highlights a vehicle's single <em>peak charging speed</em> (such as &quot;charges up to 250 kW&quot; or &quot;10–80% in 18 minutes&quot;). However:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2 text-sm sm:text-base">
              <li>Peak power is typically sustained for only 2–5 minutes before cell voltage limits force the Battery Management System (BMS) to taper current.</li>
              <li>A vehicle with a 150 kW flat charging curve can complete a 10–80% charge significantly faster than a vehicle with a 240 kW peak that drops sharply at 40% SoC.</li>
              <li>Cold battery temperatures without preconditioning can reduce initial charge rates by 40–70% (&quot;cold-gating&quot;).</li>
              <li>Conflicting charging times published across automotive review websites often combine inconsistent starting/ending SoC thresholds or unstated charger ratings.</li>
            </ul>
            <p>
              EVChargeCurve provides standardized, transparent curves with explicit data origins so drivers know what to expect under real-world conditions.
            </p>
          </div>
        </section>

        {/* 4. How Charging Data Is Collected */}
        <section className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">How Charging Data Is Collected</h2>
          </div>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Our dataset combines multiple transparent streams, each assigned an unambiguous provenance tier:
            </p>
            <div className="space-y-3 pt-2 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">EVChargeCurve Measured / Independent Telemetry:</strong> High-resolution OBD-II CAN-bus session logs (recording pack voltage, current, and cell temperatures) collected during DC fast charging sessions on 300kW+ capable dispensers.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">Manufacturer Homologation &amp; Technical Manuals:</strong> Official pack specifications, usable kWh capacity ratings, maximum DC/AC acceptance rates, and nominal system voltages.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">EVChargeCurve Modeled / Estimated:</strong> Physics-based models derived from cell chemistry (NMC vs. LFP), pack voltage (400V vs. 800V), and verified C-rate limits for models awaiting direct bench telemetry.
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Link href="/data-sources" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                <span>View full Data Sources catalog &amp; classifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. How Calculations Are Performed */}
        <section className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">How Calculations Are Performed</h2>
          </div>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              We avoid simplified average-speed shortcuts. All session durations and energy additions are computed via <strong>discrete numerical integration (Riemann summation)</strong> across the vehicle&apos;s piecewise power curve:
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto">
              {`Time (minutes) = ∑ [ (Usable_kWh × ΔSoC) / Min(P_vehicle(SoC), P_dispenser, I_max × V_pack) ] × 60`}
            </div>
            <p className="text-sm">
              This accounts for dynamic dispenser current limits (e.g. 500A CCS limit on 400V packs), ambient temperature derating factors, and constant-current to constant-voltage (CC-CV) transitions.
            </p>
            <div className="pt-2">
              <Link href="/methodology" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                <span>Read detailed mathematical equations in Methodology</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. How Data Is Reviewed & Corrected */}
        <section className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">How Data Is Reviewed &amp; Corrected</h2>
          </div>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Every curve update or vehicle profile adjustment undergoes sanity checks against OEM pack constraints (maximum cell charge voltage, nominal pack series/parallel layout, thermal envelope limits).
            </p>
            <p>
              Automotive manufacturers frequently release over-the-air (OTA) firmware updates that adjust BMS thermal throttling or charging profiles. We provide an open public correction tool and changelog for anyone to submit updated telemetry logs or report discrepancies.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/editorial-policy" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                <span>Editorial &amp; Verification Policy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/corrections" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                <span>Submit Data Correction or View Changelog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
