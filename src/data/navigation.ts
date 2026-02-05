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
    items: [
      { id: 'what-is-framework', title: 'What is Framework?', path: '/docs/introduction' },
      { id: 'philosophy', title: 'Philosophy', path: '/docs/introduction/philosophy' },
      { id: 'installation', title: 'Installation', path: '/docs/introduction/installation' },
    ],
  },
  {
    id: 'overview',
    title: 'Overview',
    path: '/docs/overview',
    items: [
      { id: 'first-steps', title: 'First Steps', path: '/docs/overview/first-steps' },
      { id: 'controllers', title: 'Controllers', path: '/docs/overview/controllers' },
      { id: 'providers', title: 'Providers', path: '/docs/overview/providers' },
      { id: 'modules', title: 'Modules', path: '/docs/overview/modules' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    path: '/docs/fundamentals',
    items: [
      { id: 'middleware', title: 'Middleware', path: '/docs/fundamentals/middleware' },
      { id: 'exception-filters', title: 'Exception Filters', path: '/docs/fundamentals/exception-filters' },
      { id: 'pipes', title: 'Pipes', path: '/docs/fundamentals/pipes' },
      { id: 'guards', title: 'Guards', path: '/docs/fundamentals/guards' },
      { id: 'interceptors', title: 'Interceptors', path: '/docs/fundamentals/interceptors' },
    ],
  },
  {
    id: 'techniques',
    title: 'Techniques',
    path: '/docs/techniques',
    items: [
      { id: 'database', title: 'Database', path: '/docs/techniques/database' },
      { id: 'validation', title: 'Validation', path: '/docs/techniques/validation' },
      { id: 'configuration', title: 'Configuration', path: '/docs/techniques/configuration' },
      { id: 'testing', title: 'Testing', path: '/docs/techniques/testing' },
    ],
  },
  {
    id: 'websockets',
    title: 'WebSockets',
    path: '/docs/websockets',
    items: [
      { id: 'gateways', title: 'Gateways', path: '/docs/websockets/gateways' },
      { id: 'broadcasting', title: 'Broadcasting', path: '/docs/websockets/broadcasting' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    path: '/docs/security',
    items: [
      { id: 'authentication', title: 'Authentication', path: '/docs/security/authentication' },
      { id: 'authorization', title: 'Authorization', path: '/docs/security/authorization' },
      { id: 'cors', title: 'CORS', path: '/docs/security/cors' },
    ],
  },
  {
    id: 'cli',
    title: 'CLI',
    path: '/docs/cli',
    items: [
      { id: 'cli-overview', title: 'CLI Overview', path: '/docs/cli' },
      { id: 'commands', title: 'Commands', path: '/docs/cli/commands' },
    ],
  },
  {
    id: 'faq',
    title: 'FAQ',
    path: '/docs/faq',
  },
  {
    id: 'recipes',
    title: 'Recipes',
    path: '/docs/recipes',
    items: [
      { id: 'crud', title: 'CRUD Generator', path: '/docs/recipes/crud' },
      { id: 'swagger', title: 'Swagger', path: '/docs/recipes/swagger' },
      { id: 'deployment', title: 'Deployment', path: '/docs/recipes/deployment' },
    ],
  },
];
