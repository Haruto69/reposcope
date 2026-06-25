import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function RepoDetails() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-16 text-center">
      <div className="rounded-full bg-muted p-4 mb-6">
        <Construction className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Repository Details</h1>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        Detailed repository analytics including commits, contributors,
        issues, and pull requests will be added in a future phase.
      </p>
      <Button asChild variant="outline">
        <Link to="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}
