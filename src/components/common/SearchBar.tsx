import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  compact?: boolean;
}

export function SearchBar({
  className,
  placeholder = 'Search GitHub username...',
  compact = false,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const { setSearchQuery, addRecentSearch, setActiveUsername } = useAppStore();
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setSearchQuery(trimmed);
    addRecentSearch(trimmed);
    setActiveUsername(trimmed);
    navigate('/dashboard');
  }, [inputValue, setSearchQuery, addRecentSearch, setActiveUsername, navigate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleClear = useCallback(() => {
    setInputValue('');
  }, []);

  return (
    <div className={cn('relative flex items-center', compact ? 'w-full' : 'w-full max-w-md', className)}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn('pl-9 pr-8 bg-background', compact ? 'h-8 text-xs' : 'h-10')}
      />
      {inputValue && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 h-full w-8 hover:bg-transparent"
          onClick={handleClear}
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
