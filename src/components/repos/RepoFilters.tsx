import { Search, X, Filter, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RepoSortDropdown } from './RepoSortDropdown';
import type { SortField, SortDirection } from '@/utils/sortRepos';

interface RepoFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  languageFilter: string;
  setLanguageFilter: (val: string) => void;
  sortField: SortField;
  setSortField: (val: SortField) => void;
  sortDirection: SortDirection;
  setSortDirection: (val: SortDirection) => void;
  availableLanguages: string[];
}

export function RepoFilters({
  searchTerm,
  setSearchTerm,
  languageFilter,
  setLanguageFilter,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  availableLanguages,
}: RepoFiltersProps) {
  const hasFilters = searchTerm || languageFilter !== 'all';

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Find a repository..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-10 w-full"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
            onClick={() => setSearchTerm('')}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 gap-2 shrink-0">
              <Filter className="h-4 w-4" />
              <span className="truncate max-w-[100px]">
                {languageFilter === 'all' ? 'Language' : languageFilter}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-72">
              <DropdownMenuItem onClick={() => setLanguageFilter('all')} className="flex items-center justify-between cursor-pointer">
                All Languages
                {languageFilter === 'all' && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguageFilter(lang)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  {lang}
                  {languageFilter === lang && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        <RepoSortDropdown
          sortField={sortField}
          setSortField={setSortField}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />

        {hasFilters && (
          <Button 
            variant="ghost" 
            className="h-10 px-3 text-xs shrink-0" 
            onClick={() => {
              setSearchTerm('');
              setLanguageFilter('all');
            }}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
