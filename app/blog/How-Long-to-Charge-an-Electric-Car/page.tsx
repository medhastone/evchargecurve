import HowLongToChargeEVPage, { metadata as originalMetadata } from '@/app/how-long-to-charge-an-electric-car/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://evchargecurve.com/blog/How-Long-to-Charge-an-Electric-Car',
  },
  openGraph: {
    ...originalMetadata.openGraph,
    url: 'https://evchargecurve.com/blog/How-Long-to-Charge-an-Electric-Car',
    images: [
      {
        url: 'https://evchargecurve.com/images/og-how-long-to-charge.png',
        width: 1200,
        height: 630,
        alt: 'How Long Does It Take to Charge an Electric Car? Real-World Guide',
      }
    ],
  },
  twitter: {
    ...originalMetadata.twitter,
    images: ['https://evchargecurve.com/images/og-how-long-to-charge.png'],
  }
};

export default HowLongToChargeEVPage;
