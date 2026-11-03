// ============================================================
// MusicPlayer.tsx — Minimalist sound toggle button
// Plays the uploaded song "Arz Kiya Hai" by Anuv Jain
// Only sound icon, default ON, 1-click instant toggle (no double-click bug)
// ============================================================
import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import {
  initAutoSoundtrack,
  toggleBackgroundMusic,
  subscribeToSoundtrack,
  isBackgroundMusicPlaying,
} from '@/lib/soundtrack';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(isBackgroundMusicPlaying);

  useEffect(() => {
    initAutoSoundtrack();
    const unsubscribe = subscribeToSoundtrack((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleBackgroundMusic();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isPlaying ? 'Mute sound' : 'Unmute sound'}
      title={isPlaying ? 'Sound ON (tap to mute)' : 'Sound OFF (tap to play)'}
      className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-rose-200/80 backdrop-blur-md cursor-pointer select-none active:scale-90"
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        background: isPlaying
          ? 'linear-gradient(135deg, rgba(232, 102, 122, 0.95), rgba(201, 77, 99, 0.95))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 244, 246, 0.9))',
        color: isPlaying ? '#ffffff' : '#9ca3af',
        boxShadow: isPlaying
          ? '0 6px 20px rgba(232, 102, 122, 0.45)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {isPlaying ? (
        <div className="relative flex items-center justify-center pointer-events-none">
          <Volume2 size={22} className="animate-pulse" />
          {/* Subtle animated sound wave ping */}
          <span
            className="absolute -inset-1.5 rounded-full border border-rose-300 pointer-events-none animate-ping"
            style={{ animationDuration: '2.5s' }}
          />
        </div>
      ) : (
        <VolumeX size={22} className="pointer-events-none" />
      )}
    </button>
  );
}
