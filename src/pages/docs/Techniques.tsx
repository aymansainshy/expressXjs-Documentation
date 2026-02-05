import { CodeBlock } from '@/components/ui-custom/CodeBlock';

export function Database() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="database" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Database
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Framework provides tight integration with TypeORM, Prisma, and other popular ORMs. This allows you to 
        easily work with databases in your applications.
      </p>

      <h2 id="typeorm-integration" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        TypeORM Integration
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        First, install the required dependencies:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ npm install @framework/typeorm typeorm pg`}
      />

      <p className="text-foreground/80 leading-relaxed mb-6">
        Once the installation process is complete, we can import the <code>TypeOrmModule</code> into the root 
        <code>AppModule</code>.
      </p>

      <CodeBlock 
        language="typescript" 
        filename="app.module.ts"
        code={`import { Module } from '@framework/common';
import { TypeOrmModule } from '@framework/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'mydb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}`}
      />

      <h2 id="entity-definition" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Entity Definition
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="user.entity.ts"
        code={`import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}`}
      />

      <h2 id="repository-pattern" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Repository Pattern
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="users.service.ts"
        code={`import { Injectable } from '@framework/common';
import { InjectRepository } from '@framework/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}`}
      />

      <h2 id="prisma-integration" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Prisma Integration
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Framework also works seamlessly with Prisma:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ npm install @framework/prisma prisma`}
      />

      <CodeBlock 
        language="typescript" 
        filename="prisma.service.ts"
        code={`import { Injectable, OnModuleInit } from '@framework/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}`}
      />
    </div>
  );
}

export function Validation() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="validation" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Validation
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Framework provides built-in support for request validation using <code>class-validator</code> and 
        <code>class-transformer</code>. This allows you to validate incoming data using decorators on your DTO classes.
      </p>

      <h2 id="installation" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Installation
      </h2>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ npm install class-validator class-transformer`}
      />

      <h2 id="creating-dto" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Creating a DTO
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="create-user.dto.ts"
        code={`import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString({ each: true })
  roles: string[];
}`}
      />

      <h2 id="validation-pipe" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Using ValidationPipe
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`import { ValidationPipe } from '@framework/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}`}
      />

      <h2 id="available-validators" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Available Validators
      </h2>

      <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-6">
        <li><code>@IsString()</code> - Checks if the value is a string</li>
        <li><code>@IsNumber()</code> - Checks if the value is a number</li>
        <li><code>@IsBoolean()</code> - Checks if the value is a boolean</li>
        <li><code>@IsEmail()</code> - Checks if the value is an email</li>
        <li><code>@IsUrl()</code> - Checks if the value is a URL</li>
        <li><code>@IsDate()</code> - Checks if the value is a date</li>
        <li><code>@IsArray()</code> - Checks if the value is an array</li>
        <li><code>@IsNotEmpty()</code> - Checks if the value is not empty</li>
        <li><code>@MinLength()</code> - Checks if the string length is greater than or equal to the given number</li>
        <li><code>@MaxLength()</code> - Checks if the string length is less than or equal to the given number</li>
        <li><code>@Min()</code> - Checks if the number is greater than or equal to the given number</li>
        <li><code>@Max()</code> - Checks if the number is less than or equal to the given number</li>
      </ul>

      <h2 id="custom-validation" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Custom Validation
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="is-unique.validator.ts"
        code={`import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@framework/common';

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(email: string, args: ValidationArguments) {
    const user = await this.usersService.findByEmail(email);
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email already exists';
  }
}`}
      />
    </div>
  );
}

export function Configuration() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="configuration" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Configuration
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Framework provides a <code>ConfigModule</code> that allows you to manage application configuration 
        from environment variables, configuration files, or other sources.
      </p>

      <h2 id="installation" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Installation
      </h2>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ npm install @framework/config`}
      />

      <h2 id="basic-setup" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Basic Setup
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="app.module.ts"
        code={`import { Module } from '@framework/common';
import { ConfigModule } from '@framework/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}`}
      />

      <h2 id="config-service" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Using ConfigService
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="app.service.ts"
        code={`import { Injectable } from '@framework/common';
import { ConfigService } from '@framework/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST', 'localhost');
  }

  getPort(): number {
    return this.configService.get<number>('PORT', 3000);
  }
}`}
      />

      <h2 id="custom-config" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Custom Configuration Files
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="config/database.config.ts"
        code={`export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'user',
    password: process.env.DATABASE_PASSWORD || 'password',
    name: process.env.DATABASE_NAME || 'mydb',
  },
});`}
      />

      <CodeBlock 
        language="typescript" 
        filename="app.module.ts"
        code={`import { Module } from '@framework/common';
import { ConfigModule } from '@framework/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
})
export class AppModule {}`}
      />

      <h2 id="env-variables" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Environment Variables
      </h2>

      <CodeBlock 
        language="bash" 
        filename=".env"
        code={`DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=myuser
DATABASE_PASSWORD=mypassword
DATABASE_NAME=mydb
JWT_SECRET=mysecretkey
PORT=3000`}
      />

      <h2 id="schema-validation" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Schema Validation
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="app.module.ts"
        code={`import { Module } from '@framework/common';
import { ConfigModule } from '@framework/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
  ],
})
export class AppModule {}`}
      />
    </div>
  );
}

export function Testing() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="testing" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Testing
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Framework provides a testing module that allows you to easily write unit and end-to-end tests for your 
        application. The testing utilities make it easy to mock dependencies and test your controllers, services, and more.
      </p>

      <h2 id="unit-testing" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Unit Testing
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Let&apos;s start by writing a unit test for the <code>CatsService</code>:
      </p>

      <CodeBlock 
        language="typescript" 
        filename="cats.service.spec.ts"
        code={`import { Test, TestingModule } from '@framework/testing';
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

  describe('create', () => {
    it('should create a cat', () => {
      const cat = { name: 'Whiskers', age: 2 };
      service.create(cat);
      expect(service.findAll()).toContain(cat);
    });
  });

  describe('findAll', () => {
    it('should return an array of cats', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
});`}
      />

      <h2 id="controller-testing" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Controller Testing
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.spec.ts"
        code={`import { Test, TestingModule } from '@framework/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({ id: 1, name: 'Whiskers' }),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});`}
      />

      <h2 id="e2e-testing" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        E2E Testing
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="app.e2e-spec.ts"
        code={`import { Test, TestingModule } from '@framework/testing';
import { INestApplication } from '@framework/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});`}
      />

      <h2 id="running-tests" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Running Tests
      </h2>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`# Run all tests
$ npm test

# Run tests in watch mode
$ npm test -- --watch

# Run tests with coverage
$ npm test -- --coverage

# Run e2e tests
$ npm run test:e2e`}
      />
    </div>
  );
}
