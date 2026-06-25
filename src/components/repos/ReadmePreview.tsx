import { FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRepoReadme } from '@/hooks/useRepoReadme';
import { LoadingState } from '@/components/common/LoadingState';

import { ErrorState } from '@/components/common/ErrorState';
import { parseGithubError } from '@/utils/apiError';

interface ReadmePreviewProps {
  owner: string;
  repo: string;
}

export function ReadmePreview({ owner, repo }: ReadmePreviewProps) {
  const { data: readme, isLoading, error } = useRepoReadme(owner, repo);

  if (isLoading) {
    return (
      <Card className="bg-card/50">
        <CardContent className="p-8">
          <LoadingState message="Loading README..." />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    const parsed = parseGithubError(error, 'readme');
    if (parsed.type !== 'not_found') {
      return (
        <Card className="bg-card/50 border-dashed h-full flex flex-col justify-center">
          <CardContent className="p-6">
            <ErrorState title="Failed to load README" message={parsed.message} error={error} context="readme" />
          </CardContent>
        </Card>
      );
    }
  }

  if (!readme) {
    return (
      <Card className="bg-card/50 border-dashed h-full">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[300px]">
          <FileText className="h-8 w-8 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground font-medium">No README found for this repository.</p>
        </CardContent>
      </Card>
    );
  }

  // Base64 decode the content
  let decodedContent = '';
  try {
    // GitHub API returns base64 encoded string, potentially with newlines
    const cleanBase64 = readme.content.replace(/\n/g, '');
    // Using decodeURIComponent and escape to handle UTF-8 chars correctly
    decodedContent = decodeURIComponent(escape(window.atob(cleanBase64)));
  } catch {
    decodedContent = 'Failed to decode README content.';
  }

  return (
    <Card className="bg-card/50 overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-muted/30 border-b pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="h-4 w-4" />
          README.md
        </CardTitle>
      </CardHeader>
      <ScrollArea className="flex-1 max-h-[800px] bg-background">
        <CardContent className="p-4 sm:p-6 lg:p-8 overflow-hidden max-w-full min-w-0">
          <div className="space-y-4 min-w-0 max-w-full break-words [overflow-wrap:anywhere] markdown-body">
            {/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 border-b pb-2 break-words" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2 break-words" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-2 break-words" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-6 mb-2 break-words" {...props} />,
                p: ({ node, ...props }) => <p className="leading-7 break-words [overflow-wrap:anywhere]" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 break-words" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 break-words" {...props} />,
                li: ({ node, ...props }) => <li className="leading-7 break-words [overflow-wrap:anywhere]" {...props} />,
                a: ({ node, ...props }) => (
                  <a className="text-primary font-medium hover:underline break-words [overflow-wrap:anywhere]" target="_blank" rel="noreferrer" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground my-4 break-words" {...props} />
                ),
                pre: ({ node, ...props }) => (
                  <div className="relative my-4 max-w-full overflow-hidden rounded-md border bg-muted/50">
                    <pre className="max-w-full p-4 overflow-x-auto text-sm font-mono bg-transparent whitespace-pre" {...props} />
                  </div>
                ),
                code: ({ node, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match && !String(children).includes('\n');
                  if (isInline) {
                    return <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono break-words [overflow-wrap:anywhere]" {...props}>{children}</code>;
                  }
                  return <code className={`${className || ''} block min-w-0 text-sm`} {...props}>{children}</code>;
                },
                table: ({ node, ...props }) => (
                  <div className="my-4 w-full max-w-full overflow-x-auto">
                    <table className="w-full min-w-max border-collapse text-sm" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => <thead className="bg-muted/50" {...props} />,
                th: ({ node, ...props }) => <th className="border border-border px-4 py-2 text-left font-bold" {...props} />,
                td: ({ node, ...props }) => <td className="border border-border px-4 py-2" {...props} />,
                hr: ({ node, ...props }) => <hr className="my-8 border-border" {...props} />,
                img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-md my-4" {...props} />,
              }}
            >
              {decodedContent}
            </ReactMarkdown>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
