import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { useGithubRepoDetails } from '@/hooks/useGithubRepoDetails';
import { RepoStatsPanel } from '@/components/repos/RepoStatsPanel';
import { RepoMetaInfo } from '@/components/repos/RepoMetaInfo';
import { ReadmePreview } from '@/components/repos/ReadmePreview';
import { LanguageBadge } from '@/components/repos/LanguageBadge';

export default function RepoDetails() {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const { data: repo, isLoading, error, refetch } = useGithubRepoDetails(owner, name);

  if (isLoading) {
    return <LoadingState message="Fetching repository details..." className="min-h-full" />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <ErrorState
          title="Repository Not Found"
          message={error.message}
          onRetry={() => refetch()}
        />
        <Button asChild variant="outline" className="mt-6">
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  if (!repo) return null;

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Navigation */}
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground">
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b pb-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight break-all">
              {repo.owner.login} / {repo.name}
            </h1>
            <Badge variant={repo.visibility === 'public' ? 'outline' : 'secondary'} className="capitalize">
              {repo.visibility}
            </Badge>
            {repo.archived && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" />
                Archived
              </Badge>
            )}
          </div>
          
          {repo.description && (
            <p className="text-muted-foreground text-base max-w-3xl">
              {repo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {repo.language && <LanguageBadge language={repo.language} />}
            <Button asChild variant="outline" size="sm" className="h-8">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <RepoStatsPanel repo={repo} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReadmePreview owner={repo.owner.login} repo={repo.name} />
        </div>
        <div className="lg:col-span-1">
          <RepoMetaInfo repo={repo} />
        </div>
      </div>
    </div>
  );
}
