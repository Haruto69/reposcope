import { Settings2, Palette, Bell, Shield, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';

export default function Settings() {
  const { theme, setTheme, clearRecentSearches } = useAppStore();

  const settingsSections = [
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of the application.',
      content: (
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <Button
              key={t}
              variant={theme === t ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme(t)}
              className="capitalize"
            >
              {t}
            </Button>
          ))}
        </div>
      ),
    },
    {
      icon: Database,
      title: 'Data & Storage',
      description: 'Manage cached data and search history.',
      content: (
        <Button variant="outline" size="sm" onClick={clearRecentSearches}>
          Clear Search History
        </Button>
      ),
    },
    {
      icon: Shield,
      title: 'API Configuration',
      description: 'Configure your GitHub API token for higher rate limits.',
      content: (
        <p className="text-xs text-muted-foreground">
          Token configuration will be available in a future update.
        </p>
      ),
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage notification preferences.',
      content: (
        <p className="text-xs text-muted-foreground">
          Notification settings will be available in a future update.
        </p>
      ),
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings2 className="h-6 w-6" />
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your application preferences
        </p>
      </div>

      <Separator />

      {/* Settings sections */}
      <div className="grid gap-4 max-w-2xl">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {section.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {section.description}
                </CardDescription>
              </CardHeader>
              <CardContent>{section.content}</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
