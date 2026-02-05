import { Link } from 'react-router-dom';
import { Github, Twitter, MessageCircle, Heart } from 'lucide-react';

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api-reference' },
      { label: 'Examples', href: '/examples' },
      { label: 'Changelog', href: '/docs/changelog' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Community', href: '/community' },
      { label: 'Blog', href: '/blog' },
      { label: 'Tutorials', href: '/docs/tutorials' },
      { label: 'Support', href: '/support' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Brand', href: '/brand' },
    ],
  },
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/framework', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/framework', label: 'GitHub' },
  { icon: MessageCircle, href: 'https://discord.gg/framework', label: 'Discord' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and description */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center shadow-glow">
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
              <span className="font-semibold text-lg">Framework</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              A progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-sm mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-brand-primary fill-brand-primary" /> by the Framework Team
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/license" className="hover:text-foreground transition-colors">
              License
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
