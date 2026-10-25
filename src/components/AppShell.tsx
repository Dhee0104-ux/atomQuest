import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { DemoController } from './DemoController';
import { useData } from '../context/DataContext';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isVideoMode } = useData();

  useEffect(() => {
    if (isVideoMode) {
      document.body.classList.add('video-mode-active');
    } else {
      document.body.classList.remove('video-mode-active');
    }
    return () => {
      document.body.classList.remove('video-mode-active');
    };
  }, [isVideoMode]);

  return (
    <div className={`min-h-screen flex flex-col ${isVideoMode ? 'w-[1920px] h-[1080px] overflow-hidden bg-slate-50' : ''}`}>
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6" id="main-content">
        {children}
      </main>
      {!isVideoMode && <Footer />}
      <DemoController />
    </div>
  );
};
