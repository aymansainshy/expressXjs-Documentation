import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, KeyRound, Route, WandSparkles } from 'lucide-react';
import { CodeBlock } from '@/components/ui-custom/CodeBlock';
import { Button } from '@/components/ui/button';

const examples = [
  {
    icon: Route,
    title: 'Controller and response',
    description: 'Map a native Express route and return a typed 200 response.',
    code: `@Controller('/health')
export class HealthController {
  @GET('/')
  check() {
    return HttpResponse.ok({ status: 'ok' });
  }
}`,
  },
  {
    icon: Boxes,
    title: 'Service injection',
    description: 'Keep business logic in a singleton service and inject it into a controller.',
    code: `@Injectable()
export class UserService {}

@Controller('/users')
export class UserController {
  constructor(
    @Inject(UserService) private users: UserService,
  ) {}
}`,
  },
  {
    icon: KeyRound,
    title: 'Protected route',
    description: 'Compose authorization and request validation before a handler.',
    code: `@POST('/')
@UseGuards(ApiKeyGuard)
@UseMiddlewares(ValidateUserMiddleware)
create(@Body() input: CreateUserDto) {
  return HttpResponse.created(input);
}`,
  },
];

export function Examples() {
  return (
    <div className="min-h-screen pt-16">
      <section className="border-b border-border bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"><WandSparkles className="h-6 w-6" /></div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">ExpressX.js examples</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Small, source-accurate examples for the common building blocks, plus one complete application that shows how they fit together.</p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {examples.map((example) => (
            <article key={example.title} className="min-w-0 rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary"><example.icon className="h-5 w-5" /></div>
              <h2 className="mt-4 text-xl font-semibold">{example.title}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{example.description}</p>
              <CodeBlock language="typescript" code={example.code} />
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold">Build the complete users API</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Follow a full example with application lifecycle, controller discovery, DI, guard, validation middleware, response envelope, and global error handling.</p>
          </div>
          <Link className="w-full sm:w-auto" to="/docs/examples/complete-application">
            <Button className="w-full gap-2 sm:w-auto">Open the guide <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
