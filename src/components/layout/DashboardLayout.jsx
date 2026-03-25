import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-auto
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header setMobileMenuOpen={setMobileMenuOpen} mobileMenuOpen={mobileMenuOpen} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 lg:p-8 scroll-smooth">
          <div className="mx-auto max-w-7xl animate-slide-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
