import { useState, useEffect, useRef } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import Prism from 'prismjs';

// Import Prism languages
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
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

  const getLanguageIcon = () => {
    switch (language) {
      case 'bash':
      case 'shell':
        return <Terminal className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="code-block my-6 rounded-lg overflow-hidden bg-[#1E1E1E] border border-[#3E3E3E] group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-[#3E3E3E]">
        <div className="flex items-center gap-2">
          {getLanguageIcon()}
          {filename && (
            <span className="text-sm text-gray-400 font-mono">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed m-0">
          <code
            ref={codeRef}
            className={`language-${language}`}
            style={{ fontFamily: "'Fira Code', monospace" }}
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
