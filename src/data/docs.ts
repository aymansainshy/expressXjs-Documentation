interface DocSection {
  id: string;
  level: 1 | 2 | 3;
  title?: string;
  content: string;
  code?: {
    language: string;
    filename?: string;
    code: string;
  };
  hint?: string;
  additionalContent?: string;
}

interface DocContent {
  [key: string]: {
    title: string;
    sections: DocSection[];
  };
}

export const docContent: DocContent = {
  introduction: {
    title: 'Introduction',
    sections: [
      {
        id: 'introduction',
        level: 1,
        content: `
Framework is a progressive Node.js framework for building efficient, scalable server-side applications. 
It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers 
to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), 
and FRP (Functional Reactive Programming).

Under the hood, Framework makes use of robust HTTP Server frameworks like Express (the default) and optionally 
can be configured to use Fastify as well!

ExpressXjs provides a level of abstraction above these common Node.js frameworks (Express/Fastify), but also 
exposes their APIs directly to the developer. This gives developers the freedom to use the myriad of third-party 
modules which are available for the underlying platform.`
      },
      {
        id: 'philosophy',
        level: 2,
        title: 'Philosophy',
        content: `
In recent years, thanks to Node.js, JavaScript has become the "lingua franca" of the web for both front and 
backend applications. This has given rise to awesome projects like Angular, React and Vue, which improve developer 
productivity and enable the creation of fast, testable, and extensible frontend applications. However, while plenty 
of superb libraries, helpers, and tools exist for Node (and server-side JavaScript), none of them effectively solve 
the main problem of **architecture**.

Framework provides an out-of-the-box application architecture which allows developers and teams to create highly 
testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular.`
      },
      {
        id: 'installation',
        level: 2,
        title: 'Installation',
        content: `
To get started, you can either scaffold the project with the Framework CLI, or clone a starter project 
(both will produce the same outcome).

To scaffold the project with the Framework CLI, run the following commands. This will create a new project 
directory, and populate the directory with the initial core Framework files and supporting modules, creating 
a conventional base structure for your project. Creating a new project with the Framework CLI is recommended 
for first-time users.`,
        code: {
          language: 'bash',
          filename: 'Terminal',
          code: `$ npm i -g @framework/cli
$ framework new project-name`
        }
      },
      {
        id: 'alternatives',
        level: 2,
        title: 'Alternatives',
        content: `
Alternatively, to install the TypeScript starter project with Git:

Alternatively, to install the TypeScript starter project with Git:`,
        code: {
          language: 'bash',
          filename: 'Terminal',
          code: `$ git clone https://github.com/framework/typescript-starter.git project
$ cd project
$ npm install
$ npm run start`
        },
        hint: 'If you\'d like to clone the repository without the git history, you can use degit.',
        additionalContent: `
Open your browser and navigate to http://localhost:3000/.

To install the JavaScript flavor of the starter project, use javascript-starter.git in the command sequence above.

You can also start a new project from scratch by installing the core and supporting packages. Keep in mind that 
you'll need to set up the project boilerplate files on your own. At a minimum, you'll need these dependencies: 
@framework/core, @framework/common, rxjs, and reflect-metadata.`
      }
    ]
  },
  overview: {
    title: 'Overview',
    sections: [
      {
        id: 'first-steps',
        level: 2,
        title: 'First Steps',
        content: `
This set of chapters guides you through the fundamentals of Framework applications. 
You'll learn about the essential building blocks and core concepts to build well-structured applications.

Let's start with the main concept: controllers. Controllers are responsible for handling incoming requests 
and returning responses to the client.`,
        code: {
          language: 'typescript',
          filename: 'app.controller.ts',
          code: `import { Controller, Get } from '@framework/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}`
        }
      },
      {
        id: 'controllers',
        level: 2,
        title: 'Controllers',
        content: `
Controllers are responsible for handling incoming requests and returning responses to the client.

A controller's purpose is to receive specific requests for the application. The routing mechanism controls 
which controller receives which requests. Frequently, each controller has more than one route, and different 
routes can perform different actions.

In order to create a basic controller, we use classes and decorators. Decorators associate classes with 
required metadata and enable Framework to create a routing map (tie requests to the corresponding controllers).`,
        code: {
          language: 'typescript',
          filename: 'cats.controller.ts',
          code: `import { Controller, Get, Post, Body } from '@framework/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}`
        }
      },
      {
        id: 'providers',
        level: 2,
        title: 'Providers',
        content: `
Providers are a fundamental concept in Framework. Many of the basic Framework classes may be treated as 
a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that 
it can be injected as a dependency; this means objects can create various relationships with each other, 
and the function of "wiring up" instances of objects can largely be delegated to the Framework runtime system.`,
        code: {
          language: 'typescript',
          filename: 'cats.service.ts',
          code: `import { Injectable } from '@framework/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}`
        }
      },
      {
        id: 'modules',
        level: 2,
        title: 'Modules',
        content: `
A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that 
Framework makes use of to organize the application structure.

Each application has at least one module, a root module. The root module is the starting point Framework 
uses to build the application graph – the internal data structure Framework uses to resolve module and 
provider relationships and dependencies.`,
        code: {
          language: 'typescript',
          filename: 'app.module.ts',
          code: `import { Module } from '@framework/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}`
        }
      },
      {
        id: 'middleware',
        level: 2,
        title: 'Middleware',
        content: `
Middleware is a function which is called before the route handler. Middleware functions have access to 
the request and response objects, and the next() middleware function in the application's request-response cycle. 
The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.
- If the current middleware function does not end the request-response cycle, it must call next() to pass 
  control to the next middleware function. Otherwise, the request will be left hanging.`,
        code: {
          language: 'typescript',
          filename: 'logger.middleware.ts',
          code: `import { Injectable, NestMiddleware } from '@framework/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}`
        }
      },
      {
        id: 'exception-filters',
        level: 2,
        title: 'Exception Filters',
        content: `
Framework comes with a built-in exceptions layer which is responsible for processing all unhandled exceptions 
across an application. When an exception is not handled by your application code, it is caught by this layer, 
which then automatically sends an appropriate user-friendly response.

Out of the box, this action is performed by a built-in global exception filter, which handles exceptions of 
type HttpException (and its subclasses). When an exception is unrecognised (is neither HttpException nor a 
class that inherits from HttpException), the built-in exception filter generates the following default JSON response.`,
        code: {
          language: 'typescript',
          filename: 'http-exception.filter.ts',
          code: `import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@framework/common';
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
      });
  }
}`
        }
      },
      {
        id: 'pipes',
        level: 2,
        title: 'Pipes',
        content: `
A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.

Pipes have two typical use cases:
- Transformation: transform input data to the desired form (e.g., from string to integer)
- Validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception

In both cases, pipes operate on the arguments being processed by a controller route handler. Framework 
interposes a pipe just before a method is invoked, and the pipe receives the arguments destined for the 
method and operates on them. Any transformation or validation operation takes place at that time, after 
which the route handler is invoked with any (potentially) transformed arguments.`,
        code: {
          language: 'typescript',
          filename: 'validation.pipe.ts',
          code: `import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@framework/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}`
        }
      },
      {
        id: 'guards',
        level: 2,
        title: 'Guards',
        content: `
A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.

Guards have a single responsibility. They determine whether a given request will be handled by the route 
handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. 
This is often referred to as authorization.

Authorization (and its cousin, authentication, with which it usually collaborates) has typically been handled 
by middleware in traditional Express applications. Middleware is a fine choice for authentication, since things 
like token validation and attaching properties to the request object are not strongly connected with a particular 
route context (and its metadata).`,
        code: {
          language: 'typescript',
          filename: 'auth.guard.ts',
          code: `import { Injectable, CanActivate, ExecutionContext } from '@framework/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}`
        }
      },
      {
        id: 'interceptors',
        level: 2,
        title: 'Interceptors',
        content: `
An interceptor is a class annotated with the @Injectable() decorator and implements the NestInterceptor interface.

Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. 
They make it possible to:
- Bind extra logic before/after method execution
- Transform the result returned from a function
- Transform the exception thrown from a function
- Extend the basic function behavior
- Completely override a function depending on specific conditions (e.g., for caching purposes)`,
        code: {
          language: 'typescript',
          filename: 'transform.interceptor.ts',
          code: `import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@framework/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({ data })));
  }
}`
        }
      },
      {
        id: 'custom-decorators',
        level: 2,
        title: 'Custom Decorators',
        content: `
Framework is built around a language feature called decorators. Decorators are a well-known concept in a lot 
of commonly used programming languages, but in the JavaScript world, they're still relatively new. In order to 
better understand how decorators work, we recommend reading this article. Here's a simple definition:

An ECMAScript decorator is an expression which returns a function and can take a target, name and property 
descriptor as arguments. You apply it by prefixing the decorator with an @ character and placing this at the 
top of what you are trying to decorate. Decorators can be defined for either a class, a method or a property.`,
        code: {
          language: 'typescript',
          filename: 'user.decorator.ts',
          code: `import { createParamDecorator, ExecutionContext } from '@framework/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);`
        }
      }
    ]
  }
};
