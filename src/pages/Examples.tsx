import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const examples = [
  {
    title: 'REST API',
    description: 'A complete REST API example with CRUD operations, validation, and authentication.',
    tags: ['TypeScript', 'TypeORM', 'JWT'],
    code: `// Simple REST API controller
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}`,
  },
  {
    title: 'GraphQL API',
    description: 'Build a GraphQL API with resolvers, mutations, and subscriptions.',
    tags: ['GraphQL', 'TypeScript', 'Prisma'],
    code: `@Resolver(() => User)
export class UsersResolver {
  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }
}`,
  },
  {
    title: 'WebSocket Chat',
    description: 'Real-time chat application using WebSockets.',
    tags: ['WebSockets', 'Socket.io', 'Redis'],
    code: `@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string) {
    this.server.emit('message', {
      sender: client.id,
      content: payload,
    });
  }
}`,
  },
  {
    title: 'Microservices',
    description: 'Distributed system with multiple microservices.',
    tags: ['Microservices', 'Kafka', 'gRPC'],
    code: `@Controller()
export class AppController {
  @MessagePattern('get_user')
  async getUser(@Payload() id: string) {
    return this.usersService.findOne(id);
  }
}`,
  },
  {
    title: 'Authentication',
    description: 'Complete authentication system with JWT and social login.',
    tags: ['Passport', 'JWT', 'OAuth'],
    code: `@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}`,
  },
  {
    title: 'File Upload',
    description: 'Handle file uploads with validation and storage.',
    tags: ['Multer', 'S3', 'Validation'],
    code: `@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return { filename: file.filename };
}`,
  },
];

const starterKits = [
  {
    name: 'Basic Starter',
    description: 'Minimal setup with TypeScript and Express',
    url: 'https://github.com/framework/starter-basic',
  },
  {
    name: 'Full Stack Starter',
    description: 'Framework backend with React frontend',
    url: 'https://github.com/framework/starter-fullstack',
  },
  {
    name: 'GraphQL Starter',
    description: 'Framework with GraphQL and Prisma',
    url: 'https://github.com/framework/starter-graphql',
  },
  {
    name: 'Microservices Starter',
    description: 'Framework with microservices architecture',
    url: 'https://github.com/framework/starter-microservices',
  },
];

export function Examples() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
              Examples & Starters
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Learn Framework by exploring our collection of examples and starter kits. 
              From simple REST APIs to complex microservices, find the perfect starting point for your project.
            </p>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8">Code Examples</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {examples.map((example) => (
              <div
                key={example.title}
                className="bg-background rounded-xl border border-border overflow-hidden hover:border-brand-primary/50 transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                      <p className="text-muted-foreground text-sm">{example.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="rounded-lg overflow-hidden" style={{ background: '#1E1E1E' }}>
                    <pre className="p-4 text-xs overflow-x-auto">
                      <code style={{ color: '#D4D4D4', fontFamily: "'Fira Code', monospace" }}>
                        {example.code}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-brand-primary hover:underline"
                  >
                    View Full Example
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Kits */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8">Starter Kits</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {starterKits.map((kit) => (
              <a
                key={kit.name}
                href={kit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl border border-border bg-background hover:border-brand-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-primary transition-colors">
                      {kit.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{kit.description}</p>
                  </div>
                  <Github className="w-5 h-5 text-muted-foreground group-hover:text-brand-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Want to contribute an example?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We welcome community contributions! If you have a great example or starter kit, 
              share it with the community.
            </p>
            <a
              href="https://github.com/framework/examples"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2">
                <Github className="w-4 h-4" />
                Contribute on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
