const fs = require('fs');
const file = 'components/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `const TOOL_LINKS = [
  { name: 'DC Fast Simulator', path: '/' },
  { name: 'Phantom Drain', path: '/idle-drain' },
  { name: 'Compare EVs', path: '/compare' },`;
const replacement = `const TOOL_LINKS = [
  { name: 'DC Fast Simulator', path: '/' },
  { name: 'Phantom Drain', path: '/idle-drain' },
  { name: 'Panel Capacity Sizer', path: '/panel-capacity' },
  { name: 'Compare EVs', path: '/compare' },`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log("Patched!");
