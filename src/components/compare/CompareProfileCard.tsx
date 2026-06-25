import { UserProfileCard } from '@/components/user/UserProfileCard';
import type { GitHubUser } from '@/api/githubTypes';

interface CompareProfileCardProps {
  user: GitHubUser;
}

export function CompareProfileCard({ user }: CompareProfileCardProps) {
  return <UserProfileCard user={user} />;
}
