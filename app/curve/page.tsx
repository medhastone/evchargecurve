import { Metadata } from 'next';
import VehicleDirectoryView from '@/components/VehicleDirectoryView';
import { BASE_URL } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'Global EV Charging Curve Directory & Pro Custom Studio | EVChargeCurve',
  description: 'Explore lab-tested DC fast charging taper curves across Tesla, Hyundai, Porsche, BYD, Rivian, Lucid, and custom-synthesized EV battery architectures.',
  alternates: {
    canonical: `${BASE_URL}/curve`,
  },
};

export default function CurveIndexPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Global EV Charging Curve Directory',
        description: 'Explore lab-tested DC fast charging taper curves across Tesla, Hyundai, Porsche, BYD, Rivian, Lucid, and custom-synthesized EV battery architectures.',
        url: `${BASE_URL}/curve`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Charging Curves',
            item: `${BASE_URL}/curve`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <VehicleDirectoryView />
    </>
  );
}

