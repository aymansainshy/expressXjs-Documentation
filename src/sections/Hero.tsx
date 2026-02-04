import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-accent-blue/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div
              className={`space-y-4 transition-all duration-700 ease-expo-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium">
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
              
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                A modern framework for building scalable applications with an elegant architecture. 
                Built with TypeScript, inspired by the best patterns in software design.
              </p>
            </div>

            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-200 ease-expo-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Button
                size="lg"
                className="bg-brand-primary hover:bg-brand-primary-dark text-white gap-2 group transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 group"
              >
                <Star className="w-4 h-4 transition-transform group-hover:scale-110" />
                View on GitHub
              </Button>
            </div>

            {/* Stats */}
            <div
              className={`flex flex-wrap gap-8 pt-4 transition-all duration-700 delay-300 ease-expo-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">50K+</p>
                  <p className="text-sm text-muted-foreground">GitHub Stars</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Download className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">1M+</p>
                  <p className="text-sm text-muted-foreground">Weekly Downloads</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">100+</p>
                  <p className="text-sm text-muted-foreground">Contributors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Code window */}
          <div
            className={`relative transition-all duration-1000 delay-400 ease-expo-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Code window */}
              <div className="rounded-xl overflow-hidden bg-[#1E1E1E] shadow-code transform perspective-1000 rotate-x-2 rotate-y--2 hover:rotate-x-0 hover:rotate-y-0 transition-transform duration-500">
                {/* Window header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#2D2D2D] border-b border-[#3E3E3E]">
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
                <div className="p-4 overflow-x-auto">
                  <pre className="text-sm leading-relaxed">
                    <code className="language-typescript">
                      {codeExample.split('\n').map((line, i) => (
                        <div key={i} className="table-row">
                          <span className="table-cell text-right pr-4 text-gray-600 select-none w-8">
                            {i + 1}
                          </span>
                          <span className="table-cell">
                            {line.includes('import') && (
                              <>
                                <span className="text-[#569CD6]">import</span>
                                <span className="text-[#D4D4D4]">{' { '}</span>
                                <span className="text-[#9CDCFE]">{line.match(/\{([^}]+)\}/)?.[1]}</span>
                                <span className="text-[#D4D4D4]">{'} '}</span>
                                <span className="text-[#569CD6]">from</span>
                                <span className="text-[#CE9178]">{line.match(/from ['"]([^'"]+)['"]/)?.[0].replace('from ', '')}</span>
                                <span className="text-[#D4D4D4]">;</span>
                              </>
                            )}
                            {line.includes('@Controller') && (
                              <>
                                <span className="text-[#4EC9B0]">@Controller</span>
                                <span className="text-[#D4D4D4]">(</span>
                                <span className="text-[#CE9178]">&apos;api&apos;</span>
                                <span className="text-[#D4D4D4]">)</span>
                              </>
                            )}
                            {line.includes('export class') && !line.includes('@') && (
                              <>
                                <span className="text-[#569CD6]">export class</span>
                                <span className="text-[#DCDCAA]"> {line.match(/class\s+(\w+)/)?.[1]} </span>
                                <span className="text-[#D4D4D4]">{'{'}</span>
                              </>
                            )}
                            {line.includes('@Get') && (
                              <>
                                <span className="text-[#4EC9B0]">  @Get</span>
                                <span className="text-[#D4D4D4]">(</span>
                                <span className="text-[#CE9178]">&apos;hello&apos;</span>
                                <span className="text-[#D4D4D4]">)</span>
                              </>
                            )}
                            {line.includes('getHello') && (
                              <>
                                <span className="text-[#DCDCAA]">  getHello</span>
                                <span className="text-[#D4D4D4]">(): </span>
                                <span className="text-[#4EC9B0]">string</span>
                                <span className="text-[#D4D4D4]"> {'{'}</span>
                              </>
                            )}
                            {line.includes('return') && (
                              <>
                                <span className="text-[#569CD6]">    return</span>
                                <span className="text-[#CE9178]"> &apos;Hello World!&apos;</span>
                                <span className="text-[#D4D4D4]">;</span>
                              </>
                            )}
                            {line.trim() === '}' && (
                              <span className="text-[#D4D4D4]">{line}</span>
                            )}
                            {line.includes('@Module') && (
                              <>
                                <span className="text-[#4EC9B0]">@Module</span>
                                <span className="text-[#D4D4D4]">({'{'}</span>
                              </>
                            )}
                            {line.includes('controllers:') && (
                              <>
                                <span className="text-[#9CDCFE]">  controllers</span>
                                <span className="text-[#D4D4D4]">: [</span>
                                <span className="text-[#DCDCAA]">AppController</span>
                                <span className="text-[#D4D4D4]">],</span>
                              </>
                            )}
                            {line.trim() === '})' && (
                              <span className="text-[#D4D4D4]">{line}</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-accent-blue/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
