import { TopRepos } from '@/components/analytics/TopRepos';
import type { GitHubUser, UserAnalytics } from '@/api/githubTypes';

interface CompareTopReposProps {
  userA: GitHubUser;
  analyticsA: UserAnalytics;
  userB: GitHubUser;
  analyticsB: UserAnalytics;
}

export function CompareTopRepos({ userA, analyticsA, userB, analyticsB }: CompareTopReposProps) {
  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-bold tracking-tight">Top Repositories</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            @{userA.login}'s Top Repos
          </h4>
          <TopRepos repos={analyticsA.topReposByStars} />
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            @{userB.login}'s Top Repos
          </h4>
          <TopRepos repos={analyticsB.topReposByStars} />
        </div>
      </div>
    </div>
  );
}
