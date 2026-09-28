'use client';

import React, { useState } from 'react';
import { Copy, Check, Quote, BookOpen, Share2 } from 'lucide-react';
import { ResearchPaper } from '@/lib/researchData';

interface CitationBlockProps {
  paper: ResearchPaper;
}

export default function CitationBlock({ paper }: CitationBlockProps) {
  const [format, setFormat] = useState<'APA' | 'IEEE' | 'BibTeX'>('APA');
  const [copied, setCopied] = useState(false);

  const year = paper.publishedDate.split('-')[0];
  const authorsList = paper.authors.map((a) => a.name).join(', ');
  const paperUrl = `https://evchargecurve.com/research/${paper.slug}`;

  const citations = {
    APA: `${authorsList} (${year}). ${paper.title}. EVChargeCurve Telemetry Observatory. https://doi.org/${paper.doi}`,
    IEEE: `${authorsList}, "${paper.title}," EVChargeCurve Telemetry Observatory, Tech. Rep. ${paper.version}, ${year}. [Online]. Available: ${paperUrl}. doi: ${paper.doi}.`,
    BibTeX: `@techreport{evcc_${paper.slug.replace(/-/g, '_')}_${year},
  author      = {${paper.authors.map((a) => `{${a.name}}`).join(' and ')}},
  title       = {{${paper.title}}},
  institution = {EVChargeCurve Open Telemetry Observatory},
  year        = {${year}},
  number      = {v${paper.version}},
  doi         = {${paper.doi}},
  url         = {${paperUrl}}
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(citations[format]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5 text-slate-200 font-semibold">
          <Quote className="w-5 h-5 text-emerald-400" />
          <span>Cite This Empirical Research</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex gap-1 text-xs">
            {(['APA', 'IEEE', 'BibTeX'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  format === fmt
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-all active:scale-95"
            title="Copy citation to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      <div className="mt-4">
        <pre className="text-xs font-mono bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed selection:bg-emerald-500/30">
          {citations[format]}
        </pre>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Access (CC BY 4.0)</span>
          </span>
          <span>DOI: <code className="text-slate-300 font-mono">{paper.doi}</code></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Share2 className="w-3.5 h-3.5" />
          <span>Automotive journalists & researchers may cite freely with attribution.</span>
        </div>
      </div>
    </div>
  );
}
