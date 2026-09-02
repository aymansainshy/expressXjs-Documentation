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
      eyebrow="ExpressX.js reference · Core 0.0.5"
      title="API reference"
      description="Signatures and runtime behavior for the public Core barrels, with incomplete or infrastructure-level exports identified explicitly."
      previous={{ title: 'Build & deployment', href: '/docs/operations/build-deployment' }}
      next={{ title: 'Troubleshooting', href: '/docs/reference/troubleshooting' }}
    >
      <Section id="application-api" title="Application and framework">
        <ReferenceTable rows={[
          { name: '@Application(options?)', signature: 'Options → ClassDecorator', description: 'Marks the single ExpressX application, registers it as a singleton, and stores options metadata.', notes: 'Class must extend ExpressX. prefix/version are stored but not applied.' },
          { name: 'ExpressX', signature: 'abstract class', description: 'Requires preInit(), onInit(app), and postInit(app) lifecycle methods.', notes: 'preInit/onInit are async; postInit is synchronous.' },
          { name: 'ExpressXFactory.createApp<T>()', signature: 'Promise<ExpressXApp>', description: 'Scans, creates Express, runs lifecycle hooks, mounts routing/errors, locks registration, and returns the app.', notes: 'Does not listen on a port. The optional Options argument is not functionally applied.' },
          { name: 'OnInitExpressXApp.use(mw)', signature: 'this', description: 'Registers one ordinary Express request middleware before routes.', notes: 'Rejects functions whose declared arity is 4 or greater.' },
          { name: 'Options', signature: '{ prefix?: string; version?: string }', description: 'Application/router option shape.', notes: 'Reserved but ineffective in 0.0.5.' },
          { name: 'ExpressXApp', signature: 'interface extends Express', description: 'Type of the returned Express application with framework/version markers in its interface.', notes: 'Runtime sets expressXVersion to 1.0.0 but does not assign framework in the reviewed source.' },
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
          { name: 'AppRouter.getRouter(options?)', signature: 'Router', description: 'Builds an Express Router from the static controller registry.', notes: 'Publicly exported infrastructure; options are unused.' },
          { name: 'ControllerRegistry', signature: 'static controllers / add()', description: 'Process-global array of decorated controller constructors.', notes: 'Duplicate constructor references are ignored; state is not reset between app factories.' },
        ]} />
      </Section>

      <Section id="parameter-api" title="Handler parameters">
        <ReferenceTable rows={[
          { name: '@Body()', signature: 'ParameterDecorator', description: 'Injects req.body.', notes: 'Requires body-parsing middleware for JSON.' },
          { name: '@Ctx()', signature: 'ParameterDecorator', description: 'Injects HttpContext.', notes: 'Supported access path for params/query/headers/request/response.' },
          { name: '@Next()', signature: 'ParameterDecorator', description: 'Injects the Express next function.', notes: 'next(error) reaches the fallback error path.' },
          { name: 'ParamType', signature: 'enum', description: 'Internal parameter metadata categories exported by the barrel.', notes: 'PARAM/REQ/RES values exist even when corresponding decorators are unavailable.' },
        ]} />
        <Callout type="warning" title="Implementation-only Param">
          The source defines <InlineCode>Param(key)</InlineCode>, but <InlineCode>decorators/index.ts</InlineCode> does not export it. It is not part of the reachable package API in a source rebuild. <InlineCode>Req</InlineCode> and <InlineCode>Res</InlineCode> are commented out.
        </Callout>
      </Section>

      <Section id="pipeline-api" title="Request pipeline">
        <ReferenceTable rows={[
          { name: 'Guard', signature: 'abstract canActivate(req)', description: 'Base class for synchronous/asynchronous route authorization.', notes: 'False becomes an Unauthorized error.' },
          { name: '@UseGuards(...classes, priority?)', signature: 'method decorator', description: 'Adds guard classes to the priority-sorted route pipeline.', notes: 'Default priority 1; route classes use new, not DI.' },
          { name: 'ExpressXMiddleware', signature: 'abstract use(ctx)', description: 'Base class for route-specific middleware.', notes: 'No next callback; returning continues.' },
          { name: '@UseMiddlewares(...classes, priority?)', signature: 'method decorator', description: 'Adds middleware classes to the priority-sorted route pipeline.', notes: 'Default priority 3; route classes use new, not DI.' },
          { name: 'ExpressXInterceptor', signature: 'abstract intercept(ctx, handler)', description: 'Base class for wrapping downstream route execution.', notes: 'Method must return a Promise.' },
          { name: 'Handler.handle()', signature: 'Promise<any>', description: 'Runs the next interceptor or controller.', notes: 'Return the awaited result from intercept().' },
          { name: 'Handler.getData(transform?)', signature: 'Promise<any>', description: 'Runs downstream and optionally transforms the result.', notes: 'An alternative to handle(), not an inspection-only method.' },
          { name: '@UseInterceptors(...classes, priority?)', signature: 'method decorator', description: 'Adds route interceptor metadata.', notes: 'Default priority 4 is stored but route interceptors are not sorted; route classes use new.' },
          { name: '@UseGlobalInterceptor()', signature: 'ClassDecorator', description: 'Registers a singleton interceptor around every route pipeline.', notes: 'Class must extend ExpressXInterceptor; resolved through DI.' },
          { name: '@UseValidators(...classes, priority?)', signature: 'method decorator', description: 'Writes validator metadata.', notes: 'Not executed by the 0.0.5 router. Do not rely on it.' },
        ]} />
      </Section>

      <Section id="response-api" title="Responses and errors">
        <ReferenceTable rows={[
          { name: 'new HttpResponse(code, data?)', signature: 'HttpResponse<T>', description: 'Structured success response serialized as JSON.', notes: 'Defaults to status 200.' },
          { name: 'HttpResponse.ok(data)', signature: 'HttpResponse<T>', description: 'Creates status 200.', notes: 'Static convenience.' },
          { name: 'HttpResponse.created(data)', signature: 'HttpResponse<T>', description: 'Creates status 201.', notes: 'Static convenience.' },
          { name: 'HttpResponse.noContent()', signature: 'HttpResponse<void>', description: 'Creates status 204 with no data.', notes: 'Static convenience.' },
          { name: 'response.status(code)', signature: 'this', description: 'Mutates the response status.', notes: 'Chainable.' },
          { name: 'response.body(data)', signature: 'this', description: 'Mutates response data.', notes: 'Chainable.' },
          { name: 'new HttpErrorResponse(status, error)', signature: 'HttpErrorResponse', description: 'Structured JSON error result.', notes: 'May be returned directly or by an exception handler.' },
          { name: 'ExceptionHandler', signature: 'abstract catch(error)', description: 'Base class for the global error handler.', notes: 'Return may be sync/async and any type; HttpErrorResponse gives explicit status.' },
          { name: '@UseGlobalExceptionHandler()', signature: 'ClassDecorator', description: 'Registers the singleton global exception handler.', notes: 'Class must extend ExceptionHandler; later registration overwrites the token.' },
          { name: 'HttpResponseHandler', signature: 'static handlerResponse / handleError', description: 'Low-level JSON serialization helper used by AppRouter.', notes: 'Exported, but normal controllers should return values instead of calling it.' },
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
VALIDATOR_METADATA
APP_TOKEN
APP_OPTIONS`} />
        <p>Application code rarely needs these. <InlineCode>STATUS_CODE_METADATA</InlineCode> and <InlineCode>GLOBAL_EXCEPTION_HANDLER</InlineCode> exist internally but are omitted from the common barrel.</p>
      </Section>

      <Section id="infrastructure-api" title="Infrastructure exports and barrel caveats">
        <ReferenceTable rows={[
          { name: 'Kernel.start()', signature: 'Promise<ExpressXApp>', description: 'Scans once and creates/reuses the Express app.', notes: 'Factory-managed infrastructure; hardcodes expressXVersion to 1.0.0.' },
          { name: '@expressxjs/core/runtime', signature: 'side-effect entrypoint', description: 'Loads reflect-metadata, ts-node/register, and tsconfig-paths/register.', notes: 'Used automatically by expressx dev.' },
          { name: 'ExpressXScanner', signature: 'class', description: 'Configuration, cache, scan, and import implementation.', notes: 'Intended package subpath exists, but the checked-in scanner source index is empty.' },
          { name: 'ExpressXLogger', signature: 'class', description: 'Colored leveled console logger implementation.', notes: 'Older dist exports it; the checked-in logger source index is empty.' },
        ]} />
        <Callout type="warning" title="Source and built-artifact drift">
          The local source and pre-existing <InlineCode>dist</InlineCode> disagree for scanner and logger barrels. A clean source build is the stricter source of truth for maintainers, while an already published artifact may still expose the older symbols. Avoid new application dependencies on these inconsistent exports until the package is rebuilt and published from aligned barrels.
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
  ['Route parameter decorator import fails', 'Param is not exported in 0.0.5. Inject @Ctx() and read ctx.req.params.'],
  ['Dependency injection resolution error', 'Enable experimentalDecorators and emitDecoratorMetadata, import/register the provider, use @Inject with the exact token, and remove circular imports.'],
  ['DI fails inside a guard/middleware/interceptor', 'Route-level pipeline classes are created with new rather than the container. Keep their constructors empty; global interceptors and exception handlers are container-resolved.'],
  ['Validation never runs', '@UseValidators only writes unused metadata in 0.0.5. Validate with Express middleware, ExpressX route middleware, or controller code.'],
  ['Middleware order is surprising', 'Guards and middleware are combined and sorted by ascending priority. Same-priority order and stacked decorators should not be relied on.'],
  ['Interceptor runs code twice', 'Return the value from await handler.handle() or getData(). Returning undefined tells the runner to continue again.'],
  ['Unmatched routes return 500', 'Register a global exception handler and preserve numeric error.status so the internal not-found error remains 404.'],
  ['ESM/CommonJS or NodeNext error', 'Keep generated type: commonjs and NodeNext compiler settings aligned. The runtime package uses require for development TypeScript and Core is published as CommonJS.'],
  ['Production cannot import a controller', 'Run expressx build before tsc, deploy dist/.expressx/cache.json, keep outDir values aligned, and run from the project root.'],
  ['--output writes cache to an unexpected folder', 'In 0.0.5 the flag rewrites cached paths but save location still follows expressx.outDir. Update package.json and tsconfig instead of using a different flag value.'],
  ['ExpressXLogger export is missing', 'The checked-in logger source barrel is empty. Replace generated use with console or align/rebuild the Core barrel before relying on that export.'],
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
          <li>Add a global exception handler early in development so route, guard, middleware, and not-found errors have stable JSON.</li>
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
      eyebrow="ExpressX.js reference · 0.0.5"
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
          <li>Body/context/next parameter injection.</li>
          <li>Guards, route middleware, route/global interceptors, structured success/error responses, and global exception handling.</li>
          <li>CLI project/component generation, TypeScript hot reload, discovery cache preparation, and production path conversion.</li>
        </BulletList>
      </Section>

      <Section id="known-gaps" title="Known 0.0.5 implementation gaps">
        <BulletList>
          <li><InlineCode>Options.prefix</InlineCode> and <InlineCode>Options.version</InlineCode> are not applied.</li>
          <li><InlineCode>@UseValidators</InlineCode> is exported but the router does not execute validators.</li>
          <li><InlineCode>Param</InlineCode> exists in its implementation file but is not re-exported; request/response decorators are commented out.</li>
          <li>Route-level guards, middleware, and interceptors bypass DI construction.</li>
          <li>Route-interceptor numeric priority is ignored; equal-priority ordering elsewhere should not be treated as stable.</li>
          <li>An interceptor that returns undefined after calling downstream can trigger a second dispatch.</li>
          <li>Without a global handler, unmatched routes return the generic 500 fallback instead of a 404 JSON response.</li>
          <li>The source logger and scanner barrel files do not match older local built artifacts; the CLI relies on those surfaces.</li>
          <li><InlineCode>build --output</InlineCode> does not change the cache save root independently of configured <InlineCode>outDir</InlineCode>.</li>
          <li>The package does not publish a Node engines range or compatibility matrix.</li>
          <li>Runtime <InlineCode>expressXVersion</InlineCode> is hardcoded to 1.0.0 while the reviewed packages are 0.0.5, and the typed <InlineCode>framework</InlineCode> marker is not assigned.</li>
        </BulletList>
      </Section>

      <Section id="not-provided" title="Not provided by Core">
        <p>Modules, providers arrays, pipes, exception filters, WebSocket gateways, OpenAPI/Swagger, ORM/database adapters, authentication strategies, RBAC metadata, CORS helpers, testing utilities, GraphQL, file uploads, configuration loading, process clustering, and deployment automation are not ExpressX.js APIs. Use ordinary Express/Node packages or application code.</p>
      </Section>

      <Section id="migration" title="Versioning and migration practice">
        <p>At 0.x versions, treat minor releases as potentially breaking until the project publishes a stability policy. Pin exact Core and CLI versions together, commit the lockfile, and review generated output when upgrading.</p>
        <CodeBlock language="json" filename="package.json" code={`{
  "dependencies": {
    "@expressxjs/core": "0.0.5"
  },
  "devDependencies": {
    "@expressxjs/cli": "0.0.5"
  }
}`} />
        <p>For an upgrade, regenerate a sample project in a temporary directory, compare its <InlineCode>package.json</InlineCode>, tsconfig, application, bootstrap, and resource output to your codebase, then run both development and compiled production smoke tests.</p>
      </Section>

      <Section id="documentation-policy" title="Documentation policy">
        <Callout type="info" title="Implementation is authoritative">
          These pages deliberately avoid describing aspirational or Nest-like APIs. When the current source contains metadata or a type without an execution path, it is documented as incomplete. Update this page alongside Core/CLI changes so users can distinguish supported behavior from work in progress.
        </Callout>
      </Section>
    </Article>
  );
}
