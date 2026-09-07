const fs = require('fs');
let code = fs.readFileSync('app/idle-drain/page.tsx', 'utf8');

code = code.replace(/\{\s*"@type":\s*"ImageObject"[^}]+\},\s*/g, '');
code = code.replace(/\s*\{\/\* Image SEO Block \*\/\}[\s\S]*?(?=\{\/\* Section 1: How It Works \*\/})/g, '\n\n      ');
code = code.replace(/import Image from 'next\/image';\n/, '');

fs.writeFileSync('app/idle-drain/page.tsx', code);
