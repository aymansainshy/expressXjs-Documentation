import { CodeBlock } from '@/components/ui-custom/CodeBlock';

export function Introduction() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="introduction" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">
        Introduction
      </h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-6">
        Framework is a progressive Node.js framework for building efficient, scalable server-side applications. 
        It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers 
        to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), 
        and FRP (Functional Reactive Programming).
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Under the hood, Framework makes use of robust HTTP Server frameworks like Express (the default) and optionally 
        can be configured to use Fastify as well! Framework provides a level of abstraction above these common Node.js 
        frameworks, but also exposes their APIs directly to the developer. This gives developers the freedom to use 
        the myriad of third-party modules which are available for the underlying platform.
      </p>

      <h2 id="philosophy" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Philosophy
      </h2>
      
      <p className="text-foreground/80 leading-relaxed mb-6">
        In recent years, thanks to Node.js, JavaScript has become the &quot;lingua franca&quot; of the web for both front and 
        backend applications. This has given rise to awesome projects like Angular, React and Vue, which improve developer 
        productivity and enable the creation of fast, testable, and extensible frontend applications.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        However, while plenty of superb libraries, helpers, and tools exist for Node (and server-side JavaScript), 
        none of them effectively solve the main problem of <strong>architecture</strong>.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        Framework provides an out-of-the-box application architecture which allows developers and teams to create highly 
        testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular.
      </p>

      <h2 id="installation" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Installation
      </h2>
      
      <p className="text-foreground/80 leading-relaxed mb-6">
        To get started, you can either scaffold the project with the Framework CLI, or clone a starter project 
        (both will produce the same outcome). To scaffold the project with the Framework CLI, run the following commands:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ npm i -g @framework/cli
$ framework new project-name`}
      />

      <div className="my-6 p-4 rounded-lg bg-blue-50/50 border-l-4 border-blue-500 dark:bg-blue-950/20">
        <p className="text-sm text-blue-700 dark:text-blue-400 font-medium mb-1">Hint</p>
        <p className="text-sm text-foreground/80">
          To create a new TypeScript project with stricter feature set, pass the <code>--strict</code> flag to the <code>framework new</code> command.
        </p>
      </div>

      <h2 id="alternatives" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Alternatives
      </h2>
      
      <p className="text-foreground/80 leading-relaxed mb-6">
        Alternatively, to install the TypeScript starter project with Git:
      </p>

      <CodeBlock 
        language="bash" 
        filename="Terminal"
        code={`$ git clone https://github.com/framework/typescript-starter.git project
$ cd project
$ npm install
$ npm run start`}
      />

      <p className="text-foreground/80 leading-relaxed mb-6">
        Open your browser and navigate to <a href="http://localhost:3000/" className="text-brand-primary hover:underline">http://localhost:3000/</a>.
      </p>

      <p className="text-foreground/80 leading-relaxed mb-6">
        To install the JavaScript flavor of the starter project, use <code>javascript-starter.git</code> in the command sequence above.
      </p>

      <h2 id="features" className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24">
        Features
      </h2>

      <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-6">
        <li><strong>Dependency Injection</strong> - Built-in DI container for managing dependencies</li>
        <li><strong>Modular Architecture</strong> - Organize your code into reusable modules</li>
        <li><strong>Decorators</strong> - Expressive metadata annotations for clean code</li>
        <li><strong>TypeScript Support</strong> - First-class TypeScript support</li>
        <li><strong>WebSockets</strong> - Built-in support for real-time communication</li>
        <li><strong>Microservices</strong> - Support for various transport layers</li>
        <li><strong>GraphQL</strong> - First-class GraphQL support</li>
        <li><strong>Testing</strong> - Comprehensive testing utilities</li>
      </ul>
    </div>
  );
}
