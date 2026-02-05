import { CodeBlock } from '@/components/ui-custom/CodeBlock';

export function CLIOverview() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="cli-overview" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">CLI Overview</h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        The Framework CLI is a command-line interface tool that helps you to initialize, develop, and maintain 
        your Framework applications. It provides a set of commands for scaffolding and managing your projects.
      </p>

      <h2 id="installation" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Installation</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Install the CLI globally using npm:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ npm install -g @framework/cli`}
      />

      <h2 id="creating-new-project" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Creating a New Project</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        To create a new Framework project, run the following command:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ framework new project-name`}
      />

      <p className="text-foreground/80 leading-relaxed mb-6">
        The CLI will prompt you to select your preferred package manager and other options.
      </p>

      <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Project Structure</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        After creating a new project, your directory structure will look like this:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Project Structure"
        code={`project-name/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .eslintrc.js
├── .prettierrc
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md`}
      />

      <h2 id="configuration-file" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Configuration File</h2>

      <p className="text-foreground/80 leading-relaxed mb-6">
        The <code>nest-cli.json</code> file contains CLI configuration options:
      </p>

      <CodeBlock 
        language="json" 
        filename="nest-cli.json"
        code={`{
  "collection": "@framework/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}`}
      />

      <h2 id="running-application" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Running the Application</h2>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`# Development mode with hot reload
$ npm run start:dev

# Production mode
$ npm run start:prod

# Debug mode
$ npm run start:debug`}
      />

      <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Building the Application</h2>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`# Build for production
$ npm run build

# Build and watch for changes
$ npm run build -- --watch`}
      />
    </div>
  );
}

export function Commands() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="cli-commands" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">CLI Commands</h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        The Framework CLI provides a comprehensive set of commands for generating and managing your application components.
      </p>

      <h2 id="generate-commands" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Generate Commands</h2>

      <h3 id="generate-module" className="text-xl font-semibold mt-8 mb-4 scroll-mt-24">Generate a Module</h3>
      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ framework generate module users
# or shorthand
$ framework g mo users`}
      />

      <h3 id="generate-controller" className="text-xl font-semibold mt-8 mb-4 scroll-mt-24">Generate a Controller</h3>
      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ framework generate controller users
# or shorthand
$ framework g co users`}
      />

      <h3 id="generate-service" className="text-xl font-semibold mt-8 mb-4 scroll-mt-24">Generate a Service</h3>
      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ framework generate service users
# or shorthand
$ framework g s users`}
      />

      <h3 id="generate-resource" className="text-xl font-semibold mt-8 mb-4 scroll-mt-24">Generate a Complete Resource</h3>
      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ framework generate resource users
# or shorthand
$ framework g res users`}
      />

      <p className="text-foreground/80 leading-relaxed mb-6">
        The resource command generates a complete CRUD resource with controller, service, module, DTOs, and entity.
      </p>

      <h2 id="available-generators" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Available Generators</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">Command</th>
              <th className="px-4 py-3">Alias</th>
              <th className="px-4 py-3 rounded-r-lg">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-3 font-mono">application</td>
              <td className="px-4 py-3 font-mono">app</td>
              <td className="px-4 py-3">Generate a new application</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">class</td>
              <td className="px-4 py-3 font-mono">cl</td>
              <td className="px-4 py-3">Generate a new class</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">controller</td>
              <td className="px-4 py-3 font-mono">co</td>
              <td className="px-4 py-3">Generate a controller</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">decorator</td>
              <td className="px-4 py-3 font-mono">d</td>
              <td className="px-4 py-3">Generate a custom decorator</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">filter</td>
              <td className="px-4 py-3 font-mono">f</td>
              <td className="px-4 py-3">Generate an exception filter</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">gateway</td>
              <td className="px-4 py-3 font-mono">ga</td>
              <td className="px-4 py-3">Generate a WebSocket gateway</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">guard</td>
              <td className="px-4 py-3 font-mono">gu</td>
              <td className="px-4 py-3">Generate a guard</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">interceptor</td>
              <td className="px-4 py-3 font-mono">in</td>
              <td className="px-4 py-3">Generate an interceptor</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">interface</td>
              <td className="px-4 py-3 font-mono">interface</td>
              <td className="px-4 py-3">Generate an interface</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">middleware</td>
              <td className="px-4 py-3 font-mono">mi</td>
              <td className="px-4 py-3">Generate a middleware</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">module</td>
              <td className="px-4 py-3 font-mono">mo</td>
              <td className="px-4 py-3">Generate a module</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">pipe</td>
              <td className="px-4 py-3 font-mono">pi</td>
              <td className="px-4 py-3">Generate a pipe</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">provider</td>
              <td className="px-4 py-3 font-mono">pr</td>
              <td className="px-4 py-3">Generate a provider</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">resolver</td>
              <td className="px-4 py-3 font-mono">r</td>
              <td className="px-4 py-3">Generate a GraphQL resolver</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">service</td>
              <td className="px-4 py-3 font-mono">s</td>
              <td className="px-4 py-3">Generate a service</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">resource</td>
              <td className="px-4 py-3 font-mono">res</td>
              <td className="px-4 py-3">Generate a CRUD resource</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="other-commands" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">Other Commands</h2>

      <h3 id="info-command" className="text-xl font-semibold mt-8 mb-4 scroll-mt-24">Info Command</h3>
      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ framework info`}
      />
      <p className="text-foreground/80 leading-relaxed mb-6">
        Displays information about the current project, including dependencies and versions.
      </p>

      <h3 id="update-command" className="text-xl font-semibold mt-8 mb-4 scroll-mt-24">Update Command</h3>
      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ framework update`}
      />
      <p className="text-foreground/80 leading-relaxed mb-6">
        Updates Framework dependencies to their latest versions.
      </p>
    </div>
  );
}