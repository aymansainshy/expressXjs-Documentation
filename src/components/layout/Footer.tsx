import { Link } from 'react-router-dom';
import { Github, Heart } from 'lucide-react';

const links = [
  { label: 'Introduction', href: '/docs/introduction' },
  { label: 'Quick start', href: '/docs/getting-started/quick-start' },
  { label: 'CLI', href: '/docs/cli' },
  { label: 'API reference', href: '/docs/reference/api' },
  { label: 'Troubleshooting', href: '/docs/reference/troubleshooting' },
  { label: 'Limitations', href: '/docs/reference/limitations' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-sm font-bold text-white">X</div>
              ExpressX.js
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A lightweight, object-oriented, decorator-based TypeScript framework built on Express.</p>
            <a href="https://github.com/aymansainshy/expressXjs" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><Github className="h-4 w-4" /> GitHub</a>
          </div>
          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3" aria-label="Footer navigation">
            {links.map((link) => <Link key={link.href} to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-brand-primary">{link.label}</Link>)}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Core and CLI documentation for version 0.0.5.</span>
          <span className="flex items-center gap-1">Open source with <Heart className="h-3.5 w-3.5 fill-brand-primary text-brand-primary" /> under the MIT license.</span>
        </div>
      </div>
    </footer>
  );
}
