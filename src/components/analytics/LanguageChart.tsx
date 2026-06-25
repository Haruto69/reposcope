import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Code2 } from 'lucide-react';
import type { LanguageStats } from '@/api/githubTypes';

interface LanguageChartProps {
  languages: LanguageStats;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#64748b'];

export function LanguageChart({ languages }: LanguageChartProps) {
  const data = Object.entries(languages)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8); // top 8 languages for readability

  if (data.length === 0) {
    return (
      <Card className="bg-card/50 h-full">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Language Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-sm text-muted-foreground">
          No language data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 h-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          Language Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`${value} repos`, 'Count']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
