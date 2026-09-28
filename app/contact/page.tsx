import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, GitPullRequest, ShieldCheck, ArrowRight, CheckCircle2, FileText, Bug } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact & Data Errata Inquiries | EVChargeCurve',
  description: 'Get in touch with the EVChargeCurve maintainers for data corrections, OBD-II telemetry submissions, and open-source contributions.',
  alternates: {
    canonical: 'https://evchargecurve.com/contact',
  },
};

export default function ContactPage() {
  const publishedDate = '2024-02-05';
  const lastUpdated = '2026-03-15';
  const lastReviewed = '2026-03-20';

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      {/* Header */}
      <section className="relative w-full pt-16 md:pt-24 pb-12 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Mail className="w-4 h-4" />
            <span>Open Communications &amp; Errata</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Contact &amp; Errata Channels
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We operate transparent, direct communication channels. We do not use manufactured office addresses or call centers. Reach out directly to maintainers below.
          </p>

          {/* Date Transparency */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Published:</span>{' '}
              <time dateTime={publishedDate} className="text-slate-300 font-mono">Feb 5, 2024</time>
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
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]} />

        {/* Contact Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Data Corrections */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Data Corrections &amp; Telemetry</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Found a discrepancy in a vehicle curve, peak kW rating, or usable battery capacity? Use our interactive reporting tool for peer review.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/corrections"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-xs border border-emerald-500/20 transition-colors"
              >
                <span>Open Corrections Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Editorial & Research */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Direct Editorial Email</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                For research collaboration, technical feedback, or questions regarding our mathematical simulation models:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 select-all">
                contact@evchargecurve.com
              </div>
            </div>
            <div className="text-[11px] text-slate-400">
              Monitored directly by project maintainer Medhastone. Response time typically within 48–72 hours.
            </div>
          </div>

        </section>

        {/* Responsible Disclosure & Transparency Policy */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Authentic Operations Guarantee</h2>
              <p className="text-xs text-slate-400">Our promise regarding transparency and contact</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              EVChargeCurve is an independent digital publication and computational tool operated digitally. We do not maintain retail storefronts or fabricated physical offices.
            </p>
            <p>
              All mathematical calculations are performed client-side in your web browser. We do not store or collect personal user identities, vehicle VINs, or location telemetry on any private server.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4">
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/editorial-policy" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
              <span>Read Editorial Policy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
