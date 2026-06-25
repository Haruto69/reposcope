import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import type { GitHubUser, GitHubRepo } from '@/api/githubTypes';

interface BookmarkButtonProps {
  itemType: 'user' | 'repo';
  user?: GitHubUser;
  repo?: GitHubRepo;
  compact?: boolean;
}

export function BookmarkButton({ itemType, user, repo, compact = false }: BookmarkButtonProps) {
  const { 
    isUserBookmarked, addBookmarkedUser, removeBookmarkedUser,
    isRepoBookmarked, addBookmarkedRepo, removeBookmarkedRepo 
  } = useAppStore();

  const isBookmarked = itemType === 'user' 
    ? user && isUserBookmarked(user.login) 
    : repo && isRepoBookmarked(repo.full_name);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (itemType === 'user' && user) {
      if (isBookmarked) {
        removeBookmarkedUser(user.login);
      } else {
        addBookmarkedUser({
          id: user.id,
          login: user.login,
          name: user.name,
          avatar_url: user.avatar_url,
          bio: user.bio,
          html_url: user.html_url,
          followers: user.followers,
          following: user.following,
          public_repos: user.public_repos,
          created_at: user.created_at,
          saved_at: new Date().toISOString()
        });
      }
    } else if (itemType === 'repo' && repo) {
      if (isBookmarked) {
        removeBookmarkedRepo(repo.full_name);
      } else {
        addBookmarkedRepo({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          owner_login: repo.owner.login,
          owner_avatar: repo.owner.avatar_url,
          description: repo.description,
          html_url: repo.html_url,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          open_issues_count: repo.open_issues_count,
          updated_at: repo.updated_at,
          saved_at: new Date().toISOString()
        });
      }
    }
  };

  if (!user && !repo) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full hover:bg-muted transition-colors shrink-0",
        compact ? "h-7 w-7" : "h-9 w-9",
        isBookmarked ? "text-primary hover:text-primary/80" : "text-muted-foreground"
      )}
      onClick={toggleBookmark}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4", isBookmarked && "fill-current")} />
    </Button>
  );
}
