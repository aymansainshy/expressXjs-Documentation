import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { ScrollIndicator } from './ScrollIndicator';
import { DocsVersionProvider } from '@/context/DocsVersionContext';
import { LATEST_DOCS_VERSION, type DocsPageDefinition, type DocsVersionDefinition } from '@/docs/registry';
import { getDocsPath } from '@/docs/paths';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function DocsLayout({
  definition,
  activePage,
  children,
}: {
  definition: DocsVersionDefinition;
  activePage?: DocsPageDefinition;
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const extractHeadings = () => {
      const headings = contentRef.current?.querySelectorAll('h1[id], h2[id], h3[id]') ?? [];
      const items: TocItem[] = Array.from(headings)
        .map((heading) => ({
          id: heading.id,
          title: heading.textContent?.replace('#', '').trim() || '',
          level: heading.tagName === 'H1' ? 1 : heading.tagName === 'H2' ? 2 : 3,
        }))
        .filter((item) => item.title && item.id);
      setTocItems(items);
    };

    const animationFrame = window.requestAnimationFrame(extractHeadings);
    const observer = new MutationObserver(extractHeadings);
    if (contentRef.current) {
      observer.observe(contentRef.current, { childList: true, subtree: true });
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [location.pathname]);

  const latestPagePath = getDocsPath(LATEST_DOCS_VERSION, activePage?.slug);

  return (
    <DocsVersionProvider definition={definition} activePage={activePage}>
      <div className="min-h-screen bg-background text-foreground">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          showMenuButton={true}
        />

        <div className="mx-auto flex max-w-[1600px] pt-16">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
            <div className="flex min-w-0 gap-8">
              {/* Main content */}
              <div ref={contentRef} className="w-full min-w-0 flex-1 max-w-3xl">
                {definition.status === 'legacy' && (
                  <div className="mb-8 flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-foreground/80">
                      You are viewing documentation for ExpressX.js {definition.id}, an older release.
                    </p>
                    <Link
                      to={latestPagePath}
                      className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-primary hover:underline"
                    >
                      View {LATEST_DOCS_VERSION} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
                {children}
              </div>

              {/* Scroll indicator on the right */}
              <ScrollIndicator items={tocItems} />
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </DocsVersionProvider>
  );
}
