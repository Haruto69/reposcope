import { create } from 'zustand';
import { getLocalStorageItem, setLocalStorageItem } from '@/hooks/useLocalStorage';

interface BookmarkEntry {
  type: 'user' | 'repo';
  name: string;
  addedAt: string;
}

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
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Bookmarks
  bookmarks: BookmarkEntry[];
  addBookmark: (entry: BookmarkEntry) => void;
  removeBookmark: (name: string) => void;
  isBookmarked: (name: string) => boolean;

  // Active username for dashboard
  activeUsername: string | null;
  setActiveUsername: (username: string | null) => void;
}

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
  recentSearches: getLocalStorageItem<string[]>('reposcope-recent-searches', []),
  addRecentSearch: (query) => {
    const current = get().recentSearches.filter((s) => s !== query);
    const updated = [query, ...current].slice(0, 10);
    set({ recentSearches: updated });
    setLocalStorageItem('reposcope-recent-searches', updated);
  },
  clearRecentSearches: () => {
    set({ recentSearches: [] });
    setLocalStorageItem('reposcope-recent-searches', []);
  },

  // Bookmarks
  bookmarks: getLocalStorageItem<BookmarkEntry[]>('reposcope-bookmarks', []),
  addBookmark: (entry) => {
    const updated = [...get().bookmarks, entry];
    set({ bookmarks: updated });
    setLocalStorageItem('reposcope-bookmarks', updated);
  },
  removeBookmark: (name) => {
    const updated = get().bookmarks.filter((b) => b.name !== name);
    set({ bookmarks: updated });
    setLocalStorageItem('reposcope-bookmarks', updated);
  },
  isBookmarked: (name) => get().bookmarks.some((b) => b.name === name),

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
