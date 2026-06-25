import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { GitHubUser, UserAnalytics } from '@/api/githubTypes';

interface CompareChartProps {
  userA: GitHubUser;
  analyticsA: UserAnalytics;
  userB: GitHubUser;
  analyticsB: UserAnalytics;
}

export function CompareChart({ userA, analyticsA, userB, analyticsB }: CompareChartProps) {
  const data = [
    {
      metric: 'Followers',
      [userA.login]: userA.followers,
      [userB.login]: userB.followers,
    },
    {
      metric: 'Public Repos',
      [userA.login]: userA.public_repos,
      [userB.login]: userB.public_repos,
    },
    {
      metric: 'Total Stars',
      [userA.login]: analyticsA.totalStars,
      [userB.login]: analyticsB.totalStars,
    },
    {
      metric: 'Total Forks',
      [userA.login]: analyticsA.totalForks,
      [userB.login]: analyticsB.totalForks,
    },
    {
      metric: 'Unique Languages',
      [userA.login]: Object.keys(analyticsA.languages).length,
      [userB.login]: Object.keys(analyticsB.languages).length,
    },
  ];

  return (
    <Card className="bg-card/50 h-full">
      <CardHeader>
        <CardTitle className="text-base">Metrics Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="metric" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} dy={10} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey={userA.login} fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey={userB.login} fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
