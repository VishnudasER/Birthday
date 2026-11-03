// ============================================================
// MusicPlayer.tsx — Minimalist sound toggle button
// Plays the uploaded song "Arz Kiya Hai" by Anuv Jain
// Only sound icon, default ON, 1-click instant toggle (no double-click bug)
// ============================================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBackgroundMusic();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? 'Mute sound' : 'Unmute sound'}
      title={isPlaying ? 'Sound ON (click to mute)' : 'Sound OFF (click to play)'}
      className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-rose-200/80 backdrop-blur-md cursor-pointer select-none"
      style={{
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
        <div className="relative flex items-center justify-center">
          <Volume2 size={20} className="animate-pulse" />
          {/* Subtle animated sound wave ping */}
          <motion.span
            className="absolute -inset-1.5 rounded-full border border-rose-300 pointer-events-none"
            animate={{ scale: [1, 1.4, 1.6], opacity: [0.8, 0.3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        </div>
      ) : (
        <VolumeX size={20} />
      )}
    </motion.button>
  );
}
