import { Calendar, RefreshCw, Upload, Scale } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDate, formatRelativeDate } from '@/utils/formatNumber';
import type { GitHubRepo } from '@/api/githubTypes';

interface RepoMetaInfoProps {
  repo: GitHubRepo;
}

export function RepoMetaInfo({ repo }: RepoMetaInfoProps) {
  return (
    <Card className="bg-card/50 h-full">
      <CardHeader>
        <CardTitle className="text-base">Metadata</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Created on {formatDate(repo.created_at)}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <RefreshCw className="h-4 w-4" />
          <span>Updated {formatRelativeDate(repo.updated_at)}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Upload className="h-4 w-4" />
          <span>Last pushed {formatRelativeDate(repo.pushed_at)}</span>
        </div>
        {repo.license && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Scale className="h-4 w-4" />
            <span>License: {repo.license.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
