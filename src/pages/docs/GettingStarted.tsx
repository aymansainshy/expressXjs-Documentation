import { Link } from 'react-router-dom';
import {
  Article,
  BulletList,
  Callout,
  CodeBlock,
  Flow,
  InlineCode,
  NumberedList,
  Section,
  Subsection,
} from '@/components/docs/Article';

export function Introduction() {
  return (
    <Article
      title="ExpressX.js"
      description="A lightweight, decorator-based TypeScript framework that adds application lifecycle, discovery, dependency injection, request pipelines, and structured responses to Express."
      next={{ title: 'Installation', href: '/docs/getting-started/installation' }}
    >
      <Section id="what-it-is" title="What ExpressX.js is">
        <p>
          ExpressX.js is an HTTP application framework built directly on Express 5. It keeps the Express request and response objects available while organizing an application around controllers, services, decorators, and lifecycle hooks. Version 0.0.5 contains two packages: <InlineCode>@expressxjs/core</InlineCode> and <InlineCode>@expressxjs/cli</InlineCode>.
        </p>
        <p>
          Core scans your project for decorated classes, resolves controllers and services through a tsyringe container, builds an Express router, executes the route pipeline, and serializes handler results as JSON. The CLI creates projects, generates components, maintains the discovery cache during development, and prepares that cache for production.
        </p>
        <Flow steps={['TypeScript source', 'Scanner', 'DI container', 'Express router', 'HTTP server']} />
      </Section>

      <Section id="why-use-it" title="Why use it">
        <BulletList>
          <li><strong>Explicit application lifecycle.</strong> Put infrastructure startup, Express middleware registration, and post-bootstrap work in separate hooks.</li>
          <li><strong>Decorator routing.</strong> Define controllers and HTTP routes beside the handler code.</li>
          <li><strong>Dependency injection.</strong> Use constructor injection, lifecycles, tokens, factories, and registries through the bundled container.</li>
          <li><strong>Composable request handling.</strong> Attach guards, framework middleware, and interceptors to individual routes, plus global interceptors and exception handling.</li>
          <li><strong>Conventional tooling.</strong> Scaffold a project or a complete CRUD resource and run it with a hot-reloading development server.</li>
        </BulletList>
      </Section>

      <Section id="scope" title="Current scope">
        <p>
          ExpressX.js currently targets JSON HTTP applications. It does not provide modules, WebSocket gateways, OpenAPI generation, database adapters, authentication strategies, queues, microservices, or a deployment platform. Add those capabilities with normal Express middleware and third-party packages when needed.
        </p>
        <Callout type="info" title="Implementation snapshot">
          These docs describe the Core and CLI source at version 0.0.5. Where an exported symbol is incomplete or not wired into the runtime, the limitation is called out instead of describing intended behavior as finished behavior.
        </Callout>
      </Section>

      <Section id="mental-model" title="Mental model">
        <NumberedList>
          <li>The CLI starts TypeScript with the ExpressX runtime loader in development.</li>
          <li>The scanner imports files containing <InlineCode>@Application</InlineCode>, <InlineCode>@Controller</InlineCode>, or global-handler decorators.</li>
          <li>Those imports register classes and metadata.</li>
          <li>The factory runs lifecycle hooks, mounts the generated router and error handling, then locks route registration.</li>
          <li>Your own Node HTTP server listens on the returned Express application.</li>
        </NumberedList>
      </Section>

      <Section id="where-next" title="Where to go next">
        <p>
          New users should continue with <Link className="text-brand-primary hover:underline" to="/docs/getting-started/installation">Installation</Link> and <Link className="text-brand-primary hover:underline" to="/docs/getting-started/quick-start"> Quick start</Link>. Existing Express developers can jump to <Link className="text-brand-primary hover:underline" to="/docs/core/application">Application & lifecycle</Link> to see where normal Express middleware fits.
        </p>
      </Section>
    </Article>
  );
}

export function Installation() {
  return (
    <Article
      title="Installation"
      description="Install the CLI for scaffolding and development, or add Core to an existing TypeScript and Express project."
      previous={{ title: 'Introduction', href: '/docs/introduction' }}
      next={{ title: 'Quick start', href: '/docs/getting-started/quick-start' }}
    >
      <Section id="requirements" title="Requirements">
        <BulletList>
          <li>Node.js and npm.</li>
          <li>A TypeScript project that can target ES2021 and enable legacy decorators.</li>
          <li>CommonJS output, or NodeNext configured so the package's CommonJS runtime can be loaded.</li>
        </BulletList>
        <Callout type="warning" title="Node.js support policy">
          Version 0.0.5 does not declare an <InlineCode>engines.node</InlineCode> range, so there is no source-backed minimum or officially supported Node.js matrix to quote. The generated project targets ES2021 and uses modern Node APIs. Use a maintained Node.js release and pin it in your own project until the package publishes an engines policy.
        </Callout>
      </Section>

      <Section id="scaffold-with-npx" title="Scaffold with npx">
        <p>This is the shortest installation path. It downloads the CLI for the command, creates a project, initializes Git, and runs <InlineCode>npm install</InlineCode> unless told otherwise.</p>
        <CodeBlock language="bash" code={`npx @expressxjs/cli new my-api
cd my-api
npm run dev`} />
        <p>Use <InlineCode>--skip-install</InlineCode> or <InlineCode>--skip-git</InlineCode> when those setup steps should be handled separately.</p>
      </Section>

      <Section id="local-cli" title="Local CLI installation">
        <p>Local installation keeps the CLI version in the project lockfile and is the recommended choice for teams and CI.</p>
        <CodeBlock language="bash" code={`npm install @expressxjs/core express
npm install --save-dev @expressxjs/cli typescript @types/node

# Invoke the project-local binary
npx expressx --help`} />
        <p>npm scripts automatically place the local <InlineCode>expressx</InlineCode> binary on <InlineCode>PATH</InlineCode>, so scripts can use <InlineCode>expressx dev</InlineCode> without <InlineCode>npx</InlineCode>.</p>
      </Section>

      <Section id="global-cli" title="Global CLI installation">
        <p>A global installation is convenient for interactive scaffolding, but it is not captured by a project lockfile.</p>
        <CodeBlock language="bash" code={`npm install --global @expressxjs/cli
expressx --version
expressx new my-api`} />
        <p>If the shell cannot find <InlineCode>expressx</InlineCode>, use the npx form or add npm's global binary directory to your shell <InlineCode>PATH</InlineCode>.</p>
      </Section>

      <Section id="typescript-configuration" title="TypeScript configuration">
        <p>The metadata-based decorators require both decorator options. This configuration also matches the generated project and compiles source to <InlineCode>dist</InlineCode>.</p>
        <CodeBlock filename="tsconfig.json" language="json" code={`{
  "compilerOptions": {
    "target": "ES2021",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}`} />
      </Section>

      <Section id="package-configuration" title="Package configuration">
        <p>Core requires <InlineCode>expressx.sourceDir</InlineCode>. The CLI also reads <InlineCode>outDir</InlineCode> and <InlineCode>main</InlineCode>.</p>
        <CodeBlock filename="package.json" language="json" code={`{
  "type": "commonjs",
  "scripts": {
    "dev": "expressx dev",
    "build": "expressx build && tsc",
    "start": "node dist/index.js"
  },
  "expressx": {
    "sourceDir": "src",
    "outDir": "dist",
    "main": "src/index.ts"
  }
}`} />
        <Callout type="info" title="reflect-metadata">
          Core imports <InlineCode>reflect-metadata</InlineCode> from its decorators entrypoint and declares it as a dependency. Applications normally do not need a separate side-effect import when they import from <InlineCode>@expressxjs/core</InlineCode>.
        </Callout>
      </Section>
    </Article>
  );
}

export function QuickStart() {
  return (
    <Article
      title="Quick start"
      description="Go from an empty directory to a running API, understand the generated structure, add a service and controller, then build the production output."
      previous={{ title: 'Installation', href: '/docs/getting-started/installation' }}
      next={{ title: 'Project structure', href: '/docs/getting-started/project-structure' }}
    >
      <Section id="create-project" title="1. Create the project">
        <CodeBlock language="bash" code={`npx @expressxjs/cli new my-api --template default
cd my-api`} />
        <p>The default template includes the application, server entrypoint, and a users CRUD resource. The <InlineCode>api</InlineCode> template adds global exception handling; <InlineCode>full</InlineCode> also adds a guard, middleware, route interceptor, and global response interceptor.</p>
        <Callout type="warning" title="0.0.5 source-tree logger caveat">
          The current CLI templates import <InlineCode>ExpressXLogger</InlineCode>. The checked-in Core source logger barrel is empty even though an older built artifact exports that class. If a fresh Core build reports that the export is missing, replace the generated logger calls with <InlineCode>console.log</InlineCode>/<InlineCode>console.error</InlineCode>. The examples below deliberately use console so they compile against the current source barrel.
        </Callout>
      </Section>

      <Section id="application" title="2. Define the application">
        <CodeBlock filename="src/application.ts" language="typescript" code={`import {
  Application,
  ExpressX,
  ExpressXApp,
  OnInitExpressXApp,
} from '@expressxjs/core';
import express from 'express';

@Application()
export class MyApplication extends ExpressX {
  public async preInit(): Promise<void> {
    // Connect infrastructure before accepting requests.
  }

  public async onInit(app: OnInitExpressXApp): Promise<void> {
    app.use(express.json());
  }

  public postInit(app: ExpressXApp): void {
    console.log('Routes registered for', app.get('env'));
  }
}`} />
      </Section>

      <Section id="service" title="3. Create a service">
        <CodeBlock filename="src/modules/products/product.service.ts" language="typescript" code={`import { Injectable } from '@expressxjs/core';

export interface Product {
  id: string;
  name: string;
}

@Injectable()
export class ProductService {
  private readonly products: Product[] = [{ id: '1', name: 'Keyboard' }];

  public findAll(): Product[] {
    return [...this.products];
  }

  public create(name: string): Product {
    const product = { id: Date.now().toString(36), name };
    this.products.push(product);
    return product;
  }
}`} />
      </Section>

      <Section id="controller" title="4. Add routes and dependency injection">
        <CodeBlock filename="src/modules/products/product.controller.ts" language="typescript" code={`import {
  Body,
  Controller,
  GET,
  HttpResponse,
  Inject,
  POST,
} from '@expressxjs/core';
import { ProductService } from './product.service';

interface CreateProductDto {
  name: string;
}

@Controller('/products')
export class ProductController {
  public constructor(
    @Inject(ProductService) private readonly products: ProductService,
  ) {}

  @GET('/')
  public findAll() {
    return HttpResponse.ok(this.products.findAll());
  }

  @POST('/')
  public create(@Body() input: CreateProductDto) {
    return HttpResponse.created(this.products.create(input.name));
  }
}`} />
        <p>No module registration is needed. The scanner imports controller files and <InlineCode>@Controller</InlineCode> adds the class to the controller registry. The service is imported by the controller and resolved from the DI container.</p>
      </Section>

      <Section id="bootstrap" title="5. Bootstrap the HTTP server">
        <CodeBlock filename="src/index.ts" language="typescript" code={`import { ExpressXFactory } from '@expressxjs/core';
import { createServer } from 'node:http';
import { MyApplication } from './application';

async function bootstrap(): Promise<void> {
  const app = await ExpressXFactory.createApp<MyApplication>();
  const port = Number(process.env.PORT ?? 3000);

  createServer(app).listen(port, () => {
    console.log('API running at http://localhost:' + port);
  });
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});`} />
      </Section>

      <Section id="run-development" title="6. Run in development">
        <CodeBlock language="bash" code={`npm run dev

# In another terminal
curl http://localhost:3000/products
curl -X POST http://localhost:3000/products \
  -H 'content-type: application/json' \
  -d '{"name":"Mouse"}'`} />
        <p>The development command sets <InlineCode>EXPRESSX_RUNTIME=ts</InlineCode>, loads ts-node and tsconfig paths, watches TypeScript files, updates <InlineCode>src/.expressx/cache.json</InlineCode>, and restarts the child process after changes.</p>
      </Section>

      <Section id="build-production" title="7. Build and run production">
        <CodeBlock language="bash" code={`npm run build
npm start`} />
        <p>The generated build script first asks the ExpressX CLI to create discovery cache files, then runs <InlineCode>tsc</InlineCode>. Deploy <InlineCode>dist</InlineCode>, including <InlineCode>dist/.expressx/cache.json</InlineCode>, together with production dependencies and <InlineCode>package.json</InlineCode>.</p>
      </Section>
    </Article>
  );
}

export function ProjectStructure() {
  return (
    <Article
      title="Project structure"
      description="ExpressX.js requires configuration and discoverable decorated files, but does not impose a module system or a single folder layout."
      previous={{ title: 'Quick start', href: '/docs/getting-started/quick-start' }}
      next={{ title: 'Application & lifecycle', href: '/docs/core/application' }}
    >
      <Section id="generated-layout" title="Generated full-template layout">
        <CodeBlock language="text" code={`my-api/
├── src/
│   ├── common/
│   │   ├── exceptions/app.exception-handler.ts
│   │   ├── guards/api-key.guard.ts
│   │   ├── interceptors/
│   │   │   ├── response-envelope.interceptor.ts
│   │   │   └── timing.interceptor.ts
│   │   └── middlewares/request-logger.middleware.ts
│   ├── modules/users/
│   │   ├── user.controller.ts
│   │   ├── user.dto.ts
│   │   └── user.service.ts
│   ├── application.ts
│   └── index.ts
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json`} />
      </Section>

      <Section id="file-roles" title="File roles">
        <BulletList>
          <li><InlineCode>src/index.ts</InlineCode> creates the ExpressX application and owns the Node HTTP server.</li>
          <li><InlineCode>src/application.ts</InlineCode> owns lifecycle hooks and global Express middleware.</li>
          <li><InlineCode>*.controller.ts</InlineCode> files declare routes. Their imports pull related services and DTOs into the program.</li>
          <li><InlineCode>common/</InlineCode> is a convention for cross-cutting pipeline classes, not a framework requirement.</li>
          <li><InlineCode>src/.expressx/cache.json</InlineCode> is generated development discovery data and should not be committed.</li>
          <li><InlineCode>dist/.expressx/cache.json</InlineCode> maps source decorator files to compiled JavaScript paths for production.</li>
        </BulletList>
      </Section>

      <Section id="discovery-rules" title="What discovery actually finds">
        <p>The scanner checks source text for these class decorators:</p>
        <CodeBlock language="text" code={`@Application
@Controller
@UseGlobalInterceptor
@UseGlobalExceptionHandler`} />
        <p>Files containing only services, route guards, route middleware, or route interceptors are not independently discovered. They must be imported by a discovered file or another reachable import. Development scans <InlineCode>*.ts</InlineCode>; production scans <InlineCode>*.js</InlineCode>. Test, declaration, build, cache, dependency, and Git paths are excluded.</p>
      </Section>

      <Section id="organizing-code" title="Organizing larger applications">
        <p>Feature-first folders work well because a discovered controller naturally imports its local service and DTO. ExpressX.js has no <InlineCode>@Module</InlineCode> decorator, module graph, providers array, or controller-registration file.</p>
        <Subsection id="custom-layout" title="A custom layout is valid">
          <CodeBlock language="text" code={`src/
├── app/application.ts
├── app/server.ts
├── billing/http/invoice.controller.ts
├── billing/invoice.service.ts
└── platform/http/error-handler.ts`} />
          <p>Set <InlineCode>expressx.main</InlineCode> to the actual server entrypoint and keep all TypeScript sources underneath <InlineCode>expressx.sourceDir</InlineCode>.</p>
        </Subsection>
      </Section>
    </Article>
  );
}
