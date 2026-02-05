import { CodeBlock } from '@/components/ui-custom/CodeBlock';

export function FirstSteps() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="first-steps" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        First Steps
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        This set of chapters guides you through the fundamentals of Framework applications. 
        You&apos;ll learn about the essential building blocks and core concepts to build well-structured applications.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Let&apos;s start with the main concept: <strong>controllers</strong>. Controllers are responsible for handling 
        incoming requests and returning responses to the client.
      </p>

      <h2 id="creating-controller" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Creating a Controller
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        A controller is a class annotated with the <code>@Controller()</code> decorator. Controllers handle incoming 
        requests and return responses to the client.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="app.controller.ts"
        code={`import { Controller, Get } from '@framework/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}`}
      />

      <h2 id="running-app" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Running the Application
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        To create a Framework application instance, we use the <code>NestFactory</code> class. 
        <code>NestFactory</code> exposes a few static methods that allow creating an application instance.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`import { NestFactory } from '@framework/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();`}
      />

      <h2 id="project-structure" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Project Structure
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        After creating a new project, your directory structure should look like this:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Project Structure"
        code={`src/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
test/
├── app.e2e-spec.ts
└── jest-e2e.json
├── .eslintrc.js
├── .prettierrc
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json`}
      />

      <h2 id="linting" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Linting and Formatting
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Framework projects come pre-configured with ESLint and Prettier for code quality and consistency.
      </p>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`# Run linter
$ npm run lint

# Run formatter
$ npm run format

# Fix linting issues
$ npm run lint -- --fix`}
      />
    </div>
  );
}

export function Controllers() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="controllers" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Controllers
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Controllers are responsible for handling incoming requests and returning responses to the client.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        A controller&apos;s purpose is to receive specific requests for the application. The routing mechanism controls 
        which controller receives which requests. Frequently, each controller has more than one route, and different 
        routes can perform different actions.
      </p>

      <h2 id="routing" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Routing
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        In order to create a basic controller, we use classes and <strong>decorators</strong>. Decorators associate classes with 
        required metadata and enable Framework to create a routing map (tie requests to the corresponding controllers).
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { Controller, Get, Post, Body, Param, Delete } from '@framework/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }
}`}
      />

      <h2 id="request-object" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Request Object
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Framework provides decorators to access the request object and its properties:
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { Controller, Get, Req } from '@framework/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}`}
      />

      <h2 id="route-wildcards" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Route Wildcards
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Pattern based routes are supported as well. For instance, the asterisk is used as a wildcard, 
        and will match any combination of characters.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}`}
      />

      <h2 id="status-code" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Status Code
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        By default, responses have a status code of 200, except for POST requests which use 201. 
        You can change this behavior by adding the <code>@HttpCode(...)</code> decorator.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { HttpCode } from '@framework/common';

@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}`}
      />
    </div>
  );
}

export function Providers() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="providers" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Providers
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Providers are a fundamental concept in Framework. Many of the basic Framework classes may be treated as 
        a provider – services, repositories, factories, helpers, and so on.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        The main idea of a provider is that it can be <strong>injected</strong> as a dependency; this means objects 
        can create various relationships with each other, and the function of &quot;wiring up&quot; instances of objects 
        can largely be delegated to the Framework runtime system.
      </p>

      <h2 id="services" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Services
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Let&apos;s start by creating a simple <code>CatsService</code>. This service will be responsible for storing 
        and retrieving cats. We define it in a service file and decorate it with the <code>@Injectable()</code> decorator.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats.service.ts"
        code={`import { Injectable } from '@framework/common';
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
}`}
      />

      <h2 id="dependency-injection" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Dependency Injection
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Framework is built around the strong design pattern commonly known as <strong>Dependency Injection</strong>. 
        We recommend reading the great article by Martin Fowler on the subject.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        In Framework, thanks to TypeScript capabilities, it&apos;s extremely easy to manage dependencies because 
        they are resolved just by type. In the example below, Framework will resolve the <code>catsService</code> 
        by creating and returning an instance of <code>CatsService</code>.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { Controller, Get, Post, Body } from '@framework/common';
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
  async findAll() {
    return this.catsService.findAll();
  }
}`}
      />

      <h2 id="custom-providers" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Custom Providers
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Framework has a built-in inversion of control (&quot;IoC&quot;) container that resolves relationships between providers. 
        This feature underlies the dependency injection feature described above, but is, in fact, much more powerful.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="app.module.ts"
        code={`import { Module } from '@framework/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CATS_SERVICE',
      useClass: CatsService,
    },
  ],
})
export class AppModule {}`}
      />

      <h2 id="optional-providers" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Optional Providers
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Occasionally, you might have dependencies which do not necessarily have to be resolved. For instance, 
        your class may depend on a <strong>configuration object</strong>, but if none is passed, the default values should be used.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats.service.ts"
        code={`import { Injectable, Optional, Inject } from '@framework/common';

@Injectable()
export class CatsService {
  constructor(
    @Optional() @Inject('CONFIG') private config: Config,
  ) {}
}`}
      />
    </div>
  );
}

export function Modules() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="modules" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Modules
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        A module is a class annotated with a <code>@Module()</code> decorator. The <code>@Module()</code> decorator 
        provides metadata that Framework makes use of to organize the application structure.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Each application has at least one module, a <strong>root module</strong>. The root module is the starting 
        point Framework uses to build the application graph – the internal data structure Framework uses to resolve 
        module and provider relationships and dependencies.
      </p>

      <h2 id="basic-module" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Basic Module
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="app.module.ts"
        code={`import { Module } from '@framework/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [],
})
export class AppModule {}`}
      />

      <p className="text-foreground/80 leading-relaxed mb-6">
        The <code>@Module()</code> decorator takes a single object whose properties describe the module:
      </p>

      <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-6">
        <li><code>providers</code> - the providers that will be instantiated by the Framework injector and that may be shared at least across this module</li>
        <li><code>controllers</code> - the set of controllers defined in this module which have to be instantiated</li>
        <li><code>imports</code> - the list of imported modules that export the providers which are required in this module</li>
        <li><code>exports</code> - the subset of providers that are provided by this module and should be available in other modules which import this module</li>
      </ul>

      <h2 id="feature-modules" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Feature Modules
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        The <code>CatsController</code> and <code>CatsService</code> belong to the same application domain. 
        As they are closely related, it makes sense to move them into a feature module. Feature modules 
        simply organize code relevant for a specific feature, keeping code organized and establishing clear boundaries.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats/cats.module.ts"
        code={`import { Module } from '@framework/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}`}
      />

      <h2 id="shared-modules" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Shared Modules
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        In Framework, modules are <strong>singletons</strong> by default, and thus you can share the exact same 
        instance of any provider between multiple modules effortlessly.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats/cats.module.ts"
        code={`import { Module } from '@framework/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}`}
      />

      <p className="text-foreground/80 leading-relaxed mb-6">
        Now any module that imports the <code>CatsModule</code> has access to the <code>CatsService</code> 
        and will share the same instance with all other modules that import it as well.
      </p>

      <h2 id="dynamic-modules" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Dynamic Modules
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        The Framework module system includes a powerful feature called <strong>dynamic modules</strong>. 
        This feature enables you to easily create customizable modules that can register and configure 
        providers dynamically.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="database/database.module.ts"
        code={`import { Module, DynamicModule } from '@framework/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
  exports: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}`}
      />
    </div>
  );
}
