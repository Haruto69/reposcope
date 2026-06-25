import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseGithubError, type ParsedApiError } from '@/utils/apiError';
import { RateLimitWarning } from './RateLimitWarning';
import { RetryButton } from './RetryButton';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: unknown;
  context?: 'user' | 'repo' | 'readme' | 'repos';
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  error,
  context,
  onRetry,
  className,
}: ErrorStateProps) {
  let finalMessage = message;
  let parsedError: ParsedApiError | null = null;

  if (error) {
    parsedError = parseGithubError(error, context);
    finalMessage = parsedError.message;
  }

  if (parsedError?.type === 'rate_limit') {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4 py-8 w-full", className)}>
        <RateLimitWarning resetTime={parsedError.resetTime} className="max-w-md w-full text-left" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-12 text-center w-full',
        className
      )}
    >
      <div className="rounded-full bg-destructive/10 p-3">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">{finalMessage}</p>
      </div>
      {onRetry && parsedError?.type !== 'not_found' && (
        <RetryButton onRetry={onRetry} />
      )}
    </div>
  );
}
