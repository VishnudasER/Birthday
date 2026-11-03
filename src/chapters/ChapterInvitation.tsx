// ============================================================
// Chapter 1: The Secret Invitation
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { config } from '@/data/config';
import { pickRandom } from '@/lib/utils';
import { ButterflyField } from '@/components/Butterfly';
import { ChapterMemoryGrid } from '@/components/MemoryCard';
import { playBackgroundMusic } from '@/lib/soundtrack';

interface Props { onNext: () => void }

export function ChapterInvitation({ onNext }: Props) {
  const [phase, setPhase] = useState<'sealed' | 'teasing' | 'opening' | 'opened'>('sealed');
  const [teasingMsg, setTeasingMsg] = useState('');

  const handleOpen = () => {
    playBackgroundMusic().catch(() => {});
    setPhase('opening');
    setTimeout(() => { setPhase('opened'); }, 1200);
  };

  const handleSuspicious = () => {
    setTeasingMsg(pickRandom(config.invitation.teasingResponses));
    setPhase('teasing');
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden px-4 py-20"
      style={{ background: 'linear-gradient(160deg, #1a0a12 0%, #2d1020 40%, #1a1030 100%)' }}
    >
      <ButterflyField />

      {/* Stars background */}
      {Array.from({ length: 60 }, (_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
          }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{
            duration: Math.random() * 3 + 1,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {phase === 'sealed' && (
          <motion.div
            key="sealed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-lg"
          >
            {/* Glowing heart */}
            <motion.div
              className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full text-4xl"
              style={{
                background: 'radial-gradient(circle, rgba(232,102,122,0.4) 0%, transparent 70%)',
                boxShadow: '0 0 40px rgba(232,102,122,0.6)',
              }}
              animate={{ scale: [1, 1.12, 1], boxShadow: ['0 0 40px rgba(232,102,122,0.6)', '0 0 70px rgba(232,102,122,0.9)', '0 0 40px rgba(232,102,122,0.6)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ❤️
            </motion.div>

            {/* Envelope */}
            <motion.div
              className="mx-auto mb-8 relative cursor-pointer"
              style={{ width: 160, height: 120 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              onClick={handleOpen}
              aria-hidden="true"
            >
              {/* Envelope body */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{ background: 'linear-gradient(180deg, #fde8f0 0%, #fdf6ee 100%)', boxShadow: '0 8px 40px rgba(232,102,122,0.4)' }}
              />
              {/* Flap */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: '55%',
                  background: 'linear-gradient(180deg, #f9d5e5 0%, #fde8f0 100%)',
                  clipPath: 'polygon(0 0, 50% 55%, 100% 0)',
                  borderRadius: '8px 8px 0 0',
                }}
              />
              {/* Wax seal */}
              <div
                className="absolute text-xl"
                style={{
                  bottom: '20%', left: '50%', transform: 'translateX(-50%)',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e8667a, #7d1f3c)',
                  boxShadow: '0 2px 10px rgba(125,31,60,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 16,
                }}
              >
                ❤️
              </div>
              <Mail
                size={28}
                className="absolute"
                style={{ bottom: '22%', left: '50%', transform: 'translateX(-50%)', color: '#7d1f3c', opacity: 0 }}
              />
            </motion.div>

            <motion.h1
              className="font-serif text-3xl md:text-4xl text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {config.invitation.openingText}
            </motion.h1>
            <motion.p
              className="font-hand text-xl text-blush-light mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ color: '#f9d5e5' }}
            >
              {config.invitation.subText}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <button
                className="btn-primary text-base px-8 py-4"
                onClick={handleOpen}
                id="open-surprise-btn"
              >
                {config.invitation.button1}
              </button>
              <button
                className="btn-ghost text-base"
                onClick={handleSuspicious}
                id="suspicious-btn"
                style={{ borderColor: '#f9d5e5', color: '#f9d5e5' }}
              >
                {config.invitation.button2}
              </button>
            </motion.div>
          </motion.div>
        )}

        {phase === 'teasing' && (
          <motion.div
            key="teasing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-5xl mb-6">😂</div>
            <p className="font-hand text-2xl text-white mb-8">{teasingMsg}</p>
            <div className="flex gap-4 justify-center">
              <button className="btn-primary" onClick={handleOpen}>
                Okay FINE, I'll open it 💌
              </button>
              <button
                className="btn-ghost"
                onClick={handleSuspicious}
                style={{ borderColor: '#f9d5e5', color: '#f9d5e5' }}
              >
                Still suspicious 😂
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'opening' && (
          <motion.div
            key="opening"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Envelope opening animation */}
            <motion.div
              className="mx-auto relative"
              style={{ width: 200, height: 150 }}
            >
              <div
                className="absolute inset-0 rounded-xl"
                style={{ background: 'linear-gradient(180deg, #fde8f0 0%, #fdf6ee 100%)', boxShadow: '0 8px 40px rgba(232,102,122,0.4)' }}
              />
              <motion.div
                className="absolute top-0 left-0 right-0"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  height: '55%',
                  background: 'linear-gradient(180deg, #f9d5e5 0%, #fde8f0 100%)',
                  clipPath: 'polygon(0 0, 50% 55%, 100% 0)',
                  borderRadius: '8px 8px 0 0',
                  transformOrigin: 'top',
                }}
              />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: -30, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute text-3xl"
                style={{ top: '30%', left: '50%', transform: 'translateX(-50%)' }}
              >
                💌
              </motion.div>
            </motion.div>
            <motion.p
              className="font-hand text-2xl text-white mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Opening your surprise...✨
            </motion.p>
          </motion.div>
        )}

        {phase === 'opened' && (
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-center max-w-lg"
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              🎉
            </motion.div>
            <h2 className="font-signature text-5xl mb-4" style={{ color: '#f9d5e5' }}>
              Hello, beautiful!
            </h2>
            <p className="font-hand text-xl mb-2 text-white">
              Welcome to your very own little world. 🌸
            </p>
            <p className="font-hand text-lg mb-6" style={{ color: '#f9d5e5', opacity: 0.9 }}>
              15 chapters. Made just for you. By someone who thinks the world of you.
            </p>

            {/* Embedded Memory #01 */}
            <div className="w-full max-w-sm mx-auto my-4 text-left">
              <ChapterMemoryGrid chapterId={1} title="The Opening Memory ✨" subtitle="The beginning of our 15 chapters" />
            </div>

            {/* Floating hearts */}
            {Array.from({ length: 8 }, (_, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute text-xl pointer-events-none"
                style={{ left: `${10 + i * 12}%`, top: '40%' }}
                animate={{ y: [0, -120], opacity: [1, 0] }}
                transition={{ duration: 2, delay: i * 0.1, ease: 'easeOut' }}
              >
                ❤️
              </motion.span>
            ))}

            <button className="btn-primary text-lg px-10 py-4 shadow-xl" onClick={onNext}>
              Begin the journey ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
