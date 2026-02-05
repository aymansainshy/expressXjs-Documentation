import { CodeBlock } from '@/components/ui-custom/CodeBlock';

export function Authentication() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="authentication" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Authentication
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Authentication is the process of verifying the identity of a user. Framework provides Passport 
        integration for implementing various authentication strategies including JWT, OAuth, and local authentication.
      </p>

      <h2 id="installation" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Installation
      </h2>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ npm install @framework/passport @framework/jwt passport passport-local passport-jwt
$ npm install --save-dev @types/passport-jwt`}
      />

      <h2 id="jwt-setup" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        JWT Authentication Setup
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="auth.module.ts"
        code={`import { Module } from '@framework/common';
import { JwtModule } from '@framework/jwt';
import { PassportModule } from '@framework/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}`}
      />

      <h2 id="jwt-strategy" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        JWT Strategy
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="jwt.strategy.ts"
        code={`import { Injectable } from '@framework/common';
import { PassportStrategy } from '@framework/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}`}
      />

      <h2 id="auth-service" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Auth Service
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="auth.service.ts"
        code={`import { Injectable, UnauthorizedException } from '@framework/common';
import { JwtService } from '@framework/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}`}
      />

      <h2 id="protected-routes" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Protected Routes
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="app.controller.ts"
        code={`import { Controller, Get, UseGuards, Request } from '@framework/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}`}
      />

      <h2 id="login-endpoint" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Login Endpoint
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="auth.controller.ts"
        code={`import { Controller, Post, Body, UnauthorizedException } from '@framework/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}`}
      />
    </div>
  );
}

export function Authorization() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="authorization" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Authorization
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Authorization is the process of determining what actions a user is allowed to perform. 
        Framework provides guards and decorators for implementing role-based access control (RBAC).
      </p>

      <h2 id="roles-decorator" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Roles Decorator
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="roles.decorator.ts"
        code={`import { SetMetadata } from '@framework/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);`}
      />

      <h2 id="roles-guard" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Roles Guard
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="roles.guard.ts"
        code={`import { Injectable, CanActivate, ExecutionContext } from '@framework/common';
import { Reflector } from '@framework/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}`}
      />

      <h2 id="using-roles" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Using Roles
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="admin.controller.ts"
        code={`import { Controller, Get, UseGuards } from '@framework/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get('users')
  @Roles('admin')
  getAllUsers() {
    return [];
  }

  @Get('settings')
  @Roles('admin', 'moderator')
  getSettings() {
    return {};
  }
}`}
      />

      <h2 id="permission-based" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Permission-based Authorization
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="permissions.guard.ts"
        code={`import { Injectable, CanActivate, ExecutionContext } from '@framework/common';
import { Reflector } from '@framework/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    
    if (!requiredPermissions) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredPermissions.every((permission) =>
      user.permissions?.includes(permission),
    );
  }
}`}
      />
    </div>
  );
}

export function CORS() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="cors" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        CORS
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Cross-Origin Resource Sharing (CORS) is a mechanism that allows restricted resources on a web page 
        to be requested from another domain outside the domain from which the first resource was served.
      </p>

      <h2 id="enabling-cors" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Enabling CORS
      </h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        To enable CORS, call the <code>enableCors()</code> method on the application instance:
      </p>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(3000);`}
      />

      <h2 id="cors-config" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        CORS Configuration
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: 'https://example.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
await app.listen(3000);`}
      />

      <h2 id="multiple-origins" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Multiple Origins
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: ['https://example.com', 'https://app.example.com'],
  credentials: true,
});
await app.listen(3000);`}
      />

      <h2 id="dynamic-origin" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Dynamic Origin Validation
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://example.com', 'https://app.example.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});
await app.listen(3000);`}
      />

      <h2 id="async-config" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Async Configuration
      </h2>

      <CodeBlock 
        language="typescript" 
        filename="main.ts"
        code={`const app = await NestFactory.create(AppModule, {
  cors: {
    origin: true,
    credentials: true,
  },
});
await app.listen(3000);`}
      />
    </div>
  );
}
