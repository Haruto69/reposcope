import { Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { EmptyState } from '@/components/common/EmptyState';
import { useAppStore } from '@/store/appStore';

export default function Bookmarks() {
  const { bookmarks } = useAppStore();

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookmarks</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your saved GitHub profiles and repositories
        </p>
      </div>

      <Separator />

      {bookmarks.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarks yet"
          message="When you bookmark GitHub users or repositories, they will appear here for quick access."
        />
      ) : (
        <div className="text-sm text-muted-foreground">
          {/* Bookmark list will be implemented in a later phase */}
          <p>Bookmark display coming soon.</p>
        </div>
      )}
    </div>
  );
}
