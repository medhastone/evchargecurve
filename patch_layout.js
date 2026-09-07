const fs = require('fs');
const file = '/app/applet/app/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&amp;display=optional" />`;
const replacement = ``;

content = content.replace(target, replacement);

fs.writeFileSync(file, content);
console.log("Patched layout.tsx");
