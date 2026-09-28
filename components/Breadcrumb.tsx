import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  includeJsonLd?: boolean;
}

export default function Breadcrumb({ items, className = '', includeJsonLd = true }: BreadcrumbProps) {
  // Filter out redundant 'Home' entries if passed in items array
  const displayItems = items.filter(
    item => item.label.trim().toLowerCase() !== 'home'
  );

  // Schema.org BreadcrumbList JSON-LD
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://evchargecurve.com',
      },
      ...displayItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: item.href.startsWith('http') ? item.href : `https://evchargecurve.com${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      {includeJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-xs sm:text-sm text-slate-400 mb-6 font-medium relative z-10 ${
          className.includes('justify-') ? className : `justify-start ${className}`
        }`}
      >
        <ol className="inline-flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="hover:text-emerald-400 text-slate-400 transition-colors inline-flex items-center gap-1.5 group"
            >
              <Home className="w-3.5 h-3.5 group-hover:text-emerald-400 transition-colors" />
              <span>Home</span>
            </Link>
          </li>
          {displayItems.map((item, idx) => {
            const isLast = idx === displayItems.length - 1;
            return (
              <li key={idx} className="inline-flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-emerald-400 text-slate-400 transition-colors line-clamp-1 max-w-[200px] sm:max-w-xs"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-slate-200 font-semibold line-clamp-1 max-w-[280px] sm:max-w-md"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
