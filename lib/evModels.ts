export const EV_MODELS: Record<string, { id: string, name: string, usableKwh: number, epaRange: number, chemistry: 'NMC' | 'LFP', desc: string }> = {
  'm3_lr_2021': { id: 'm3_lr_2021', name: 'Tesla Model 3 Long Range AWD', usableKwh: 78.8, epaRange: 353, chemistry: 'NMC', desc: 'Panasonic 2170 Nickel-Manganese-Cobalt (NMC) • 82.0 kWh Gross / 78.8 kWh Usable' },
  'my_lr_2022': { id: 'my_lr_2022', name: 'Tesla Model Y Long Range', usableKwh: 75.0, epaRange: 330, chemistry: 'NMC', desc: 'LG M50 NMC • 78.1 kWh Gross / 75.0 kWh Usable' },
  'ms_plaid_2021': { id: 'ms_plaid_2021', name: 'Tesla Model S Plaid', usableKwh: 95.0, epaRange: 396, chemistry: 'NMC', desc: 'Panasonic 18650 NMC • 100 kWh Gross / 95.0 kWh Usable' },
  'ioniq5_77': { id: 'ioniq5_77', name: 'Hyundai Ioniq 5 AWD (77.4 kWh)', usableKwh: 77.4, epaRange: 256, chemistry: 'NMC', desc: 'E-GMP SK On NMC 811 • 77.4 kWh Usable' },
  'taycan_perf': { id: 'taycan_perf', name: 'Porsche Taycan 4S (93.4 kWh)', usableKwh: 83.7, epaRange: 227, chemistry: 'NMC', desc: 'LG Chem NMC • 93.4 kWh Gross / 83.7 kWh Usable' },
  'm3_rwd_lfp': { id: 'm3_rwd_lfp', name: 'Tesla Model 3 RWD (LFP)', usableKwh: 60.0, epaRange: 272, chemistry: 'LFP', desc: 'CATL Lithium Iron Phosphate (LFP) • 60.0 kWh Usable' },
};
