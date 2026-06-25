import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Telescope, BarChart3, GitCompare, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/store/appStore';

export default function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { setActiveUsername, addRecentSearch } = useAppStore();

  const handleSearch = () => {
    const trimmed = username.trim();
    if (!trimmed) return;
    setActiveUsername(trimmed);
    addRecentSearch(trimmed);
    navigate('/dashboard');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

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
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
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

        {/* Search input */}
        <div className="flex w-full max-w-md gap-2">
          <Input
            type="text"
            placeholder="Enter a GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-11"
          />
          <Button onClick={handleSearch} className="h-11 px-6" disabled={!username.trim()}>
            Explore
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
