import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RetryButtonProps {
  onRetry: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function RetryButton({ onRetry, className, variant = 'outline', size = 'default' }: RetryButtonProps) {
  return (
    <Button onClick={onRetry} variant={variant} size={size} className={className}>
      <RefreshCcw className="mr-2 h-4 w-4" />
      Try Again
    </Button>
  );
}
