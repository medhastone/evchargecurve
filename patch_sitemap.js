const fs = require('fs');
let sitemap = fs.readFileSync('app/sitemap.ts', 'utf8');

const replacement = `  const routes = [
    {
      url: \`\${BASE_URL}/\`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: \`\${BASE_URL}/compare\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/preconditioning\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/idle-drain\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/destination-charging\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/panel-capacity\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/battery-health\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/range-loss\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/home-charging\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/carbon-offset\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/v2h-backup\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/methodology\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: \`\${BASE_URL}/how-it-works\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];`;

sitemap = sitemap.replace(/const routes = \[[\s\S]*?\];/, replacement);
fs.writeFileSync('app/sitemap.ts', sitemap);
