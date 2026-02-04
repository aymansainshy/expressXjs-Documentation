import type { NavItem } from '@/types';

export const navigation: NavItem[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    href: '#/doc/introduction',
    items: [
      { id: 'philosophy', title: 'Philosophy', href: '#/doc/introduction/philosophy' },
      { id: 'installation', title: 'Installation', href: '#/doc/introduction/installation' },
      { id: 'alternatives', title: 'Alternatives', href: '#/doc/introduction/alternatives' },
    ],
  },
  {
    id: 'overview',
    title: 'Overview',
    items: [
      { id: 'first-steps', title: 'First Steps', href: '#/doc/first-steps' },
      { id: 'controllers', title: 'Controllers', href: '#/doc/controllers' },
      { id: 'providers', title: 'Providers', href: '#/doc/providers' },
      { id: 'modules', title: 'Modules', href: '#/doc/modules' },
      { id: 'middleware', title: 'Middleware', href: '#/doc/middleware' },
      { id: 'exception-filters', title: 'Exception Filters', href: '#/doc/exception-filters' },
      { id: 'pipes', title: 'Pipes', href: '#/doc/pipes' },
      { id: 'guards', title: 'Guards', href: '#/doc/guards' },
      { id: 'interceptors', title: 'Interceptors', href: '#/doc/interceptors' },
      { id: 'custom-decorators', title: 'Custom Decorators', href: '#/doc/custom-decorators' },
    ],
  },
  {
    id: 'validation',
    title: 'Validation',
    href: '#/doc/validation',
  },
  {
    id: 'authentication',
    title: 'Authentication',
    href: '#/doc/authentication',
  },
  {
    id: 'configuration',
    title: 'Configuration',
    href: '#/doc/configuration',
  },
  {
    id: 'testing',
    title: 'Testing',
    href: '#/doc/testing',
  },
  {
    id: 'websocket',
    title: 'WebSockets',
    href: '#/doc/websocket',
  },
  {
    id: 'graphql',
    title: 'GraphQL',
    href: '#/doc/graphql',
  },
  {
    id: 'openapi',
    title: 'OpenAPI/Swagger',
    href: '#/doc/openapi',
  },
  {
    id: 'cli',
    title: 'CLI',
    href: '#/doc/cli',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    href: '#/doc/deployment',
  },
];

export const headerLinks = [
  { label: 'Home', href: '#/', page: 'home' },
  { label: 'Doc', href: '#/doc', page: 'docs' },
  { label: 'Example', href: '#/example', page: 'examples' },
  { label: 'Comunity', href: '#/comunity', page: 'community' },
];
