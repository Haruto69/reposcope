import { ArrowDownUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import type { SortField, SortDirection } from '@/utils/sortRepos';

interface RepoSortDropdownProps {
  sortField: SortField;
  setSortField: (val: SortField) => void;
  sortDirection: SortDirection;
  setSortDirection: (val: SortDirection) => void;
}

export function RepoSortDropdown({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}: RepoSortDropdownProps) {
  const options: { label: string; value: SortField }[] = [
    { label: 'Most Stars', value: 'stars' },
    { label: 'Most Forks', value: 'forks' },
    { label: 'Recently Updated', value: 'updated' },
    { label: 'Name', value: 'name' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 gap-2 shrink-0">
          <ArrowDownUp className="h-4 w-4" />
          <span className="hidden sm:inline">Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setSortField(opt.value)}
            className="flex items-center justify-between"
          >
            {opt.label}
            {sortField === opt.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Order</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setSortDirection('desc')} className="flex items-center justify-between">
          Descending
          {sortDirection === 'desc' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortDirection('asc')} className="flex items-center justify-between">
          Ascending
          {sortDirection === 'asc' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
