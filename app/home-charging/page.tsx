import React from 'react';
import Link from 'next/link';
import { ChevronRight, Plug, Zap } from 'lucide-react';
import HomeChargingTool from '@/components/HomeChargingTool';

export const metadata = {
  title: 'Level 2 EV Home Charging Time & TOU Cost Calculator',
  description: 'Estimate AC home charging times, Level 1 vs Level 2 speeds, and calculate monthly fuel savings against gasoline vehicles.',
};

export default function HomeChargingPage() {
  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-200 font-medium">Home Charging</span>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Home Charging Economics
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
          Calculate Level 1 and Level 2 AC charging times, off-peak electricity costs, and see your annual dollar savings compared to driving a gas vehicle.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <HomeChargingTool />

      {/* Educational Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
            Understanding Home EV Charging Setup
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-500/20 p-2 rounded-lg"><Plug className="w-5 h-5 text-blue-400"/></div>
                <h3 className="text-lg font-bold text-blue-400">Level 1 Charging (120V)</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Level 1 charging uses a standard household 120-volt outlet. It delivers about 1.4 kW of power, translating to roughly 3-5 miles of range per hour. While extremely slow, it is sufficient for drivers who travel less than 30 miles a day and can leave the car plugged in overnight.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-500/20 p-2 rounded-lg"><Zap className="w-5 h-5 text-emerald-400"/></div>
                <h3 className="text-lg font-bold text-emerald-400">Level 2 Charging (240V)</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Level 2 requires a 240-volt circuit, similar to an electric oven or dryer. Depending on the amperage (typically 32A to 48A), it can deliver between 7 kW and 11.5 kW. This adds 20-40 miles of range per hour, easily recharging a completely empty EV pack overnight.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-3">Time-of-Use (TOU) Rates</h3>
              <p className="text-slate-400 leading-relaxed">
                Most utility companies offer special EV or TOU rates. Electricity is much cheaper during "Off-Peak" hours (usually midnight to 6 AM) when grid demand is lowest. Setting your EV to schedule charging during these windows can cut your fuel costs by more than 50% compared to daytime charging.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-3">Electrical Panel Load Upgrades</h3>
              <p className="text-slate-400 leading-relaxed">
                Installing a 48-Amp hardwired Level 2 charger requires a dedicated 60-Amp circuit breaker. If your home has an older 100A or 125A main electrical panel, adding this load might require a panel upgrade to 200A. Alternatively, smart load management devices can pause charging when appliances like the AC or electric stove are running.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema FAQ Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does it take to charge an EV at home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "With a Level 2 240V charger, a typical EV takes 6 to 9 hours to charge from 10% to 80%. Using a standard Level 1 120V outlet, the same charge can take 40 to 60 hours."
                }
              },
              {
                "@type": "Question",
                "name": "Is it cheaper to charge an EV at home or public fast chargers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It is significantly cheaper to charge at home. Public DC fast charging generally costs 3 to 4 times more per kWh than overnight residential rates."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
