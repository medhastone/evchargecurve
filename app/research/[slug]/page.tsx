import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  FlaskConical,
  Calendar,
  Layers,
  Award,
  BookOpen,
  ArrowLeft,
  Share2,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { RESEARCH_PAPERS, ResearchPaper } from '@/lib/researchData';
import Breadcrumb from '@/components/Breadcrumb';
import CitationBlock from '@/components/research/CitationBlock';
import ResearchTelemetryChart from '@/components/research/ResearchTelemetryChart';
import ResearchDatasetTable from '@/components/research/ResearchDatasetTable';
import MethodologyDisclosure from '@/components/research/MethodologyDisclosure';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return RESEARCH_PAPERS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = RESEARCH_PAPERS.find((p) => p.slug === slug);

  if (!paper) {
    return {
      title: 'Research Paper Not Found | EVChargeCurve',
    };
  }

  return {
    title: `${paper.shortTitle} | Empirical EV Research`,
    description: paper.abstract.slice(0, 160),
    alternates: {
      canonical: `https://evchargecurve.com/research/${paper.slug}`,
    },
    openGraph: {
      title: paper.title,
      description: paper.abstract.slice(0, 160),
      url: `https://evchargecurve.com/research/${paper.slug}`,
      type: 'article',
      publishedTime: paper.publishedDate,
      modifiedTime: paper.updatedDate,
      authors: paper.authors.map((a) => a.name),
    },
  };
}

export default async function ResearchPaperDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const paper = RESEARCH_PAPERS.find((p) => p.slug === slug);

  if (!paper) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: paper.title,
    name: paper.title,
    description: paper.abstract,
    url: `https://evchargecurve.com/research/${paper.slug}`,
    datePublished: paper.publishedDate,
    dateModified: paper.updatedDate,
    version: paper.version,
    identifier: paper.doi,
    author: paper.authors.map((a) => ({
      '@type': 'Person',
      name: a.name,
      jobTitle: a.role,
      affiliation: {
        '@type': 'Organization',
        name: a.affiliation,
      },
    })),
    publisher: {
      '@type': 'Organization',
      name: 'EVChargeCurve',
      url: 'https://evchargecurve.com',
      logo: 'https://evchargecurve.com/logo.png',
    },
    mainEntity: {
      '@type': 'Dataset',
      name: `${paper.title} - Telemetry Dataset`,
      description: paper.datasets[0]?.description || paper.abstract,
      url: `https://evchargecurve.com/research/${paper.slug}`,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      creator: {
        '@type': 'Organization',
        name: 'EVChargeCurve Open Telemetry Observatory',
      },
    },
  };

  return (
    <div className="bg-[#0B0F17] text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Original Research', href: '/research' },
            { label: paper.shortTitle, href: `/research/${paper.slug}` },
          ]}
        />

        {/* Paper Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Research Hub</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium">
                {paper.category}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[11px]">
                v{paper.version}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {paper.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 italic">
              {paper.subtitle}
            </p>
          </div>

          {/* Authors and Metadata Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
              {paper.authors.map((author, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-white block">{author.name}</span>
                    <span className="text-slate-400 text-[11px]">{author.affiliation}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-5">
              <div>
                <span className="text-slate-500 block text-[10px]">Published:</span>
                <span className="text-slate-200">{paper.publishedDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Updated:</span>
                <span className="text-emerald-400">{paper.updatedDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">DOI:</span>
                <span className="text-slate-300">{paper.doi}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Abstract */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Executive Abstract</span>
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
            {paper.abstract}
          </p>
        </section>

        {/* Research Question & Hypothesis */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Core Research Question</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              "{paper.researchQuestion}"
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Empirical Hypothesis</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              "{paper.hypothesis}"
            </p>
          </div>
        </section>

        {/* Key Findings Matrix */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">Key Empirical Findings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paper.keyFindings.map((kf, i) => (
              <div
                key={i}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mb-1">
                    {kf.stat}
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                    {kf.label}
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {kf.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Telemetry Chart */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Interactive Telemetry Visualization
          </h2>
          <ResearchTelemetryChart
            title={paper.shortTitle}
            subtitle="Piecewise linear integration from 10% to 80% SoC on 350kW liquid-cooled hardware."
            data={paper.comparativeChartData}
            series={paper.chartSeries}
            yAxisLabel="Power Delivery (kW)"
          />
        </section>

        {/* Dataset Table & CSV Download */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Empirical Benchmark Dataset
          </h2>
          {paper.datasets.map((ds, idx) => (
            <ResearchDatasetTable
              key={idx}
              name={ds.name}
              description={ds.description}
              columns={ds.columns}
              rows={ds.rows}
              slug={paper.slug}
            />
          ))}
        </section>

        {/* Methodology & Instrumentation Disclosure */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Methodology, Instrumentation & Error Margins
          </h2>
          <MethodologyDisclosure
            methodology={paper.methodology}
            limitations={paper.limitations}
            mathematicalFormulas={paper.mathematicalFormulas}
          />
        </section>

        {/* Discussion & In-Depth Technical Analysis */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Technical Discussion & Interpretation</span>
          </div>

          <div className="space-y-6">
            {paper.discussion.map((disc, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {disc.heading}
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {disc.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Takeaways */}
        <section className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
            <span>Practical Takeaways for Drivers & Fleet Operators</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {paper.practicalTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Citation Block */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Academic & Journalistic Citation
          </h2>
          <CitationBlock paper={paper} />
        </section>

        {/* References & Sources */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            References & Data Sources
          </h3>
          <ul className="space-y-2 text-xs text-slate-400 divide-y divide-slate-800/80">
            {paper.sources.map((src, i) => (
              <li key={i} className="pt-2 first:pt-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold text-slate-200">
                    [{i + 1}] {src.authorOrOrg} ({src.year}). <em>{src.title}</em>.
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">{src.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
