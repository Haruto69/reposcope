import axios from 'axios';
import type { GitHubUser, GitHubRepo, LanguageStats } from './githubTypes';

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

// Set auth token if available
export function setGithubToken(token: string) {
  githubClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Remove auth token
export function clearGithubToken() {
  delete githubClient.defaults.headers.common['Authorization'];
}

// Fetch a GitHub user profile
export async function fetchGithubUser(username: string): Promise<GitHubUser> {
  const { data } = await githubClient.get<GitHubUser>(`/users/${username}`);
  return data;
}

// Fetch repositories for a GitHub user
export async function fetchGithubRepos(
  username: string,
  page = 1,
  perPage = 30,
  sort: 'stars' | 'updated' | 'pushed' | 'full_name' = 'updated'
): Promise<GitHubRepo[]> {
  const { data } = await githubClient.get<GitHubRepo[]>(
    `/users/${username}/repos`,
    {
      params: {
        page,
        per_page: perPage,
        sort,
        direction: 'desc',
      },
    }
  );
  return data;
}

// Fetch languages for a specific repo
export async function fetchRepoLanguages(
  owner: string,
  repo: string
): Promise<LanguageStats> {
  const { data } = await githubClient.get<LanguageStats>(
    `/repos/${owner}/${repo}/languages`
  );
  return data;
}

export { githubClient };
