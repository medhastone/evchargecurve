import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, ShieldCheck, CheckCircle2, AlertCircle, FileText, ArrowRight, Activity, Search, ExternalLink } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { VEHICLES } from '@/data/evModels';

export const metadata: Metadata = {
  title: 'Data Sources & Classification Tiers | EVChargeCurve',
  description: 'Understand the standardized data provenance tiers used across EVChargeCurve: Manufacturer Data, Independent Tests, EVChargeCurve Measured, Modeled, and Estimated.',
  alternates: {
    canonical: 'https://evchargecurve.com/data-sources',
  },
};

export default function DataSourcesPage() {
  const publishedDate = '2024-01-25';
  const lastUpdated = '2026-03-15';
  const lastReviewed = '2026-03-20';

  const vehicleList = Object.entries(VEHICLES).map(([slug, vehicle]) => ({
    slug,
    name: vehicle.name,
    usableKwh: vehicle.usablePackKwh || vehicle.batteryCapacity,
    peakKw: vehicle.maxChargeKw,
    voltage: vehicle.architecture || '400V',
    provenance: vehicle.dataSourceLabel || 'EVChargeCurve Measured',
    sourceDescription: vehicle.sources?.[0]?.source || 'OBD-II CAN telemetry from instrumented 350kW fast charging sessions.'
  }));

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      {/* Header */}
      <section className="relative w-full pt-16 md:pt-24 pb-12 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Database className="w-4 h-4" />
            <span>Data Lineage &amp; Provenance</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Data Sources &amp; Classification
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We never blur theoretical manufacturer promises with real telemetry. Every charging curve, dwell time, and battery specification on EVChargeCurve is tagged with an unambiguous data provenance tier.
          </p>

          {/* Date Transparency */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Published:</span>{' '}
              <time dateTime={publishedDate} className="text-slate-300 font-mono">Jan 25, 2024</time>
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Data Sources', href: '/data-sources' }]} />

        {/* 5 Standardized Provenance Tiers */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Our 5 Standardized Data Labels</h2>
              <p className="text-xs text-slate-400">Clear boundaries between measured telemetry and mathematical simulations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Tier 1 */}
            <div className="p-6 rounded-2xl bg-[#111827] border border-emerald-500/30 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  EVChargeCurve Measured
                </span>
                <span className="text-xs text-slate-400 font-mono">Tier 1 • Direct Telemetry</span>
              </div>
              <h3 className="text-lg font-bold text-white">Primary CAN-Bus OBD-II Logging</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Raw time-series telemetry recorded directly from the vehicle&apos;s internal CAN-bus network via calibrated OBD-II loggers during DC fast charging sessions on 300kW+ capable dispensers. Records pack voltage, current (Amps), BMS requested kW, and minimum/maximum cell temperatures.
              </p>
            </div>

            {/* Tier 2 */}
            <div className="p-6 rounded-2xl bg-[#111827] border border-cyan-500/30 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Independent Test
                </span>
                <span className="text-xs text-slate-400 font-mono">Tier 2 • Third-Party Benchmark</span>
              </div>
              <h3 className="text-lg font-bold text-white">Instrumented Third-Party Runs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-fidelity benchmarks published with complete thermal and hardware documentation by reputable independent automotive testers (e.g. ADAC, Bjørn Nyland 1000km test logs, Fastned charging database, Out of Spec Reviews).
              </p>
            </div>

            {/* Tier 3 */}
            <div className="p-6 rounded-2xl bg-[#111827] border border-blue-500/30 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Manufacturer Data
                </span>
                <span className="text-xs text-slate-400 font-mono">Tier 3 • Official Filings</span>
              </div>
              <h3 className="text-lg font-bold text-white">OEM Homologation &amp; Manuals</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Official regulatory specifications extracted from EPA certificate filings, European WLTP certificate summaries, OEM technical press kits, and vehicle owner manuals. Used for nominal pack voltage, usable vs gross battery capacity, and onboard AC charger power.
              </p>
            </div>

            {/* Tier 4 */}
            <div className="p-6 rounded-2xl bg-[#111827] border border-purple-500/30 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  EVChargeCurve Modeled
                </span>
                <span className="text-xs text-slate-400 font-mono">Tier 4 • Physics-Based Model</span>
              </div>
              <h3 className="text-lg font-bold text-white">Electrochemical &amp; Thermal Model</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Piecewise charging profiles constructed using physical pack chemistry parameters (NMC811, LFP, NCMA), nominal system voltage (400V vs 800V), and verified C-rate limits from sister vehicles sharing the same platform (e.g. MEB, E-GMP, STLA).
              </p>
            </div>

            {/* Tier 5 */}
            <div className="p-6 rounded-2xl bg-[#111827] border border-amber-500/30 shadow-lg space-y-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Estimated
                </span>
                <span className="text-xs text-slate-400 font-mono">Tier 5 • Preliminary Curve</span>
              </div>
              <h3 className="text-lg font-bold text-white">Preliminary Heuristic Approximation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applied to brand-new or pre-production vehicles where only single-point 10–80% claims exist. The curve is approximated from known cell supplier limits and flagged prominently until direct OBD-II session recordings are verified.
              </p>
            </div>

          </div>
        </section>

        {/* Vehicle Lineage Catalog */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Vehicle Data Lineage Catalog</h2>
              <p className="text-xs text-slate-400">Canonical models in our dataset and their respective data tier</p>
            </div>
            <Link href="/curve" className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <span>View Interactive Curves</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Vehicle Model</th>
                  <th className="py-3 px-3">Capacity</th>
                  <th className="py-3 px-3">Peak DC</th>
                  <th className="py-3 px-3">Voltage</th>
                  <th className="py-3 px-3">Provenance Tier</th>
                  <th className="py-3 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {vehicleList.slice(0, 15).map((veh) => (
                  <tr key={veh.slug} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-3 font-sans font-medium text-white">
                      <Link href={`/curve/${veh.slug}`} className="hover:text-emerald-400 transition-colors">
                        {veh.name}
                      </Link>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{veh.usableKwh} kWh</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">{veh.peakKw} kW</td>
                    <td className="py-3 px-3 text-slate-300">{veh.voltage}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-sans font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                        {veh.provenance}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-400 text-[11px] max-w-xs truncate">
                      {veh.sourceDescription}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 pt-2">
            Showing sample of canonical models. Explore all models in the <Link href="/curve" className="text-emerald-400 underline">Charging Curve Directory</Link>.
          </p>
        </section>

      </div>
    </div>
  );
}
