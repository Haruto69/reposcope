import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { GitHubUser, UserAnalytics } from '@/api/githubTypes';

interface ComparisonSummaryProps {
  userA: GitHubUser;
  analyticsA: UserAnalytics;
  userB: GitHubUser;
  analyticsB: UserAnalytics;
}

export function ComparisonSummary({ userA, analyticsA, userB, analyticsB }: ComparisonSummaryProps) {
  const getRepoComparison = () => {
    if (userA.public_repos > userB.public_repos) return `@${userA.login} has more public repositories`;
    if (userB.public_repos > userA.public_repos) return `@${userB.login} has more public repositories`;
    return 'Both have an equal number of public repositories';
  };

  const starSentence = analyticsA.totalStars > analyticsB.totalStars 
    ? `@${userA.login} shows higher total stars` 
    : analyticsB.totalStars > analyticsA.totalStars 
      ? `@${userB.login} shows higher total stars`
      : 'both show similar total stars';

  const getLanguageComparison = () => {
    if (analyticsA.mostUsedLanguage === analyticsB.mostUsedLanguage && analyticsA.mostUsedLanguage !== 'N/A') {
      return `Both developers primarily use ${analyticsA.mostUsedLanguage}.`;
    }
    return `@${userA.login} primarily uses ${analyticsA.mostUsedLanguage}, while @${userB.login} mostly works in ${analyticsB.mostUsedLanguage}.`;
  };

  const getActivityComparison = () => {
    if (!analyticsA.lastActiveDate || !analyticsB.lastActiveDate) return '';
    const dateA = new Date(analyticsA.lastActiveDate).getTime();
    const dateB = new Date(analyticsB.lastActiveDate).getTime();
    
    if (dateA > dateB) return `@${userA.login} appears more recently active based on public repository update dates.`;
    if (dateB > dateA) return `@${userB.login} appears more recently active based on public repository update dates.`;
    return '';
  };

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
          <li>{getRepoComparison()}, while {starSentence} across fetched repositories.</li>
          <li>{getLanguageComparison()}</li>
          {getActivityComparison() && <li>{getActivityComparison()}</li>}
        </ul>
      </CardContent>
    </Card>
  );
}
