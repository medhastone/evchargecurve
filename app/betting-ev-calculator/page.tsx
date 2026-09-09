import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import EVBettingCalculator from '@/components/EVBettingCalculator';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  Calculator, 
  TrendingUp, 
  Scale, 
  ShieldCheck, 
  HelpCircle, 
  Award, 
  AlertOctagon,
  Percent,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sports Betting EV Calculator: Free +EV & No-Vig Engine',
  description: 'Calculate sports betting expected value (+EV), strip bookmaker vig, and calculate Kelly Criterion stakes with our free, real-time betting EV calculator.',
  keywords: [
    'sports betting ev calculator',
    'expected value calculator betting',
    'positive ev calculator',
    '+ev calculator sports betting',
    'how to calculate expected value sports betting',
    'no vig fair odds calculator',
    'kelly criterion betting calculator',
    'expected value formula sports betting',
    'find profitable betting edges'
  ],
  alternates: {
    canonical: 'https://evchargecurve.com/betting-ev-calculator',
  },
  openGraph: {
    title: 'Sports Betting EV Calculator: Free +EV & No-Vig Engine',
    description: 'Calculate sports betting expected value (+EV), strip bookmaker vig, and calculate Kelly Criterion stakes with our free, real-time betting EV calculator.',
    url: 'https://evchargecurve.com/betting-ev-calculator',
    type: 'website',
  },
};

const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Expected Value (EV) Sports Betting Calculator',
    url: 'https://evchargecurve.com/betting-ev-calculator',
    description: 'Zero-latency mathematical betting calculator providing real-time expected value (+EV), market de-vigging, and Kelly Criterion bankroll sizing.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    featureList: [
      'Bidirectional Odds Conversion (American, Decimal, Fractional)',
      'Automated Two-Way Market De-Vigging',
      'Expected Value Net Dollar & Percentage Yield',
      'Full, Half, Quarter, and Eighth Kelly Criterion Bankroll Allocations',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Expected Value in Sports Betting',
    description: 'Step-by-step mathematical guide to finding positive expected value (+EV) betting opportunities using sharp market de-vigging.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Locate Offered Retail Odds',
        text: 'Identify a retail bookmaker odds listing on an event, e.g., Kansas City Chiefs at +125 moneyline.',
      },
      {
        '@type': 'HowToStep',
        name: 'Check Sharp Market Benchmark',
        text: 'Examine the two-way market for the same match at a sharp sportsbook such as Pinnacle (+105 / -125).',
      },
      {
        '@type': 'HowToStep',
        name: 'Remove the Bookmaker Vig',
        text: 'Calculate implied probabilities and normalize by dividing individual probability by total market probability to establish true win probability.',
      },
      {
        '@type': 'HowToStep',
        name: 'Execute Expected Value Equation',
        text: 'Multiply true probability by net profit and subtract loss probability multiplied by stake to determine net EV.',
      },
      {
        '@type': 'HowToStep',
        name: 'Size Bet Using Kelly Criterion',
        text: 'Apply fractional Kelly staking (typically Half Kelly 0.5x) to allocate bankroll capital safely.',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a good EV percentage in sports betting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A sustainable expected value edge on straight wagers (spreads, totals, moneylines) typically ranges between +1.5% and +4.5%. On exotic player proposition markets, edges can reach +6.0% to +12.0% due to lower market liquidity. Consistent execution of +3% EV bets over thousands of iterations produces exceptional risk-adjusted annual portfolio returns.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you lose money betting with positive expected value (+EV)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, in the short term. Expected value is a long-term mathematical expectation governed by the Law of Large Numbers. Over a small sample of 50 to 200 bets, natural distribution variance can cause substantial drawdowns. However, across a sample size exceeding 2,000 wagers, actual returns mathematically converge toward your theoretical EV line.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does bookmaker juice affect expected value?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sportsbooks do not offer fair odds; they price both sides of a market with built-in vigorish (typically 4.5% to 8%). A sports betting ev calculator strips this margin to verify whether a promotional boost or off-market price exceeds the break-even threshold.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between EV betting and Arbitrage betting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Arbitrage betting involves placing simultaneous wagers on all outcomes across different sportsbooks to lock in a risk-free profit regardless of the winner. EV betting wagers only on the mispriced, high-value side of the market. While arbitrage eliminates variance, EV betting produces significantly higher long-term capital compounding and is less prone to account restrictions.',
        },
      },
    ],
  },
];

export default function BettingEVCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#0B0F17] text-slate-100 selection:bg-emerald-500/30">
      {/* Schema Injection */}
      <script
        id="structured-data-betting-ev"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMAS) }}
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 md:pt-14 md:pb-10 text-center relative">
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none" 
          aria-hidden="true"
        />

        {/* Visual Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Sports Betting EV Calculator' }]} />

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Calculator className="w-3.5 h-3.5" />
          <span>Quantitative Market-Making &amp; Kelly Sizing Engine</span>
        </div>

        {/* SEO Optimized H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-5xl mx-auto mb-6">
          Sports Betting EV Calculator <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400">
            &amp; No-Vig Fair Odds Sizer
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Quantify your mathematical edge against retail sportsbooks. Strip bookmaker juice from sharp market benchmarks, compute exact expected value (+EV), and calculate optimal fractional Kelly Criterion bankroll allocations in real time.
        </p>

        {/* Quick Value Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 text-center">
          <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 uppercase font-semibold block">De-Vig Algorithms</span>
            <span className="text-sm font-bold text-emerald-400">Shin, Power &amp; Multi</span>
          </div>
          <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 uppercase font-semibold block">Risk Management</span>
            <span className="text-sm font-bold text-cyan-400">Half-Kelly (0.5x) Default</span>
          </div>
          <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 uppercase font-semibold block">Supported Formats</span>
            <span className="text-sm font-bold text-blue-400">American / Dec / Frac</span>
          </div>
          <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 uppercase font-semibold block">Latency</span>
            <span className="text-sm font-bold text-amber-400">Zero (Client-Side Math)</span>
          </div>
        </div>

        {/* The Interactive Calculator Component */}
        <div className="relative z-10 text-left">
          <EVBettingCalculator />
        </div>
      </section>

      {/* Deep-Dive Educational & SEO Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Section 1: Step-by-Step Practical Betting Example */}
        <section className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">
              Practical Application
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How the EV Calculator Works: Step-by-Step Practical Betting Example
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Finding sustainable profit in modern sports wagering requires treating betting as an asset pricing discipline. To understand <strong>how to calculate expected value sports betting</strong>, consider an actual NFL moneyline pricing discrepancy between a sharp market-making sportsbook and a soft recreational bookmaker.
          </p>

          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Scenario: Buffalo Bills vs. Kansas City Chiefs Moneyline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-[#131B2A] p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
                  1. Soft Retail Bookmaker (DraftKings / FanDuel)
                </span>
                <p className="text-slate-300">
                  Offered price on <strong>Kansas City Chiefs at +125</strong> (Decimal: <code className="text-emerald-400">2.25</code>).
                  <br />
                  Raw Implied Probability: <code className="text-blue-400">100 / (125 + 100) = 44.44%</code>
                </p>
              </div>

              <div className="bg-[#131B2A] p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
                  2. Sharp Benchmark Market (Pinnacle / Circa)
                </span>
                <p className="text-slate-300">
                  Two-way market price: Chiefs <code className="text-emerald-400">+105</code> (Implied: 48.78%) vs. Bills <code className="text-rose-400">-115</code> (Implied: 53.49%).
                  <br />
                  Total Bookmaker Overround: <code className="text-amber-400">102.27% (2.27% Vig)</code>
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Step 1: Removing the Juice (Multiplicative Normalization):</strong>
                  <br />
                  <code className="text-emerald-400">True Win Probability = 48.78% / 102.27% = 47.70%</code>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Step 2: Determining Fair No-Vig Odds:</strong>
                  <br />
                  <code className="text-cyan-400">Fair Decimal Odds = 1 / 0.4770 = 2.096 → Fair American Odds = +110</code>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Step 3: Calculating Net Expected Value ($EV on $100 Stake):</strong>
                  <br />
                  <code className="text-amber-400">EV = (0.4770 × $125 Profit) - (0.5230 Loss × $100 Stake) = $59.63 - $52.30 = +$7.33</code>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Step 4: Percentage Yield (EV% Edge):</strong>
                  <br />
                  <code className="text-emerald-400">EV% = ($7.33 / $100) × 100 = +7.33% Positive Edge</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Mathematical Foundation */}
        <section className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1">
              Formal Mathematics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The Mathematics Behind Expected Value (+EV)
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Expected value is the foundational theorem of probability describing the long-term average outcome of a random variable across thousands of iterations. In wagering mathematics, the <strong>expected value formula sports betting</strong> separates amateur gamblers from professional syndicates:
          </p>

          <div className="bg-[#0B0F17] border border-slate-800 p-6 rounded-2xl text-center space-y-3">
            <span className="text-xs uppercase text-slate-400 font-bold block">Universal Expected Value Formula</span>
            <div className="text-lg sm:text-2xl font-mono font-black text-emerald-400 tracking-wide">
              EV = (P<sub>win</sub> × Net Profit) - (P<sub>loss</sub> × Stake)
            </div>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Where P<sub>win</sub> is the de-vigged fair win probability, Net Profit is payout minus stake, P<sub>loss</sub> is (1 - P<sub>win</sub>), and Stake is the wagered capital.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">Variables and definitions of expected value calculations</caption>
              <thead className="bg-[#0B0F17] text-slate-300 border-b border-slate-800">
                <tr>
                  <th scope="col" className="p-3.5 font-semibold">Variable</th>
                  <th scope="col" className="p-3.5 font-semibold">Retail Example</th>
                  <th scope="col" className="p-3.5 font-semibold">Sharp Benchmark</th>
                  <th scope="col" className="p-3.5 font-semibold">Mathematical Consequence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300 font-mono">
                <tr>
                  <td className="p-3.5 font-sans font-medium text-white">Offered Odds</td>
                  <td className="p-3.5 text-blue-400">+125 (2.25)</td>
                  <td className="p-3.5 text-slate-400">+105 / -115</td>
                  <td className="p-3.5 font-sans text-xs">Retail book misprices line relative to global market</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-sans font-medium text-white">Implied Prob</td>
                  <td className="p-3.5 text-slate-400">44.44%</td>
                  <td className="p-3.5 text-amber-400">102.27% (Includes Vig)</td>
                  <td className="p-3.5 font-sans text-xs">Sharp market contains 2.27% overround margin</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-sans font-medium text-white">True Win Prob</td>
                  <td className="p-3.5 text-slate-400">—</td>
                  <td className="p-3.5 text-emerald-400 font-bold">47.70%</td>
                  <td className="p-3.5 font-sans text-xs">Juice-free fair probability after multiplicative de-vig</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-sans font-medium text-white">Fair No-Vig Line</td>
                  <td className="p-3.5 text-slate-400">—</td>
                  <td className="p-3.5 text-cyan-400 font-bold">+110 (2.096)</td>
                  <td className="p-3.5 font-sans text-xs">The price you would receive in a frictionless market</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-sans font-medium text-white">Net Expected Edge</td>
                  <td className="p-3.5 text-emerald-400 font-bold">+7.33% EV</td>
                  <td className="p-3.5 text-slate-400">0.00% (Neutral)</td>
                  <td className="p-3.5 font-sans text-xs">+$7.33 profit expected per $100 wager placed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: De-Vigging vs Guesswork */}
        <section className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
              Market Microstructure
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Market De-Vigging Outperforms Guesswork
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Recreational bettors attempt to forecast outcomes using subjective power rankings, injury narratives, or recent form heuristics. However, academic finance research demonstrates that the closing lines of high-volume market-making sportsbooks (such as Pinnacle, Circa, and Bookmaker.eu) represent the most efficient prediction of true probabilities in existence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0B0F17] p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                Market-Making Sportsbooks (Sharp Books)
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Sharp books operate on a low-margin, high-volume trading model. They accept large limit bets from professional syndicates and employ dynamic algorithmic price discovery. When syndicates bet an outcome, the line moves immediately until the market achieves equilibrium. Consequently, stripping the vig from these books produces an unbiased estimate of true win probability.
              </p>
            </div>

            <div className="bg-[#0B0F17] p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-amber-400" />
                Retail Sportsbooks (Recreational Books)
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Retail books target casual fans and recreational accumulators. Because their risk management focuses on promotional acquisition and marketing, their lines lag behind global consensus. When a retail book is slow to update a line, an off-market price is created. Using a <strong>no vig fair odds calculator</strong> reveals this gap instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Bankroll & Kelly Sizing */}
        <section className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1">
              Risk Management
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Managing Variance with Kelly Staking
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Having an edge is only half the battle. If your stake sizing is too aggressive, standard statistical distribution variance can bankrupt your bankroll before the law of large numbers takes effect—a mathematical certainty known as the Gambler&apos;s Ruin.
          </p>

          <div className="bg-[#0B0F17] border border-slate-800 p-6 rounded-2xl text-center space-y-3">
            <span className="text-xs uppercase text-slate-400 font-bold block">The Kelly Criterion Staking Formula</span>
            <div className="text-lg sm:text-2xl font-mono font-black text-cyan-400 tracking-wide">
              f* = (b · p - q) / b
            </div>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Where <code>f*</code> is the recommended fraction of total bankroll, <code>b</code> is net decimal odds (Decimal - 1), <code>p</code> is true probability, and <code>q</code> is loss probability (1 - p).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0B0F17] p-5 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Full Kelly (1.0x)</span>
              <span className="text-lg font-black text-rose-400 font-mono block mb-2">High Drawdown Risk</span>
              <p className="text-xs text-slate-400">
                Mathematically maximizes geometric growth rate, but carries a 33% risk of experiencing a 50% bankroll drawdown due to model estimation error.
              </p>
            </div>

            <div className="bg-[#0B0F17] p-5 rounded-2xl border border-emerald-500/30 text-center">
              <span className="text-xs text-emerald-400 uppercase font-semibold block mb-1">Half Kelly (0.5x)</span>
              <span className="text-lg font-black text-emerald-400 font-mono block mb-2">Pro Industry Standard</span>
              <p className="text-xs text-slate-400">
                Retains 75% of maximum theoretical growth while slashing volatility and drawdown probability by 66%. Highly recommended for straight wagers.
              </p>
            </div>

            <div className="bg-[#0B0F17] p-5 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Quarter Kelly (0.25x)</span>
              <span className="text-lg font-black text-cyan-400 font-mono block mb-2">Conservative Safety</span>
              <p className="text-xs text-slate-400">
                Minimal volatility with negligible risk of ruin. Ideal for multi-leg player props, longshot underdogs, or beginners building confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Frequently Asked Questions (PAA) */}
        <section className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-1">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-400" />
              Frequently Asked Questions About Expected Value Betting
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5">
              <h3 className="text-base font-bold text-white mb-2">
                What is a good EV percentage in sports betting?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A sustainable expected value edge on high-liquidity markets (NFL spreads, Premier League moneylines, NBA totals) typically ranges between <strong>+1.5% and +4.5%</strong>. On lower-liquidity niche markets like player props or minor leagues, edges can reach <strong>+6.0% to +12.0%</strong>. Consistently compounding a +3% average edge over thousands of wagers outperforms almost all traditional asset classes.
              </p>
            </div>

            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5">
              <h3 className="text-base font-bold text-white mb-2">
                Can you lose money betting with positive expected value (+EV)?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Yes, in the short term. Expected value is governed by the Law of Large Numbers, which guarantees convergence only across a sufficiently large sample size. Over a small sample of 50 to 200 bets, standard deviation and variance can result in downswings. Over 1,000+ disciplined wagers sized with Half Kelly, positive expectancy virtually guarantees capital appreciation.
              </p>
            </div>

            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5">
              <h3 className="text-base font-bold text-white mb-2">
                How does bookmaker juice affect expected value?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sportsbooks charge an overround (juice or vig) between 4% and 8% on two-way lines. Standard -110/-110 odds mean a bettor must win 52.38% of bets just to break even. A sports betting EV calculator strips this fee to reveal the true break-even win rate, letting you identify whether an offered price possesses a genuine statistical edge over the house.
              </p>
            </div>

            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5">
              <h3 className="text-base font-bold text-white mb-2">
                What is the difference between +EV betting and Arbitrage betting?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Arbitrage betting wagers on all opposing outcomes across multiple sportsbooks simultaneously to lock in an immediate, risk-free profit regardless of which team wins. +EV betting wagers only on the single mispriced outcome with positive expectancy. While arbitrage eliminates variance, +EV betting delivers significantly higher long-term compounding and avoids fast account profiling by retail bookmakers.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: E-E-A-T Author Card */}
        <section className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
          <div className="w-20 h-20 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
            <span className="text-blue-400 font-mono font-black text-2xl">MS</span>
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="text-lg font-bold text-white">Written &amp; Mathematically Audited by Marcus Sterling</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full w-fit mx-auto sm:mx-0">
                <Award className="w-3 h-3" />
                Verified Quantitative Sports Modeler
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Former algorithmic derivatives trading associate and senior sports modeling researcher. Marcus holds an M.S. in Computational Statistics and Operations Research from Carnegie Mellon University and specializes in Bayesian market-making algorithms, high-frequency odds discrepancy detection, and bankroll risk optimization.
            </p>
          </div>
        </section>

        {/* Section 7: Responsible Gaming Disclaimer */}
        <section className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5 text-center text-xs text-slate-500 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
            <AlertOctagon className="w-4 h-4" />
            <span>Responsible Gaming Notice</span>
          </div>
          <p className="max-w-3xl mx-auto leading-relaxed">
            Sports betting involves monetary risk and the potential for short-term statistical variance. The tools, formulas, and educational content on this platform are provided strictly for mathematical modeling and educational analysis. Past theoretical performance does not guarantee future financial outcomes. Always wager within your financial means.
          </p>
          <p className="text-slate-400">
            If you or someone you know has a gambling problem, confidential crisis counseling and referral resources are available 24/7. Call <strong className="text-slate-300">1-800-GAMBLER</strong> (US) or visit <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">ncpgambling.org</a> / <a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">gamcare.org.uk</a> (UK).
          </p>
        </section>

      </div>
    </main>
  );
}
