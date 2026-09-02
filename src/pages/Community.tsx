import { ExternalLink, FileText, Github, Scale, TriangleAlert } from 'lucide-react';

const resources = [
  {
    icon: Github,
    title: 'Source repository',
    description: 'Read Core and CLI source, inspect commits, and contribute changes.',
    href: 'https://github.com/aymansainshy/expressXjs',
  },
  {
    icon: TriangleAlert,
    title: 'Issues',
    description: 'Report a reproducible bug or propose a focused framework improvement.',
    href: 'https://github.com/aymansainshy/expressXjs/issues',
  },
  {
    icon: FileText,
    title: 'Documentation source',
    description: 'Contribute corrections and examples to this documentation site.',
    href: 'https://github.com/aymansainshy/expressXjs-Documentation',
  },
  {
    icon: Scale,
    title: 'MIT license',
    description: 'Review the terms under which ExpressX.js is distributed.',
    href: 'https://github.com/aymansainshy/expressXjs/blob/main/LICENSE',
  },
];

export function Community() {
  return (
    <div className="min-h-screen pt-16">
      <section className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">Open source</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">ExpressX.js community</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">The repository is the source of truth for development, issue tracking, and contributions. There are no undocumented community programs or support channels listed here.</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {resources.map((resource) => (
            <a key={resource.title} href={resource.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-primary/50">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"><resource.icon className="h-5 w-5" /></div>
                <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-brand-primary" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">{resource.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{resource.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
