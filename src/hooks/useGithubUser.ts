import { useQuery } from '@tanstack/react-query';
import { fetchGithubUser } from '@/api/githubApi';
import type { GitHubUser } from '@/api/githubTypes';
import { isRetryableGithubError } from '@/utils/apiError';

/**
 * Hook to fetch a GitHub user profile using TanStack Query.
 */
export function useGithubUser(username: string | null) {
  return useQuery<GitHubUser, Error>({
    queryKey: ['github-user', username],
    queryFn: () => fetchGithubUser(username!),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (!isRetryableGithubError(error)) return false;
      return failureCount < 2;
    },
  });
}
