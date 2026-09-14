'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ShieldCheck, Wrench, AlertTriangle, Layers, DollarSign } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Replacement Costs',
    question: 'How much does it really cost to replace an electric car battery out of warranty?',
    answer: (
      <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
        <p>
          Contrary to sensationalized headlines citing flat $20,000 to $30,000 quotes, the actual{' '}
          <strong>cost to replace electric car battery</strong> out of warranty depends directly on cell chemistry, pack capacity, and the chosen service pathway:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
          <li>
            <strong>Brand-New OEM Pack (Dealership):</strong> Averages <strong>$10,000 to $18,500</strong> for standard 60–90 kWh packs, and up to $22,000+ for massive 130+ kWh truck batteries (like the Ford F-150 Lightning ER).
          </li>
          <li>
            <strong>Remanufactured / Refurbished Pack (Certified Independent):</strong> Ranges from <strong>$4,800 to $8,500</strong>. These packs use healthy original modules rebalanced to 90%+ State of Health with a 1-to-2-year warranty.
          </li>
          <li>
            <strong>Module-Level Repair (Single Bad Cell Swapping):</strong> Typically costs <strong>$1,200 to $2,500</strong> all-in, including high-voltage bench diagnostics and cell balancing.
          </li>
        </ul>
        <p>
          Factoring in the <strong>$1,200 to $2,500 core scrap credit</strong> for your old battery significantly reduces the net out-of-pocket invoice. You can test your exact make and pack size using our{' '}
          <a href="#battery-replacement-calculator" className="text-emerald-400 underline font-medium">
            ev battery replacement cost calculator
          </a>.
        </p>
      </div>
    )
  },
  {
    id: 'faq-2',
    category: 'Battery Longevity',
    question: 'Do EV batteries really need to be replaced every 8 to 10 years?',
    answer: (
      <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
        <p>
          <strong>No.</strong> Traction batteries in modern liquid-cooled electric vehicles rarely experience sudden, catastrophic failure at the 8-to-10-year mark. Instead, lithium-ion cells exhibit gradual, predictable chemical capacity loss:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
          <li>
            <strong>Empirical Fleet Degradation:</strong> Real-world telemetry across millions of vehicles shows average degradation rates of only <strong>1.2% to 1.8% per year</strong>. At 150,000 miles (10–12 years), most EVs still retain 82% to 88% of their original driving range.
          </li>
          <li>
            <strong>LFP vs. NMC Chemistries:</strong> Lithium Iron Phosphate (LFP) packs, such as those in the Tesla Model 3 RWD, endure 3,000 to 4,000 full charge cycles, equating to <strong>300,000 to 500,000 miles</strong> of operational lifespan before reaching the 70% threshold.
          </li>
          <li>
            <strong>Vehicle Retirement:</strong> In over 95% of cases, the vehicle chassis, suspension, or electronics reach end-of-life long before the high-voltage traction pack fails. You can track your personal degradation trajectory using our{' '}
            <Link href="/battery-health" className="text-cyan-400 underline font-medium">
              EV battery degradation calculator & State of Health estimator
            </Link>.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'faq-3',
    category: 'Modular Repair',
    question: 'Can you replace just one bad cell or module instead of the whole battery?',
    answer: (
      <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
        <p>
          <strong>Yes.</strong> When an electric vehicle displays a dashboard warning like &quot;Traction Battery Service Required&quot; or enters limp mode, it is almost never because all thousands of cells died simultaneously. In over <strong>80% of premature pack failures</strong>, the root cause is a single defective module or an internal parallel cell block exhibiting voltage divergence (ΔV &gt; 40 mV).
        </p>
        <p>
          In the <strong>ev battery module repair vs pack replacement</strong> debate:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
          <li>
            Dealerships refuse module repairs because OEM warranty protocols mandate crating the entire pack back to the manufacturer, quoting the customer $15,000 to $20,000.
          </li>
          <li>
            Certified independent high-voltage workshops extract the pack, bench-test each individual module, unbolt the weak cassette, insert a matched donor module with equal impedance, and balance the cell voltages to within 5 millivolts.
          </li>
        </ul>
        <p>
          This isolates the repair to <strong>$1,200 – $2,500</strong>, restoring full drivability without unnecessarily scrapping 90% of healthy cells.
        </p>
      </div>
    )
  },
  {
    id: 'faq-4',
    category: 'Insurance Coverage',
    question: 'Does auto insurance cover EV battery replacement if it gets damaged?',
    answer: (
      <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
        <p>
          The question <strong>does insurance cover ev battery replacement</strong> depends on the root cause of the damage:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
          <li>
            <strong>Covered Under Collision & Comprehensive:</strong> Physical road debris impacts that puncture or dent the high-voltage aluminum armor plate, underbody curb strikes that crush internal cooling ribbons, floodwater immersion that triggers pyrofuse blowouts, or garage structure fires are 100% covered (minus your deductible).
          </li>
          <li>
            <strong>Excluded From Coverage:</strong> Gradual chemical degradation, standard cyclic wear-and-tear, or capacity loss down to 70% are considered mechanical breakdown and are strictly excluded from standard auto policies.
          </li>
          <li>
            <strong>Total Loss Dynamics:</strong> Because an OEM battery pack replacement often costs $12,000 to $20,000, insurers will frequently declare an EV a "constructive total loss" if an underbody scrape scratches the battery shell, even if the vehicle is cosmetically pristine. Check if your insurer offers an "OEM Battery Replacement Endorsement."
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'faq-5',
    category: 'Replacement Warranties',
    question: 'Does an EV battery replacement come with a new warranty?',
    answer: (
      <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
        <p>
          Yes, but the warranty duration and terms differ substantially based on where you source the replacement:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
          <li>
            <strong>Brand-New OEM Replacement:</strong> Typically carries a <strong>3-year to 4-year / 50,000-mile parts warranty</strong> through the automaker's dealer network.
          </li>
          <li>
            <strong>Remanufactured Third-Party Pack:</strong> Reputable independent remanufacturers (such as 057 Technology, Gruber Motor, or EV Clinic) provide a <strong>1-year to 2-year / 24,000-mile warranty</strong> covering module balance and BMS contactor operation.
          </li>
          <li>
            <strong>Module-Level Repair:</strong> Specialized shops typically warranty the <em>specific replaced module and associated busbars</em> for <strong>6 to 12 months</strong>, but do not warranty the remaining original modules in the pack.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'faq-6',
    category: 'Warranty Verification',
    question: 'How do I check if my used EV battery is eligible for a free warranty replacement?',
    answer: (
      <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
        <p>
          If you suspect severe range loss, do not pay out-of-pocket before asserting your factory rights. Under United States federal law (and global equivalents), high-voltage traction batteries carry a mandatory minimum warranty:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
          <li>
            <strong>Federal Minimum:</strong> 8 Years or 100,000 Miles (whichever comes first) with a legal guarantee of at least <strong>70% capacity retention</strong>.
          </li>
          <li>
            <strong>CARB States (CA, NY, MA, WA, OR, etc.):</strong> 10 Years or 150,000 Miles for Partial Zero Emission Vehicles (PZEV) and qualifying zero-emission vehicles.
          </li>
        </ul>
        <p>
          To file a claim: plug an OBD2 reader into your vehicle port using diagnostic apps (e.g., Scan My Tesla, LeafSpy, or Car Scanner Pro) to read your pack's raw Amp-hour (Ah) capacity and cell millivolt delta. If capacity is below 70%, schedule an official capacity test at a franchised dealer for a 100% free factory pack or module replacement.
        </p>
      </div>
    )
  }
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-3" id="faq-accordion">
      {FAQ_ITEMS.map(item => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-xl border border-slate-800 bg-[#131B2A] overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors focus:outline-none"
              aria-expanded={isOpen}
              aria-controls={`${item.id}-answer`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono hidden sm:inline">
                  {item.category}
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-100">
                  {item.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-emerald-400' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div
                id={`${item.id}-answer`}
                className="px-5 pb-5 pt-1 border-t border-slate-800/60"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
