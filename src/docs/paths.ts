export function getDocsPath(version: string, slug = 'introduction') {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '') || 'introduction';
  return `/docs/${version}/${normalizedSlug}`;
}

export function scopeDocsHref(href: string, version: string) {
  if (href === '/docs' || href === '/docs/') {
    return getDocsPath(version);
  }

  if (!href.startsWith('/docs/')) {
    return href;
  }

  if (/^\/docs\/\d+\.\d+\.\d+(?:\/|$)/.test(href)) {
    return href;
  }

  return `/docs/${version}/${href.slice('/docs/'.length)}`;
}
