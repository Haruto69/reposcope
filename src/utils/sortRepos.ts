import type { GitHubRepo } from '@/api/githubTypes';

export type SortField = 'stars' | 'forks' | 'updated' | 'name' | 'size' | 'issues';
export type SortDirection = 'asc' | 'desc';

/**
 * Sort a list of GitHub repositories by a given field and direction.
 */
export function sortRepos(
  repos: GitHubRepo[],
  field: SortField = 'stars',
  direction: SortDirection = 'desc'
): GitHubRepo[] {
  const sorted = [...repos].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'stars':
        comparison = a.stargazers_count - b.stargazers_count;
        break;
      case 'forks':
        comparison = a.forks_count - b.forks_count;
        break;
      case 'updated':
        comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'size':
        comparison = a.size - b.size;
        break;
      case 'issues':
        comparison = a.open_issues_count - b.open_issues_count;
        break;
    }

    return direction === 'desc' ? -comparison : comparison;
  });

  return sorted;
}

/**
 * Filter repos by language.
 */
export function filterReposByLanguage(
  repos: GitHubRepo[],
  language: string | null
): GitHubRepo[] {
  if (!language) return repos;
  return repos.filter((repo) => repo.language === language);
}

/**
 * Filter repos by search term (name or description).
 */
export function filterReposBySearch(
  repos: GitHubRepo[],
  searchTerm: string
): GitHubRepo[] {
  if (!searchTerm.trim()) return repos;
  const term = searchTerm.toLowerCase();
  return repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(term) ||
      (repo.description && repo.description.toLowerCase().includes(term))
  );
}
