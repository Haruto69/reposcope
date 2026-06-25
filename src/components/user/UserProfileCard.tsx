import { MapPin, Building2, Link as LinkIcon, AtSign, Calendar, ExternalLink, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatNumber';
import type { GitHubUser } from '@/api/githubTypes';

interface UserProfileCardProps {
  user: GitHubUser;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="bg-card/50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Avatar className="h-20 w-20 border-2 border-border/50">
            <AvatarImage src={user.avatar_url} alt={user.login} />
            <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1 w-full">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">{user.name || user.login}</h2>
                <p className="text-sm text-muted-foreground">@{user.login}</p>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  View Profile <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
            
            {user.bio && (
              <p className="text-sm mt-2">{user.bio}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span className="font-medium text-foreground">{user.followers}</span> followers
                <span className="mx-1">&middot;</span>
                <span className="font-medium text-foreground">{user.following}</span> following
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
          {user.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{user.location}</span>
            </div>
          )}
          {user.company && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4 shrink-0" />
              <span className="truncate">{user.company}</span>
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <LinkIcon className="h-4 w-4 shrink-0" />
              <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="truncate hover:underline hover:text-primary transition-colors">
                {user.blog}
              </a>
            </div>
          )}
          {user.twitter_username && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <AtSign className="h-4 w-4 shrink-0" />
              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="truncate hover:underline hover:text-primary transition-colors">
                @{user.twitter_username}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>Joined on {formatDate(user.created_at)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="secondary">
            {user.public_repos} Public Repos
          </Badge>
          <Badge variant="secondary">
            {user.public_gists} Public Gists
          </Badge>
        </div>
        
        <Button variant="outline" className="w-full sm:hidden mt-2" asChild>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
