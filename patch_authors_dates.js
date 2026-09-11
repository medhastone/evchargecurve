const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/how-long-to-charge-an-electric-car/page.tsx',
  'app/blog/level-3-ev-charger/page.tsx',
  'app/blog/nema-14-50-ev-charging-guide/page.tsx',
  'app/lithium-ion-battery-degradation/page.tsx'
];

for (const file of filesToUpdate) {
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');

  // Replace Date Strings in JSON-LD / text
  content = content.replace(/2026-06-[0-9]{2}/g, '2026-09-11');
  content = content.replace(/2026-09-[0-9]{2}/g, '2026-09-11');
  content = content.replace(/2026-03-01T08:00:00\+00:00/g, '2026-09-11');
  content = content.replace(/2026-09-09T03:00:00\+00:00/g, '2026-09-11');
  content = content.replace(/July 2026/g, 'September 11, 2026');
  content = content.replace(/June 2026/g, 'September 11, 2026');
  content = content.replace(/September 2026/g, 'September 11, 2026');
  
  // NEMA 14-50 Specific date replacement in text:
  content = content.replace(/September 15, 2026/g, 'September 11, 2026');
  
  // Specific author replacement for Marcus Vance
  content = content.replace(/"name": "Marcus Vance, PhD"/g, '"name": "EV Charge Curve Editorial Team"');
  content = content.replace(/'name': 'Dr\. Marcus Vance, PhD'/g, "'name': 'EV Charge Curve Editorial Team'");
  content = content.replace(/"name": "Dr\. Marcus Vance, PhD"/g, '"name": "EV Charge Curve Editorial Team"');
  
  // Specific author replacement for Elena Rostova
  content = content.replace(/'name': 'Dr\. Elena Rostova'/g, "'name': 'EV Charge Curve Editorial Team'");
  
  // UI Blocks Replacement
  content = content.replace(/<span className="font-bold text-white text-base">Dr\. Marcus Vance, PhD<\/span>/g, '<span className="font-bold text-white text-base">EV Charge Curve Editorial Team</span>');
  content = content.replace(/<h4 className="text-lg font-bold text-white m-0">Dr\. Marcus Vance, PhD<\/h4>/g, '<h4 className="text-lg font-bold text-white m-0">EV Charge Curve Editorial Team</h4>');
  content = content.replace(/<h4 className="text-lg font-bold text-white mb-1">Marcus Vance, PhD<\/h4>/g, '<h4 className="text-lg font-bold text-white mb-1">EV Charge Curve Editorial Team</h4>');
  content = content.replace(/<span className="font-bold text-white text-base">Dr\. Elena Rostova<\/span>/g, '<span className="font-bold text-white text-base">EV Charge Curve Editorial Team</span>');

  // Bio Descriptions
  const elenaBio = /Elena holds a PhD in Materials Science and specializes in lithium-ion degradation mechanisms, SEI layer modeling, and battery longevity modeling for modern EV architectures\. She leads the battery health algorithms at EVChargeCurve\./g;
  content = content.replace(elenaBio, 'The EV Charge Curve editorial team specializes in translating complex lithium-ion thermal behavior, charging curves, and electrical infrastructure into accessible engineering guides.');

  const marcusBio1 = /Marcus holds a PhD in Electrochemical Engineering and specializes in lithium-ion thermal behavior and degradation modeling\. He has spent over a decade designing thermal management and charge control algorithms for automotive EV platforms\./g;
  content = content.replace(marcusBio1, 'The EV Charge Curve editorial team specializes in translating complex lithium-ion thermal behavior, charging curves, and electrical infrastructure into accessible engineering guides. We focus on data-driven insights and verified technical testing.');
  
  const marcusBio2 = /Dr\. Vance is a Senior Automotive Battery Systems Engineer specializing in lithium-ion thermal behavior, rapid charge capabilities, and degradation modeling\. He has spent over a decade developing OEM battery management systems \(BMS\) and EV infrastructure architectures\./g;
  content = content.replace(marcusBio2, 'The EV Charge Curve editorial team specializes in translating complex lithium-ion thermal behavior, charging curves, and electrical infrastructure into accessible engineering guides. We focus on data-driven insights and verified technical testing.');

  const marcusBio3 = /Dr\. Vance is a Senior Commercial EV Infrastructure Engineer and Grid Integration Specialist with over 14 years of experience designing megawatt-scale fleet electrification hubs and high-voltage battery management systems\./g;
  content = content.replace(marcusBio3, 'The EV Charge Curve editorial team specializes in translating complex lithium-ion thermal behavior, charging curves, and electrical infrastructure into accessible engineering guides. We focus on data-driven insights and verified technical testing.');

  // Check for Job Titles
  content = content.replace(/'jobTitle': 'Senior Automotive Battery Systems Engineer'/g, "'jobTitle': 'Battery & Infrastructure Experts'");
  content = content.replace(/"jobTitle": "Battery Systems & Grid Infrastructure Engineer"/g, '"jobTitle": "Battery & Infrastructure Experts"');
  
  // Also look for "MV" / "ER" initials blocks in UI
  content = content.replace(/<span className="text-xl font-bold text-slate-400">MV<\/span>/g, '<span className="text-xl font-bold text-slate-400">EV</span>');
  content = content.replace(/<span className="text-xl font-bold text-slate-400">ER<\/span>/g, '<span className="text-xl font-bold text-slate-400">EV</span>');
  
  // "Battery Systems Engineer" / "Electrochemistry Lead"
  content = content.replace(/<p className="text-cyan-400 text-sm font-medium mb-3">Battery Systems Engineer<\/p>/g, '<p className="text-cyan-400 text-sm font-medium mb-3">Battery & Infrastructure Experts</p>');
  content = content.replace(/<div className="text-emerald-400 text-sm font-medium mb-2">Senior Automotive Battery Systems Engineer<\/div>/g, '<div className="text-emerald-400 text-sm font-medium mb-2">Battery & Infrastructure Experts</div>');
  content = content.replace(/<p className="text-cyan-400 text-sm font-medium m-0">Battery Systems & Grid Infrastructure Engineer<\/p>/g, '<p className="text-cyan-400 text-sm font-medium m-0">Battery & Infrastructure Experts</p>');
  content = content.replace(/<div className="text-emerald-400 text-sm font-medium mb-2">Electrochemistry Lead<\/div>/g, '<div className="text-emerald-400 text-sm font-medium mb-2">Battery & Infrastructure Experts</div>');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
