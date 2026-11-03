// ============================================================
// MusicPlayer.tsx — Minimalist sound toggle button
// Default ON, plays Anuv Jain's "Arz Kiya Hai"
// Only sound icon, toggles on/off on click
// ============================================================
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Default ON
  const [hasStarted, setHasStarted] = useState(false);

  const startPlayback = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setHasStarted(true);
    }).catch(() => {
      // Browser autoplay policy might hold it until first user tap
    });
  }, []);

  // Attempt autoplay immediately, and also listen for first user touch/click
  useEffect(() => {
    startPlayback();

    const handleFirstGesture = () => {
      if (!hasStarted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        }).catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, [hasStarted, startPlayback]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/arz-kiya-hai.m4a"
        loop
        preload="auto"
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Minimalist Sound Icon Button (Only Sound Icon, No Name) */}
      <motion.button
        type="button"
        onClick={toggleSound}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? 'Mute sound' : 'Unmute sound'}
        title={isPlaying ? 'Sound ON (click to mute)' : 'Sound OFF (click to play)'}
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-rose-200/80 backdrop-blur-md cursor-pointer"
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
              className="absolute -inset-1 rounded-full border border-rose-300 pointer-events-none"
              animate={{ scale: [1, 1.4, 1.6], opacity: [0.8, 0.3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        ) : (
          <VolumeX size={20} />
        )}
      </motion.button>
    </>
  );
}
