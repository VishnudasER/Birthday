// ============================================================
// soundtrack.ts — Global audio manager for "Arz Kiya Hai"
// Ensures instant 1-click play/pause, reliable autoplay on first tap,
// and zero desync between audio element and UI state
// ============================================================

type Listener = (playing: boolean) => void;
const listeners = new Set<Listener>();

// Default is ON (unmuted) as requested
let audioElement: HTMLAudioElement | null = null;
let isMusicEnabled = true;
let isPlaying = true;
let userGestureAttached = false;

function notifyListeners() {
  listeners.forEach((fn) => fn(isMusicEnabled && isPlaying));
}

export function getSoundtrackAudio(): HTMLAudioElement {
  if (typeof window === 'undefined') {
    return null as unknown as HTMLAudioElement;
  }

  if (!audioElement) {
    const existing = document.getElementById('soundtrack-audio') as HTMLAudioElement | null;
    audioElement = existing || new Audio('/audio/arz-kiya-hai.m4a');
    audioElement.loop = true;
    audioElement.preload = 'auto';

    audioElement.addEventListener('play', () => {
      isPlaying = true;
      isMusicEnabled = true;
      notifyListeners();
    });

    audioElement.addEventListener('pause', () => {
      if (!isMusicEnabled) {
        isPlaying = false;
        notifyListeners();
      }
    });

    audioElement.addEventListener('ended', () => {
      isPlaying = false;
      notifyListeners();
    });
  }

  return audioElement;
}

export function playBackgroundMusic(): Promise<void> {
  const audio = getSoundtrackAudio();
  if (!audio) return Promise.resolve();

  isMusicEnabled = true;
  isPlaying = true;
  notifyListeners();

  return audio.play().catch((err) => {
    console.debug('[Soundtrack] Play deferred until user touch:', err);
  });
}

export function pauseBackgroundMusic() {
  const audio = getSoundtrackAudio();
  isMusicEnabled = false;
  isPlaying = false;
  if (audio) {
    audio.pause();
  }
  notifyListeners();
}

export function toggleBackgroundMusic(): boolean {
  const audio = getSoundtrackAudio();
  if (!audio) return false;

  // Real audio state: is audio currently playing sound out loud?
  const isAudible = !audio.paused && audio.currentTime > 0;

  if (isAudible) {
    // If it's already playing sound -> click mutes it
    audio.pause();
    isPlaying = false;
    isMusicEnabled = false;
    notifyListeners();
    return false;
  } else {
    // If it's silent / paused -> click 1 ALWAYS plays sound immediately
    isMusicEnabled = true;
    isPlaying = true;
    notifyListeners();
    audio.play().catch(console.warn);
    return true;
  }
}

export function isBackgroundMusicPlaying(): boolean {
  return isPlaying;
}

export function subscribeToSoundtrack(fn: Listener): () => void {
  listeners.add(fn);
  fn(isPlaying);
  return () => {
    listeners.delete(fn);
  };
}

// Automatically attach robust user interaction listeners for mobile/desktop
export function initAutoSoundtrack() {
  if (typeof window === 'undefined' || userGestureAttached) return;
  userGestureAttached = true;

  const audio = getSoundtrackAudio();
  if (!audio) return;

  // Prime the audio buffer without triggering autoplay rejection
  audio.load();

  // On first user touch anywhere on the screen (iOS Safari compatible)
  const unlock = () => {
    if (audio.paused && isMusicEnabled) {
      audio.play().then(() => {
        isPlaying = true;
        notifyListeners();
        cleanup();
      }).catch(() => {});
    } else {
      cleanup();
    }
  };

  const cleanup = () => {
    window.removeEventListener('click', unlock, true);
    window.removeEventListener('touchend', unlock, true);
    window.removeEventListener('keydown', unlock, true);
  };

  window.addEventListener('click', unlock, true);
  window.addEventListener('touchend', unlock, true);
  window.addEventListener('keydown', unlock, true);
}


