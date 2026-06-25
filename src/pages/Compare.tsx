import { useState } from 'react';
import { GitCompare, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Compare() {
  const [userA, setUserA] = useState('');
  const [userB, setUserB] = useState('');
  const [isComparing] = useState(false);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Compare</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compare two GitHub profiles side by side
        </p>
      </div>

      <Separator />

      {/* Comparison inputs */}
      <Card className="bg-card/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                First User
              </label>
              <Input
                placeholder="e.g. torvalds"
                value={userA}
                onChange={(e) => setUserA(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <div className="rounded-full bg-muted p-2">
                <GitCompare className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1 w-full">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Second User
              </label>
              <Input
                placeholder="e.g. gaearon"
                value={userB}
                onChange={(e) => setUserB(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button disabled={!userA.trim() || !userB.trim()}>
                Compare
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison results placeholder */}
      {isComparing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <Card key={i} className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-base">
                  <Skeleton className="h-5 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <GitCompare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Ready to compare</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Enter two GitHub usernames above and click Compare to see a
            side-by-side analysis of their profiles.
          </p>
        </div>
      )}
    </div>
  );
}
