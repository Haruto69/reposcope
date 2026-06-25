import { Telescope, BarChart3, GitCompare, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { UserSearch } from '@/components/user/UserSearch';
import { SearchHistory } from '@/components/user/SearchHistory';

export default function Home() {
  const features = [
    {
      icon: BarChart3,
      title: 'Profile Analytics',
      description: 'Deep insights into any GitHub profile with repo statistics and language breakdowns.',
    },
    {
      icon: GitCompare,
      title: 'Compare Developers',
      description: 'Side-by-side comparison of two GitHub profiles to see how they stack up.',
    },
    {
      icon: Bookmark,
      title: 'Bookmarks',
      description: 'Save your favorite profiles and repos for quick access later.',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-12">
      {/* Hero section */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl bg-primary/10 p-3">
            <Telescope className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          RepoScope
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
          Developer analytics from any GitHub profile. Explore repositories,
          languages, contributions, and more.
        </p>

        {/* Search Input and History */}
        <div className="w-full max-w-md flex flex-col items-center">
          <UserSearch />
          <SearchHistory />
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="bg-card/50 border-border/50">
              <CardContent className="pt-6">
                <div className="rounded-lg bg-muted p-2.5 w-fit mb-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
