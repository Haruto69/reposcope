import { Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { useNavigate } from 'react-router-dom';

export function SearchHistory() {
  const { recentSearches, addRecentSearch, removeRecentSearch, setActiveUsername, setSearchQuery } = useAppStore();
  const navigate = useNavigate();

  if (recentSearches.length === 0) return null;

  const handleSearch = (username: string) => {
    setSearchQuery(username);
    addRecentSearch(username);
    setActiveUsername(username);
    navigate('/dashboard');
  };

  return (
    <div className="w-full mt-6 text-left">
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4" />
        Recent Searches
      </h3>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((search) => (
          <div key={search.username} className="flex items-center bg-secondary text-secondary-foreground rounded-full pl-3 pr-1 py-1 transition-colors">
            <span 
              className="text-sm font-medium cursor-pointer hover:underline mr-2"
              onClick={() => handleSearch(search.username)}
            >
              {search.username}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full hover:bg-background/20 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                removeRecentSearch(search.username);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
