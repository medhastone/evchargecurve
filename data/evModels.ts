export interface ChargingCurvePoint {
  soc: number;
  kw: number;
}

export interface VehicleFaq {
  question: string;
  answer: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: string | number;
  batteryCapacity: number; // Usable / Gross kWh
  usablePackKwh: number;
  epaRangeMiles: number;
  wltpRangeKm?: number;
  maxChargeKw: number;
  architecture: '400V' | '800V' | '900V' | string;
  chemistry: 'NMC' | 'LFP' | 'NCA' | string;
  topCompetitorIds?: string[];
  curve: ChargingCurvePoint[];
  curvePoints?: ChargingCurvePoint[];
  faqs?: VehicleFaq[];
  isCustom?: boolean;
  notes?: string;
  archetype?: string;
}

export const VEHICLES: Record<string, Vehicle> = {
  'tesla-model-y-lr': {
    id: 'tesla-model-y-lr',
    name: 'Tesla Model Y Long Range (2024)',
    brand: 'Tesla',
    model: 'Model Y',
    year: '2024',
    batteryCapacity: 75.0,
    usablePackKwh: 75.0,
    epaRangeMiles: 330,
    wltpRangeKm: 533,
    maxChargeKw: 250,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['hyundai-ioniq-5', 'ford-mustang-mach-e', 'kia-ev6'],
    curve: [
      { soc: 0, kw: 110 },
      { soc: 10, kw: 250 },
      { soc: 20, kw: 250 },
      { soc: 30, kw: 200 },
      { soc: 40, kw: 160 },
      { soc: 50, kw: 120 },
      { soc: 60, kw: 82 },
      { soc: 70, kw: 62 },
      { soc: 80, kw: 46 },
      { soc: 90, kw: 28 },
      { soc: 100, kw: 5 }
    ],
    faqs: [
      { question: "How long does it take to charge a Tesla Model Y from 10% to 80%?", answer: "At a V3 Supercharger (250kW), it typically takes about 27-29 minutes under optimal battery preconditioning." },
      { question: "What is the peak charging speed of the Model Y?", answer: "The Model Y Long Range peaks at 250 kW, usually achieved between 10% and 22% state of charge before thermal tapering." }
    ]
  },
  'tesla-model-3-lr': {
    id: 'tesla-model-3-lr',
    name: 'Tesla Model 3 Long Range AWD (2024 Highland)',
    brand: 'Tesla',
    model: 'Model 3',
    year: '2024',
    batteryCapacity: 78.8,
    usablePackKwh: 78.8,
    epaRangeMiles: 341,
    wltpRangeKm: 629,
    maxChargeKw: 250,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['hyundai-ioniq-6', 'bmw-i4-edrive40', 'polestar-2-lr'],
    curve: [
      { soc: 0, kw: 120 },
      { soc: 10, kw: 250 },
      { soc: 20, kw: 250 },
      { soc: 30, kw: 205 },
      { soc: 40, kw: 165 },
      { soc: 50, kw: 125 },
      { soc: 60, kw: 86 },
      { soc: 70, kw: 65 },
      { soc: 80, kw: 48 },
      { soc: 90, kw: 28 },
      { soc: 100, kw: 6 }
    ],
    faqs: [
      { question: "How fast is Model 3 Highland 10-80% charging?", answer: "Under ideal preconditioned conditions, 10-80% takes approximately 27 minutes at a 250 kW V3/V4 Supercharger." },
      { question: "Can Model 3 use 800V DC fast chargers?", answer: "Yes, via CCS/NACS adapters or Superchargers, but charge power is capped by its 400V battery pack architecture." }
    ]
  },
  'tesla-model-3-rwd-lfp': {
    id: 'tesla-model-3-rwd-lfp',
    name: 'Tesla Model 3 RWD LFP (2024)',
    brand: 'Tesla',
    model: 'Model 3 RWD',
    year: '2024',
    batteryCapacity: 60.0,
    usablePackKwh: 60.0,
    epaRangeMiles: 272,
    wltpRangeKm: 513,
    maxChargeKw: 170,
    architecture: '400V',
    chemistry: 'LFP',
    topCompetitorIds: ['byd-seal-awd', 'volvo-ex30', 'volkswagen-id4-pro'],
    curve: [
      { soc: 0, kw: 90 },
      { soc: 10, kw: 170 },
      { soc: 25, kw: 170 },
      { soc: 40, kw: 140 },
      { soc: 50, kw: 115 },
      { soc: 60, kw: 85 },
      { soc: 70, kw: 65 },
      { soc: 80, kw: 45 },
      { soc: 90, kw: 30 },
      { soc: 100, kw: 8 }
    ],
    faqs: [
      { question: "Should I charge my LFP Model 3 to 100%?", answer: "Yes, Tesla recommends charging LFP (Lithium Iron Phosphate) packs to 100% at least once per week for BMS calibration." }
    ]
  },
  'tesla-cybertruck': {
    id: 'tesla-cybertruck',
    name: 'Tesla Cybertruck Dual-Motor (2024)',
    brand: 'Tesla',
    model: 'Cybertruck',
    year: '2024',
    batteryCapacity: 123.0,
    usablePackKwh: 123.0,
    epaRangeMiles: 318,
    wltpRangeKm: 512,
    maxChargeKw: 325,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['rivian-r1t', 'ford-f150-lightning', 'chevrolet-silverado-ev'],
    curve: [
      { soc: 0, kw: 140 },
      { soc: 10, kw: 325 },
      { soc: 20, kw: 300 },
      { soc: 30, kw: 230 },
      { soc: 40, kw: 180 },
      { soc: 50, kw: 140 },
      { soc: 60, kw: 105 },
      { soc: 70, kw: 80 },
      { soc: 80, kw: 58 },
      { soc: 90, kw: 35 },
      { soc: 100, kw: 10 }
    ],
    faqs: [
      { question: "Does Cybertruck have an 800V battery architecture?", answer: "Yes, Cybertruck uses an 800V nominal pack that can split into two 400V banks when connected to older 400V Superchargers." }
    ]
  },
  'hyundai-ioniq-5': {
    id: 'hyundai-ioniq-5',
    name: 'Hyundai Ioniq 5 AWD (2024)',
    brand: 'Hyundai',
    model: 'Ioniq 5',
    year: '2024',
    batteryCapacity: 77.4,
    usablePackKwh: 77.4,
    epaRangeMiles: 260,
    wltpRangeKm: 481,
    maxChargeKw: 235,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-y-lr', 'kia-ev6', 'porsche-taycan'],
    curve: [
      { soc: 0, kw: 150 },
      { soc: 10, kw: 220 },
      { soc: 20, kw: 235 },
      { soc: 40, kw: 235 },
      { soc: 55, kw: 230 },
      { soc: 70, kw: 180 },
      { soc: 80, kw: 125 },
      { soc: 90, kw: 42 },
      { soc: 100, kw: 10 }
    ],
    faqs: [
      { question: "How long does it take to charge a Hyundai Ioniq 5 from 10% to 80%?", answer: "Thanks to its 800V E-GMP architecture, it charges from 10% to 80% in approximately 18 minutes on a 350kW DC fast charger." },
      { question: "Does the Ioniq 5 charge faster than a Model Y?", answer: "Yes, the Ioniq 5 holds 200+ kW up to 60-70% SOC, resulting in one of the fastest 10-80% charging times in the industry." }
    ]
  },
  'hyundai-ioniq-6': {
    id: 'hyundai-ioniq-6',
    name: 'Hyundai Ioniq 6 Long Range (2024)',
    brand: 'Hyundai',
    model: 'Ioniq 6',
    year: '2024',
    batteryCapacity: 77.4,
    usablePackKwh: 77.4,
    epaRangeMiles: 361,
    wltpRangeKm: 614,
    maxChargeKw: 235,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-3-lr', 'kia-ev6', 'lucid-air-gt'],
    curve: [
      { soc: 0, kw: 150 },
      { soc: 10, kw: 225 },
      { soc: 25, kw: 235 },
      { soc: 50, kw: 235 },
      { soc: 65, kw: 200 },
      { soc: 75, kw: 155 },
      { soc: 80, kw: 120 },
      { soc: 90, kw: 40 },
      { soc: 100, kw: 10 }
    ],
    faqs: [
      { question: "What is the 15-minute range added for Ioniq 6?", answer: "Because of its ultra-low 0.21 Cd aerodynamic drag and 235 kW sustained rate, a 15-minute 800V stop adds up to 215 miles of highway range." }
    ]
  },
  'kia-ev6': {
    id: 'kia-ev6',
    name: 'Kia EV6 GT-Line AWD (2024)',
    brand: 'Kia',
    model: 'EV6',
    year: '2024',
    batteryCapacity: 77.4,
    usablePackKwh: 77.4,
    epaRangeMiles: 252,
    wltpRangeKm: 506,
    maxChargeKw: 235,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['hyundai-ioniq-5', 'tesla-model-y-lr', 'mustang-mach-e'],
    curve: [
      { soc: 0, kw: 150 },
      { soc: 10, kw: 220 },
      { soc: 30, kw: 235 },
      { soc: 55, kw: 230 },
      { soc: 70, kw: 175 },
      { soc: 80, kw: 120 },
      { soc: 90, kw: 40 },
      { soc: 100, kw: 10 }
    ],
    faqs: [
      { question: "What charger is best for Kia EV6?", answer: "To achieve its 18-minute 10-80% charge time, connect to a 350kW 800V DC fast charger with battery preconditioning active." }
    ]
  },
  'kia-ev9': {
    id: 'kia-ev9',
    name: 'Kia EV9 AWD Long Range 99.8kWh (2024)',
    brand: 'Kia',
    model: 'EV9',
    year: '2024',
    batteryCapacity: 99.8,
    usablePackKwh: 96.0,
    epaRangeMiles: 280,
    wltpRangeKm: 505,
    maxChargeKw: 215,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['rivian-r1s', 'tesla-model-x', 'mercedes-eqs-450'],
    curve: [
      { soc: 0, kw: 140 },
      { soc: 10, kw: 215 },
      { soc: 30, kw: 215 },
      { soc: 50, kw: 210 },
      { soc: 65, kw: 180 },
      { soc: 75, kw: 140 },
      { soc: 80, kw: 110 },
      { soc: 90, kw: 45 },
      { soc: 100, kw: 12 }
    ],
    faqs: [
      { question: "How long does the 3-row Kia EV9 take to charge?", answer: "The massive 99.8 kWh pack charges 10-80% in approximately 24 minutes on 800V high-power DC infrastructure." }
    ]
  },
  'porsche-taycan': {
    id: 'porsche-taycan',
    name: 'Porsche Taycan Performance Plus (2025 Gen 2)',
    brand: 'Porsche',
    model: 'Taycan',
    year: '2025',
    batteryCapacity: 97.0,
    usablePackKwh: 97.0,
    epaRangeMiles: 318,
    wltpRangeKm: 678,
    maxChargeKw: 320,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['audi-e-tron-gt', 'lucid-air-gt', 'tesla-model-s-plaid'],
    curve: [
      { soc: 0, kw: 160 },
      { soc: 10, kw: 320 },
      { soc: 20, kw: 320 },
      { soc: 35, kw: 320 },
      { soc: 55, kw: 300 },
      { soc: 65, kw: 240 },
      { soc: 75, kw: 175 },
      { soc: 80, kw: 130 },
      { soc: 90, kw: 55 },
      { soc: 100, kw: 15 }
    ],
    faqs: [
      { question: "What makes the Gen 2 Taycan charging curve world-class?", answer: "The 2025 Taycan holds 300+ kW up to 55% SOC and charges 10-80% in an astonishing 18 minutes despite a larger 97 kWh pack." }
    ]
  },
  'audi-e-tron-gt': {
    id: 'audi-e-tron-gt',
    name: 'Audi e-tron GT Quattro (2024)',
    brand: 'Audi',
    model: 'e-tron GT',
    year: '2024',
    batteryCapacity: 85.0,
    usablePackKwh: 85.0,
    epaRangeMiles: 249,
    wltpRangeKm: 488,
    maxChargeKw: 270,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['porsche-taycan', 'tesla-model-s-plaid', 'bmw-i4-edrive40'],
    curve: [
      { soc: 0, kw: 140 },
      { soc: 10, kw: 270 },
      { soc: 25, kw: 270 },
      { soc: 45, kw: 260 },
      { soc: 60, kw: 200 },
      { soc: 75, kw: 150 },
      { soc: 80, kw: 105 },
      { soc: 90, kw: 45 },
      { soc: 100, kw: 12 }
    ],
    faqs: [
      { question: "How fast is Audi e-tron GT 10-80% charging?", answer: "It completes 10% to 80% charging in just 22.5 minutes at peak 800V 270kW chargers." }
    ]
  },
  'lucid-air-gt': {
    id: 'lucid-air-gt',
    name: 'Lucid Air Grand Touring 118kWh (2024)',
    brand: 'Lucid',
    model: 'Air',
    year: '2024',
    batteryCapacity: 118.0,
    usablePackKwh: 118.0,
    epaRangeMiles: 516,
    wltpRangeKm: 839,
    maxChargeKw: 300,
    architecture: '900V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-s-plaid', 'porsche-taycan', 'mercedes-eqs-450'],
    curve: [
      { soc: 0, kw: 150 },
      { soc: 10, kw: 300 },
      { soc: 20, kw: 295 },
      { soc: 35, kw: 250 },
      { soc: 50, kw: 190 },
      { soc: 65, kw: 135 },
      { soc: 75, kw: 95 },
      { soc: 80, kw: 75 },
      { soc: 90, kw: 40 },
      { soc: 100, kw: 10 }
    ],
    faqs: [
      { question: "Why does Lucid Air use a 900V+ architecture?", answer: "Higher voltage enables 300 kW peak rates with lower resistive heat losses, adding up to 300 miles of range in ~20 minutes." }
    ]
  },
  'rivian-r1t': {
    id: 'rivian-r1t',
    name: 'Rivian R1T / R1S Large Pack (2024 Gen 2)',
    brand: 'Rivian',
    model: 'R1T',
    year: '2024',
    batteryCapacity: 109.0,
    usablePackKwh: 109.0,
    epaRangeMiles: 330,
    wltpRangeKm: 531,
    maxChargeKw: 220,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-cybertruck', 'ford-f150-lightning', 'chevrolet-silverado-ev'],
    curve: [
      { soc: 0, kw: 100 },
      { soc: 10, kw: 220 },
      { soc: 30, kw: 215 },
      { soc: 45, kw: 175 },
      { soc: 60, kw: 130 },
      { soc: 70, kw: 95 },
      { soc: 80, kw: 65 },
      { soc: 90, kw: 35 },
      { soc: 100, kw: 8 }
    ],
    faqs: [
      { question: "How long does a Rivian take to fast charge 10-80%?", answer: "On a 350kW DC charger, the Rivian Large Pack requires ~35 minutes from 10% to 80%." }
    ]
  },
  'ford-mustang-mach-e': {
    id: 'ford-mustang-mach-e',
    name: 'Ford Mustang Mach-E ER 91kWh (2024)',
    brand: 'Ford',
    model: 'Mustang Mach-E',
    year: '2024',
    batteryCapacity: 91.0,
    usablePackKwh: 91.0,
    epaRangeMiles: 290,
    wltpRangeKm: 600,
    maxChargeKw: 150,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-y-lr', 'hyundai-ioniq-5', 'volkswagen-id4-pro'],
    curve: [
      { soc: 0, kw: 80 },
      { soc: 10, kw: 150 },
      { soc: 30, kw: 150 },
      { soc: 45, kw: 115 },
      { soc: 60, kw: 85 },
      { soc: 75, kw: 60 },
      { soc: 80, kw: 45 },
      { soc: 90, kw: 22 },
      { soc: 100, kw: 6 }
    ],
    faqs: [
      { question: "How fast can the Mustang Mach-E charge?", answer: "The extended range Mach-E peaks at 150 kW and takes about 38-42 minutes to go from 10% to 80%." }
    ]
  },
  'ford-f150-lightning': {
    id: 'ford-f150-lightning',
    name: 'Ford F-150 Lightning Extended Range 131kWh (2024)',
    brand: 'Ford',
    model: 'F-150 Lightning',
    year: '2024',
    batteryCapacity: 131.0,
    usablePackKwh: 131.0,
    epaRangeMiles: 320,
    wltpRangeKm: 515,
    maxChargeKw: 155,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['rivian-r1t', 'tesla-cybertruck', 'chevrolet-silverado-ev'],
    curve: [
      { soc: 0, kw: 90 },
      { soc: 10, kw: 155 },
      { soc: 35, kw: 155 },
      { soc: 50, kw: 130 },
      { soc: 65, kw: 105 },
      { soc: 80, kw: 75 },
      { soc: 90, kw: 45 },
      { soc: 100, kw: 12 }
    ],
    faqs: [
      { question: "How long to fast charge F-150 Lightning 10-80%?", answer: "Due to its large 131 kWh pack, 10-80% takes approximately 41 minutes on a 150kW+ DC charger." }
    ]
  },
  'bmw-i4-edrive40': {
    id: 'bmw-i4-edrive40',
    name: 'BMW i4 eDrive40 Gran Coupe (2024)',
    brand: 'BMW',
    model: 'i4',
    year: '2024',
    batteryCapacity: 81.2,
    usablePackKwh: 81.2,
    epaRangeMiles: 301,
    wltpRangeKm: 590,
    maxChargeKw: 205,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-3-lr', 'polestar-2-lr', 'hyundai-ioniq-6'],
    curve: [
      { soc: 0, kw: 100 },
      { soc: 10, kw: 205 },
      { soc: 25, kw: 200 },
      { soc: 40, kw: 155 },
      { soc: 55, kw: 115 },
      { soc: 70, kw: 80 },
      { soc: 80, kw: 58 },
      { soc: 90, kw: 32 },
      { soc: 100, kw: 8 }
    ],
    faqs: [
      { question: "What is BMW i4's 10-80% DC charge duration?", answer: "The BMW i4 eDrive40 charges from 10% to 80% in about 31 minutes on a 200kW+ DC fast charger." }
    ]
  },
  'bmw-ix-xdrive50': {
    id: 'bmw-ix-xdrive50',
    name: 'BMW iX xDrive50 105.2kWh (2024)',
    brand: 'BMW',
    model: 'iX',
    year: '2024',
    batteryCapacity: 105.2,
    usablePackKwh: 105.2,
    epaRangeMiles: 307,
    wltpRangeKm: 630,
    maxChargeKw: 195,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['mercedes-eqs-450', 'rivian-r1s', 'tesla-model-x'],
    curve: [
      { soc: 0, kw: 100 },
      { soc: 10, kw: 195 },
      { soc: 30, kw: 195 },
      { soc: 50, kw: 150 },
      { soc: 65, kw: 110 },
      { soc: 80, kw: 75 },
      { soc: 90, kw: 40 },
      { soc: 100, kw: 10 }
    ],
    faqs: [
      { question: "How fast does the BMW iX fast charge?", answer: "The iX achieves 10-80% in approximately 35 minutes on high-power DC fast charging stations." }
    ]
  },
  'mercedes-eqe-350': {
    id: 'mercedes-eqe-350',
    name: 'Mercedes-Benz EQE 350+ (2024)',
    brand: 'Mercedes-Benz',
    model: 'EQE',
    year: '2024',
    batteryCapacity: 90.6,
    usablePackKwh: 90.6,
    epaRangeMiles: 298,
    wltpRangeKm: 639,
    maxChargeKw: 170,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['bmw-i4-edrive40', 'tesla-model-s-plaid', 'polestar-2-lr'],
    curve: [
      { soc: 0, kw: 90 },
      { soc: 10, kw: 170 },
      { soc: 35, kw: 170 },
      { soc: 55, kw: 145 },
      { soc: 70, kw: 105 },
      { soc: 80, kw: 70 },
      { soc: 90, kw: 35 },
      { soc: 100, kw: 8 }
    ],
    faqs: [
      { question: "What is the EQE charging curve characteristic?", answer: "Mercedes-Benz uses a wide, flat plateau that holds ~170 kW up to 35% before gently tapering to 70 kW at 80%." }
    ]
  },
  'mercedes-eqs-450': {
    id: 'mercedes-eqs-450',
    name: 'Mercedes-Benz EQS 450+ 108.4kWh (2024)',
    brand: 'Mercedes-Benz',
    model: 'EQS',
    year: '2024',
    batteryCapacity: 108.4,
    usablePackKwh: 108.4,
    epaRangeMiles: 352,
    wltpRangeKm: 780,
    maxChargeKw: 200,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['lucid-air-gt', 'tesla-model-s-plaid', 'bmw-ix-xdrive50'],
    curve: [
      { soc: 0, kw: 110 },
      { soc: 10, kw: 200 },
      { soc: 35, kw: 200 },
      { soc: 55, kw: 165 },
      { soc: 70, kw: 120 },
      { soc: 80, kw: 85 },
      { soc: 90, kw: 45 },
      { soc: 100, kw: 12 }
    ],
    faqs: [
      { question: "How long does EQS 450 take 10-80%?", answer: "It completes 10-80% charging in approximately 31 minutes on a 200kW+ DC charger." }
    ]
  },
  'volkswagen-id4-pro': {
    id: 'volkswagen-id4-pro',
    name: 'Volkswagen ID.4 Pro 77kWh (2024)',
    brand: 'Volkswagen',
    model: 'ID.4',
    year: '2024',
    batteryCapacity: 77.0,
    usablePackKwh: 77.0,
    epaRangeMiles: 291,
    wltpRangeKm: 550,
    maxChargeKw: 175,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-y-lr', 'hyundai-ioniq-5', 'ford-mustang-mach-e'],
    curve: [
      { soc: 0, kw: 90 },
      { soc: 10, kw: 175 },
      { soc: 30, kw: 165 },
      { soc: 45, kw: 130 },
      { soc: 60, kw: 95 },
      { soc: 75, kw: 65 },
      { soc: 80, kw: 50 },
      { soc: 90, kw: 25 },
      { soc: 100, kw: 6 }
    ],
    faqs: [
      { question: "How fast is the updated 2024 ID.4 charging?", answer: "With the 2024 software and hardware refresh, peak charge speed increased to 175 kW, reducing 10-80% time to ~28 minutes." }
    ]
  },
  'polestar-2-lr': {
    id: 'polestar-2-lr',
    name: 'Polestar 2 Long Range Dual Motor (2024)',
    brand: 'Polestar',
    model: 'Polestar 2',
    year: '2024',
    batteryCapacity: 79.0,
    usablePackKwh: 79.0,
    epaRangeMiles: 276,
    wltpRangeKm: 591,
    maxChargeKw: 205,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-3-lr', 'bmw-i4-edrive40', 'hyundai-ioniq-6'],
    curve: [
      { soc: 0, kw: 100 },
      { soc: 10, kw: 205 },
      { soc: 25, kw: 200 },
      { soc: 40, kw: 150 },
      { soc: 55, kw: 110 },
      { soc: 70, kw: 75 },
      { soc: 80, kw: 52 },
      { soc: 90, kw: 28 },
      { soc: 100, kw: 6 }
    ],
    faqs: [
      { question: "What is Polestar 2 10-80% charge time?", answer: "The 2024 Polestar 2 with the new CATL pack takes 28 minutes to charge from 10% to 80%." }
    ]
  },
  'byd-seal-awd': {
    id: 'byd-seal-awd',
    name: 'BYD Seal Excellence AWD 82.5kWh (2024)',
    brand: 'BYD',
    model: 'Seal',
    year: '2024',
    batteryCapacity: 82.5,
    usablePackKwh: 82.5,
    epaRangeMiles: 310,
    wltpRangeKm: 520,
    maxChargeKw: 150,
    architecture: '800V',
    chemistry: 'LFP',
    topCompetitorIds: ['tesla-model-3-lr', 'hyundai-ioniq-6', 'polestar-2-lr'],
    curve: [
      { soc: 0, kw: 85 },
      { soc: 10, kw: 150 },
      { soc: 35, kw: 150 },
      { soc: 55, kw: 140 },
      { soc: 70, kw: 110 },
      { soc: 80, kw: 80 },
      { soc: 90, kw: 45 },
      { soc: 100, kw: 15 }
    ],
    faqs: [
      { question: "What battery chemistry does the BYD Seal use?", answer: "The BYD Seal utilizes BYD's proprietary LFP Blade Battery in a Cell-to-Body (CTB) integration, offering high structural stiffness and thermal safety." }
    ]
  },
  'byd-atto-3': {
    id: 'byd-atto-3',
    name: 'BYD Atto 3 Extended 60.5kWh (2024)',
    brand: 'BYD',
    model: 'Atto 3',
    year: '2024',
    batteryCapacity: 60.5,
    usablePackKwh: 60.5,
    epaRangeMiles: 260,
    wltpRangeKm: 420,
    maxChargeKw: 88,
    architecture: '400V',
    chemistry: 'LFP',
    topCompetitorIds: ['volkswagen-id4-pro', 'volvo-ex30', 'tesla-model-3-rwd-lfp'],
    curve: [
      { soc: 0, kw: 60 },
      { soc: 10, kw: 88 },
      { soc: 40, kw: 88 },
      { soc: 60, kw: 82 },
      { soc: 75, kw: 65 },
      { soc: 85, kw: 45 },
      { soc: 95, kw: 25 },
      { soc: 100, kw: 10 }
    ],
    faqs: [
      { question: "How long does BYD Atto 3 take to charge 10-80%?", answer: "At its 88kW peak DC rate, 10% to 80% takes approximately 44 minutes." }
    ]
  },
  'chevrolet-silverado-ev': {
    id: 'chevrolet-silverado-ev',
    name: 'Chevrolet Silverado EV Max Pack 205kWh (2024)',
    brand: 'Chevrolet',
    model: 'Silverado EV',
    year: '2024',
    batteryCapacity: 205.0,
    usablePackKwh: 205.0,
    epaRangeMiles: 450,
    wltpRangeKm: 724,
    maxChargeKw: 350,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['rivian-r1t', 'tesla-cybertruck', 'ford-f150-lightning'],
    curve: [
      { soc: 0, kw: 180 },
      { soc: 10, kw: 350 },
      { soc: 30, kw: 350 },
      { soc: 45, kw: 290 },
      { soc: 60, kw: 210 },
      { soc: 75, kw: 140 },
      { soc: 80, kw: 100 },
      { soc: 90, kw: 50 },
      { soc: 100, kw: 15 }
    ],
    faqs: [
      { question: "How does the massive 205kWh pack charge in under 40 minutes?", answer: "GM's Ultium 800V architecture pulls the full 350 kW maximum from CCS dispensers, sustaining over 300 kW into the mid-pack." }
    ]
  },
  'volvo-ex30': {
    id: 'volvo-ex30',
    name: 'Volvo EX30 Twin Motor Performance 64kWh (2024)',
    brand: 'Volvo',
    model: 'EX30',
    year: '2024',
    batteryCapacity: 64.0,
    usablePackKwh: 64.0,
    epaRangeMiles: 265,
    wltpRangeKm: 476,
    maxChargeKw: 153,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-3-rwd-lfp', 'byd-atto-3', 'volkswagen-id4-pro'],
    curve: [
      { soc: 0, kw: 80 },
      { soc: 10, kw: 153 },
      { soc: 30, kw: 150 },
      { soc: 50, kw: 120 },
      { soc: 65, kw: 85 },
      { soc: 80, kw: 55 },
      { soc: 90, kw: 30 },
      { soc: 100, kw: 8 }
    ],
    faqs: [
      { question: "How fast is Volvo EX30 10-80% charging?", answer: "The compact Volvo EX30 charges from 10% to 80% in approximately 26 minutes." }
    ]
  },
  'genesis-gv60': {
    id: 'genesis-gv60',
    name: 'Genesis GV60 Performance AWD (2024)',
    brand: 'Genesis',
    model: 'GV60',
    year: '2024',
    batteryCapacity: 77.4,
    usablePackKwh: 77.4,
    epaRangeMiles: 235,
    wltpRangeKm: 466,
    maxChargeKw: 235,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['hyundai-ioniq-5', 'kia-ev6', 'porsche-taycan'],
    curve: [
      { soc: 0, kw: 150 },
      { soc: 10, kw: 225 },
      { soc: 35, kw: 235 },
      { soc: 55, kw: 230 },
      { soc: 70, kw: 180 },
      { soc: 80, kw: 125 },
      { soc: 90, kw: 40 },
      { soc: 100, kw: 10 }
    ],
    faqs: [
      { question: "What is the charging performance of Genesis GV60?", answer: "Built on the 800V E-GMP platform, it charges from 10% to 80% in 18 minutes on 350kW DC chargers." }
    ]
  }
};
