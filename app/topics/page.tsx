import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTopicHubs } from '@/lib/topicHubs';
import Breadcrumb from '@/components/Breadcrumb';
import { Zap, ArrowRight, Gauge, Clock, ShieldCheck, Flame, Sun, BatteryCharging, Compass, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Charging Knowledge Hubs: 12 Core Pillars & Telemetry | EVChargeCurve',
  description: 'Master EV charging through 12 dedicated topical authority hubs. Explore charging curves, 400V vs 800V architectures, 10–80% dwell times, preconditioning physics, and degradation.',
  alternates: {
    canonical: 'https://evchargecurve.com/topics',
  },
  openGraph: {
    title: 'EV Charging Knowledge Hubs: 12 Core Pillars | EVChargeCurve',
    description: 'Explore the 12 core pillars of electric vehicle charging: empirical curve telemetry, 400V vs 800V architectures, thermal tapers, and degradation kinetics.',
    url: 'https://evchargecurve.com/topics',
    siteName: 'EVChargeCurve',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Charging Knowledge Hubs: 12 Core Pillars | EVChargeCurve',
    description: 'Empirical EV charging authority hubs: charging curves, 800V vs 400V, thermal tapers, cold-weather physics, and home charging economics.',
  },
};

const pillarIcons: Record<string, React.ReactNode> = {
  'ev-charging-curves': <Zap className="w-5 h-5 text-emerald-400" />,
  'dc-fast-charging': <BatteryCharging className="w-5 h-5 text-cyan-400" />,
  'ev-charging-time': <Clock className="w-5 h-5 text-amber-400" />,
  '10-80-charging': <Gauge className="w-5 h-5 text-emerald-400" />,
  'charging-taper': <Flame className="w-5 h-5 text-orange-400" />,
  '400v-vs-800v': <Zap className="w-5 h-5 text-purple-400" />,
  'battery-preconditioning': <Flame className="w-5 h-5 text-rose-400" />,
  'cold-weather-charging': <Gauge className="w-5 h-5 text-sky-400" />,
  'home-charging': <Sun className="w-5 h-5 text-amber-400" />,
  'ev-battery-health': <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  'ev-charging-cost': <Calculator className="w-5 h-5 text-teal-400" />,
  'ev-road-trip-charging': <Compass className="w-5 h-5 text-indigo-400" />,
};

export default function TopicsIndexPage() {
  const hubs = getAllTopicHubs();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'EV Charging Knowledge Hubs & Topical Pillars',
    description: 'A comprehensive 12-pillar knowledge directory covering empirical EV charging curves, 400V vs 800V architectures, battery preconditioning, and degradation modeling.',
    url: 'https://evchargecurve.com/topics',
    publisher: {
      '@type': 'Organization',
      name: 'EVChargeCurve',
      url: 'https://evchargecurve.com',
    },
    hasPart: hubs.map((hub) => ({
      '@type': 'WebPage',
      name: hub.title,
      url: `https://evchargecurve.com/topics/${hub.slug}`,
      description: hub.summary,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb
          items={[
            { label: 'Topic Hubs', href: '/topics' }
          ]}
          className="mb-8"
        />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3">
            <span>Electrochemical Physics</span>
            <span aria-hidden="true">·</span>
            <span>Empirical Telemetry</span>
            <span aria-hidden="true">·</span>
            <span>12 Core Pillars</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 text-balance">
            EV Charging Knowledge Hubs & Authority Pillars
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            A comprehensive, physics-grounded taxonomy of electric vehicle charging. Select a topic pillar below to explore empirical benchmark curves, mathematical simulation models, calculators, and engineering deep-dives.
          </p>
        </div>

        {/* 12 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubs.map((hub, index) => {
            const icon = pillarIcons[hub.slug] || <Zap className="w-5 h-5 text-emerald-400" />;
            return (
              <div
                key={hub.slug}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200">
                        {icon}
                      </div>
                      <span className="text-xs font-mono text-slate-400 tracking-wide uppercase">
                        Pillar {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-md">
                      {hub.badge}
                    </span>
                  </div>

                  <Link href={`/topics/${hub.slug}`} className="block group-hover:text-emerald-400 transition-colors">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {hub.title}
                    </h2>
                  </Link>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {hub.summary}
                  </p>

                  {/* Featured Tools Quick Links */}
                  <div className="border-t border-slate-800/80 pt-4 mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-2">
                      Featured Calculators & Models
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {hub.featuredCalculators.slice(0, 2).map((calc) => (
                        <li key={calc.href}>
                          <Link
                            href={calc.href}
                            className="hover:text-emerald-400 text-slate-300 transition-colors inline-flex items-center gap-1.5"
                          >
                            <span className="w-1 h-1 rounded-full bg-emerald-400/80" />
                            <span className="truncate">{calc.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {hub.featuredVehicleSlugs.length} vehicle models · {hub.deepDiveGuides.length} guides
                  </span>
                  <Link
                    href={`/topics/${hub.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Explore Pillar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Hub Navigation Footer */}
        <div className="mt-16 p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-center max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-2">Looking for a specific vehicle curve or calculator?</h3>
          <p className="text-sm text-slate-400 mb-6">
            Compare charging curves side-by-side or launch the full numerical simulator with battery thermal modeling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition-colors shadow-sm"
            >
              Open Charging Simulator
            </Link>
            <Link
              href="/compare"
              className="px-5 py-2.5 rounded-lg bg-slate-800 text-slate-200 font-semibold text-sm hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Compare Two Vehicles
            </Link>
            <Link
              href="/curve"
              className="px-5 py-2.5 rounded-lg bg-slate-800 text-slate-200 font-semibold text-sm hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Browse 50+ Vehicle Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
