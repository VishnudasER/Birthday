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

  // Single-tap foolproof logic:
  // If currently paused / silent -> 1st tap ALWAYS plays!
  if (audio.paused) {
    isMusicEnabled = true;
    isPlaying = true;
    notifyListeners();
    audio.play().catch(console.warn);
    return true;
  } else {
    // If currently playing sound -> 1st tap ALWAYS mutes!
    isMusicEnabled = false;
    isPlaying = false;
    audio.pause();
    notifyListeners();
    return false;
  }
}

export function isBackgroundMusicPlaying(): boolean {
  return isMusicEnabled;
}

export function subscribeToSoundtrack(fn: Listener): () => void {
  listeners.add(fn);
  fn(isMusicEnabled);
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

  // Try playing immediately (works if browser allows, e.g. desktop)
  audio.play().catch(() => {});

  // On first user touch or click anywhere (touchend/click are the valid gesture events on iOS Safari)
  const unlock = () => {
    if (audio.paused && isMusicEnabled) {
      audio.play().then(() => {
        isPlaying = true;
        notifyListeners();
        cleanup();
      }).catch((err) => {
        console.debug('[Soundtrack] Unlock deferred:', err);
      });
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


