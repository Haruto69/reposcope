import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';

export function UserSearch() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { setActiveUsername, addRecentSearch, setSearchQuery } = useAppStore();

  const handleSearch = useCallback(() => {
    const trimmed = username.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
    setActiveUsername(trimmed);
    addRecentSearch(trimmed);
    navigate('/dashboard');
  }, [username, setActiveUsername, addRecentSearch, setSearchQuery, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex w-full gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Enter a GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-12 pl-10 text-base"
        />
      </div>
      <Button 
        onClick={handleSearch} 
        className="h-12 px-6" 
        disabled={!username.trim()}
      >
        <span className="hidden sm:inline">Explore</span>
        <ArrowRight className="sm:ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
