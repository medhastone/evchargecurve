import FastChargeSimulator from '@/components/FastChargeSimulator';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          DC Fast Charging Simulator
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
          Visualize real-world charging curves, taper drop-offs, and session times across different EVs and charger capacities.
        </p>
      </section>

      {/* Main Simulator Component */}
      <FastChargeSimulator />
    </div>
  );
}
