import { useQuery } from '@tanstack/react-query';
import { fetchGithubRepo } from '@/api/githubApi';
import type { GitHubRepo } from '@/api/githubTypes';

export function useGithubRepoDetails(owner: string | undefined, repo: string | undefined) {
  return useQuery<GitHubRepo, Error>({
    queryKey: ['github-repo', owner, repo],
    queryFn: () => fetchGithubRepo(owner!, repo!),
    enabled: !!owner && !!repo,
    staleTime: 5 * 60 * 1000,
  });
}
