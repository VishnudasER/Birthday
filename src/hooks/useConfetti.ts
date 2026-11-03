// ============================================================
// useConfetti — spawns animated confetti particles
// ============================================================
import { useCallback } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

const COLORS = ['#e8667a', '#d4b8e0', '#f9d5e5', '#d4a847', '#7d1f3c', '#fde8f0'];
const SHAPES = ['rect', 'circle', 'triangle'];

export function useConfetti() {
  const launch = useCallback((count = 80) => {
    if (prefersReducedMotion()) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const size = Math.random() * 10 + 6;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 2500 + 1500;
        const delay = Math.random() * 800;

        el.className = 'confetti-particle';
        el.style.cssText = `
          left: ${startX}px;
          top: -20px;
          width: ${size}px;
          height: ${shape === 'rect' ? size * 0.5 : size}px;
          background: ${color};
          border-radius: ${shape === 'circle' ? '50%' : shape === 'triangle' ? '0' : '2px'};
          clip-path: ${shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
          animation-duration: ${duration}ms;
          animation-delay: ${delay}ms;
          transform-origin: center;
        `;

        document.body.appendChild(el);
        setTimeout(() => el.remove(), duration + delay + 100);
      }, i * 15);
    }
  }, []);

  return { launch };
}
