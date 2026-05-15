'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset when navigation completes (pathname changes)
  useEffect(() => {
    setIsNavigating(false);
    setProgress(100);
    const timer = setTimeout(() => setProgress(0), 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Listen for clicks on links to start progress immediately
  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        try {
          const url = new URL(link.href);
          // Only for internal navigation to different paths
          if (url.origin === window.location.origin && url.pathname !== pathname) {
            // Start loading immediately
            setIsNavigating(true);
            setProgress(30);
            
            // Animate progress
            progressInterval = setInterval(() => {
              setProgress((prev) => {
                if (prev >= 85) {
                  if (progressInterval) clearInterval(progressInterval);
                  return 85;
                }
                return prev + Math.random() * 15;
              });
            }, 150);
          }
        } catch {
          // Invalid URL, ignore
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    
    return () => {
      document.removeEventListener('click', handleClick, true);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [pathname]);

  if (!isNavigating && progress === 0) return null;

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-amber-100/50">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg shadow-amber-500/50 transition-all ease-out"
          style={{
            width: `${progress}%`,
            opacity: progress === 100 ? 0 : 1,
            transitionDuration: progress === 100 ? '150ms' : '200ms',
          }}
        />
      </div>
      
      {/* Loading overlay for instant feedback */}
      {isNavigating && progress < 100 && (
        <div className="fixed inset-0 z-[60] bg-white/30 backdrop-blur-[1px] pointer-events-none transition-opacity duration-150" />
      )}
    </>
  );
}
