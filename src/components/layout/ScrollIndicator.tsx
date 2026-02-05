import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ScrollIndicatorProps {
  items: TocItem[];
}

export function ScrollIndicator({ items }: ScrollIndicatorProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Find all section elements
      const sections = items
        .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return;

      // Calculate which section is currently in view
      const scrollPosition = window.scrollY + 150; // Offset for header

      // Find the last section that is above the scroll position
      let currentActiveId = '';
      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) {
          currentActiveId = section.id;
        }
      }

      setActiveId(currentActiveId);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block w-[240px] flex-shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
          On this page
        </p>
        <ul className="space-y-1 border-l border-border/50">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-1.5 text-sm transition-all duration-200 border-l-2 -ml-[2px] rounded-r-md ${
                  activeId === item.id
                    ? 'text-brand-primary border-brand-primary font-medium bg-brand-primary/5'
                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
