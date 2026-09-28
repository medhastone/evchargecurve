export interface TopicHubCalculator {
  name: string;
  href: string;
  description: string;
  metricLabel: string;
}

export interface TopicHubGuide {
  title: string;
  href: string;
  summary: string;
  readTime: string;
}

export interface TopicHubFaq {
  question: string;
  answer: string;
}

export interface TopicHubData {
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  keyTakeaways: string[];
  physicsAndMath: {
    formulaTitle: string;
    formula: string;
    explanation: string;
  };
  featuredCalculators: TopicHubCalculator[];
  featuredVehicleSlugs: string[];
  deepDiveGuides: TopicHubGuide[];
  relatedHubSlugs: string[];
  faqs: TopicHubFaq[];
}

export const TOPIC_HUBS: Record<string, TopicHubData> = {
  'ev-charging-curves': {
    slug: 'ev-charging-curves',
    title: 'EV Charging Curves',
    shortTitle: 'Charging Curves',
    badge: 'Core Physics',
    metaTitle: 'EV Charging Curves Hub: Physics, Taper Curves & Dwell Times | EVChargeCurve',
    metaDescription: 'Explore empirical EV DC fast charging curves across 50+ models. Learn how battery management systems modulate C-rates, thermal tapers, and 10–80% session times.',
    h1: 'EV Charging Curves: Empirical Battery Telemetry & Taper Analysis',
    summary: 'An electric vehicle charging curve maps the maximum charging power (kW) accepted by the battery pack across State of Charge (0% to 100%). Because battery cells experience rising internal resistance and electrochemical saturation as they fill, charging power is not constant—it tapers aggressively to protect cell chemistry.',
    keyTakeaways: [
      'Peak kW is only sustained for a brief window (typically 10% to 35% SoC).',
      'Average kW delivery between 10% and 80% determines real road trip charging speed, not marketing peak kW.',
      'Battery thermal management and pack voltage architecture dictate how steep the taper profile is.',
      'Discrete Riemann numerical integration accurately predicts session dwell times under varying ambient temperatures.'
    ],
    physicsAndMath: {
      formulaTitle: 'Numerical Energy Integration (Riemann Dwell Time)',
      formula: 't(SoC_1 \\to SoC_2) = \\int_{SoC_1}^{SoC_2} \\frac{C_{usable}}{P(s) \\cdot \\eta_{inverter}} \\, ds \\approx \\sum_{i} \\frac{\\Delta SoC \\cdot C_{usable}}{P(SoC_i) \\cdot \\eta}',
      explanation: 'Session charging duration is calculated by integrating usable battery capacity over power delivery at each discrete state-of-charge increment, adjusted for thermal resistance and inverter conversion efficiency.'
    },
    featuredCalculators: [
      {
        name: 'DC Fast Charge Curve Simulator',
        href: '/',
        description: 'Simulate full charging curves and taper step-downs with real telemetry.',
        metricLabel: '10–80% Dwell Time'
      },
      {
        name: 'Side-by-Side EV Charging Comparison',
        href: '/compare',
        description: 'Compare charging curves, 15-minute range recovered, and 400V vs 800V speeds.',
        metricLabel: 'Dual Vehicle Delta'
      },
      {
        name: 'Mathematical Simulation Engine Methodology',
        href: '/how-it-works',
        description: 'Deep dive into CAN-bus telemetry validation and electrochemical formulas.',
        metricLabel: 'Integration Math'
      }
    ],
    featuredVehicleSlugs: [
      'tesla-model-y-lr',
      'hyundai-ioniq-5',
      'porsche-taycan-plus',
      'lucid-air-grand-tour',
      'kia-ev6-long-range'
    ],
    deepDiveGuides: [
      {
        title: 'How EV Charging Curves Work: Physics & Simulation Math',
        href: '/how-it-works',
        summary: 'Explore the thermodynamic equations, CAN-bus telemetry benchmarks, and BMS firmware limits.',
        readTime: '8 min read'
      },
      {
        title: 'Level 3 EV Charger Explained: Speeds, kW Power & Costs',
        href: '/blog/level-3-ev-charger',
        summary: 'Comprehensive engineering guide to 50kW–350kW DC fast charging hardware and electrical grid connections.',
        readTime: '10 min read'
      }
    ],
    relatedHubSlugs: ['dc-fast-charging', 'charging-taper', '10-80-charging', '400v-vs-800v'],
    faqs: [
      {
        question: 'Why does an EV charging curve decline after 50% SoC?',
        answer: 'As lithium ions migrate and saturate the battery anode, internal cell resistance and polarization increase. To prevent metallic lithium plating and excessive heat generation, the BMS reduces incoming amperage.'
      },
      {
        question: 'What is the difference between peak kW and average kW?',
        answer: 'Peak kW is the momentary maximum power reached under optimal battery temperatures at low SoC. Average kW is the mean power delivered across the entire session (typically 10% to 80%), which is the actual determinant of charging time.'
      }
    ]
  },

  'dc-fast-charging': {
    slug: 'dc-fast-charging',
    title: 'DC Fast Charging',
    shortTitle: 'DC Fast Charging',
    badge: 'High-Power Infrastructure',
    metaTitle: 'DC Fast Charging (Level 3) Hub: Speeds, Connectors & kW | EVChargeCurve',
    metaDescription: 'Master DC fast charging fundamentals: 50kW to 350kW dispensers, CCS vs NACS standards, liquid-cooled cables, and high-voltage grid converter stations.',
    h1: 'DC Fast Charging (Level 3): High-Power Infrastructure & Standards',
    summary: 'Direct Current Fast Charging (DCFC), commonly referred to as Level 3, bypasses the vehicle’s onboard AC converter and feeds high-voltage DC electricity directly into the traction battery pack. Commercial dispensers range from 50 kW to 400 kW, enabling 100 to 200 miles of driving range in 15 to 30 minutes.',
    keyTakeaways: [
      'DCFC bypasses onboard AC chargers, feeding direct current at up to 1000V and 500A.',
      'Dispensers use liquid-cooled cables to handle high current loads without thermal failure.',
      'North America is transitioning from CCS1 to the SAE J3400 (NACS) standard.',
      'Real-world charging speed is always constrained by whichever is lower: charger rating or vehicle BMS acceptance limit.'
    ],
    physicsAndMath: {
      formulaTitle: 'Electrical Power Acceptance Law',
      formula: 'P_{DC} = V_{pack}(SoC) \\times I_{dispenser} \\le \\min(P_{charger\\_max}, P_{bms\\_limit}(T_{cell}, SoC))',
      explanation: 'Delivered DC power equals instantaneous pack voltage multiplied by dispenser current limit, capped strictly by the minimum between charger capability and BMS thermal limits.'
    },
    featuredCalculators: [
      {
        name: 'DC Fast Charge Curve Simulator',
        href: '/',
        description: 'Simulate 50kW, 150kW, and 350kW charger speeds on real vehicle curves.',
        metricLabel: 'Session Dwell'
      },
      {
        name: 'kW to Miles Added Per Hour Sizer',
        href: '/kw-to-miles',
        description: 'Convert DC fast charging kW rates directly into driving miles added per hour.',
        metricLabel: 'mph Added'
      },
      {
        name: 'Destination vs DC Fast Charging Sizer',
        href: '/destination-charging',
        description: 'Determine if high-speed DC stops can be replaced by overnight destination charging.',
        metricLabel: 'Trip Dwell'
      }
    ],
    featuredVehicleSlugs: [
      'kia-ev6-long-range',
      'rivian-r1t-large',
      'ford-f150-lightning-er',
      'bmw-i4-edrive40',
      'audi-etron-gt'
    ],
    deepDiveGuides: [
      {
        title: 'Level 3 EV Charger Explained: 50kW–350kW Speeds, kW Power & Costs',
        href: '/blog/level-3-ev-charger',
        summary: 'Detailed teardown of DCFC transformers, rectifiers, and commercial charging cost structures.',
        readTime: '10 min read'
      },
      {
        title: 'How Long Does It Take to Charge an Electric Car? Real-World Guide',
        href: '/how-long-to-charge-an-electric-car',
        summary: 'Compare Level 1, Level 2, and Level 3 DC fast charge speeds across vehicle classes.',
        readTime: '12 min read'
      }
    ],
    relatedHubSlugs: ['ev-charging-curves', '400v-vs-800v', '10-80-charging', 'ev-road-trip-charging'],
    faqs: [
      {
        question: 'Can any EV plug into a 350 kW DC fast charger?',
        answer: 'Yes, if the physical connector matches (or an approved adapter is used). The vehicle BMS dynamically negotiates voltage and current with the dispenser, safely accepting only its maximum allowable power.'
      },
      {
        question: 'Does DC fast charging damage the battery pack?',
        answer: 'Frequent high-current DC fast charging generates heat and mechanical stress on electrode particles. However, modern liquid-cooled battery thermal systems mitigate excessive degradation, keeping capacity loss to approximately 1–2% additional degradation over 5 years compared to AC-only charging.'
      }
    ]
  },

  'ev-charging-time': {
    slug: 'ev-charging-time',
    title: 'EV Charging Time',
    shortTitle: 'Charging Time',
    badge: 'Duration Modeling',
    metaTitle: 'EV Charging Time Hub: Level 1, 2 & DC Fast Charge Durations | EVChargeCurve',
    metaDescription: 'Calculate how long it takes to charge an electric car across 120V Level 1, 240V Level 2, and 350kW DC fast charging. Understand charging tables and real dwell times.',
    h1: 'EV Charging Time: Comprehensive Speed Tables & Calculation Models',
    summary: 'EV charging time varies from 40 hours on a standard 120V household wall outlet to under 18 minutes on an ultra-fast 800V DC dispenser. Charging duration is governed by battery pack size (kWh), starting and target SoC, supply power (kW), and onboard charger limits.',
    keyTakeaways: [
      'Level 1 (120V / 12A / 1.4 kW) adds 3–5 miles of range per hour (40–50 hours for 0–100%).',
      'Level 2 (240V / 32A–48A / 7.7–11.5 kW) adds 25–45 miles per hour (6–9 hours overnight full charge).',
      'DC Fast Charging (50–350 kW) adds 100–250 miles of range in 15–30 minutes.',
      'Charging from 80% to 100% on a DCFC can take as long as charging from 10% to 80% due to the BMS taper.'
    ],
    physicsAndMath: {
      formulaTitle: 'Linear vs Integrated Time Equation',
      formula: 't_{AC} = \\frac{C_{usable} \\cdot (SoC_{target} - SoC_{initial})}{P_{EVSE} \\cdot \\eta_{onboard}}, \\quad t_{DC} = \\sum_{i} \\frac{\\Delta SoC \\cdot C_{usable}}{P(SoC_i)}',
      explanation: 'AC charging time is largely linear because onboard AC chargers deliver constant current. DC fast charging time requires discrete integration due to non-linear BMS power step-downs.'
    },
    featuredCalculators: [
      {
        name: 'How Long to Charge an Electric Car Guide',
        href: '/how-long-to-charge-an-electric-car',
        description: 'Interactive level-by-level duration calculator with complete vehicle speed tables.',
        metricLabel: 'Full Sizer'
      },
      {
        name: 'kW to Miles per Hour Converter',
        href: '/kw-to-miles',
        description: 'Calculate driving range added per hour at any charging kilowatt rate.',
        metricLabel: 'Speed Conversion'
      },
      {
        name: 'Level 2 Home Charging Time Sizer',
        href: '/home-charging',
        description: 'Size overnight charging times and determine daily replenishment requirements.',
        metricLabel: 'Overnight Hours'
      }
    ],
    featuredVehicleSlugs: [
      'chevrolet-bolt-ev',
      'tesla-model-3-lr',
      'hyundai-ioniq-6-long-range',
      'volkswagen-id4-pro',
      'nissan-leaf-plus'
    ],
    deepDiveGuides: [
      {
        title: 'How Long Does It Take to Charge an Electric Car? Real-World Guide',
        href: '/how-long-to-charge-an-electric-car',
        summary: 'Complete engineering guide explaining Level 1, Level 2, and Level 3 DC fast charging times.',
        readTime: '12 min read'
      },
      {
        title: 'NEMA 14-50 EV Charging Speed, Wiring & Cost: Complete Guide',
        href: '/blog/nema-14-50-ev-charging-guide',
        summary: 'Learn how fast a 240V 50A circuit charges an EV and how to prevent circuit overheating.',
        readTime: '9 min read'
      }
    ],
    relatedHubSlugs: ['10-80-charging', 'home-charging', 'ev-charging-curves', 'dc-fast-charging'],
    faqs: [
      {
        question: 'Why does charging from 80% to 100% take so long?',
        answer: 'To prevent lithium plating and cathode degradation at high cell voltages, the battery management system reduces current to trickle levels (often dropping below 15–20 kW on DC chargers).'
      },
      {
        question: 'How long does a 48A home charger take to fully recharge an EV?',
        answer: 'A 48A hardwired Level 2 charger delivers 11.5 kW. For a typical 75 kWh battery pack, recharging from 10% to 90% takes approximately 5.5 to 6 hours.'
      }
    ]
  },

  '10-80-charging': {
    slug: '10-80-charging',
    title: '10–80% Charging',
    shortTitle: '10–80% Window',
    badge: 'Road Trip Strategy',
    metaTitle: '10–80% EV Charging Hub: Why the 10–80% Window Is Optimal | EVChargeCurve',
    metaDescription: 'Discover why 10–80% is the golden window for EV road tripping. Compare 10–80% charging times, miles recovered per minute, and highway dwell strategies.',
    h1: '10–80% EV Charging: The Industry Standard Road Trip Sweet Spot',
    summary: 'The 10% to 80% State of Charge window represents the electrochemical sweet spot for DC fast charging. In this zone, battery cells accept peak and sustained high amperage with minimal thermal throttling. Once SoC exceeds 80%, the BMS reduces power drastically, making continued dwell time inefficient on long road trips.',
    keyTakeaways: [
      'The 10–80% window captures 70% of total pack energy while avoiding the steep post-80% taper.',
      '800V vehicles (Ioniq 5, EV6, Taycan) complete 10–80% in 18 minutes; 400V vehicles average 25–35 minutes.',
      'Staying at a DC fast charger past 80% can double your session time while only adding 20% range.',
      'Arriving at chargers at low SoC (10–15%) maximizes initial kW acceptance.'
    ],
    physicsAndMath: {
      formulaTitle: 'Miles Recovered Rate Derivative',
      formula: '\\dot{R}(SoC) = \\frac{P(SoC) \\cdot \\eta_{chg}}{\\text{Wh/mi}} = \\text{Range Added per Minute}',
      explanation: 'The rate of driving range added per minute peaks between 10% and 50% SoC (often 10–15 miles/min) and collapses to under 2–3 miles/min beyond 80% SoC.'
    },
    featuredCalculators: [
      {
        name: 'DC Fast Charge Curve Simulator',
        href: '/',
        description: 'Simulate exact 10–80% charging times and view live kW drop-offs.',
        metricLabel: '10–80% Dwell'
      },
      {
        name: 'Multi-Vehicle 10–80% Faceoff',
        href: '/compare',
        description: 'Compare 10–80% dwell times and 15-minute range recovered side-by-side.',
        metricLabel: 'Dwell Delta'
      },
      {
        name: 'Battery Preconditioning Sizer',
        href: '/preconditioning',
        description: 'Calculate how preheating the battery pack cuts 10–80% highway charging time.',
        metricLabel: 'Time Saved'
      }
    ],
    featuredVehicleSlugs: [
      'hyundai-ioniq-5',
      'porsche-taycan-plus',
      'tesla-model-y-lr',
      'kia-ev6-long-range',
      'lucid-air-grand-tour'
    ],
    deepDiveGuides: [
      {
        title: 'How EV Charging Curves Work: Physics & Simulation Math',
        href: '/how-it-works',
        summary: 'Learn why the 10–80% zone sustains optimal C-rates before thermal step-downs occur.',
        readTime: '8 min read'
      },
      {
        title: 'EV Cold Weather Charging: Fix Slow Winter Charging & Cold-Gating',
        href: '/blog/the-cold-gate-dilemma',
        summary: 'Overcoming cold-gate throttling to achieve target 10–80% charging times in winter.',
        readTime: '7 min read'
      }
    ],
    relatedHubSlugs: ['ev-charging-curves', 'charging-taper', '400v-vs-800v', 'ev-road-trip-charging'],
    faqs: [
      {
        question: 'Why is 10% to 80% used as the standard benchmark?',
        answer: 'Automakers and testing laboratories use 10% to 80% because it standardizes highway driving patterns: drivers arrive with a 10% safety buffer and depart when charging speed drops below an efficient threshold at 80%.'
      },
      {
        question: 'Should I ever charge past 80% at a DC fast charger?',
        answer: 'Only if your next charging stop or destination is far enough away that the additional 20% range is strictly required to reach it without stranding.'
      }
    ]
  },

  'charging-taper': {
    slug: 'charging-taper',
    title: 'Charging Taper',
    shortTitle: 'Charging Taper',
    badge: 'Electrochemical Dynamics',
    metaTitle: 'EV Charging Taper Hub: Step-Down Physics, C-Rates & Limits | EVChargeCurve',
    metaDescription: 'Understand why EV charging curves taper: battery cell saturation, electrolyte resistance, C-rate ceilings, and BMS thermal step-down algorithms.',
    h1: 'EV Charging Taper: Battery Saturation & BMS Thermal Step-Downs',
    summary: 'A charging taper is the programmed reduction in electrical power delivered by the Battery Management System (BMS) as the battery pack approaches full capacity. This gradual step-down protects the cathode and anode from overvoltage, overheating, and irreversible lithium plating.',
    keyTakeaways: [
      'Tapering begins when individual cell voltages approach their maximum threshold (typically 4.2V for NMC, 3.65V for LFP).',
      'The charging cycle transitions from Constant Current (CC) to Constant Voltage (CV).',
      'Cold battery packs taper prematurely due to elevated internal resistance (cold-gating).',
      'Different automakers employ stepped tapers (discrete power drops) vs smooth slope tapers.'
    ],
    physicsAndMath: {
      formulaTitle: 'Ohmic Heating & Overpotential Saturation',
      formula: 'V_{terminal} = V_{OCV}(SoC) + I_{chg} \\cdot R_{int}(T, SoC) + \\eta_{polarization}',
      explanation: 'As internal resistance and open circuit voltage rise, charging current must be reduced so terminal voltage does not exceed the safe chemical ceiling of the cell.'
    },
    featuredCalculators: [
      {
        name: 'DC Fast Charge Curve Simulator',
        href: '/',
        description: 'Observe where the taper starts on 50+ real EV battery curves.',
        metricLabel: 'Taper Start SoC'
      },
      {
        name: 'Battery Preconditioning Sizer',
        href: '/preconditioning',
        description: 'See how optimal preconditioning delays the onset of thermal tapers.',
        metricLabel: 'Taper Delay'
      },
      {
        name: 'Battery Degradation & State of Health Tool',
        href: '/battery-health',
        description: 'Model how high-current taper zones influence 10-year battery State of Health.',
        metricLabel: 'Degradation Impact'
      }
    ],
    featuredVehicleSlugs: [
      'tesla-model-s-plaid',
      'genesis-gv60-performance',
      'mercedes-eqs-580',
      'polestar-2-lr',
      'hyundai-ioniq-5'
    ],
    deepDiveGuides: [
      {
        title: 'EV Battery Degradation: Calendar Aging vs Fast Charging',
        href: '/blog/lithium-ion-battery-degradation',
        summary: 'Understand SEI layer growth, mechanical cracking, and how BMS tapers protect longevity.',
        readTime: '11 min read'
      },
      {
        title: 'EV Cold Weather Charging: Fix Slow Winter Charging & Cold-Gating',
        href: '/blog/the-cold-gate-dilemma',
        summary: 'Learn why cold batteries trigger premature tapers and how to prevent it.',
        readTime: '7 min read'
      }
    ],
    relatedHubSlugs: ['ev-charging-curves', '10-80-charging', 'battery-preconditioning', '400v-vs-800v'],
    faqs: [
      {
        question: 'What is the difference between a stepped taper and a smooth taper?',
        answer: 'A stepped taper lowers power in discrete stages (e.g., 200 kW -> 150 kW -> 100 kW -> 50 kW), whereas a smooth taper continuously scales down amperage linearly or parabolically in response to continuous sensor feedback.'
      },
      {
        question: 'Why do LFP batteries have different taper behavior than NMC batteries?',
        answer: 'LFP (lithium iron phosphate) cells operate at a lower nominal voltage (3.2V) and have a very flat voltage curve across 20–80% SoC, allowing more stable current acceptance before a sharp taper near 90–95%.'
      }
    ]
  },

  '400v-vs-800v': {
    slug: '400v-vs-800v',
    title: '400V vs 800V Architecture',
    shortTitle: '400V vs 800V',
    badge: 'Electrical Architecture',
    metaTitle: '400V vs 800V EV Charging Architecture Hub: Math, Speeds & Cables | EVChargeCurve',
    metaDescription: 'Compare 400V vs 800V electric vehicle architectures. Understand how doubling voltage enables 350kW charging, halves current, cuts cable weight, and slashes dwell times.',
    h1: '400V vs 800V EV Architecture: High-Voltage Physics & Speed Comparison',
    summary: 'Electric vehicle battery packs operate on either ~400V or ~800V nominal architectures. By doubling the pack voltage, an 800V vehicle delivers the same kilowatt charging power with half the electrical amperage ($P = V \\times I$), drastically reducing resistive heat losses ($I^2R$) and overcoming the 500A current limit of standard liquid-cooled charging cables.',
    keyTakeaways: [
      'Standard CCS/NACS charging cables are thermally capped at 500 Amps continuous current.',
      'On a 400V pack, 500A yields a maximum theoretical power of ~200 kW ($400\\text{V} \\times 500\\text{A}$).',
      'On an 800V pack, 500A enables full 350–400 kW charging, cutting 10–80% charge times to under 18 minutes.',
      '800V vehicles require onboard DC-DC boost converters or battery reconfiguration to charge at older 400V Superchargers.'
    ],
    physicsAndMath: {
      formulaTitle: 'Joule Heating & Current Scaling Law',
      formula: 'P_{loss} = I^2 \\cdot R_{cable}, \\quad P_{charge} = V_{pack} \\times I \\implies I = \\frac{P_{charge}}{V_{pack}}',
      explanation: 'Doubling voltage cuts current in half for identical charging power, reducing thermal resistive heat dissipation in wiring harnesses and battery cells by a factor of 4 ($75\\%$ reduction).'
    },
    featuredCalculators: [
      {
        name: '400V vs 800V Side-by-Side Faceoff',
        href: '/compare',
        description: 'Directly compare 400V (Tesla Model Y) against 800V (Hyundai Ioniq 5 / Porsche Taycan).',
        metricLabel: 'Architecture Delta'
      },
      {
        name: 'DC Fast Charge Simulator',
        href: '/',
        description: 'Toggle between 400V and 800V vehicle curves to see real-world taper profiles.',
        metricLabel: 'Voltage Benchmark'
      },
      {
        name: 'kW to Miles Added Converter',
        href: '/kw-to-miles',
        description: 'See how 800V vehicles add up to 20 miles of range per minute of charging.',
        metricLabel: 'Range Velocity'
      }
    ],
    featuredVehicleSlugs: [
      'hyundai-ioniq-5',
      'porsche-taycan-plus',
      'tesla-cybertruck-awd',
      'kia-ev6-long-range',
      'tesla-model-y-lr'
    ],
    deepDiveGuides: [
      {
        title: 'Level 3 EV Charger Explained: Speeds, kW Power & Costs',
        href: '/blog/level-3-ev-charger',
        summary: 'Explore how 800V battery architectures interact with 400V vs 800V DCFC dispensers.',
        readTime: '10 min read'
      },
      {
        title: 'How EV Charging Curves Work: Physics & Simulation Math',
        href: '/how-it-works',
        summary: 'Electrochemical mathematics of high-voltage battery architecture and inverter losses.',
        readTime: '8 min read'
      }
    ],
    relatedHubSlugs: ['ev-charging-curves', 'dc-fast-charging', '10-80-charging', 'ev-road-trip-charging'],
    faqs: [
      {
        question: 'Can an 800V EV charge at a 400V Tesla Supercharger or 150 kW DCFC station?',
        answer: 'Yes. 800V vehicles incorporate either an onboard DC-DC boost converter (like Porsche Taycan and Lucid Air) or split-pack switching / motor-inverter step-up systems (like Hyundai E-GMP and GM Ultium) to step up 400V input to ~800V.'
      },
      {
        question: 'Why are not all new EVs built on 800V architectures?',
        answer: '800V systems require Silicon Carbide (SiC) power semiconductors, higher-grade insulation, and more expensive componentry across the inverter, compressor, and cabin heater, increasing manufacturing costs.'
      }
    ]
  },

  'battery-preconditioning': {
    slug: 'battery-preconditioning',
    title: 'Battery Preconditioning',
    shortTitle: 'Preconditioning',
    badge: 'Thermal Management',
    metaTitle: 'EV Battery Preconditioning Hub: Cold-Gate Physics & Time Saved | EVChargeCurve',
    metaDescription: 'Master EV battery preconditioning: thermal heating algorithms, energy consumption trade-offs, cold-gate prevention, and net road trip time savings.',
    h1: 'EV Battery Preconditioning: Thermal Optimization & Net Time Savings',
    summary: 'Battery preconditioning actively heats or cools the high-voltage battery pack before arriving at a DC fast charger. Bringing the cell temperature to its optimal electrochemical window (typically 25°C to 35°C / 77°F to 95°F) ensures the vehicle can immediately accept maximum peak charging power without cold-gating or safety throttling.',
    keyTakeaways: [
      'Cold battery cells suffer from elevated internal resistance, causing chargers to throttle power by 40% to 70%.',
      'Preconditioning typically consumes 3 to 6 kWh of battery energy over 20–45 minutes of driving.',
      'The 5–10% range sacrificed heating the pack is easily repaid by saving 15–30 minutes of dwell time at the charger.',
      'Activating built-in vehicle navigation to a DC fast charger is the primary way to trigger automatic preconditioning.'
    ],
    physicsAndMath: {
      formulaTitle: 'Net Road Trip Time Benefit Equation',
      formula: '\\Delta t_{net} = \\Delta t_{charging\\_saved} - \\Delta t_{energy\\_recovery} = (t_{cold} - t_{precon}) - \\frac{E_{precon}}{\\bar{P}_{DCFC}}',
      explanation: 'Net time saved equals the charging dwell reduction from warm cells minus the extra minute or two needed to replenish the 3–6 kWh expended by the thermal heater.'
    },
    featuredCalculators: [
      {
        name: 'Battery Preconditioning Net Time Sizer',
        href: '/preconditioning',
        description: 'Calculate exact net highway minutes saved vs battery heating energy spent.',
        metricLabel: 'Net Min Saved'
      },
      {
        name: 'Winter Range Loss & Towing Sizer',
        href: '/range-loss',
        description: 'Model how sub-zero temperatures impact highway range and cabin heating draw.',
        metricLabel: 'Range Penalty'
      },
      {
        name: 'DC Fast Charge Curve Simulator',
        href: '/',
        description: 'Simulate cold-battery vs preconditioned charging curves on 50+ models.',
        metricLabel: 'Taper Impact'
      }
    ],
    featuredVehicleSlugs: [
      'tesla-model-y-lr',
      'bmw-ix-xdrive50',
      'genesis-gv70-electrified',
      'porsche-macan-ev',
      'hyundai-ioniq-5'
    ],
    deepDiveGuides: [
      {
        title: 'EV Cold Weather Charging: Fix Slow Winter Charging & Cold-Gating',
        href: '/blog/the-cold-gate-dilemma',
        summary: 'Deep dive into lithium plating risks and thermal management strategies in freezing temperatures.',
        readTime: '7 min read'
      },
      {
        title: 'EV Battery Degradation: Calendar Aging vs Fast Charging',
        href: '/blog/lithium-ion-battery-degradation',
        summary: 'How preconditioning protects lithium anode structures from mechanical cracking and plating.',
        readTime: '11 min read'
      }
    ],
    relatedHubSlugs: ['cold-weather-charging', 'ev-charging-curves', 'charging-taper', 'ev-road-trip-charging'],
    faqs: [
      {
        question: 'How do I know if my EV is preconditioning?',
        answer: 'Most modern EVs display a battery warming icon, heating message, or navigation banner on the instrument cluster when routing to a fast charger.'
      },
      {
        question: 'Can I precondition my EV battery manually?',
        answer: 'Some manufacturers (such as Hyundai/Kia, Porsche, and BMW) offer a manual preconditioning button in the infotainment menu, while others (like Tesla) require setting the charger as the active navigation destination.'
      }
    ]
  },

  'cold-weather-charging': {
    slug: 'cold-weather-charging',
    title: 'Cold Weather Charging',
    shortTitle: 'Cold Weather',
    badge: 'Winter Physics',
    metaTitle: 'Cold Weather EV Charging Hub: Winter Range Loss & Cold-Gate Fixes | EVChargeCurve',
    metaDescription: 'Understand how winter cold impacts EV charging speeds and driving range. Model lithium plating risks, cabin heat pump consumption, and cold-gate fixes.',
    h1: 'Cold Weather EV Charging: Winter Range Loss & Cold-Gate Physics',
    summary: 'Sub-zero ambient temperatures significantly impact electric vehicle performance. In cold weather, battery electrolyte viscosity increases, lithium-ion mobility slows, and cabin heating increases parasitic electrical load—causing 20% to 40% range loss and dramatic DC fast charging throttling.',
    keyTakeaways: [
      'Cold battery electrolyte slows ion diffusion, causing severe "cold-gate" charging speed limits.',
      'Fast charging a freezing battery without preconditioning risks permanent metallic lithium plating.',
      'Cabin heating via resistive PTC elements consumes up to 5–7 kW, whereas heat pumps consume only 1.5–2.5 kW.',
      'Preheating the cabin and battery pack while plugged into home Level 2 AC power preserves driving range.'
    ],
    physicsAndMath: {
      formulaTitle: 'Arrhenius Ionic Conductivity in Cold Electrolytes',
      formula: '\\sigma(T) = \\sigma_0 \\cdot \\exp\\left(-\\frac{E_a}{k_B \\cdot T}\\right), \\quad R_{internal} \\propto \\frac{1}{\\sigma(T)}',
      explanation: 'Ionic conductivity decreases exponentially as temperature drops, causing cell internal resistance to spike and forcing the BMS to throttle charging amperage to prevent dendrite formation.'
    },
    featuredCalculators: [
      {
        name: 'Winter Range Loss & Aerodynamic Drag Tool',
        href: '/range-loss',
        description: 'Model sub-zero range loss, heat pump vs PTC draw, and winter tire penalties.',
        metricLabel: 'Winter Range'
      },
      {
        name: 'Battery Preconditioning Sizer',
        href: '/preconditioning',
        description: 'Calculate time saved at winter DC fast chargers by preheating the battery.',
        metricLabel: 'Winter Dwell'
      },
      {
        name: 'Vampire Drain & Airport Parking Tool',
        href: '/idle-drain',
        description: 'Estimate idle battery drain when parked in freezing weather at airport lots.',
        metricLabel: 'Cold Drain'
      }
    ],
    featuredVehicleSlugs: [
      'ford-mustang-mach-e-er',
      'rivian-r1s-large',
      'tesla-model-y-lr',
      'volvo-ex30-twin',
      'hyundai-ioniq-5'
    ],
    deepDiveGuides: [
      {
        title: 'EV Cold Weather Charging: Fix Slow Winter Charging & Cold-Gating',
        href: '/blog/the-cold-gate-dilemma',
        summary: 'How cold temperatures trigger BMS throttling and practical strategies to maximize winter charging speed.',
        readTime: '7 min read'
      },
      {
        title: 'EV Battery Degradation: Calendar Aging vs Fast Charging',
        href: '/blog/lithium-ion-battery-degradation',
        summary: 'Electrochemical explanation of lithium plating during sub-zero fast charging.',
        readTime: '11 min read'
      }
    ],
    relatedHubSlugs: ['battery-preconditioning', 'ev-charging-curves', 'charging-taper', 'home-charging'],
    faqs: [
      {
        question: 'Why does my EV charge at only 30 kW on a 350 kW charger in winter?',
        answer: 'If the battery pack is near freezing (e.g. 0°C / 32°F) and has not been preconditioned, the BMS restricts incoming current to prevent lithium ions from depositing as solid metallic dendrites on the graphite anode.'
      },
      {
        question: 'Does plugging in at home overnight help in freezing temperatures?',
        answer: 'Yes. Keeping the vehicle plugged in allows the thermal management system to use grid power to maintain the battery above critical minimum temperatures without depleting driving range.'
      }
    ]
  },

  'home-charging': {
    slug: 'home-charging',
    title: 'Home Charging',
    shortTitle: 'Home Charging',
    badge: 'Residential Infrastructure',
    metaTitle: 'EV Home Charging Hub: 240V Level 2, Breaker Sizing & TOU Rates | EVChargeCurve',
    metaDescription: 'Master residential EV charging: 240V Level 2 installations, NEMA 14-50 vs 48A hardwired, electrical panel capacity, and off-peak Time-of-Use savings.',
    h1: 'EV Home Charging: 240V Level 2 Systems, Sizing & Economics',
    summary: 'Over 80% of all electric vehicle charging occurs at home using 240V Level 2 supply equipment (EVSE). Installing a dedicated 240V residential circuit allows drivers to recover 25 to 45 miles of range per hour overnight, taking full advantage of low off-peak Time-of-Use (TOU) electricity rates.',
    keyTakeaways: [
      'Level 2 charging delivers 7.2 kW (30A) to 11.5 kW (48A) on residential 240V single-phase electrical service.',
      'NEC Article 625 mandates the 80% continuous load rule: a 50A breaker supports max 40A charging (9.6 kW).',
      'Hardwired 48A charging requires a 60A circuit and eliminates GFCI breaker tripping issues associated with plug-in receptacles.',
      'Off-peak utility tariffs ($0.05–$0.12/kWh) can reduce annual vehicle fueling costs to under $400/year.'
    ],
    physicsAndMath: {
      formulaTitle: 'NEC Continuous Load & Overnight Replenishment',
      formula: 'I_{continuous} \\le 0.80 \\times I_{breaker}, \\quad P_{EVSE} = 240\\text{V} \\times I_{continuous} \\times 10^{-3}, \\quad E_{overnight} = P_{EVSE} \\times t_{dwell} \\times \\eta_{onboard}',
      explanation: 'Circuit breakers must be sized at 125% of continuous current load, and total overnight kWh delivered is reduced by approximately 10–12% due to AC-to-DC onboard inverter and thermal pump losses.'
    },
    featuredCalculators: [
      {
        name: 'Home Charging Time & Cost Sizer',
        href: '/home-charging',
        description: 'Calculate overnight recharge times across 240V amperage levels and TOU tariffs.',
        metricLabel: 'Overnight Sizer'
      },
      {
        name: 'Electrical Panel Breaker Sizer',
        href: '/panel-capacity',
        description: 'Verify if your 100A or 200A home electrical panel can safely add an EV charger.',
        metricLabel: 'Panel Capacity'
      },
      {
        name: 'Vehicle-to-Home (V2H) Backup Sizer',
        href: '/v2h-backup',
        description: 'Calculate how many days your EV battery can power your home during a blackout.',
        metricLabel: 'V2H Outage Days'
      },
      {
        name: 'Solar Panels to Charge an EV Sizer',
        href: '/solar-to-ev',
        description: 'Calculate how many rooftop solar panels are needed for your annual driving miles.',
        metricLabel: 'Solar Array'
      }
    ],
    featuredVehicleSlugs: [
      'rivian-r1t-large',
      'ford-f150-lightning-er',
      'tesla-model-y-lr',
      'nissan-leaf-plus',
      'chevrolet-bolt-ev'
    ],
    deepDiveGuides: [
      {
        title: 'NEMA 14-50 EV Charging Speed, Wiring & Cost: Complete Guide',
        href: '/blog/nema-14-50-ev-charging-guide',
        summary: 'Complete guide to 240V NEMA 14-50 outlets, 6 AWG copper wire sizing, and industrial receptacles.',
        readTime: '9 min read'
      },
      {
        title: 'Residential Level 2 Charging: 32A vs 40A vs 48A Continuous Load Breaker Sizing',
        href: '/blog/level-2-breaker-sizing-economics',
        summary: 'Compare installation economics, wire gauges, and speed differences between 32A, 40A, and 48A stations.',
        readTime: '8 min read'
      }
    ],
    relatedHubSlugs: ['ev-charging-time', 'ev-charging-cost', 'cold-weather-charging', 'ev-battery-health'],
    faqs: [
      {
        question: 'Should I install a NEMA 14-50 outlet or a hardwired wall connector?',
        answer: 'Hardwired wall connectors are recommended by electricians for EV charging because they support faster 48A charging (on a 60A breaker), eliminate nuisance GFCI breaker trips, and avoid the risk of melting inexpensive standard receptacles.'
      },
      {
        question: 'Can a 100A electrical service panel support an EV charger?',
        answer: 'Yes, if existing residential continuous loads allow it, or by installing an intelligent EV Energy Management System (EVEMS) / smart load shedder that pauses EV charging when other high-power appliances (e.g. electric range, HVAC) are active.'
      }
    ]
  },

  'ev-battery-health': {
    slug: 'ev-battery-health',
    title: 'EV Battery Health',
    shortTitle: 'Battery Health',
    badge: 'Degradation Science',
    metaTitle: 'EV Battery Health Hub: Degradation Kinetics, SoH & Warranties | EVChargeCurve',
    metaDescription: 'Explore EV battery health science: State of Health (SoH) modeling, calendar aging vs fast-charge cycles, LFP vs NMC chemistry, and replacement costs.',
    h1: 'EV Battery Health: Degradation Kinetics, SoH & Chemistry Comparison',
    summary: 'EV traction batteries degrade through two primary mechanisms: calendar aging (time and storage SoC at elevated temperatures) and cyclic aging (charge/discharge throughput and mechanical lattice stress). Modern automotive battery packs retain 85% to 90% of original capacity after 150,000 miles when managed properly.',
    keyTakeaways: [
      'Battery degradation is non-linear: packs lose 3–5% capacity in year 1 during SEI passivation, then stabilize at ~1–1.5% loss per year.',
      'LFP (Lithium Iron Phosphate) cells offer 3,000+ full cycles and tolerate 100% daily charging; NMC cells prefer an 80% daily ceiling.',
      'Excessive heat combined with high State of Charge accelerates calendar degradation exponentially.',
      'Federal regulations mandate minimum 8-year / 100,000-mile battery warranties with a 70% retention threshold.'
    ],
    physicsAndMath: {
      formulaTitle: 'Modified Arrhenius & Square-Root Cycle Degradation',
      formula: 'Q_{loss}(t, N) = A \\cdot \\exp\\left(-\\frac{E_a}{R \\cdot T}\\right) \\cdot t^{0.5} + B \\cdot N^{0.5} \\cdot \\left(\\frac{I_{chg}}{C_{rate}}\\right)^{\\alpha}',
      explanation: 'Total capacity loss is the sum of diffusion-limited calendar aging (governed by temperature and time) and cycle aging (governed by cycle count and fast-charge C-rate stress).'
    },
    featuredCalculators: [
      {
        name: 'Battery Health & Degradation Sizer',
        href: '/battery-health',
        description: 'Calculate 10-year State of Health (SoH) curves based on chemistry, mileage, and fast charging.',
        metricLabel: 'SoH Projector'
      },
      {
        name: 'Out-of-Warranty Battery Replacement Sizer',
        href: '/battery-replacement',
        description: 'Estimate replacement pack and module repair costs across major EV manufacturers.',
        metricLabel: 'Replacement Cost'
      },
      {
        name: 'Phantom Vampire Drain Sizer',
        href: '/idle-drain',
        description: 'Model parasitic battery loss and BMS thermal loop draw during long-term storage.',
        metricLabel: 'Storage Drain'
      }
    ],
    featuredVehicleSlugs: [
      'tesla-model-3-rwd',
      'tesla-model-y-lr',
      'hyundai-ioniq-5',
      'nissan-leaf-plus',
      'ford-mustang-mach-e-er'
    ],
    deepDiveGuides: [
      {
        title: 'EV Battery Degradation: Calendar Aging vs Fast Charging',
        href: '/blog/lithium-ion-battery-degradation',
        summary: 'Comprehensive engineering guide to SEI formation, thermal stress, and cycle life comparisons.',
        readTime: '11 min read'
      },
      {
        title: 'How EV Charging Curves Work: Physics & Simulation Math',
        href: '/how-it-works',
        summary: 'Electrochemical physics of battery internal resistance, C-rates, and BMS safety limits.',
        readTime: '8 min read'
      }
    ],
    relatedHubSlugs: ['charging-taper', 'battery-preconditioning', 'cold-weather-charging', 'home-charging'],
    faqs: [
      {
        question: 'Should I charge my EV to 80% or 100% daily?',
        answer: 'For NMC and NCA chemistry vehicles, automakers recommend setting daily charging limits to 80% to minimize mechanical stress on the cathode. For LFP vehicles, charging to 100% at least once per week is recommended to calibrate the BMS State of Charge sensor.'
      },
      {
        question: 'What is State of Health (SoH)?',
        answer: 'State of Health is the ratio of current usable battery capacity (kWh) to original factory nominal usable capacity (kWh), expressed as a percentage. An SoH of 90% on an 80 kWh battery means 72 kWh usable capacity remains.'
      }
    ]
  },

  'ev-charging-cost': {
    slug: 'ev-charging-cost',
    title: 'EV Charging Cost',
    shortTitle: 'Charging Cost',
    badge: 'Fuel Economics',
    metaTitle: 'EV Charging Cost Hub: Home vs DC Fast Charging Economics & TCO | EVChargeCurve',
    metaDescription: 'Calculate EV charging costs: residential $/kWh vs DC fast charge pricing, cost per mile comparisons, gas savings break-even, and Total Cost of Ownership.',
    h1: 'EV Charging Cost: Home vs DC Fast Charging Economics & Savings',
    summary: 'Fueling an electric vehicle typically costs 60% to 75% less per mile than a comparable gasoline vehicle when charged at home on residential electricity rates. However, commercial DC fast charging networks incorporate demand charges and markups, making understanding charging economics vital for budget-conscious drivers.',
    keyTakeaways: [
      'Home charging costs average $0.03 to $0.05 per mile (at US average $0.16/kWh and 3.5 mi/kWh efficiency).',
      'DC fast charging costs average $0.10 to $0.16 per mile (at $0.35–$0.55/kWh commercial rates).',
      'An average driver traveling 13,500 miles/year saves $1,000 to $1,800 annually in fuel costs over a 28 mpg gas car.',
      'Total Cost of Ownership (TCO) break-even against ICE vehicles typically occurs between years 2 and 4.'
    ],
    physicsAndMath: {
      formulaTitle: 'Cost Per Mile & Annual Fuel Savings Equations',
      formula: 'C_{mi} = \\frac{\\text{Tariff Rate (\\$/kWh)}}{\\text{Efficiency (mi/kWh)} \\cdot \\eta_{chg}}, \\quad \\Delta C_{annual} = \\text{Miles} \\times \\left(\\frac{P_{gas}}{\\text{MPG}} - C_{mi}\\right)',
      explanation: 'True cost per mile incorporates charging efficiency losses (10–15% AC, 5–8% DC), and annual savings measure the net difference against gasoline vehicle fuel consumption.'
    },
    featuredCalculators: [
      {
        name: 'EV Charging Cost & Cost Per Mile Sizer',
        href: '/ev-charging-cost',
        description: 'Calculate charging costs at home and public chargers, with cost per 100 miles.',
        metricLabel: 'Cost Per Mile'
      },
      {
        name: 'EV vs Gas Total Cost of Ownership (TCO)',
        href: '/tco-calculator',
        description: 'Model 5-year break-even, tax credits, depreciation, tire wear, and maintenance.',
        metricLabel: '5-Year TCO'
      },
      {
        name: 'Lifecycle Carbon Offset & Emissions Sizer',
        href: '/carbon-offset',
        description: 'Calculate Well-to-Wheel CO2 reductions and fuel savings equivalents.',
        metricLabel: 'CO2 Saved'
      },
      {
        name: 'Solar to EV Array Sizer',
        href: '/solar-to-ev',
        description: 'Size rooftop solar to achieve $0.00/mile zero-emission EV charging.',
        metricLabel: 'Solar Sizing'
      }
    ],
    featuredVehicleSlugs: [
      'tesla-model-y-lr',
      'toyota-bz4x-awd',
      'hyundai-kona-electric',
      'chevrolet-bolt-ev',
      'ford-f150-lightning-er'
    ],
    deepDiveGuides: [
      {
        title: 'Residential Level 2 Charging: 32A vs 40A vs 48A Continuous Load Breaker Sizing',
        href: '/blog/level-2-breaker-sizing-economics',
        summary: 'Financial analysis of electrical upgrade costs vs long-term energy savings.',
        readTime: '8 min read'
      },
      {
        title: 'Level 3 EV Charger Explained: Speeds, kW Power & Costs',
        href: '/blog/level-3-ev-charger',
        summary: 'Commercial DC fast charging pricing models: per-minute vs per-kWh billing structures.',
        readTime: '10 min read'
      }
    ],
    relatedHubSlugs: ['home-charging', 'ev-charging-time', 'ev-road-trip-charging', 'ev-battery-health'],
    faqs: [
      {
        question: 'How much does it cost to fully charge a 75 kWh EV at home?',
        answer: 'At the US average residential electricity rate of $0.16/kWh, fully recharging a 75 kWh battery (including 10% charging loss) costs approximately $13.20, providing 260 to 300 miles of driving range.'
      },
      {
        question: 'Is public DC fast charging cheaper than gasoline?',
        answer: 'At typical DCFC rates ($0.40–$0.50/kWh), charging costs roughly $0.12–$0.15 per mile, which is comparable to a 35–40 MPG hybrid vehicle but still 30–40% cheaper than an 18–22 MPG truck or SUV.'
      }
    ]
  },

  'ev-road-trip-charging': {
    slug: 'ev-road-trip-charging',
    title: 'EV Road Trip Charging',
    shortTitle: 'Road Trip Charging',
    badge: 'Highway Strategy',
    metaTitle: 'EV Road Trip Charging Hub: Multi-Stop Strategy & Dwell Minimization | EVChargeCurve',
    metaDescription: 'Master EV road trip charging strategy: multi-stop route optimization, 10–80% hopping, hotel destination charging, and highway speed consumption math.',
    h1: 'EV Road Trip Charging: Multi-Stop Strategy & Dwell Time Minimization',
    summary: 'Long-distance EV road tripping requires a different mindset than refueling gasoline cars. Optimal highway charging strategy relies on arriving at high-power DC fast chargers with a low State of Charge (10–15%), charging only through the peak curve sweet spot (up to 55–65%), and departing to make shorter, faster charging stops.',
    keyTakeaways: [
      'Two 15-minute stops in the 10–60% zone are significantly faster than one 45-minute stop to 90%.',
      'Aerodynamic drag increases with the square of velocity: driving at 80 mph consumes 20–25% more energy than 70 mph.',
      'Booking hotels with Level 2 destination charging eliminates the first morning DC fast charge stop entirely.',
      'Always route to the next charger using onboard navigation to ensure active battery preconditioning.'
    ],
    physicsAndMath: {
      formulaTitle: 'Optimal Highway Hop & Aerodynamic Drag Penalty',
      formula: 'F_{drag} = \\frac{1}{2} \\cdot \\rho \\cdot C_d \\cdot A \\cdot v^2, \\quad T_{total\\_trip} = \\frac{D}{v} + \\sum_{k=1}^N t_{dwell}(SoC_{in,k} \\to SoC_{out,k})',
      explanation: 'Total travel time is the sum of driving time (heavily influenced by aerodynamic drag at speed $v$) and cumulative charging dwell times, minimized when $SoC_{out}$ is kept below the steep taper threshold.'
    },
    featuredCalculators: [
      {
        name: 'DC Fast Charge Curve Simulator',
        href: '/',
        description: 'Model exact highway stop durations across 50+ vehicle models.',
        metricLabel: 'Stop Dwell'
      },
      {
        name: 'Multi-Vehicle Charging Faceoff',
        href: '/compare',
        description: 'Compare 15-minute miles recovered between 400V and 800V vehicles.',
        metricLabel: '15-Min Miles'
      },
      {
        name: 'Hotel Destination Charger Sizer',
        href: '/destination-charging',
        description: 'Calculate overnight hotel range replenishment and eliminated road trip stops.',
        metricLabel: 'Hotel Dwell'
      },
      {
        name: 'Highway Winter Range & Towing Sizer',
        href: '/range-loss',
        description: 'Model cold temperature and trailer drag range impacts on long highway corridors.',
        metricLabel: 'Highway Loss'
      }
    ],
    featuredVehicleSlugs: [
      'lucid-air-grand-tour',
      'tesla-model-s-plaid',
      'porsche-taycan-plus',
      'kia-ev9-long-range',
      'hyundai-ioniq-6-long-range'
    ],
    deepDiveGuides: [
      {
        title: 'Level 3 EV Charger Explained: Speeds, kW Power & Costs',
        href: '/blog/level-3-ev-charger',
        summary: 'How to identify 150kW vs 350kW dispensers along major interstate corridors.',
        readTime: '10 min read'
      },
      {
        title: 'EV Cold Weather Charging: Fix Slow Winter Charging & Cold-Gating',
        href: '/blog/the-cold-gate-dilemma',
        summary: 'Crucial winter road trip precautions to prevent cold-gate delays and unexpected range deficits.',
        readTime: '7 min read'
      }
    ],
    relatedHubSlugs: ['10-80-charging', '400v-vs-800v', 'battery-preconditioning', 'dc-fast-charging'],
    faqs: [
      {
        question: 'Is it better to make fewer long charging stops or more frequent short stops?',
        answer: 'More frequent short stops (15–20 minutes) between 10% and 60% SoC are substantially faster overall because you spend all your charging time at peak kW acceptance before the taper begins.'
      },
      {
        question: 'How much does driving 80 mph vs 70 mph affect road trip charging stops?',
        answer: 'Due to aerodynamic drag scaling with the square of speed, cruising at 80 mph increases energy consumption by ~20%, often forcing an extra charging stop on a 500-mile journey.'
      }
    ]
  }
};

export const TOPIC_HUB_SLUGS = Object.keys(TOPIC_HUBS);

export function getTopicHub(slug: string): TopicHubData | undefined {
  return TOPIC_HUBS[slug];
}

export function getAllTopicHubs(): TopicHubData[] {
  return Object.values(TOPIC_HUBS);
}
