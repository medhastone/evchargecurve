const fs = require('fs');
const file = '/app/applet/components/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `const TOOL_LINKS = [
  { name: 'DC Fast Simulator', path: '/' },
  { name: 'Compare EVs', path: '/compare' },
  { name: 'Phantom Drain', path: '/idle-drain' },
  { name: 'Panel Capacity Sizer', path: '/panel-capacity' },
  { name: 'Battery Health', path: '/battery-health' },
  { name: 'Winter & Towing', path: '/range-loss' },
  { name: 'Home Charging', path: '/home-charging' },
  { name: 'Carbon Offset', path: '/carbon-offset' },
];`;

const replacement = `const TOOL_LINKS = [
  { name: 'DC Fast Simulator', path: '/' },
  { name: 'Compare EVs', path: '/compare' },
  { name: 'Cold-Gate vs Precond', path: '/preconditioning' },
  { name: 'Phantom Drain', path: '/idle-drain' },
  { name: 'Panel Capacity Sizer', path: '/panel-capacity' },
  { name: 'Battery Health', path: '/battery-health' },
  { name: 'Winter & Towing', path: '/range-loss' },
  { name: 'Home Charging', path: '/home-charging' },
  { name: 'Carbon Offset', path: '/carbon-offset' },
];`;

if (content.includes("Cold-Gate vs Precond")) {
  console.log("Already patched.");
} else if (content.includes("Phantom Drain")) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log("Patched successfully!");
} else {
  console.log("Could not find target block to replace.");
}
