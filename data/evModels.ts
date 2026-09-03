export const VEHICLES: Record<string, any> = {
  'tesla-model-y-lr': {
    id: 'tesla-model-y-lr',
    name: 'Tesla Model Y Long Range (2024)',
    brand: 'Tesla',
    model: 'Model Y',
    year: '2024',
    batteryCapacity: 75.0,
    usablePackKwh: 75.0,
    epaRangeMiles: 330,
    maxChargeKw: 250,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['hyundai-ioniq-5', 'ford-mustang-mach-e'],
    curve: [
      { soc: 0, kw: 100 },
      { soc: 10, kw: 250 },
      { soc: 20, kw: 250 },
      { soc: 30, kw: 200 },
      { soc: 40, kw: 160 },
      { soc: 50, kw: 120 },
      { soc: 60, kw: 80 },
      { soc: 70, kw: 60 },
      { soc: 80, kw: 45 },
      { soc: 90, kw: 25 },
      { soc: 100, kw: 5 }
    ],
    faqs: [
      { question: "How long does it take to charge a Tesla Model Y from 10% to 80%?", answer: "At a V3 Supercharger (250kW), it typically takes about 27-30 minutes under optimal thermal conditions." },
      { question: "What is the peak charging speed of the Model Y?", answer: "The Model Y Long Range peaks at 250 kW, usually hit between 10% and 20% state of charge." }
    ]
  },
  'hyundai-ioniq-5': {
    id: 'hyundai-ioniq-5',
    name: 'Hyundai Ioniq 5 AWD',
    brand: 'Hyundai',
    model: 'Ioniq 5',
    year: '2024',
    batteryCapacity: 77.4,
    usablePackKwh: 77.4,
    epaRangeMiles: 260,
    maxChargeKw: 235,
    architecture: '800V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-y-lr', 'ford-mustang-mach-e'],
    curve: [
      { soc: 0, kw: 150 },
      { soc: 10, kw: 200 },
      { soc: 30, kw: 230 },
      { soc: 50, kw: 235 },
      { soc: 70, kw: 175 },
      { soc: 80, kw: 120 },
      { soc: 90, kw: 40 },
      { soc: 100, kw: 10 }
    ],
    faqs: [
      { question: "How long does it take to charge a Hyundai Ioniq 5 from 10% to 80%?", answer: "Thanks to its 800V architecture, it can charge from 10% to 80% in just 18 minutes on a 350kW DC fast charger." },
      { question: "Does the Ioniq 5 charge faster than the Model Y?", answer: "Yes, the Ioniq 5 maintains a much higher charge rate deep into the pack (up to 70% SOC), making its 10-80% time significantly faster." }
    ]
  },
  'ford-mustang-mach-e': {
    id: 'ford-mustang-mach-e',
    name: 'Ford Mustang Mach-E ER',
    brand: 'Ford',
    model: 'Mustang Mach-E',
    year: '2023',
    batteryCapacity: 91.0,
    usablePackKwh: 91.0,
    epaRangeMiles: 290,
    maxChargeKw: 150,
    architecture: '400V',
    chemistry: 'NMC',
    topCompetitorIds: ['tesla-model-y-lr', 'hyundai-ioniq-5'],
    curve: [
      { soc: 0, kw: 80 },
      { soc: 10, kw: 150 },
      { soc: 30, kw: 150 },
      { soc: 40, kw: 110 },
      { soc: 60, kw: 80 },
      { soc: 80, kw: 45 },
      { soc: 90, kw: 20 },
      { soc: 100, kw: 5 }
    ],
    faqs: [
      { question: "How fast can the Mustang Mach-E charge?", answer: "The extended range Mach-E peaks at around 150 kW and takes about 45 minutes to go from 10% to 80%." },
      { question: "Why does the Mach-E charge slower than competitors?", answer: "Ford implemented a conservative charging curve to preserve battery health, stepping down to 80 kW at 60% SOC." }
    ]
  }
};
