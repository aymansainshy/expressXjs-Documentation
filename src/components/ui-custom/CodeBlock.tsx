import { useState, useEffect, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import Prism from 'prismjs';

// Import Prism languages
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';

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
  }, [code]);

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
      className="my-6 rounded-xl overflow-hidden border border-[#3C3C3C] shadow-xl group"
      style={{ background: '#1E1E1E' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-[#3C3C3C]"
        style={{ background: '#252526' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          {filename && (
            <span className="text-sm text-[#9DA5B4] font-mono ml-2">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-[#9DA5B4] hover:text-white hover:bg-[#3C3C3C] transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#3FB950]" />
              <span className="text-[#3FB950]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content - Always dark background with colorful syntax */}
      <div className="relative overflow-x-auto" style={{ background: '#1E1E1E' }}>
        <pre className="p-5 text-sm leading-relaxed m-0" style={{ background: '#1E1E1E' }}>
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
    <code className="px-1.5 py-0.5 rounded text-sm font-mono bg-muted text-foreground">
      {children}
    </code>
  );
}
