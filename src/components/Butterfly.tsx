// ============================================================
// Butterfly — animated paper butterfly ambient element
// ============================================================
import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ButterflyProps {
  delay?: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function Butterfly({ delay = 0, size = 24, color = '#e8667a', style }: ButterflyProps) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        width: size,
        height: size * 0.7,
        ...style,
      }}
      animate={{
        y: [0, -40, -20, -60, -30],
        x: [0, 20, -10, 30, 10],
        rotate: [0, 5, -5, 8, -3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: 'mirror',
        delay,
        ease: 'easeInOut',
      }}
    >
      {/* Left wing */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '48%',
          height: '100%',
          background: `radial-gradient(ellipse at 70% 50%, ${color}cc, ${color}66)`,
          borderRadius: '100% 0 0 100%',
          transformOrigin: 'right center',
        }}
        animate={{ scaleX: [1, 0.25, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay, ease: 'easeInOut' }}
      />
      {/* Right wing */}
      <motion.div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '48%',
          height: '100%',
          background: `radial-gradient(ellipse at 30% 50%, ${color}cc, ${color}66)`,
          borderRadius: '0 100% 100% 0',
          transformOrigin: 'left center',
        }}
        animate={{ scaleX: [1, 0.25, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: delay + 0.05, ease: 'easeInOut' }}
      />
      {/* Body */}
      <div
        style={{
          position: 'absolute',
          left: '46%',
          top: '10%',
          width: '8%',
          height: '80%',
          background: color,
          borderRadius: '50%',
        }}
      />
    </motion.div>
  );
}

// ── Ambient butterfly field ─────────────────────────────────
const BUTTERFLY_CONFIGS = [
  { delay: 0,   size: 28, color: '#e8667a', top: '10%', left: '8%' },
  { delay: 1.5, size: 20, color: '#d4b8e0', top: '25%', right: '12%' },
  { delay: 3,   size: 16, color: '#f0899a', top: '60%', left: '5%' },
  { delay: 2,   size: 24, color: '#b89ac8', top: '70%', right: '8%' },
  { delay: 4,   size: 18, color: '#e8667a', top: '40%', left: '92%' },
  { delay: 0.8, size: 14, color: '#d4b8e0', top: '85%', left: '20%' },
];

export function ButterflyField() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {BUTTERFLY_CONFIGS.map((cfg, i) => (
        <Butterfly
          key={i}
          delay={cfg.delay}
          size={cfg.size}
          color={cfg.color}
          style={{
            top: cfg.top,
            left: (cfg as { left?: string }).left,
            right: (cfg as { right?: string }).right,
          }}
        />
      ))}
    </div>
  );
}

// ── Floating sparkle dots ───────────────────────────────────
export function SparkleField() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      })),
    []
  );

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #e8667a 0%, transparent 100%)',
          }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
