import { useQuery } from '@tanstack/react-query';
import { fetchGithubRepos } from '@/api/githubApi';
import type { GitHubRepo } from '@/api/githubTypes';
import { isRetryableGithubError } from '@/utils/apiError';

/**
 * Hook to fetch a GitHub user's repositories using TanStack Query.
 */
export function useGithubRepos(
  username: string | null,
  page = 1,
  perPage = 30,
  sort: 'stars' | 'updated' | 'pushed' | 'full_name' = 'updated'
) {
  return useQuery<GitHubRepo[], Error>({
    queryKey: ['github-repos', username, page, perPage, sort],
    queryFn: () => fetchGithubRepos(username!, page, perPage, sort),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (!isRetryableGithubError(error)) return false;
      return failureCount < 2;
    },
  });
}
