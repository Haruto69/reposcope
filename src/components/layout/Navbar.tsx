import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/common/SearchBar';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useAppStore } from '@/store/appStore';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const { sidebarOpen } = useAppStore();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-4 lg:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden h-9 w-9"
        onClick={onMobileMenuToggle}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Branding (shown when sidebar is collapsed on desktop) */}
      {!sidebarOpen && (
        <div className="hidden md:flex items-center gap-2">
          <span className="font-semibold text-sm">RepoScope</span>
        </div>
      )}

      {/* Tagline */}
      <p className="hidden lg:block text-xs text-muted-foreground">
        Developer analytics from any GitHub profile
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <SearchBar compact className="max-w-xs hidden sm:flex" />

      {/* Theme toggle */}
      <ThemeToggle />
    </header>
  );
}
