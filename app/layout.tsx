import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SettingsProvider } from '@/components/providers/SettingsProvider';
import { VehicleProvider } from '@/components/providers/VehicleContext';
import CustomVehicleStudioModal from '@/components/CustomVehicleStudioModal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://evchargecurve.com'),
  title: {
    template: '%s | EVChargeCurve',
    default: 'EVChargeCurve | DC Fast Charging & Battery Analytics',
  },
  description: 'High-performance web utility platform for EV battery diagnostics, DC fast-charging taper curves, winter range degradation, and home charging economics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="icon" type="image/png" href="/icon.png" />
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
            <CustomVehicleStudioModal />
          </VehicleProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
