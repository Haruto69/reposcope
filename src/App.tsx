import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppLayout } from '@/components/layout/AppLayout';
import { lazy, Suspense } from 'react';
import { LoadingState } from '@/components/common/LoadingState';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Compare = lazy(() => import('@/pages/Compare'));
const Bookmarks = lazy(() => import('@/pages/Bookmarks'));
const Settings = lazy(() => import('@/pages/Settings'));
const RepoDetails = lazy(() => import('@/pages/RepoDetails'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <BrowserRouter>
          <Suspense fallback={<LoadingState message="Loading page..." />}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="compare" element={<Compare />} />
                <Route path="bookmarks" element={<Bookmarks />} />
                <Route path="settings" element={<Settings />} />
                <Route path="repo/:owner/:name" element={<RepoDetails />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
