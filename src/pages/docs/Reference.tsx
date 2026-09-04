import {
  Article,
  BulletList,
  Callout,
  CodeBlock,
  InlineCode,
  ReferenceTable,
  Section,
} from '@/components/docs/Article';

export function APIReference() {
  return (
    <Article
      eyebrow="ExpressX.js reference · Core 0.0.7"
      title="API reference"
      description="Signatures and runtime behavior for the public Core barrels, with incomplete or infrastructure-level exports identified explicitly."
      previous={{ title: 'Build & deployment', href: '/docs/operations/build-deployment' }}
      next={{ title: 'Troubleshooting', href: '/docs/reference/troubleshooting' }}
    >
      <Section id="application-api" title="Application and framework">
        <ReferenceTable rows={[
          { name: '@Application()', signature: 'ClassDecorator', description: 'Marks the single ExpressX application and registers it as a singleton.', notes: 'Class must extend ExpressX; a second application registration throws.' },
          { name: 'ExpressX', signature: 'abstract class', description: 'Requires preInit(), onInit(app), and postInit(app) lifecycle methods.', notes: 'preInit/onInit are async; postInit is synchronous.' },
          { name: 'ExpressXFactory.createApp<T>()', signature: 'Promise<ExpressXApp>', description: 'Scans, creates Express, runs lifecycle hooks, mounts routing/errors, locks registration, and returns the app.', notes: 'Does not listen on a port.' },
          { name: 'OnInitExpressXApp.use(mw)', signature: 'this', description: 'Registers one ordinary Express request middleware before routes.', notes: 'Rejects functions whose declared arity is 4 or greater.' },
          { name: 'ExpressXApp', signature: 'interface extends Express', description: 'Returned Express application with framework/version markers.', notes: "Runtime assigns framework = 'ExpressXjs' and the installed Core package version." },
          { name: 'HttpContext', signature: '{ req: Request; res: Response }', description: 'Context passed to route middleware/interceptors and injected by @Ctx.', notes: 'Contains the original Express objects.' },
          { name: 'Request / Response / NextFn', signature: 'Express type aliases', description: 'Re-exported Express request, response, and NextFunction types.', notes: 'No custom runtime wrapping.' },
          { name: 'OnInitMiddleware', signature: 'RequestHandler-compatible type', description: 'Accepted middleware type for OnInitExpressXApp.use().', notes: 'Error middleware is rejected at runtime.' },
        ]} />
      </Section>

      <Section id="routing-api" title="Controllers and routes">
        <ReferenceTable rows={[
          { name: '@Controller(path = "")', signature: 'ClassDecorator', description: 'Stores a base path, makes the class singleton, and registers it as a controller.', notes: 'Paths are concatenated without slash normalization.' },
          { name: '@GET(path)', signature: 'MethodDecorator', description: 'Registers a GET route.', notes: 'Uppercase export; path required.' },
          { name: '@POST(path)', signature: 'MethodDecorator', description: 'Registers a POST route.', notes: 'Uppercase export; path required.' },
          { name: '@PUT(path)', signature: 'MethodDecorator', description: 'Registers a PUT route.', notes: 'Uppercase export; path required.' },
          { name: '@PATCH(path)', signature: 'MethodDecorator', description: 'Registers a PATCH route.', notes: 'Uppercase export; path required.' },
          { name: '@DELETE(path)', signature: 'MethodDecorator', description: 'Registers a DELETE route.', notes: 'Uppercase export; path required.' },
          { name: '@StatusCode(code)', signature: 'method decorator', description: 'Sets fallback status for a plain handler result.', notes: 'HttpResponse/HttpErrorResponse status wins.' },
          { name: 'RouteDefinition', signature: '{ path; method; handlerName }', description: 'Metadata record written by route decorators.', notes: 'Primarily framework/tooling infrastructure.' },
          { name: 'AppRouter.getRouter()', signature: 'Router', description: 'Builds an Express Router from the static controller registry.', notes: 'Publicly exported framework infrastructure.' },
          { name: 'ControllerRegistry', signature: 'static controllers / add()', description: 'Process-global array of decorated controller constructors.', notes: 'Duplicate constructor references are ignored; state is not reset between app factories.' },
        ]} />
      </Section>

      <Section id="parameter-api" title="Handler parameters">
        <ReferenceTable rows={[
          { name: '@Param(key)', signature: 'ParameterDecorator', description: 'Injects req.params[key].', notes: 'Public as of 0.0.6; returns the raw Express string value.' },
          { name: '@Body()', signature: 'ParameterDecorator', description: 'Injects req.body.', notes: 'Requires body-parsing middleware for JSON.' },
          { name: '@Ctx()', signature: 'ParameterDecorator', description: 'Injects HttpContext.', notes: 'Supported access path for params/query/headers/request/response.' },
          { name: '@Next()', signature: 'ParameterDecorator', description: 'Injects the Express next function.', notes: 'next(error) reaches the fallback error path.' },
          { name: 'ParamType', signature: 'enum', description: 'Parameter metadata categories exported by the barrel.', notes: 'REQ/RES enum values exist, but no @Req/@Res decorators are exported.' },
        ]} />
        <Callout type="tip" title="Param is now part of the package API">
          Upgrade both Core and CLI to 0.0.6 before importing <InlineCode>Param</InlineCode>. Use <InlineCode>@Ctx()</InlineCode> for query strings, headers, and direct request/response access.
        </Callout>
      </Section>

      <Section id="pipeline-api" title="Request pipeline">
        <ReferenceTable rows={[
          { name: 'Guard', signature: 'abstract canActivate(req)', description: 'Base class for synchronous/asynchronous route authorization.', notes: 'False becomes an Unauthorized error.' },
          { name: '@UseGuards(...classes, priority?)', signature: 'method decorator', description: 'Adds guard classes to the shared guard/middleware priority list.', notes: 'Default priority 1; orders against both guards and middleware.' },
          { name: 'ExpressXMiddleware', signature: 'abstract use(ctx)', description: 'Base class for route-specific middleware.', notes: 'No next callback; returning continues.' },
          { name: '@UseMiddlewares(...classes, priority?)', signature: 'method decorator', description: 'Adds middleware classes to the shared guard/middleware priority list.', notes: 'Default priority 3; orders against both middleware and guards.' },
          { name: 'ExpressXInterceptor', signature: 'abstract intercept(ctx, handler)', description: 'Base class for wrapping downstream route execution.', notes: 'Method must return a Promise.' },
          { name: 'Handler.handle()', signature: 'Promise<any>', description: 'Runs the next interceptor or controller.', notes: 'Memoized per handler in 0.0.7; repeated calls share the same downstream promise.' },
          { name: '@UseInterceptors(...classes, priority?)', signature: 'method decorator', description: 'Adds ascending-priority route interceptors.', notes: 'Default priority 4; scoped only to route interceptors and cannot move them before guards or middleware.' },
          { name: '@UseGlobalInterceptor()', signature: 'ClassDecorator', description: 'Registers a singleton interceptor around every route pipeline.', notes: 'Class must extend ExpressXInterceptor; resolved through DI.' },
        ]} />
      </Section>

      <Section id="response-api" title="Responses and errors">
        <ReferenceTable rows={[
          { name: 'Plain controller result', signature: 'any', description: 'Serializes an object, array, primitive, or null directly as JSON.', notes: 'Uses @StatusCode when present; otherwise status 200.' },
          { name: 'Direct ctx.res write', signature: 'void', description: 'Sends a response with the original Express response object.', notes: 'Automatic serialization is skipped after headers are sent.' },
          { name: 'new HttpResponse(code, data?)', signature: 'HttpResponse<T>', description: 'Structured success response serialized as JSON.', notes: 'Defaults to status 200.' },
          { name: 'HttpResponse.ok(data)', signature: 'HttpResponse<T>', description: 'Creates status 200.', notes: 'Static convenience.' },
          { name: 'HttpResponse.created(data)', signature: 'HttpResponse<T>', description: 'Creates status 201.', notes: 'Static convenience.' },
          { name: 'HttpResponse.noContent()', signature: 'HttpResponse<void>', description: 'Creates status 204 with no data.', notes: 'Static convenience.' },
          { name: 'HttpResponse.status(code)', signature: 'this', description: 'Mutates the framework response status.', notes: 'Chainable.' },
          { name: 'HttpResponse.body(data)', signature: 'this', description: 'Mutates framework response data.', notes: 'Chainable.' },
          { name: 'new HttpErrorResponse(status, error)', signature: 'HttpErrorResponse', description: 'Structured JSON error result.', notes: 'May be returned directly or by an exception handler.' },
          { name: 'ExceptionHandler', signature: 'abstract catch(error: unknown)', description: 'Base class for the global error handler.', notes: 'Must return HttpErrorResponse or Promise<HttpErrorResponse>; enforced at runtime.' },
          { name: '@UseGlobalExceptionHandler()', signature: 'ClassDecorator', description: 'Registers the singleton global exception handler.', notes: 'Class must extend ExceptionHandler; later registration overwrites the token.' },
          { name: 'HttpResponseHandler', signature: 'static handlerResponse / delegateUnknownErrorToExpressXHandler', description: 'Low-level JSON serialization helper used by AppRouter.', notes: 'Exported, but normal controllers should return values instead of calling it.' },
        ]} />
      </Section>

      <Section id="di-api" title="Dependency injection">
        <ReferenceTable rows={[
          { name: '@Injectable(lifecycle?)', signature: 'ClassDecorator', description: 'Adds injection metadata; default singleton.', notes: 'Accepts exported Lifecycle values.' },
          { name: '@Singleton()', signature: 'ClassDecorator', description: 'Registers a root singleton.', notes: 'Also applies injectable metadata.' },
          { name: '@Scoped(lifecycle)', signature: 'ClassDecorator', description: 'Registers ContainerScoped or ResolutionScoped.', notes: 'Other lifecycles are excluded by the signature.' },
          { name: '@AutoInjectable()', signature: 'ClassDecorator', description: 'Delegates auto-injection to tsyringe.', notes: 'Use optional constructor parameters.' },
          { name: '@Inject(token)', signature: 'ParameterDecorator', description: 'Injects one registration for a class/string/symbol token.', notes: 'Exact token identity matters.' },
          { name: '@InjectAll(token)', signature: 'ParameterDecorator', description: 'Injects all registrations for a token.', notes: 'Produces an array.' },
          { name: '@InjectWithTransform(token, fn)', signature: 'ParameterDecorator', description: 'Injects a token after a registered transform function.', notes: 'Creates a transform symbol at decorator evaluation time.' },
          { name: '@Registry(providers)', signature: 'ClassDecorator', description: 'Registers provider definitions through tsyringe.', notes: 'Every provider must contain a token.' },
          { name: 'createProvider(token, class, options?)', signature: 'RegistryProvider', description: 'Creates a useClass provider definition.', notes: 'Must still be passed to Registry or a container method.' },
          { name: 'ExpressXContainer', signature: 'DependencyContainer', description: 'The shared tsyringe root container.', notes: 'Exports tsyringe register/resolve APIs.' },
          { name: 'Lifecycle', signature: 'enum', description: 'Transient, Singleton, ResolutionScoped, ContainerScoped.', notes: 'Re-exported from tsyringe.' },
        ]} />
        <p>Core also re-exports the tsyringe types <InlineCode>DependencyContainer</InlineCode>, <InlineCode>InjectionToken</InlineCode>, <InlineCode>Provider</InlineCode>, <InlineCode>FactoryProvider</InlineCode>, <InlineCode>ValueProvider</InlineCode>, <InlineCode>TokenProvider</InlineCode>, <InlineCode>ClassProvider</InlineCode>, and <InlineCode>Disposable</InlineCode>; plus <InlineCode>instanceCachingFactory</InlineCode>, <InlineCode>instancePerContainerCachingFactory</InlineCode>, and <InlineCode>predicateAwareClassFactory</InlineCode>.</p>
      </Section>

      <Section id="metadata-api" title="Metadata tokens">
        <p>The common barrel exports metadata symbols used by decorators and framework infrastructure:</p>
        <CodeBlock language="typescript" code={`ROUTES_METADATA
CONTROLLER_METADATA
PARAM_METADATA
GUARDS_METADATA
MIDDLEWARES_METADATA
INTERCEPTOR_METADATA
STATUS_CODE_METADATA
APP_TOKEN
GLOBAL_EXCEPTION_HANDLER`} />
        <p>Application code rarely needs these symbols; they are public primarily for framework tooling and integrations.</p>
      </Section>

      <Section id="infrastructure-api" title="Infrastructure exports">
        <ReferenceTable rows={[
          { name: 'Kernel.start()', signature: 'Promise<ExpressXApp>', description: 'Scans once and creates/reuses the Express app.', notes: 'Factory-managed; assigns accurate framework/version markers.' },
          { name: '@expressxjs/core/runtime', signature: 'side-effect entrypoint', description: 'Loads reflect-metadata, ts-node/register, and tsconfig-paths/register.', notes: 'Used automatically by expressx dev.' },
          { name: 'ExpressXScanner', signature: 'class', description: 'Configuration, AST detection, cache validation, scan, and import implementation.', notes: 'Available from root and @expressxjs/core/scanner.' },
          { name: 'EXPRESSX_CACHE_VERSION / EXPRESSX_DECORATORS', signature: 'constants', description: 'Public scanner protocol constants.', notes: 'Available from @expressxjs/core/scanner and the root barrel.' },
          { name: 'CachedFileMetadata / FileCache / ScanConfig', signature: 'types', description: 'Public scanner and cache shapes.', notes: 'Available from @expressxjs/core/scanner and the root barrel.' },
          { name: 'ExpressXLogger', signature: 'class', description: 'Colored leveled console logger implementation.', notes: 'Public root export used by generated projects.' },
        ]} />
        <Callout type="info" title="0.0.6 aligns the package barrels">
          The scanner, logger, framework, HTTP, routing, DI-container, and error subpaths now have explicit exports in the tagged source. The legacy <InlineCode>@expressxjs/core/dicontainer</InlineCode> path and the clearer <InlineCode>@expressxjs/core/di-container</InlineCode> alias both resolve to the same DI surface.
        </Callout>
      </Section>
    </Article>
  );
}

const issues = [
  ['expressx: command not found', 'Use npx expressx … for a local install, or npx @expressxjs/cli … for one-off scaffolding. For a global install, confirm npm’s global bin directory is on PATH.'],
  ['package.json not found', 'Run the CLI from the application root. Core and CLI configuration are resolved from process.cwd().'],
  ['@expressxjs/core is not installed', 'Declare @expressxjs/core in dependencies or devDependencies. The dev and generate commands explicitly verify it.'],
  ['Missing expressx.sourceDir', 'Add the expressx object to package.json. sourceDir is mandatory for scanning and generation.'],
  ['Could not find an entrypoint', 'Set expressx.main to an existing file or use one of src/main.ts, src/index.ts, main.ts, or index.ts.'],
  ['No class found with @Application', 'Ensure exactly one scanned/imported file contains @Application() on a class extending ExpressX. Delete/regenerate stale cache if the file moved.'],
  ['Multiple @Application decorators', 'Only one application decorator may execute in a process. Remove the duplicate or stop importing the second application.'],
  ['Controller has no routes', 'Use uppercase @GET/@POST/@PUT/@PATCH/@DELETE with explicit paths and ensure decorators are enabled in tsconfig.'],
  ['Controller is not discovered', 'Keep it under sourceDir, outside excluded test/build folders, include @Controller in the file, and regenerate src/.expressx/cache.json.'],
  ['Route returns 404/does not match', 'Check raw base-path + method-path concatenation for missing/double slashes. No global prefix is currently applied.'],
  ['req.body is undefined', 'Register express.json() in application.onInit before routes. Confirm Content-Type is application/json.'],
  ['Route parameter decorator import fails', 'Confirm @expressxjs/core is 0.0.6 or later, then import Param from @expressxjs/core. On 0.0.5, use @Ctx() and read ctx.req.params.'],
  ['Dependency injection resolution error', 'Enable experimentalDecorators and emitDecoratorMetadata, import/register the provider, use @Inject with the exact token, and remove circular imports.'],
  ['DI fails inside a guard/middleware/interceptor', 'In 0.0.6 route pipeline classes are container-resolved. Add @Injectable/@Singleton metadata, use the exact registration token, and confirm the dependency is imported.'],
  ['UseValidators import fails after upgrading', 'The incomplete validator API was removed in 0.0.6. Validate with Express middleware, ExpressX route middleware, a schema library, or controller code.'],
  ['Middleware order is surprising', 'Guards and middleware are combined and sorted by ascending priority. Same-priority order and stacked decorators should not be relied on.'],
  ['Controller does not run behind an interceptor', 'Call handler.handle() to continue downstream and return its result or a transformed result. Omitting handle() intentionally short-circuits the chain.'],
  ['handler.getData is not a function', 'Version 0.0.7 removed Handler.getData(). Await handler.handle() and transform the returned value directly.'],
  ['Global exception handler returns a generic 500', 'Return an actual HttpErrorResponse instance. Version 0.0.7 rejects plain objects, undefined, and other handler results at runtime.'],
  ['Global exception handler does not receive an error', 'Unmatched routes and errors sent with next(error) bypass the application handler. The framework-owned 404 and Express error fallbacks handle those paths.'],
  ['ESM/CommonJS or NodeNext error', 'Keep generated type: commonjs and NodeNext compiler settings aligned. The runtime package uses require for development TypeScript and Core is published as CommonJS.'],
  ['Production cannot import a controller', 'Run expressx build before tsc, deploy dist/.expressx/cache.json, keep outDir values aligned, and run from the project root.'],
  ['Custom output cannot import a controller', 'Run expressx build --output <dir> and compile with tsc --outDir <dir>. The production cache and JavaScript must use the same directory.'],
  ['Production cache is missing or invalid', 'Production has been strict since 0.0.6. Run expressx build before tsc and deploy the complete output directory, including .expressx/cache.json.'],
] as const;

export function Troubleshooting() {
  return (
    <Article
      eyebrow="ExpressX.js reference"
      title="Troubleshooting"
      description="Common installation, discovery, dependency injection, routing, pipeline, TypeScript, build, and runtime failures tied to the current implementation."
      previous={{ title: 'API reference', href: '/docs/reference/api' }}
      next={{ title: 'Limitations & versioning', href: '/docs/reference/limitations' }}
    >
      <Section id="quick-diagnostics" title="Start with these checks">
        <CodeBlock language="bash" code={`node --version
npm --version
npx expressx --version
npx tsc --noEmit
npx expressx build --verbose`} />
        <p>Run every command from the directory containing the application's <InlineCode>package.json</InlineCode>. Inspect <InlineCode>expressx.sourceDir</InlineCode>, <InlineCode>expressx.outDir</InlineCode>, <InlineCode>expressx.main</InlineCode>, and both cache locations before changing code.</p>
      </Section>

      <Section id="symptoms" title="Symptoms and fixes">
        <div className="divide-y divide-border rounded-xl border border-border">
          {issues.map(([problem, fix]) => (
            <div key={problem} className="grid gap-2 p-4 sm:grid-cols-[220px_1fr]">
              <h3 className="font-semibold text-foreground">{problem}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{fix}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="cache-recovery" title="Cache recovery">
        <p>The development cache is generated state and can be regenerated. Stop the dev server, move or delete <InlineCode>src/.expressx/cache.json</InlineCode>, and restart <InlineCode>npm run dev</InlineCode>. For production, always use a fresh <InlineCode>npm run build</InlineCode>; do not hand-edit file paths.</p>
        <Callout type="warning" title="Do not confuse the two caches">
          Development entries point to TypeScript below <InlineCode>sourceDir</InlineCode>. Production entries must point to JavaScript below <InlineCode>outDir</InlineCode>. Shipping the source cache as the production cache causes import failures.
        </Callout>
      </Section>

      <Section id="runtime-errors" title="Capturing runtime errors">
        <BulletList>
          <li>Add a global exception handler early in development so thrown controller, guard, middleware, and interceptor errors have stable application JSON.</li>
          <li>Use <InlineCode>expressx dev --inspect</InlineCode> for Node debugging and <InlineCode>--trace-warnings</InlineCode> for warning stacks.</li>
          <li>Test direct <InlineCode>HttpErrorResponse</InlineCode> returns separately from thrown errors; they enter the response path differently.</li>
          <li>Avoid sending a response through <InlineCode>ctx.res</InlineCode> and then throwing or returning another payload.</li>
        </BulletList>
      </Section>
    </Article>
  );
}

export function LimitationsVersioning() {
  return (
    <Article
      eyebrow="ExpressX.js reference · 0.0.7"
      title="Limitations & versioning"
      description="A precise boundary between implemented behavior, incomplete public surfaces, and capabilities applications must supply themselves."
      previous={{ title: 'Troubleshooting', href: '/docs/reference/troubleshooting' }}
    >
      <Section id="implemented" title="Implemented and supported in this snapshot">
        <BulletList>
          <li>Express 5 application creation and access to native request/response objects.</li>
          <li>One decorated application with three lifecycle hooks.</li>
          <li>Controller discovery and GET, POST, PUT, PATCH, DELETE routing.</li>
          <li>Controller/service dependency injection and advanced tsyringe registration helpers.</li>
          <li>Path/body/context/next parameter injection.</li>
          <li>DI-resolved guards, route middleware, route/global interceptors, structured success/error responses, and global exception handling.</li>
          <li>CLI project/component generation, TypeScript hot reload, discovery cache preparation, and production path conversion.</li>
        </BulletList>
      </Section>

      <Section id="known-gaps" title="Current 0.0.7 boundaries">
        <BulletList>
          <li>There is no application-level URL prefix/version option; controller and method paths are concatenated directly.</li>
          <li>There is no first-class validator abstraction. Use ordinary or route middleware, a schema library, or application code.</li>
          <li><InlineCode>@Req</InlineCode>, <InlineCode>@Res</InlineCode>, query, header, and cookie parameter decorators are not provided; use <InlineCode>@Ctx()</InlineCode>.</li>
          <li>Thrown errors unwind interceptors before global exception resolution; the resulting <InlineCode>HttpErrorResponse</InlineCode> does not re-enter the interceptor chain.</li>
          <li>The built-in not-found and Express error fallbacks serialize the full <InlineCode>HttpErrorResponse</InlineCode> wrapper, while an application exception handler response serializes only its <InlineCode>error</InlineCode> payload.</li>
          <li>The package does not publish a Node engines range or compatibility matrix.</li>
          <li>A valid production cache is trusted without checking file timestamps or sizes; regenerate it on every build.</li>
          <li>Controller and global-component registries are process-global and are not reset between repeated factory calls in the same process.</li>
        </BulletList>
      </Section>

      <Section id="not-provided" title="Not provided by Core">
        <p>Modules, providers arrays, pipes, exception filters, WebSocket gateways, OpenAPI/Swagger, ORM/database adapters, authentication strategies, RBAC metadata, CORS helpers, testing utilities, GraphQL, file uploads, configuration loading, process clustering, and deployment automation are not ExpressX.js APIs. Use ordinary Express/Node packages or application code.</p>
      </Section>

      <Section id="migration" title="Versioning and migration practice">
        <p>At 0.x versions, treat every release as potentially breaking until the project publishes a stability policy. Pin exact Core and CLI versions together, commit the lockfile, and review generated output when upgrading.</p>
        <CodeBlock language="json" filename="package.json" code={`{
  "dependencies": {
    "@expressxjs/core": "0.0.7"
  },
  "devDependencies": {
    "@expressxjs/cli": "0.0.7"
  }
}`} />
        <p>When upgrading from 0.0.6, replace <InlineCode>Handler.getData()</InlineCode> with <InlineCode>await Handler.handle()</InlineCode>, return only <InlineCode>HttpErrorResponse</InlineCode> from global exception handlers, and test any interceptor that previously transformed thrown failures after exception resolution.</p>
      </Section>

      <Section id="documentation-policy" title="Documentation policy">
        <Callout type="info" title="Implementation is authoritative">
          These pages deliberately avoid describing aspirational or Nest-like APIs. When the current source contains metadata or a type without an execution path, it is documented as incomplete. Update this page alongside Core/CLI changes so users can distinguish supported behavior from work in progress.
        </Callout>
      </Section>
    </Article>
  );
}
