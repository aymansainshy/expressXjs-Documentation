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
      
      <div className="flex max-w-[1600px] mx-auto pt-16">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex gap-8">
            {/* Main content */}
            <div className="flex-1 max-w-3xl">
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
