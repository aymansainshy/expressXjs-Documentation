import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Github, Moon, Sun, Menu, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { mainNav } from '@/data/navigation';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuClick, showMenuButton = false }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ease-out ${
        isScrolled 
          ? isDark 
            ? 'bg-[#0D1117]/90 border-b border-[#30363D]/50 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-white/90 border-b border-gray-200/50 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
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
            <span className={`font-semibold text-lg hidden sm:block transition-colors ${
              isScrolled ? 'text-foreground' : 'text-foreground'
            }`}>Framework</span>
          </Link>
        </div>

        {/* Center navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainNav.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                  ? 'text-brand-primary'
                  : isScrolled
                    ? 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {link.label}
              {(location.pathname === link.path || location.pathname.startsWith(link.path + '/')) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline text-sm">Search</span>
                <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-black/5 dark:bg-white/10 rounded border border-black/10 dark:border-white/10">
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
            </DialogContent>
          </Dialog>

          {/* GitHub */}
          <a
            href="https://github.com/framework/framework"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-all duration-200 ${
              isScrolled
                ? 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isScrolled
                ? 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
              isScrolled
                ? 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden absolute top-16 left-0 right-0 border-b shadow-lg transition-colors ${
          isDark ? 'bg-[#0D1117] border-[#30363D]' : 'bg-white border-gray-200'
        }`}>
          <nav className="flex flex-col p-4 space-y-1">
            {mainNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                    ? 'text-brand-primary bg-brand-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
