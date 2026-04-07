import ReactMarkdown from 'react-markdown';

import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { Typography } from '@/components/ui/Typography';

type MarkdownRendererProps = {
  content: string;
};

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <article>
      <ReactMarkdown
        components={{
          h1: () => null,
          h2: ({ children }) => (
            <Typography variant="h2" className="mt-10 mb-6 first:mt-0">
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h3" className="mt-8 mb-6 first:mt-0">
              {children}
            </Typography>
          ),
          h4: ({ children }) => (
            <Typography variant="h4" className="mt-8 mb-6 first:mt-0">
              {children}
            </Typography>
          ),
          h5: ({ children }) => (
            <Typography variant="h5" className="mt-6 mb-4 first:mt-0">
              {children}
            </Typography>
          ),
          h6: ({ children }) => (
            <Typography variant="h6" className="mt-6 mb-4 first:mt-0">
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body" className="mb-6 last:mb-0">
              {children}
            </Typography>
          ),
          a: ({ children, href }) => (
            <Link href={href ?? '#'} className="underline underline-offset-4">
              {children}
            </Link>
          ),
          ul: ({ children }) => (
            <ul className="ml-6 list-disc [&>li]:mt-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-6 list-decimal [&>li]:mt-2">{children}</ol>
          ),
          li: ({ children }) => <Typography as="li">{children}</Typography>,
          blockquote: ({ children }) => (
            <Typography variant="blockquote" className="mb-6">
              {children}
            </Typography>
          ),
          code: ({ children }) => (
            <Typography variant="code">{children}</Typography>
          ),
          hr: () => <Separator />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
