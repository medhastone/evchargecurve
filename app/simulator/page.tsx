'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Zap, Loader2, ArrowRight } from 'lucide-react';

function SimulatorRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const vid = params.get('vid') || params.get('vehicle');
    
    // Construct query string for target
    const targetQuery = params.toString();
    const destination = targetQuery ? `/?${targetQuery}#simulator` : '/#simulator';
    
    // Smooth client-side transition
    router.replace(destination);
  }, [router, searchParams]);

  const vid = searchParams.get('vid') || searchParams.get('vehicle');
  const destinationHref = searchParams.toString() 
    ? `/?${searchParams.toString()}#simulator` 
    : '/#simulator';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
          <Zap className="w-8 h-8 animate-pulse text-cyan-400" />
        </div>

        <h1 className="text-2xl font-black text-white mb-2">
          Loading DC Fast Charge Simulator
        </h1>
        
        {vid && (
          <p className="text-sm font-semibold text-emerald-400 mb-4 bg-emerald-500/10 py-1.5 px-3 rounded-xl border border-emerald-500/20 inline-block">
            Configuring vehicle: <span className="font-mono text-white">{vid}</span>
          </p>
        )}

        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Redirecting you to the high-precision 1% interval BMS charging taper calculator...
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
          <span>Redirecting automatically...</span>
        </div>

        <Link
          href={destinationHref}
          className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg"
        >
          <span>Open Simulator Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function SimulatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
            <span>Loading DC Fast Simulator...</span>
          </div>
        </div>
      }
    >
      <SimulatorRedirectContent />
    </Suspense>
  );
}
