import { CodeBlock } from '@/components/ui-custom/CodeBlock';

export function CRUD() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="crud-generator" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">CRUD Generator</h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        The CRUD generator is a powerful CLI feature that automatically generates all the necessary files 
        for a complete CRUD resource, including controller, service, DTOs, and entity.
      </p>

      <h2 id="generating-crud" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Generating a CRUD Resource</h2>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ framework generate resource users`}
      />

      <p className="text-foreground/80 leading-relaxed mb-6">
        This command will generate the following files:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Generated Files"
        code={`src/users/
├── dto/
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── entities/
│   └── user.entity.ts
├── users.controller.spec.ts
├── users.controller.ts
├── users.module.ts
├── users.service.spec.ts
└── users.service.ts`}
      />

      <h2 id="generated-controller" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Generated Controller</h2>

      <CodeBlock 
        language="typescript" 
        filename="users.controller.ts"
        code={`import { Controller, Get, Post, Body, Patch, Param, Delete } from '@framework/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}`}
      />

      <h2 id="generated-service" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Generated Service</h2>

      <CodeBlock 
        language="typescript" 
        filename="users.service.ts"
        code={`import { Injectable } from '@framework/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return \`This action returns all users\`;
  }

  findOne(id: number) {
    return \`This action returns a #\${id} user\`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return \`This action updates a #\${id} user\`;
  }

  remove(id: number) {
    return \`This action removes a #\${id} user\`;
  }
}`}
      />

      <h2 id="crud-options" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Options</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        You can customize the generated resource with various options:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`# Skip tests
$ framework g res users --no-spec

# Specify transport (for microservices)
$ framework g res users --transport kafka

# Generate with CRUD operations only
$ framework g res users --crud`}
      />
    </div>
  );
}

export function Swagger() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="swagger-openapi" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">Swagger/OpenAPI</h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Framework provides built-in support for OpenAPI (Swagger) documentation. You can automatically generate 
        API documentation from your controllers and DTOs.
      </p>

      <h2 id="swagger-installation" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Installation</h2>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ npm install @framework/swagger`}
      />

      <h2 id="basic-setup" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Basic Setup</h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`import { NestFactory } from '@framework/core';
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
bootstrap();`}
      />

      <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Documenting DTOs</h2>

      <CodeBlock 
        language="typescript" 
        filename="create-cat.dto.ts"
        code={`import { ApiProperty } from '@framework/swagger';

export class CreateCatDto {
  @ApiProperty({ example: 'Whiskers', description: 'The name of the cat' })
  name: string;

  @ApiProperty({ example: 2, description: 'The age of the cat' })
  age: number;

  @ApiProperty({ example: 'Persian', description: 'The breed of the cat' })
  breed: string;
}`}
      />

      <h2 id="documenting-controllers" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Documenting Controllers</h2>

      <CodeBlock 
        language="typescript" 
        filename="cats.controller.ts"
        code={`import { Controller, Get, Post, Body } from '@framework/common';
import { ApiTags, ApiOperation, ApiResponse } from '@framework/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 201, description: 'The cat has been successfully created.', type: Cat })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cats' })
  @ApiResponse({ status: 200, description: 'Return all cats.', type: [Cat] })
  findAll() {
    return this.catsService.findAll();
  }
}`}
      />

      <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Bearer Authentication</h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const config = new DocumentBuilder()
  .setTitle('Cats API')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();`}
      />

      <h2 id="accessing-swagger" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Accessing Swagger UI</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        After setting up Swagger, you can access the Swagger UI at:
      </p>

      <CodeBlock 
        language="bash" 
        filename="URL"
        code={`http://localhost:3000/api`}
      />
    </div>
  );
}

export function Deployment() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="deployment" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">Deployment</h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Deploying a Framework application is straightforward. You can deploy to various platforms including 
        Docker, AWS, Google Cloud, Heroku, and more.
      </p>

      <h2 id="docker-deployment" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Docker Deployment</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Create a Dockerfile in your project root:
      </p>

      <CodeBlock 
        language="dockerfile" 
        filename="Dockerfile"
        code={`# Build stage
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
CMD ["node", "dist/main"]`}
      />

      <p className="text-foreground/80 leading-relaxed mb-6">
        Build and run the Docker container:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`# Build the image
$ docker build -t my-framework-app .

# Run the container
$ docker run -p 3000:3000 my-framework-app`}
      />

      <h2 id="docker-compose" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Docker Compose</h2>

      <CodeBlock 
        language="yaml" 
        filename="docker-compose.yml"
        code={`version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`}
      />

      <h2 id="heroku-deployment" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Heroku Deployment</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Create a <code>Procfile</code> in your project root:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Procfile"
        code={`web: npm run start:prod`}
      />

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`# Login to Heroku
$ heroku login

# Create a new app
$ heroku create my-framework-app

# Deploy
$ git push heroku main`}
      />

      <h2 id="aws-deployment" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">AWS Deployment</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        For AWS deployment, you can use Elastic Beanstalk, ECS, or Lambda:
      </p>

      <CodeBlock 
        language="json" 
        filename="package.json"
        code={`{
  "scripts": {
    "start": "node dist/main",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "build": "nest build",
    "prestart:prod": "npm run build"
  }
}`}
      />

      <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Environment Variables</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Make sure to set your environment variables in production:
      </p>

      <CodeBlock 
        language="bash" 
        filename=".env.production"
        code={`NODE_ENV=production
PORT=3000
DATABASE_URL=your-production-database-url
JWT_SECRET=your-production-secret
REDIS_URL=your-redis-url`}
      />

      <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Health Checks</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Implement health checks for your deployment:
      </p>

      <CodeBlock 
        language="typescript" 
        filename="health.controller.ts"
        code={`import { Controller, Get } from '@framework/common';
import { HealthCheck, HealthCheckService } from '@framework/terminus';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}`}
      />
    </div>
  );
}
