const fs = require('fs');

let code = `
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = {
  label: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { label: 'USD', symbol: '$' },
  { label: 'GBP', symbol: '£' },
  { label: 'EUR', symbol: '€' },
  { label: 'CAD', symbol: '$' },
  { label: 'AUD', symbol: '$' },
];

type SettingsContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  unit: 'mi' | 'km';
  setUnit: (u: 'mi' | 'km') => void;
  // Helpers
  formatDistance: (mi: number) => number; // Returns mi or km
  distanceLabel: string; // 'mi' or 'km'
  speedLabel: string; // 'mph' or 'km/h'
  efficiencyLabel: string; // 'mi/kWh' or 'km/kWh'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [unit, setUnit] = useState<'mi' | 'km'>('mi');

  useEffect(() => {
    // Load from local storage on mount safely
    try {
      const savedCurrency = window.localStorage.getItem('ev_currency');
      if (savedCurrency) {
        const found = CURRENCIES.find(c => c.label === savedCurrency);
        if (found) setCurrency(found);
      }
      const savedUnit = window.localStorage.getItem('ev_unit');
      if (savedUnit === 'mi' || savedUnit === 'km') {
        setUnit(savedUnit);
      }
    } catch(e) {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('ev_currency', currency.label);
      window.localStorage.setItem('ev_unit', unit);
    } catch(e) {}
  }, [currency, unit]);

  const formatDistance = (miles: number) => {
    return unit === 'km' ? miles * 1.60934 : miles;
  };

  const distanceLabel = unit === 'mi' ? 'mi' : 'km';
  const speedLabel = unit === 'mi' ? 'mph' : 'km/h';
  const efficiencyLabel = unit === 'mi' ? 'mi/kWh' : 'km/kWh';

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, unit, setUnit, formatDistance, distanceLabel, speedLabel, efficiencyLabel }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
`;

fs.writeFileSync('components/providers/SettingsProvider.tsx', code);
