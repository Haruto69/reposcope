import { cn } from '@/lib/utils';

// Specific colors for popular languages
const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500/20 text-blue-500',
  JavaScript: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  Python: 'bg-green-500/20 text-green-600 dark:text-green-400',
  Java: 'bg-red-500/20 text-red-600 dark:text-red-400',
  'C++': 'bg-pink-500/20 text-pink-600 dark:text-pink-400',
  C: 'bg-slate-500/20 text-slate-600 dark:text-slate-400',
  Ruby: 'bg-rose-500/20 text-rose-600 dark:text-rose-400',
  Go: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
  Rust: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
  HTML: 'bg-orange-600/20 text-orange-700 dark:text-orange-500',
  CSS: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
};

export function LanguageBadge({ language, className }: { language: string; className?: string }) {
  const colorClass = languageColors[language] || 'bg-muted text-muted-foreground';
  
  return (
    <div className={cn("flex items-center gap-1.5 font-medium", className)}>
      <span className={cn("h-2 w-2 rounded-full border border-current/20", colorClass.split(' ')[0])} />
      <span>{language}</span>
    </div>
  );
}
