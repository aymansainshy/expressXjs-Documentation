import { Link } from 'react-router-dom';
import { ArrowRight, Braces, Github, Route, Server, Terminal, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui-custom/CodeBlock';

const features = [
  {
    icon: Server,
    title: 'Express underneath',
    description: 'Use the native Express 5 request, response, application, and middleware ecosystem.',
  },
  {
    icon: Route,
    title: 'Decorator routing',
    description: 'Organize JSON endpoints with controller and HTTP method decorators.',
  },
  {
    icon: Braces,
    title: 'Dependency injection',
    description: 'Compose controllers and services with singleton, scoped, token, and factory providers.',
  },
  {
    icon: Workflow,
    title: 'Request pipelines',
    description: 'Apply guards, route middleware, interceptors, and global exception handling.',
  },
];

const controllerExample = `import {
  Controller,
  GET,
  HttpResponse,
  Inject,
} from '@expressxjs/core';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(UserService) private readonly users: UserService,
  ) {}

  @GET('/')
  findAll() {
    return HttpResponse.ok(this.users.findAll());
  }
}`;

export function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border pt-16">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-brand-primary/10 blur-[110px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 sm:px-6 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8 lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 text-sm font-medium text-brand-primary">
              <span className="h-2 w-2 rounded-full bg-brand-primary" />
              Core & CLI 0.0.6
            </div>
            <h1 className="max-w-xl break-words text-4xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Structured TypeScript. <span className="gradient-text">Express at heart.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              ExpressX.js is a lightweight, decorator-based framework for building JSON APIs with lifecycle hooks, dependency injection, discovery, and composable request pipelines.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/docs/getting-started/quick-start">
                <Button size="lg" className="w-full gap-2 bg-brand-primary text-white hover:bg-brand-primary-dark sm:w-auto">
                  Start building <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="https://github.com/aymansainshy/expressXjs" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto">
                  <Github className="h-4 w-4" /> View source
                </Button>
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3 font-mono text-sm shadow-sm backdrop-blur-sm">
              <Terminal className="h-4 w-4 shrink-0 text-brand-primary" />
              <span className="min-w-0 overflow-x-auto whitespace-nowrap">npx @expressxjs/cli new my-api</span>
            </div>
          </div>

          <div className="relative min-w-0">
            <CodeBlock filename="user.controller.ts" language="typescript" code={controllerExample} />
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-brand-primary/10 blur-2xl" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">Framework essentials</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A focused layer over Express</h2>
            <p className="mt-4 text-lg text-muted-foreground">Use conventions where they help, and reach the underlying Express objects whenever the application needs them.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-transform hover:-translate-y-1">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Documentation grounded in the source</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Learn the implemented APIs, exact pipeline order, CLI behavior, production workflow, and current version limitations without invented framework features.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/docs/introduction"><Button size="lg">Read the documentation</Button></Link>
            <Link to="/docs/core/architecture"><Button size="lg" variant="outline">Explore the architecture</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
