'use client';

import React from 'react';
import { ShieldCheck, Cpu, Thermometer, AlertCircle, CheckCircle2, Sliders, Layers } from 'lucide-react';
import { ResearchPaper } from '@/lib/researchData';

interface MethodologyDisclosureProps {
  methodology: ResearchPaper['methodology'];
  limitations: string[];
  mathematicalFormulas: ResearchPaper['mathematicalFormulas'];
}

export default function MethodologyDisclosure({
  methodology,
  limitations,
  mathematicalFormulas,
}: MethodologyDisclosureProps) {
  return (
    <div className="space-y-6">
      {/* Methodology Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Scientific Rigor & Instrumentation</span>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight mb-2">
          Empirical Methodology & Experimental Setup
        </h3>
        <p className="text-xs text-slate-400 mb-6 max-w-3xl leading-relaxed">
          EVChargeCurve operates on verified CAN-bus digital telemetry and physical high-power DC fast charging dispenser logging. All test cycles follow standardized thermal preconditioning protocols to eliminate confounding environmental variables.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Instrumentation Card */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4" />
              <span>Instrumentation</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {methodology.instrumentation.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Test Conditions Card */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-3">
              <Thermometer className="w-4 h-4" />
              <span>Test Conditions</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {methodology.testConditions.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sampling & Error Margins */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-3">
              <Sliders className="w-4 h-4" />
              <span>Telemetry Precision</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Sample Rate:</span>
                <span className="font-mono font-medium text-slate-200">{methodology.samplingRate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Sample Size:</span>
                <span className="font-mono font-medium text-slate-200">{methodology.sampleSize}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Calculated Error Margin:</span>
                <span className="font-mono font-medium text-emerald-400">{methodology.errorMargin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Formulas */}
      {mathematicalFormulas.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>Mathematical Physics & Integral Formulations</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mb-4">
            Analytical Modeling Formulas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mathematicalFormulas.map((form, idx) => (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4.5 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                    {form.title}
                  </h4>
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center font-mono text-emerald-300 text-sm my-2 select-all overflow-x-auto">
                    {form.latex}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {form.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Limitations Card */}
      <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
          <AlertCircle className="w-4.5 h-4.5 text-amber-400" />
          <span>Research Scope & Empirical Limitations</span>
        </div>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          While these datasets represent empirical CAN-bus recordings under controlled thermal and dispenser parameters, real-world consumer charging may vary due to:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400">
          {limitations.map((lim, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
              <span className="text-amber-400 font-bold">•</span>
              <span>{lim}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
