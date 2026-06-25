import type { GitHubRepo, LanguageStats, UserAnalytics } from '@/api/githubTypes';

/**
 * Calculate analytics from a list of GitHub repos.
 */
export function calculateAnalytics(repos: GitHubRepo[]): UserAnalytics {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
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

  // Sort repos by stars for top repos
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  const averageStars = totalRepos > 0 ? Math.round(totalStars / totalRepos) : 0;
  const averageForks = totalRepos > 0 ? Math.round(totalForks / totalRepos) : 0;

  // Calculate account age from first repo creation
  const dates = repos.map((r) => new Date(r.created_at).getTime());
  const oldestDate = dates.length > 0 ? Math.min(...dates) : Date.now();
  const accountAge = Math.floor(
    (Date.now() - oldestDate) / (1000 * 60 * 60 * 24 * 365)
  );

  const reposPerYear = accountAge > 0 ? Math.round(totalRepos / accountAge) : totalRepos;

  return {
    totalStars,
    totalForks,
    totalRepos,
    languages,
    topRepos,
    averageStars,
    averageForks,
    mostUsedLanguage,
    accountAge,
    reposPerYear,
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
