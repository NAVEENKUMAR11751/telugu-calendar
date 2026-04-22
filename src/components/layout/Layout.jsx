import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useStore } from '../../store/useStore';

const Layout = () => {
  const { theme, language } = useStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle setting appropriate font global class if needed
  useEffect(() => {
    if (language === 'tel') {
      document.body.style.fontFamily = 'var(--font-telugu)';
    } else {
      document.body.style.fontFamily = 'var(--font-sans)';
    }
  }, [language]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background overlay accent gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--color-saffron)] to-transparent opacity-5 pointer-events-none -translate-y-1/2"></div>
      
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 z-10 relative">
        <Outlet />
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-secondary glass">
         {language === 'eng' ? `© ${new Date().getFullYear()} Hindu Calendar App - Premium UI Base` : `© ${new Date().getFullYear()} హిందూ క్యాలెండర్ యాప్`}
      </footer>
    </div>
  );
};

export default Layout;
