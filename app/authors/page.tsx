import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Code2, Users, GitPullRequest, Database, Mail, ArrowRight, CheckCircle2, FileText, Heart } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Authors & Contributors | EVChargeCurve Open Source Maintainers',
  description: 'Meet the open-source maintainers, software developers, and community telemetry contributors behind EVChargeCurve. Genuine credentials, no manufactured titles.',
  alternates: {
    canonical: 'https://evchargecurve.com/authors',
  },
};

export default function AuthorsPage() {
  const publishedDate = '2024-01-20';
  const lastUpdated = '2026-03-15';
  const lastReviewed = '2026-03-20';

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      {/* Header */}
      <section className="relative w-full pt-16 md:pt-24 pb-12 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Users className="w-4 h-4" />
            <span>Open Source Community &amp; Maintainers</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Authors &amp; Contributors
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            EVChargeCurve is maintained by real software developers and community EV enthusiasts. We believe in total transparency: no invented academic credentials, fake laboratory roles, or manufactured engineering titles.
          </p>

          {/* Date Transparency */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Published:</span>{' '}
              <time dateTime={publishedDate} className="text-slate-300 font-mono">Jan 20, 2024</time>
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
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Authors', href: '/authors' }]} />

        {/* Lead Maintainer Card */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Code2 className="w-8 h-8" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <h2 className="text-2xl font-bold text-white">Medhastone</h2>
                <span className="text-xs text-emerald-400 font-semibold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Lead Developer &amp; Project Maintainer
                </span>
              </div>
              
              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Role:</strong> Software architecture, Next.js / TypeScript simulation engine implementation, numerical integration algorithms, and data pipeline maintenance for EVChargeCurve.
                </p>
                <p>
                  <strong>Background:</strong> Software developer and technical creator specializing in modern web platforms, edge computing, client-side mathematical modeling, and interactive visualization of complex energy systems.
                </p>
                <p>
                  <strong>Focus:</strong> Ensuring all vehicle charging curves, SoC piecewise functions, and battery thermodynamic models are transparently documented, mathematically verifiable, and accessible with zero server-side telemetry collection.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Curates Canonical Vehicle Dataset</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Maintains Simulation Algorithms</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Reviews Errata Submissions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Telemetry & Peer Review Board */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Community Contributors &amp; Reviewers</h2>
              <p className="text-xs text-slate-400">Real EV drivers, data loggers, and automotive enthusiasts</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Rather than claiming an exclusive internal testing laboratory, EVChargeCurve relies on an open peer-review model where real EV owners and community researchers contribute empirical charging data logged via standardized OBD-II/CAN-bus tools.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-semibold text-white text-sm">Telemetry Contributors</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Drivers who upload raw CSV/JSON logs from CarScanner Pro, ScanMyTesla, Torque Pro, or TeslaMate recording pack voltage, current, and cell temperatures during fast-charge sessions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-semibold text-white text-sm">Peer Review &amp; Errata Board</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Independent reviewers who cross-check manufacturer technical service bulletins (TSBs), BMS firmware update changelogs, and notify maintainers when battery curves change over-the-air.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contribution Standards & Credential Policy */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Our Honest Credential Policy</h2>
              <p className="text-xs text-slate-400">Zero tolerance for fabricated authority signals</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In an industry where marketing websites routinely manufacture fake &quot;Chief Battery Scientists&quot; or cite phantom &quot;certified testing institutes&quot; to game search engines, EVChargeCurve adheres strictly to honest attribution:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2 text-xs sm:text-sm">
              <li><strong>No Invented Titles:</strong> We never list fictional engineering positions, fake university labs, or invented professional accreditations.</li>
              <li><strong>Verifiable Code &amp; Math:</strong> Our authority stems from reproducible mathematics and open data lineage, not fabricated authority badges.</li>
              <li><strong>Attribution of External Data:</strong> When we reference tests conducted by third parties (e.g. Bjørn Nyland, ADAC, Fastned public data), we explicitly cite their work directly.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4">
            <Link href="/editorial-policy" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
              <span>Read Editorial Policy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/corrections" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
              <span>Submit Errata / Telemetry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
