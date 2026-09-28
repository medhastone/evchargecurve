import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SettingsProvider } from '@/components/providers/SettingsProvider';
import { VehicleProvider } from '@/components/providers/VehicleContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://evchargecurve.com'),
  title: {
    template: '%s | EVChargeCurve',
    default: 'EVChargeCurve: Transparent EV Charging Curves & Telemetry Observatory',
  },
  description: 'Empirical EV charging curves, DC fast charging dwell time simulations, battery degradation models, and home charging economics.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'EVChargeCurve',
                  url: 'https://evchargecurve.com',
                  logo: 'https://evchargecurve.com/logo.png',
                  sameAs: [],
                  description: 'Open-source empirical EV charging curves, DC fast charging telemetry, and battery degradation modeling.',
                },
                {
                  '@type': 'WebSite',
                  name: 'EVChargeCurve',
                  url: 'https://evchargecurve.com',
                  description: 'Empirical EV charging curves, DC fast charging dwell time simulations, and battery degradation models.',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://evchargecurve.com/curve?search={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('ev_theme');
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-[#0B0F17] text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200`}>
        <SettingsProvider>
          <VehicleProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </VehicleProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
