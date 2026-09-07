const fs = require('fs');
let code = fs.readFileSync('app/idle-drain/page.tsx', 'utf8');

code = code.replace(
  '<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">\n          EV Phantom Drain Calculator & Airport Parking Battery Loss Estimator\n        </h1>',
  '<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">\n          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">EV Phantom Drain Calculator & Airport Parking</span> Battery Loss Estimator\n        </h1>'
);

fs.writeFileSync('app/idle-drain/page.tsx', code);
