import React from 'react';
import { getToolStructuredData, ToolKey } from '@/lib/seoConfig';

interface StructuredDataProps {
  toolKey: ToolKey;
  customSchema?: object;
}

export default function StructuredData({ toolKey, customSchema }: StructuredDataProps) {
  const schemaData = customSchema || getToolStructuredData(toolKey);

  return (
    <script
      id={`structured-data-${toolKey}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}
