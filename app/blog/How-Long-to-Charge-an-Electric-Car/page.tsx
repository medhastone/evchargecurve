import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Redirecting to Canonical Guide | EVChargeCurve',
  description: 'This page has moved to the canonical EV Charging Time Calculator & Speed Guide.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://evchargecurve.com/how-long-to-charge-an-electric-car',
  },
};

export default function RedirectDuplicateGuidePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <head>
        <meta httpEquiv="refresh" content="0; url=/how-long-to-charge-an-electric-car" />
      </head>
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
        <h1 className="text-xl font-bold text-white mb-3">
          Page Moved to Canonical Guide
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          You are being redirected to our comprehensive EV Charging Time Calculator & Speed Guide.
        </p>
        <Link
          href="/how-long-to-charge-an-electric-car"
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-sm transition-colors"
        >
          Click here if not redirected automatically
        </Link>
      </div>
    </div>
  );
}
