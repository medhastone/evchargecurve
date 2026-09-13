import os

calculator_tsx = """\"\"\"use client\"\"\";
import React, { useState, useEffect } from 'react';
import { Settings, Zap, DollarSign, TrendingDown, BatteryCharging, ArrowRight, Fuel } from 'lucide-react';

const PRESETS = [
  { name: 'Tesla Model 3 RWD', kwh: 60, wh_mi: 240, kwh_100km: 15.0 },
  { name: 'Tesla Model Y Long Range', kwh: 75, wh_mi: 270, kwh_100km: 16.8 },
  { name: 'Hyundai Ioniq 5 / Kia EV6', kwh: 77.4, wh_mi: 300, kwh_100km: 18.6 },
  { name: 'Ford Mustang Mach-E ER', kwh: 91, wh_mi: 330, kwh_100km: 20.5 },
  { name: 'Rivian R1T / F-150 Lightning', kwh: 131, wh_mi: 460, kwh_100km: 28.5 },
  { name: 'Custom EV', kwh: 80, wh_mi: 300, kwh_100km: 18.6 }
];

const LOCATIONS = [
  { name: 'Home Level 2 (Off-Peak TOU)', defaultRate: 0.12, efficiency: 0.90, fee: 0 },
  { name: 'Home Level 2 (Standard Peak)', defaultRate: 0.28, efficiency: 0.90, fee: 0 },
  { name: 'Public DC Fast Charger', defaultRate: 0.44, efficiency: 0.95, fee: 1.50 }
];

const CURRENCIES = [
  { symbol: '$', code: 'USD' },
  { symbol: '€', code: 'EUR' },
  { symbol: '£', code: 'GBP' },
  { symbol: '$', code: 'CAD' },
  { symbol: '$', code: 'AUD' },
  { symbol: '₹', code: 'INR' }
];

export default function Calculator() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customKwh, setCustomKwh] = useState(60);
  const [customConsumption, setCustomConsumption] = useState(240); // wh/mi or kwh/100km based on unitSystem

  const [startSoc, setStartSoc] = useState(10);
  const [targetSoc, setTargetSoc] = useState(80);

  const [selectedLocation, setSelectedLocation] = useState(0);
  const [electricityRate, setElectricityRate] = useState(0.12);
  const [efficiency, setEfficiency] = useState(90);

  const [gasPrice, setGasPrice] = useState(3.65);
  const [iceEfficiency, setIceEfficiency] = useState(28); // MPG or L/100km
  const [annualDistance, setAnnualDistance] = useState(12000);

  // Sync custom values when preset changes
  useEffect(() => {
    if (selectedPreset !== 5) {
      setCustomKwh(PRESETS[selectedPreset].kwh);
      setCustomConsumption(unitSystem === 'imperial' ? PRESETS[selectedPreset].wh_mi : PRESETS[selectedPreset].kwh_100km);
    }
  }, [selectedPreset, unitSystem]);

  // Sync location defaults
  useEffect(() => {
    setElectricityRate(LOCATIONS[selectedLocation].defaultRate);
    setEfficiency(LOCATIONS[selectedLocation].efficiency * 100);
  }, [selectedLocation]);

  // Calculations
  const batterySize = customKwh;
  const energyNeeded = batterySize * ((targetSoc - startSoc) / 100);
  const actualEnergyDrawn = energyNeeded / (efficiency / 100);
  
  const sessionCost = (actualEnergyDrawn * electricityRate) + LOCATIONS[selectedLocation].fee;

  // Cost Per Distance
  let evCostPerDistance = 0;
  if (unitSystem === 'imperial') {
    // customConsumption is Wh/mi
    evCostPerDistance = (customConsumption / 1000 / (efficiency / 100)) * electricityRate;
  } else {
    // customConsumption is kWh/100km. So kWh/km = customConsumption / 100
    evCostPerDistance = ((customConsumption / 100) / (efficiency / 100)) * electricityRate;
  }

  const annualEvCost = evCostPerDistance * annualDistance;

  // ICE Equivalent
  let iceCostPerDistance = 0;
  if (unitSystem === 'imperial') {
    // MPG
    iceCostPerDistance = gasPrice / iceEfficiency;
  } else {
    // L/100km
    iceCostPerDistance = (iceEfficiency / 100) * gasPrice;
  }

  const annualIceCost = iceCostPerDistance * annualDistance;
  const netSavings = annualIceCost - annualEvCost;
  const savingsPercent = Math.max(0, ((annualIceCost - annualEvCost) / annualIceCost) * 100);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.code }).format(val);
  };

  return (
    <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 sm:p-8 mt-12 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-emerald-400" />
            EV Charging Cost Calculator
          </h2>
          <p className="text-slate-400 text-sm mt-1">Configure your vehicle, rates, and region</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            className="bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-emerald-400 outline-none w-full md:w-auto"
            value={currency.code}
            onChange={(e) => setCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
          >
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
          </select>
          <div className="bg-[#0B0F17] rounded-lg p-1 border border-slate-700 flex w-full md:w-auto">
            <button 
              className={`flex-1 px-4 py-1.5 text-sm rounded-md transition-colors ${unitSystem === 'imperial' ? 'bg-emerald-500/20 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setUnitSystem('imperial')}
            >
              Imperial
            </button>
            <button 
              className={`flex-1 px-4 py-1.5 text-sm rounded-md transition-colors ${unitSystem === 'metric' ? 'bg-emerald-500/20 text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setUnitSystem('metric')}
            >
              Metric
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-2 space-y-8 pr-0 lg:pr-8 lg:border-r border-slate-800">
          
          {/* Section 1: Vehicle */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <BatteryCharging className="w-4 h-4 text-amber-400" /> 1. Vehicle & Battery
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Vehicle Preset</label>
                <select 
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(Number(e.target.value))}
                >
                  {PRESETS.map((p, i) => <option key={i} value={i}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Usable Battery (kWh)</label>
                <input 
                  type="number" 
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  value={customKwh}
                  onChange={(e) => setCustomKwh(Number(e.target.value))}
                  disabled={selectedPreset !== 5}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Efficiency ({unitSystem === 'imperial' ? 'Wh/mi (e.g. 250)' : 'kWh/100km (e.g. 15.5)'})
                </label>
                <input 
                  type="number" step="0.1"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  value={customConsumption}
                  onChange={(e) => setCustomConsumption(Number(e.target.value))}
                  disabled={selectedPreset !== 5}
                />
              </div>
            </div>
            
            {/* SoC Sliders */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Start SoC: {startSoc}%</label>
                <input 
                  type="range" min="0" max="99" value={startSoc} 
                  onChange={(e) => setStartSoc(Math.min(Number(e.target.value), targetSoc - 1))}
                  className="w-full accent-amber-400" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Target SoC: {targetSoc}%</label>
                <input 
                  type="range" min="1" max="100" value={targetSoc} 
                  onChange={(e) => setTargetSoc(Math.max(Number(e.target.value), startSoc + 1))}
                  className="w-full accent-amber-400" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Electricity & Charging */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> 2. Electricity & Charging Profile
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-2">Charging Location</label>
                <select 
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(Number(e.target.value))}
                >
                  {LOCATIONS.map((l, i) => <option key={i} value={i}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Rate ({currency.symbol}/kWh)</label>
                <input 
                  type="number" step="0.01"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Net Efficiency (%)</label>
                <input 
                  type="number" min="50" max="100"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                  value={efficiency}
                  onChange={(e) => setEfficiency(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Section 3: ICE Comparison */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Fuel className="w-4 h-4 text-slate-400" /> 3. ICE Benchmark Comparison
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Gas ({currency.symbol}/{unitSystem === 'imperial' ? 'gal' : 'L'})</label>
                <input 
                  type="number" step="0.01"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  value={gasPrice}
                  onChange={(e) => setGasPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">ICE Efficiency ({unitSystem === 'imperial' ? 'MPG' : 'L/100km'})</label>
                <input 
                  type="number" step="0.1"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  value={iceEfficiency}
                  onChange={(e) => setIceEfficiency(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Annual {unitSystem === 'imperial' ? 'Miles' : 'KM'}</label>
                <input 
                  type="number" step="100"
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                  value={annualDistance}
                  onChange={(e) => setAnnualDistance(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-6 h-max sticky top-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-400" /> Cost Analysis
          </h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Session Cost ({startSoc}% to {targetSoc}%)</p>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-black text-white">{formatMoney(sessionCost)}</p>
                <p className="text-sm text-slate-500 mb-1">for {actualEnergyDrawn.toFixed(1)} kWh drawn</p>
              </div>
            </div>

            <div className="h-px bg-slate-800 w-full" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-400 mb-1">EV Cost / {unitSystem === 'imperial' ? 'Mile' : 'KM'}</p>
                <p className="text-2xl font-bold text-cyan-400">{formatMoney(evCostPerDistance)}</p>
                {unitSystem === 'metric' && <p className="text-xs text-slate-500 mt-1">{formatMoney(evCostPerDistance * 100)} / 100km</p>}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 mb-1">Gas Cost / {unitSystem === 'imperial' ? 'Mile' : 'KM'}</p>
                <p className="text-2xl font-bold text-slate-300">{formatMoney(iceCostPerDistance)}</p>
                {unitSystem === 'metric' && <p className="text-xs text-slate-500 mt-1">{formatMoney(iceCostPerDistance * 100)} / 100km</p>}
              </div>
            </div>

            <div className="h-px bg-slate-800 w-full" />

            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Annual Fuel Bill</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Electric Vehicle</span>
                <span className="text-sm font-bold text-white">{formatMoney(annualEvCost)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Gas Vehicle</span>
                <span className="text-sm font-medium text-slate-400 line-through decoration-slate-500">{formatMoney(annualIceCost)}</span>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mt-6">
              <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider mb-1">Net Annual Savings</p>
              <p className="text-3xl font-black text-emerald-400">{formatMoney(netSavings)}</p>
              <p className="text-xs text-emerald-400/80 mt-1">You save {savingsPercent.toFixed(1)}% compared to gasoline</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
\"\"\"

page_tsx = """import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Calculator from './Calculator';
import { Battery, Zap, DollarSign, ArrowRight, ShieldCheck, Calculator as CalcIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Charging Cost Calculator & Cost Per Mile Estimator',
  description: 'Calculate the exact cost to charge any EV at home or public DC fast chargers. Compare cost per mile, 100 km, and total savings over gas in real time.',
  alternates: {
    canonical: 'https://evchargecurve.com/ev-charging-cost',
  },
  openGraph: {
    title: 'EV Charging Cost Calculator – Cost Per Mile & 100km Estimator',
    description: 'Accurately compute home off-peak vs public DC fast charging session costs, AC-to-DC rectification losses, and annual fuel savings across all currencies.',
    url: 'https://evchargecurve.com/ev-charging-cost',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Charging Cost Calculator – Cost Per Mile & 100km Estimator',
    description: 'Accurately compute home off-peak vs public DC fast charging session costs, AC-to-DC rectification losses, and annual fuel savings across all currencies.',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "EV Charging Cost Calculator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All (Web Browser)",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Universal electric vehicle charging cost and cost per mile calculator with global currencies and public vs home charging analysis."
    },
    {
      "@type": "HowTo",
      "name": "How to calculate EV charging cost per mile",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Vehicle and Battery Details",
          "text": "Select your EV model or input usable battery size and efficiency."
        },
        {
          "@type": "HowToStep",
          "name": "Input Electricity Rates",
          "text": "Provide your local home off-peak rate or public DCFC network fee."
        },
        {
          "@type": "HowToStep",
          "name": "Review Cost per Mile",
          "text": "Observe your session cost, cost per mile, and gasoline savings equivalent."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does it cost to fully charge an electric car at home?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It typically costs $6 to $11 to fully charge a 60–80 kWh electric car battery at home using standard off-peak residential electricity rates."
          }
        },
        {
          "@type": "Question",
          "name": "Is charging an electric car cheaper than buying gasoline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, charging an EV at home typically results in a 60%–75% operational cost reduction compared to fueling an equivalent gasoline internal combustion engine (ICE) vehicle."
          }
        },
        {
          "@type": "Question",
          "name": "Why does public DC fast charging cost so much more than home charging?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Public DC fast charging involves high-voltage infrastructure capital costs, commercial demand charges from utilities to support extreme power spikes, and network margin markups."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to charge a Tesla per mile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Charging a Tesla at home typically costs 3.5 to 4.5 cents per mile, whereas equivalent gasoline cars usually cost 12 to 15 cents per mile."
          }
        },
        {
          "@type": "Question",
          "name": "Does cold winter weather increase the cost of charging an EV?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, cold winter weather increases the cost of charging an EV by lowering battery efficiency and requiring cabin HVAC draw, leading to higher Wh/mi consumption."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to charge an EV at a hotel or destination charger?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Destination chargers at hotels can range from complimentary (free for guests) to flat daily fees or standard Level 2 per-kWh rates depending on the property."
          }
        }
      ]
    }
  ]
};

export default function EVChargingCostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-[#0B0F17] pt-24 pb-16">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6">
              EV Charging Cost Calculator & Cost Per Mile / 100 km Estimator
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Calculate the exact cost to charge any electric vehicle at home or public DC fast chargers. Our <strong>ev charging cost calculator</strong> models AC-to-DC rectification losses, Time-of-Use off-peak tariffs, and public network pricing to reveal your true cost per mile and net savings over gas.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Level 1/2 Inverter Loss Derated (88%–92%)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Global Multi-Currency & Metric Support
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Public DCFC Session & Idle Fee Profiling
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Client-Side Real-Time Math
              </span>
            </div>
          </div>
          
          <Calculator />
        </section>

        {/* Content Body */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Article Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Step by step */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  How Our Cost to Charge an EV Calculator Computes True Fuel Expenses
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/30 select-none">1</span>
                    <h3 className="text-lg font-bold text-white mb-3 relative z-10">Gross Energy Draw at the Meter</h3>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                      Factors vehicle battery capacity and onboard inverter thermal conversion losses (~10% for L2, ~20% for L1) to calculate billable kWh.
                    </p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/30 select-none">2</span>
                    <h3 className="text-lg font-bold text-white mb-3 relative z-10">Time-of-Use & Network Rate Simulation</h3>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                      Evaluates residential off-peak tariffs ($0.08–$0.15/kWh) against high-speed highway DC charging ($0.35–$0.55/kWh).
                    </p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/30 select-none">3</span>
                    <h3 className="text-lg font-bold text-white mb-3 relative z-10">Cost Per Mile & ICE Disruption Delta</h3>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                      Computes <Link href="/home-charging" className="text-emerald-400 hover:text-emerald-300">EV home charging time calculator 240V</Link> metrics, cost per mile / 100 km, and benchmarks total annual expenditure against equivalent internal combustion vehicles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Math Formulas */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Electric Car Cost Per Mile Calculator: The Mathematical Formulation
                </h2>
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 md:p-8 font-mono text-sm text-slate-300 space-y-6">
                  <div>
                    <p className="text-emerald-400 font-bold mb-2">1. Billable Grid Energy:</p>
                    <p className="bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                      E_meter = (ΔSoC × C_battery) / η_charging
                    </p>
                  </div>
                  <div>
                    <p className="text-emerald-400 font-bold mb-2">2. Total Charging Session Cost:</p>
                    <p className="bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                      Cost_session = (E_meter × Rate_electricity) + Fee_session
                    </p>
                  </div>
                  <div>
                    <p className="text-emerald-400 font-bold mb-2">3. Cost Per Mile (or km):</p>
                    <p className="bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                      Cost_mile = (Wh_mi / (1,000 × η_charging)) × Rate_electricity
                    </p>
                  </div>
                  <div>
                    <p className="text-emerald-400 font-bold mb-2">4. Gasoline Fuel Cost Per Mile Comparison:</p>
                    <p className="bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                      Cost_mile_ICE = Price_gallon / MPG
                    </p>
                  </div>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="space-y-6 pt-8 border-t border-slate-800 overflow-x-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  EV Charging Cost Per 100 Miles: Popular Electric Vehicles Compared
                </h2>
                <p className="text-slate-400 text-sm">Comparison based on driving 100 miles (160 km). Assumes standard 90% L2 and 95% DCFC efficiencies.</p>
                
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-800/50">
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 rounded-tl-xl">Vehicle & Battery</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700">Consumption</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 text-emerald-400">Home Off-Peak ($0.12)</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 text-amber-400">Home Peak ($0.28)</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 text-cyan-400">Public DCFC ($0.45)</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 rounded-tr-xl">Gas Car (28 MPG)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#131B2A]">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Tesla Model 3 RWD (60 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">240 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$3.20</td>
                      <td className="p-4 text-sm text-amber-400">$7.47</td>
                      <td className="p-4 text-sm text-cyan-400">$11.37</td>
                      <td className="p-4 text-sm text-slate-300">$13.04 (at $3.65/gal)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Tesla Model Y LR (75 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">270 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$3.60</td>
                      <td className="p-4 text-sm text-amber-400">$8.40</td>
                      <td className="p-4 text-sm text-cyan-400">$12.79</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Hyundai Ioniq 5 (77.4 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">300 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$4.00</td>
                      <td className="p-4 text-sm text-amber-400">$9.33</td>
                      <td className="p-4 text-sm text-cyan-400">$14.21</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">BMW i4 eDrive40 (81.2 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">310 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$4.13</td>
                      <td className="p-4 text-sm text-amber-400">$9.64</td>
                      <td className="p-4 text-sm text-cyan-400">$14.68</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Ford Mustang Mach-E ER (91 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">330 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$4.40</td>
                      <td className="p-4 text-sm text-amber-400">$10.27</td>
                      <td className="p-4 text-sm text-cyan-400">$15.63</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Rivian R1T Large Pack (135 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">460 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$6.13</td>
                      <td className="p-4 text-sm text-amber-400">$14.31</td>
                      <td className="p-4 text-sm text-cyan-400">$21.79</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  
                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      How much does it cost to fully charge an electric car at home?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      It typically costs $6 to $11 to fully charge a 60–80 kWh electric car battery at home using standard off-peak residential electricity rates (assuming $0.10 to $0.15 per kWh).
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      Is charging an electric car cheaper than buying gasoline?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Yes. When utilizing an <Link href="/ev-charging-cost" className="text-emerald-400 hover:text-emerald-300">electric car vs gas cost per mile calculator</Link>, home charging typically results in a 60%–75% operational cost reduction compared to fueling an equivalent ICE vehicle.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      Why does public DC fast charging cost so much more than home charging?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Comparing the <Link href="/ev-charging-cost" className="text-emerald-400 hover:text-emerald-300">cost to charge ev at home vs public station</Link> reveals higher public fees due to high-voltage infrastructure capital costs, commercial demand charges from utilities, and network operator margin markups. View our <Link href="/" className="text-emerald-400 hover:text-emerald-300">DC fast charging curve calculator</Link> for optimal charging speeds.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      How much does it cost to charge a Tesla per mile?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Using a <Link href="/ev-charging-cost" className="text-emerald-400 hover:text-emerald-300">how much to charge a tesla calculator</Link>, a Model 3 or Model Y at home typically costs 3.5 to 4.5 cents per mile, whereas equivalent gasoline cars usually cost 12 to 15 cents per mile.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      Does cold winter weather increase the cost of charging an EV?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Yes. Cold weather increases consumption due to cabin HVAC heating and higher battery cell resistance. This increases your Wh/mi, directly raising your cost per mile. You can track this with our <Link href="/range-loss" className="text-emerald-400 hover:text-emerald-300">winter range degradation calculator</Link>.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      How much does it cost to charge an EV at a hotel or destination charger?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Destination chargers range from complimentary (free for guests) to flat daily fees or standard per-kWh rates. Plan road trips effectively using our <Link href="/destination-charging" className="text-emerald-400 hover:text-emerald-300">destination charging calculator</Link>.
                    </div>
                  </details>

                </div>
              </div>
            </div>

            {/* Sidebar content */}
            <div className="lg:col-span-1">
              <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-6">Driver Optimization Playbook: 4 Ways to Cut Costs</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2">1. Automate Overnight TOU Schedules</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Align charging with 12:00 AM – 6:00 AM super off-peak windows to cut residential charging bills by up to 65%.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2">2. Avoid 80% to 100% DC Fast Charging</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Charging above 80% on highway DC chargers slows down drastically due to BMS thermal tapering, increasing paid time-based plug fees.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2">3. Rooftop Solar Diverting</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Pair your vehicle with a smart home solar EVSE to charge at an effective cost of $0.00/kWh. Use our <Link href="/solar-to-ev" className="text-emerald-400 hover:text-emerald-300">solar panels to charge an EV calculator</Link> to size your array.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2">4. Public Network Memberships</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Drivers taking frequent road trips can utilize network monthly subscriptions (e.g., Electrify America Pass+, Tesla Supercharger membership) to lower per-kWh rates by up to 25%. Ensure your home panel is ready with our <Link href="/panel-capacity" className="text-emerald-400 hover:text-emerald-300">EV charger breaker size calculator & 100A panel capacity tool</Link>.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-4">Track Your Green Impact</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Every mile driven on electricity displaces fossil fuels. Calculate your exact emissions delta with our <Link href="/carbon-offset" className="text-emerald-400 font-medium hover:text-emerald-300">EV CO2 emissions saved calculator <ArrowRight className="w-3 h-3 inline" /></Link>.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
\"\"\"

with open('/app/applet/app/ev-charging-cost/Calculator.tsx', 'w') as f:
    f.write(calculator_tsx)

with open('/app/applet/app/ev-charging-cost/page.tsx', 'w') as f:
    f.write(page_tsx)

# Update Navbar
with open('/app/applet/components/Navbar.tsx', 'r') as f:
    nav_content = f.read()

if "path: '/ev-charging-cost'" not in nav_content:
    nav_replacement = \"\"\"  { name: 'Home Charging', path: '/home-charging' },
  { name: 'EV Charging Cost', path: '/ev-charging-cost' },\"\"\"
    nav_content = nav_content.replace(\"  { name: 'Home Charging', path: '/home-charging' },\", nav_replacement)
    with open('/app/applet/components/Navbar.tsx', 'w') as f:
        f.write(nav_content)

# Update Footer
with open('/app/applet/components/Footer.tsx', 'r') as f:
    footer_content = f.read()

if "href=\\"/ev-charging-cost\\"" not in footer_content:
    footer_replacement = \"\"\"              <li>
                <Link href="/home-charging" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Home Charging Economics
                </Link>
              </li>
              <li>
                <Link href="/ev-charging-cost" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  EV Charging Cost & Savings
                </Link>
              </li>\"\"\"
    footer_content = footer_content.replace('              <li>\\n                <Link href="/home-charging" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">\\n                  Home Charging Economics\\n                </Link>\\n              </li>', footer_replacement)
    with open('/app/applet/components/Footer.tsx', 'w') as f:
        f.write(footer_content)

print("EV Charging Cost tool created and linked successfully.")
