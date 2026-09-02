import {
  Article,
  BulletList,
  Callout,
  CodeBlock,
  CommandTable,
  InlineCode,
  ReferenceTable,
  Section,
  Subsection,
} from '@/components/docs/Article';

export function CLIOverview() {
  return (
    <Article
      eyebrow="ExpressX.js CLI"
      title="CLI overview"
      description="The expressx command creates projects, runs a TypeScript development server, generates components, and prepares discovery data for production builds."
      previous={{ title: 'Discovery & configuration', href: '/docs/core/discovery-configuration' }}
      next={{ title: 'CLI commands', href: '/docs/cli/commands' }}
    >
      <Section id="installation" title="Installation">
        <CodeBlock language="bash" code={`# One-off use
npx @expressxjs/cli new my-api

# Project-local (recommended for dev/build)
npm install --save-dev @expressxjs/cli
npx expressx --help

# Global
npm install --global @expressxjs/cli
expressx --version`} />
        <p>The binary name is <InlineCode>expressx</InlineCode>. The package and Core source reviewed for these docs are version 0.0.5.</p>
      </Section>

      <Section id="command-map" title="Command map">
        <CommandTable rows={[
          { command: 'expressx new <name>', purpose: 'Create a project.', result: 'Writes a selected template, optionally initializes Git, and optionally installs dependencies.' },
          { command: 'expressx dev', purpose: 'Run TypeScript with hot reload.', result: 'Maintains the development discovery cache, starts a child Node process, and restarts it after source changes.' },
          { command: 'expressx start', purpose: 'Alias of dev.', result: 'Runs the same development watcher; it is not the production command.' },
          { command: 'expressx generate <type> <name> [path]', purpose: 'Generate source files.', result: 'Writes one component or a controller/service/DTO resource under sourceDir.' },
          { command: 'expressx g …', purpose: 'Alias of generate.', result: 'Identical generation behavior.' },
          { command: 'expressx build', purpose: 'Prepare discovery caches.', result: 'Writes development and production cache JSON; does not compile TypeScript.' },
          { command: 'expressx help [command]', purpose: 'Print help.', result: 'Shows top-level or command-specific help.' },
        ]} />
      </Section>

      <Section id="project-contract" title="CLI project contract">
        <p><InlineCode>dev</InlineCode> and <InlineCode>generate</InlineCode> verify that the current directory contains <InlineCode>package.json</InlineCode> and declares <InlineCode>@expressxjs/core</InlineCode> in dependencies or devDependencies. Generation and scanning require <InlineCode>expressx.sourceDir</InlineCode>. Development entrypoint resolution uses:</p>
        <ol className="ml-5 list-decimal space-y-2 marker:text-brand-primary">
          <li><InlineCode>expressx.main</InlineCode>, preferring a same-path <InlineCode>.ts</InlineCode> file over a configured JS extension.</li>
          <li><InlineCode>src/main.ts</InlineCode>.</li>
          <li><InlineCode>src/index.ts</InlineCode>.</li>
          <li><InlineCode>main.ts</InlineCode>.</li>
          <li><InlineCode>index.ts</InlineCode>.</li>
        </ol>
      </Section>

      <Section id="development-server" title="What the development server does">
        <BulletList>
          <li>Loads or creates <InlineCode>src/.expressx/cache.json</InlineCode>.</li>
          <li>Checks cached file metadata and removes deleted or no-longer-decorated files.</li>
          <li>Watches TypeScript files below <InlineCode>sourceDir</InlineCode>, excluding tests, builds, dependencies, Git, and cache folders.</li>
          <li>Debounces changes for 300 ms, sends <InlineCode>SIGTERM</InlineCode> to the child, then starts it again.</li>
          <li>Launches Node with <InlineCode>--require @expressxjs/core/runtime</InlineCode> and <InlineCode>--enable-source-maps</InlineCode>.</li>
          <li>Sets <InlineCode>EXPRESSX_RUNTIME=ts</InlineCode> and defaults <InlineCode>NODE_ENV</InlineCode> to <InlineCode>development</InlineCode>.</li>
          <li>Closes watchers and the child on <InlineCode>SIGINT</InlineCode>/<InlineCode>SIGTERM</InlineCode>.</li>
        </BulletList>
      </Section>

      <Section id="production-command" title="Production is npm start, not expressx start">
        <Callout type="warning" title="Alias naming">
          <InlineCode>expressx start</InlineCode> is an alias for the hot-reloading development command. A production process should execute compiled JavaScript directly, for example <InlineCode>node dist/index.js</InlineCode> through the generated <InlineCode>npm start</InlineCode> script.
        </Callout>
      </Section>
    </Article>
  );
}

export function CLICommands() {
  return (
    <Article
      eyebrow="ExpressX.js CLI"
      title="CLI commands"
      description="Complete syntax, arguments, options, examples, and output behavior for every command implemented in version 0.0.5."
      previous={{ title: 'CLI overview', href: '/docs/cli' }}
      next={{ title: 'Generators', href: '/docs/cli/generators' }}
    >
      <Section id="new" title="new / create">
        <CodeBlock language="text" code={`expressx new <project-name> [options]
expressx create <project-name> [options]

-t, --template <template>   default | api | full (default: full)
    --skip-install          Do not run npm install
    --skip-git              Do not run git init`} />
        <p><InlineCode>project-name</InlineCode> must be a non-empty relative path inside the current directory, and the target must not already exist. The directory basename is converted to a lowercase kebab-case package name.</p>
        <ReferenceTable rows={[
          { name: 'default', signature: 'template', description: 'Application, HTTP entrypoint, and users controller/service/DTO CRUD resource.', notes: 'Leanest generated template.' },
          { name: 'api', signature: 'template', description: 'Default plus a global exception handler.', notes: 'Useful baseline for REST APIs.' },
          { name: 'full', signature: 'template (default)', description: 'API plus API-key guard, route logger, timing interceptor, and global response envelope interceptor.', notes: 'Demonstrates the entire implemented pipeline.' },
        ]} />
        <CodeBlock language="bash" code={`expressx new my-api
expressx new my-api --template api
expressx new my-api -t default --skip-install --skip-git`} />
        <p>The command writes <InlineCode>package.json</InlineCode>, <InlineCode>tsconfig.json</InlineCode>, ignore/environment files, source, and a project README. Setup command failures are warnings: the project is still written and npm/Git can be run manually.</p>
      </Section>

      <Section id="dev" title="dev / start">
        <CodeBlock language="text" code={`expressx dev [node-flags] [application-flags]
expressx start [node-flags] [application-flags]`} />
        <p>The command allows unknown options so it can separate recognized Node/V8 flags from application flags. Node flags are inserted before the entrypoint; other flags are appended after it and are available in <InlineCode>process.argv</InlineCode>.</p>
        <Subsection id="node-flags" title="Common Node flags">
          <CodeBlock language="bash" code={`expressx dev --inspect
expressx dev --inspect-brk=127.0.0.1:9230
expressx dev --max-old-space-size=4096
expressx dev --trace-warnings --cpu-prof`} />
          <p>The classifier contains a broad list of inspector, memory, tracing, profiling, TLS, diagnostics, module-loader, source-map, and experimental flags. For flags that take a separate value, only a known subset consumes the following argument as a Node value; the <InlineCode>--flag=value</InlineCode> form is the least ambiguous.</p>
        </Subsection>
        <Subsection id="app-flags" title="Application flags">
          <CodeBlock language="bash" code={`expressx dev --port 4000 --env staging --verbose`} />
          <p>The CLI does not interpret <InlineCode>--port</InlineCode>, <InlineCode>--host</InlineCode>, <InlineCode>--env</InlineCode>, <InlineCode>--workers</InlineCode>, <InlineCode>--verbose</InlineCode>, or other application flags. Your entrypoint must parse them. The generated entrypoint recognizes <InlineCode>--port</InlineCode>/<InlineCode>-p</InlineCode>.</p>
        </Subsection>
      </Section>

      <Section id="generate" title="generate / g">
        <CodeBlock language="text" code={`expressx generate <type> <name> [path] [options]
expressx g <type> <name> [path] [options]

-d, --dry-run   Preview paths/content without writing
-f, --force     Overwrite existing generated targets`} />
        <p>The optional path is resolved from the project root and must stay inside it. Without a path, the CLI uses a conventional folder under <InlineCode>sourceDir</InlineCode>. Existing files make the entire generation fail unless <InlineCode>--force</InlineCode> is supplied.</p>
        <CodeBlock language="bash" code={`expressx g controller Health
expressx g service Billing src/modules/billing
expressx g resource Product
expressx g guard Admin --dry-run
expressx g dto Product --force`} />
      </Section>

      <Section id="build" title="build">
        <CodeBlock language="text" code={`expressx build [options]

-o, --output <dir>   Rewrite cached compiled paths to this directory
    --minify          Print a minification configuration hint
    --sourcemap       Print a source-map configuration hint
    --verbose         Print scan/build details`} />
        <p>The command performs two tasks: a full development scan saved to <InlineCode>sourceDir/.expressx/cache.json</InlineCode>, then conversion of those TypeScript paths to JavaScript paths for a production cache. It does not invoke <InlineCode>tsc</InlineCode>, bundle, minify, or generate source maps.</p>
        <CodeBlock language="bash" code={`# Normal complete project build
expressx build && tsc

# Diagnostic detail
expressx build --verbose`} />
        <Callout type="warning" title="--output behavior in 0.0.5">
          The option changes paths recorded inside the production cache and the printed summary, but <InlineCode>saveCache(false)</InlineCode> still writes the cache directory under configured <InlineCode>expressx.outDir</InlineCode>. Keep <InlineCode>--output</InlineCode>, <InlineCode>expressx.outDir</InlineCode>, and <InlineCode>compilerOptions.outDir</InlineCode> identical; changing package/tsconfig values is safer than relying on the flag alone.
        </Callout>
      </Section>

      <Section id="help-version" title="help and version">
        <CodeBlock language="bash" code={`expressx --help
expressx help generate
expressx --version`} />
        <p><InlineCode>help [command]</InlineCode> prints command help; an unknown help target logs an error and falls back to top-level help. Commander supplies <InlineCode>--help</InlineCode> and <InlineCode>--version</InlineCode>.</p>
      </Section>
    </Article>
  );
}

export function Generators() {
  return (
    <Article
      eyebrow="ExpressX.js CLI"
      title="Generators"
      description="Generate individual pipeline/application classes or a complete feature-first CRUD resource with consistent class, file, and route naming."
      previous={{ title: 'CLI commands', href: '/docs/cli/commands' }}
      next={{ title: 'Complete application', href: '/docs/examples/complete-application' }}
    >
      <Section id="types" title="Component types and aliases">
        <ReferenceTable rows={[
          { name: 'controller (c)', signature: 'src/controllers', description: 'Decorated controller with GET / and an empty list response.', notes: '<name>.controller.ts' },
          { name: 'service (s)', signature: 'src/services', description: 'Injectable class with findAll/findOne placeholders.', notes: '<name>.service.ts' },
          { name: 'middleware (m)', signature: 'src/middlewares', description: 'ExpressXMiddleware subclass with request logging.', notes: 'Generated source currently expects ExpressXLogger.' },
          { name: 'interceptor (i)', signature: 'src/interceptors', description: 'ExpressXInterceptor subclass that measures downstream time.', notes: 'Generated source currently expects ExpressXLogger.' },
          { name: 'guard (g)', signature: 'src/guards', description: 'Guard subclass checking the Authorization header.', notes: '<name>.guard.ts' },
          { name: 'exception (e)', signature: 'src/exceptions', description: 'Decorated global ExceptionHandler returning status 500.', notes: 'Alias exception-handler is also accepted.' },
          { name: 'dto', signature: 'src/dto', description: 'Create and Update TypeScript interfaces.', notes: '<name>.dto.ts' },
          { name: 'application (app)', signature: 'src', description: 'Decorated ExpressX lifecycle class.', notes: '<name>.application.ts' },
          { name: 'resource (r)', signature: 'src/modules/<plural>', description: 'Controller, service, and DTO implementing in-memory CRUD.', notes: 'Creates three files together.' },
        ]} />
      </Section>

      <Section id="naming" title="Naming rules">
        <p>Input names become PascalCase classes and kebab-case files. A matching type suffix is removed before being added once. Route names use a small English pluralizer:</p>
        <CodeBlock language="text" code={`user-profile  → UserProfileController → user-profile.controller.ts → /user-profiles
category      → CategoryController    → category.controller.ts     → /categories
box           → BoxController         → box.controller.ts          → /boxes`} />
      </Section>

      <Section id="resource" title="Resource output">
        <CodeBlock language="bash" code={`expressx generate resource Product`} />
        <CodeBlock language="text" code={`src/modules/products/
├── product.controller.ts
├── product.dto.ts
└── product.service.ts`} />
        <p>The generated controller injects the generated service and registers <InlineCode>GET /</InlineCode>, <InlineCode>GET /:id</InlineCode>, <InlineCode>POST /</InlineCode>, <InlineCode>PUT /:id</InlineCode>, and <InlineCode>DELETE /:id</InlineCode>. It uses <InlineCode>@Ctx()</InlineCode> for route parameters because <InlineCode>@Param</InlineCode> is not publicly exported.</p>
      </Section>

      <Section id="custom-path" title="Custom paths, preview, and overwrite">
        <CodeBlock language="bash" code={`# Path is relative to the project root
expressx g controller Invoice src/billing/http

# Inspect exactly what would be written
expressx g resource Invoice --dry-run

# Deliberately replace all target files
expressx g resource Invoice --force`} />
        <p>Generation refuses absolute paths and any path that resolves outside the project root. This also applies to paths containing <InlineCode>..</InlineCode>.</p>
      </Section>

      <Section id="registration" title="After generation">
        <BulletList>
          <li>Controllers are discovered automatically when their files contain <InlineCode>@Controller</InlineCode>.</li>
          <li>Generated services are imported by their resource controller. A standalone generated service must be imported by code that uses it.</li>
          <li>Standalone route middleware, guard, and interceptor classes must be imported and attached to a controller method.</li>
          <li>A generated exception handler is discovered from its class decorator.</li>
          <li>A second generated application will make bootstrap fail because only one <InlineCode>@Application</InlineCode> is allowed.</li>
        </BulletList>
      </Section>
    </Article>
  );
}
