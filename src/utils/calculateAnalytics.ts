import type { GitHubRepo, LanguageStats, UserAnalytics } from '@/api/githubTypes';

/**
 * Calculate analytics from a list of GitHub repos.
 */
export function calculateAnalytics(repos: GitHubRepo[]): UserAnalytics {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalWatchers = repos.reduce((sum, repo) => sum + repo.watchers_count, 0);
  const totalOpenIssues = repos.reduce((sum, repo) => sum + repo.open_issues_count, 0);
  const totalRepos = repos.length;

  // Aggregate language stats
  const languages: LanguageStats = {};
  for (const repo of repos) {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  }

  // Determine most used language
  const mostUsedLanguage =
    Object.entries(languages).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

  // Sort repos by stars
  const topReposByStars = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10);

  // Sort repos by forks
  const topReposByForks = [...repos]
    .sort((a, b) => b.forks_count - a.forks_count)
    .slice(0, 10);

  const averageStars = totalRepos > 0 ? Number((totalStars / totalRepos).toFixed(1)) : 0;
  const averageForks = totalRepos > 0 ? Number((totalForks / totalRepos).toFixed(1)) : 0;

  // Calculate account age from first repo creation
  const createdDates = repos.map((r) => new Date(r.created_at).getTime());
  const oldestDate = createdDates.length > 0 ? Math.min(...createdDates) : Date.now();
  const accountAge = Math.max(0, Math.floor((Date.now() - oldestDate) / (1000 * 60 * 60 * 24 * 365)));

  const reposPerYear = accountAge > 0 ? Math.round(totalRepos / accountAge) : totalRepos;

  // Find last active date
  const updatedDates = repos.map((r) => new Date(r.updated_at).getTime());
  const lastActiveDate = updatedDates.length > 0 ? new Date(Math.max(...updatedDates)).toISOString() : null;

  return {
    totalStars,
    totalForks,
    totalWatchers,
    totalOpenIssues,
    totalRepos,
    languages,
    topReposByStars,
    topReposByForks,
    averageStars,
    averageForks,
    mostUsedLanguage,
    accountAge,
    reposPerYear,
    lastActiveDate,
  };
}

/**
 * Get unique languages from repos.
 */
export function getUniqueLanguages(repos: GitHubRepo[]): string[] {
  const languages = new Set<string>();
  for (const repo of repos) {
    if (repo.language) {
      languages.add(repo.language);
    }
  }
  return Array.from(languages).sort();
}
