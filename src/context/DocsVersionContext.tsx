import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { DocsPageDefinition, DocsVersionDefinition } from '@/docs/registry';
import { scopeDocsHref } from '@/docs/paths';

interface DocsVersionContextValue {
  definition: DocsVersionDefinition;
  activePage?: DocsPageDefinition;
  pathFor: (href: string) => string;
}

const DocsVersionContext = createContext<DocsVersionContextValue | null>(null);

export function DocsVersionProvider({
  definition,
  activePage,
  children,
}: {
  definition: DocsVersionDefinition;
  activePage?: DocsPageDefinition;
  children: ReactNode;
}) {
  const value = useMemo<DocsVersionContextValue>(
    () => ({
      definition,
      activePage,
      pathFor: (href) => scopeDocsHref(href, definition.id),
    }),
    [activePage, definition],
  );

  return <DocsVersionContext.Provider value={value}>{children}</DocsVersionContext.Provider>;
}

export function useOptionalDocsVersion() {
  return useContext(DocsVersionContext);
}

export function useDocsVersion() {
  const context = useOptionalDocsVersion();
  if (!context) {
    throw new Error('useDocsVersion must be used inside DocsVersionProvider.');
  }
  return context;
}
