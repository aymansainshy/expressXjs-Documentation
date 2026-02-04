import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/sections/Hero';
import { CodeBlock } from '@/components/ui-custom/CodeBlock';
import type { TocItem } from '@/types';
import './App.css';

interface DocSection {
  id: string;
  title: string;
  level: 1 | 2;
  content: string;
  code?: {
    language: string;
    filename?: string;
    content: string;
  } | null;
}

// All documentation content with code examples
const docSections: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    level: 1,
    content: `Framework is a progressive Node.js framework for building efficient, scalable server-side applications. 
It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers 
to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), 
and FRP (Functional Reactive Programming).`,
    code: null
  },
  {
    id: 'philosophy',
    title: 'Philosophy',
    level: 2,
    content: `In recent years, thanks to Node.js, JavaScript has become the "lingua franca" of the web for both front and 
backend applications. This has given rise to awesome projects like Angular, React and Vue, which improve developer 
productivity and enable the creation of fast, testable, and extensible frontend applications.

Framework provides an out-of-the-box application architecture which allows developers and teams to create highly 
testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular.`,
    code: null
  },
  {
    id: 'installation',
    title: 'Installation',
    level: 2,
    content: `To get started, you can either scaffold the project with the Framework CLI, or clone a starter project 
(both will produce the same outcome). To scaffold the project with the Framework CLI, run the following commands:`,
    code: {
      language: 'bash',
      filename: 'Terminal',
      content: `$ npm i -g @framework/cli
$ framework new project-name`
    }
  },
  {
    id: 'alternatives',
    title: 'Alternatives',
    level: 2,
    content: `Alternatively, you can install the TypeScript starter project with Git. This approach gives you more 
control over the initial setup and allows you to customize the project structure from the beginning.`,
    code: {
      language: 'bash',
      filename: 'Terminal',
      content: `$ git clone https://github.com/framework/typescript-starter.git project
$ cd project
$ npm install
$ npm run start`
    }
  },
  {
    id: 'first-steps',
    title: 'First Steps',
    level: 2,
    content: `This set of chapters guides you through the fundamentals of Framework applications. 
You'll learn about the essential building blocks and core concepts to build well-structured applications.

Let's start with the main concept: controllers. Controllers are responsible for handling incoming requests 
and returning responses to the client.`,
    code: {
      language: 'typescript',
      filename: 'app.controller.ts',
      content: `import { Controller, Get } from '@framework/common';

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
    title: 'Controllers',
    level: 2,
    content: `Controllers are responsible for handling incoming requests and returning responses to the client.
A controller's purpose is to receive specific requests for the application. The routing mechanism controls 
which controller receives which requests.

In order to create a basic controller, we use classes and decorators. Decorators associate classes with 
required metadata and enable Framework to create a routing map.`,
    code: {
      language: 'typescript',
      filename: 'cats.controller.ts',
      content: `import { Controller, Get, Post, Body, Param } from '@framework/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return { message: 'Cat created successfully' };
  }

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }
}`
    }
  },
  {
    id: 'providers',
    title: 'Providers',
    level: 2,
    content: `Providers are a fundamental concept in Framework. Many of the basic Framework classes may be treated as 
a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that 
it can be injected as a dependency.

This means objects can create various relationships with each other, and the function of "wiring up" instances 
of objects can largely be delegated to the Framework runtime system.`,
    code: {
      language: 'typescript',
      filename: 'cats.service.ts',
      content: `import { Injectable } from '@framework/common';
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

  findOne(id: string): Cat {
    return this.cats.find(cat => cat.id === id);
  }
}`
    }
  },
  {
    id: 'modules',
    title: 'Modules',
    level: 2,
    content: `A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that 
Framework makes use of to organize the application structure.

Each application has at least one module, a root module. The root module is the starting point Framework 
uses to build the application graph – the internal data structure Framework uses to resolve module and 
provider relationships and dependencies.`,
    code: {
      language: 'typescript',
      filename: 'app.module.ts',
      content: `import { Module } from '@framework/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}`
    }
  },
  {
    id: 'middleware',
    title: 'Middleware',
    level: 2,
    content: `Middleware is a function which is called before the route handler. Middleware functions have access to 
the request and response objects, and the next() middleware function in the application's request-response cycle.

Middleware functions can perform the following tasks:
- Execute any code
- Make changes to the request and response objects
- End the request-response cycle
- Call the next middleware function in the stack`,
    code: {
      language: 'typescript',
      filename: 'logger.middleware.ts',
      content: `import { Injectable, NestMiddleware } from '@framework/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(\`Request: \${req.method} \${req.path}\`);
    next();
  }
}`
    }
  },
  {
    id: 'exception-filters',
    title: 'Exception Filters',
    level: 2,
    content: `Framework comes with a built-in exceptions layer which is responsible for processing all unhandled exceptions 
across an application. When an exception is not handled by your application code, it is caught by this layer.

Out of the box, this action is performed by a built-in global exception filter, which handles exceptions of 
type HttpException and its subclasses.`,
    code: {
      language: 'typescript',
      filename: 'http-exception.filter.ts',
      content: `import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@framework/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}`
    }
  },
  {
    id: 'pipes',
    title: 'Pipes',
    level: 2,
    content: `A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.
Pipes have two typical use cases: transformation and validation.

Transformation pipes transform input data to the desired form (e.g., from string to integer). 
Validation pipes evaluate input data and if valid, pass it through unchanged; otherwise, throw an exception.`,
    code: {
      language: 'typescript',
      filename: 'validation.pipe.ts',
      content: `import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@framework/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Validation failed: no data provided');
    }
    
    // Add your validation logic here
    return value;
  }
}`
    }
  },
  {
    id: 'guards',
    title: 'Guards',
    level: 2,
    content: `A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.
Guards have a single responsibility: they determine whether a given request will be handled by the route 
handler or not, depending on certain conditions like permissions, roles, ACLs, etc.

This is often referred to as authorization. Guards are executed after all middleware but before any interceptor or pipe.`,
    code: {
      language: 'typescript',
      filename: 'auth.guard.ts',
      content: `import { Injectable, CanActivate, ExecutionContext } from '@framework/common';
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
}`
    }
  },
  {
    id: 'interceptors',
    title: 'Interceptors',
    level: 2,
    content: `An interceptor is a class annotated with the @Injectable() decorator and implements the NestInterceptor interface.
Interceptors have a set of useful capabilities inspired by Aspect Oriented Programming (AOP) technique.

They make it possible to bind extra logic before/after method execution, transform the result returned from 
a function, or completely override a function depending on specific conditions.`,
    code: {
      language: 'typescript',
      filename: 'transform.interceptor.ts',
      content: `import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@framework/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  meta: {
    timestamp: string;
    requestId: string;
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
          requestId: context.getArgByIndex(0).id,
        },
      })),
    );
  }
}`
    }
  },
  {
    id: 'custom-decorators',
    title: 'Custom Decorators',
    level: 2,
    content: `Framework is built around a language feature called decorators. Decorators are a well-known concept in many 
programming languages. In JavaScript, they're used to modify classes, methods, or properties.

You can create custom parameter decorators to extract specific data from the request object, making your 
controllers cleaner and more readable.`,
    code: {
      language: 'typescript',
      filename: 'user.decorator.ts',
      content: `import { createParamDecorator, ExecutionContext } from '@framework/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

// Usage in controller
@Controller('profile')
export class ProfileController {
  @Get()
  getProfile(@User() user: UserEntity) {
    return user;
  }

  @Get('email')
  getEmail(@User('email') email: string) {
    return { email };
  }
}`
    }
  },
  {
    id: 'validation',
    title: 'Validation',
    level: 2,
    content: `Framework provides built-in support for request validation using class-validator and class-transformer.
This allows you to validate incoming data using decorators on your DTO classes.

Validation pipes automatically validate incoming data against your DTO definitions.`,
    code: {
      language: 'typescript',
      filename: 'create-user.dto.ts',
      content: `import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

// Usage in controller
@Controller('users')
export class UsersController {
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}`
    }
  },
  {
    id: 'authentication',
    title: 'Authentication',
    level: 2,
    content: `Authentication is a crucial part of any application. Framework provides Passport integration for 
implementing various authentication strategies including JWT, OAuth, and local authentication.

The following example shows how to implement JWT authentication in your application.`,
    code: {
      language: 'typescript',
      filename: 'auth.module.ts',
      content: `import { Module } from '@framework/common';
import { JwtModule } from '@framework/jwt';
import { PassportModule } from '@framework/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}`
    }
  },
  {
    id: 'configuration',
    title: 'Configuration',
    level: 2,
    content: `Framework provides a ConfigModule that allows you to manage application configuration from environment 
variables, configuration files, or other sources.

This helps you keep your configuration organized and easily accessible throughout your application.`,
    code: {
      language: 'typescript',
      filename: 'app.module.ts',
      content: `import { Module } from '@framework/common';
import { ConfigModule } from '@framework/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
    }),
  ],
})
export class AppModule {}

// Usage in service
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }
}`
    }
  },
  {
    id: 'testing',
    title: 'Testing',
    level: 2,
    content: `Framework provides a testing module that allows you to easily write unit and end-to-end tests for your 
application. The testing utilities make it easy to mock dependencies and test your controllers, services, and more.

The following example shows how to write a unit test for a service.`,
    code: {
      language: 'typescript',
      filename: 'cats.service.spec.ts',
      content: `import { Test, TestingModule } from '@framework/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cat', () => {
    const cat = { name: 'Whiskers', age: 2 };
    service.create(cat);
    expect(service.findAll()).toContain(cat);
  });
});`
    }
  },
  {
    id: 'websocket',
    title: 'WebSockets',
    level: 2,
    content: `Framework supports WebSockets out of the box, allowing you to build real-time applications with ease.
WebSocket gateways provide a way to handle WebSocket connections and messages.

The following example shows how to create a basic WebSocket gateway for a chat application.`,
    code: {
      language: 'typescript',
      filename: 'chat.gateway.ts',
      content: `import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@framework/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(\`Client connected: \${client.id}\`);
  }

  handleDisconnect(client: Socket) {
    console.log(\`Client disconnected: \${client.id}\`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('message', {
      sender: client.id,
      content: payload,
      timestamp: new Date(),
    });
  }
}`
    }
  },
  {
    id: 'graphql',
    title: 'GraphQL',
    level: 2,
    content: `Framework provides first-class support for GraphQL through the @framework/graphql package. You can easily 
set up a GraphQL API with resolvers, mutations, and subscriptions.

The following example shows how to create a basic GraphQL resolver.`,
    code: {
      language: 'typescript',
      filename: 'cats.resolver.ts',
      content: `import { Resolver, Query, Mutation, Args } from '@framework/graphql';
import { CatsService } from './cats.service';
import { Cat } from './models/cat.model';
import { CreateCatInput } from './dto/create-cat.input';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(() => [Cat], { name: 'cats' })
  async getCats() {
    return this.catsService.findAll();
  }

  @Mutation(() => Cat)
  async createCat(@Args('createCatInput') createCatInput: CreateCatInput) {
    return this.catsService.create(createCatInput);
  }
}`
    }
  },
  {
    id: 'openapi',
    title: 'OpenAPI/Swagger',
    level: 2,
    content: `Framework provides built-in support for OpenAPI (Swagger) documentation. You can automatically generate 
API documentation from your controllers and DTOs.

The following example shows how to set up Swagger in your application.`,
    code: {
      language: 'typescript',
      filename: 'main.ts',
      content: `import { NestFactory } from '@framework/core';
import { SwaggerModule, DocumentBuilder } from '@framework/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();`
    }
  },
  {
    id: 'cli',
    title: 'CLI',
    level: 2,
    content: `The Framework CLI is a powerful tool that helps you scaffold and manage your projects. It provides 
commands for generating modules, controllers, services, and more.

Here are some commonly used CLI commands:`,
    code: {
      language: 'bash',
      filename: 'Terminal',
      content: `# Generate a new module
$ framework generate module users

# Generate a controller
$ framework generate controller users

# Generate a service
$ framework generate service users

# Generate a complete CRUD resource
$ framework generate resource users

# Build the application
$ framework build

# Start in development mode
$ framework start --watch`
    }
  },
  {
    id: 'deployment',
    title: 'Deployment',
    level: 2,
    content: `Deploying a Framework application is straightforward. You can deploy to various platforms including 
Docker, AWS, Google Cloud, Heroku, and more.

The following example shows a Dockerfile for containerizing your application.`,
    code: {
      language: 'dockerfile',
      filename: 'Dockerfile',
      content: `# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]`
    }
  }
];

type PageId = 'home' | 'docs' | 'examples' | 'community';

interface RouteState {
  page: PageId;
  docId?: string;
  docAnchor?: string;
}

const DOC_BASE = '#/doc';
const EXAMPLE_BASE = '#/example';

const docSectionMap = new Map(docSections.map((section) => [section.id, section]));
const introGroupIds = ['introduction', 'philosophy', 'installation', 'alternatives'];
const docPageMap = new Map<string, string[]>();

docPageMap.set('introduction', introGroupIds);
docSections.forEach((section) => {
  if (!introGroupIds.includes(section.id)) {
    docPageMap.set(section.id, [section.id]);
  }
});

const docPageOrder = docSections.reduce<string[]>((order, section) => {
  if (introGroupIds.includes(section.id)) {
    if (!order.includes('introduction')) {
      order.push('introduction');
    }
    return order;
  }
  if (docPageMap.has(section.id)) {
    order.push(section.id);
  }
  return order;
}, []);

const docPageIds = new Set(docPageMap.keys());
const defaultDocId = docPageIds.has('introduction')
  ? 'introduction'
  : Array.from(docPageIds)[0] ?? 'introduction';

const normalizeDocId = (docId?: string) =>
  docId && docPageIds.has(docId) ? docId : defaultDocId;

const parseRoute = (hash: string): RouteState => {
  const cleaned = hash.replace(/^#/, '').trim();
  if (!cleaned || cleaned === '/') {
    return { page: 'home' };
  }

  const normalized = cleaned.replace(/^\/+/, '');
  const parts = normalized.split('/').filter(Boolean);
  const [root, maybeId, maybeAnchor] = parts;

  if (!root) {
    return { page: 'home' };
  }

  const lowerRoot = root.toLowerCase();

  if (lowerRoot === 'doc' || lowerRoot === 'docs') {
    if (!maybeId) {
      return { page: 'docs', docId: defaultDocId };
    }
    const candidate = maybeId.toLowerCase();
    if (docPageIds.has(candidate)) {
      return { page: 'docs', docId: candidate, docAnchor: maybeAnchor?.toLowerCase() };
    }
    if (introGroupIds.includes(candidate)) {
      return {
        page: 'docs',
        docId: 'introduction',
        docAnchor: (maybeAnchor ?? candidate).toLowerCase(),
      };
    }
    return { page: 'docs', docId: defaultDocId };
  }
  if (lowerRoot === 'example' || lowerRoot === 'examples') {
    return { page: 'examples' };
  }
  if (lowerRoot === 'comunity' || lowerRoot === 'community') {
    return { page: 'community' };
  }
  if (lowerRoot === 'home') {
    return { page: 'home' };
  }

  if (docPageIds.has(lowerRoot)) {
    return { page: 'docs', docId: lowerRoot };
  }
  if (introGroupIds.includes(lowerRoot)) {
    return { page: 'docs', docId: 'introduction', docAnchor: lowerRoot };
  }

  return { page: 'home' };
};

// Documentation content component
function DocContent({ sections, pageId }: { sections: DocSection[]; pageId: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {sections.map((section, index) => (
        <section 
          key={section.id} 
          id={section.id} 
          className={`scroll-mt-24 ${index > 0 ? 'mt-12' : ''}`}
        >
          {section.level === 1 ? (
            <h1 className="text-3xl font-semibold tracking-tight mb-4 flex items-center gap-2 group">
              {section.title}
              <a 
                href={
                  section.id === pageId
                    ? `${DOC_BASE}/${pageId}`
                    : `${DOC_BASE}/${pageId}/${section.id}`
                }
                className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity text-xl"
              >
                #
              </a>
            </h1>
          ) : (
            <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2 group">
              {section.title}
              <a 
                href={
                  section.id === pageId
                    ? `${DOC_BASE}/${pageId}`
                    : `${DOC_BASE}/${pageId}/${section.id}`
                }
                className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity text-lg"
              >
                #
              </a>
            </h2>
          )}
          
          {section.content.split('\n\n').map((paragraph, pIndex) => (
            <p key={pIndex} className="text-foreground/80 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
          
          {section.code && (
            <CodeBlock 
              code={section.code.content}
              language={section.code.language}
              filename={section.code.filename}
            />
          )}
        </section>
      ))}
    </div>
  );
}

function ExamplesPage() {
  return (
    <section className="relative pt-24 pb-16">
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Examples
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Practical examples to copy and ship
          </h1>
          <p className="mt-4 text-muted-foreground">
            Explore starter projects that mirror real production use cases. Each example links to the
            exact docs section you need to get moving quickly.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-background/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">REST API Starter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Controllers, providers, and routing patterns ready to extend.
            </p>
            <a
              href={`${DOC_BASE}/controllers`}
              className="mt-4 inline-flex text-sm font-medium text-brand-primary"
            >
              Open guide →
            </a>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Validation Flow</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              DTO validation and pipes wired in with real request payloads.
            </p>
            <a
              href={`${DOC_BASE}/validation`}
              className="mt-4 inline-flex text-sm font-medium text-brand-primary"
            >
              Review validation →
            </a>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">GraphQL API</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Schema-first setup with resolvers and mutations organized for scale.
            </p>
            <a
              href={`${DOC_BASE}/graphql`}
              className="mt-4 inline-flex text-sm font-medium text-brand-primary"
            >
              See GraphQL →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunityPage() {
  return (
    <section className="relative pt-24 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent-blue/10" />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Comunity
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Build with people who ship
          </h1>
          <p className="mt-4 text-muted-foreground">
            Join the community to share ideas, get help, and connect with other teams building on
            Framework.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-background/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Discord</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Real-time help from maintainers and power users.
            </p>
            <a
              href="https://discord.gg/framework"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-brand-primary"
            >
              Join Discord →
            </a>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">GitHub Discussions</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask questions, propose ideas, and review RFCs.
            </p>
            <a
              href="https://github.com/framework/framework"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-brand-primary"
            >
              Visit GitHub →
            </a>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Events</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Monthly meetups and live workshops with the core team.
            </p>
            <a
              href={EXAMPLE_BASE}
              className="mt-4 inline-flex text-sm font-medium text-brand-primary"
            >
              Explore examples →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [route, setRoute] = useState<RouteState>(() => parseRoute(window.location.hash));

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors (private mode, etc.)
    }
  }, [isDark]);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseRoute(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (route.page !== 'docs') {
      setIsSidebarOpen(false);
      window.scrollTo({ top: 0 });
      return;
    }

    const anchor = route.docAnchor;
    if (!anchor) {
      window.scrollTo({ top: 0 });
      return;
    }

    const scrollToAnchor = () => {
      const element = document.getElementById(anchor);
      if (!element) {
        window.scrollTo({ top: 0 });
        return;
      }
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    requestAnimationFrame(() => {
      setTimeout(scrollToAnchor, 0);
    });
  }, [route.page, route.docId, route.docAnchor]);

  const resolvedDocId = normalizeDocId(route.page === 'docs' ? route.docId : undefined);
  const pageSectionIds = docPageMap.get(resolvedDocId) ?? [resolvedDocId];
  const docSectionsForPage: DocSection[] = pageSectionIds
    .map((id, index) => {
      const section = docSectionMap.get(id);
      if (!section) return null;
      return { ...section, level: index === 0 ? 1 : 2 };
    })
    .filter((section): section is DocSection => Boolean(section));
  const tocItems: TocItem[] = docSectionsForPage.map((section) => ({
    id: section.id,
    text: section.title,
    level: section.level,
  }));
  const showToc = tocItems.length > 1;
  const activeSection =
    route.page === 'docs' && route.docAnchor && docSectionMap.has(route.docAnchor)
      ? route.docAnchor
      : resolvedDocId;
  const currentIndex = docPageOrder.indexOf(resolvedDocId);
  const prevPageId = currentIndex > 0 ? docPageOrder[currentIndex - 1] : null;
  const nextPageId =
    currentIndex >= 0 && currentIndex < docPageOrder.length - 1
      ? docPageOrder[currentIndex + 1]
      : null;
  const getDocTitle = (id: string) => docSectionMap.get(id)?.title ?? id;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        currentPage={route.page}
      />

      {route.page === 'home' && <Hero />}

      {route.page === 'docs' && (
        <div className="pt-24">
          <div className="flex max-w-[1600px] mx-auto">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              activeSection={activeSection}
            />

            <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <div className="flex flex-col gap-8 xl:flex-row">
                <div className="flex-1 max-w-3xl">
                  <DocContent sections={docSectionsForPage} pageId={resolvedDocId} />
                  {(prevPageId || nextPageId) && (
                    <div className="mt-12 border-t border-border pt-6 flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
                      {prevPageId ? (
                        <a
                          href={`${DOC_BASE}/${prevPageId}`}
                          className="flex-1 rounded-lg border border-border/60 p-4 transition-colors hover:border-brand-primary/60 hover:bg-muted/40"
                        >
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Previous
                          </p>
                          <p className="mt-2 text-base font-semibold text-foreground">
                            {getDocTitle(prevPageId)}
                          </p>
                        </a>
                      ) : (
                        <div className="flex-1" />
                      )}
                      {nextPageId && (
                        <a
                          href={`${DOC_BASE}/${nextPageId}`}
                          className="flex-1 rounded-lg border border-border/60 p-4 transition-colors hover:border-brand-primary/60 hover:bg-muted/40"
                        >
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Next
                          </p>
                          <p className="mt-2 text-base font-semibold text-foreground">
                            {getDocTitle(nextPageId)}
                          </p>
                        </a>
                      )}
                    </div>
                  )}
                </div>
                {showToc && (
                  <TableOfContents
                    items={tocItems}
                    activeId={activeSection}
                    pageId={resolvedDocId}
                  />
                )}
              </div>
            </main>
          </div>
        </div>
      )}

      {route.page === 'examples' && <ExamplesPage />}
      {route.page === 'community' && <CommunityPage />}

      <Footer />
    </div>
  );
}

export default App;
