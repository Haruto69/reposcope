import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { useNavigate } from 'react-router-dom';

export function SearchHistory() {
  const { recentSearches, addRecentSearch, setActiveUsername, setSearchQuery } = useAppStore();
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
        {recentSearches.map((username) => (
          <Button
            key={username}
            variant="secondary"
            size="sm"
            onClick={() => handleSearch(username)}
            className="rounded-full px-4"
          >
            {username}
          </Button>
        ))}
      </div>
    </div>
  );
}
