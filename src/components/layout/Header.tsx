import { useState, useEffect } from 'react';
import { Search, Github, Moon, Sun, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { headerLinks } from '@/data/navigation';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  currentPage: 'home' | 'docs' | 'examples' | 'community';
}

export function Header({ isDark, toggleTheme, onMenuClick, isSidebarOpen, currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-expo-out ${
        isScrolled
          ? 'h-16 glass border-b border-border/50 shadow-sm'
          : 'h-20 bg-transparent'
      }`}
    >
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {currentPage === 'docs' && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Logo */}
          <a
            href="#/"
            className="flex items-center gap-2 group transition-transform duration-300 ease-elastic hover:scale-105"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-semibold text-lg hidden sm:block">Framework</span>
          </a>
        </div>

        {/* Center navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {headerLinks.map((link) => {
            const isActive = link.page === currentPage;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-brand-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-primary" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline text-sm">Search</span>
                <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-muted rounded border">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
              <DialogHeader className="p-4 border-b">
                <DialogTitle className="sr-only">Search documentation</DialogTitle>
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search documentation..."
                    className="border-0 shadow-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1 rounded hover:bg-muted"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </DialogHeader>
              <div className="p-4">
                <p className="text-sm text-muted-foreground text-center py-8">
                  Start typing to search documentation...
                </p>
              </div>
              <div className="p-3 border-t bg-muted/50 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background rounded border">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-background rounded border">↓</kbd>
                    <span>to navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background rounded border">↵</kbd>
                    <span>to select</span>
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background rounded border">esc</kbd>
                  <span>to close</span>
                </span>
              </div>
            </DialogContent>
          </Dialog>

          {/* GitHub */}
          <a
            href="https://github.com/framework/framework"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* CTA Button */}
          <Button
            className="hidden sm:flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white transition-all duration-200 hover:gap-3"
          >
            Get Started
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
