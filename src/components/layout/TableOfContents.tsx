import { useEffect, useState } from 'react';
import type { TocItem } from '@/types';

interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
  pageId?: string;
}

export function TableOfContents({ items, activeId, pageId }: TableOfContentsProps) {
  const [currentId, setCurrentId] = useState(activeId || items[0]?.id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = items.length - 1; i >= 0; i--) {
        const element = document.getElementById(items[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block w-[240px] flex-shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
          On this page
        </p>
        <ul className="space-y-1 border-l border-border">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
            >
              <a
                href={
                  pageId
                    ? item.id === pageId
                      ? `#/doc/${pageId}`
                      : `#/doc/${pageId}/${item.id}`
                    : `#${item.id}`
                }
                className={`block px-3 py-1.5 text-sm transition-all duration-200 border-l-2 -ml-[2px] ${
                  currentId === item.id
                    ? 'text-brand-primary border-brand-primary font-medium'
                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    const offset = 100;
                    const top = element.offsetTop - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                    setCurrentId(item.id);
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
