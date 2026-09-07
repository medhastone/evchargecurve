import React from 'react';
import Script from 'next/script';

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "WebApplication"],
    "name": "EVChargeCurve",
    "url": "https://evchargecurve.com",
    "description": "High-performance platform for EV battery diagnostics, DC fast-charging taper curves, winter range degradation, and home charging economics.",
    "creator": {
      "@type": "Organization",
      "name": "Medhastone",
      "url": "https://zentova.in/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Medhastone",
      "url": "https://zentova.in/"
    },
    "sameAs": [
      "https://zentova.in/",
      "https://m4atomp3converter.com/en"
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
