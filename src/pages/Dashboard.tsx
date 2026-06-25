import { User, GitFork, Star, Code2, Activity, FolderGit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/appStore';
import { EmptyState } from '@/components/common/EmptyState';
import { SearchBar } from '@/components/common/SearchBar';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { useGithubUser } from '@/hooks/useGithubUser';
import { UserProfileCard } from '@/components/user/UserProfileCard';
import { StatCard } from '@/components/user/StatCard';
import { SearchHistory } from '@/components/user/SearchHistory';
import { RepoGrid } from '@/components/repos/RepoGrid';

export default function Dashboard() {
  const { activeUsername } = useAppStore();
  const { data: user, isLoading, error, refetch } = useGithubUser(activeUsername);

  if (!activeUsername) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6">
        <EmptyState
          icon={User}
          title="No profile selected"
          message="Enter a GitHub username to see their developer analytics."
        >
          <SearchBar className="mt-4 max-w-sm" />
          <div className="max-w-sm w-full">
            <SearchHistory />
          </div>
        </EmptyState>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState message={`Fetching profile for @${activeUsername}...`} className="min-h-[50vh]" />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <ErrorState
          title="Profile Fetch Failed"
          message={error.message}
          onRetry={() => refetch()}
        />
        <div className="mt-6 flex flex-col items-center">
          <SearchBar className="w-full max-w-sm" />
          <div className="max-w-sm w-full">
            <SearchHistory />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Analytics for <span className="font-medium text-foreground">@{user.login}</span>
        </p>
      </div>

      <Separator />

      {/* Stats grid (Placeholders for Phase 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Repositories', icon: <FolderGit2 className="h-4 w-4" /> },
          { label: 'Total Stars', icon: <Star className="h-4 w-4" /> },
          { label: 'Total Forks', icon: <GitFork className="h-4 w-4" /> },
          { label: 'Languages', icon: <Code2 className="h-4 w-4" /> },
        ].map((stat) => (
          <StatCard key={stat.label} label={stat.label} icon={stat.icon}>
            <Skeleton className="h-7 w-16 mt-2" />
          </StatCard>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile overview */}
        <div className="lg:col-span-1">
          <UserProfileCard user={user} />
        </div>

        {/* Repositories */}
        <div className="lg:col-span-2">
          <RepoGrid username={activeUsername} />
        </div>
      </div>

      {/* Analytics row placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Language analytics placeholder */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Language Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center border rounded-md bg-muted/20 border-dashed">
              <p className="text-sm text-muted-foreground">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Stars/forks analytics placeholder */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Stars & Forks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center border rounded-md bg-muted/20 border-dashed">
              <p className="text-sm text-muted-foreground">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
