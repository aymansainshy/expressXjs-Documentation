import { Link } from 'react-router-dom';
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
          { name: '@Param(key)', signature: 'ParameterDecorator', description: 'Injects req.params[key].', notes: 'Public in 0.0.6; no coercion or validation is applied.' },
          { name: '@Body()', signature: 'ParameterDecorator', description: 'Injects req.body.', notes: 'Register useExpressJson() or another body parser in onInit().' },
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
  Param,
  POST,
} from '@expressxjs/core';

@Controller('/orders')
export class OrderController {
  @POST('/:accountId')
  public create(
    @Param('accountId') accountId: string,
    @Ctx() ctx: HttpContext,
    @Body() body: { sku: string },
    @Next() next: NextFn,
  ) {
    if (!body.sku) return next(new Error('sku is required'));

    return HttpResponse.created({
      accountId,
      sku: body.sku,
      source: ctx.req.query.source,
    });
  }
}`} />
        <Callout type="tip" title="Route parameters are public in 0.0.6">
          Use <InlineCode>@Param('name')</InlineCode> for one path value. <InlineCode>@Req</InlineCode> and <InlineCode>@Res</InlineCode> are not public decorators; use <InlineCode>@Ctx()</InlineCode> when you need query parameters, headers, or direct request/response access.
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

      <Section id="controller-response-styles" title="Controller response styles">
        <p>A controller can return a framework response, return a plain JSON-compatible value, or send the response directly through Express. Expected failures can also be returned as <InlineCode>HttpErrorResponse</InlineCode> values.</p>
        <ReferenceTable rows={[
          { name: 'HttpResponse', signature: 'HttpResponse<T>', description: 'Returns a body with an explicit success status.', notes: 'Use a static factory, constructor, or the chainable status()/body() methods.' },
          { name: 'Plain value', signature: 'object | array | primitive | null', description: 'Serializes the returned value directly as JSON.', notes: 'Uses @StatusCode when present; otherwise status 200.' },
          { name: 'Direct Express response', signature: 'void', description: 'Sends through ctx.res.status(...).json(...) or another Express method.', notes: 'Once headers are sent, ExpressX skips automatic serialization.' },
          { name: 'HttpErrorResponse', signature: 'HttpErrorResponse', description: 'Returns an expected error body with an explicit error status.', notes: 'May be returned without throwing.' },
        ]} />
        <CodeBlock filename="src/users.controller.ts" language="typescript" code={`import {
  Controller,
  Ctx,
  GET,
  HttpContext,
  HttpResponse,
  StatusCode,
} from '@expressxjs/core';

interface User {
  id: string;
  name: string;
}

@Controller('/users')
export class UserController {
  private readonly userList: User[] = [{ id: '1', name: 'Ada' }];

  @GET('/factory')
  public factoryResponse() {
    return HttpResponse.ok(this.userList);
  }

  @GET('/builder')
  public builderResponse() {
    return new HttpResponse<User[]>()
      .status(200)
      .body(this.userList);
  }

  @GET('/plain')
  @StatusCode(200)
  public plainResponse() {
    return {
      message: 'Users retrieved successfully',
      data: this.userList,
    };
  }

  @GET('/direct')
  public directResponse(@Ctx() ctx: HttpContext): void {
    ctx.res.status(200).json({
      message: 'Users retrieved successfully',
      data: this.userList,
    });
  }
}`} />
        <Callout type="warning" title="Do not mix response styles on one path">
          After writing through <InlineCode>ctx.res</InlineCode>, do not also return response data or attempt another write. Interceptors still unwind, but response transformations cannot replace a body whose headers were already sent. Prefer returned values when interceptors need to transform the response.
        </Callout>
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
          <li>A plain object, array, primitive, or <InlineCode>null</InlineCode> uses <InlineCode>@StatusCode</InlineCode> when present and status 200 otherwise.</li>
          <li>A direct <InlineCode>ctx.res</InlineCode> write sets <InlineCode>headersSent</InlineCode>, so the automatic serializer does not send a second response.</li>
          <li>A directly returned <InlineCode>HttpErrorResponse</InlineCode> remains a normal pipeline value, so an interceptor may deliberately transform it before serialization.</li>
          <li>The built-in not-found and Express error fallbacks serialize the complete <InlineCode>{`{ statusCode, error }`}</InlineCode> wrapper; controller-returned and application-handler responses serialize only their <InlineCode>error</InlineCode> payload.</li>
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
        <Callout type="info" title="Validation is application-owned">
          The incomplete <InlineCode>@UseValidators</InlineCode> and <InlineCode>Validator</InlineCode> surfaces were removed in 0.0.6. Validate with an ordinary Express middleware, an ExpressX route middleware, a schema library, or controller/service code.
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
        <Signature>{`abstract use(ctx: HttpContext, next: NextFn): void | Promise<void>`}</Signature>
        <p>ExpressX route middleware receives the exported Express <InlineCode>NextFn</InlineCode> callback type and must call <InlineCode>next()</InlineCode> to continue to the next priority-sorted pipeline step. It does not need to return the callback. Omitting <InlineCode>next()</InlineCode> stops all later guards, middleware, route interceptors, and the controller. A short-circuiting middleware should send its own response; otherwise the request remains open. Calling <InlineCode>next(error)</InlineCode> delegates to the mounted Express error pipeline, while throwing enters the configured ExpressX exception flow.</p>
        <CodeBlock language="typescript" code={`import { ExpressXMiddleware, HttpContext, NextFn } from '@expressxjs/core';

export class RequireName extends ExpressXMiddleware {
  public use(ctx: HttpContext, next: NextFn): void {
    if (typeof ctx.req.body?.name !== 'string') {
      throw new Error('name must be a string');
    }
    next();
  }
}

@POST('/')
@UseMiddlewares(RequireName)
public create(@Body() body: { name: string }) {
  return HttpResponse.created(body);
}`} />
      </Section>

      <Section id="pipeline-dependency-injection" title="Dependency injection in the pipeline">
        <p>Version 0.0.6 resolves route guards, middleware, and interceptors through <InlineCode>ExpressXContainer</InlineCode>. Their constructors can therefore inject services and tokens just like controllers. Apply an ExpressX DI decorator to the pipeline class so tsyringe has the required metadata.</p>
        <CodeBlock language="typescript" code={`@Injectable()
export class AccountGuard extends Guard {
  public constructor(
    @Inject(AccountService) private readonly accounts: AccountService,
  ) { super(); }

  public canActivate(req: Request) {
    return this.accounts.canAccess(req.params.accountId);
  }
}`} />
      </Section>

      <Section id="route-interceptors" title="Route interceptors">
        <Signature>{`abstract intercept(ctx: HttpContext, callHandler: Handler): Promise<any>`}</Signature>
        <p>Call <InlineCode>callHandler.handle()</InlineCode> to run the rest of the chain. Await its result to add after-handler behavior or return a transformed response.</p>
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
        <Callout type="info" title="Continuation is explicit">
          Calling <InlineCode>handle()</InlineCode> is the only way to continue to the next interceptor or controller. Version 0.0.7 memoizes that downstream call, so repeated calls on the same handler do not dispatch the controller twice. Return its result or a transformed result. An interceptor that does not call <InlineCode>handle()</InlineCode> deliberately short-circuits the chain.
        </Callout>
      </Section>

      <Section id="global-interceptors" title="Global interceptors">
        <p>Decorate an interceptor class with <InlineCode>@UseGlobalInterceptor()</InlineCode>. The decorator requires the class to extend <InlineCode>ExpressXInterceptor</InlineCode>, registers it as a singleton, and adds it to a global registry. Global and route interceptors are both resolved through DI.</p>
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
        <p>The last numeric argument to <InlineCode>@UseGuards</InlineCode>, <InlineCode>@UseMiddlewares</InlineCode>, or <InlineCode>@UseInterceptors</InlineCode> is stored as the priority for every class preceding it in that decorator call.</p>
        <CodeBlock language="typescript" code={`@GET('/')
@UseGuards(SessionGuard, RoleGuard, 10)
@UseMiddlewares(AuditMiddleware, 20)
@UseInterceptors(TimingInterceptor, 30)
public handler() {}`} />
        <p>Priority changes ordering only inside a component's pipeline group. It cannot move a route interceptor before a guard or middleware because the groups always execute in this fixed nesting order:</p>
        <CodeBlock filename="Request execution order" language="text" code={`Global interceptors: before
  Guards + middleware (sorted together by ascending priority)
    Route interceptors: before (sorted among themselves by ascending priority)
      Controller
    Route interceptors: after (reverse order)
Global interceptors: after`} />
        <BulletList>
          <li>Guards and middleware share one ascending-priority list. Their priorities order guards against guards, middleware against middleware, and guards against middleware.</li>
          <li>Route-interceptor priority is scoped only to route interceptors. They are sorted separately, then wrap the controller in ascending-priority order.</li>
          <li>No numeric priority can change the fixed group order shown above.</li>
          <li>Classes in one decorator call keep their written order when they have the same priority. Guards still sort before middleware when both types have the same priority.</li>
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
      description="Expected errors can be returned as HttpErrorResponse values; thrown route-pipeline failures can be normalized by one application exception handler, with built-in fallbacks for unmatched routes and Express errors."
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
        <p>The decorated class must extend <InlineCode>ExceptionHandler</InlineCode>. It is registered as a singleton and handles failures thrown by controllers, guards, route middleware, and route/global interceptors inside the generated router. Its <InlineCode>catch</InlineCode> method receives <InlineCode>unknown</InlineCode> and must return <InlineCode>HttpErrorResponse</InlineCode> or <InlineCode>Promise&lt;HttpErrorResponse&gt;</InlineCode>.</p>
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
        <p>The <InlineCode>status</InlineCode> check preserves a numeric status attached to an application error. Unmatched routes and errors passed directly to Express with <InlineCode>next(error)</InlineCode> bypass this handler and use the built-in fallbacks described below.</p>
        <Callout type="warning" title="The return contract is enforced">
          Version 0.0.7 checks the handler result at runtime as well as in TypeScript. Returning a plain object, <InlineCode>undefined</InlineCode>, or any other value raises a <InlineCode>TypeError</InlineCode> and delegates to the framework fallback instead of guessing an HTTP status.
        </Callout>
      </Section>

      <Section id="not-found" title="Not found handling">
        <p>After the generated router, the factory mounts a catch-all middleware that returns status 404 without invoking the application exception handler. The JSON response uses the full <InlineCode>HttpErrorResponse</InlineCode> shape:</p>
        <CodeBlock language="json" code={`{
  "statusCode": 404,
  "error": {
    "message": "Route not found: [GET] /missing"
  }
}`} />
        <Callout type="info" title="The 404 fallback is framework-owned">
          Version 0.0.7 supplies this response whether or not an application exception handler is registered. Define an explicit catch-all controller route if the application needs a different 404 envelope.
        </Callout>
      </Section>

      <Section id="pipeline-errors" title="Errors through interceptors">
        <BulletList>
          <li>A directly returned <InlineCode>HttpErrorResponse</InlineCode> is an ordinary result and travels outward through route and global interceptors.</li>
          <li>A thrown controller failure rejects the route-interceptor chain and then the global-interceptor chain. Entered interceptors may observe the rejection with <InlineCode>try/catch</InlineCode>.</li>
          <li>A thrown guard, middleware, route-interceptor, or global-interceptor failure unwinds the layers that had already been entered.</li>
          <li>After the interceptor chain rejects, the global exception handler converts the failure to <InlineCode>HttpErrorResponse</InlineCode>. That resolved value is serialized directly and does not re-enter the interceptors.</li>
          <li>If no application handler exists, unresolved errors enter the Express fallback and return status 500 as <InlineCode>{`{ "statusCode": 500, "error": { "message": "Internal Server Error" } }`}</InlineCode>.</li>
          <li>If the custom exception handler throws or returns a value other than <InlineCode>HttpErrorResponse</InlineCode>, the same framework fallback handles that failure.</li>
          <li>Calling injected <InlineCode>next(error)</InlineCode> enters the Express error pipeline directly and does not invoke the application exception handler.</li>
        </BulletList>
      </Section>

      <Section id="headers-sent" title="Errors after headers are sent">
        <p>If a route writes directly to <InlineCode>res</InlineCode> and later throws, the exception handler may still run, but serialization skips its result once <InlineCode>headersSent</InlineCode> is true. An unresolved failure is delegated to Express. Prefer returning framework response objects instead of mixing direct writes with later throws.</p>
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
        <p>The scanner uses TypeScript mode when <InlineCode>EXPRESSX_RUNTIME=ts</InlineCode> or <InlineCode>NODE_ENV=development</InlineCode>. If <InlineCode>EXPRESSX_RUNTIME</InlineCode> is provided, only <InlineCode>ts</InlineCode> and <InlineCode>js</InlineCode> are accepted.</p>
        <ReferenceTable rows={[
          { name: 'Development', signature: 'EXPRESSX_RUNTIME=ts or NODE_ENV=development', description: 'Scans TypeScript variants under sourceDir, loads with require(), and stores cache under sourceDir/.expressx.', notes: 'expressx dev sets both defaults and preloads @expressxjs/core/runtime.' },
          { name: 'Production', signature: 'neither development condition', description: 'Imports JavaScript variants listed in the required outDir cache with dynamic import().', notes: 'npm start normally uses NODE_ENV=production and no runtime override.' },
        ]} />
        <p>The dev server passes these values only to its child process instead of mutating the parent CLI environment. Core has no general environment configuration service.</p>
      </Section>

      <Section id="cache" title="Discovery cache">
        <p>The cache records a version, environment, scan count, generation time, and each discovered file's relative path, modification time, and size. Core loads a matching-version cache without rescanning.</p>
        <p>For the complete auto-configuration flow, development change tracking, transitive imports, production path mapping, and recovery rules, see <Link className="text-brand-primary hover:underline" to="/docs/core/auto-configuration-cache">Auto-configuration & cache</Link>.</p>
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
          <li>A missing or invalid development cache triggers a full source scan and regeneration.</li>
          <li>A missing or invalid production cache stops startup with instructions to run <InlineCode>expressx build</InlineCode>.</li>
          <li>A stale production cache is not validated against file metadata at startup; regenerate it during every build.</li>
          <li>The AST detector checks ExpressX imports and actual calls, avoiding comment/string false positives from the earlier text filter.</li>
        </BulletList>
      </Section>

      <Section id="scanner-api" title="Scanner API">
        <p><InlineCode>ExpressXScanner</InlineCode> and its cache types are exported. Most applications should let the CLI and factory call it. Tooling authors can use:</p>
        <ReferenceTable rows={[
          { name: 'getConfig()', signature: 'ScanConfig', description: 'Reads sourceDir/outDir from package.json.', notes: 'Uses process.cwd().' },
          { name: 'getCachePath(isDev, override?)', signature: 'string', description: 'Resolves the cache path inside the project.', notes: 'The optional directory supports custom build output.' },
          { name: 'loadCache(isDev, override?)', signature: 'FileCache | null', description: 'Reads and validates the complete manifest.', notes: 'Returns null for missing, unreadable, incompatible, or unsafe cache data.' },
          { name: 'saveCache(cache, isDev, override?)', signature: 'void', description: 'Validates and atomically writes JSON.', notes: 'Creates the cache directory when necessary.' },
          { name: 'fileContainsDecorators(path, isTs)', signature: 'boolean', description: 'Parses a source file and detects imported entry-point decorators.', notes: 'Shared by full scans and the CLI watcher.' },
          { name: 'fullScan(isDev)', signature: 'Promise<FileCache>', description: 'Globs and AST-filters TypeScript or JavaScript variants.', notes: 'Does not save or import by itself.' },
          { name: 'importFromCache(cache, isDev)', signature: 'Promise<void>', description: 'Loads each cached file so decorators execute.', notes: 'A failed import aborts startup.' },
          { name: 'performScanning()', signature: 'Promise<void>', description: 'Loads/imports the selected cache, rebuilding only in development.', notes: 'Used by Kernel.start().' },
          { name: 'prefurmScanning()', signature: 'Promise<void>', description: 'Deprecated alias for performScanning().', notes: 'Kept for compatibility with the misspelled earlier API.' },
        ]} />
      </Section>

      <Section id="logging" title="Framework logging">
        <p>Core logs bootstrap, scanning, routing, request, response, and error events. <InlineCode>ExpressXLogger</InlineCode> is publicly exported in 0.0.6 and supports debug/info/success/warn/error levels, timestamps, colors, and a configurable minimum level.</p>
      </Section>
    </Article>
  );
}
