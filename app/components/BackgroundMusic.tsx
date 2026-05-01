'use client';

import { useEffect, useRef, useState } from 'react';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set up audio properties
    audio.loop = true;
    audio.volume = 0.3; // 30% volume by default

    // Try to autoplay on page load
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay blocked. Waiting for user interaction...');
        setIsPlaying(false);
      }
    };

    // Attempt autoplay immediately
    playAudio();

    // Also try after a short delay
    const timer = setTimeout(() => {
      if (!isPlaying) {
        playAudio();
      }
    }, 1000);

    // Handle user click to enable audio
    const handleUserInteraction = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Could not play audio');
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Error playing audio:', error);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/images/It Looks Like Love.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating music control button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-4 left-4 z-40 bg-amber-600 hover:bg-amber-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 flex items-center justify-center"
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}
