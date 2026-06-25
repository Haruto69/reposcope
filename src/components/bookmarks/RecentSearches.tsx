import { Clock, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppStore } from '@/store/appStore';
import { formatRelativeDate } from '@/utils/formatNumber';

import { motion } from 'framer-motion';

export function RecentSearches() {
  const { recentSearches, removeRecentSearch, clearRecentSearches, setActiveUsername, setSearchQuery, addRecentSearch } = useAppStore();
  const navigate = useNavigate();

  if (recentSearches.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="No recent searches"
        message="Search for a GitHub user and your history will appear here."
      />
    );
  }

  const handleSearch = (username: string) => {
    setSearchQuery(username);
    addRecentSearch(username);
    setActiveUsername(username);
    navigate('/dashboard');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Searches ({recentSearches.length}/10)
        </h3>
        <Button variant="ghost" size="sm" onClick={clearRecentSearches} className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {recentSearches.map((search, i) => (
          <motion.div
            key={search.username}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.3) }}
            className="min-w-0"
          >
            <Card className="bg-card/50 hover:bg-card/80 transition-colors cursor-pointer group min-w-0" onClick={() => handleSearch(search.username)}>
              <CardContent className="p-3 flex items-center justify-between">
                <div className="overflow-hidden">
                  <p className="font-medium text-sm truncate">@{search.username}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatRelativeDate(search.searched_at)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecentSearch(search.username);
                  }}
                  title="Remove search"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
