import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, BookOpen, FileCheck, CheckCircle2, Search, Edit3, RefreshCw, AlertTriangle, ArrowRight, Scale, Lock } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Editorial & Data Policy | EVChargeCurve',
  description: 'Learn how EVChargeCurve researches, writes, fact-checks, technically reviews, and updates EV charging curves and technical guides with zero sponsor bias.',
  alternates: {
    canonical: 'https://evchargecurve.com/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  const publishedDate = '2024-01-22';
  const lastUpdated = '2026-03-15';
  const lastReviewed = '2026-03-20';

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      {/* Header */}
      <section className="relative w-full pt-16 md:pt-24 pb-12 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <FileCheck className="w-4 h-4" />
            <span>Integrity &amp; Review Standards</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Editorial &amp; Data Policy
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Our mission is to publish accurate, transparent, and reproducible electric vehicle charging benchmarks. Here is the strict process governing how content and telemetry are researched, evaluated, and updated.
          </p>

          {/* Date Transparency */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Published:</span>{' '}
              <time dateTime={publishedDate} className="text-slate-300 font-mono">Jan 22, 2024</time>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Editorial Policy', href: '/editorial-policy' }]} />

        {/* 5-Step Editorial & Technical Lifecycle */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">The 5-Step Editorial &amp; Data Lifecycle</h2>
              <p className="text-xs text-slate-400">How every vehicle curve, tool, and guide is produced</p>
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Step 1: Research */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm flex-shrink-0">
                1
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Primary Research &amp; Raw Telemetry Intake</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We gather official OEM technical filings (EPA certificate applications, UNECE homologation documents, owner manuals), and collect raw OBD-II CAN-bus session logs from calibrated 350kW/400A+ DC fast chargers. We never rely on hearsay or press release summaries.
                </p>
              </div>
            </div>

            {/* Step 2: Writing */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm flex-shrink-0">
                2
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  <span>Writing &amp; Transparent Explanation</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Technical guides and vehicle profiles are authored using plain, precise language. We explicitly define all assumptions (e.g. 20°C ambient, battery preconditioned to 25°C, 350kW CCS dispenser rated for 500A) so readers understand the exact boundary conditions under which data applies.
                </p>
              </div>
            </div>

            {/* Step 3: Fact-Checking */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm flex-shrink-0">
                3
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-400" />
                  <span>Fact-Checking &amp; Canonical Reconciliation</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Every vehicle specification (usable kWh vs. gross kWh, nominal pack voltage, cell chemistry, max AC kW, max DC kW) is checked against our canonical dataset in <code className="text-cyan-300 font-mono text-xs">lib/data/vehicles.ts</code> to prevent technical contradictions across pages.
                </p>
              </div>
            </div>

            {/* Step 4: Technical Review */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-sm flex-shrink-0">
                4
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Technical &amp; Physical Boundary Review</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Simulated curves and mathematical formulas are audited for electrochemical realism: checking maximum C-rate envelope (rarely exceeding 3.2C in production packs), maximum cable current limits (500A CCS standard), and internal resistance heating (<code className="text-purple-300 font-mono text-xs">I²R</code>) constraints at high SoC.
                </p>
              </div>
            </div>

            {/* Step 5: Continuous Updates */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm flex-shrink-0">
                5
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>OTA Firmware Tracking &amp; Continuous Revision</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Automakers regularly alter charging taper curves via OTA firmware updates. When new telemetry is submitted or verified through our public correction pipeline, curves and simulation matrices are revised, with changes logged in our public Errata Changelog.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Independence & Commercial Policy */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Independence &amp; Conflict of Interest</h2>
              <p className="text-xs text-slate-400">Unbiased reporting with zero commercial influence</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              To maintain absolute editorial and scientific credibility, EVChargeCurve adheres to strict independence guidelines:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2 text-xs sm:text-sm">
              <li><strong>No OEM Sponsorships:</strong> We do not accept sponsorship, advertising fees, or paid placements from electric vehicle manufacturers.</li>
              <li><strong>No Charging Network Bias:</strong> We do not receive kickbacks or affiliate fees for recommending specific charging station networks or hardware manufacturers.</li>
              <li><strong>Open Calculation Engine:</strong> All simulation code executes client-side in standard JavaScript/TypeScript, making our calculation methodology completely auditable.</li>
            </ul>
          </div>
        </section>

        {/* Electrical & Safety Disclaimer Policy */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Electrical, Code &amp; Safety Disclaimers</h2>
              <p className="text-xs text-slate-400">Jurisdiction-qualified guidance</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Electrical infrastructure requirements vary by national, state, and municipal jurisdiction. When our tools discuss Level 2 EVSE installations, panel capacity, NEMA receptacles, or GFCI breakers:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2 text-xs sm:text-sm">
              <li>We explicitly cite the governing reference standard (such as <em>NFPA 70 / National Electrical Code Article 625</em> in the United States, or <em>BS 7671</em> in the United Kingdom).</li>
              <li>We mandate that high-voltage electrical installations (240V/480V) must be inspected and completed by a licensed, insured electrician in accordance with the local Authority Having Jurisdiction (AHJ).</li>
              <li>Our calculators are intended for planning and educational estimation purposes only.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4">
            <Link href="/methodology" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
              <span>View Testing &amp; Math Methodology</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/data-sources" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
              <span>Explore Data Sources</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
