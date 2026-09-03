import Link from 'next/link';
import { VEHICLES } from '@/data/evModels';

export const metadata = {
 title: 'EV Vehicles Directory',
 description: 'Browse the complete directory of electric vehicles to view detailed DC fast-charging taper curves and analytics.',
};

export default function CurveIndexPage() {
 const vehicles = Object.values(VEHICLES);

 return (
 <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="text-center mb-16">
 <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
 Vehicle Directory
 </h1>
 <p className="text-lg text-slate-400 max-w-2xl mx-auto">
 Select a vehicle to view its detailed DC fast charging taper curve, 10-80% times, and physical architecture specifications.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {vehicles.map((v) => (
 <Link 
 key={v.id} 
 href={`/curve/${v.id}`}
 className="block group bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/80 hover:border-emerald-500/50 transition-all"
 >
 <div className="flex justify-between items-start mb-4">
 <div>
 <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-1">{v.brand}</p>
 <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{v.name}</h2>
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
 <div>
 <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Architecture</p>
 <p className="text-sm font-medium text-slate-300">{v.architecture}</p>
 </div>
 <div>
 <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Max Charge</p>
 <p className="text-sm font-medium text-slate-300">{v.maxChargeKw} kW</p>
 </div>
 <div>
 <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Usable Pack</p>
 <p className="text-sm font-medium text-slate-300">{v.batteryCapacity} kWh</p>
 </div>
 <div>
 <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Chemistry</p>
 <p className="text-sm font-medium text-slate-300">{v.chemistry}</p>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 );
}
