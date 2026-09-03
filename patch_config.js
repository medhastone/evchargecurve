const fs = require('fs');
let code = fs.readFileSync('/app/applet/next.config.ts', 'utf8');

code = code.replace("output: 'standalone',", "output: 'export',\n  images: {\n    unoptimized: true,\n  },");

// Remove the old images block to prevent conflict
code = code.replace(/images:\s*\{[\s\S]*?\},/g, (match) => {
  if (match.includes('unoptimized: true')) return match;
  return '';
});

fs.writeFileSync('/app/applet/next.config.ts', code);
