import { useState } from 'react';
import { GitCompare } from 'lucide-react';
import { useGithubUser } from '@/hooks/useGithubUser';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { calculateAnalytics } from '@/utils/calculateAnalytics';
import { CompareSearch } from '@/components/compare/CompareSearch';
import { CompareTable } from '@/components/compare/CompareTable';
import { CompareChart } from '@/components/compare/CompareChart';
import { ComparisonSummary } from '@/components/compare/ComparisonSummary';
import { CompareProfileCard } from '@/components/compare/CompareProfileCard';
import { CompareTopRepos } from '@/components/compare/CompareTopRepos';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Separator } from '@/components/ui/separator';

export default function Compare() {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  
  const [activeA, setActiveA] = useState('');
  const [activeB, setActiveB] = useState('');

  const { data: userA, isLoading: loadUserA, error: errUserA } = useGithubUser(activeA);
  const { data: userB, isLoading: loadUserB, error: errUserB } = useGithubUser(activeB);

  const { data: reposA, isLoading: loadReposA } = useGithubRepos(activeA, 1, 100, 'updated');
  const { data: reposB, isLoading: loadReposB } = useGithubRepos(activeB, 1, 100, 'updated');

  const isComparing = !!activeA || !!activeB;
  const isLoading = (!!activeA && loadUserA) || (!!activeB && loadUserB) || (!!activeA && loadReposA) || (!!activeB && loadReposB);

  const handleCompare = () => {
    if (inputA && inputB) {
      setActiveA(inputA);
      setActiveB(inputB);
    }
  };

  const handleClear = () => {
    setInputA('');
    setInputB('');
    setActiveA('');
    setActiveB('');
  };

  const handleSwap = () => {
    setInputA(inputB);
    setInputB(inputA);
    if (isComparing) {
      setActiveA(activeB);
      setActiveB(activeA);
    }
  };

  const renderContent = () => {
    if (!isComparing) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <GitCompare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Ready to compare</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Enter two GitHub usernames above and click Compare to see a
            side-by-side analysis of their profiles.
          </p>
        </div>
      );
    }

    if (isLoading) {
      return <LoadingState message="Fetching profiles and repositories for comparison..." className="py-24" />;
    }

    if (errUserA && errUserB) {
      return (
        <div className="py-12">
           <ErrorState title="Comparison Failed" message="Both GitHub users could not be found." />
        </div>
      );
    }

    const analyticsA = reposA ? calculateAnalytics(reposA) : null;
    const analyticsB = reposB ? calculateAnalytics(reposB) : null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
             {errUserA ? (
               <ErrorState title="User Not Found" message={`Could not find user @${activeA}`} />
             ) : userA ? (
               <CompareProfileCard user={userA} />
             ) : null}
          </div>
          <div>
             {errUserB ? (
               <ErrorState title="User Not Found" message={`Could not find user @${activeB}`} />
             ) : userB ? (
               <CompareProfileCard user={userB} />
             ) : null}
          </div>
        </div>

        {userA && userB && analyticsA && analyticsB && (
          <div className="space-y-6">
            <ComparisonSummary userA={userA} analyticsA={analyticsA} userB={userB} analyticsB={analyticsB} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-1">
                <CompareChart userA={userA} analyticsA={analyticsA} userB={userB} analyticsB={analyticsB} />
              </div>
              <div className="lg:col-span-1">
                <CompareTable userA={userA} analyticsA={analyticsA} userB={userB} analyticsB={analyticsB} />
              </div>
            </div>

            <CompareTopRepos userA={userA} analyticsA={analyticsA} userB={userB} analyticsB={analyticsB} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Compare Developers</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compare two GitHub profiles side by side
        </p>
      </div>

      <Separator />

      <CompareSearch 
        userA={inputA} setUserA={setInputA}
        userB={inputB} setUserB={setInputB}
        onCompare={handleCompare}
        onClear={handleClear}
        onSwap={handleSwap}
        isComparing={isComparing}
      />

      {renderContent()}
    </div>
  );
}
