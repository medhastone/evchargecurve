const fs = require('fs');
const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');

const css = '@import "tailwindcss"; @theme { --font-sans: var(--font-inter); --font-mono: var(--font-jetbrains-mono); } @layer base { :root { --background: 222.2 84% 4.9%; --foreground: 210 40% 98%; } }';

postcss([tailwindcss()])
  .process(css, { from: 'app/globals.css', to: 'dist/globals.css' })
  .then(result => {
    console.log("Tailwind compiled successfully");
  })
  .catch(err => {
    console.error("Tailwind compile error:", err);
  });
