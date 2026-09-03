import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import RangeLossTool from '@/components/RangeLossTool';

export const metadata = {
  title: 'EV Cold Weather Range Loss Calculator & Towing Penalty',
  description: 'Calculate real-world EV range based on extreme cold weather, towing payload, aerodynamic accessories, and highway cruising speeds.',
};

export default function RangeLossPage() {
  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-200 font-medium">Real-World Range</span>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Real-World EV Range
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
          EPA ratings don't reflect reality. See how cold weather, high-speed highway driving, roof boxes, and heavy towing destroy your range.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <RangeLossTool />

      {/* Educational Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
            Why EVs Lose Range in Extreme Conditions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Cold Weather & Thermal Management</h3>
              <p className="text-slate-400 leading-relaxed">
                Internal combustion engines generate massive amounts of waste heat, which is easily diverted to warm the cabin. EVs are incredibly efficient, meaning they don't produce enough waste heat. Heating the cabin in winter requires pulling direct energy from the battery pack. Heat pumps mitigate this, but at sub-zero temperatures, resistive heaters (PTC) take over and consume enormous amounts of power.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">Highway Speeds (Aerodynamic Drag)</h3>
              <p className="text-slate-400 leading-relaxed">
                Aerodynamic drag increases exponentially with speed (squared). The difference in energy required to push a blocky SUV through the air at 80 mph versus 55 mph is massive. While EVs are highly efficient at lower city speeds where regenerative braking works best, high-speed highway driving quickly depletes the battery.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-3">Roof Boxes & Accessories</h3>
              <p className="text-slate-400 leading-relaxed">
                EVs are meticulously engineered in wind tunnels to achieve low drag coefficients (often below 0.25 Cd). Slapping a roof box on top destroys that aerodynamic profile, creating turbulent air and significantly reducing highway range by 10% to 15%. Rear-mounted bike racks are generally better, as they sit within the turbulent wake of the car, but still incur a penalty.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-3">Towing Payload</h3>
              <p className="text-slate-400 leading-relaxed">
                Towing a heavy, non-aerodynamic trailer is the ultimate range killer for any vehicle, but EV drivers notice it more due to the current charging infrastructure. Depending on the weight and frontal area of the trailer, towing can reduce an EV's range by 30% to 50%, requiring twice as many charging stops.
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
                "name": "Why does EV range drop in the cold?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "EV range drops in cold weather primarily because the battery must use its own stored energy to heat the cabin (unlike gas cars which use waste engine heat). Additionally, cold batteries have higher internal resistance, making them less efficient."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a roof box affect EV range?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A roof box ruins the vehicle's aerodynamic profile and typically reduces highway range by 10% to 15% depending on the vehicle shape and driving speed."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
