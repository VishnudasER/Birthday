// ============================================================
// AccessGate — access-code gate (username & password verified)
// Username: shuttumani
// Password: shuttumani051199
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Heart, User } from 'lucide-react';
import { verifyAccessCredentials, SECRET_USERNAME } from '@/lib/api';
import { config } from '@/data/config';
import { ButterflyField, SparkleField } from './Butterfly';
import { playBackgroundMusic } from '@/lib/soundtrack';
import { recordGateUnlock } from '@/lib/responsesStore';

interface AccessGateProps {
  onAuthorized: () => void;
}

export function AccessGate({ onAuthorized }: AccessGateProps) {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim();
    const cleanCode = code.trim();
    if (!cleanUser || !cleanCode || loading) return;

    // Trigger audio synchronously on user submit gesture so mobile Safari allows playback
    if (
      cleanUser.toLowerCase() === SECRET_USERNAME &&
      cleanCode.toLowerCase() === 'shuttumani051199'
    ) {
      playBackgroundMusic().catch(() => {});
    }

    setLoading(true);
    setError(null);

    const result = await verifyAccessCredentials(cleanUser, cleanCode);
    setLoading(false);

    if (result.authorized) {
      recordGateUnlock(cleanCode, cleanUser);
      playBackgroundMusic().catch(() => {});
      onAuthorized();
    } else {
      setError(result.error ?? 'Hmm, credentials don\'t seem right. Try again! 🥺');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div
      className="min-h-dvh flex items-center justify-center relative overflow-hidden py-10"
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
          className="glass paper rounded-3xl p-7 sm:p-8 shadow-2xl text-center"
          style={{ border: '1px solid rgba(249,213,229,0.8)' }}
        >
          {/* Wax seal */}
          <motion.div
            className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center text-white text-2xl"
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
            className="font-signature text-4xl mb-1.5"
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

          <p className="text-xs text-rose-400 mb-6 font-sans">
            Only for birthday girl <strong>Shuttumani</strong> 💕
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
            <motion.div
              animate={shaking ? { x: [-6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {/* Username Field */}
              <div>
                <label className="block text-xs font-hand font-bold text-rose-800 mb-1 pl-1">
                  Username
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 pointer-events-none" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username (shuttumani)"
                    maxLength={32}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl font-hand text-base border-2 outline-none transition-all placeholder:text-stone-300"
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      borderColor: error ? '#e8667a' : 'rgba(249,213,229,0.8)',
                      color: '#3d1a26',
                    }}
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="username"
                    spellCheck={false}
                    aria-label="Username"
                  />
                </div>
              </div>

              {/* Password / Secret Code Field */}
              <div>
                <label className="block text-xs font-hand font-bold text-rose-800 mb-1 pl-1">
                  Secret Birthday Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 pointer-events-none" />
                  <input
                    type="password"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter password code ✨"
                    maxLength={64}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl font-hand text-base tracking-wider border-2 outline-none transition-all placeholder:text-stone-300"
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      borderColor: error ? '#e8667a' : 'rgba(249,213,229,0.8)',
                      color: '#3d1a26',
                    }}
                    autoComplete="current-password"
                    spellCheck={false}
                    aria-label="Secret password code"
                    aria-describedby={error ? 'access-error' : undefined}
                  />
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.p
                  id="access-error"
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-xs text-rose-600 font-hand text-center pt-1"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading || !username.trim() || !code.trim()}
              className="btn-primary w-full justify-center mt-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles size={16} />
                  </motion.div>
                  <span>Checking credentials...</span>
                </>
              ) : (
                <>
                  <Heart size={16} />
                  <span>Open My Surprise 💌</span>
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-rose-300 mt-5 font-sans">
            Made with love by{' '}
            <span className="font-hand text-rose-500 text-sm">{config.creator.displayName}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
