import { CodeBlock } from '@/components/ui-custom/CodeBlock';

export function Middleware() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="middleware" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Middleware
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Middleware is a function which is called <strong>before</strong> the route handler. Middleware functions 
        have access to the request and response objects, and the <code>next()</code> middleware function in the 
        application&apos;s request-response cycle.
      </p>

      <h2 id="creating-middleware" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Creating Middleware
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        To create a middleware, you need to implement the <code>NestMiddleware</code> interface and provide a 
        <code>use()</code> method.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="logger.middleware.ts"
        code={`import { Injectable, NestMiddleware } from '@framework/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(\`Request: \${req.method} \${req.path}\`);
    next();
  }
}`}
      />

      <h2 id="applying-middleware" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Applying Middleware
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Middleware cannot be part of the <code>@Module()</code> decorator. We must set them up using the 
        <code>configure()</code> method of the module class.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="app.module.ts"
        code={`import { Module, NestModule, MiddlewareConsumer } from '@framework/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}`}
      />

      <h2 id="global-middleware" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Global Middleware
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        If we want to bind middleware to every registered route at once, we can use the 
        <code>use()</code> method supplied by the <code>INestApplication</code> instance:
      </p>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);`}
      />
    </div>
  );
}

export function ExceptionFilters() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="exception-filters" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Exception Filters
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Framework comes with a built-in <strong>exceptions layer</strong> which is responsible for processing 
        all unhandled exceptions across an application.
      </p>

      <h2 id="built-in-exceptions" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Built-in HTTP Exceptions
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Framework provides a set of standard exceptions that inherit from the base <code>HttpException</code>:
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { Controller, Get, NotFoundException } from '@framework/common';

@Controller('cats')
export class CatsController {
  @Get(':id')
  findOne(id: string) {
    const cat = this.catsService.findOne(id);
    if (!cat) {
      throw new NotFoundException(\`Cat with ID \${id} not found\`);
    }
    return cat;
  }
}`}
      />

      <h2 id="custom-exception-filter" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Custom Exception Filter
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        While the base (built-in) exception filter can automatically handle many cases, you may want full 
        control over the exceptions layer. That&apos;s when creating custom exception filters becomes useful.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="http-exception.filter.ts"
        code={`import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@framework/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
  }
}`}
      />

      <h2 id="binding-filters" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Binding Filters
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { Controller, Get, UseFilters } from '@framework/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller('cats')
export class CatsController {
  @Get()
  @UseFilters(HttpExceptionFilter)
  findAll() {
    return [];
  }
}`}
      />

      <h2 id="global-exception-filter" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Global Exception Filter
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const app = await NestFactory.create(AppModule);
app.useGlobalFilters(new HttpExceptionFilter());
await app.listen(3000);`}
      />
    </div>
  );
}

export function Pipes() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="pipes" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Pipes
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        A pipe is a class annotated with the <code>@Injectable()</code> decorator, which implements the 
        <code>PipeTransform</code> interface.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Pipes have two typical use cases:
      </p>

      <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-6">
        <li><strong>Transformation</strong>: transform input data to the desired form (e.g., from string to integer)</li>
        <li><strong>Validation</strong>: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception</li>
      </ul>

      <h2 id="built-in-pipes" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Built-in Pipes
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Framework comes with eight pipes available out-of-the-box:
      </p>

      <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-6">
        <li><code>ValidationPipe</code></li>
        <li><code>ParseIntPipe</code></li>
        <li><code>ParseFloatPipe</code></li>
        <li><code>ParseBoolPipe</code></li>
        <li><code>ParseArrayPipe</code></li>
        <li><code>ParseUUIDPipe</code></li>
        <li><code>ParseEnumPipe</code></li>
        <li><code>DefaultValuePipe</code></li>
      </ul>

      <h2 id="parseint-pipe" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Using ParseIntPipe
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { Controller, Get, Param, ParseIntPipe } from '@framework/common';

@Controller('cats')
export class CatsController {
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
}`}
      />

      <h2 id="custom-validation-pipe" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Custom Validation Pipe
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="validation.pipe.ts"
        code={`import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@framework/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Validation failed: no data provided');
    }
    return value;
  }
}`}
      />

      <h2 id="global-pipes" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Global Pipes
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe());
await app.listen(3000);`}
      />
    </div>
  );
}

export function Guards() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="guards" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Guards
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        A guard is a class annotated with the <code>@Injectable()</code> decorator, which implements the 
        <code>CanActivate</code> interface.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Guards have a single responsibility. They determine whether a given request will be handled by the 
        route handler or not, depending on certain conditions like permissions, roles, ACLs, etc.
      </p>

      <h2 id="creating-guard" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Creating a Guard
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="auth.guard.ts"
        code={`import { Injectable, CanActivate, ExecutionContext } from '@framework/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any): boolean {
    const token = request.headers.authorization;
    return !!token;
  }
}`}
      />

      <h2 id="using-guards" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Using Guards
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { Controller, Get, UseGuards } from '@framework/common';
import { AuthGuard } from './guards/auth.guard';

@Controller('cats')
export class CatsController {
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return [];
  }
}`}
      />

      <h2 id="global-guards" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Global Guards
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new AuthGuard());
await app.listen(3000);`}
      />

      <h2 id="role-based-guards" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Role-based Guards
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="roles.guard.ts"
        code={`import { Injectable, CanActivate, ExecutionContext } from '@framework/common';
import { Reflector } from '@framework/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return roles.some((role) => user.roles?.includes(role));
  }
}`}
      />
    </div>
  );
}

export function Interceptors() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="interceptors" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Interceptors
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        An interceptor is a class annotated with the <code>@Injectable()</code> decorator and implements 
        the <code>NestInterceptor</code> interface.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Interceptors have a set of useful capabilities which are inspired by the <strong>Aspect Oriented Programming</strong> 
        (AOP) technique. They make it possible to:
      </p>

      <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-6">
        <li>Bind extra logic before/after method execution</li>
        <li>Transform the result returned from a function</li>
        <li>Transform the exception thrown from a function</li>
        <li>Extend the basic function behavior</li>
        <li>Completely override a function depending on specific conditions (e.g., for caching purposes)</li>
      </ul>

      <h2 id="creating-interceptor" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Creating an Interceptor
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="logging.interceptor.ts"
        code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@framework/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(\`After... \${Date.now() - now}ms\`)),
      );
  }
}`}
      />

      <h2 id="using-interceptors" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Using Interceptors
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { Controller, Get, UseInterceptors } from '@framework/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller('cats')
export class CatsController {
  @Get()
  @UseInterceptors(LoggingInterceptor)
  findAll() {
    return [];
  }
}`}
      />

      <h2 id="transform-interceptor" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Transform Interceptor
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="transform.interceptor.ts"
        code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@framework/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  meta: {
    timestamp: string;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        meta: {
          timestamp: new Date().toISOString(),
        },
      })),
    );
  }
}`}
      />

      <h2 id="caching-interceptor" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Caching Interceptor
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="cache.interceptor.ts"
        code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@framework/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = request.url;

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return next.handle().pipe(
      tap(response => {
        this.cache.set(cacheKey, response);
      }),
    );
  }
}`}
      />
    </div>
  );
}
