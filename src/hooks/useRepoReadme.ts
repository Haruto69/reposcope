import { useQuery } from '@tanstack/react-query';
import { fetchRepoReadme } from '@/api/githubApi';
import type { ReadmeResponse } from '@/api/githubTypes';

export function useRepoReadme(owner: string | undefined, repo: string | undefined) {
  return useQuery<ReadmeResponse | null, Error>({
    queryKey: ['github-repo-readme', owner, repo],
    queryFn: () => fetchRepoReadme(owner!, repo!),
    enabled: !!owner && !!repo,
    staleTime: 5 * 60 * 1000,
  });
}
