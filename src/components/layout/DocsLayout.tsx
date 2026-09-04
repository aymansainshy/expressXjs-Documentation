import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { ScrollIndicator } from './ScrollIndicator';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function DocsLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  // Extract headings from the page content when route changes
  useEffect(() => {
    const extractHeadings = () => {
      // Wait for content to render
      setTimeout(() => {
        const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
        const items: TocItem[] = Array.from(headings).map((heading) => ({
          id: heading.id,
          title: heading.textContent?.replace('#', '').trim() || '',
          level: heading.tagName === 'H1' ? 1 : heading.tagName === 'H2' ? 2 : 3,
        })).filter(item => item.title && item.id);
        
        setTocItems(items);
      }, 100);
    };

    extractHeadings();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        showMenuButton={true}
      />
      
      <div className="mx-auto flex max-w-[1600px] pt-16">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
          <div className="flex min-w-0 gap-8">
            {/* Main content */}
            <div className="w-full min-w-0 flex-1 max-w-3xl">
              <Outlet />
            </div>
            
            {/* Scroll indicator on the right */}
            <ScrollIndicator items={tocItems} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
