import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EVChargeCurve | DC Fast Charging & Battery Analytics',
    short_name: 'EVChargeCurve',
    description: 'High-performance web utility platform for EV battery diagnostics, DC fast-charging taper curves, winter range degradation, and home charging economics.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0F17',
    theme_color: '#0B0F17',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
