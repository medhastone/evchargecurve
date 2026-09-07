import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Code2, Database, ShieldCheck, Zap, Mail } from 'lucide-react';
import OrganizationSchema from '@/components/OrganizationSchema';

export const metadata: Metadata = {
  title: 'About EVChargeCurve & Medhastone',
  description: 'Learn about EVChargeCurve, physical battery telemetry standards, and the creator behind it: a Developer, Content Creator, and Prompt Engineer.',
  alternates: {
    canonical: 'https://evchargecurve.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      <OrganizationSchema />
      
      {/* Hero Section */}
      <section className="relative w-full pt-16 md:pt-24 pb-12 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Zap className="w-4 h-4" />
            <span>Developer Philosophy</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Laboratory-Grade Vehicle Physics. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Not Marketing Averages.
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
            EVChargeCurve was built to bring raw telemetry, physical battery modeling, and precise thermodynamic data directly to drivers. We bypass the standard OEM marketing brochures to calculate exactly how fast your EV charges, how much winter range you lose, and how efficiently you can power your home.
          </p>
        </div>
      </section>

      {/* About the Team Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
              <Code2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">About Us</h2>
              <p className="text-emerald-400 font-medium">Architected & Developed by Medhastone</p>
            </div>
          </div>
          
          <div className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base">
            <p>
              EVChargeCurve is created and maintained by <strong>Medhastone</strong>. I am a dedicated Developer, Content Creator, and Prompt Engineer passionate about building high-performance web platforms, client-side computing, and zero-server privacy architecture.
            </p>
            <p>
              My philosophy is rooted in pushing complex mathematical modeling and computational workloads directly to the browser. By leveraging modern technologies like Next.js, AI prompt engineering, and edge networking, I build tools that are incredibly fast, fiercely private, and accessible to everyone.
            </p>
            <p>
              I believe that utility software should respect the user. That means no unnecessary cloud processing, no harvesting of personal driving data, and no opaque server-side black boxes. What you see is pure, deterministic client-side mathematics calculating your EV&apos;s physical constraints in real-time.
            </p>
            <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-6">
              <span className="text-slate-400 text-sm">Get in touch:</span>
              <a href="mailto:medhastone@gmail.com" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="font-medium">medhastone@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Medhastone Digital Ecosystem</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore our broader portfolio of privacy-first utility tools, high-performance web platforms, and engineering systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Medhastone Portfolio */}
          <a 
            href="https://zentova.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-[#131B2A] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-950/30 border border-emerald-900/50 flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Medhastone Portfolio</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Discover our primary engineering hub. We build full-stack mobile applications, scalable Next.js web platforms, and robust engineering systems for modern enterprises.
            </p>
            <div className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
              Visit zentova.in
            </div>
          </a>

          {/* Card B: M4A to MP3 Converter */}
          <a 
            href="https://m4atomp3converter.com/en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-[#131B2A] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="w-12 h-12 rounded-lg bg-cyan-950/30 border border-cyan-900/50 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">M4A to MP3 Converter</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Our sister utility tool. A blazing-fast, in-browser WebAssembly audio converter capable of processing gigabytes of media entirely client-side with 100% data privacy.
            </p>
            <div className="text-cyan-400 text-sm font-semibold flex items-center gap-1">
              Visit m4atomp3converter.com
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
