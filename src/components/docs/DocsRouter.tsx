import { Suspense } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';
import { DocsLayout } from '@/components/layout/DocsLayout';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import {
  docsVersionDefinitions,
  getDocsVersion,
  getLatestDocsVersion,
  looksLikeDocsVersion,
  resolveDocsPage,
} from '@/docs/registry';
import { getDocsPath } from '@/docs/paths';

function VersionNotFound({ version }: { version: string }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 pb-16 pt-28 sm:px-6">
        <div className="w-full rounded-2xl border border-border bg-muted/20 p-6 shadow-sm sm:p-10">
          <AlertTriangle className="h-10 w-10 text-brand-primary" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-primary">Documentation version unavailable</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Version {version} is not published here</h1>
          <p className="mt-4 leading-7 text-muted-foreground">Choose one of the available documentation snapshots:</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {docsVersionDefinitions.map((definition) => (
              <Link
                key={definition.id}
                to={getDocsPath(definition.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-brand-primary/50 hover:text-brand-primary"
              >
                {definition.id}{definition.status === 'latest' ? ' — Latest' : ''}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PageNotFound({ version }: { version: string }) {
  return (
    <article className="pb-16">
      <BookOpen className="h-10 w-10 text-brand-primary" />
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-primary">ExpressX.js {version}</p>
      <h1 id="page-title" className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Documentation page not found</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">This page is not part of the {version} documentation snapshot.</p>
      <Link
        to={getDocsPath(version)}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-dark"
      >
        Open the introduction <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

function PageLoading() {
  return (
    <div className="animate-pulse space-y-8 pb-16" aria-label="Loading documentation page">
      <div className="space-y-4 border-b border-border pb-8">
        <div className="h-3 w-36 rounded bg-muted" />
        <div className="h-11 w-3/4 rounded bg-muted" />
        <div className="h-5 w-full max-w-2xl rounded bg-muted" />
      </div>
      <div className="h-7 w-48 rounded bg-muted" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-11/12 rounded bg-muted" />
        <div className="h-4 w-4/5 rounded bg-muted" />
      </div>
    </div>
  );
}

export function DocsRouter() {
  const location = useLocation();
  const relativePath = location.pathname.replace(/^\/docs\/?/, '');
  const segments = relativePath.split('/').filter(Boolean);
  const requestedVersion = segments[0];
  const definition = requestedVersion ? getDocsVersion(requestedVersion) : undefined;

  if (!definition) {
    if (requestedVersion && looksLikeDocsVersion(requestedVersion)) {
      return <VersionNotFound version={requestedVersion} />;
    }

    const latest = getLatestDocsVersion();
    const legacySlug = segments.join('/') || 'introduction';
    const legacyPage = resolveDocsPage(latest, legacySlug);
    const destination = legacyPage?.path ?? getDocsPath(latest.id, legacySlug);
    return <Navigate replace to={`${destination}${location.search}${location.hash}`} />;
  }

  const requestedSlug = segments.slice(1).join('/') || 'introduction';
  const page = resolveDocsPage(definition, requestedSlug);

  if (page && (page.slug !== requestedSlug || segments.length === 1)) {
    return <Navigate replace to={`${page.path}${location.search}${location.hash}`} />;
  }

  const Page = page?.component;

  return (
    <DocsLayout definition={definition} activePage={page}>
      {Page ? (
        <Suspense fallback={<PageLoading />}>
          <Page />
        </Suspense>
      ) : (
        <PageNotFound version={definition.id} />
      )}
    </DocsLayout>
  );
}
