'use client';
import { useSettings } from '@/components/providers/SettingsProvider';
export default function TestPage() {
  const { currency } = useSettings();
  return <div style={{marginTop: 100, fontSize: 32}}>Current currency: {currency.label} {currency.symbol}</div>;
}
