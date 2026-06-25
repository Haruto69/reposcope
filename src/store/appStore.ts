import { create } from 'zustand';
import { getLocalStorageItem, setLocalStorageItem } from '@/hooks/useLocalStorage';
import type { BookmarkedUser, BookmarkedRepo, RecentSearch } from '@/api/githubTypes';

interface AppState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: RecentSearch[];
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Bookmarked Users
  bookmarkedUsers: BookmarkedUser[];
  addBookmarkedUser: (user: BookmarkedUser) => void;
  removeBookmarkedUser: (login: string) => void;
  isUserBookmarked: (login: string) => boolean;

  // Bookmarked Repos
  bookmarkedRepos: BookmarkedRepo[];
  addBookmarkedRepo: (repo: BookmarkedRepo) => void;
  removeBookmarkedRepo: (fullName: string) => void;
  isRepoBookmarked: (fullName: string) => boolean;

  // Active username for dashboard
  activeUsername: string | null;
  setActiveUsername: (username: string | null) => void;
}

// Migration for recent searches if they were just strings
const getMigratedRecentSearches = (): RecentSearch[] => {
  const raw = getLocalStorageItem<any[]>('reposcope-recent-searches', []);
  return raw.map(item => {
    if (typeof item === 'string') {
      return { username: item, searched_at: new Date().toISOString() };
    }
    return item as RecentSearch;
  });
};

export const useAppStore = create<AppState>((set, get) => ({
  // Theme
  theme: getLocalStorageItem<'light' | 'dark' | 'system'>('reposcope-theme', 'dark'),
  setTheme: (theme) => {
    set({ theme });
    setLocalStorageItem('reposcope-theme', theme);
    applyTheme(theme);
  },

  // Sidebar
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  recentSearches: getMigratedRecentSearches(),
  addRecentSearch: (query) => {
    const current = get().recentSearches.filter((s) => s.username.toLowerCase() !== query.toLowerCase());
    const updated = [{ username: query, searched_at: new Date().toISOString() }, ...current].slice(0, 10);
    set({ recentSearches: updated });
    setLocalStorageItem('reposcope-recent-searches', updated);
  },
  removeRecentSearch: (query) => {
    const updated = get().recentSearches.filter((s) => s.username.toLowerCase() !== query.toLowerCase());
    set({ recentSearches: updated });
    setLocalStorageItem('reposcope-recent-searches', updated);
  },
  clearRecentSearches: () => {
    set({ recentSearches: [] });
    setLocalStorageItem('reposcope-recent-searches', []);
  },

  // Bookmarked Users
  bookmarkedUsers: getLocalStorageItem<BookmarkedUser[]>('reposcope-bookmarked-users', []),
  addBookmarkedUser: (user) => {
    if (get().isUserBookmarked(user.login)) return;
    const updated = [...get().bookmarkedUsers, user];
    set({ bookmarkedUsers: updated });
    setLocalStorageItem('reposcope-bookmarked-users', updated);
  },
  removeBookmarkedUser: (login) => {
    const updated = get().bookmarkedUsers.filter((u) => u.login !== login);
    set({ bookmarkedUsers: updated });
    setLocalStorageItem('reposcope-bookmarked-users', updated);
  },
  isUserBookmarked: (login) => get().bookmarkedUsers.some((u) => u.login === login),

  // Bookmarked Repos
  bookmarkedRepos: getLocalStorageItem<BookmarkedRepo[]>('reposcope-bookmarked-repos', []),
  addBookmarkedRepo: (repo) => {
    if (get().isRepoBookmarked(repo.full_name)) return;
    const updated = [...get().bookmarkedRepos, repo];
    set({ bookmarkedRepos: updated });
    setLocalStorageItem('reposcope-bookmarked-repos', updated);
  },
  removeBookmarkedRepo: (fullName) => {
    const updated = get().bookmarkedRepos.filter((r) => r.full_name !== fullName);
    set({ bookmarkedRepos: updated });
    setLocalStorageItem('reposcope-bookmarked-repos', updated);
  },
  isRepoBookmarked: (fullName) => get().bookmarkedRepos.some((r) => r.full_name === fullName),

  // Active username
  activeUsername: null,
  setActiveUsername: (username) => set({ activeUsername: username }),
}));

// Apply theme to the document
function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.add(prefersDark ? 'dark' : 'light');
  } else {
    root.classList.add(theme);
  }
}

// Initialize theme on load
export function initializeTheme() {
  const theme = getLocalStorageItem<'light' | 'dark' | 'system'>('reposcope-theme', 'dark');
  applyTheme(theme);
}
