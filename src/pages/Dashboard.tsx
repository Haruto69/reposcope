import { User, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/appStore';
import { EmptyState } from '@/components/common/EmptyState';
import { SearchBar } from '@/components/common/SearchBar';
import { ErrorState } from '@/components/common/ErrorState';
import { SkeletonCard } from '@/components/common/SkeletonCard';
import { useGithubUser } from '@/hooks/useGithubUser';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { UserProfileCard } from '@/components/user/UserProfileCard';
import { SearchHistory } from '@/components/user/SearchHistory';
import { RepoGrid } from '@/components/repos/RepoGrid';
import { AnalyticsSummary } from '@/components/analytics/AnalyticsSummary';
import { LanguageChart } from '@/components/analytics/LanguageChart';
import { StarsChart } from '@/components/analytics/StarsChart';
import { ForksChart } from '@/components/analytics/ForksChart';
import { TopRepos } from '@/components/analytics/TopRepos';
import { ActivitySummary } from '@/components/analytics/ActivitySummary';
import { calculateAnalytics } from '@/utils/calculateAnalytics';

export default function Dashboard() {
  const { activeUsername } = useAppStore();
  
  // Use TanStack Query hooks. 
  // Calling useGithubRepos here shares the cache with RepoGrid, avoiding duplicate network requests.
  const { data: user, isLoading: isUserLoading, error: userError, refetch: refetchUser } = useGithubUser(activeUsername);
  const { data: repos } = useGithubRepos(activeUsername, 1, 100);

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

  if (isUserLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-8 w-full max-w-7xl mx-auto">
        <div className="space-y-6">
          <SkeletonCard type="chart" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
               <SkeletonCard type="user" />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
               <SkeletonCard type="repo" />
               <SkeletonCard type="repo" />
               <SkeletonCard type="repo" />
               <SkeletonCard type="repo" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <ErrorState
          title="Profile Fetch Failed"
          message={userError.message}
          onRetry={() => refetchUser()}
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

  const analytics = repos && repos.length > 0 ? calculateAnalytics(repos) : null;

  return (
    <div className="p-4 lg:p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Analytics for <span className="font-medium text-foreground">@{user.login}</span>
        </p>
      </div>

      <Separator />

      {/* Analytics Visualizations (Top Section) */}
      {analytics && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Developer Analytics
            </h2>
          </div>
          
          <AnalyticsSummary analytics={analytics} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <LanguageChart languages={analytics.languages} />
            <StarsChart topRepos={analytics.topReposByStars} />
            <ForksChart topRepos={analytics.topReposByForks} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <ActivitySummary lastActiveDate={analytics.lastActiveDate} />
            </div>
            <div className="lg:col-span-2">
              <TopRepos repos={analytics.topReposByStars} />
            </div>
          </div>
        </div>
      )}

      {analytics && <Separator />}

      {/* Profile & Repo Grid (Bottom Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile overview */}
        <div className="lg:col-span-1 space-y-6">
          <UserProfileCard user={user} />
        </div>

        {/* Repositories */}
        <div className="lg:col-span-2">
          <RepoGrid username={activeUsername} />
        </div>
      </div>
    </div>
  );
}
