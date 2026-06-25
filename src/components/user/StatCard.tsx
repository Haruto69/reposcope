import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value?: ReactNode;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function StatCard({ label, value, icon, className, children }: StatCardProps) {
  return (
    <Card className={cn("bg-card/50", className)}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        {children || <div className="mt-2 text-2xl font-bold">{value}</div>}
      </CardContent>
    </Card>
  );
}
