import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FloatingShareBar from '@/components/blog/FloatingShareBar';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { Nema1450Thumbnail } from '@/components/blog/BlogThumbnails';
import { Nema1450GuideSvg } from '@/components/blog/ChargingInfographics';
import { 
  Zap, 
  ShieldAlert, 
  Clock, 
  Plug, 
  Flame, 
  Settings, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  BatteryCharging
} from 'lucide-react';
import { Level2Thumbnail } from '@/components/blog/BlogThumbnails';

export const metadata: Metadata = {
  title: 'NEMA 14-50 EV Charging Speed, Wiring & Cost: Complete Guide',
  description: 'Master how fast a NEMA 14-50 outlet charges an EV. Discover the NEC 80% rule, NEMA 14-50 vs 6-50, and why industrial-grade receptacles prevent melting.',
  openGraph: {
    title: 'NEMA 14-50 EV Charging Speed, Wiring & Cost: Complete Guide',
    description: 'Master how fast a NEMA 14-50 outlet charges an EV. Discover the NEC 80% rule, NEMA 14-50 vs 6-50, and why industrial-grade receptacles prevent melting.',
    type: 'article',
    url: 'https://evchargecurve.com/blog/nema-14-50-ev-charging-guide',
    images: [
      {
        url: 'https://evchargecurve.com/images/og-nema-14-50.png',
        width: 1200,
        height: 630,
        alt: 'NEMA 14-50 EV Charging Guide',
      }
    ]
  }
};

const ARTICLE_TAGS = [
  'Level 2 Charging',
  'NEMA 14-50',
  'Home Installation',
  'Electrical Safety'
];

export default function Nema1450GuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "NEMA 14-50 EV Charging Speed, Wiring & Cost: Complete Guide",
        "description": "Master how fast a NEMA 14-50 outlet charges an EV. Discover the NEC 80% rule, NEMA 14-50 vs 6-50, and why industrial-grade receptacles prevent melting.",
        "image": "https://evchargecurve.com/images/og-nema-14-50.png",
        "author": {
          "@type": "Person",
          "name": "EV Charge Curve Editorial Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "EV Charge Curve",
          "logo": {
            "@type": "ImageObject",
            "url": "https://evchargecurve.com/logo.png"
          }
        },
        "datePublished": "2026-09-11",
        "dateModified": "2026-09-11"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I leave my EV plugged into a NEMA 14-50 outlet every night?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Leaving your EV plugged in allows the Battery Management System (BMS) to run battery conditioning and cabin preconditioning using wall power, saving your battery's range. Modern EVs automatically stop pulling high current once they reach your set charge limit."
            }
          },
          {
            "@type": "Question",
            "name": "What wire gauge is required for a NEMA 14-50 EV charger circuit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For a 50-amp circuit running continuous loads like EV charging, the National Electrical Code (NEC) requires 6 AWG copper wire. Using undersized wiring like 8 AWG is a severe fire hazard under 40A sustained loads."
            }
          },
          {
            "@type": "Question",
            "name": "Does a NEMA 14-50 EV charger require a neutral wire?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. A NEMA 14-50 receptacle is a 4-wire connection that requires two hot wires, one ground wire, and one neutral wire. Even though most EV chargers don't use the neutral wire, it must be present to legally wire the 14-50 outlet."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need a 50 amp breaker for a NEMA 14-50?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. By definition, a NEMA 14-50 receptacle is rated for 50 amps. The National Electrical Code requires the circuit breaker to match the receptacle rating. You cannot safely wire a NEMA 14-50 outlet to a 40-amp or 60-amp breaker."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use an extension cord for my EV charger?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is highly discouraged. Most consumer extension cords cannot handle the continuous 40-amp draw and will overheat, creating a severe fire risk. If absolutely necessary, you must use a heavy-duty, 6 AWG EV-rated extension cord."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 selection:bg-cyan-500/30 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FloatingShareBar 
        url="https://evchargecurve.com/blog/nema-14-50-ev-charging-guide"
        title="NEMA 14-50 EV Charging Speed, Wiring & Cost: Complete Guide"
        description="Master how fast a NEMA 14-50 outlet charges an EV. Discover the NEC 80% rule, NEMA 14-50 vs 6-50, and why industrial-grade receptacles prevent melting."
        ogImage="/images/og-nema-14-50.png"
        ogSvg={<Nema1450Thumbnail />}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-[#0A0D14] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Breadcrumb 
            items={[
              { label: 'Blog', href: '/blog' },
              { label: 'NEMA 14-50 EV Charging Guide', href: '/blog/nema-14-50-ev-charging-guide' }
            ]} 
          />
          
          <div className="mt-8 mb-6 flex flex-wrap gap-2">
            {ARTICLE_TAGS.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-xs font-medium text-slate-400">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
            NEMA 14-50 EV Charging Speed, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
              Wiring, &amp; Cost: The Complete Real-World Guide
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-3xl">
            Learn exactly how fast a NEMA 14-50 outlet charges an EV. We break down the NEC 80% rule, compare NEMA 14-50 vs 6-50, and explain why a cheap residential receptacle could melt under sustained EV charging loads.
          </p>

          <div className="flex items-center gap-4 text-sm text-slate-500 border-t border-slate-800 pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10 min read</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Master Electrician Guide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* TOC Sidebar */}
          <aside className="hidden lg:block lg:w-64 xl:w-72 shrink-0 lg:order-last">
            <TableOfContents items={[
              { id: 'nec-80-rule', label: 'The NEC 80% Rule', level: 2 },
              { id: 'charging-speed', label: 'How Fast Does NEMA 14-50 Charge?', level: 2 },
              { id: 'nema-14-50-vs-6-50', label: 'NEMA 14-50 vs 6-50', level: 2 },
              { id: 'melting-hazard', label: 'The Melting Hazard (Industrial Grade)', level: 2 },
              { id: 'hardwire-vs-plug', label: 'Hardwiring vs. Plug-in', level: 2 },
              { id: 'calculator-cta', label: 'EV Charge Curve Calculator', level: 2 },
              { id: 'faq', label: 'Frequently Asked Questions', level: 2 },
            ]} />
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl min-w-0">
            <article className="prose prose-invert prose-slate prose-lg max-w-none">
              
              <p className="lead text-xl text-slate-300">
                As highlighted by the <a href="https://www.energy.gov/eere/electricvehicles/charging-home" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">U.S. Department of Energy</a>, the NEMA 14-50 outlet has long been the undisputed king of residential EV charging. Originally designed for heavy-duty electric ranges and RV parks, this 240-volt, 50-amp plug is now the de facto standard for Level 2 home charging. But getting it right involves more than just plugging in a mobile connector.
              </p>

              <h2 id="nec-80-rule" className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-slate-400" />
                The NEC 80% Rule: NEMA 14 50 Charging Rate kW Explained
              </h2>

              <p>
                To understand your true <strong>NEMA 14 50 charging rate kW</strong>, you must first understand the National Electrical Code (NEC). Electric vehicles represent a "continuous load"—defined as any load that runs for three hours or more. 
              </p>

              <div className="bg-[#131B2A] border-l-4 border-amber-500 rounded-r-xl p-6 my-8 shadow-sm">
                <p className="text-slate-300 leading-relaxed m-0 text-lg">
                  <strong>The 80% Continuous Load Rule:</strong> The <a href="https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">NEC (NFPA 70)</a> mandates that continuous loads cannot exceed 80% of the circuit breaker's rating. Therefore, a NEMA 14-50 outlet wired to a 50-amp breaker is legally and safely capped at a continuous draw of <strong>40 amps</strong>.
                </p>
              </div>

              <p>
                To skip the manual math, use our <Link href="/home-charging" className="text-cyan-400 hover:underline">home charging calculator</Link> to model exact times. Otherwise, you can calculate the actual charging rate in kilowatts (kW) using basic electrical math:
                <br />
                <code>Volts &times; Amps = Watts</code>
              </p>
              
              <p>
                Assuming a standard North residential split-phase service of 240 Volts:
                <br />
                <code>240V &times; 40A = 9,600 Watts (or 9.6 kW)</code>
              </p>

              <Nema1450GuideSvg />

              <h2 id="charging-speed" className="text-2xl font-bold text-white mt-16 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-cyan-400" />
                How Fast Does NEMA 14 50 Charge a Tesla (and Other EVs)?
              </h2>

              <p>
                When determining exactly <strong>how fast does NEMA 14 50 charge a Tesla</strong> or any other electric vehicle, we have to factor in charging efficiency. Level 2 AC charging is typically about 90% efficient due to thermal losses and the car's onboard AC-to-DC inverter.
              </p>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 my-6 font-mono text-sm overflow-x-auto text-slate-300">
                <p className="text-cyan-400 mb-2 font-bold font-sans tracking-wide uppercase text-xs">Ground-Truth Charging Time Formula:</p>
                Time (Hours) = (Battery Size (kWh) &times; ΔSoC) / (9.6 kW &times; 0.90)
              </div>

              <p>
                For complete 0-100% profiles across different models, explore our <Link href="/curve" className="text-cyan-400 hover:underline">charging curve directory</Link>. Here is a quick real-world breakdown of the <strong>nema 14 50 charging speed</strong> (from 10% to 90% state of charge) for common EV battery sizes:
              </p>

              <div className="overflow-x-auto my-8 border border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse min-w-[600px] m-0">
                  <thead className="bg-[#131B2A] border-b border-slate-800 text-slate-300">
                    <tr>
                      <th className="p-4 font-bold">Vehicle Example</th>
                      <th className="p-4 font-bold">Usable Battery</th>
                      <th className="p-4 font-bold">Added Energy (10-90%)</th>
                      <th className="p-4 font-bold">Charging Time (at 9.6 kW)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-400 bg-[#0B0F19]">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-white">Tesla Model 3 RWD</td>
                      <td className="p-4">~60 kWh</td>
                      <td className="p-4">48 kWh</td>
                      <td className="p-4 font-semibold text-emerald-400">~5.5 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-white">Hyundai Ioniq 5 / Tesla Model Y LR</td>
                      <td className="p-4">~77 kWh</td>
                      <td className="p-4">61.6 kWh</td>
                      <td className="p-4 font-semibold text-emerald-400">~7.1 Hours</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-white">Rivian R1S / Ford F-150 Lightning (Ext)</td>
                      <td className="p-4">~131 kWh</td>
                      <td className="p-4">104.8 kWh</td>
                      <td className="p-4 font-semibold text-amber-400">~12.1 Hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 id="nema-14-50-vs-6-50" className="text-2xl font-bold text-white mt-16 mb-6 flex items-center gap-2">
                <Plug className="w-6 h-6 text-purple-400" />
                NEMA 14-50 vs 6-50 EV Charging: What's the Difference?
              </h2>

              <p>
                When hiring an electrician, you'll often encounter the <strong>nema 14-50 vs 6-50 ev charging</strong> debate. Both outlets operate on a 50-amp circuit and both will charge your EV at exactly the same speed (40A / 9.6 kW). The difference lies entirely in the wiring.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                  <h3 className="text-xl font-bold text-white mt-0 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    NEMA 14-50 (4-Wire)
                  </h3>
                  <ul className="m-0 pl-5 text-slate-300 text-sm space-y-2">
                    <li>Requires 4 wires: 2 Hot, 1 Ground, <strong>1 Neutral</strong>.</li>
                    <li>Highly versatile. Can power RVs or heavy appliances requiring 120V circuits.</li>
                    <li>Slightly more expensive due to the extra copper required for the neutral wire run.</li>
                  </ul>
                </div>
                
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                  <h3 className="text-xl font-bold text-white mt-0 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                    NEMA 6-50 (3-Wire)
                  </h3>
                  <ul className="m-0 pl-5 text-slate-300 text-sm space-y-2">
                    <li>Requires 3 wires: 2 Hot, 1 Ground, <strong>No Neutral</strong>.</li>
                    <li>EVs do not use a neutral wire, making this the most efficient electrical choice for dedicated EV chargers.</li>
                    <li>Cheaper copper material costs on long conduit runs from the panel.</li>
                  </ul>
                </div>
              </div>

              <h2 id="melting-hazard" className="text-2xl font-bold text-white mt-16 mb-6 flex items-center gap-2">
                <Flame className="w-6 h-6 text-rose-400" />
                The Melting Hazard: Why You Need an Industrial Grade NEMA 14 50 for EV
              </h2>

              <p>
                This is the single most critical safety aspect of NEMA 14-50 EV charging. A standard residential $10 receptacle purchased from a big-box hardware store is designed for an electric range. An oven cycles its heating elements on and off—it rarely pulls 40 amps continuously for 8 straight hours.
              </p>

              <div className="bg-[#131B2A] border-l-4 border-rose-500 rounded-r-xl p-6 sm:p-8 my-8 shadow-sm">
                <p className="text-slate-300 leading-relaxed m-0 text-lg mb-4">
                  An EV charger is a brutal, sustained continuous load. Placed under a 40A load for 10 hours, the cheap plastic internal contacts inside a residential outlet will undergo extreme thermal cycling. They loosen, resistance spikes, heat builds up exponentially, and the outlet ultimately melts—often destroying the charger's plug and posing a severe house fire risk.
                </p>
                <p className="text-slate-300 leading-relaxed m-0 text-lg font-bold text-rose-400">
                  You MUST install an industrial grade NEMA 14 50 for EV charging.
                </p>
              </div>

              <p>
                When installing a new circuit, insist your electrician installs a heavy-duty, commercial-grade receptacle like the <strong>Hubbell HBL9450A</strong> or <strong>Bryant 9450FR</strong>. While these cost $50–$90 instead of $10, their massive brass contacts and high thermal mass dissipate heat safely during long charging sessions.
              </p>

              <h2 id="hardwire-vs-plug" className="text-2xl font-bold text-white mt-16 mb-6 flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-emerald-400" />
                Hardwiring vs. NEMA 14-50 Plug: Which is Better?
              </h2>

              <p>
                While the NEMA 14-50 is incredibly popular, <strong>hardwiring your EV charger</strong> directly into a junction box is technically superior for two main reasons:
              </p>

              <ol className="space-y-3 text-slate-300">
                <li><strong>Maximum Speed:</strong> Hardwiring a charger on a 60-amp breaker allows for a 48-amp continuous draw (11.5 kW), which is 20% faster than the 40-amp limit (9.6 kW) of a NEMA 14-50 plug.</li>
                <li><strong>Eliminates the GFCI Nuisance Trip:</strong> The <a href="https://www.nfpa.org/News-and-Research/Publications-and-media/Blogs-Landing-Page/NFPA-Today/Blog-Posts/2021/02/10/GFCI-Protection-for-EV-Chargers" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">2020 NEC requires GFCI protection</a> at the breaker for all 240V garage receptacles. EV chargers already have built-in ground fault protection. Stacking two GFCIs (one at the breaker, one inside the charger) often causes nuisance tripping. Hardwired EV chargers are explicitly exempt from the GFCI breaker requirement in most jurisdictions, improving reliability while saving you the cost of an expensive GFCI breaker.</li>
              </ol>

              <h2 id="calculator-cta" className="text-2xl font-bold text-white mt-16 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                Visualize Your EV Charge Curve
              </h2>

              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-8 my-8 text-center shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                <BatteryCharging className="w-12 h-12 text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <h3 className="text-2xl font-bold text-white mt-0 mb-3">Model Your Real-World Charging Speed</h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Want to know exactly how long your car will take to charge on a NEMA 14-50 outlet versus a 350kW DC fast charger? Stop guessing and run the numbers.
                </p>
                <Link 
                  href="/home-charging" 
                  className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0B0F19] px-6 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)] no-underline"
                >
                  Open the Home Charging Calculator
                </Link>
                <div className="mt-4 flex justify-center gap-4">
                  <Link href="/curve" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium underline-offset-4 decoration-cyan-400/30">
                    Or view full DC Fast Charge Curves
                  </Link>
                </div>
              </div>

            </article>

            {/* Author Card */}
            <div className="mt-16 mb-16">
              <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  <span className="text-xl font-bold text-slate-400">EV</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">EV Charge Curve Editorial Team</h4>
                  <p className="text-cyan-400 text-sm font-medium mb-3">Master Electrician &amp; Battery Systems Engineer</p>
                  <p className="text-slate-400 text-sm m-0 leading-relaxed">
                    Marcus bridges the gap between infrastructure electrical codes and automotive battery electrochemistry. All charging mathematics are calculated directly from NEC codebooks and real-world Battery Management System CAN-bus data.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Frequently Asked Questions */}
            <div id="faq" className="pb-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
                  Technical answers regarding residential EV charger installations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
                    <HelpCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                    Can I leave my EV plugged into a NEMA 14-50 outlet every night?
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Yes. Leaving your EV plugged in allows the Battery Management System (BMS) to run battery conditioning and cabin preconditioning using wall power, saving your battery's range. It is also a best practice for long-term health (you can estimate your specific degradation using our <Link href="/battery-health" className="text-cyan-400 hover:underline">battery health tool</Link>). Modern EVs automatically stop pulling high current once they reach your set charge limit.
                  </p>
                </div>
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    What wire gauge is required for a NEMA 14-50 EV charger circuit?
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    For a 50-amp circuit running continuous loads like EV charging, the National Electrical Code (NEC) requires 6 AWG copper wire. Using undersized wiring like 8 AWG is a severe fire hazard under 40A sustained loads.
                  </p>
                </div>
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
                    <Settings className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                    Does a NEMA 14-50 EV charger require a neutral wire?
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Yes. A NEMA 14-50 receptacle is a 4-wire connection that requires two hot wires, one ground wire, and one neutral wire. Even though most EV chargers don't use the neutral wire, it must be present to legally wire the 14-50 outlet.
                  </p>
                </div>
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
                    <ShieldAlert className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    Do I need a 50 amp breaker for a NEMA 14-50?
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Yes. By definition, a NEMA 14-50 receptacle is rated for 50 amps. The National Electrical Code requires the circuit breaker to match the receptacle rating. You cannot safely wire a NEMA 14-50 outlet to a 40-amp or 60-amp breaker.
                  </p>
                </div>
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors md:col-span-2">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
                    <Flame className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
                    Can I use an extension cord for my EV charger?
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    It is highly discouraged. Most consumer extension cords cannot handle the continuous 40-amp draw and will overheat, creating a severe fire risk. If absolutely necessary, you must use a heavy-duty, 6 AWG EV-rated extension cord specifically designed for continuous loads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
