import React, { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

// مكون للتحكم في الصوت مع رسوم متحركة جذابة
export const AudioPlayer = ({ audioUrl, onComplete, children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [audioUrl],
      html5: true,
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
        if (onComplete) onComplete();
      },
      onplay: () => {
        requestAnimationFrame(updateProgress);
      }
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [audioUrl, onComplete]);

  const updateProgress = () => {
    if (soundRef.current && isPlaying) {
      const seek = soundRef.current.seek();
      const duration = soundRef.current.duration();
      setProgress((seek / duration) * 100);
      requestAnimationFrame(updateProgress);
    }
  };

  const togglePlay = () => {
    if (!isPlaying) {
      soundRef.current.play();
      setIsPlaying(true);
    } else {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110
            ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {children}
      </div>

      {isPlaying && (
        <div className="absolute -top-4 -right-4 animate-bounce">
          <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold bg-yellow-400 text-yellow-900 rounded-full">
            🎵 جاري التشغيل
          </span>
        </div>
      )}
    </div>
  );
};
