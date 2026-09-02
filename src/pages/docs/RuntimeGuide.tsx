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

export function RequestResponseGuide() {
  return (
    <Article
      title="Request & response"
      description="Route parameters are supplied by method-parameter decorators, while handlers return plain JSON values or structured response objects."
      previous={{ title: 'Dependency injection', href: '/docs/core/dependency-injection' }}
      next={{ title: 'Request pipeline', href: '/docs/core/request-pipeline' }}
    >
      <Section id="parameter-decorators" title="Parameter decorators">
        <ReferenceTable rows={[
          { name: '@Body()', signature: 'ParameterDecorator', description: 'Injects req.body.', notes: 'Register express.json() or another body parser in onInit().' },
          { name: '@Ctx()', signature: 'ParameterDecorator', description: 'Injects { req, res } as HttpContext.', notes: 'Use for headers, query, cookies, route params, or direct response access.' },
          { name: '@Next()', signature: 'ParameterDecorator', description: 'Injects Express next.', notes: 'Call next(error) to enter the mounted fallback error handler.' },
        ]} />
        <CodeBlock language="typescript" code={`import {
  Body,
  Controller,
  Ctx,
  HttpContext,
  HttpResponse,
  Next,
  NextFn,
  POST,
} from '@expressxjs/core';

@Controller('/orders')
export class OrderController {
  @POST('/:accountId')
  public create(
    @Ctx() ctx: HttpContext,
    @Body() body: { sku: string },
    @Next() next: NextFn,
  ) {
    if (!body.sku) return next(new Error('sku is required'));

    return HttpResponse.created({
      accountId: ctx.req.params.accountId,
      sku: body.sku,
      source: ctx.req.query.source,
    });
  }
}`} />
        <Callout type="warning" title="No public @Param in 0.0.5">
          A <InlineCode>Param(key)</InlineCode> decorator exists in the implementation file, but it is omitted from the decorators barrel and therefore from the documented package surface. <InlineCode>@Req</InlineCode> and <InlineCode>@Res</InlineCode> implementations are commented out. Use <InlineCode>@Ctx()</InlineCode> and read <InlineCode>ctx.req.params</InlineCode>, <InlineCode>ctx.req.query</InlineCode>, or <InlineCode>ctx.req.headers</InlineCode>.
        </Callout>
        <p>Undecorated handler parameters receive <InlineCode>undefined</InlineCode>. Parameter decorators only select existing Express values; they do not coerce types or validate DTOs.</p>
      </Section>

      <Section id="http-context" title="HttpContext and Express types">
        <Signature>{`interface HttpContext { req: Request; res: Response }`}</Signature>
        <p><InlineCode>Request</InlineCode>, <InlineCode>Response</InlineCode>, and <InlineCode>NextFn</InlineCode> are re-exported Express types. The context exposes the original objects, so normal Express properties and methods are available.</p>
        <CodeBlock language="typescript" code={`@GET('/download')
public download(@Ctx() ctx: HttpContext): void {
  ctx.res.setHeader('content-type', 'text/plain');
  ctx.res.send('report');
  // Automatic serialization sees headersSent and does nothing.
}`} />
      </Section>

      <Section id="http-response" title="HttpResponse">
        <Signature>new HttpResponse&lt;T&gt;(code = 200, data?: T)</Signature>
        <ReferenceTable rows={[
          { name: 'HttpResponse.ok(data)', signature: 'HttpResponse<T>', description: 'Creates a 200 response.', notes: 'Data is serialized with res.json().' },
          { name: 'HttpResponse.created(data)', signature: 'HttpResponse<T>', description: 'Creates a 201 response.', notes: 'Useful for POST handlers.' },
          { name: 'HttpResponse.noContent()', signature: 'HttpResponse<void>', description: 'Creates a 204 response with no data.', notes: 'Express omits the body for status 204.' },
          { name: '.status(code)', signature: 'this', description: 'Mutates the response code and returns the same instance.', notes: 'No status-range validation.' },
          { name: '.body(data)', signature: 'this', description: 'Mutates response data and returns the same instance.', notes: 'The generic T fixes the accepted data type.' },
        ]} />
        <CodeBlock language="typescript" code={`return HttpResponse
  .ok({ queued: true })
  .status(202);`} />
      </Section>

      <Section id="error-response" title="HttpErrorResponse">
        <Signature>new HttpErrorResponse(statusCode: number, error: any)</Signature>
        <p>Return this object for an expected HTTP error without throwing. The serializer uses <InlineCode>statusCode</InlineCode> and sends <InlineCode>error</InlineCode> as JSON.</p>
        <CodeBlock language="typescript" code={`@GET('/:id')
public findOne(@Ctx() ctx: HttpContext) {
  const record = this.records.find(ctx.req.params.id);
  return record
    ? HttpResponse.ok(record)
    : new HttpErrorResponse(404, { message: 'Record not found' });
}`} />
      </Section>

      <Section id="serialization" title="Serialization rules">
        <Flow steps={['Handler result', 'Choose status', 'Choose payload', 'res.status()', 'res.json()']} />
        <BulletList>
          <li><InlineCode>HttpResponse.code</InlineCode> wins over <InlineCode>@StatusCode</InlineCode>.</li>
          <li><InlineCode>HttpErrorResponse.statusCode</InlineCode> wins over <InlineCode>@StatusCode</InlineCode>.</li>
          <li>A resolved exception may carry a separate error status through interceptors even if an interceptor converts the response object to a plain envelope.</li>
          <li>Redirect behavior is not implemented, and route handlers are JSON-oriented by default.</li>
        </BulletList>
      </Section>
    </Article>
  );
}

export function RequestPipeline() {
  return (
    <Article
      title="Request pipeline"
      description="Global interceptors wrap a priority-sorted guard and middleware pipeline, which then runs route interceptors around the controller handler."
      previous={{ title: 'Request & response', href: '/docs/core/request-response' }}
      next={{ title: 'Error handling', href: '/docs/core/error-handling' }}
    >
      <Section id="execution-order" title="Actual execution order">
        <Flow steps={['Global interceptor (before)', 'Guards / middleware by priority', 'Route interceptor (before)', 'Controller', 'Route interceptor (after)', 'Global interceptor (after)', 'Serialize']} />
        <p>Guards and route middleware share one ascending-priority list. Guard decorators default to priority 1 and middleware decorators to priority 3, so guards normally run first. Route interceptors execute after that list and around the controller. Global interceptors wrap the entire route pipeline.</p>
        <Callout type="warning" title="Validators are not active">
          <InlineCode>@UseValidators</InlineCode> and validator metadata exist, but the router's validator collection and execution are commented out, and the <InlineCode>Validator</InlineCode> base class is not exported by the base barrel. No validator step belongs in the version 0.0.5 runtime flow. Validate in an Express middleware, an ExpressX route middleware, or the controller.
        </Callout>
      </Section>

      <Section id="guards" title="Guards">
        <Signature>{`abstract canActivate(req: Request): boolean | Promise<boolean>`}</Signature>
        <p>A guard decides whether the request may proceed. Returning false makes the router throw an error whose message starts with <InlineCode>Unauthorized: Guard</InlineCode>. A thrown guard error enters the same exception flow.</p>
        <CodeBlock filename="src/common/guards/api-key.guard.ts" language="typescript" code={`import { Guard, Request } from '@expressxjs/core';

export class ApiKeyGuard extends Guard {
  public canActivate(req: Request): boolean {
    return req.headers['x-api-key'] === process.env.API_KEY;
  }
}`} />
        <CodeBlock language="typescript" code={`@GET('/')
@UseGuards(ApiKeyGuard)
public privateRoute() {
  return HttpResponse.ok({ secret: true });
}`} />
      </Section>

      <Section id="route-middleware" title="Route middleware">
        <Signature>{`abstract use(ctx: HttpContext): void | Promise<void>`}</Signature>
        <p>ExpressX route middleware receives a context and continues when the method resolves. There is no <InlineCode>next</InlineCode> callback. Throw to stop the pipeline, or send a response directly and be aware that later pipeline code still runs unless it also checks <InlineCode>headersSent</InlineCode>.</p>
        <CodeBlock language="typescript" code={`import { ExpressXMiddleware, HttpContext } from '@expressxjs/core';

export class RequireName extends ExpressXMiddleware {
  public use(ctx: HttpContext): void {
    if (typeof ctx.req.body?.name !== 'string') {
      throw new Error('name must be a string');
    }
  }
}

@POST('/')
@UseMiddlewares(RequireName)
public create(@Body() body: { name: string }) {
  return HttpResponse.created(body);
}`} />
      </Section>

      <Section id="route-interceptors" title="Route interceptors">
        <Signature>{`abstract intercept(ctx: HttpContext, callHandler: Handler): Promise<any>`}</Signature>
        <p>Call <InlineCode>callHandler.handle()</InlineCode> to run the rest of the chain. Use <InlineCode>getData(transform?)</InlineCode> as a convenience that awaits downstream data and optionally transforms it.</p>
        <CodeBlock language="typescript" code={`import {
  ExpressXInterceptor,
  Handler,
  HttpContext,
} from '@expressxjs/core';

export class TimingInterceptor extends ExpressXInterceptor {
  public async intercept(ctx: HttpContext, next: Handler): Promise<unknown> {
    const started = performance.now();
    const result = await next.handle();
    ctx.res.setHeader('x-response-time', (performance.now() - started) + 'ms');
    return result;
  }
}`} />
        <Callout type="danger" title="Always return the downstream value">
          If an interceptor calls <InlineCode>handle()</InlineCode> and then returns <InlineCode>undefined</InlineCode>, the runtime interprets that as “continue” and dispatches again. This can execute downstream handlers twice. Return the result, a transformed result, or a deliberate final response value.
        </Callout>
      </Section>

      <Section id="global-interceptors" title="Global interceptors">
        <p>Decorate an interceptor class with <InlineCode>@UseGlobalInterceptor()</InlineCode>. The decorator requires the class to extend <InlineCode>ExpressXInterceptor</InlineCode>, registers it as a singleton, and adds it to a global registry. Unlike route interceptors, global interceptors are resolved through DI.</p>
        <CodeBlock language="typescript" code={`import {
  ExpressXInterceptor,
  Handler,
  HttpContext,
  HttpResponse,
  UseGlobalInterceptor,
} from '@expressxjs/core';

@UseGlobalInterceptor()
export class EnvelopeInterceptor extends ExpressXInterceptor {
  public async intercept(ctx: HttpContext, next: Handler) {
    const result = await next.handle();
    if (!(result instanceof HttpResponse)) return result;

    return new HttpResponse(result.code, {
      data: result.data,
      path: ctx.req.originalUrl,
    });
  }
}`} />
      </Section>

      <Section id="priority" title="Priority and ordering details">
        <p>The last numeric argument to <InlineCode>@UseGuards</InlineCode>, <InlineCode>@UseMiddlewares</InlineCode>, <InlineCode>@UseValidators</InlineCode>, or <InlineCode>@UseInterceptors</InlineCode> is stored as the priority for every class preceding it in that decorator call.</p>
        <CodeBlock language="typescript" code={`@GET('/')
@UseGuards(SessionGuard, RoleGuard, 10)
@UseMiddlewares(AuditMiddleware, 20)
@UseInterceptors(TimingInterceptor, 30)
public handler() {}`} />
        <BulletList>
          <li>Guard and middleware priorities are honored together and sorted ascending.</li>
          <li>Validator metadata is unused.</li>
          <li>Route-interceptor priority is stored but not sorted or otherwise consulted.</li>
          <li>Same-priority and stacked-decorator ordering follows metadata insertion details; do not make business logic depend on it.</li>
          <li>Global interceptor order follows discovery/import registration order; keep them order-independent where possible.</li>
        </BulletList>
      </Section>
    </Article>
  );
}

export function ErrorHandling() {
  return (
    <Article
      title="Error handling"
      description="Expected errors can be returned as HttpErrorResponse values; thrown failures and not-found requests can be normalized by one global exception handler."
      previous={{ title: 'Request pipeline', href: '/docs/core/request-pipeline' }}
      next={{ title: 'Discovery & configuration', href: '/docs/core/discovery-configuration' }}
    >
      <Section id="expected-errors" title="Expected HTTP errors">
        <p>Return <InlineCode>HttpErrorResponse</InlineCode> when the handler can express an expected failure directly. It avoids throwing and still uses the common response serializer.</p>
        <CodeBlock language="typescript" code={`return record
  ? HttpResponse.ok(record)
  : new HttpErrorResponse(404, {
      statusCode: 404,
      message: 'Record not found',
    });`} />
      </Section>

      <Section id="global-handler" title="Global exception handler">
        <Signature>@UseGlobalExceptionHandler(): ClassDecorator</Signature>
        <p>The decorated class must extend <InlineCode>ExceptionHandler</InlineCode>. It is registered as a singleton and handles controller failures, guard/middleware failures, unmatched routes, and errors passed to Express <InlineCode>next</InlineCode>. Its <InlineCode>catch</InlineCode> method may be synchronous or asynchronous and may return any value, though <InlineCode>HttpErrorResponse</InlineCode> gives an explicit status.</p>
        <CodeBlock filename="src/common/exceptions/app.exception-handler.ts" language="typescript" code={`import {
  ExceptionHandler,
  HttpErrorResponse,
  UseGlobalExceptionHandler,
} from '@expressxjs/core';

type StatusError = Error & { status?: number };

@UseGlobalExceptionHandler()
export class AppExceptionHandler extends ExceptionHandler {
  public catch(error: unknown): HttpErrorResponse {
    const candidate = error as Partial<StatusError>;
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
        <p>The <InlineCode>status</InlineCode> check preserves the framework's unmatched-route status. Without it, a custom handler that maps every unknown error to 500 also turns 404s into 500s.</p>
      </Section>

      <Section id="not-found" title="Not found handling">
        <p>After the generated router, the factory mounts a catch-all middleware that throws an internal error with <InlineCode>status = 404</InlineCode> and message <InlineCode>Route not found: [METHOD] /path</InlineCode>. It then reaches the global exception handler. Without a handler, even this unmatched route is sent by the framework fallback as a generic 500 response.</p>
        <Callout type="warning" title="Register a global handler for correct 404 JSON">
          Version 0.0.5 has no built-in public 404 response body. A global exception handler that respects <InlineCode>error.status</InlineCode> is necessary if the application should return 404 rather than the no-handler generic 500.
        </Callout>
      </Section>

      <Section id="pipeline-errors" title="Errors through interceptors">
        <BulletList>
          <li>A controller error is resolved into a value inside the route-interceptor chain, so route interceptors can transform the resulting error response.</li>
          <li>A guard, route middleware, or route-interceptor failure is resolved outside the route-interceptor chain but remains inside global interceptors.</li>
          <li>An error from a global interceptor reaches the mounted Express fallback handler.</li>
          <li>If no global handler exists, unresolved errors return <InlineCode>{`{ "message": "Internal Server Error" }`}</InlineCode> with status 500.</li>
          <li>If the custom exception handler itself throws in the fallback path, the framework returns status 500 with an unexpected-error JSON object.</li>
        </BulletList>
      </Section>

      <Section id="headers-sent" title="Errors after headers are sent">
        <p>If an unresolved route error reaches the outer catch after response headers were sent, ExpressX calls <InlineCode>next(error)</InlineCode>. Custom handlers should also avoid writing a second response. Prefer returning framework response objects instead of mixing direct <InlineCode>res</InlineCode> writes with later throws.</p>
      </Section>
    </Article>
  );
}

export function DiscoveryConfiguration() {
  return (
    <Article
      title="Discovery & configuration"
      description="ExpressX.js discovers decorated classes by scanning configured source or output directories and caching the file list."
      previous={{ title: 'Error handling', href: '/docs/core/error-handling' }}
      next={{ title: 'CLI overview', href: '/docs/cli' }}
    >
      <Section id="package-options" title="package.json options">
        <ReferenceTable rows={[
          { name: 'expressx.sourceDir', signature: 'string (required)', description: 'Root scanned for TypeScript in development.', notes: 'The scanner throws when missing or the directory does not exist.' },
          { name: 'expressx.outDir', signature: 'string = "dist"', description: 'Root scanned for JavaScript in production and location of the production cache.', notes: 'Keep this aligned with compilerOptions.outDir.' },
          { name: 'expressx.main', signature: 'string', description: 'Preferred TypeScript entrypoint for expressx dev/start.', notes: 'Read by the CLI, not Core. Fallbacks: src/main.ts, src/index.ts, main.ts, index.ts.' },
        ]} />
        <CodeBlock filename="package.json" language="json" code={`{
  "expressx": {
    "sourceDir": "src",
    "outDir": "dist",
    "main": "src/index.ts"
  }
}`} />
      </Section>

      <Section id="runtime-mode" title="Development and production mode">
        <p>The scanner uses one environment switch: <InlineCode>EXPRESSX_RUNTIME === 'ts'</InlineCode>.</p>
        <ReferenceTable rows={[
          { name: 'Development', signature: 'EXPRESSX_RUNTIME=ts', description: 'Scans .ts under sourceDir, loads with require(), and stores cache under sourceDir/.expressx.', notes: 'expressx dev sets this automatically and preloads @expressxjs/core/runtime.' },
          { name: 'Production', signature: 'any other value / unset', description: 'Scans .js under outDir, loads with dynamic import(), and stores cache under outDir/.expressx.', notes: 'npm start normally leaves the variable unset.' },
        ]} />
        <p><InlineCode>NODE_ENV</InlineCode> does not choose scanner mode. The dev server sets it to <InlineCode>development</InlineCode> only when it was previously unset. Application code may use it normally, but Core has no environment configuration service.</p>
      </Section>

      <Section id="cache" title="Discovery cache">
        <p>The cache records a version, environment, scan count, generation time, and each discovered file's relative path, modification time, and size. Core loads a matching-version cache without rescanning.</p>
        <CodeBlock filename="src/.expressx/cache.json" language="json" code={`{
  "version": "1.0.0",
  "decoratorFiles": [
    { "path": "src/application.ts", "mtime": 0, "size": 420 },
    { "path": "src/users/user.controller.ts", "mtime": 0, "size": 900 }
  ],
  "totalScanned": 12,
  "generatedAt": "2026-01-01T00:00:00.000Z",
  "environment": "development"
}`} />
        <BulletList>
          <li>The CLI dev server validates existing cache entries and watches source changes.</li>
          <li>A missing cache triggers a full scan in both development and production in the current implementation.</li>
          <li>A stale production cache is not validated against file metadata at startup; regenerate it during every build.</li>
          <li>The scanner's text filter can produce a false positive if decorator names occur in unrelated code, but importing the file is normally harmless.</li>
        </BulletList>
      </Section>

      <Section id="scanner-api" title="Scanner API">
        <p><InlineCode>ExpressXScanner</InlineCode> and its cache types are exported. Most applications should let the CLI and factory call it. Tooling authors can use:</p>
        <ReferenceTable rows={[
          { name: 'getConfig()', signature: 'ScanConfig', description: 'Reads sourceDir/outDir from package.json.', notes: 'Uses process.cwd().' },
          { name: 'loadCache(isDev)', signature: 'FileCache | null', description: 'Reads and validates the cache version.', notes: 'Returns null for missing, unreadable, or version-mismatched cache.' },
          { name: 'saveCache(cache, isDev)', signature: 'void', description: 'Creates the cache directory and writes JSON.', notes: 'Target is derived from package config.' },
          { name: 'fullScan(isDev)', signature: 'Promise<FileCache>', description: 'Globs and filters TypeScript or JavaScript files.', notes: 'Does not save or import by itself.' },
          { name: 'importFromCache(cache, isDev)', signature: 'Promise<void>', description: 'Loads each cached file so decorators execute.', notes: 'A failed import aborts startup.' },
          { name: 'prefurmScanning()', signature: 'Promise<void>', description: 'Loads or creates a cache and imports its files.', notes: 'The public method name is misspelled in 0.0.5; prefer factory-managed use.' },
        ]} />
      </Section>

      <Section id="logging" title="Framework logging">
        <p>Core logs bootstrap, scanning, routing, request, response, and error events. An <InlineCode>ExpressXLogger</InlineCode> implementation supports debug/info/success/warn/error levels, timestamps, colors, and a minimum level. However, the checked-in source logger barrel currently exports nothing, while an older local built artifact exports <InlineCode>ExpressXLogger</InlineCode>. Treat direct logger import as unstable until the source barrel and published package are aligned.</p>
      </Section>
    </Article>
  );
}
