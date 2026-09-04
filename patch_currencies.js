const fs = require('fs');
const file = 'components/providers/SettingsProvider.tsx';
let content = fs.readFileSync(file, 'utf8');

const newCurrencies = `export const CURRENCIES: Currency[] = [
  { label: 'USD', symbol: '$' },
  { label: 'INR', symbol: '₹' },
  { label: 'EUR', symbol: '€' },
  { label: 'GBP', symbol: '£' },
  { label: 'JPY', symbol: '¥' },
  { label: 'KRW', symbol: '₩' },
  { label: 'RUB', symbol: '₽' },
  { label: 'TRY', symbol: '₺' },
  { label: 'UAH', symbol: '₴' },
  { label: 'PHP', symbol: '₱' },
  { label: 'THB', symbol: '฿' },
  { label: 'VND', symbol: '₫' },
  { label: 'NGN', symbol: '₦' },
  { label: 'ILS', symbol: '₪' },
  { label: 'ZAR', symbol: 'R' },
  { label: 'CAD', symbol: 'C$' },
  { label: 'AUD', symbol: 'A$' },
];`;

content = content.replace(/export const CURRENCIES: Currency\[\] = \[[\s\S]*?\];/, newCurrencies);
fs.writeFileSync(file, content);
console.log('Currencies patched!');
