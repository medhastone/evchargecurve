import { MetadataRoute } from 'next';
import { VEHICLES } from '@/data/evModels';

const BASE_URL = 'https://evchargecurve.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/battery-health`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/range-loss`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/home-charging`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];

  const vehicleRoutes = Object.keys(VEHICLES).map((slug) => ({
    url: `${BASE_URL}/curve/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...vehicleRoutes];
}
