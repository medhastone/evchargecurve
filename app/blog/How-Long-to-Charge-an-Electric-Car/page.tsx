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
  }
};

export default HowLongToChargeEVPage;
