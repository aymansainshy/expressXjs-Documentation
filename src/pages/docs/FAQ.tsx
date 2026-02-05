import { CodeBlock } from '@/components/ui-custom/CodeBlock';

export function FAQ() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="faq" className="text-4xl font-semibold tracking-tight mb-6 scroll-mt-24">Frequently Asked Questions</h1>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-8">
        Find answers to commonly asked questions about Framework. If you can&apos;t find what you&apos;re looking for, 
        feel free to ask in our community channels.
      </p>

      <div className="space-y-8">
        {/* Question 1 */}
        <div id="what-is-framework" className="p-6 rounded-xl bg-muted/50 border border-border scroll-mt-24">
          <h3 className="text-lg font-semibold mb-3">What is Framework?</h3>
          <p className="text-foreground/80 leading-relaxed">
            Framework is a progressive Node.js framework for building efficient, scalable server-side applications. 
            It uses TypeScript and combines elements of OOP, FP, and FRP. It&apos;s heavily inspired by Angular and 
            provides an out-of-the-box application architecture.
          </p>
        </div>

        {/* Question 2 */}
        <div id="production-ready" className="p-6 rounded-xl bg-muted/50 border border-border scroll-mt-24">
          <h3 className="text-lg font-semibold mb-3">Is Framework production-ready?</h3>
          <p className="text-foreground/80 leading-relaxed">
            Yes! Framework is used by many companies in production, from startups to large enterprises. 
            It has excellent TypeScript support, comprehensive documentation, and a growing ecosystem of packages.
          </p>
        </div>

        {/* Question 3 */}
        <div id="enable-cors" className="p-6 rounded-xl bg-muted/50 border border-border scroll-mt-24">
          <h3 className="text-lg font-semibold mb-3">How do I enable CORS?</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">
            You can enable CORS by calling the <code>enableCors()</code> method on your application instance:
          </p>
          <CodeBlock 
            language="typescript" 
            filename="main.ts"
            code={`const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(3000);`}
          />
        </div>

        {/* Question 4 */}
        <div id="file-uploads" className="p-6 rounded-xl bg-muted/50 border border-border scroll-mt-24">
          <h3 className="text-lg font-semibold mb-3">How do I handle file uploads?</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Framework uses the <code>@framework/platform-express</code> package which includes built-in support 
            for file uploads using Multer:
          </p>
          <CodeBlock 
            language="typescript" 
            filename="upload.controller.ts"
            code={`import { Controller, Post, UseInterceptors, UploadedFile } from '@framework/common';
import { FileInterceptor } from '@framework/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
  }
}`}
          />
        </div>

        {/* Question 5 */}
        <div id="environment-variables" className="p-6 rounded-xl bg-muted/50 border border-border scroll-mt-24">
          <h3 className="text-lg font-semibold mb-3">How do I configure environment variables?</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Use the <code>@framework/config</code> package to manage environment variables:
          </p>
          <CodeBlock 
            language="typescript" 
            filename="app.module.ts"
            code={`import { ConfigModule } from '@framework/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}`}
          />
        </div>

        {/* Question 6 */}
        <div id="fastify-support" className="p-6 rounded-xl bg-muted/50 border border-border scroll-mt-24">
          <h3 className="text-lg font-semibold mb-3">Can I use Framework with Fastify instead of Express?</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Yes! Framework supports both Express and Fastify. To use Fastify, install the platform package:
          </p>
          <CodeBlock 
            language="bash" 
            filename="Terminal"
            code={`$ npm install @framework/platform-fastify`}
          />
          <CodeBlock 
            language="typescript" 
            filename="main.ts"
            code={`import { NestFactory } from '@framework/core';
import { FastifyAdapter, NestFastifyApplication } from '@framework/platform-fastify';

const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter(),
);`}
          />
        </div>

        {/* Question 7 */}
        <div className="p-6 rounded-xl bg-muted/50 border border-border">
          <h3 className="text-lg font-semibold mb-3">How do I implement rate limiting?</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Use the <code>@framework/throttler</code> package for rate limiting:
          </p>
          <CodeBlock 
            language="typescript" 
            filename="app.module.ts"
            code={`import { ThrottlerModule } from '@framework/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}`}
          />
        </div>

        {/* Question 8 */}
        <div id="cron-jobs" className="p-6 rounded-xl bg-muted/50 border border-border scroll-mt-24">
          <h3 className="text-lg font-semibold mb-3">How do I schedule cron jobs?</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Use the <code>@framework/schedule</code> package for scheduling tasks:
          </p>
          <CodeBlock 
            language="typescript" 
            filename="tasks.service.ts"
            code={`import { Injectable } from '@framework/common';
import { Cron, Interval } from '@framework/schedule';

@Injectable()
export class TasksService {
  @Cron('0 0 * * *') // Every day at midnight
  handleCron() {
    console.log('Running daily task');
  }

  @Interval(60000) // Every minute
  handleInterval() {
    console.log('Running interval task');
  }
}`}
          />
        </div>

        {/* Question 9 */}
        <div id="async-initialization" className="p-6 rounded-xl bg-muted/50 border border-border scroll-mt-24">
          <h3 className="text-lg font-semibold mb-3">How do I handle async initialization?</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Implement the <code>OnModuleInit</code> interface for async initialization:
          </p>
          <CodeBlock 
            language="typescript" 
            filename="database.service.ts"
            code={`import { Injectable, OnModuleInit } from '@framework/common';

@Injectable()
export class DatabaseService implements OnModuleInit {
  async onModuleInit() {
    await this.connect();
  }

  private async connect() {
    // Database connection logic
  }
}`}
          />
        </div>

        {/* Question 10 */}
        <div id="get-help" className="p-6 rounded-xl bg-muted/50 border border-border scroll-mt-24">
          <h3 className="text-lg font-semibold mb-3">Where can I get help?</h3>
          <p className="text-foreground/80 leading-relaxed">
            You can get help through multiple channels:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 mt-3">
            <li><strong>Discord</strong> - Join our community Discord server</li>
            <li><strong>GitHub Discussions</strong> - Ask questions and share ideas</li>
            <li><strong>Stack Overflow</strong> - Tag your questions with &quot;framework&quot;</li>
            <li><strong>Documentation</strong> - Comprehensive docs at docs.framework.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}