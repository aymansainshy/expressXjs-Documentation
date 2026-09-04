import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, Book, Sparkles } from 'lucide-react';
import { docsNavigation, type NavItem } from '@/data/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function SidebarItem({ item, depth = 0, onNavigate }: { item: NavItem; depth?: number; onNavigate: () => void }) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(() => {
    // Auto-expand if current path matches this item or its children
    if (item.items) {
      return item.items.some(child => location.pathname === child.path);
    }
    return false;
  });

  const hasChildren = item.items && item.items.length > 0;
  const isActive = location.pathname === item.path;
  const isChildActive = item.items?.some(child => location.pathname === child.path);
  const showChildren = Boolean(isExpanded || isChildActive);

  return (
    <div className="select-none">
      {hasChildren ? (
        <button
          onClick={() => setIsExpanded(!showChildren)}
          className={`w-full flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
            isActive || isChildActive
              ? 'text-brand-primary font-medium bg-brand-primary/5'
              : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          <span className="flex-shrink-0">
            {showChildren ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
          <span className="flex-1 text-left truncate">{item.title}</span>
        </button>
      ) : (
        <Link
          to={item.path}
          onClick={onNavigate}
          className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
            isActive
              ? 'text-brand-primary font-medium bg-brand-primary/5'
              : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          <span className="flex-1 truncate">{item.title}</span>
        </Link>
      )}

      {hasChildren && showChildren && (
        <div className="mt-1 space-y-0.5 animate-in slide-in-from-top-1 duration-200">
          {item.items!.map((child) => (
            <Link
              key={child.id}
              to={child.path}
              onClick={onNavigate}
              className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                location.pathname === child.path
                  ? 'text-brand-primary font-medium bg-brand-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              style={{ paddingLeft: `${(depth + 1) * 12 + 24}px` }}
            >
              <span className="truncate">{child.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay - z-40 to be below header (z-50) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - z-40 to be below header (z-50) */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-[calc(100vw-2rem)] max-w-[280px] border-r border-border bg-background transition-transform duration-300 ease-out lg:sticky lg:w-[280px] lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            {/* Documentation sections */}
            <div className="space-y-1">
              <div className="px-3 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Documentation
                </span>
              </div>
              {docsNavigation.map((item) => (
                <SidebarItem key={item.id} item={item} onNavigate={onClose} />
              ))}
            </div>

            {/* Bottom links */}
            <div className="pt-4 border-t border-border space-y-1">
              <Link
                to="/docs/reference/limitations"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                <Book className="w-4 h-4" />
                Limitations
              </Link>
              <Link
                to="/docs/reference/api"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                API Reference
              </Link>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
