const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/home-charging', { waitUntil: 'networkidle0' });
  
  // Get initial symbol
  const initialHtml = await page.content();
  console.log("Initial contains USD?: " + initialHtml.includes('USD'));
  console.log("Initial contains EUR?: " + initialHtml.includes('EUR'));
  
  // Click EUR in navbar
  const navbarButtons = await page.$$('header button');
  for (let btn of navbarButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('USD')) {
       await btn.click();
       break;
    }
  }
  
  // Wait for dropdown
  await new Promise(r => setTimeout(r, 500));
  
  const dropdownButtons = await page.$$('header button');
  for (let btn of dropdownButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('EUR')) {
       await btn.click();
       break;
    }
  }
  
  await new Promise(r => setTimeout(r, 500));
  
  const finalHtml = await page.content();
  console.log("Final contains €?: " + finalHtml.includes('€'));
  
  await browser.close();
})();
