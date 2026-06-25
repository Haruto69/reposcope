import { Card } from '@/components/ui/card';
import { formatNumber } from '@/utils/formatNumber';
import type { GitHubUser, UserAnalytics } from '@/api/githubTypes';

interface CompareTableProps {
  userA: GitHubUser;
  analyticsA: UserAnalytics;
  userB: GitHubUser;
  analyticsB: UserAnalytics;
}

export function CompareTable({ userA, analyticsA, userB, analyticsB }: CompareTableProps) {
  const rows = [
    { label: 'Followers', valA: formatNumber(userA.followers), valB: formatNumber(userB.followers) },
    { label: 'Following', valA: formatNumber(userA.following), valB: formatNumber(userB.following) },
    { label: 'Public Repos', valA: userA.public_repos, valB: userB.public_repos },
    { label: 'Public Gists', valA: userA.public_gists, valB: userB.public_gists },
    { label: 'Total Stars', valA: formatNumber(analyticsA.totalStars), valB: formatNumber(analyticsB.totalStars) },
    { label: 'Total Forks', valA: formatNumber(analyticsA.totalForks), valB: formatNumber(analyticsB.totalForks) },
    { label: 'Open Issues', valA: formatNumber(analyticsA.totalOpenIssues), valB: formatNumber(analyticsB.totalOpenIssues) },
    { label: 'Unique Languages', valA: Object.keys(analyticsA.languages).length, valB: Object.keys(analyticsB.languages).length },
    { label: 'Most Used Language', valA: analyticsA.mostUsedLanguage, valB: analyticsB.mostUsedLanguage },
    { label: 'Most Starred Repo', valA: analyticsA.topReposByStars[0]?.name || 'N/A', valB: analyticsB.topReposByStars[0]?.name || 'N/A' },
    { label: 'Most Forked Repo', valA: analyticsA.topReposByForks[0]?.name || 'N/A', valB: analyticsB.topReposByForks[0]?.name || 'N/A' },
    { label: 'Recently Updated Repo', valA: analyticsA.lastActiveDate ? new Date(analyticsA.lastActiveDate).toLocaleDateString() : 'N/A', valB: analyticsB.lastActiveDate ? new Date(analyticsB.lastActiveDate).toLocaleDateString() : 'N/A' },
  ];

  return (
    <Card className="bg-card/50 overflow-hidden h-full">
      <div className="overflow-x-auto h-full">
        <table className="w-full text-sm text-left border-collapse min-w-[500px]">
          <thead className="bg-muted/50 text-muted-foreground border-b border-border/50">
            <tr>
              <th className="px-4 py-3 font-medium w-1/3">Metric</th>
              <th className="px-4 py-3 font-medium w-1/3 truncate text-center">@{userA.login}</th>
              <th className="px-4 py-3 font-medium w-1/3 truncate text-center">@{userB.login}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium text-muted-foreground">{row.label}</td>
                <td className="px-4 py-3 text-center">{row.valA}</td>
                <td className="px-4 py-3 text-center">{row.valB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
