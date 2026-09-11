import { MetadataRoute } from 'next';
import { BASE_URL, SEO_CONFIG } from '@/lib/seoConfig';
import { VEHICLES } from '@/data/evModels';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // 1. Tool routes mapped directly from centralized SEO config
  const toolRoutes: MetadataRoute.Sitemap = Object.values(SEO_CONFIG).map((tool) => ({
    url: `${BASE_URL}${tool.path === '/' ? '' : tool.path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: tool.path === '/' ? 1.0 : 0.9,
  }));

  // 2. Programmatic vehicle curve model routes
  const vehicleRoutes: MetadataRoute.Sitemap = Object.keys(VEHICLES).map((slug) => ({
    url: `${BASE_URL}/curve/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3. Static informational and specialized calculation routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog/level-3-ev-charger`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/blog/nema-14-50-ev-charging-guide`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/blog/How-Long-to-Charge-an-Electric-Car`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/how-long-to-charge-an-electric-car`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/betting-ev-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  return [...toolRoutes, ...vehicleRoutes, ...staticRoutes];
}
