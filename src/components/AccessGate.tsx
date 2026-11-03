// ============================================================
// AccessGate — access-code gate (server-verified)
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Heart } from 'lucide-react';
import { verifyAccessCode } from '@/lib/api';
import { config } from '@/data/config';
import { ButterflyField, SparkleField } from './Butterfly';
import { playBackgroundMusic } from '@/lib/soundtrack';

interface AccessGateProps {
  onAuthorized: () => void;
}

export function AccessGate({ onAuthorized }: AccessGateProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || loading) return;
    setLoading(true);
    setError(null);

    const result = await verifyAccessCode(code.trim());
    setLoading(false);

    if (result.authorized) {
      playBackgroundMusic().catch(() => {});
      onAuthorized();
    } else {
      setError(result.error ?? 'Hmm, that code doesn\'t seem right. Try again! 🥺');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      setCode('');
    }
  };

  return (
    <div
      className="min-h-dvh flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fff0f5 0%, #fde8f0 30%, #f9f0ff 60%, #fff5f0 100%)',
      }}
    >
      <ButterflyField />
      <SparkleField />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="glass paper rounded-3xl p-8 shadow-2xl text-center"
          style={{ border: '1px solid rgba(249,213,229,0.8)' }}
        >
          {/* Wax seal */}
          <motion.div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-2xl"
            style={{
              background: 'linear-gradient(135deg, #e8667a 0%, #7d1f3c 100%)',
              boxShadow: '0 4px 20px rgba(232,102,122,0.5)',
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Lock size={24} />
          </motion.div>

          <h1
            className="font-signature text-4xl mb-2"
            style={{ color: '#7d1f3c' }}
          >
            {config.projectName}
          </h1>

          <p
            className="font-hand text-lg mb-1"
            style={{ color: '#c94d63' }}
          >
            {config.tagline}
          </p>

          <p className="text-sm text-rose-400 mb-8 font-sans">
            {config.accessCodeHint}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              animate={shaking ? { x: [-6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the secret code ✨"
                maxLength={64}
                className="w-full px-5 py-3.5 rounded-2xl text-center font-hand text-lg tracking-widest border-2 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  borderColor: error ? '#e8667a' : 'rgba(249,213,229,0.8)',
                  color: '#3d1a26',
                }}
                autoComplete="off"
                spellCheck={false}
                aria-label="Secret access code"
                aria-describedby={error ? 'access-error' : undefined}
              />
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.p
                  id="access-error"
                  role="alert"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-sm text-rose-500 font-hand"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="btn-primary w-full justify-center"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles size={16} />
                  </motion.div>
                  Checking...
                </>
              ) : (
                <>
                  <Heart size={16} />
                  Open My Surprise 💌
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-rose-300 mt-6 font-sans">
            Made with love by{' '}
            <span className="font-hand text-rose-500 text-sm">{config.creator.displayName}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
