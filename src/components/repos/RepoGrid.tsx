import { useState, useMemo } from 'react';
import { FolderGit2, SearchX } from 'lucide-react';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { RepoCard } from './RepoCard';
import { RepoFilters } from './RepoFilters';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { sortRepos, filterReposBySearch, filterReposByLanguage, type SortField, type SortDirection } from '@/utils/sortRepos';
import { getUniqueLanguages } from '@/utils/calculateAnalytics';

interface RepoGridProps {
  username: string;
}

export function RepoGrid({ username }: RepoGridProps) {
  // Use perPage = 100 as requested for Phase 3
  const { data: repos, isLoading, error, refetch } = useGithubRepos(username, 1, 100);

  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('updated');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const availableLanguages = useMemo(() => {
    if (!repos) return [];
    return getUniqueLanguages(repos);
  }, [repos]);

  const filteredAndSortedRepos = useMemo(() => {
    if (!repos) return [];
    
    let result = [...repos];
    
    if (searchTerm) {
      result = filterReposBySearch(result, searchTerm);
    }
    
    if (languageFilter !== 'all') {
      result = filterReposByLanguage(result, languageFilter);
    }
    
    result = sortRepos(result, sortField, sortDirection);
    
    return result;
  }, [repos, searchTerm, languageFilter, sortField, sortDirection]);

  if (isLoading) {
    return (
      <div className="py-12 border rounded-lg bg-card/30">
        <LoadingState message="Loading repositories..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 border rounded-lg bg-card/30">
        <ErrorState 
          title="Failed to load repositories" 
          message={error.message} 
          onRetry={() => refetch()} 
        />
      </div>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <div className="py-12 border rounded-lg bg-card/30">
        <EmptyState
          icon={FolderGit2}
          title="No repositories found"
          message={`@${username} doesn't have any public repositories yet.`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <FolderGit2 className="h-5 w-5" />
            Repositories
          </h2>
          <Badge variant="secondary" className="px-2 py-0.5">
            {repos.length} total
          </Badge>
        </div>
        
        <RepoFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
          sortField={sortField}
          setSortField={setSortField}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          availableLanguages={availableLanguages}
        />
      </div>

      {filteredAndSortedRepos.length === 0 ? (
        <div className="py-12 border rounded-lg bg-card/30">
          <EmptyState
            icon={SearchX}
            title="No matches found"
            message="We couldn't find any repositories matching your current filters."
          >
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setLanguageFilter('all');
              }}
            >
              Clear filters
            </Button>
          </EmptyState>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground font-medium px-1">
            Showing {filteredAndSortedRepos.length} result{filteredAndSortedRepos.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAndSortedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
