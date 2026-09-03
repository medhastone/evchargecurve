const fs = require('fs');
const path = require('path');

const replacements = {
  // Spacing
  'space-2xs': '1',
  'space-xs': '2',
  'space-sm': '3',
  'space-md': '4',
  'space-lg': '6',
  'space-xl': '8',
  'space-2xl': '12',
  'space-3xl': '16',

  // Colors
  'text-primary': 'text-emerald-400',
  'text-secondary': 'text-cyan-400',
  'text-tertiary': 'text-purple-400',
  'text-outline-variant': 'text-slate-600',
  'text-outline': 'text-slate-500',
  'text-on-surface-variant': 'text-slate-300',
  'text-on-surface': 'text-slate-100',
  
  'bg-surface-container-highest': 'bg-slate-600',
  'bg-surface-container-high': 'bg-slate-700',
  'bg-surface-container-low': 'bg-slate-900',
  'bg-surface-container': 'bg-slate-800',
  'bg-surface': 'bg-slate-950',

  'border-surface-container-highest': 'border-slate-600',
  'border-surface-container-high': 'border-slate-700',
  'border-surface-container': 'border-slate-800',

  // Fonts
  'font-headline-sm': 'font-bold text-lg',
  'font-headline-md': 'font-bold text-xl',
  'font-headline-lg': 'font-bold text-2xl',
  
  'font-title-lg': 'font-semibold text-lg',
  'font-title-md': 'font-semibold text-base',
  'font-title-sm': 'font-semibold text-sm',
  
  'font-body-lg': 'text-base',
  'font-body-md': 'text-sm',
  'font-body-sm': 'text-xs',
  
  'font-label-lg': 'text-sm font-medium tracking-wide',
  'font-label-md': 'text-xs font-medium tracking-wide',
  'font-label-sm': 'text-[11px] font-medium tracking-wide',
  
  'font-label-numeric-lg': 'font-mono text-sm',
  'font-label-numeric-md': 'font-mono text-xs',
  'font-label-numeric-sm': 'font-mono text-[11px]',
  'font-label-caps': 'uppercase tracking-widest text-[10px]'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace spacing utilities (gap, p, m, etc)
  Object.keys(replacements).forEach(key => {
    if (key.startsWith('space-')) {
      const val = replacements[key];
      // Regex to match classes like gap-space-md, p-space-md, px-space-md, mt-space-md
      const regex = new RegExp(`\\b([a-z]+)-${key}\\b`, 'g');
      content = content.replace(regex, `$1-${val}`);
    } else {
      // Direct class replacements
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      content = content.replace(regex, replacements[key]);
    }
  });

  // Also clear out any text-headline-sm, text-title-lg as they were redundant
  content = content.replace(/\btext-headline-[a-z]+\b/g, '');
  content = content.replace(/\btext-title-[a-z]+\b/g, '');
  content = content.replace(/\btext-body-[a-z]+\b/g, '');
  content = content.replace(/\btext-label-numeric-[a-z]+\b/g, '');
  content = content.replace(/\btext-label-[a-z]+\b/g, '');

  // Cleanup double spaces
  content = content.replace(/  +/g, ' ');

  fs.writeFileSync(filePath, content);
}

const walkDir = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  });
};

walkDir('./components');
walkDir('./app');
console.log('Class replacement complete.');
