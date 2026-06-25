import { User, ExternalLink, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppStore } from '@/store/appStore';
import { BookmarkButton } from './BookmarkButton';

import { motion } from 'framer-motion';

export function BookmarkedUsers() {
  const { bookmarkedUsers, setActiveUsername, setSearchQuery, addRecentSearch } = useAppStore();
  const navigate = useNavigate();

  if (bookmarkedUsers.length === 0) {
    return (
      <EmptyState
        icon={User}
        title="No saved profiles"
        message="When you bookmark GitHub profiles, they will appear here for quick access."
      />
    );
  }

  const handleOpenDashboard = (login: string) => {
    setSearchQuery(login);
    addRecentSearch(login);
    setActiveUsername(login);
    navigate('/dashboard');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookmarkedUsers.map((user, i) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.3) }}
          className="h-full flex"
        >
          <Card className="bg-card/50 hover:bg-card/80 transition-colors flex flex-col overflow-hidden w-full">
            <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <Avatar className="h-10 w-10 border border-border/50 shrink-0">
                <AvatarImage src={user.avatar_url} alt={user.login} />
                <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <h3 className="font-semibold truncate leading-none mb-1">{user.name || user.login}</h3>
                <p className="text-xs text-muted-foreground truncate">@{user.login}</p>
              </div>
            </div>
            <div className="shrink-0 -mt-1 -mr-1">
              <BookmarkButton itemType="user" user={user as any} compact />
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col flex-1">
            {user.bio ? (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 h-8">{user.bio}</p>
            ) : (
              <div className="h-8 mb-3" />
            )}
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 mt-auto">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{user.followers} followers</span>
              </div>
              <Badge variant="secondary" className="text-[10px] px-1.5 font-normal">
                {user.public_repos} repos
              </Badge>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-border/50">
              <Button size="sm" className="w-full text-xs h-8" onClick={() => handleOpenDashboard(user.login)}>
                Dashboard
              </Button>
              <Button size="icon" variant="outline" className="h-8 w-8 shrink-0" asChild>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" title="View on GitHub">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      ))}
    </div>
  );
}
