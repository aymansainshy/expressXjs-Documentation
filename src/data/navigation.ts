export interface NavItem {
  id: string;
  title: string;
  path: string;
  items?: NavItem[];
}

export const mainNav = [
  { label: 'Home', path: '/', active: false },
  { label: 'Docs', path: '/docs', active: false },
  { label: 'Examples', path: '/examples', active: false },
  { label: 'Community', path: '/community', active: false },
];

export const docsNavigation: NavItem[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    path: '/docs/introduction',
  },
  {
    id: 'getting-started',
    title: 'Getting started',
    path: '/docs/getting-started',
    items: [
      { id: 'installation', title: 'Installation', path: '/docs/getting-started/installation' },
      { id: 'quick-start', title: 'Quick start', path: '/docs/getting-started/quick-start' },
      { id: 'project-structure', title: 'Project structure', path: '/docs/getting-started/project-structure' },
    ],
  },
  {
    id: 'core',
    title: 'Core concepts',
    path: '/docs/core',
    items: [
      { id: 'application', title: 'Application & lifecycle', path: '/docs/core/application' },
      { id: 'controllers-routing', title: 'Controllers & routing', path: '/docs/core/controllers-routing' },
      { id: 'dependency-injection', title: 'Dependency injection', path: '/docs/core/dependency-injection' },
      { id: 'request-response', title: 'Request & response', path: '/docs/core/request-response' },
      { id: 'request-pipeline', title: 'Request pipeline', path: '/docs/core/request-pipeline' },
      { id: 'error-handling', title: 'Error handling', path: '/docs/core/error-handling' },
      { id: 'discovery-configuration', title: 'Discovery & configuration', path: '/docs/core/discovery-configuration' },
    ],
  },
  {
    id: 'cli',
    title: 'CLI',
    path: '/docs/cli',
    items: [
      { id: 'cli-overview', title: 'CLI Overview', path: '/docs/cli' },
      { id: 'commands', title: 'Commands', path: '/docs/cli/commands' },
      { id: 'generators', title: 'Generators', path: '/docs/cli/generators' },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    path: '/docs/guides',
    items: [
      { id: 'complete-application', title: 'Complete application', path: '/docs/examples/complete-application' },
      { id: 'build-deployment', title: 'Build & deployment', path: '/docs/operations/build-deployment' },
    ],
  },
  {
    id: 'reference',
    title: 'Reference',
    path: '/docs/reference',
    items: [
      { id: 'api-reference', title: 'API reference', path: '/docs/reference/api' },
      { id: 'troubleshooting', title: 'Troubleshooting', path: '/docs/reference/troubleshooting' },
      { id: 'limitations', title: 'Limitations & versioning', path: '/docs/reference/limitations' },
    ],
  },
];
