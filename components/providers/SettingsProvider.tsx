'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = {
  label: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
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
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]);
  const [unit, setUnitState] = useState<'mi' | 'km'>('mi');

  useEffect(() => {
    try {
      const savedCurrency = window.localStorage.getItem('ev_currency');
      if (savedCurrency) {
        const found = CURRENCIES.find(c => c.label === savedCurrency);
        if (found && found.label !== CURRENCIES[0].label) {
           setCurrencyState(found);
        }
      }
      const savedUnit = window.localStorage.getItem('ev_unit');
      if (savedUnit && (savedUnit === 'mi' || savedUnit === 'km') && savedUnit !== 'mi') {
        setUnitState(savedUnit);
      }
    } catch(e) {}
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('ev_currency', c.label);
    }
  };

  const setUnit = (u: 'mi' | 'km') => {
    setUnitState(u);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('ev_unit', u);
    }
  };

  const formatDistance = (miles: number) => {
    return unit === 'km' ? miles * 1.60934 : miles;
  };

  const distanceLabel = unit === 'mi' ? 'mi' : 'km';
  const speedLabel = unit === 'mi' ? 'mph' : 'km/h';
  const efficiencyLabel = unit === 'mi' ? 'mi/kWh' : 'km/kWh';

  return (
    <SettingsContext.Provider value={{ 
      currency, setCurrency, 
      unit, setUnit, 
      formatDistance, distanceLabel, speedLabel, efficiencyLabel 
    }}>
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
