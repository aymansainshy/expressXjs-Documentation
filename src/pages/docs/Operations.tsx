import {
  Article,
  BulletList,
  Callout,
  CodeBlock,
  Flow,
  InlineCode,
  Section,
} from '@/components/docs/Article';

export function CompleteApplication() {
  return (
    <Article
      eyebrow="ExpressX.js example"
      title="Complete application"
      description="A runnable users API combining lifecycle hooks, controller discovery, service injection, authorization, route validation, middleware, interceptors, responses, and exception handling."
      previous={{ title: 'Generators', href: '/docs/cli/generators' }}
      next={{ title: 'Build & deployment', href: '/docs/operations/build-deployment' }}
    >
      <Section id="structure" title="Project structure">
        <CodeBlock language="text" code={`src/
├── common/
│   ├── exceptions/app.exception-handler.ts
│   ├── guards/api-key.guard.ts
│   ├── interceptors/envelope.interceptor.ts
│   └── middlewares/validate-user.middleware.ts
├── users/
│   ├── user.controller.ts
│   ├── user.dto.ts
│   └── user.service.ts
├── application.ts
└── index.ts`} />
        <p>Install and configure the project as shown in Installation. This example uses route middleware for validation because 0.0.7 leaves validation to application code and schema/middleware libraries.</p>
      </Section>

      <Section id="dto-service" title="DTO and service">
        <CodeBlock filename="src/users/user.dto.ts" language="typescript" code={`export interface CreateUserDto {
  name: string;
  email: string;
}`} />
        <CodeBlock filename="src/users/user.service.ts" language="typescript" code={`import { Injectable } from '@expressxjs/core';
import { CreateUserDto } from './user.dto';

export interface User extends CreateUserDto {
  id: string;
}

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  public findAll(): User[] {
    return [...this.users];
  }

  public findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public create(input: CreateUserDto): User {
    const user = { id: Date.now().toString(36), ...input };
    this.users.push(user);
    return user;
  }
}`} />
      </Section>

      <Section id="guard-validation" title="Guard and route validation">
        <CodeBlock filename="src/common/guards/api-key.guard.ts" language="typescript" code={`import { Guard, Request } from '@expressxjs/core';

export class ApiKeyGuard extends Guard {
  public canActivate(req: Request): boolean {
    const expected = process.env.API_KEY;
    return !expected || req.headers['x-api-key'] === expected;
  }
}`} />
        <CodeBlock filename="src/common/middlewares/validate-user.middleware.ts" language="typescript" code={`import { ExpressXMiddleware, HttpContext, NextFn } from '@expressxjs/core';

export class ValidateUserMiddleware extends ExpressXMiddleware {
  public use({ req }: HttpContext, next: NextFn): void {
    if (typeof req.body?.name !== 'string' || req.body.name.trim() === '') {
      throw Object.assign(new Error('name is required'), { status: 400 });
    }
    if (typeof req.body?.email !== 'string' || !req.body.email.includes('@')) {
      throw Object.assign(new Error('valid email is required'), { status: 400 });
    }
    next();
  }
}`} />
      </Section>

      <Section id="interceptor" title="Global response interceptor">
        <CodeBlock filename="src/common/interceptors/envelope.interceptor.ts" language="typescript" code={`import {
  ExpressXInterceptor,
  Handler,
  HttpContext,
  HttpErrorResponse,
  HttpResponse,
  UseGlobalInterceptor,
} from '@expressxjs/core';

@UseGlobalInterceptor()
export class EnvelopeInterceptor extends ExpressXInterceptor {
  public async intercept(ctx: HttpContext, next: Handler) {
    const result = await next.handle();

    if (result instanceof HttpResponse) {
      return new HttpResponse(result.code, {
        success: true,
        data: result.data,
        path: ctx.req.originalUrl,
      });
    }

    if (result instanceof HttpErrorResponse) {
      return new HttpErrorResponse(result.statusCode, {
        success: false,
        error: result.error,
        path: ctx.req.originalUrl,
      });
    }

    return result;
  }
}`} />
      </Section>

      <Section id="exception-handler" title="Exception handler">
        <CodeBlock filename="src/common/exceptions/app.exception-handler.ts" language="typescript" code={`import {
  ExceptionHandler,
  HttpErrorResponse,
  UseGlobalExceptionHandler,
} from '@expressxjs/core';

@UseGlobalExceptionHandler()
export class AppExceptionHandler extends ExceptionHandler {
  public catch(error: unknown): HttpErrorResponse {
    const candidate = error as { status?: unknown };
    const message = error instanceof Error ? error.message : 'Unexpected error';
    const statusCode =
      typeof candidate.status === 'number'
        ? candidate.status
        : message.startsWith('Unauthorized: Guard')
          ? 401
          : 500;

    return new HttpErrorResponse(statusCode, { statusCode, message });
  }
}`} />
      </Section>

      <Section id="controller" title="Controller">
        <CodeBlock filename="src/users/user.controller.ts" language="typescript" code={`import {
  Body,
  Controller,
  GET,
  HttpErrorResponse,
  HttpResponse,
  Inject,
  Param,
  POST,
  UseGuards,
  UseMiddlewares,
} from '@expressxjs/core';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { ValidateUserMiddleware } from '../common/middlewares/validate-user.middleware';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  public constructor(
    @Inject(UserService) private readonly users: UserService,
  ) {}

  @GET('/')
  public findAll() {
    return HttpResponse.ok(this.users.findAll());
  }

  @GET('/:id')
  public findOne(@Param('id') id: string) {
    const user = this.users.findOne(id);
    return user
      ? HttpResponse.ok(user)
      : new HttpErrorResponse(404, { message: 'User not found' });
  }

  @POST('/')
  @UseGuards(ApiKeyGuard)
  @UseMiddlewares(ValidateUserMiddleware)
  public create(@Body() input: CreateUserDto) {
    return HttpResponse.created(this.users.create(input));
  }
}`} />
      </Section>

      <Section id="bootstrap" title="Application and server">
        <CodeBlock filename="src/application.ts" language="typescript" code={`import {
  Application,
  ExpressX,
  ExpressXApp,
  OnInitExpressXApp,
} from '@expressxjs/core';

@Application()
export class ApiApplication extends ExpressX {
  public async preInit(): Promise<void> {}

  public async onInit(app: OnInitExpressXApp): Promise<void> {
    app.useExpressJson().useHelmet().useUrlencoded({ extended: true }).useCors();
  }

  public postInit(app: ExpressXApp): void {
    console.log('Application initialized in', app.get('env'));
  }
}`} />
        <CodeBlock filename="src/index.ts" language="typescript" code={`import { ExpressXFactory } from '@expressxjs/core';
import { createServer } from 'node:http';
import { ApiApplication } from './application';

async function bootstrap(): Promise<void> {
  const app = await ExpressXFactory.createApp<ApiApplication>();
  const port = Number(process.env.PORT ?? 3000);

  createServer(app).listen(port, () => {
    console.log('Listening on http://localhost:' + port);
  });
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});`} />
      </Section>

      <Section id="try-it" title="Run and try it">
        <CodeBlock language="bash" code={`API_KEY=development-secret npm run dev

curl http://localhost:3000/users

curl -X POST http://localhost:3000/users \
  -H 'content-type: application/json' \
  -H 'x-api-key: development-secret' \
  -d '{"name":"Ada","email":"ada@example.com"}'`} />
        <Flow steps={['Global envelope (before)', 'API key guard', 'Validation middleware', 'Controller', 'Global envelope (after)', 'JSON response']} />
      </Section>
    </Article>
  );
}

export function BuildDeployment() {
  return (
    <Article
      eyebrow="ExpressX.js operations"
      title="Build & deployment"
      description="Prepare the discovery cache, compile TypeScript, ship the complete output directory, and run the Node process with your preferred deployment platform."
      previous={{ title: 'Complete application', href: '/docs/examples/complete-application' }}
      next={{ title: 'API reference', href: '/docs/reference/api' }}
    >
      <Section id="build-workflow" title="Production build workflow">
        <CodeBlock filename="package.json" language="json" code={`{
  "scripts": {
    "dev": "expressx dev",
    "build": "expressx build && tsc",
    "start": "node dist/index.js"
  }
}`} />
        <CodeBlock language="bash" code={`npm ci
npm run build
NODE_ENV=production npm start`} />
        <Flow steps={['expressx build', 'Scan src', 'Write cache paths', 'tsc', 'dist/index.js', 'node']} />
        <p><InlineCode>expressx build</InlineCode> prepares cache files only. <InlineCode>tsc</InlineCode> performs compilation. Keep the order shown so the production cache is based on the same source you compile.</p>
      </Section>

      <Section id="output" title="Required build output">
        <CodeBlock language="text" code={`dist/
├── .expressx/cache.json
├── index.js
├── application.js
├── common/...
└── users/...`} />
        <BulletList>
          <li>Deploy all compiled files referenced by the cache.</li>
          <li>Do not drop dot-directories when copying <InlineCode>dist</InlineCode>; <InlineCode>.expressx</InlineCode> matters.</li>
          <li>Install production dependencies, including <InlineCode>@expressxjs/core</InlineCode> and <InlineCode>express</InlineCode>.</li>
          <li>Run from the project directory that contains the configured <InlineCode>package.json</InlineCode>; scanning uses <InlineCode>process.cwd()</InlineCode>.</li>
          <li>Regenerate the production cache on every build because startup does not validate its file metadata.</li>
        </BulletList>
      </Section>

      <Section id="environment" title="Environment and configuration">
        <p>ExpressX.js does not load <InlineCode>.env</InlineCode> files or provide a configuration service. Set environment variables through the platform, shell, or an Express-compatible package. Typical application variables include:</p>
        <CodeBlock filename=".env.example" language="bash" code={`NODE_ENV=production
PORT=3000
API_KEY=replace-me
DATABASE_URL=postgresql://...`} />
        <p><InlineCode>NODE_ENV=development</InlineCode> selects TypeScript scanner mode; <InlineCode>EXPRESSX_RUNTIME=ts</InlineCode> can also select it explicitly. Use <InlineCode>NODE_ENV=production</InlineCode> and leave <InlineCode>EXPRESSX_RUNTIME</InlineCode> unset in a normal compiled production process.</p>
      </Section>

      <Section id="docker" title="Docker example">
        <p>Docker support is a normal Node deployment practice, not an ExpressX.js feature. A two-stage image keeps the CLI and TypeScript compiler out of the runtime layer.</p>
        <CodeBlock filename="Dockerfile" language="docker" code={`FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]`} />
        <Callout type="info" title="Choose and pin your own Node image">
          The image above is an example operational choice, not a framework support claim. Version 0.0.7 does not publish a Node engines range. Match the image to the version your application tests and supports.
        </Callout>
      </Section>

      <Section id="process-manager" title="Process managers and platforms">
        <p>PM2, systemd, Kubernetes, container platforms, and serverless adapters are outside the framework. They should run <InlineCode>node dist/index.js</InlineCode>, inject environment variables, capture stdout/stderr, and send a graceful termination signal.</p>
        <CodeBlock filename="ecosystem.config.cjs" language="javascript" code={`module.exports = {
  apps: [{
    name: 'expressx-api',
    script: 'dist/index.js',
    instances: 1,
    env_production: { NODE_ENV: 'production', PORT: '3000' },
  }],
};`} />
      </Section>

      <Section id="production-checklist" title="Production checklist">
        <BulletList>
          <li>Validate required environment variables before <InlineCode>createApp()</InlineCode>, or in <InlineCode>preInit()</InlineCode>.</li>
          <li>Register JSON limits, CORS, compression, security headers, and request logging in <InlineCode>onInit()</InlineCode> as appropriate.</li>
          <li>Register a global exception handler that normalizes thrown controller and route-pipeline failures.</li>
          <li>Expose a controller-based health endpoint.</li>
          <li>Handle server shutdown and close database connections.</li>
          <li>Test the compiled <InlineCode>npm start</InlineCode> path in CI, not only <InlineCode>npm run dev</InlineCode>.</li>
        </BulletList>
      </Section>
    </Article>
  );
}
