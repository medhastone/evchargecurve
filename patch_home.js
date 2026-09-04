const fs = require('fs');

let code = fs.readFileSync('components/HomeCharging.tsx', 'utf8');

code = code.replace(/Off-Peak Rate \(\$\/kWh\)/g, 'Off-Peak Rate');
code = code.replace(/Peak Rate \(\$\/kWh\)/g, 'Peak Rate');
code = code.replace(/<span className="font-mono text-sm text-emerald-400">\$(\{[^\}]+\})<\/span>/g, '<span className="font-mono text-sm text-emerald-400">{globalCurrency.symbol}$1</span>');
code = code.replace(/<span className="font-mono text-sm text-error">\$(\{[^\}]+\})<\/span>/g, '<span className="font-mono text-sm text-error">{globalCurrency.symbol}$1</span>');
code = code.replace(/<span className="font-mono text-xs text-slate-100">\$(\{[^\}]+\})<\/span>/g, '<span className="font-mono text-xs text-slate-100">{globalCurrency.symbol}$1</span>');
code = code.replace(/<span className="font-mono text-xs text-slate-300 line-through">\$(\{[^\}]+\})<\/span>/g, '<span className="font-mono text-xs text-slate-300 line-through">{globalCurrency.symbol}$1</span>');
code = code.replace(/<span className="font-mono text-xs text-emerald-400 font-bold">\$(\{[^\}]+\})<\/span>/g, '<span className="font-mono text-xs text-emerald-400 font-bold">{globalCurrency.symbol}$1</span>');

fs.writeFileSync('components/HomeCharging.tsx', code);
