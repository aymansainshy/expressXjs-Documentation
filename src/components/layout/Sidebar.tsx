import { useState } from 'react';
import { ChevronRight, ChevronDown, Book, Sparkles } from 'lucide-react';
import { navigation } from '@/data/navigation';
import type { NavItem } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

interface NavItemComponentProps {
  item: NavItem;
  depth?: number;
  activeSection: string;
  expandedItems: string[];
  toggleItem: (id: string) => void;
}

function NavItemComponent({
  item,
  depth = 0,
  activeSection,
  expandedItems,
  toggleItem,
}: NavItemComponentProps) {
  const hasChildren = item.items && item.items.length > 0;
  const isExpanded = expandedItems.includes(item.id);
  const hasHref = Boolean(item.href);
  const isActive = activeSection === item.id || activeSection.startsWith(item.id + '-');
  const isChildActive = item.items?.some((child) => child.id === activeSection);

  return (
    <div className="select-none">
      <a
        href={item.href ?? '#'}
        onClick={(e) => {
          if (hasChildren) {
            toggleItem(item.id);
            if (!hasHref) {
              e.preventDefault();
            }
          }
        }}
        className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
          isActive || isChildActive
            ? 'text-brand-primary font-medium bg-brand-primary/5'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        } ${depth > 0 ? 'ml-4' : ''}`}
        style={{ paddingLeft: depth > 0 ? `${depth * 12 + 12}px` : '12px' }}
      >
        {hasChildren && (
          <span className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        <span className="flex-1 truncate">{item.title}</span>
        {item.id === 'deployment' && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-brand-primary/10 text-brand-primary border-0">
            NEW
          </Badge>
        )}
      </a>

      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-0.5 animate-accordion-down">
          {item.items!.map((child) => (
            <NavItemComponent
              key={child.id}
              item={child}
              depth={depth + 1}
              activeSection={activeSection}
              expandedItems={expandedItems}
              toggleItem={toggleItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ isOpen, onClose, activeSection }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // Auto-expand sections that contain the active item
    const expanded: string[] = [];
    navigation.forEach((item) => {
      if (item.items?.some((child) => child.id === activeSection || activeSection.startsWith(child.id))) {
        expanded.push(item.id);
      }
    });
    return expanded;
  });

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-16 lg:top-20 left-0 z-40 w-[85vw] max-w-[320px] lg:w-[280px] h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] bg-background border-r border-border transition-transform duration-300 ease-expo-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            {/* Introduction section */}
            <div className="space-y-1">
              <div className="px-3 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Introduction
                </span>
              </div>
              {navigation
                .filter((item) => item.id === 'introduction')
                .map((item) => (
                  <NavItemComponent
                    key={item.id}
                    item={item}
                    activeSection={activeSection}
                    expandedItems={expandedItems}
                    toggleItem={toggleItem}
                  />
                ))}
            </div>

            {/* Overview section */}
            <div className="space-y-1">
              <div className="px-3 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Overview
                </span>
              </div>
              {navigation
                .filter((item) => item.id !== 'introduction')
                .map((item) => (
                  <NavItemComponent
                    key={item.id}
                    item={item}
                    activeSection={activeSection}
                    expandedItems={expandedItems}
                    toggleItem={toggleItem}
                  />
                ))}
            </div>

            {/* Bottom links */}
            <div className="pt-4 border-t border-border space-y-1">
              <a
                href="#migration-guide"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
              >
                <Book className="w-4 h-4" />
                Migration Guide
              </a>
              <a
                href="#api-reference"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                API Reference
              </a>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
