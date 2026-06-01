'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  children: string;
  variant?: 'chat' | 'card';
  onQuestionClick?: (question: string) => void;
}

// Keywords to highlight and enlarge on hover
const HIGHLIGHT_KEYWORDS = [
  // Projects
  'EasyScaleCloud', 'TalkMeUp', 'Ask Gene',
  // Metrics
  '93.5%', '78%', '91%', '62%', '89%', '74%', '41%',
  '5,000', '5000', '0%',
  // Technologies
  'AWS Bedrock', 'Claude', 'RAG', 'LLM', 'React', 'FastAPI',
  'Python', 'Node.js', 'TypeScript', 'Next.js',
  // Key terms
  'AI Agent', 'Agent Developer', 'Authorization', 'Authentication'
];

// Function to highlight keywords in text
const highlightKeywords = (text: string) => {
  let lastIndex = 0;
  const parts: (string | React.ReactNode)[] = [];

  // Sort by length descending to match longer phrases first
  const sortedKeywords = [...HIGHLIGHT_KEYWORDS].sort((a, b) => b.length - a.length);

  // Build regex pattern
  const pattern = sortedKeywords
    .map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  const regex = new RegExp(`(${pattern})`, 'gi');
  const matches = Array.from(text.matchAll(regex));

  if (matches.length === 0) {
    return text;
  }

  matches.forEach((match) => {
    const startIndex = match.index;
    const endIndex = match.index + match[0].length;

    // Add text before match
    if (startIndex > lastIndex) {
      parts.push(text.substring(lastIndex, startIndex));
    }

    // Add highlighted keyword
    parts.push(
      <span
        key={startIndex}
        className="relative inline-block font-semibold text-[#5C7A5C] bg-[#5C7A5C]/10 px-1 rounded transition-all duration-200 hover:bg-[#5C7A5C]/20 hover:scale-110 hover:shadow-md cursor-pointer"
        title="Key information"
      >
        {match[0]}
      </span>
    );

    lastIndex = endIndex;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

export const Markdown = ({ children, variant = 'chat', onQuestionClick }: MarkdownProps) => {
  // Preprocess markdown to handle #ask: links with spaces
  const preprocessedChildren = children.replace(
    /\[([^\]]+)\]\(#ask:([^)]+)\)/g,
    '[$1](<#ask:$2>)'
  );

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            // Handle string children with keyword highlighting
            const processedChildren = typeof children === 'string' ? highlightKeywords(children) : children;
            return <p className="mb-3 last:mb-0 leading-relaxed text-[#2D2D2D]">{processedChildren}</p>;
          },
          a: ({ href, children }) => {
            // Handle clickable question links
            if (href?.startsWith('#ask:')) {
              const question = decodeURIComponent(href.replace('#ask:', ''));
              return (
                <button
                  onClick={() => onQuestionClick?.(question)}
                  className="text-[#5C7A5C] hover:text-[#4A6449] underline font-medium cursor-pointer transition-colors"
                >
                  {children}
                </button>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5C7A5C] hover:text-[#4A6449] underline"
              >
                {children}
              </a>
            );
          },
          code: ({ className, children, ...props }) => {
            // Inline code doesn't have a className (language-*), code blocks do
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-[#F5F0E8] border border-[#E0D8CC] px-1.5 py-0.5 rounded text-sm font-mono text-[#2D2D2D]">
                  {children}
                </code>
              );
            }
            return (
              <code className={cn("block bg-[#F5F0E8] border border-[#E0D8CC] p-3 rounded-lg my-3 overflow-x-auto text-sm font-mono text-[#2D2D2D]", className)}>
                {children}
              </code>
            );
          },
          ul: ({ children }) => <ul className="list-disc pl-6 mb-3 space-y-1 text-[#2D2D2D]">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-3 space-y-1 text-[#2D2D2D]">{children}</ol>,
          li: ({ children }) => {
            // Handle string children with keyword highlighting
            const processedChildren = typeof children === 'string' ? highlightKeywords(children) : children;
            return <li className="leading-relaxed text-[#2D2D2D]">{processedChildren}</li>;
          },
          strong: ({ children }) => <strong className="font-semibold text-[#2D2D2D]">{children}</strong>,
          em: ({ children }) => <em className="italic text-[#8A7D6B]">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#5C7A5C]/50 pl-4 my-3 text-[#8A7D6B] italic bg-[#F5F0E8] py-2 rounded-r">
              {children}
            </blockquote>
          ),
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 mt-4 text-[#2D2D2D]">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-4 text-[#2D2D2D]">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-3 text-[#2D2D2D]">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-semibold mb-2 mt-3 text-[#2D2D2D]">{children}</h4>,
        }}
      >
        {preprocessedChildren}
      </ReactMarkdown>
    </div>
  );
};
