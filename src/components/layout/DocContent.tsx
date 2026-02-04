import { useEffect, useRef } from 'react';
import { Link2 } from 'lucide-react';
import { CodeBlock } from '@/components/ui-custom/CodeBlock';
import { Callout } from '@/components/ui-custom/Callout';
import type { TocItem } from '@/types';

interface DocSection {
  id: string;
  level: 1 | 2 | 3;
  title?: string;
  content: string;
  code?: {
    language: string;
    filename?: string;
    code: string;
  };
  hint?: string;
  additionalContent?: string;
}

interface DocContentProps {
  sections: DocSection[];
  onTocUpdate: (items: TocItem[]) => void;
}

export function DocContent({ sections, onTocUpdate }: DocContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate TOC items from sections
    const tocItems: TocItem[] = sections
      .filter((section) => section.title)
      .map((section) => ({
        id: section.id,
        text: section.title!,
        level: section.level,
      }));
    onTocUpdate(tocItems);
  }, [sections, onTocUpdate]);

  const renderContent = (content: string) => {
    // Split content by newlines and render paragraphs
    return content
      .split('\n\n')
      .filter((p) => p.trim())
      .map((paragraph, index) => {
        // Check if it's a list
        if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
          const items = paragraph.split('\n').filter((line) => line.trim());
          return (
            <ul key={index} className="list-disc list-inside space-y-2 my-4 text-foreground/80">
              {items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {item.replace(/^[-*]\s*/, '')}
                </li>
              ))}
            </ul>
          );
        }

        // Check if it's a numbered list
        if (/^\d+\./.test(paragraph)) {
          const items = paragraph.split('\n').filter((line) => line.trim());
          return (
            <ol key={index} className="list-decimal list-inside space-y-2 my-4 text-foreground/80">
              {items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {item.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
            </ol>
          );
        }

        // Regular paragraph with bold text support
        const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={index} className="my-4 text-foreground/80 leading-relaxed">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      });
  };

  return (
    <div ref={contentRef} className="prose prose-slate dark:prose-invert max-w-none">
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className={index > 0 ? 'mt-12' : ''}>
          {section.level === 1 && section.title && (
            <h1 className="text-4xl font-semibold tracking-tight mb-6 flex items-center gap-2 group">
              {section.title}
              <a
                href={`#${section.id}`}
                className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
              >
                <Link2 className="w-5 h-5" />
              </a>
            </h1>
          )}

          {section.level === 2 && section.title && (
            <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4 flex items-center gap-2 group scroll-mt-24">
              {section.title}
              <a
                href={`#${section.id}`}
                className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
              >
                <Link2 className="w-4 h-4" />
              </a>
            </h2>
          )}

          {section.level === 3 && section.title && (
            <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3 flex items-center gap-2 group scroll-mt-24">
              {section.title}
              <a
                href={`#${section.id}`}
                className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
              >
                <Link2 className="w-4 h-4" />
              </a>
            </h3>
          )}

          <div className="text-foreground/80">
            {renderContent(section.content)}
          </div>

          {section.code && (
            <CodeBlock
              code={section.code.code}
              language={section.code.language}
              filename={section.code.filename}
            />
          )}

          {section.hint && (
            <Callout type="tip" title="Hint">
              {section.hint}
            </Callout>
          )}

          {section.additionalContent && (
            <div className="text-foreground/80">
              {renderContent(section.additionalContent)}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
