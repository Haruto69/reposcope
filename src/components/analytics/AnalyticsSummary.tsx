import { Star, GitFork, BookOpen, Code2 } from 'lucide-react';
import { StatCard } from '@/components/user/StatCard';
import type { UserAnalytics } from '@/api/githubTypes';
import { formatNumber } from '@/utils/formatNumber';

interface AnalyticsSummaryProps {
  analytics: UserAnalytics;
}

export function AnalyticsSummary({ analytics }: AnalyticsSummaryProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        label="Total Stars" 
        value={formatNumber(analytics.totalStars)} 
        icon={<Star className="h-4 w-4" />} 
      />
      <StatCard 
        label="Total Forks" 
        value={formatNumber(analytics.totalForks)} 
        icon={<GitFork className="h-4 w-4" />} 
      />
      <StatCard 
        label="Total Repos" 
        value={analytics.totalRepos} 
        icon={<BookOpen className="h-4 w-4" />} 
      />
      <StatCard 
        label="Top Language" 
        value={analytics.mostUsedLanguage} 
        icon={<Code2 className="h-4 w-4" />} 
      />
    </div>
  );
}
