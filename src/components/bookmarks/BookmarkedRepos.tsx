import { GitBranch, Star, GitFork, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppStore } from '@/store/appStore';
import { BookmarkButton } from './BookmarkButton';
import { formatRelativeDate } from '@/utils/formatNumber';
import { LanguageBadge } from '@/components/repos/LanguageBadge';

import { motion } from 'framer-motion';

export function BookmarkedRepos() {
  const { bookmarkedRepos } = useAppStore();

  if (bookmarkedRepos.length === 0) {
    return (
      <EmptyState
        icon={GitBranch}
        title="No saved repositories"
        message="When you bookmark GitHub repositories, they will appear here for quick access."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookmarkedRepos.map((repo, i) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.3) }}
          className="h-full"
        >
          <Card className="bg-card/50 hover:bg-card/80 transition-colors flex flex-col overflow-hidden h-full">
          <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
            <div className="space-y-1 overflow-hidden">
              <CardTitle className="text-base truncate flex flex-wrap items-center gap-2 leading-tight">
                <Link to={`/repo/${repo.full_name}`} className="hover:underline hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-[250px]">
                  {repo.name}
                </Link>
                <Badge variant="outline" className="text-[10px] px-1.5 h-4 text-muted-foreground border-border/50">
                  {repo.owner_login}
                </Badge>
              </CardTitle>
              {repo.description && (
                <CardDescription className="text-xs line-clamp-2" title={repo.description}>
                  {repo.description}
                </CardDescription>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0 -mr-2">
              {/* Typecast as any to reuse the bookmark button easily */}
              <BookmarkButton itemType="repo" repo={repo as any} compact />
              <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title="View on GitHub">
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="mt-auto pt-0 pb-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {repo.language && <LanguageBadge language={repo.language} />}
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  <span>{repo.stargazers_count}</span>
                </div>
              )}
              {repo.forks_count > 0 && (
                <div className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  <span>{repo.forks_count}</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/50">
              <div className="text-[11px] text-muted-foreground">
                Updated {formatRelativeDate(repo.updated_at)}
              </div>
              <Button asChild variant="secondary" size="sm" className="h-7 text-xs px-3 font-medium">
                <Link to={`/repo/${repo.full_name}`}>View details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      ))}
    </div>
  );
}
