// GitHub API type definitions

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  topics: string[];
  visibility: string;
  archived: boolean;
  disabled: boolean;
  license: {
    key: string;
    name: string;
    spdx_id: string;
  } | null;
}

export interface LanguageStats {
  [language: string]: number;
}

export interface UserAnalytics {
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  totalOpenIssues: number;
  totalRepos: number;
  languages: LanguageStats;
  topReposByStars: GitHubRepo[];
  topReposByForks: GitHubRepo[];
  averageStars: number;
  averageForks: number;
  mostUsedLanguage: string;
  accountAge: number;
  reposPerYear: number;
  lastActiveDate: string | null;
}

export interface ReadmeResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string; // Base64 encoded
  encoding: string;
}

export interface BookmarkedUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  saved_at: string;
}

export interface BookmarkedRepo {
  id: number;
  name: string;
  full_name: string;
  owner_login: string;
  owner_avatar: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  saved_at: string;
}

export interface RecentSearch {
  username: string;
  searched_at: string;
}
