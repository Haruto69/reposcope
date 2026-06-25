import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  GitCompare,
  Bookmark,
  Settings,
  ChevronLeft,
  Telescope,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/compare', label: 'Compare', icon: GitCompare },
  { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col border-r border-border bg-card/50 transition-all duration-300 ease-in-out',
        sidebarOpen ? 'w-56' : 'w-16'
      )}
    >
      {/* Logo area */}
      <div className={cn('flex items-center h-14 px-4 border-b border-border', sidebarOpen ? 'gap-2' : 'justify-center')}>
        <Telescope className="h-5 w-5 text-primary shrink-0" />
        {sidebarOpen && (
          <span className="font-semibold text-sm tracking-tight truncate">
            RepoScope
          </span>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return sidebarOpen ? (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            ) : (
              <Tooltip key={item.to}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-center rounded-md p-2 transition-colors',
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Toggle button */}
      <div className="p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn('w-full h-8', !sidebarOpen && 'rotate-180')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}
