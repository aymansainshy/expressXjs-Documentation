import { Link } from 'react-router-dom';
import { ArrowRight, Star, Download, Users, Zap, Shield, Code2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Code2,
    title: 'TypeScript First',
    description: 'Built with TypeScript in mind, with full type safety and excellent developer experience.',
  },
  {
    icon: Layers,
    title: 'Modular Architecture',
    description: 'Organize your code into modules for better maintainability and scalability.',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized for speed with efficient dependency injection and minimal overhead.',
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    description: 'Built-in support for authentication, authorization, and security best practices.',
  },
];

const stats = [
  {
    icon: Star,
    value: '50K+',
    label: 'GitHub Stars',
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-500/10',
  },
  {
    icon: Download,
    value: '1M+',
    label: 'Weekly Downloads',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10',
  },
  {
    icon: Users,
    value: '100+',
    label: 'Contributors',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
  },
];

const codeExample = `import { Controller, Get, Module } from '@framework/core';

@Controller('api')
export class AppController {
  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }
}

@Module({
  controllers: [AppController],
})
export class AppModule {}`;

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-20 sm:pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 mesh-gradient pointer-events-none" aria-hidden="true" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-brand-primary/10 rounded-full blur-[100px] motion-safe:animate-float pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-52 h-52 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-brand-accent-blue/10 rounded-full blur-[80px] motion-safe:animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} aria-hidden="true" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 motion-safe:animate-slide-up" style={{ animationDelay: '80ms' }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                  </span>
                  v2.0 is now available
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
                  <span className="block">Build Faster</span>
                  <span className="block gradient-text">With Less Code</span>
                </h1>
                
                <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
                  A modern framework for building scalable applications with an elegant architecture. 
                  Built with TypeScript, inspired by the best patterns in software design.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 motion-safe:animate-slide-up" style={{ animationDelay: '180ms' }}>
                <Link to="/docs" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-dark text-white gap-2 group transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <a
                  href="https://github.com/framework/framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto gap-2 group"
                  >
                    <Star className="w-4 h-4 transition-transform group-hover:scale-110" />
                    View on GitHub
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 motion-safe:animate-slide-up" style={{ animationDelay: '260ms' }}>
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/70 p-3 sm:p-4 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-semibold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - Code window */}
            <div className="relative w-full max-w-xl lg:max-w-none mx-auto lg:ml-auto motion-safe:animate-scale-in" style={{ animationDelay: '300ms' }}>
              <div className="relative">
                {/* Code window */}
                <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1E1E1E] transform perspective-1000 rotate-x-2 rotate-y--2 hover:rotate-x-0 hover:rotate-y-0 transition-transform duration-500">
                  {/* Window header */}
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-[#2D2D2D] border-b border-[#3E3E3E]">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-500 font-mono">app.controller.ts</span>
                    </div>
                  </div>
                  
                  {/* Code content */}
                  <div className="p-3 sm:p-4 overflow-x-auto" style={{ background: '#1E1E1E' }}>
                    <pre className="text-xs sm:text-sm leading-relaxed m-0">
                      <code className="language-typescript" style={{ color: '#D4D4D4', fontFamily: "'Fira Code', monospace" }}>
                        {codeExample.split('\n').map((line, i) => (
                          <div key={i} className="table-row">
                            <span className="hidden sm:table-cell text-right pr-4 text-gray-600 select-none w-8 tabular-nums">
                              {i + 1}
                            </span>
                            <span className="table-cell whitespace-pre">
                              {line}
                            </span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/20 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-accent-blue/20 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 motion-safe:animate-fade-in">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Everything you need to build
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Framework provides a complete set of tools and features to help you build scalable applications faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-5 sm:p-6 rounded-xl bg-background/80 border border-border hover:border-brand-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                  <feature.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand-primary to-brand-primary-dark bg-[length:200%_200%] motion-safe:animate-gradient-shift p-8 sm:p-10 lg:p-16 text-center">
            <div className="relative z-10 motion-safe:animate-slide-up">
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of developers building amazing applications with Framework.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Link to="/docs" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto gap-2"
                  >
                    Read Documentation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/examples" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 gap-2"
                  >
                    View Examples
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
