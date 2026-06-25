import { ArrowRight, X, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CompareSearchProps {
  userA: string;
  setUserA: (val: string) => void;
  userB: string;
  setUserB: (val: string) => void;
  onCompare: () => void;
  onClear: () => void;
  onSwap: () => void;
  isComparing: boolean;
}

export function CompareSearch({
  userA, setUserA, userB, setUserB, onCompare, onClear, onSwap, isComparing
}: CompareSearchProps) {
  return (
    <Card className="bg-card/50">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">First User</label>
            <Input
              placeholder="e.g. torvalds"
              value={userA}
              onChange={(e) => setUserA(e.target.value.trim())}
              onKeyDown={(e) => e.key === 'Enter' && onCompare()}
            />
          </div>
          <div className="flex items-end hidden sm:flex">
            <Button variant="ghost" size="icon" className="rounded-full bg-muted mt-5" onClick={onSwap}>
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          <div className="flex items-end sm:hidden w-full justify-center">
            <Button variant="ghost" size="icon" className="rounded-full bg-muted" onClick={onSwap}>
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground rotate-90" />
            </Button>
          </div>
          <div className="flex-1 w-full relative">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Second User</label>
            <Input
              placeholder="e.g. gaearon"
              value={userB}
              onChange={(e) => setUserB(e.target.value.trim())}
              onKeyDown={(e) => e.key === 'Enter' && onCompare()}
            />
          </div>
          <div className="flex items-end gap-2 mt-5 sm:mt-0">
            {isComparing && (
              <Button variant="outline" size="icon" onClick={onClear}>
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button disabled={!userA || !userB} onClick={onCompare} className="flex-1 sm:flex-none">
              Compare
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
