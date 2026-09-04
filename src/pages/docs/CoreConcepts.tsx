import {
  Article,
  BulletList,
  Callout,
  CodeBlock,
  Flow,
  InlineCode,
  ReferenceTable,
  Section,
  Signature,
} from '@/components/docs/Article';

export function ApplicationLifecycle() {
  return (
    <Article
      title="Application & lifecycle"
      description="The application class coordinates startup while ExpressXFactory creates and configures the underlying Express application."
      previous={{ title: 'Project structure', href: '/docs/getting-started/project-structure' }}
      next={{ title: 'Architecture', href: '/docs/core/architecture' }}
    >
      <Section id="application-decorator" title="The application class">
        <Signature>@Application(): ClassDecorator</Signature>
        <p><InlineCode>@Application()</InlineCode> can decorate only a class that extends <InlineCode>ExpressX</InlineCode>. It registers that class as a singleton and binds it to the framework application token. Only one application decorator may be evaluated in a process; a second throws during module import.</p>
        <CodeBlock filename="src/application.ts" language="typescript" code={`import {
  Application,
  ExpressX,
  ExpressXApp,
  OnInitExpressXApp,
} from '@expressxjs/core';

@Application()
export class ApiApplication extends ExpressX {
  public async preInit(): Promise<void> {
    await connectDatabase();
  }

  public async onInit(app: OnInitExpressXApp): Promise<void> {
    app
      .useExpressJson({ limit: '1mb' })
      .useHelmet()
      .useUrlencoded({ extended: true })
      .useCors({ origin: 'https://example.com' })
      .use(requestIdMiddleware);
  }

  public postInit(app: ExpressXApp): void {
    console.log('Express environment:', app.get('env'));
  }
}`} />
        <Callout type="info" title="Application options removed in 0.0.6">
          <InlineCode>@Application()</InlineCode> and <InlineCode>ExpressXFactory.createApp()</InlineCode> no longer accept the unused <InlineCode>prefix</InlineCode>/<InlineCode>version</InlineCode> option shape. Build URL prefixes directly into controller paths or mount an ordinary Express router in <InlineCode>onInit()</InlineCode>.
        </Callout>
      </Section>

      <Section id="lifecycle-order" title="Lifecycle order">
        <Flow steps={['Scan & import', 'Create Express app', 'preInit', 'onInit', 'Register routes', '404 + errors', 'Lock app', 'postInit']} />
        <ReferenceTable rows={[
          {
            name: 'preInit()',
            signature: '(): Promise<void>',
            description: 'Runs after the application instance is resolved and before user middleware or routes are registered.',
            notes: 'Use for database, cache, and other infrastructure startup. A rejection aborts bootstrap.',
          },
          {
            name: 'onInit(app)',
            signature: '(OnInitExpressXApp): Promise<void>',
            description: 'Registers ordinary Express request middleware before the generated router.',
            notes: 'The wrapper accepts one middleware at a time and rejects functions with four or more parameters (Express error middleware).',
          },
          {
            name: 'postInit(app)',
            signature: '(ExpressXApp): void',
            description: 'Runs after routes and fallback handlers are mounted and after the application is locked.',
            notes: 'Observe settings or finish synchronous setup. Do not register middleware or routes here.',
          },
        ]} />
      </Section>

      <Section id="factory" title="Creating the app">
        <Signature>ExpressXFactory.createApp&lt;T extends ExpressX&gt;(): Promise&lt;ExpressXApp&gt;</Signature>
        <p>The factory returns the Express application; it does not open a network port. Use Node's HTTP or HTTPS server APIs so your project owns listening, shutdown, and transport configuration.</p>
        <CodeBlock filename="src/index.ts" language="typescript" code={`import { ExpressXFactory } from '@expressxjs/core';
import { createServer } from 'node:http';
import { ApiApplication } from './application';

const app = await ExpressXFactory.createApp<ApiApplication>();
const server = createServer(app);

server.listen(3000);

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});`} />
      </Section>

      <Section id="express-middleware" title="Registering Express middleware">
        <p><InlineCode>OnInitExpressXApp</InlineCode> provides chainable <InlineCode>useExpressJson()</InlineCode>, <InlineCode>useHelmet()</InlineCode>, <InlineCode>useUrlencoded()</InlineCode>, and <InlineCode>useCors()</InlineCode> helpers. Each accepts its middleware's options object when configuration is needed. <InlineCode>use()</InlineCode> still forwards any normal Express request handler to <InlineCode>app.use()</InlineCode>. Registration order is call order, and all of these handlers run before ExpressX routes.</p>
        <CodeBlock language="typescript" code={`public async onInit(app: OnInitExpressXApp): Promise<void> {
  app
    .useExpressJson({ limit: '1mb' })
    .useHelmet()
    .useUrlencoded({ extended: true })
    .useCors({ origin: 'https://example.com' })
    .use((req, _res, next) => {
      console.log(req.method, req.originalUrl);
      next();
    });
}`} />
        <Callout type="info" title="Global middleware versus route middleware">
          Use <InlineCode>onInit</InlineCode> for ordinary Express middleware that follows the <InlineCode>(req, res, next)</InlineCode> contract. ExpressX route middleware registered with <InlineCode>@UseMiddlewares</InlineCode> receives <InlineCode>{'{ req, res }'}</InlineCode> plus the same exported <InlineCode>NextFn</InlineCode> callback type, which it must call to continue.
        </Callout>
      </Section>

      <Section id="application-lock" title="The post-bootstrap lock">
        <p>After mounting framework routes and fallback handlers, ExpressX replaces route-registration methods with throwing functions. <InlineCode>app.use</InlineCode>, route-form <InlineCode>app.get</InlineCode>, and <InlineCode>post</InlineCode>/<InlineCode>put</InlineCode>/<InlineCode>patch</InlineCode>/<InlineCode>delete</InlineCode>/<InlineCode>options</InlineCode>/<InlineCode>head</InlineCode>/<InlineCode>all</InlineCode>/<InlineCode>route</InlineCode> are locked. The settings form <InlineCode>app.get('env')</InlineCode> remains available.</p>
        <p>Register all global Express middleware in <InlineCode>onInit</InlineCode> and all HTTP routes with decorators. This lock is method replacement, not <InlineCode>Object.freeze</InlineCode>; it does not make every Express property immutable.</p>
      </Section>
    </Article>
  );
}

export function ControllersRouting() {
  return (
    <Article
      title="Controllers & routing"
      description="Controllers are singleton classes whose method metadata becomes an Express router during application bootstrap."
      previous={{ title: 'Auto-configuration & cache', href: '/docs/core/auto-configuration-cache' }}
      next={{ title: 'Dependency injection', href: '/docs/core/dependency-injection' }}
    >
      <Section id="controller" title="Controllers">
        <Signature>@Controller(path?: string): ClassDecorator</Signature>
        <p>The decorator defaults the base path to an empty string, applies singleton DI registration, stores the base path, and adds the class to the global controller registry. Controllers do not extend a framework base class.</p>
        <CodeBlock filename="src/health.controller.ts" language="typescript" code={`import { Controller, GET, HttpResponse } from '@expressxjs/core';

@Controller('/health')
export class HealthController {
  @GET('/')
  public check() {
    return HttpResponse.ok({ status: 'ok' });
  }
}`} />
      </Section>

      <Section id="route-decorators" title="Route decorators">
        <Signature>@GET(path) · @POST(path) · @PUT(path) · @PATCH(path) · @DELETE(path)</Signature>
        <ReferenceTable rows={[
          { name: '@GET(path)', signature: '(path: string): MethodDecorator', description: 'Registers an HTTP GET route.', notes: 'The path argument is required.' },
          { name: '@POST(path)', signature: '(path: string): MethodDecorator', description: 'Registers an HTTP POST route.', notes: 'Usually paired with @Body().' },
          { name: '@PUT(path)', signature: '(path: string): MethodDecorator', description: 'Registers an HTTP PUT route.', notes: 'Returns JSON through the common serializer.' },
          { name: '@PATCH(path)', signature: '(path: string): MethodDecorator', description: 'Registers an HTTP PATCH route.', notes: 'No automatic DTO validation.' },
          { name: '@DELETE(path)', signature: '(path: string): MethodDecorator', description: 'Registers an HTTP DELETE route.', notes: 'HttpResponse.noContent() emits status 204.' },
        ]} />
        <p>The router concatenates the controller path and method path as raw strings. It does not insert or normalize slashes.</p>
        <CodeBlock language="typescript" code={`@Controller('/users')
export class UserController {
  @GET('/')       // GET /users/
  findAll() {}

  @GET('/:id')    // GET /users/:id
  findOne() {}
}`} />
        <Callout type="warning" title="Path conventions">
          Use leading slashes consistently. <InlineCode>@Controller('/users')</InlineCode> plus <InlineCode>@GET('/:id')</InlineCode> produces <InlineCode>/users/:id</InlineCode>; <InlineCode>@Controller('/users/')</InlineCode> would produce a double slash. ExpressX 0.0.8 has no application-level URL prefix option.
        </Callout>
      </Section>

      <Section id="handler-results" title="Handler return values">
        <p>Handlers may be synchronous or asynchronous. The response layer always serializes the result with Express <InlineCode>res.json()</InlineCode>, unless the handler or pipeline already sent a response.</p>
        <BulletList>
          <li><InlineCode>HttpResponse.ok(data)</InlineCode>, the constructor, and chainable <InlineCode>status().body()</InlineCode> all return an <InlineCode>HttpResponse</InlineCode> with an explicit success status and body.</li>
          <li><InlineCode>HttpErrorResponse</InlineCode> supplies an explicit error status and body even when returned rather than thrown.</li>
          <li>A plain object, array, primitive, or <InlineCode>null</InlineCode> uses <InlineCode>@StatusCode</InlineCode> if present, otherwise status 200.</li>
          <li>A direct <InlineCode>ctx.res.status(...).json(...)</InlineCode> write sends through Express. Once <InlineCode>headersSent</InlineCode> is true, automatic serialization is skipped.</li>
        </BulletList>
      </Section>

      <Section id="status-code" title="StatusCode">
        <Signature>@StatusCode(code: number)</Signature>
        <CodeBlock language="typescript" code={`import { Controller, POST, StatusCode } from '@expressxjs/core';

@Controller('/jobs')
export class JobController {
  @POST('/')
  @StatusCode(209)
  public enqueue() {
    return { accepted: true };
  }
}`} />
        <Callout type="info" title="StatusCode is the final plain-value fallback">
          <InlineCode>@StatusCode(209)</InlineCode> is applied when the final value entering the response serializer is not an <InlineCode>HttpResponse</InlineCode> or <InlineCode>HttpErrorResponse</InlineCode>. This covers a plain value returned directly by the controller and a plain value produced when an interceptor replaces or unwraps the controller result. If the final value is an <InlineCode>HttpResponse</InlineCode> or <InlineCode>HttpErrorResponse</InlineCode>, that object's own <InlineCode>statusCode</InlineCode> takes precedence.
        </Callout>
      </Section>

      <Section id="route-registration" title="Registration and duplicate behavior">
        <p>Decorated files run for their side effects during scanning. The registry ignores the exact same controller constructor if it is added twice. ExpressX does not check for two different controller methods that map to the same method and path; normal Express registration order determines which handler receives the request first.</p>
        <p>A discovered controller with no route metadata is skipped with a warning. The current route decorators do not include <InlineCode>OPTIONS</InlineCode>, <InlineCode>HEAD</InlineCode>, or catch-all route APIs.</p>
      </Section>
    </Article>
  );
}

export function DependencyInjection() {
  return (
    <Article
      title="Dependency injection"
      description="ExpressX.js wraps tsyringe and exposes class lifecycles, constructor injection, tokens, registries, factories, and the shared container."
      previous={{ title: 'Controllers & routing', href: '/docs/core/controllers-routing' }}
      next={{ title: 'Request & response', href: '/docs/core/request-response' }}
    >
      <Section id="constructor-injection" title="Constructor injection">
        <p><InlineCode>@Injectable()</InlineCode> registers metadata and defaults to singleton lifecycle. <InlineCode>@Controller()</InlineCode> also makes every controller a singleton. Use <InlineCode>@Inject(Class)</InlineCode> on constructor parameters for reliable runtime resolution.</p>
        <CodeBlock language="typescript" code={`import {
  Controller,
  GET,
  HttpResponse,
  Inject,
  Injectable,
} from '@expressxjs/core';

@Injectable()
export class UserService {
  public findAll(): string[] {
    return ['Ada', 'Grace'];
  }
}

@Controller('/users')
export class UserController {
  public constructor(
    @Inject(UserService) private readonly users: UserService,
  ) {}

  @GET('/')
  public findAll() {
    return HttpResponse.ok(this.users.findAll());
  }
}`} />
      </Section>

      <Section id="lifecycles" title="Registration decorators and lifecycles">
        <ReferenceTable rows={[
          { name: '@Injectable(lifecycle?)', signature: 'Lifecycle = Singleton', description: 'Makes a class injectable and applies singleton, container-scoped, resolution-scoped, or transient behavior.', notes: 'Transient uses injectable metadata without an additional scope decorator.' },
          { name: '@Singleton()', signature: 'ClassDecorator', description: 'Registers one instance in the root container.', notes: 'Controllers use this automatically.' },
          { name: '@Scoped(lifecycle)', signature: 'ContainerScoped | ResolutionScoped', description: 'Applies one of tsyringe’s scoped lifecycles.', notes: 'Transient and Singleton are not accepted by this helper’s TypeScript signature.' },
          { name: '@AutoInjectable()', signature: 'ClassDecorator', description: 'Delegates optional constructor argument resolution to tsyringe.', notes: 'Constructor parameters intended for auto-injection should be optional as required by tsyringe.' },
          { name: 'Lifecycle', signature: 'enum', description: 'Exports Transient, Singleton, ResolutionScoped, and ContainerScoped values.', notes: 'Re-exported from tsyringe.' },
        ]} />
      </Section>

      <Section id="tokens" title="Tokens and registries">
        <p>Use a string, symbol, or class as an injection token. <InlineCode>@Registry()</InlineCode> delegates a provider list to tsyringe. The ExpressX wrapper validates only that every provider has a token.</p>
        <CodeBlock language="typescript" code={`import {
  Inject,
  Injectable,
  Registry,
} from '@expressxjs/core';

export const CONFIG = Symbol('CONFIG');

@Registry([
  { token: CONFIG, useValue: { region: 'eu-west-1' } },
])
@Injectable()
export class ReportService {
  public constructor(
    @Inject(CONFIG) private readonly config: { region: string },
  ) {}
}`} />
        <p>A registry-decorated class must itself be imported before its registrations exist. Put it in a file reachable from a discovered controller/application, or apply the registry to a class already imported by that graph.</p>
      </Section>

      <Section id="advanced-injection" title="Advanced injection">
        <ReferenceTable rows={[
          { name: '@Inject(token)', signature: 'ParameterDecorator', description: 'Resolves one value for a token.', notes: 'Use on constructor parameters.' },
          { name: '@InjectAll(token)', signature: 'ParameterDecorator', description: 'Resolves every registration for a token as an array.', notes: 'The token must have one or more registrations.' },
          { name: '@InjectWithTransform(token, fn)', signature: 'ParameterDecorator', description: 'Creates a transform provider and injects the transformed token value.', notes: 'A new symbol registration is created each time the decorator is evaluated.' },
          { name: 'createProvider(token, class, options?)', signature: 'RegistryProvider', description: 'Builds a useClass provider object for @Registry().', notes: 'A convenience function; it does not register by itself.' },
        ]} />
        <CodeBlock language="typescript" code={`const FLAGS = Symbol('FLAGS');

@Injectable()
class FeatureService {
  public constructor(
    @InjectWithTransform(
      FLAGS,
      (flags: Record<string, boolean>) => flags.newCheckout,
    )
    public readonly enabled: boolean,
  ) {}
}`} />
      </Section>

      <Section id="container" title="The shared container">
        <p><InlineCode>ExpressXContainer</InlineCode> is the tsyringe root container. Core also re-exports provider and container types plus <InlineCode>instanceCachingFactory</InlineCode>, <InlineCode>instancePerContainerCachingFactory</InlineCode>, and <InlineCode>predicateAwareClassFactory</InlineCode>.</p>
        <CodeBlock language="typescript" code={`import { ExpressXContainer } from '@expressxjs/core';

const TOKEN = Symbol('request-limit');
ExpressXContainer.register(TOKEN, { useValue: 100 });

const limit = ExpressXContainer.resolve<number>(TOKEN);`} />
        <Callout type="tip" title="Route pipeline components use DI in 0.0.6">
          Guards, route middleware, and route interceptors are resolved with <InlineCode>ExpressXContainer.resolve()</InlineCode> for every matched request. Their constructors can inject services and tokens just like controllers. Decorate each pipeline class with <InlineCode>@Injectable()</InlineCode>, <InlineCode>@Singleton()</InlineCode>, or <InlineCode>@Scoped()</InlineCode>; its registered lifecycle determines whether the container reuses the instance or creates one for the resolution.
        </Callout>
      </Section>

      <Section id="di-errors" title="Resolution failures">
        <p>DI errors can occur during bootstrap when ExpressX resolves the application, controllers, and global components, or at request time when it resolves a route guard, middleware, or interceptor. Check that decorated metadata is enabled, the pipeline class and its dependencies are imported, every dependency is registered, the token passed to <InlineCode>@Inject</InlineCode> exactly matches its registration token, and circular imports are removed.</p>
      </Section>
    </Article>
  );
}
