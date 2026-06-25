import { Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ActivitySummaryProps {
  lastActiveDate: string | null;
}

export function ActivitySummary({ lastActiveDate }: ActivitySummaryProps) {
  let status = "Low recent activity";
  let dotClass = "bg-muted-foreground";

  if (lastActiveDate) {
    const daysSinceActive = (Date.now() - new Date(lastActiveDate).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceActive <= 30) {
      status = "Highly active recently";
      dotClass = "bg-green-500";
    } else if (daysSinceActive <= 90) {
      status = "Moderately active";
      dotClass = "bg-yellow-500";
    }
  }

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${dotClass}`} />
          <p className="text-sm font-medium">{status}</p>
        </div>
        {lastActiveDate && (
          <p className="text-xs text-muted-foreground mt-2">
            Last repository update: {new Date(lastActiveDate).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
