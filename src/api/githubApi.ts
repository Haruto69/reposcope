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

// Centralized error handler
function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      throw new Error('No GitHub user found with that username.');
    }
    if (error.response?.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(error.response?.data?.message || 'An error occurred while fetching data from GitHub.');
  }
  throw error instanceof Error ? error : new Error('An unknown error occurred.');
}

// Fetch a GitHub user profile
export async function fetchGithubUser(username: string): Promise<GitHubUser> {
  try {
    const { data } = await githubClient.get<GitHubUser>(`/users/${username}`);
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

// Fetch repositories for a GitHub user
export async function fetchGithubRepos(
  username: string,
  page = 1,
  perPage = 30,
  sort: 'stars' | 'updated' | 'pushed' | 'full_name' = 'updated'
): Promise<GitHubRepo[]> {
  try {
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
  } catch (error) {
    handleApiError(error);
  }
}

// Fetch languages for a specific repo
export async function fetchRepoLanguages(
  owner: string,
  repo: string
): Promise<LanguageStats> {
  try {
    const { data } = await githubClient.get<LanguageStats>(
      `/repos/${owner}/${repo}/languages`
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

// Fetch a single GitHub repository's details
export async function fetchGithubRepo(owner: string, repo: string): Promise<GitHubRepo> {
  try {
    const { data } = await githubClient.get<GitHubRepo>(`/repos/${owner}/${repo}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Repository not found.');
    }
    handleApiError(error);
  }
}

// Fetch a repository's README
export async function fetchRepoReadme(owner: string, repo: string): Promise<any> {
  try {
    const { data } = await githubClient.get(`/repos/${owner}/${repo}/readme`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null; // README is optional
    }
    handleApiError(error);
  }
}

export { githubClient };
