import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookmarkedUsers } from '@/components/bookmarks/BookmarkedUsers';
import { BookmarkedRepos } from '@/components/bookmarks/BookmarkedRepos';
import { RecentSearches } from '@/components/bookmarks/RecentSearches';
import { useAppStore } from '@/store/appStore';
import { User, GitBranch, Clock } from 'lucide-react';

export default function Bookmarks() {
  const { bookmarkedUsers, bookmarkedRepos, recentSearches } = useAppStore();

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookmarks</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your saved GitHub profiles, repositories, and search history
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="profiles" className="w-full">
        <TabsList className="mb-6 h-10 w-full sm:w-auto overflow-x-auto overflow-y-hidden justify-start sm:justify-center">
          <TabsTrigger value="profiles" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Saved Profiles</span>
            {bookmarkedUsers.length > 0 && (
              <span className="ml-1.5 bg-muted-foreground/20 text-foreground text-xs py-0.5 px-2 rounded-full">
                {bookmarkedUsers.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="repos" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            <span>Saved Repos</span>
            {bookmarkedRepos.length > 0 && (
              <span className="ml-1.5 bg-muted-foreground/20 text-foreground text-xs py-0.5 px-2 rounded-full">
                {bookmarkedRepos.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="searches" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Recent Searches</span>
            {recentSearches.length > 0 && (
              <span className="ml-1.5 bg-muted-foreground/20 text-foreground text-xs py-0.5 px-2 rounded-full">
                {recentSearches.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="mt-0 outline-none">
          <BookmarkedUsers />
        </TabsContent>

        <TabsContent value="repos" className="mt-0 outline-none">
          <BookmarkedRepos />
        </TabsContent>

        <TabsContent value="searches" className="mt-0 outline-none">
          <RecentSearches />
        </TabsContent>
      </Tabs>
    </div>
  );
}
