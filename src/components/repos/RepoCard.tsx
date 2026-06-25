import { Star, GitFork, Eye, CircleDot, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeDate } from '@/utils/formatNumber';
import { LanguageBadge } from './LanguageBadge';
import type { GitHubRepo } from '@/api/githubTypes';

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="bg-card/50 hover:bg-card/80 transition-colors flex flex-col h-full overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 overflow-hidden">
            <CardTitle className="text-base truncate flex flex-wrap items-center gap-2 leading-tight">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-[300px]">
                {repo.name}
              </a>
              {repo.archived && <Badge variant="secondary" className="text-[10px] px-1.5 h-4">Archived</Badge>}
              <Badge variant="outline" className="text-[10px] px-1.5 h-4 capitalize">
                {repo.visibility}
              </Badge>
            </CardTitle>
            {repo.description && (
              <CardDescription className="text-xs line-clamp-2" title={repo.description}>
                {repo.description}
              </CardDescription>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" asChild>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title="View on GitHub">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="mt-auto pt-0 pb-4 text-xs text-muted-foreground space-y-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {repo.language && (
            <LanguageBadge language={repo.language} />
          )}
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1" title={`${repo.stargazers_count} stars`}>
              <Star className="h-3.5 w-3.5" />
              <span>{repo.stargazers_count}</span>
            </div>
          )}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1" title={`${repo.forks_count} forks`}>
              <GitFork className="h-3.5 w-3.5" />
              <span>{repo.forks_count}</span>
            </div>
          )}
          {repo.open_issues_count > 0 && (
            <div className="flex items-center gap-1" title={`${repo.open_issues_count} open issues`}>
              <CircleDot className="h-3.5 w-3.5" />
              <span>{repo.open_issues_count}</span>
            </div>
          )}
          {repo.watchers_count > 0 && repo.watchers_count !== repo.stargazers_count && (
             <div className="flex items-center gap-1" title={`${repo.watchers_count} watchers`}>
               <Eye className="h-3.5 w-3.5" />
               <span>{repo.watchers_count}</span>
             </div>
          )}
        </div>
        <div className="text-[11px]">
          Updated {formatRelativeDate(repo.updated_at)}
        </div>
      </CardContent>
    </Card>
  );
}
