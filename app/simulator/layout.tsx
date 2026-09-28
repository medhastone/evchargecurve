import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'DC Fast Charge Simulator | EVChargeCurve',
  description: 'Simulate electric vehicle fast charging curves, BMS tapers, and 10–80% dwell times.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://evchargecurve.com',
  },
};

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
