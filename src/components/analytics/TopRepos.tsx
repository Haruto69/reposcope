import { Star, GitFork, ExternalLink, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatRelativeDate } from '@/utils/formatNumber';
import { LanguageBadge } from '@/components/repos/LanguageBadge';
import type { GitHubRepo } from '@/api/githubTypes';

interface TopReposProps {
  repos: GitHubRepo[];
}

export function TopRepos({ repos }: TopReposProps) {
  const topRepos = repos.slice(0, 5);

  if (topRepos.length === 0) return null;

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Top Repositories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topRepos.map((repo) => (
          <div key={repo.id} className="flex items-center justify-between gap-4 p-3 rounded-lg border bg-card/30 hover:bg-card/60 transition-colors">
            <div className="flex-1 min-w-0">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium text-sm hover:underline hover:text-primary transition-colors flex items-center gap-1.5 truncate"
              >
                {repo.name}
                <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
              </a>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                {repo.language && <LanguageBadge language={repo.language} className="text-[10px]" />}
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" /> {repo.forks_count}
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground hidden sm:block whitespace-nowrap">
              Updated {formatRelativeDate(repo.updated_at)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
