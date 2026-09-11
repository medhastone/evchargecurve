import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  Zap, 
  BatteryWarning, 
  Clock, 
  ThermometerSun, 
  TrendingDown, 
  ShieldCheck, 
  AlertTriangle,
  HeartPulse,
  Info,
  CheckCircle2,
  Calendar,
  Activity,
  ExternalLink,
  HelpCircle,
  Tag,
  ThermometerSnowflake
} from 'lucide-react';
import { 
  CalendarAgingSvg,
  ThermalStressSvg
} from '@/components/blog/DegradationInfographics';
import { BatteryDegradationThumbnail } from '@/components/blog/BlogThumbnails';
import { BatteryLifecycleTrajectorySvg } from '@/components/BatteryLifecycleTrajectorySvg';
import FloatingShareBar from '@/components/blog/FloatingShareBar';
import { TableOfContents } from '@/components/blog/TableOfContents';

const ARTICLE_TAGS = [
  'Battery Degradation',
  'Calendar Aging',
  'Cyclic Aging',
  'LFP vs NMC',
  'DC Fast Charging',
  'EV Battery Lifespan',
  'Solid Electrolyte Interphase',
  'Battery State of Health'
];

export const metadata: Metadata = {
  title: 'Lithium-Ion Battery Degradation: Calendar Aging vs. Cyclic DC Fast Charging',
  description: 'Understand the physics of EV battery degradation. Learn the real impact of calendar aging, SEI layer formation, and frequent DC fast charging on LFP and NMC batteries.',
  keywords: [
    'ev battery degradation over time',
    'ev battery calendar aging',
    'does dc fast charging ruin ev battery',
    'how much do ev batteries degrade',
    'lfp vs nmc battery degradation',
    'tesla battery degradation 100k miles',
    'electric car battery life expectancy',
    'cyclic aging lithium ion'
  ],
  alternates: {
    canonical: 'https://evchargecurve.com/blog/lithium-ion-battery-degradation',
  },
  openGraph: {
    title: 'Lithium-Ion Battery Degradation: Calendar Aging vs. Cyclic DC Fast Charging',
    description: 'Understand the physics of EV battery degradation. Learn the real impact of calendar aging, SEI layer formation, and frequent DC fast charging on LFP and NMC batteries.',
    type: 'article',
    url: 'https://evchargecurve.com/blog/lithium-ion-battery-degradation',
    images: [
      {
        url: 'https://evchargecurve.com/images/og-battery-degradation.png',
        width: 1200,
        height: 630,
        alt: 'Lithium-Ion Battery Degradation: Calendar vs Cyclic Aging',
      }
    ]
  }
};

export default function LithiumIonDegradationPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://evchargecurve.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://evchargecurve.com/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Lithium-Ion Battery Degradation',
        'item': 'https://evchargecurve.com/blog/lithium-ion-battery-degradation'
      }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Lithium-Ion Battery Degradation: Calendar Aging vs. Cyclic DC Fast Charging',
    'description': 'Understand the physics of EV battery degradation. Learn the real impact of calendar aging, SEI layer formation, and frequent DC fast charging on LFP and NMC batteries.',
    'author': {
      '@type': 'Organization',
      'name': 'EVChargeCurve',
      'url': 'https://evchargecurve.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'EVChargeCurve',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://evchargecurve.com/logo.png'
      }
    },
    'datePublished': '2026-09-11',
    'dateModified': '2026-09-11',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-[#0B0F19] text-slate-200 selection:bg-cyan-500/30 font-sans">
        {/* Progress Bar & Share Bar */}
        <FloatingShareBar 
          url="https://evchargecurve.com/blog/lithium-ion-battery-degradation"
          title="Lithium-Ion Battery Degradation: Calendar Aging vs. Cyclic DC Fast Charging"
          description="Understand the physics of EV battery degradation. Learn the real impact of calendar aging, SEI layer formation, and frequent DC fast charging."
          ogImage="/images/og-battery-degradation.png"
          ogSvg={<BatteryDegradationThumbnail />}
        />

        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#0F172A] to-[#0B0F19]">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={[
              { label: 'Blog', href: '/blog' },
              { label: 'Battery Degradation' }
            ]} />
            
            <div className="flex flex-wrap gap-2 mb-6 mt-6">
              {ARTICLE_TAGS.slice(0, 3).map(tag => (
                <span key={tag} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
              Lithium-Ion Battery Degradation: <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Calendar Aging vs. Cyclic DC Fast Charging
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl mb-8">
              A data-driven deep dive into the physics of why electric car batteries lose capacity over time. Discover how heat, time, and charging habits actually affect your State of Health (SoH).
            </p>

            <div className="flex items-center gap-4 text-sm text-slate-500 border-t border-slate-800 pt-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>September 11, 2026 &bull; 12 min read</span>
              </div>
              <span className="hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Battery Science</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-10 bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-6">
                <TableOfContents items={[
                  { id: 'calendar-aging', label: 'Part 1: The Physics of Calendar Aging', level: 2 },
                  { id: 'sei-layer', label: 'The SEI Layer: First Year', level: 3 },
                  { id: 'arrhenius-kinetics', label: 'Arrhenius Kinetics & Heat', level: 3 },
                  { id: 'cyclic-aging', label: 'Part 2: Cyclic Aging & Fast Charging', level: 2 },
                  { id: 'dc-fast-charging', label: 'Does DC Fast Charging Ruin It?', level: 3 },
                  { id: 'chemistry-differences', label: 'Part 3: LFP vs. NMC Chemistry', level: 2 },
                  { id: 'nmc-chemistry', label: 'NMC / NCA', level: 3 },
                  { id: 'lfp-chemistry', label: 'LFP', level: 3 },
                  { id: 'best-practices', label: 'Best Practices for Longevity', level: 2 },
                ]} />
              </div>

              <article className="prose prose-invert prose-slate prose-lg max-w-none">
              <p className="lead text-xl text-slate-300">
                "How much will my EV battery degrade over time?" and "Does DC fast charging ruin my battery?" are the two most common questions for new electric vehicle owners. To answer them accurately, we have to look past the anecdotal internet myths and dig into the electrochemical reality.
              </p>

              <p>
                In electric vehicles, battery degradation is not a single, linear process. It is the combined result of two distinct forces: <strong>Calendar Aging</strong> (the passage of time and thermal exposure) and <strong>Cyclic Aging</strong> (the physical wear and tear of charging and discharging).
              </p>

              <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
                <h4 className="flex items-center gap-2 text-blue-400 mt-0 mb-2">
                  <Info className="w-5 h-5" />
                  The Bottom Line Up Front
                </h4>
                <p className="text-sm text-slate-300 m-0 leading-relaxed">
                  Most modern, liquid-cooled EV batteries will outlast the chassis of the car. Fleet telemetry data spanning hundreds of thousands of vehicles shows that average <strong>EV battery degradation is remarkably low—roughly 1% to 1.5% per year</strong>. Extreme cases of failure are typically manufacturing defects covered under the federally mandated 8-year/100,000-mile warranty, rather than normal wear.
                </p>
              </div>

              <h2 id="calendar-aging" className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-emerald-400" />
                Part 1: The Physics of Calendar Aging
              </h2>

              <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 sm:p-8 my-8 shadow-lg">
                <p className="text-slate-300 leading-relaxed m-0 text-lg">
                  <strong>Calendar aging</strong> refers to the capacity loss that occurs simply because time passes. This happens regardless of whether the car is driven or parked in a garage. 
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <p className="text-slate-400 text-sm m-0">
                    It is driven entirely by parasitic chemical reactions occurring constantly inside the cell.
                  </p>
                </div>
              </div>

              <h3 id="sei-layer">The SEI Layer: Why the First Year is the Worst</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-5 shadow-inner">
                  <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mt-0 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Phase 1: High Reactivity
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed m-0">
                    When a lithium-ion battery is manufactured, the liquid electrolyte is highly reactive with the graphite anode. 
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mt-3 mb-0">
                    During the very first charge cycles at the factory and your first year of ownership, the electrolyte chemically decomposes on the anode's surface.
                  </p>
                </div>

                <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-5 shadow-inner">
                  <h4 className="text-emerald-400 text-sm font-bold uppercase tracking-wider mt-0 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Phase 2: Crust Formation
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed m-0">
                    This decomposition forms a protective crust known as the <strong>Solid Electrolyte Interphase (SEI)</strong>. 
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mt-3 mb-0">
                    While the SEI layer is absolutely necessary to stabilize the battery and prevent it from destroying itself, its formation <em>permanently consumes active lithium ions</em>.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200/80 m-0">
                  <strong>The Result:</strong> This phenomenon causes a noticeable capacity drop (typically 2% to 4%) early in the battery's life before stabilizing.
                </p>
              </div>

              <CalendarAgingSvg />

              <div className="bg-[#131B2A] border-l-4 border-emerald-500 rounded-r-xl p-6 my-6 shadow-sm">
                <p className="text-slate-300 leading-relaxed m-0 text-sm">
                  This phenomenon follows a mathematically predictable curve: <strong>Degradation is proportional to the square root of time ($t^{1/2}$)</strong>. This means the degradation you see in Year 1 will be significantly steeper than what you see in Year 4, and it will eventually plateau into a very slow, linear decline.
                </p>
              </div>

              <h3 id="arrhenius-kinetics" className="mt-12 mb-4">Arrhenius Kinetics: Heat is the Enemy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5 shadow-inner">
                  <h4 className="text-rose-400 text-sm font-bold uppercase tracking-wider mt-0 mb-2 flex items-center gap-2">
                    <ThermometerSun className="w-4 h-4" />
                    The Chemical Rule
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed m-0">
                    The rate at which the SEI layer grows—and parasitic side reactions occur—is dictated by the <strong>Arrhenius equation</strong>. 
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mt-2 mb-0 font-medium text-rose-200">
                    In chemistry, reaction rates double for roughly every 10&deg;C (18&deg;F) increase in temperature.
                  </p>
                </div>
                
                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-5 shadow-inner">
                  <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mt-0 mb-2 flex items-center gap-2">
                    <ThermometerSnowflake className="w-4 h-4" />
                    The Engineering Solution
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed m-0">
                    This is why early EVs without liquid thermal management experienced massive degradation in hot climates.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mt-2 mb-0">
                    Today, nearly all modern EVs use sophisticated liquid cooling loops to chill the battery pack, keeping the cells squarely in their happy thermal window (around 20&deg;C to 30&deg;C).
                  </p>
                </div>
              </div>

              <ThermalStressSvg />

              <h2 id="cyclic-aging" className="text-2xl font-bold text-white mt-16 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-400" />
                Part 2: Cyclic Aging & The DC Fast Charging Myth
              </h2>

              <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 my-8 shadow-lg">
                <p className="text-slate-300 leading-relaxed m-0 text-sm">
                  <strong>Cyclic aging</strong> is the wear and tear caused by moving lithium ions back and forth between the cathode and anode. It is primarily driven by <strong>Depth of Discharge (DoD)</strong> and <strong>C-rate</strong> (how fast power is pushed into or pulled out of the cell). For a deeper understanding of charging speeds, check out our guide on <Link href="/blog/How-Long-to-Charge-an-Electric-Car" className="text-cyan-400 hover:underline">how long it takes to charge an electric car</Link>.
                </p>
              </div>

              <h3 id="dc-fast-charging">Does DC Fast Charging Ruin the Battery?</h3>
              
              <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-6 my-6 shadow-inner">
                <p className="text-slate-300 leading-relaxed m-0 text-sm">
                  A persistent myth is that relying on Level 3 DC fast chargers (like Tesla Superchargers or Electrify America) will quickly kill an EV battery. Recent large-scale studies, such as those by <a href="https://www.recurrentauto.com/research/impacts-of-fast-charging" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex inline-flex items-center gap-1">Recurrent Auto <ExternalLink className="w-3 h-3" /></a> which analyzed over 12,000 Teslas, proved this false.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <p className="text-emerald-300 font-medium m-0 text-sm">
                    The study found <strong>no statistically significant difference in degradation</strong> between cars that fast-charged 90% of the time and cars that fast-charged less than 10% of the time.
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-4">Why? Because the Battery Management System (BMS) steps in:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="bg-[#131B2A] border border-emerald-500/30 rounded-xl p-5 shadow-sm hover:border-emerald-500/60 transition-colors">
                  <h4 className="text-emerald-400 text-sm font-bold uppercase tracking-wider mt-0 mb-2 flex items-center gap-2">
                    <ThermometerSnowflake className="w-4 h-4" />
                    Active Cooling
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed m-0">
                    The car blasts the A/C compressor to chill the coolant loop before and during a fast charge, negating the Arrhenius thermal stress. Learn more about how EVs manage cold-weather charging in our <Link href="/preconditioning" className="text-cyan-400 hover:underline">Cold-Gate Dilemma analysis</Link>.
                  </p>
                </div>
                
                <div className="bg-[#131B2A] border border-purple-500/30 rounded-xl p-5 shadow-sm hover:border-purple-500/60 transition-colors">
                  <h4 className="text-purple-400 text-sm font-bold uppercase tracking-wider mt-0 mb-2 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    The Charging Curve Taper
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed m-0">
                    The BMS actively monitors cell voltage and restricts current as the battery fills to prevent lithium plating (where lithium piles up as metallic dendrites instead of safely intercalating).
                  </p>
                </div>
              </div>

              <h2 id="chemistry-differences" className="text-2xl font-bold text-white mt-16 mb-6 flex items-center gap-2">
                <HeartPulse className="w-6 h-6 text-cyan-400" />
                Part 3: LFP vs. NMC Chemistry Differences
              </h2>

              <p>
                Not all lithium-ion batteries degrade exactly the same way. Automakers currently use two primary cathode chemistries, and the "rules" for preserving them are entirely different.
              </p>

              <div className="my-8">
                <BatteryLifecycleTrajectorySvg />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
                {/* NMC Card */}
                <div className="bg-[#131B2A] border-2 border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-lg hover:border-slate-700 transition-colors">
                  <div className="bg-slate-800/50 p-4 border-b border-slate-700/80">
                    <h3 id="nmc-chemistry" className="text-lg font-bold text-white m-0 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      NMC / NCA
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">Nickel Manganese Cobalt / Nickel Cobalt Aluminum</p>
                  </div>
                  <div className="p-5 flex-1 flex flex-col gap-4">
                    <p className="text-sm text-slate-300 m-0">
                      Used in Long Range Teslas, the Rivian R1T, Ford Mustang Mach-E (Extended Range), and most high-performance EVs. They offer superior energy density (more range per pound).
                    </p>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mt-auto">
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">The Weakness</span>
                      <p className="text-sm text-slate-300 m-0 leading-snug">They are sensitive to high voltage stress. Letting an NMC battery sit at 100% State of Charge (SoC) for days accelerates calendar aging significantly.</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                      <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-1">The Rule</span>
                      <p className="text-sm text-slate-300 m-0 leading-snug">Set your daily charge limit to <strong>80% or 90%</strong>. Only charge to 100% right before a long road trip.</p>
                    </div>
                  </div>
                </div>

                {/* LFP Card */}
                <div className="bg-[#131B2A] border-2 border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-lg hover:border-slate-700 transition-colors">
                  <div className="bg-slate-800/50 p-4 border-b border-slate-700/80">
                    <h3 id="lfp-chemistry" className="text-lg font-bold text-white m-0 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-cyan-400" />
                      LFP
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">Lithium Iron Phosphate</p>
                  </div>
                  <div className="p-5 flex-1 flex flex-col gap-4">
                    <p className="text-sm text-slate-300 m-0">
                      Used in the standard-range Tesla Model 3/Y, Ford Mustang Mach-E (Standard Range), and many upcoming entry-level EVs. They are slightly heavier but incredibly durable.
                    </p>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 mt-auto">
                      <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-1">The Strength</span>
                      <p className="text-sm text-slate-300 m-0 leading-snug">LFP cells have a much flatter voltage curve and far higher cycle life (often 3,000+ cycles compared to NMC's ~1,500). They do not suffer from the same high-voltage stress degradation.</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                      <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-1">The Rule</span>
                      <p className="text-sm text-slate-300 m-0 leading-snug">Charge to <strong>100% at least once a week</strong>. Because the voltage curve is so flat, the BMS needs to see 100% to calibrate itself, otherwise it might miscalculate your remaining range.</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 id="best-practices" className="text-2xl font-bold text-white mt-12 mb-6">
                Conclusion: Best Practices for EV Battery Longevity
              </h2>

              <p>
                You don't need to baby your battery, but following a few simple guidelines will ensure it retains maximum capacity for over a decade:
              </p>

              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mt-6">
                <ol className="space-y-4 text-slate-300 m-0 pl-4">
                  <li><strong>A.B.C. (Always Be Plugged In):</strong> A plugged-in EV uses grid power to run battery thermal management. In extreme heat or cold, being plugged in protects the battery from thermal stress.</li>
                  <li><strong>Respect the 80% Rule (If NMC):</strong> Keep daily AC charging limited to 80%.</li>
                  <li><strong>Avoid Deep Discharges:</strong> Try not to let the car sit below 10% SoC for long periods.</li>
                </ol>
              </div>

              <div className="mt-12 p-6 bg-cyan-900/20 border border-cyan-500/30 rounded-xl text-center">
                <h3 className="text-xl font-bold text-white mt-0 mb-3">Curious about your specific vehicle's degradation?</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Use our mathematical Battery Health & Degradation Calculator to see a 10-year projected capacity loss based on your chemistry, climate, and charging habits.
                </p>
                <Link 
                  href="/battery-health" 
                  className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg transition-all"
                >
                  <Activity className="w-5 h-5" />
                  Go to Battery Health Tool
                </Link>
              </div>

            </article>

            {/* FAQ Section */}
            <section id="frequently-asked-questions" className="my-14 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-emerald-400" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-3">
                <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-5">
                  <h3 className="text-base font-bold text-white mb-2">
                    Does keeping an EV battery at 100% ruin it?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    It depends on the battery chemistry. If your vehicle uses an <strong>NMC</strong> (Nickel Manganese Cobalt) battery, leaving it at 100% for extended periods accelerates calendar aging and capacity loss due to high voltage stress. If it has an <strong>LFP</strong> (Lithium Iron Phosphate) battery, charging to 100% is safe and actually recommended by manufacturers (like Tesla for standard-range models) to help the Battery Management System calibrate.
                  </p>
                </div>
                
                <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-5">
                  <h3 className="text-base font-bold text-white mb-2">
                    Why does battery degradation happen fastest in the first year?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    The steepest drop in capacity usually occurs in the first 12 to 18 months because the liquid electrolyte is actively reacting with the graphite anode to form the protective Solid Electrolyte Interphase (SEI) layer. This chemical reaction permanently consumes a small amount of active lithium ions. Once the SEI layer is fully established, the degradation rate slows significantly into a long, flat plateau.
                  </p>
                </div>
                
                <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-5">
                  <h3 className="text-base font-bold text-white mb-2">
                    Is it better to charge an EV every day or wait until it's low?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    It is generally better to charge your EV every day. Small, shallow charging cycles (e.g., going from 60% to 80% daily) cause significantly less mechanical wear and tear on the lithium-ion cell structures than deep charging cycles (e.g., driving down to 10% and charging to 90%). This is known as reducing the Depth of Discharge (DoD) stress.
                  </p>
                </div>
              </div>
            </section>

            {/* Article Ranking Tags & Related Topics Box */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Article Tags &amp; Related Engineering Research
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                These technical topic tags categorize this analysis for search engine ranking, telemetry modeling, and related electric vehicle engineering resources across EVChargeCurve:
              </p>
              <div className="flex flex-wrap gap-2">
                {ARTICLE_TAGS.map((tag) => (
                  <Link
                    key={tag}
                    href="/blog"
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#0B0F17] hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 transition-all font-mono"
                  >
                    #{tag.replace(/\s+/g, '')}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Bio & E-E-A-T Card */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-12">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-slate-950 font-bold text-xl shrink-0 shadow-md">
                ER
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">EV Charge Curve Editorial Team</span>
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px] font-semibold uppercase">
                    Electrochemistry Lead
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  The EV Charge Curve editorial team specializes in translating complex lithium-ion thermal behavior, charging curves, and electrical infrastructure into accessible engineering guides.
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
