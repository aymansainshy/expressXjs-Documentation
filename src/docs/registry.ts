import { lazy, type ComponentType } from 'react';
import { getDocsPath } from '@/docs/paths';

function lazyPage<TModule>(loader: () => Promise<TModule>, exportName: keyof TModule): ComponentType {
  return lazy(async () => {
    const module = await loader();
    return { default: module[exportName] as unknown as ComponentType };
  });
}

const gettingStarted008 = () => import('@/pages/docs/versions/v0_0_8/GettingStarted');
const coreConcepts008 = () => import('@/pages/docs/versions/v0_0_8/CoreConcepts');
const runtimeGuide008 = () => import('@/pages/docs/versions/v0_0_8/RuntimeGuide');
const autoConfiguration008 = () => import('@/pages/docs/versions/v0_0_8/AutoConfiguration');
const architecture008 = () => import('@/pages/docs/versions/v0_0_8/Architecture');
const cli008 = () => import('@/pages/docs/versions/v0_0_8/CLI');
const operations008 = () => import('@/pages/docs/versions/v0_0_8/Operations');
const reference008 = () => import('@/pages/docs/versions/v0_0_8/Reference');
const gettingStarted007 = () => import('@/pages/docs/versions/v0_0_7/GettingStarted');
const coreConcepts007 = () => import('@/pages/docs/versions/v0_0_7/CoreConcepts');
const runtimeGuide007 = () => import('@/pages/docs/versions/v0_0_7/RuntimeGuide');
const autoConfiguration007 = () => import('@/pages/docs/versions/v0_0_7/AutoConfiguration');
const architecture007 = () => import('@/pages/docs/versions/v0_0_7/Architecture');
const cli007 = () => import('@/pages/docs/versions/v0_0_7/CLI');
const operations007 = () => import('@/pages/docs/versions/v0_0_7/Operations');
const reference007 = () => import('@/pages/docs/versions/v0_0_7/Reference');

export const DOCS_VERSIONS = ['0.0.8', '0.0.7'] as const;
export type DocsVersion = (typeof DOCS_VERSIONS)[number];
export const LATEST_DOCS_VERSION: DocsVersion = DOCS_VERSIONS[0];

type DocsPageKey =
  | 'introduction'
  | 'installation'
  | 'quick-start'
  | 'project-structure'
  | 'application'
  | 'architecture'
  | 'auto-configuration-cache'
  | 'controllers-routing'
  | 'dependency-injection'
  | 'request-response'
  | 'request-pipeline'
  | 'error-handling'
  | 'discovery-configuration'
  | 'cli-overview'
  | 'commands'
  | 'generators'
  | 'complete-application'
  | 'build-deployment'
  | 'api-reference'
  | 'troubleshooting'
  | 'limitations';

interface PageBlueprint {
  key: DocsPageKey;
  title: string;
  slug: string;
  footerLabel?: string;
}

interface GroupBlueprint {
  id: string;
  title: string;
  standalone?: boolean;
  pages: PageBlueprint[];
}

const docsStructure: GroupBlueprint[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    standalone: true,
    pages: [{ key: 'introduction', title: 'Introduction', slug: 'introduction', footerLabel: 'Introduction' }],
  },
  {
    id: 'getting-started',
    title: 'Getting started',
    pages: [
      { key: 'installation', title: 'Installation', slug: 'getting-started/installation' },
      { key: 'quick-start', title: 'Quick start', slug: 'getting-started/quick-start', footerLabel: 'Quick start' },
      { key: 'project-structure', title: 'Project structure', slug: 'getting-started/project-structure' },
    ],
  },
  {
    id: 'core',
    title: 'Core concepts',
    pages: [
      { key: 'application', title: 'Application & lifecycle', slug: 'core/application' },
      { key: 'architecture', title: 'Architecture', slug: 'core/architecture' },
      { key: 'auto-configuration-cache', title: 'Auto-configuration & cache', slug: 'core/auto-configuration-cache' },
      { key: 'controllers-routing', title: 'Controllers & routing', slug: 'core/controllers-routing' },
      { key: 'dependency-injection', title: 'Dependency injection', slug: 'core/dependency-injection' },
      { key: 'request-response', title: 'Request & response', slug: 'core/request-response' },
      { key: 'request-pipeline', title: 'Request pipeline', slug: 'core/request-pipeline' },
      { key: 'error-handling', title: 'Error handling', slug: 'core/error-handling' },
      { key: 'discovery-configuration', title: 'Discovery & configuration', slug: 'core/discovery-configuration' },
    ],
  },
  {
    id: 'cli',
    title: 'CLI',
    pages: [
      { key: 'cli-overview', title: 'CLI overview', slug: 'cli', footerLabel: 'CLI' },
      { key: 'commands', title: 'Commands', slug: 'cli/commands' },
      { key: 'generators', title: 'Generators', slug: 'cli/generators' },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    pages: [
      { key: 'complete-application', title: 'Complete application', slug: 'examples/complete-application' },
      { key: 'build-deployment', title: 'Build & deployment', slug: 'operations/build-deployment' },
    ],
  },
  {
    id: 'reference',
    title: 'Reference',
    pages: [
      { key: 'api-reference', title: 'API reference', slug: 'reference/api', footerLabel: 'API reference' },
      { key: 'troubleshooting', title: 'Troubleshooting', slug: 'reference/troubleshooting', footerLabel: 'Troubleshooting' },
      { key: 'limitations', title: 'Limitations & versioning', slug: 'reference/limitations', footerLabel: 'Limitations' },
    ],
  },
];

type VersionComponents = Record<DocsPageKey, ComponentType>;

export interface DocsPageDefinition {
  id: DocsPageKey;
  title: string;
  slug: string;
  path: string;
  component: ComponentType;
  footerLabel?: string;
}

export interface DocsNavItem {
  id: string;
  title: string;
  path: string;
  items?: DocsNavItem[];
}

export interface DocsVersionDefinition {
  id: DocsVersion;
  label: string;
  status: 'latest' | 'legacy';
  pages: DocsPageDefinition[];
  navigation: DocsNavItem[];
}

const components008: VersionComponents = {
  introduction: lazyPage(gettingStarted008, 'Introduction'),
  installation: lazyPage(gettingStarted008, 'Installation'),
  'quick-start': lazyPage(gettingStarted008, 'QuickStart'),
  'project-structure': lazyPage(gettingStarted008, 'ProjectStructure'),
  application: lazyPage(coreConcepts008, 'ApplicationLifecycle'),
  architecture: lazyPage(architecture008, 'Architecture'),
  'auto-configuration-cache': lazyPage(autoConfiguration008, 'AutoConfigurationCache'),
  'controllers-routing': lazyPage(coreConcepts008, 'ControllersRouting'),
  'dependency-injection': lazyPage(coreConcepts008, 'DependencyInjection'),
  'request-response': lazyPage(runtimeGuide008, 'RequestResponseGuide'),
  'request-pipeline': lazyPage(runtimeGuide008, 'RequestPipeline'),
  'error-handling': lazyPage(runtimeGuide008, 'ErrorHandling'),
  'discovery-configuration': lazyPage(runtimeGuide008, 'DiscoveryConfiguration'),
  'cli-overview': lazyPage(cli008, 'CLIOverview'),
  commands: lazyPage(cli008, 'CLICommands'),
  generators: lazyPage(cli008, 'Generators'),
  'complete-application': lazyPage(operations008, 'CompleteApplication'),
  'build-deployment': lazyPage(operations008, 'BuildDeployment'),
  'api-reference': lazyPage(reference008, 'APIReference'),
  troubleshooting: lazyPage(reference008, 'Troubleshooting'),
  limitations: lazyPage(reference008, 'LimitationsVersioning'),
};

const components007: VersionComponents = {
  introduction: lazyPage(gettingStarted007, 'Introduction'),
  installation: lazyPage(gettingStarted007, 'Installation'),
  'quick-start': lazyPage(gettingStarted007, 'QuickStart'),
  'project-structure': lazyPage(gettingStarted007, 'ProjectStructure'),
  application: lazyPage(coreConcepts007, 'ApplicationLifecycle'),
  architecture: lazyPage(architecture007, 'Architecture'),
  'auto-configuration-cache': lazyPage(autoConfiguration007, 'AutoConfigurationCache'),
  'controllers-routing': lazyPage(coreConcepts007, 'ControllersRouting'),
  'dependency-injection': lazyPage(coreConcepts007, 'DependencyInjection'),
  'request-response': lazyPage(runtimeGuide007, 'RequestResponseGuide'),
  'request-pipeline': lazyPage(runtimeGuide007, 'RequestPipeline'),
  'error-handling': lazyPage(runtimeGuide007, 'ErrorHandling'),
  'discovery-configuration': lazyPage(runtimeGuide007, 'DiscoveryConfiguration'),
  'cli-overview': lazyPage(cli007, 'CLIOverview'),
  commands: lazyPage(cli007, 'CLICommands'),
  generators: lazyPage(cli007, 'Generators'),
  'complete-application': lazyPage(operations007, 'CompleteApplication'),
  'build-deployment': lazyPage(operations007, 'BuildDeployment'),
  'api-reference': lazyPage(reference007, 'APIReference'),
  troubleshooting: lazyPage(reference007, 'Troubleshooting'),
  limitations: lazyPage(reference007, 'LimitationsVersioning'),
};

function createVersionDefinition(
  id: DocsVersion,
  status: DocsVersionDefinition['status'],
  components: VersionComponents,
): DocsVersionDefinition {
  const pages = docsStructure.flatMap((group) =>
    group.pages.map((page) => ({
      id: page.key,
      title: page.title,
      slug: page.slug,
      path: getDocsPath(id, page.slug),
      component: components[page.key],
      footerLabel: page.footerLabel,
    })),
  );
  const pagesById = new Map(pages.map((page) => [page.id, page]));

  const navigation = docsStructure.map((group): DocsNavItem => {
    const groupPages = group.pages.map((page) => pagesById.get(page.key)!);
    if (group.standalone) {
      const page = groupPages[0];
      return { id: page.id, title: page.title, path: page.path };
    }

    return {
      id: group.id,
      title: group.title,
      path: groupPages[0].path,
      items: groupPages.map((page) => ({ id: page.id, title: page.title, path: page.path })),
    };
  });

  return { id, label: id, status, pages, navigation };
}

export const docsVersionDefinitions: DocsVersionDefinition[] = [
  createVersionDefinition('0.0.8', 'latest', components008),
  createVersionDefinition('0.0.7', 'legacy', components007),
];

const legacyAliases: Record<string, string> = {
  'introduction/philosophy': 'introduction',
  'introduction/installation': 'getting-started/installation',
  'overview/first-steps': 'getting-started/quick-start',
  'overview/controllers': 'core/controllers-routing',
  'overview/providers': 'core/dependency-injection',
  'overview/modules': 'getting-started/project-structure',
  'fundamentals/middleware': 'core/request-pipeline',
  'fundamentals/exception-filters': 'core/error-handling',
  'fundamentals/pipes': 'core/request-pipeline',
  'fundamentals/guards': 'core/request-pipeline',
  'fundamentals/interceptors': 'core/request-pipeline',
  'techniques/configuration': 'core/discovery-configuration',
  'recipes/crud': 'examples/complete-application',
  'recipes/deployment': 'operations/build-deployment',
  faq: 'reference/troubleshooting',
  'api-reference': 'reference/api',
  migration: 'reference/limitations',
  changelog: 'reference/limitations',
};

export function getDocsVersion(version: string) {
  return docsVersionDefinitions.find((definition) => definition.id === version);
}

export function looksLikeDocsVersion(value: string) {
  return /^\d+\.\d+\.\d+(?:[-+].+)?$/.test(value);
}

export function getLatestDocsVersion() {
  return getDocsVersion(LATEST_DOCS_VERSION)!;
}

export function resolveDocsPage(definition: DocsVersionDefinition, requestedSlug: string) {
  const normalizedSlug = requestedSlug.replace(/^\/+|\/+$/g, '') || 'introduction';
  const slug = legacyAliases[normalizedSlug] ?? normalizedSlug;
  return definition.pages.find((page) => page.slug === slug);
}

export function getDocsPageById(definition: DocsVersionDefinition, id: DocsPageKey) {
  return definition.pages.find((page) => page.id === id)!;
}
