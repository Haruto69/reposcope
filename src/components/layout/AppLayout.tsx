import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileSidebar } from './MobileSidebar';
import { AnimatedPageWrapper } from '@/components/common/AnimatedPageWrapper';
import { ApiStatusBanner } from '@/components/common/ApiStatusBanner';

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar drawer */}
      <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMobileMenuToggle={() => setMobileOpen(true)} />
        <ApiStatusBanner />

        {/* Page content with route transitions */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <AnimatedPageWrapper key={location.pathname} className="h-full">
              <Outlet />
            </AnimatedPageWrapper>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
