import axios from 'axios';

export type ApiErrorType =
  | 'not_found'
  | 'rate_limit'
  | 'network'
  | 'server'
  | 'unknown';

export interface ParsedApiError {
  type: ApiErrorType;
  message: string;
  resetTime?: Date;
  status?: number;
  originalError?: unknown;
}

export function parseGithubError(
  error: unknown,
  context?: 'user' | 'repo' | 'readme' | 'repos'
): ParsedApiError {
  // Unwrap GithubApiError if it was thrown by our api layer
  let actualError = error;
  if (error && typeof error === 'object' && 'originalError' in error && error.originalError) {
    actualError = error.originalError;
  }

  if (axios.isAxiosError(actualError)) {
    const status = actualError.response?.status;
    const rateLimitRemaining = actualError.response?.headers['x-ratelimit-remaining'];
    const rateLimitReset = actualError.response?.headers['x-ratelimit-reset'];

    // Handle Rate Limit
    if (status === 403 && rateLimitRemaining === '0') {
      const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset, 10) * 1000) : undefined;
      return {
        type: 'rate_limit',
        message: 'GitHub API rate limit reached. Please wait and try again later.',
        resetTime,
        status,
        originalError: actualError,
      };
    }

    // Handle 404 Not Found
    if (status === 404) {
      let message = 'The requested GitHub resource was not found.';
      if (context === 'user') message = 'No GitHub user found with that username.';
      if (context === 'repo' || context === 'repos') message = 'Repository not found or no longer public.';
      if (context === 'readme') message = 'No README found for this repository.';

      return {
        type: 'not_found',
        message,
        status,
        originalError: actualError,
      };
    }

    // Handle 5xx Server Errors
    if (status && status >= 500) {
      return {
        type: 'server',
        message: 'Something went wrong while contacting GitHub.',
        status,
        originalError: actualError,
      };
    }

    // Handle Network/Offline Errors
    if (!actualError.response && actualError.code === 'ERR_NETWORK') {
      return {
        type: 'network',
        message: 'You appear to be offline or the connection failed.',
        status,
        originalError: actualError,
      };
    }

    // General API Error (e.g., 400, 422)
    return {
      type: 'unknown',
      message: actualError.response?.data?.message || 'Something unexpected happened.',
      status,
      originalError: actualError,
    };
  }

  // Non-Axios Errors
  return {
    type: 'unknown',
    message: actualError instanceof Error ? actualError.message : 'Something unexpected happened.',
    originalError: actualError,
  };
}

export function isRetryableGithubError(error: unknown): boolean {
  const parsed = parseGithubError(error);
  if (parsed.type === 'not_found') return false;
  if (parsed.type === 'rate_limit') return false;
  return true;
}
