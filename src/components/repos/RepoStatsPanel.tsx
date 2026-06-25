import { Star, GitFork, Eye, CircleDot, Database, GitBranch } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatNumber } from '@/utils/formatNumber';
import type { GitHubRepo } from '@/api/githubTypes';

interface RepoStatsPanelProps {
  repo: GitHubRepo;
}

export function RepoStatsPanel({ repo }: RepoStatsPanelProps) {
  const sizeMB = Math.max(0.1, repo.size / 1024).toFixed(1);

  const stats = [
    { label: 'Stars', value: formatNumber(repo.stargazers_count), icon: <Star className="h-4 w-4" /> },
    { label: 'Forks', value: formatNumber(repo.forks_count), icon: <GitFork className="h-4 w-4" /> },
    { label: 'Watchers', value: formatNumber(repo.watchers_count), icon: <Eye className="h-4 w-4" /> },
    { label: 'Issues', value: formatNumber(repo.open_issues_count), icon: <CircleDot className="h-4 w-4" /> },
    { label: 'Size', value: `${sizeMB} MB`, icon: <Database className="h-4 w-4" /> },
    { label: 'Branch', value: repo.default_branch, icon: <GitBranch className="h-4 w-4" /> },
  ];

  return (
    <Card className="bg-card/50">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50 border border-border/50 text-center space-y-2">
              <div className="text-muted-foreground">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
