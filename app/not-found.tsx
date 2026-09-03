import React from 'react';
import Link from 'next/link';
import { Search, Zap, Route, Home, Battery } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center bg-slate-950">
      
      {/* Glitch / Glow Effect 404 */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full"></div>
        <h1 className="relative text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-600 tracking-tighter drop-shadow-sm">
          404
        </h1>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Dead Battery
      </h2>
      <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
        The page or vehicle you&apos;re looking for doesn&apos;t exist, has been moved, or the URL is incorrect. Let&apos;s get you back on the road.
      </p>

      {/* Quick Search / Jump Pills */}
      <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 flex items-center justify-center gap-2">
          <Search className="w-4 h-4" />
          Jump to a Calculator
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all group text-left">
            <div className="bg-emerald-500/10 p-2 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="block font-bold text-white">Charging Curves</span>
              <span className="block text-xs text-slate-400">10-80% times & taper rates</span>
            </div>
          </Link>
          
          <Link href="/range-loss" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-all group text-left">
            <div className="bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Route className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="block font-bold text-white">Range Simulator</span>
              <span className="block text-xs text-slate-400">Cold weather & towing</span>
            </div>
          </Link>

          <Link href="/home-charging" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all group text-left">
            <div className="bg-cyan-500/10 p-2 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
              <Home className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="block font-bold text-white">Home Charging</span>
              <span className="block text-xs text-slate-400">Time-of-Use economics</span>
            </div>
          </Link>

          <Link href="/battery-health" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-orange-500/50 transition-all group text-left">
            <div className="bg-orange-500/10 p-2 rounded-lg group-hover:bg-orange-500/20 transition-colors">
              <Battery className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <span className="block font-bold text-white">Battery Health</span>
              <span className="block text-xs text-slate-400">Degradation & longevity</span>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="mt-12">
        <Link href="/" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors underline decoration-emerald-500/30 underline-offset-4">
          ← Return to Homepage
        </Link>
      </div>
    </div>
  );
}
