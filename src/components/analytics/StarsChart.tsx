import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { GitHubRepo } from '@/api/githubTypes';

interface StarsChartProps {
  topRepos: GitHubRepo[];
}

export function StarsChart({ topRepos }: StarsChartProps) {
  const data = topRepos
    .filter(repo => repo.stargazers_count > 0)
    .slice(0, 5)
    .map(repo => ({
      name: repo.name,
      stars: repo.stargazers_count,
    }));

  if (data.length === 0) {
    return (
      <Card className="bg-card/50 h-full">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4" />
            Most Starred Repos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-sm text-muted-foreground">
          No starred repositories yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 h-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Star className="h-4 w-4" />
          Most Starred Repos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                width={100}
              />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="stars" fill="#eab308" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
