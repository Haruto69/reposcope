import { AlertTriangle, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface RateLimitWarningProps {
  resetTime?: Date;
  className?: string;
}

export function RateLimitWarning({ resetTime, className }: RateLimitWarningProps) {
  const formatResetTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Alert variant="destructive" className={className}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>API Rate Limit Exceeded</AlertTitle>
      <AlertDescription className="mt-2 space-y-2">
        <p>GitHub API rate limit reached. Please wait and try again later.</p>
        {resetTime && (
          <div className="flex items-center gap-1.5 text-xs font-medium bg-destructive/10 text-destructive w-fit px-2 py-1 rounded-md mt-2">
            <Clock className="h-3.5 w-3.5" />
            <span>You can try again after {formatResetTime(resetTime)}</span>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}
