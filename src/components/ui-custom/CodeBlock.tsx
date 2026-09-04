import { useState, useEffect, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import Prism from 'prismjs';

// Import Prism languages
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';

const DECORATOR_PATTERN = /@[\w$]+(?:\((?:[^()\r\n]|\([^()\r\n]*\))*\))?/;

const overrideDecoratorToken = (language: string) => {
  const grammar = Prism.languages[language];
  if (!grammar) return;

  // Force the entire decorator call to be a single token so it shares one color.
  (grammar as Prism.Grammar & { decorator?: { pattern: RegExp; greedy: boolean } }).decorator = {
    pattern: DECORATOR_PATTERN,
    greedy: true,
  };
};

overrideDecoratorToken('typescript');
overrideDecoratorToken('javascript');
overrideDecoratorToken('tsx');
overrideDecoratorToken('jsx');

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className="code-block group my-6 min-w-0 overflow-hidden rounded-xl border shadow-xl"
      style={{ background: 'var(--code-bg)', borderColor: 'var(--code-border)' }}
    >
      {/* Header */}
      <div
        className="flex min-w-0 items-center justify-between gap-2 border-b px-3 py-2.5 sm:px-4 sm:py-3"
        style={{ background: 'var(--code-surface)', borderColor: 'var(--code-border)' }}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          {filename && (
            <span className="min-w-0 truncate font-mono text-xs text-[color:var(--code-muted)] sm:ml-2 sm:text-sm">
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--code-muted)] opacity-100 transition-all duration-200 hover:bg-[color:var(--code-border)] hover:text-white sm:px-3 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          aria-label="Copy code"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#3FB950]" />
              <span className="hidden text-[#3FB950] sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content - Always dark background with colorful syntax */}
      <div className="relative overflow-x-auto" style={{ background: 'var(--code-bg)' }}>
        <pre className="p-5 text-sm leading-relaxed m-0" style={{ background: 'var(--code-bg)' }}>
          <code
            ref={codeRef}
            className={`language-${language}`}
            style={{ 
              fontFamily: "'Fira Code', 'SF Mono', Monaco, monospace",
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

// Simple inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="break-words rounded bg-muted px-1.5 py-0.5 font-mono text-[0.82em] text-foreground [overflow-wrap:anywhere]">
      {children}
    </code>
  );
}
