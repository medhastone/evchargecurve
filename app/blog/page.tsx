import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  Clock, 
  BatteryCharging, 
  Zap, 
  ArrowRight, 
  Calendar, 
  Tag, 
  Sparkles, 
  ShieldCheck, 
  Gauge, 
  ThermometerSnowflake,
  Cpu
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Battery & Charging Engineering Blog | EVChargeCurve',
  description: 'Deep-dive technical guides, battery electrochemistry analysis, DC fast-charging curve physics, winter range degradation, and home electrical sizing.',
  keywords: [
    'ev charging blog',
    'electric vehicle engineering articles',
    'how long to charge electric car',
    'ev charge curves explained',
    'dc fast charging taper',
    'ev battery degradation science',
    'cold gate charging'
  ],
  openGraph: {
    title: 'EV Battery & Charging Engineering Blog | EVChargeCurve',
    description: 'Deep-dive technical guides on EV charging curves, battery electrochemistry, thermal preconditioning, and home charging economics.',
    type: 'website',
    url: 'https://evchargecurve.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Battery & Charging Engineering Blog | EVChargeCurve',
    description: 'Authoritative technical articles on electric vehicle charging physics, real-world charging speeds, and battery lifespan optimization.',
  }
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  category: string;
  tags: string[];
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-long-to-charge-an-electric-car',
    title: 'How Long Does It Take to Charge an Electric Car? (The Real-World Truth & Charging Curves)',
    slug: '/blog/How-Long-to-Charge-an-Electric-Car',
    excerpt: 'An authoritative mathematical and electrochemical breakdown of Level 1, Level 2, and Level 3 DC fast charging. Discover why charging curves taper above 80%, how to calculate your session duration, and how cold weather impacts power delivery.',
    date: 'September 2026',
    readTime: '8 min read',
    author: {
      name: 'Dr. Marcus Vance, PhD',
      role: 'Battery Systems Engineer'
    },
    category: 'Charging Guides',
    tags: [
      'EV Charging Speeds',
      'Charging Curves',
      'DC Fast Charging',
      'Home Charging',
      'Battery Taper',
      'Cold-Gate'
    ],
    featured: true
  },
  {
    id: 'battery-degradation-mechanisms',
    title: 'Lithium-Ion Battery Degradation: Calendar Aging vs. Cyclic DC Fast-Charging Stress',
    slug: '/battery-health',
    excerpt: 'Explore the solid electrolyte interphase (SEI) growth, transition metal dissolution, and mechanical cracking caused by repeated high-C-rate fast charging versus time at elevated ambient temperatures.',
    date: 'August 2026',
    readTime: '11 min read',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Electrochemistry Lead'
    },
    category: 'Battery Science',
    tags: [
      'Battery Health',
      'Degradation',
      'SEI Layer',
      'C-Rate'
    ]
  },
  {
    id: 'cold-weather-charging-preconditioning',
    title: 'The Cold-Gate Dilemma: Why EVs Charge at One-Third Speed in Sub-Freezing Weather',
    slug: '/preconditioning',
    excerpt: 'Why cold electrolyte viscosity causes severe charging throttling and how automated thermal preconditioning uses 4–7 kW of heat energy to safeguard your pack from irreversible lithium plating.',
    date: 'July 2026',
    readTime: '9 min read',
    author: {
      name: 'Marcus Vance, PhD',
      role: 'Battery Systems Engineer'
    },
    category: 'Winter Engineering',
    tags: [
      'Cold-Gate',
      'Preconditioning',
      'Thermal Management',
      'Winter Range'
    ]
  },
  {
    id: 'level-2-breaker-sizing-economics',
    title: 'Residential Level 2 Charging: 32A vs. 40A vs. 48A Continuous Load Breaker Sizing',
    slug: '/panel-capacity',
    excerpt: 'Understanding National Electrical Code (NEC) 80% continuous duty guidelines, NEMA 14-50 receptacles versus hardwired wallboxes, and panel capacity calculations.',
    date: 'June 2026',
    readTime: '7 min read',
    author: {
      name: 'David Chen, PE',
      role: 'Master Electrician & Infrastructure Consultant'
    },
    category: 'Home Charging',
    tags: [
      'Level 2 Charging',
      'Panel Capacity',
      'NEC 80% Rule',
      'Home Electrical'
    ]
  }
];

const ALL_TAGS = [
  'All',
  'EV Charging Speeds',
  'Charging Curves',
  'DC Fast Charging',
  'Home Charging',
  'Battery Taper',
  'Cold-Gate',
  'Battery Health',
  'Preconditioning',
  'Level 2 Charging'
];

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter(post => post.id !== featuredPost.id);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'EVChargeCurve Engineering Blog',
    'url': 'https://evchargecurve.com/blog',
    'description': 'Engineering guides on electric vehicle charging curves, battery electrochemistry, thermal management, and home energy sizing.',
    'publisher': {
      '@type': 'Organization',
      'name': 'EVChargeCurve',
      'url': 'https://evchargecurve.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://evchargecurve.com/logo.png'
      }
    },
    'blogPost': BLOG_POSTS.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.excerpt,
      'url': `https://evchargecurve.com${post.slug}`,
      'datePublished': '2026-09-01T00:00:00Z',
      'author': {
        '@type': 'Person',
        'name': post.author.name
      },
      'keywords': post.tags.join(', ')
    }))
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 pb-20">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Hero Header */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-[#0F172A]/80 to-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Breadcrumb 
            className="justify-start mb-6"
            items={[
              { label: 'Blog' }
            ]} 
          />

          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                EV Battery &amp; Telemetry Knowledgebase
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                EV Engineering <span className="text-emerald-400">Blog</span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                Physics-first analysis of EV charging curves, DC fast-charging taper rates, 
                cold-weather throttling, and residential electrical sizing.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 bg-[#131B2A] border border-slate-800 px-3 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Peer-reviewed telemetry &amp; real-world data
              </span>
            </div>
          </div>

          {/* Quick Tag Pills Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-slate-800/60">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mr-2">
              <Tag className="w-3.5 h-3.5 text-emerald-400" />
              Popular Topics:
            </span>
            {ALL_TAGS.map((tag, idx) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1 rounded-lg border font-medium transition-all ${
                  idx === 0 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                    : 'bg-[#131B2A] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Featured Flagship Article Hero Card */}
        <section aria-labelledby="featured-post-heading">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 id="featured-post-heading" className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              Featured Flagship Guide
            </h2>
          </div>

          <div className="group relative rounded-3xl bg-[#131B2A] border-2 border-emerald-500/30 hover:border-emerald-500/50 p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300 hover:shadow-emerald-500/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Post Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                </div>

                <Link href={featuredPost.slug} className="block group-hover:text-emerald-300 transition-colors">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                    {featuredPost.title}
                  </h3>
                </Link>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredPost.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#0B0F17] text-emerald-400/90 border border-slate-800"
                    >
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>

                {/* Author & CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-sm">
                      MV
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{featuredPost.author.name}</p>
                      <p className="text-xs text-slate-400">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <Link 
                    href={featuredPost.slug}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg hover:shadow-emerald-500/20"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Preview Card */}
              <div className="lg:col-span-5 bg-[#0B0F17] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                    <span className="font-mono text-emerald-400 font-bold">INCLUDED TECHNICAL SVG DIAGRAMS</span>
                    <span>4 Interactive Figures</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#131B2A] border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300 font-medium">Figure 1: Charging Speed Tier Comparison</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Level 1 vs 2 vs 3</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#131B2A] border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300 font-medium">Figure 2: EV Charge Curve &amp; 80% Taper Cliff</span>
                      <span className="text-purple-400 font-mono text-[11px]">kW vs. SoC %</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#131B2A] border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300 font-medium">Figure 3: Thermal Cold-Gate Throttling Curve</span>
                      <span className="text-cyan-400 font-mono text-[11px]">32&deg;F vs 77&deg;F</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#131B2A] border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300 font-medium">Figure 4: Level 2 Breaker &amp; 80% Continuous Rule</span>
                      <span className="text-amber-400 font-mono text-[11px]">32A / 40A / 48A</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold block mb-1">Key Takeaway</span>
                  &ldquo;A standard 60 kWh EV charges in ~4.5 hours on Level 2 AC, but under 20 minutes from 20% to 80% on high-power 800V DC hardware.&rdquo;
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* More Articles Section */}
        <section aria-labelledby="all-articles-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 id="all-articles-heading" className="text-2xl font-bold text-white">
                Technical Analysis &amp; Diagnostic Articles
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore engineering deep-dives covering battery health, cold-gate physics, and home infrastructure.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono bg-[#131B2A] px-3 py-1.5 rounded-lg border border-slate-800 w-max">
              Showing {BLOG_POSTS.length} Guides
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article 
                key={post.id}
                className="rounded-2xl bg-[#131B2A] border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between transition-all hover:-translate-y-1 duration-200 group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {post.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={post.slug} className="block group-hover:text-emerald-400 transition-colors">
                    <h3 className="text-lg font-bold text-white line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0F17] text-slate-400 border border-slate-800">
                        #{tag.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-300 font-medium block">{post.author.name}</span>
                    <span className="text-slate-400 text-[11px]">{post.date}</span>
                  </div>
                  <Link 
                    href={post.slug} 
                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Simulator Call-To-Action Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#131B2A] to-[#0B0F17] border border-emerald-500/30 p-8 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20">
            <Zap className="w-3.5 h-3.5" />
            Accurate Real-Time Telemetry
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white max-w-2xl mx-auto">
            Ready to simulate charging times for your specific EV model?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Run realistic DC fast charge curve simulations, calculate cold-weather battery penalties, and forecast exact road-trip session costs in seconds.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg hover:shadow-emerald-500/20"
            >
              <span>Explore Interactive DC Fast Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
