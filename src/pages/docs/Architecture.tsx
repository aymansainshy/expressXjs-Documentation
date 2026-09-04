import { useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Box,
  Braces,
  Database,
  FileJson2,
  GitBranch,
  PackageSearch,
  Route,
  Server,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  Article,
  BulletList,
  Callout,
  CodeBlock,
  InlineCode,
  Section,
} from '@/components/docs/Article';

type ArchitectureNodeProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  detail: string;
  tone?: 'brand' | 'blue' | 'violet' | 'amber';
};

const toneClasses = {
  brand: 'border-brand-primary/30 bg-brand-primary/10 text-brand-primary',
  blue: 'border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400',
  violet: 'border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
};

function ArchitectureNode({ icon: Icon, title, detail, tone = 'brand' }: ArchitectureNodeProps) {
  return (
    <div className={`min-w-0 rounded-xl border p-3 shadow-sm sm:p-4 ${toneClasses[tone]}`}>
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background/80 shadow-sm">
          <Icon className="h-4 w-4" />
        </span>
        <span>{title}</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}

function Connector({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  return direction === 'right' ? (
    <ArrowRight className="mx-auto hidden h-5 w-5 shrink-0 text-brand-primary lg:block" aria-hidden="true" />
  ) : (
    <ArrowDown className="mx-auto h-5 w-5 text-brand-primary" aria-hidden="true" />
  );
}

const bootstrapStages = [
  {
    label: 'Discover',
    owner: 'Kernel + Scanner',
    detail: 'Choose TypeScript or JavaScript mode, load the matching cache, and import every tracked decorator module.',
  },
  {
    label: 'Resolve',
    owner: 'DI container',
    detail: 'Resolve the one @Application singleton and the controller, interceptor, middleware, guard, and exception-handler classes it references.',
  },
  {
    label: 'Prepare',
    owner: 'Application hooks',
    detail: 'Run preInit(), then expose the restricted onInit() wrapper for ordinary Express middleware such as body parsers.',
  },
  {
    label: 'Route',
    owner: 'AppRouter',
    detail: 'Read decorator metadata once, sort the request pipeline, bind controller methods, and mount the generated Express router.',
  },
  {
    label: 'Protect',
    owner: 'Factory',
    detail: 'Mount not-found and fallback error middleware, lock further app.use() calls, and run postInit().',
  },
  {
    label: 'Listen',
    owner: 'Your bootstrap',
    detail: 'ExpressX returns the decorated Express app; application code attaches it to a Node HTTP server and chooses the port.',
  },
] as const;

function BootstrapExplorer() {
  const [activeStage, setActiveStage] = useState(0);
  const selected = bootstrapStages[activeStage];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted/20">
      <div className="grid grid-cols-2 gap-2 border-b border-border p-3 sm:grid-cols-3 lg:grid-cols-6">
        {bootstrapStages.map((stage, index) => (
          <button
            key={stage.label}
            type="button"
            onClick={() => setActiveStage(index)}
            className={`rounded-lg px-3 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
              activeStage === index
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
            aria-pressed={activeStage === index}
          >
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] opacity-70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="mt-1 block text-sm font-semibold">{stage.label}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-[160px_1fr] sm:items-start sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary">Owned by</p>
          <p className="mt-1 font-semibold text-foreground">{selected.owner}</p>
        </div>
        <p className="leading-7 text-foreground/80">{selected.detail}</p>
      </div>
    </div>
  );
}

const requestSteps = [
  { label: 'Global interceptors', note: 'wrap all route work', tone: 'violet' },
  { label: 'Guards + middleware', note: 'one ascending-priority list', tone: 'amber' },
  { label: 'Route interceptors', note: 'sorted, then nested', tone: 'blue' },
  { label: 'Parameter resolver', note: '@Param / @Body / @Ctx / @Next', tone: 'brand' },
  { label: 'Controller method', note: 'plain value or response object', tone: 'brand' },
] as const;

const requestStepWidths = [
  'sm:max-w-full',
  'sm:max-w-[92%]',
  'sm:max-w-[84%]',
  'sm:max-w-[76%]',
  'sm:max-w-[68%]',
] as const;

export function Architecture() {
  return (
    <Article
      eyebrow="ExpressX.js architecture · Core 0.0.6"
      title="How ExpressX.js works"
      description="A source-backed map of the discovery plane, bootstrap sequence, dependency container, generated router, request pipeline, and Express runtime underneath the framework."
      previous={{ title: 'Application & lifecycle', href: '/docs/core/application' }}
      next={{ title: 'Auto-configuration & cache', href: '/docs/core/auto-configuration-cache' }}
    >
      <Section id="two-planes" title="The architecture in one view">
        <p>
          ExpressX.js has two cooperating planes. The <strong>discovery plane</strong> turns decorated files into a compact manifest. The <strong>runtime plane</strong> imports that manifest, lets decorators populate metadata and DI registrations, and compiles those registrations into an Express router.
        </p>

        <div className="my-7 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
          <div className="border-b border-border bg-muted/40 px-4 py-3 sm:px-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">Discovery plane · before routing exists</p>
          </div>
          <div className="grid items-stretch gap-3 p-3 sm:p-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <ArchitectureNode icon={Braces} title="Decorated source" detail="Application, controllers, and global components declare intent in TypeScript." tone="blue" />
            <Connector />
            <ArchitectureNode icon={PackageSearch} title="AST scanner" detail="Finds canonical decorator syntax and ExpressX import aliases without matching comments or strings." tone="violet" />
            <Connector />
            <ArchitectureNode icon={FileJson2} title="Discovery manifest" detail="sourceDir/.expressx/cache.json stores the exact modules Core must import." tone="amber" />
          </div>

          <div className="flex items-start gap-3 border-y border-border bg-brand-primary/[0.04] px-4 py-3 text-xs text-muted-foreground sm:items-center sm:px-5">
            <ArrowDown className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
            Module imports execute decorators; decorators populate the runtime registries.
          </div>

          <div className="border-b border-border bg-muted/40 px-4 py-3 sm:px-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">Runtime plane · one process</p>
          </div>
          <div className="grid items-stretch gap-3 p-3 sm:p-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            <ArchitectureNode icon={Database} title="DI + registries" detail="Application token, controller list, global handlers, and constructor providers." tone="violet" />
            <Connector />
            <ArchitectureNode icon={Workflow} title="ExpressXFactory" detail="Runs hooks and coordinates Kernel, AppRouter, 404, and error handling." />
            <Connector />
            <ArchitectureNode icon={Route} title="Generated router" detail="Precomputes metadata and resolves route pipeline components through DI." tone="blue" />
            <Connector />
            <ArchitectureNode icon={Server} title="Express 5 app" detail="Returned to your bootstrap and served by the native Node HTTP server." tone="amber" />
          </div>
        </div>

        <Callout type="info" title="Express remains the runtime">
          ExpressX does not replace Express request handling. It produces and returns an Express application marked with <InlineCode>framework: 'ExpressXjs'</InlineCode> and the installed <InlineCode>expressXVersion</InlineCode>. Your code still owns the HTTP server, listening address, and surrounding Node process.
        </Callout>
      </Section>

      <Section id="bootstrap-sequence" title="Bootstrap sequence">
        <p>Select a stage to see what happens between <InlineCode>ExpressXFactory.createApp()</InlineCode> and the returned Express application.</p>
        <BootstrapExplorer />
        <CodeBlock language="text" code={`createApp()
  └─ Kernel.start()
       ├─ ExpressXScanner.performScanning()
       │    └─ load cache → import modules → execute decorators
       └─ express() + runtime markers
  ├─ resolve @Application singleton
  ├─ await preInit()
  ├─ await onInit(restrictedApp)
  ├─ AppRouter.getRouter()
  ├─ mount router → 404 → fallback error handler
  ├─ lock app.use()
  └─ postInit(app) → return app`} />
        <p>
          The order is intentional: ordinary middleware registered in <InlineCode>onInit()</InlineCode> sits before generated routes, while <InlineCode>postInit()</InlineCode> sees the final application after route registration has been locked.
        </p>
      </Section>

      <Section id="metadata-to-router" title="From decorator metadata to a router">
        <div className="grid gap-4 md:grid-cols-3">
          <ArchitectureNode icon={Sparkles} title="1 · Decorate" detail="Class, method, and parameter decorators attach Reflect metadata or register a class." tone="violet" />
          <ArchitectureNode icon={Box} title="2 · Resolve" detail="AppRouter asks the shared tsyringe container for controllers and pipeline classes." tone="blue" />
          <ArchitectureNode icon={GitBranch} title="3 · Compile" detail="Metadata is read and sorted once while routes are registered, not on every request." tone="amber" />
        </div>
        <BulletList>
          <li><InlineCode>@Controller()</InlineCode> stores a base path and adds the controller class to <InlineCode>ControllerRegistry</InlineCode>.</li>
          <li>HTTP method decorators append method, path, and handler-name metadata.</li>
          <li>Guards and middleware are merged into one ascending-priority list; route interceptors are sorted separately.</li>
          <li>Parameter and status-code metadata are captured once in the route closure.</li>
          <li>All controllers and route pipeline classes are resolved through the shared container in 0.0.6.</li>
        </BulletList>
      </Section>

      <Section id="request-flow" title="Request execution flow">
        <p>For every matched request, control moves inward through wrappers, reaches the controller, then returns outward through the same interceptor layers before JSON serialization.</p>
        <div className="my-7 rounded-2xl border border-border bg-muted/20 p-4 sm:p-6">
          <div className="mb-5 flex flex-col items-start justify-between gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:items-center sm:gap-3">
            <span>Request enters</span>
            <span className="flex items-center gap-2 text-brand-primary">Response exits <ArrowRight className="h-4 w-4" /></span>
          </div>
          <div className="space-y-2">
            {requestSteps.map((step, index) => (
              <div
                key={step.label}
                className={`w-full rounded-xl border p-3 ${toneClasses[step.tone]} ${requestStepWidths[index]} ${index > 0 ? 'sm:mx-auto' : ''}`}
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <span className="font-semibold text-foreground">{step.label}</span>
                  <span className="text-xs text-muted-foreground">{step.note}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-3 flex max-w-md items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-center text-sm font-semibold text-background shadow-sm">
            <Zap className="h-4 w-4 shrink-0" /> Serialize with HttpResponseHandler
          </div>
        </div>
        <Callout type="tip" title="Errors travel through the same composition model">
          With a global exception handler, controller errors become response values inside the route-interceptor chain. Guard, middleware, and route-interceptor failures are resolved before returning through global interceptors. Unresolved failures are delegated to the mounted Express error middleware.
        </Callout>
      </Section>

      <Section id="development-loop" title="Development and production paths">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400"><SquareTerminal className="h-5 w-5" /></span>
              <div><p className="font-semibold text-foreground">Development</p><p className="text-xs text-muted-foreground">expressx dev</p></div>
            </div>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p>Watch TypeScript → inspect changed file → update source cache → restart child process.</p>
              <p>Missing or invalid source cache → full AST scan → atomic cache write → imports.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400"><ShieldCheck className="h-5 w-5" /></span>
              <div><p className="font-semibold text-foreground">Production</p><p className="text-xs text-muted-foreground">expressx build → tsc → node</p></div>
            </div>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p>Full source scan → map TypeScript extensions and paths → write output cache → compile.</p>
              <p>Startup imports the valid production manifest; it does not scan as a fallback.</p>
            </div>
          </div>
        </div>
        <p>
          This is why <InlineCode>.expressx/cache.json</InlineCode> is architectural, not incidental. It is the handoff between source discovery and runtime registration. Read the detailed <Link className="text-brand-primary hover:underline" to="/docs/core/auto-configuration-cache">Auto-configuration & cache guide</Link> for its schema, lifecycle, and recovery rules.
        </p>
      </Section>
    </Article>
  );
}
