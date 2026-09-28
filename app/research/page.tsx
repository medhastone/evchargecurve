import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FlaskConical,
  Activity,
  ArrowRight,
  Database,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';
import { RESEARCH_PAPERS } from '@/lib/researchData';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Empirical EV Charging Research & Telemetry Observatory',
  description: 'Original academic and automotive engineering research on EV DC fast charging curves, 400V vs. 800V architectures, peak vs. average power, and cold-weather thermal kinetics.',
  alternates: {
    canonical: 'https://evchargecurve.com/research',
  },
  openGraph: {
    title: 'EVChargeCurve Original Research Observatory',
    description: 'Empirical EV charging studies with transparent CAN-bus datasets, mathematical proofs, and downloadable CSV telemetry.',
    url: 'https://evchargecurve.com/research',
  },
};

export default function ResearchHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'EVChargeCurve Empirical EV Charging Research Portal',
    description: 'Original technical studies, CAN-bus datasets, and mathematical modeling of electric vehicle DC fast charging performance.',
    url: 'https://evchargecurve.com/research',
    hasPart: RESEARCH_PAPERS.map((paper) => ({
      '@type': 'ScholarlyArticle',
      headline: paper.title,
      name: paper.shortTitle,
      description: paper.abstract,
      url: `https://evchargecurve.com/research/${paper.slug}`,
      datePublished: paper.publishedDate,
      dateModified: paper.updatedDate,
      author: paper.authors.map((a) => ({
        '@type': 'Person',
        name: a.name,
      })),
      identifier: paper.doi,
    })),
  };

  return (
    <div className="bg-[#0B0F17] text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumbs */}
        <Breadcrumb items={[{ label: 'Original Research & Telemetry', href: '/research' }]} />

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>EVChargeCurve Empirical Observatory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Original EV Charging Research & Telemetry Datasets
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Moving beyond marketing brochures and EPA window stickers. We analyze high-resolution 1Hz CAN-bus telemetry, 500A liquid-cooled charging logs, and physical thermal dynamics across 25+ modern electric vehicles to deliver reproducible, peer-citable automotive research.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400">25+</div>
                <div className="text-xs text-slate-400">Verified EV Models</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400">150+</div>
                <div className="text-xs text-slate-400">High-Power DCFC Logs</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-indigo-400">1.0 Hz</div>
                <div className="text-xs text-slate-400">Continuous CAN Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-amber-400">100%</div>
                <div className="text-xs text-slate-400">Open CSV Datasets</div>
              </div>
            </div>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Published Research Whitepapers
              </h2>
              <p className="text-xs text-slate-400">
                All publications include transparent methodology disclosures, mathematical formulas, interactive SVG charts, and raw CSV downloads.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Open Access (CC BY 4.0)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESEARCH_PAPERS.map((paper) => (
              <div
                key={paper.slug}
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group shadow-lg hover:shadow-emerald-950/20"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium">
                      {paper.category}
                    </span>
                    <span className="text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Updated {paper.updatedDate}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight leading-snug">
                      <Link href={`/research/${paper.slug}`}>
                        {paper.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1 italic">
                      {paper.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {paper.abstract}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    {paper.keyFindings.slice(0, 2).map((kf, i) => (
                      <div key={i} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
                        <div className="text-sm font-bold font-mono text-emerald-400">{kf.stat}</div>
                        <div className="text-[11px] text-slate-400 font-medium truncate">{kf.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Database className="w-3.5 h-3.5 text-slate-400" />
                      <span>CSV Included</span>
                    </span>
                    <span>•</span>
                    <span>DOI: {paper.doi.split('.').slice(-2).join('.')}</span>
                  </div>

                  <Link
                    href={`/research/${paper.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all"
                  >
                    <span>Read Whitepaper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peer Reference & Methodology Standard Banner */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Journalist & Researcher Open Access License</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Free to Reference, Embed, and Publish
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All EVChargeCurve datasets, charts, formulas, and findings are released under the Creative Commons Attribution 4.0 International License (CC BY 4.0). Automotive journalists, academic researchers, and EV enthusiasts are free to use and cite these benchmarks with standard attribution.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interactive Compare Tool</span>
              </Link>
              <Link
                href="/simulator"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all shadow-md shadow-emerald-950"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Launch Fast Charge Simulator</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
