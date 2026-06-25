import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface SkeletonCardProps {
  type?: 'repo' | 'user' | 'chart' | 'generic';
}

export function SkeletonCard({ type = 'generic' }: SkeletonCardProps) {
  if (type === 'repo') {
    return (
      <Card className="bg-card/50 h-full flex flex-col">
        <CardHeader className="pb-3 gap-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </CardHeader>
        <CardContent className="mt-auto pt-0 pb-4">
          <div className="flex gap-3 mb-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (type === 'user') {
    return (
      <Card className="bg-card/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="flex-1 space-y-2 w-full">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'chart') {
    return (
      <Card className="bg-card/50 h-full">
        <CardHeader>
          <Skeleton className="h-5 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <Skeleton className="h-5 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </CardContent>
    </Card>
  );
}
