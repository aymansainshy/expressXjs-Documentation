import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Link2 } from 'lucide-react';
import { CodeBlock, InlineCode } from '@/components/ui-custom/CodeBlock';
import { Callout } from '@/components/ui-custom/Callout';

export { CodeBlock, InlineCode, Callout };

export function Article({
  eyebrow = 'ExpressX.js documentation',
  title,
  description,
  children,
  previous,
  next,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  previous?: { title: string; href: string };
  next?: { title: string; href: string };
}) {
  return (
    <article className="min-w-0 pb-12 sm:pb-16">
      <header className="mb-9 border-b border-border pb-8 sm:mb-12 sm:pb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary sm:text-sm sm:tracking-[0.18em]">
          {eyebrow}
        </p>
        <h1 id="page-title" className="scroll-mt-24 break-words text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8">{description}</p>
      </header>

      <div className="space-y-10 sm:space-y-12">{children}</div>

      {(previous || next) && (
        <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2" aria-label="Documentation pagination">
          {previous ? (
            <Link
              to={previous.href}
              className="group rounded-xl border border-border p-4 transition-colors hover:border-brand-primary/50 hover:bg-muted/40"
            >
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </span>
              <span className="mt-2 block font-semibold group-hover:text-brand-primary">{previous.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link
              to={next.href}
              className="group rounded-xl border border-border p-4 text-right transition-colors hover:border-brand-primary/50 hover:bg-muted/40"
            >
              <span className="flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Next <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="mt-2 block font-semibold group-hover:text-brand-primary">{next.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="group flex scroll-mt-24 items-start gap-2 break-words text-xl font-semibold leading-7 tracking-tight sm:items-center sm:text-2xl">
        {title}
        <a href={`#${id}`} aria-label={`Link to ${title}`} className="text-brand-primary opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100">
          <Link2 className="h-4 w-4" />
        </a>
      </h2>
      <div className="mt-4 min-w-0 space-y-4 break-words text-[15px] leading-7 text-foreground/80">{children}</div>
    </section>
  );
}

export function Subsection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div aria-labelledby={id} className="pt-2">
      <h3 id={id} className="group flex scroll-mt-24 items-start gap-2 break-words text-lg font-semibold tracking-tight text-foreground sm:items-center sm:text-xl">
        {title}
        <a href={`#${id}`} aria-label={`Link to ${title}`} className="text-brand-primary opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100">
          <Link2 className="h-3.5 w-3.5" />
        </a>
      </h3>
      <div className="mt-3 space-y-4">{children}</div>
    </div>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-base leading-7 text-foreground/80">{children}</p>;
}

export function BulletList({ children }: { children: ReactNode }) {
  return <ul className="ml-5 list-disc space-y-2 marker:text-brand-primary">{children}</ul>;
}

export function NumberedList({ children }: { children: ReactNode }) {
  return <ol className="ml-5 list-decimal space-y-2 marker:font-semibold marker:text-brand-primary">{children}</ol>;
}

export function Signature({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-muted/50 px-3 py-3 font-mono text-xs text-foreground [overflow-wrap:anywhere] sm:px-4 sm:text-sm">
      {children}
    </div>
  );
}

export function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="my-6 flex flex-col items-stretch gap-2 rounded-xl border border-border bg-muted/30 p-4 sm:flex-row sm:flex-wrap sm:items-center">
      {steps.map((step, index) => (
        <div key={`${step}-${index}`} className="contents">
          <span className="rounded-lg border border-border bg-background px-3 py-2 text-center text-sm font-medium text-foreground shadow-sm">
            {step}
          </span>
          {index < steps.length - 1 && <span className="rotate-90 text-center text-brand-primary sm:rotate-0" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  );
}

export interface ReferenceRow {
  name: ReactNode;
  signature?: ReactNode;
  description: ReactNode;
  notes?: ReactNode;
}

export function ReferenceTable({ rows }: { rows: ReferenceRow[] }) {
  return (
    <>
      <div className="my-6 space-y-3 md:hidden" aria-label="API reference">
        {rows.map((row, index) => (
          <dl key={index} className="min-w-0 rounded-xl border border-border bg-background p-4 shadow-sm">
            <div>
              <dt className="sr-only">API</dt>
              <dd className="break-words font-mono text-sm font-semibold text-brand-primary [overflow-wrap:anywhere]">{row.name}</dd>
            </div>
            <div className="mt-3 grid gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Signature / value</dt>
              <dd className="break-words font-mono text-xs text-foreground/80 [overflow-wrap:anywhere]">{row.signature ?? '—'}</dd>
            </div>
            <div className="mt-3 grid gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Behavior</dt>
              <dd className="text-sm leading-6 text-foreground/80">{row.description}</dd>
            </div>
            <div className="mt-3 grid gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Important notes</dt>
              <dd className="text-sm leading-6 text-muted-foreground">{row.notes ?? '—'}</dd>
            </div>
          </dl>
        ))}
      </div>
      <div className="my-6 hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-muted/70 text-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">API</th>
              <th className="px-4 py-3 font-semibold">Signature / value</th>
              <th className="px-4 py-3 font-semibold">Behavior</th>
              <th className="px-4 py-3 font-semibold">Important notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, index) => (
              <tr key={index} className="align-top">
                <td className="px-4 py-3 font-mono text-xs font-semibold text-brand-primary">{row.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground/80">{row.signature ?? '—'}</td>
                <td className="px-4 py-3 text-foreground/80">{row.description}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.notes ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function CommandTable({ rows }: { rows: Array<{ command: string; purpose: string; result: string }> }) {
  return (
    <>
      <div className="my-6 space-y-3 md:hidden" aria-label="Commands">
        {rows.map((row) => (
          <dl key={row.command} className="min-w-0 rounded-xl border border-border bg-background p-4 shadow-sm">
            <div>
              <dt className="sr-only">Command</dt>
              <dd className="break-words font-mono text-sm font-semibold text-brand-primary [overflow-wrap:anywhere]">{row.command}</dd>
            </div>
            <div className="mt-3 grid gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Purpose</dt>
              <dd className="text-sm leading-6 text-foreground/80">{row.purpose}</dd>
            </div>
            <div className="mt-3 grid gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Expected result</dt>
              <dd className="text-sm leading-6 text-muted-foreground">{row.result}</dd>
            </div>
          </dl>
        ))}
      </div>
      <div className="my-6 hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-muted/70 text-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Command</th>
              <th className="px-4 py-3 font-semibold">Purpose</th>
              <th className="px-4 py-3 font-semibold">Expected result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.command} className="align-top">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-brand-primary">{row.command}</td>
                <td className="px-4 py-3 text-foreground/80">{row.purpose}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
