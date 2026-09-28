import { MetadataRoute } from 'next';
import { BASE_URL, SEO_CONFIG } from '@/lib/seoConfig';
import { VEHICLES } from '@/data/evModels';
import { TOPIC_HUB_SLUGS } from '@/lib/topicHubs';
import { RESEARCH_PAPERS } from '@/lib/researchData';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // 1. Original Research Observatory & Whitepapers
  const researchRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/research`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    ...RESEARCH_PAPERS.map((paper) => ({
      url: `${BASE_URL}/research/${paper.slug}`,
      lastModified: new Date(paper.updatedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];

  // 2. Topic Authority Pillars (Index + 12 Pillars)
  const topicRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/topics`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    ...TOPIC_HUB_SLUGS.map((slug) => ({
      url: `${BASE_URL}/topics/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];

  // 2. Core Calculators from Centralized SEO Config
  const toolRoutes: MetadataRoute.Sitemap = Object.values(SEO_CONFIG).map((tool) => ({
    url: `${BASE_URL}${tool.path === '/' ? '' : tool.path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: tool.path === '/' ? 1.0 : 0.9,
  }));

  // 3. Additional Specialized Calculators & Landing Pages
  const specializedToolRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/curve`,
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
      url: `${BASE_URL}/how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/kw-to-miles`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ev-charging-cost`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tco-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/battery-replacement`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/solar-to-ev`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/betting-ev-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // 4. Programmatic Vehicle Curve Profiles
  const vehicleRoutes: MetadataRoute.Sitemap = Object.keys(VEHICLES).map((slug) => ({
    url: `${BASE_URL}/curve/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // 5. Engineering Blog & Verified Technical Guides (Only 200-OK Valid URLs)
  const blogRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blog/level-3-ev-charger`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/the-cold-gate-dilemma`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/lithium-ion-battery-degradation`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/nema-14-50-ev-charging-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/level-2-breaker-sizing-economics`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // 6. Authority, Trust & Data Governance Routes
  const authorityRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/authors`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/data-sources`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/testing`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/editorial-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/corrections`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
  ];

  // Combine and deduplicate URLs
  const allRoutes = [
    ...topicRoutes,
    ...toolRoutes,
    ...specializedToolRoutes,
    ...vehicleRoutes,
    ...blogRoutes,
    ...authorityRoutes,
  ];

  const seenUrls = new Set<string>();
  const deduplicatedRoutes: MetadataRoute.Sitemap = [];

  for (const route of allRoutes) {
    if (!seenUrls.has(route.url)) {
      seenUrls.add(route.url);
      deduplicatedRoutes.push(route);
    }
  }

  return deduplicatedRoutes;
}
