import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTopicHub, getAllTopicHubs, TOPIC_HUB_SLUGS } from '@/lib/topicHubs';
import { VEHICLES } from '@/data/evModels';
import Breadcrumb from '@/components/Breadcrumb';
import {
  Zap,
  ArrowRight,
  Calculator,
  BookOpen,
  HelpCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface TopicHubPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return TOPIC_HUB_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TopicHubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = getTopicHub(slug);

  if (!hub) {
    return {
      title: 'Topic Not Found | EVChargeCurve',
    };
  }

  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: {
      canonical: `https://evchargecurve.com/topics/${slug}`,
    },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      url: `https://evchargecurve.com/topics/${slug}`,
      siteName: 'EVChargeCurve',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: hub.metaTitle,
      description: hub.metaDescription,
    },
  };
}

export default async function TopicHubPage({ params }: TopicHubPageProps) {
  const { slug } = await params;
  const hub = getTopicHub(slug);

  if (!hub) {
    notFound();
  }

  // Schema.org FAQPage + Article / WebPage JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: hub.h1,
    description: hub.metaDescription,
    url: `https://evchargecurve.com/topics/${slug}`,
    author: {
      '@type': 'Organization',
      name: 'EVChargeCurve Open Data & Telemetry Group',
      url: 'https://evchargecurve.com/authors',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EVChargeCurve',
      url: 'https://evchargecurve.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://evchargecurve.com/topics/${slug}`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Resolve vehicle models for featured grid
  const featuredVehicles = hub.featuredVehicleSlugs
    .map((vSlug) => ({ slug: vSlug, data: VEHICLES[vSlug] }))
    .filter((v) => v.data !== undefined);

  // Resolve related hubs
  const allHubs = getAllTopicHubs();
  const relatedHubs = hub.relatedHubSlugs
    .map((rSlug) => allHubs.find((h) => h.slug === rSlug))
    .filter((h): h is NonNullable<typeof h> => h !== undefined);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb
          items={[
            { label: 'Topic Hubs', href: '/topics' },
            { label: hub.shortTitle, href: `/topics/${hub.slug}` }
          ]}
          className="mb-8"
        />

        {/* Hero Section */}
        <header className="mb-12 border-b border-slate-800/80 pb-10">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400 mb-4">
            <span className="text-emerald-400 font-semibold">{hub.badge}</span>
            <span aria-hidden="true">·</span>
            <span>Topical Authority Pillar</span>
            <span aria-hidden="true">·</span>
            <span>Peer-Reviewed Telemetry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
            {hub.h1}
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-4xl">
            {hub.summary}
          </p>

          {/* Key Empirical Takeaways */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-7">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Empirical Findings & Benchmarks</span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {hub.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Physics & Mathematical Model Card */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">
              Physics & Mathematical Formulation
            </h2>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-200 mb-2">
              {hub.physicsAndMath.formulaTitle}
            </h3>
            <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-lg font-mono text-emerald-400 text-sm sm:text-base overflow-x-auto mb-3">
              {hub.physicsAndMath.formula}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {hub.physicsAndMath.explanation}
            </p>
          </div>
        </section>

        {/* Featured Interactive Calculators & Tools */}
        <section className="mb-14">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">
                Interactive Calculators & Simulators
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {hub.featuredCalculators.length} Tools Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hub.featuredCalculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="p-5 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-xl flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                      {calc.metricLabel}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {calc.description}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Empirical Vehicle Curves Grid */}
        {featuredVehicles.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold text-white">
                  Empirical Vehicle Charging Curves & Telemetry
                </h2>
              </div>
              <Link
                href="/curve"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
              >
                <span>View all 50+ vehicles</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredVehicles.map(({ slug: vSlug, data }) => (
                <Link
                  key={vSlug}
                  href={`/curve/${vSlug}`}
                  className="p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                      <span>{data.architecture}</span>
                      <span>{data.usablePackKwh || data.batteryCapacity} kWh usable</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-1 line-clamp-1">
                      {data.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      {data.brand} · {data.chemistry} chemistry
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                    <span className="font-mono text-emerald-400 font-semibold">
                      {data.maxChargeKw} kW Peak
                    </span>
                    <span className="text-slate-400 inline-flex items-center gap-1 group-hover:text-slate-200">
                      <span>View Curve</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Deep-Dive Engineering Guides */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">
              Supporting Engineering Guides & Analyses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hub.deepDiveGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="p-6 bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-xl flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                    <span>Technical Reference</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {guide.summary}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        {hub.faqs.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {hub.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <h3 className="text-base font-semibold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Topical Authority Pillars */}
        {relatedHubs.length > 0 && (
          <section className="mb-14 border-t border-slate-800/80 pt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                Related Knowledge Pillars
              </h2>
              <Link href="/topics" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">
                View all 12 pillars →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {relatedHubs.map((rHub) => (
                <Link
                  key={rHub.slug}
                  href={`/topics/${rHub.slug}`}
                  className="p-4 bg-slate-900/50 border border-slate-800/90 hover:border-slate-700 rounded-lg group transition-all"
                >
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                    {rHub.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {rHub.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Data Provenance & Methodology Notice */}
        <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl flex items-start gap-4 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-slate-200 block">
              Data Provenance & Calculation Governance
            </span>
            <p>
              Calculations and charging profiles on this page are grounded in empirical CAN-bus telemetry and peer-reviewed electrochemical models. Review our complete{' '}
              <Link href="/methodology" className="text-emerald-400 underline hover:text-emerald-300">
                Mathematical Methodology
              </Link>
              ,{' '}
              <Link href="/testing" className="text-emerald-400 underline hover:text-emerald-300">
                Testing Procedures
              </Link>
              , and{' '}
              <Link href="/data-sources" className="text-emerald-400 underline hover:text-emerald-300">
                Data Sources Classification
              </Link>
              . Discrepancies may be submitted via our{' '}
              <Link href="/corrections" className="text-emerald-400 underline hover:text-emerald-300">
                Errata Changelog
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
