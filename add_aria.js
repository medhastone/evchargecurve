const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('components').concat(walk('app'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('type="range"')) {
     if (!content.includes('aria-label="Adjust slider"')) {
        content = content.replace(/type="range"/g, 'aria-label="Adjust slider" type="range"');
        changed = true;
     }
  }

  if (content.includes('<select')) {
      if (!content.includes('aria-label="Select option"')) {
          content = content.replace(/<select /g, '<select aria-label="Select option" ');
          changed = true;
      }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
