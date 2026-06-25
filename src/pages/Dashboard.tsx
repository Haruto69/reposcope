import { User, GitFork, Star, Code2, Activity, FolderGit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/appStore';
import { EmptyState } from '@/components/common/EmptyState';
import { SearchBar } from '@/components/common/SearchBar';

export default function Dashboard() {
  const { activeUsername } = useAppStore();

  if (!activeUsername) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6">
        <EmptyState
          icon={User}
          title="No profile selected"
          message="Enter a GitHub username to see their developer analytics."
        >
          <SearchBar className="mt-4 max-w-sm" />
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Analytics for <span className="font-medium text-foreground">@{activeUsername}</span>
        </p>
      </div>

      <Separator />

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Repositories', icon: FolderGit2 },
          { label: 'Total Stars', icon: Star },
          { label: 'Total Forks', icon: GitFork },
          { label: 'Languages', icon: Code2 },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-card/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <Skeleton className="h-7 w-16 mt-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile overview */}
        <Card className="lg:col-span-1 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-40" />
          </CardContent>
        </Card>

        {/* Repository list */}
        <Card className="lg:col-span-2 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FolderGit2 className="h-4 w-4" />
              Repositories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-md border border-border/50">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-64" />
                  <div className="flex gap-3">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analytics row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Language analytics */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Language Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Stars/forks analytics */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Stars & Forks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
