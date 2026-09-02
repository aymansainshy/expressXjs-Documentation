import {
  Article,
  BulletList,
  Callout,
  CodeBlock,
  Flow,
  InlineCode,
  ReferenceTable,
  Section,
  Subsection,
} from '@/components/docs/Article';

export function AutoConfigurationCache() {
  return (
    <Article
      title="Auto-configuration & cache"
      description="The .expressx/cache.json file is the persistent discovery index that lets ExpressX.js find and import decorated application components without a manual controller or provider registry."
      previous={{ title: 'Application & lifecycle', href: '/docs/core/application' }}
      next={{ title: 'Controllers & routing', href: '/docs/core/controllers-routing' }}
    >
      <Section id="core-idea" title="The core idea">
        <p>
          ExpressX.js auto-configuration is based on import side effects. A controller, application, global interceptor, or global exception handler registers itself when Node evaluates its decorated class. The framework therefore needs to know <em>which files to import before it builds the router</em>.
        </p>
        <p>
          <InlineCode>.expressx/cache.json</InlineCode> is that file index. It records the small set of source files that contain framework entry-point decorators. At bootstrap, Core imports those files; their decorators populate the application token, controller registry, global interceptor registry, exception-handler token, and DI registrations. The router can then be assembled automatically.
        </p>
        <Flow steps={['Scan source', 'Write cache index', 'Import cached files', 'Run decorators', 'Populate registries', 'Build router']} />
        <Callout type="info" title="Why this is auto-configuration">
          You do not maintain a central controllers array or module graph. A decorated class becomes configuration when its file is discovered and imported. The cache makes that discovery reusable and fast; a full scan is the bootstrap and recovery path when no valid cache exists.
        </Callout>
      </Section>

      <Section id="why-important" title="Why the cache is important">
        <BulletList>
          <li><strong>Correctness:</strong> a decorated file that is never imported cannot register its metadata, so its controller or global handler does not exist at runtime.</li>
          <li><strong>Startup speed:</strong> after a cache exists, Core imports the known decorator files instead of globbing and reading every project file on every restart.</li>
          <li><strong>Development feedback:</strong> the CLI updates cache membership when watched files gain, lose, or change an entry-point decorator, then restarts the child process.</li>
          <li><strong>Production mapping:</strong> the build command converts cached TypeScript source paths into compiled JavaScript paths below the output directory.</li>
          <li><strong>Convention without modules:</strong> controllers and global components are found by source structure and decorators rather than explicit framework registration code.</li>
        </BulletList>
        <p>The cache is generated framework state, not application source. Do not hand-edit it or use it to store business configuration.</p>
      </Section>

      <Section id="cache-shape" title="What cache.json contains">
        <CodeBlock filename="src/.expressx/cache.json" language="json" code={`{
  "version": "1.0.0",
  "decoratorFiles": [
    {
      "path": "src/application.ts",
      "mtime": 1788249000000,
      "size": 612
    },
    {
      "path": "src/users/user.controller.ts",
      "mtime": 1788249030000,
      "size": 1480
    }
  ],
  "totalScanned": 24,
  "generatedAt": "2026-09-02T05:30:30.000Z",
  "environment": "development"
}`} />
        <ReferenceTable rows={[
          { name: 'version', signature: 'string', description: 'Cache schema version checked by Core before loading.', notes: 'A mismatch invalidates the cache and triggers regeneration.' },
          { name: 'decoratorFiles', signature: 'CachedFileMetadata[]', description: 'Relative paths selected for import, with modification time and byte size.', notes: 'The optional hash field exists in the type but is not populated by the current scanner.' },
          { name: 'totalScanned', signature: 'number', description: 'Number of candidate files seen by the last full scan.', notes: 'The development watcher does not continuously update this count.' },
          { name: 'generatedAt', signature: 'ISO date string', description: 'Time the cache was generated or last updated by the watcher.', notes: 'Useful for diagnostics; not used as an invalidation key.' },
          { name: 'environment', signature: 'development | production', description: 'Describes whether entries point to TypeScript source or compiled JavaScript.', notes: 'Core selects the cache location from EXPRESSX_RUNTIME, not from this value.' },
        ]} />
      </Section>

      <Section id="what-is-discovered" title="Which files enter the cache">
        <p>The scanner's entry-point list contains four class decorators:</p>
        <CodeBlock language="typescript" code={`@Application()
@Controller('/users')
@UseGlobalInterceptor()
@UseGlobalExceptionHandler()`} />
        <p>In development, a regular-expression text check looks for those names with an <InlineCode>@</InlineCode> prefix. In production, it also recognizes compiled decorator references without the prefix. The full scan considers <InlineCode>*.ts</InlineCode> in development and <InlineCode>*.js</InlineCode> in production.</p>
        <Subsection id="transitive-imports" title="Services and route pipeline files are transitive">
          <p>
            A file containing only <InlineCode>@Injectable()</InlineCode>, a guard, route middleware, or route interceptor is not independently added to the discovery cache. It becomes available because a cached controller or application imports it through the normal JavaScript module graph.
          </p>
          <CodeBlock language="text" code={`cache imports user.controller.ts
  ├── imports user.service.ts
  ├── imports api-key.guard.ts
  └── imports validation.middleware.ts`} />
          <p>If a service or pipeline class is never imported by a discovered file, ExpressX.js has no reason to evaluate it and it will not be registered or used.</p>
        </Subsection>
        <Subsection id="scan-exclusions" title="Excluded paths">
          <p>Development scans ignore dependencies, <InlineCode>.expressx</InlineCode>, Git data, nested build/dist folders, declaration files, and files matching <InlineCode>*.spec.ts</InlineCode> or <InlineCode>*.test.ts</InlineCode>. The development watcher uses the same practical directory exclusions and watches TypeScript files only.</p>
          <Callout type="warning" title="Keep tests out of production output">
            The production glob selects JavaScript, but the scanner's test/declaration ignore patterns are currently written for TypeScript extensions. Exclude tests from TypeScript production compilation so decorated <InlineCode>*.spec.js</InlineCode> or <InlineCode>*.test.js</InlineCode> files cannot become production scan candidates during cache recovery.
          </Callout>
        </Subsection>
      </Section>

      <Section id="development-lifecycle" title="Development change tracking">
        <p><InlineCode>expressx dev</InlineCode> coordinates the cache and the application child process:</p>
        <Flow steps={['Load cache', 'Validate cached entries', 'Start TypeScript app', 'Watch sourceDir', 'Update cache', 'Restart after 300 ms']} />
        <ol className="ml-5 list-decimal space-y-2 marker:font-semibold marker:text-brand-primary">
          <li>The CLI loads <InlineCode>sourceDir/.expressx/cache.json</InlineCode>.</li>
          <li>For every existing cache entry, it compares the recorded <InlineCode>mtime</InlineCode> and <InlineCode>size</InlineCode> with the current file.</li>
          <li>If an entry changed, the CLI rechecks whether the file still contains an entry-point decorator and refreshes or removes it.</li>
          <li>The application starts with <InlineCode>EXPRESSX_RUNTIME=ts</InlineCode>. Core loads the cache and imports its TypeScript paths.</li>
          <li>While the CLI is running, added, changed, and deleted TypeScript files are inspected. Decorated files are added/updated; files that lose all tracked decorators are removed.</li>
          <li>Every watched source change schedules a child-process restart, even when the changed service is not itself a cache entry.</li>
          <li>The restart creates a fresh process, imports the updated graph, and rebuilds all decorator registries.</li>
        </ol>
        <Callout type="tip" title="Why service edits still reload">
          A plain service file normally stays out of <InlineCode>decoratorFiles</InlineCode>, but its change still restarts the app. On restart, a cached controller imports the service again, so the updated implementation is loaded transitively.
        </Callout>
      </Section>

      <Section id="cold-start" title="First run, missing cache, and recovery">
        <p>When Core cannot load a cache—because it is missing, unreadable, or has the wrong schema version—it performs a full scan, saves a new cache, and imports the new entries. During <InlineCode>expressx dev</InlineCode>, the CLI's cache watcher notices when Core creates that file and reloads it into the parent watcher state.</p>
        <CodeBlock language="bash" code={`# Safe development recovery: stop the server, remove the generated file,
# then let ExpressX rebuild it on the next start.
rm src/.expressx/cache.json
npm run dev`} />
        <p>The cache is recoverable because the source files are authoritative. Most generated projects ignore <InlineCode>src/.expressx/</InlineCode> in Git.</p>
      </Section>

      <Section id="stopped-server-limitation" title="Files added while the dev server is stopped">
        <Callout type="warning" title="Existing cache entries are validated; the whole tree is not rescanned">
          If a valid cache already exists, development startup validates only paths already listed in it. A new decorated file created while <InlineCode>expressx dev</InlineCode> was stopped is not an existing entry, and the watcher uses <InlineCode>ignoreInitial</InlineCode>, so that file may not be discovered automatically on the next start.
        </Callout>
        <p>When a new controller or global decorated file was created outside the running watcher, regenerate the index before diagnosing routing:</p>
        <CodeBlock language="bash" code={`# Option 1: force a fresh development scan
npx expressx build

# Option 2: remove only the generated development cache and restart
rm src/.expressx/cache.json
npm run dev`} />
        <p>A file added or changed while the watcher is already running is handled normally.</p>
      </Section>

      <Section id="production-cache" title="Production cache">
        <p>The build preparation command performs a fresh TypeScript scan, saves the development index, and creates production metadata by replacing the configured source prefix with the output prefix and changing terminal <InlineCode>.ts</InlineCode> extensions to <InlineCode>.js</InlineCode>.</p>
        <CodeBlock language="bash" code={`# expressx creates both cache files; tsc creates JavaScript
npx expressx build && npx tsc

# Production loads dist/.expressx/cache.json
NODE_ENV=production node dist/index.js`} />
        <CodeBlock language="text" code={`src/users/user.controller.ts
        ↓ build path conversion
dist/users/user.controller.js`} />
        <BulletList>
          <li>Deploy <InlineCode>dist/.expressx/cache.json</InlineCode> with the compiled files.</li>
          <li>Keep <InlineCode>expressx.outDir</InlineCode> equal to <InlineCode>compilerOptions.outDir</InlineCode>.</li>
          <li>Run production from the project directory containing <InlineCode>package.json</InlineCode>; paths are resolved from <InlineCode>process.cwd()</InlineCode>.</li>
          <li>Regenerate the cache for every build. Production startup loads a valid-version cache without comparing file timestamps or sizes.</li>
          <li>The current implementation can fall back to a full JavaScript scan when the production cache is missing, but deployment should not depend on that slower recovery path.</li>
        </BulletList>
      </Section>

      <Section id="operational-rules" title="Operational rules">
        <BulletList>
          <li>Treat both cache files as generated indexes and never as the source of framework configuration.</li>
          <li>Do not commit the development cache; do include the production cache in the deployment artifact.</li>
          <li>Do not depend on cached import order for application logic. Make decorators and registrations order-independent.</li>
          <li>After moving or renaming decorated files, rebuild or regenerate the cache so old paths cannot be imported.</li>
          <li>If a controller exists but its routes do not, inspect the cache membership first, then its imports and decorator configuration.</li>
          <li>Use <InlineCode>expressx build --verbose</InlineCode> to see the total scanned files and number of decorator files selected.</li>
        </BulletList>
      </Section>
    </Article>
  );
}
