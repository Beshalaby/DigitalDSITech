'use client';

import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a maximum loading time of 1.5 seconds
    const maxLoadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Also try to load critical resources
    const handleLoad = () => {
      const criticalImages = Array.from(document.getElementsByTagName('img')).filter(
        img => img.dataset.priority === 'true'
      );
      
      if (criticalImages.length === 0) {
        setIsLoading(false);
        return;
      }

      Promise.all(
        criticalImages.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      )
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    window.addEventListener('DOMContentLoaded', handleLoad);
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(maxLoadingTime);
      window.removeEventListener('DOMContentLoaded', handleLoad);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300">
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="w-4 h-4 bg-blue-500 rounded-sm"
            style={{
              animation: `cubeAnimation 1.2s ease-in-out infinite`,
              animationDelay: `${index * 0.15}s`,
              transformOrigin: 'center center',
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes cubeAnimation {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: scale(1.2) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.3;
          }
          75% {
            transform: scale(0.8) rotate(270deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen; 