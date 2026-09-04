const fs = require('fs');
const path = 'app/how-it-works/page.tsx';
let content = fs.readFileSync(path, 'utf8');
const replacement = `      {/* Real World Problem & Competitor Comparison Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Zap className="w-64 h-64 text-emerald-400" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Solving the Road-Trip Range Anxiety Problem
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-3xl">
              When planning a long EV road trip, drivers often rely on automaker claims ("10-80% in 30 minutes") or simple math (Dividing Battery Size by Charger Power). In the real world, this causes drivers to be stranded at chargers far longer than expected, missing appointments and suffering road-trip fatigue. Here is how our engineering-grade tool compares to generic calculators:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Competitors */}
              <div className="bg-slate-900/50 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">✕</span>
                  Generic Calculators
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1 flex-shrink-0">✕</span>
                    <p className="text-sm text-slate-400 m-0">Assume a flat charging speed (e.g., holding 150kW the entire session).</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1 flex-shrink-0">✕</span>
                    <p className="text-sm text-slate-400 m-0">Ignore 400V cable amperage limits on 350kW chargers.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1 flex-shrink-0">✕</span>
                    <p className="text-sm text-slate-400 m-0">Result in highly optimistic, mathematically impossible wait times.</p>
                  </li>
                </ul>
              </div>

              {/* Our Tool */}
              <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-2xl p-6 shadow-[0_0_30px_-5px_rgba(16,185,129,0.1)]">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">✓</span>
                  EVChargeCurve Engine
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
                    <p className="text-sm text-slate-300 m-0">Integrates step-by-step through the vehicle's exact thermal taper curve.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
                    <p className="text-sm text-slate-300 m-0">Automatically caps power based on real-world 400V/800V hardware limits.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
                    <p className="text-sm text-slate-300 m-0">Delivers pinpoint-accurate wait times to eliminate road-trip surprises.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}`;
content = content.replace('{/* Technical Specifications Section */}', replacement);
fs.writeFileSync(path, content);
