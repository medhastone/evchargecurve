'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShieldCheck, 
  Info, 
  Copy, 
  Check, 
  Scale, 
  SlidersHorizontal,
  Calculator,
  Cpu
} from 'lucide-react';
import { 
  calculateExpectedValue, 
  convertOddsString,
  formatOdds,
  OddsFormat, 
  DeVigMethod,
  EVCalculationResult 
} from '@/lib/bettingOddsEngine';

export default function EVBettingCalculator() {
  const [oddsFormat, setOddsFormat] = useState<OddsFormat>('american');
  const [calculationMode, setCalculationMode] = useState<'devig' | 'manual'>('devig');
  const [deVigMethod, setDeVigMethod] = useState<DeVigMethod>('multiplicative');
  
  // Offered Bet state
  const [offeredOdds, setOfferedOdds] = useState<string>('+125');
  const [stake, setStake] = useState<number>(100);
  const [bankroll, setBankroll] = useState<number>(2500);

  // De-Vig Inputs (Reference Sharp Book, e.g. Pinnacle or Circa)
  const [sharpLineA, setSharpLineA] = useState<string>('+105');
  const [sharpLineB, setSharpLineB] = useState<string>('-125');

  // Manual Mode Input
  const [manualWinProb, setManualWinProb] = useState<number>(47.5);

  const [copied, setCopied] = useState<boolean>(false);

  // Handle format conversion across all input fields when toggling
  const handleFormatChange = (newFormat: OddsFormat) => {
    if (newFormat === oddsFormat) return;
    setOfferedOdds((prev) => convertOddsString(prev, oddsFormat, newFormat));
    setSharpLineA((prev) => convertOddsString(prev, oddsFormat, newFormat));
    setSharpLineB((prev) => convertOddsString(prev, oddsFormat, newFormat));
    setOddsFormat(newFormat);
  };

  // Real-time calculation with safety fallback
  const result: EVCalculationResult | null = useMemo(() => {
    try {
      return calculateExpectedValue({
        offeredOdds,
        offeredFormat: oddsFormat,
        stake: stake || 1,
        mode: calculationMode,
        deVigMethod,
        manualTrueProbPercent: manualWinProb,
        devigMarketOddsA: sharpLineA,
        devigMarketOddsB: sharpLineB,
        devigFormat: oddsFormat,
        totalBankroll: bankroll || 1000,
      });
    } catch {
      return null;
    }
  }, [oddsFormat, calculationMode, deVigMethod, offeredOdds, stake, bankroll, sharpLineA, sharpLineB, manualWinProb]);

  const handleCopySummary = () => {
    if (!result) return;
    const summary = `📊 +EV Sports Betting Analysis:
• Offered Odds: ${result.offeredAmerican} (Dec: ${result.offeredDecimal.toFixed(2)} | Frac: ${result.offeredFractional})
• Fair "No-Vig" Price: ${result.fairAmericanOdds} (Dec: ${result.fairDecimalOdds.toFixed(2)} | Frac: ${result.fairFractionalOdds})
• True Win Probability: ${result.trueProbability}%
• Expected Value (Edge): ${result.expectedValuePercent > 0 ? '+' : ''}${result.expectedValuePercent}%
• Net EV ($): ${result.expectedValueDollars >= 0 ? '+' : ''}$${result.expectedValueDollars} (on $${stake} stake)
• De-Vig Algorithm: ${result.deVigMethodUsed.toUpperCase()}
• Half-Kelly Recommended Stake: $${result.kellyTiers[1].recommendedStake} (${result.kellyTiers[1].bankrollPercentage}% of $${bankroll} bankroll)
Calculated via EVChargeCurve Expected Value Calculator`;
    
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Helper placeholder based on current format
  const getPlaceholder = (type: 'offered' | 'sharpA' | 'sharpB') => {
    if (oddsFormat === 'decimal') {
      if (type === 'offered') return '2.25';
      if (type === 'sharpA') return '2.05';
      return '1.80';
    }
    if (oddsFormat === 'fractional') {
      if (type === 'offered') return '5/4';
      if (type === 'sharpA') return '21/20';
      return '4/5';
    }
    // American
    if (type === 'offered') return '+125';
    if (type === 'sharpA') return '+105';
    return '-125';
  };

  return (
    <div 
      className="w-full max-w-5xl mx-auto bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl text-slate-100"
      role="region"
      aria-label="Expected Value Sports Betting Calculator"
    >
      {/* Top Header Controls: Notation & Methodology */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1.5">
            Odds Notation Standard
          </span>
          <div className="inline-flex bg-[#0B0F17] p-1 rounded-xl border border-slate-800" role="group" aria-label="Odds format selector">
            {(['american', 'decimal', 'fractional'] as OddsFormat[]).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => handleFormatChange(fmt)}
                aria-pressed={oddsFormat === fmt}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  oddsFormat === fmt 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1.5">
            Fair Probability Source
          </span>
          <div className="inline-flex bg-[#0B0F17] p-1 rounded-xl border border-slate-800" role="group" aria-label="True probability estimation method">
            <button
              type="button"
              onClick={() => setCalculationMode('devig')}
              aria-pressed={calculationMode === 'devig'}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                calculationMode === 'devig' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              Sharp Market De-Vig
            </button>
            <button
              type="button"
              onClick={() => setCalculationMode('manual')}
              aria-pressed={calculationMode === 'manual'}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                calculationMode === 'manual' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Direct Win Prob %
            </button>
          </div>
        </div>
      </div>

      {/* De-Vig Algorithm Selector (Only visible in De-Vig mode) */}
      {calculationMode === 'devig' && (
        <div className="py-3 px-4 bg-[#0B0F17]/70 border border-slate-800 rounded-xl my-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs text-slate-300 font-medium">De-Vigging Model:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(
              [
                { id: 'multiplicative', name: 'Multiplicative (Classic)' },
                { id: 'power', name: 'Power (Favorite-Longshot)' },
                { id: 'shin', name: 'Shin Model (Academic)' },
                { id: 'additive', name: 'Additive' },
              ] as { id: DeVigMethod; name: string }[]
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setDeVigMethod(m.id)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all ${
                  deVigMethod === m.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Left Inputs vs Right Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Left Column: Data Entry */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Section 1: Retail Bookmaker Line */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-400" />
                1. Target Wager (Offered by Book)
              </h3>
              <span className="text-[11px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 font-medium capitalize">
                {oddsFormat} notation
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="offered-odds-input" className="text-xs text-slate-400 block mb-1 font-medium capitalize">
                  Offered Odds ({oddsFormat})
                </label>
                <input
                  id="offered-odds-input"
                  type="text"
                  value={offeredOdds}
                  onChange={(e) => setOfferedOdds(e.target.value)}
                  placeholder={getPlaceholder('offered')}
                  aria-label={`Target wager offered odds in ${oddsFormat} format`}
                  className="w-full bg-[#131B2A] border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="stake-input" className="text-xs text-slate-400 block mb-1 font-medium">
                  Target Wager Stake ($)
                </label>
                <input
                  id="stake-input"
                  type="number"
                  min="1"
                  value={stake}
                  onChange={(e) => setStake(parseFloat(e.target.value) || 0)}
                  aria-label="Target wager stake amount in dollars"
                  className="w-full bg-[#131B2A] border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Fair Market Line or Manual Probability */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                2. {calculationMode === 'devig' ? 'Sharp Benchmark Market' : 'Model Win Probability'}
              </h3>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                {calculationMode === 'devig' ? 'Pinnacle / Circa Reference' : 'Custom Analytics'}
              </span>
            </div>

            {calculationMode === 'devig' ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter both sides of the two-way market from a sharp market-making book. The selected algorithm strips the margin to compute genuine zero-vig fair odds.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sharp-line-a" className="text-xs text-slate-400 block mb-1 font-medium capitalize">
                      Target Side ({oddsFormat})
                    </label>
                    <input
                      id="sharp-line-a"
                      type="text"
                      value={sharpLineA}
                      onChange={(e) => setSharpLineA(e.target.value)}
                      placeholder={getPlaceholder('sharpA')}
                      aria-label={`Sharp benchmark odds for target outcome in ${oddsFormat} format`}
                      className="w-full bg-[#131B2A] border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="sharp-line-b" className="text-xs text-slate-400 block mb-1 font-medium capitalize">
                      Opposing Side ({oddsFormat})
                    </label>
                    <input
                      id="sharp-line-b"
                      type="text"
                      value={sharpLineB}
                      onChange={(e) => setSharpLineB(e.target.value)}
                      placeholder={getPlaceholder('sharpB')}
                      aria-label={`Sharp benchmark odds for opposing outcome in ${oddsFormat} format`}
                      className="w-full bg-[#131B2A] border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="manual-win-prob" className="text-xs text-slate-400 font-medium">
                    Projected Win Probability
                  </label>
                  <span className="text-emerald-400 font-bold font-mono text-sm">{manualWinProb}%</span>
                </div>
                <input
                  id="manual-win-prob"
                  type="range"
                  min="1"
                  max="99"
                  step="0.1"
                  value={manualWinProb}
                  onChange={(e) => setManualWinProb(parseFloat(e.target.value))}
                  aria-label="Projected true win probability slider percentage"
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-[11px] text-slate-400">
                  Derived from your proprietary simulation, regression model, or power ratings.
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Total Bankroll */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="bankroll-input" className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Active Betting Bankroll ($)
              </label>
              <span className="text-[11px] text-slate-400">Kelly Sizing Base</span>
            </div>
            <input
              id="bankroll-input"
              type="number"
              min="50"
              step="50"
              value={bankroll}
              onChange={(e) => setBankroll(parseFloat(e.target.value) || 0)}
              aria-label="Active sports betting bankroll size in dollars"
              className="w-full bg-[#131B2A] border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Right Column: Real-time EV & Risk Analysis */}
        <div className="lg:col-span-6 space-y-5">
          {result ? (
            <>
              {/* Primary Value Callout Card */}
              <div className={`rounded-3xl p-6 border transition-all ${
                result.isPositiveEV 
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-emerald-950/30' 
                  : 'bg-rose-950/20 border-rose-500/40 shadow-rose-950/30'
              } shadow-2xl`}>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    {result.isPositiveEV ? (
                      <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        <TrendingDown className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                        Expected Value (Edge)
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <p className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${
                          result.isPositiveEV ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {result.expectedValuePercent > 0 ? '+' : ''}{result.expectedValuePercent}%
                        </p>
                        <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-md ${
                          result.isPositiveEV 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {result.isPositiveEV ? '+EV Edge' : '-EV House Edge'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      EV on ${stake}
                    </span>
                    <span className={`text-2xl font-black font-mono ${
                      result.expectedValueDollars >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {result.expectedValueDollars >= 0 ? '+' : ''}${result.expectedValueDollars.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Analytical Breakdown Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-4 text-center">
                  <div className="bg-[#0B0F17]/90 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block mb-0.5">True Win Prob</span>
                    <span className="text-base font-bold font-mono text-white">{result.trueProbability}%</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Implied: {result.impliedProbOffered}%</span>
                  </div>
                  <div className="bg-[#0B0F17]/90 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block mb-0.5">
                      Fair Odds ({oddsFormat.slice(0, 3)})
                    </span>
                    <span className="text-base font-bold font-mono text-cyan-400">
                      {formatOdds(result.fairDecimalOdds, oddsFormat)}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {oddsFormat === 'decimal' ? result.fairAmericanOdds : `Dec: ${result.fairDecimalOdds.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="bg-[#0B0F17]/90 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block mb-0.5">Market Overround</span>
                    <span className="text-base font-bold font-mono text-amber-400">
                      {result.marketOverroundPercent !== null ? `${result.marketOverroundPercent}%` : 'Direct'}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5 capitalize">
                      {result.deVigMethodUsed}
                    </span>
                  </div>
                </div>
              </div>

              {/* Kelly Sizing Table */}
              <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Kelly Criterion Bankroll Allocation
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Bankroll: ${bankroll.toLocaleString()}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <caption className="sr-only">Kelly Criterion recommended bet sizing tiers</caption>
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th scope="col" className="pb-2 font-semibold">Tier &amp; Risk Strategy</th>
                        <th scope="col" className="pb-2 font-semibold text-center">Bankroll %</th>
                        <th scope="col" className="pb-2 font-semibold text-right">Recommended Wager</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {result.kellyTiers.map((tier, idx) => (
                        <tr key={tier.label} className={idx === 1 ? 'text-emerald-400 font-bold bg-emerald-500/10' : 'text-slate-300'}>
                          <td className="py-2.5 flex items-center gap-1.5">
                            {idx === 1 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                            <span>{tier.label}</span>
                          </td>
                          <td className="py-2.5 text-center">{tier.bankrollPercentage}%</td>
                          <td className="py-2.5 text-right font-bold">${tier.recommendedStake.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400">
                  <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Quantitative syndicates utilize <strong>Half Kelly (0.5x)</strong> to maximize geometric bankroll compounding while insulating capital against model calibration error and multi-bet drawdowns.
                  </span>
                </div>
              </div>

              {/* Copy Analysis Slip Button */}
              <button
                type="button"
                onClick={handleCopySummary}
                aria-label="Copy full mathematical +EV analysis slip to clipboard"
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl border border-slate-700 transition-colors text-xs uppercase tracking-wider shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Analysis Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy +EV Bet Slip Analysis</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center p-8 bg-[#0B0F17] border border-slate-800 rounded-3xl text-center text-slate-400 text-sm">
              <Calculator className="w-8 h-8 text-slate-600 mb-2" />
              <p>Enter valid target odds and reference lines to calculate expected value.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
