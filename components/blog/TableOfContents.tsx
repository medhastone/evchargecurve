'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TOCItem {
  id: string;
  label: string;
  level: number;
}

export function TableOfContents({ items, className }: { items: TOCItem[], className?: string }) {
  const [activeId, setActiveId] = useState<string>('');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by top position to pick the highest visible heading
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-10% 0px -40% 0px',
        threshold: 1.0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header/floating bar if any
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn("bg-[#131B2A]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl", className)}>
      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-3">
        Table of Contents
      </h4>
      <ul className="space-y-3 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li 
              key={item.id} 
              className={cn(
                "transition-colors duration-200",
                item.level === 3 ? "ml-4 border-l border-slate-700/50 pl-3" : ""
              )}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "flex items-center gap-2 text-sm leading-snug transition-colors",
                  isActive 
                    ? "text-cyan-400 font-medium" 
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {isActive && item.level === 2 && (
                  <ChevronRight className="w-3 h-3 shrink-0 text-cyan-400" />
                )}
                <span className={cn(isActive && item.level === 2 ? "" : "pl-5")}>
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
