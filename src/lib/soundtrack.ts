// ============================================================
// soundtrack.ts — Global audio manager for "Arz Kiya Hai"
// Ensures instant 1-click play/pause, reliable autoplay on first tap,
// and zero desync between audio element and UI state
// ============================================================

type Listener = (playing: boolean) => void;
const listeners = new Set<Listener>();

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;
let userGestureAttached = false;

function notifyListeners() {
  listeners.forEach((fn) => fn(isPlaying));
}

export function getSoundtrackAudio(): HTMLAudioElement {
  if (typeof window === 'undefined') {
    return null as unknown as HTMLAudioElement;
  }

  if (!audioElement) {
    audioElement = new Audio('/audio/arz-kiya-hai.m4a');
    audioElement.loop = true;
    audioElement.preload = 'auto';

    audioElement.addEventListener('play', () => {
      isPlaying = true;
      notifyListeners();
    });

    audioElement.addEventListener('pause', () => {
      isPlaying = false;
      notifyListeners();
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

  return audio.play().then(() => {
    isPlaying = true;
    notifyListeners();
  }).catch((err) => {
    // Autoplay was blocked by browser policy until user gesture
    console.warn('[Soundtrack] Autoplay blocked, waiting for user gesture:', err);
  });
}

export function pauseBackgroundMusic() {
  const audio = getSoundtrackAudio();
  if (!audio) return;
  audio.pause();
  isPlaying = false;
  notifyListeners();
}

export function toggleBackgroundMusic(): boolean {
  const audio = getSoundtrackAudio();
  if (!audio) return false;

  // Always check REAL audio state (.paused) to avoid 2-click desync
  if (audio.paused) {
    audio.play().then(() => {
      isPlaying = true;
      notifyListeners();
    }).catch(console.warn);
    return true;
  } else {
    audio.pause();
    isPlaying = false;
    notifyListeners();
    return false;
  }
}

export function isBackgroundMusicPlaying(): boolean {
  if (!audioElement) return false;
  return !audioElement.paused;
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

  // Try playing immediately (works if browser allows, e.g. after previous interactions or relaxed autoplay)
  playBackgroundMusic().catch(() => {});

  // On first user touch or click anywhere, start playing
  const onUserGesture = () => {
    const audio = getSoundtrackAudio();
    if (audio) {
      if (!audio.paused) {
        removeGestureListeners();
        return;
      }
      audio.play().then(() => {
        isPlaying = true;
        notifyListeners();
        removeGestureListeners();
      }).catch((err) => {
        // Will retry on next interaction (e.g. touchend or form submit)
        console.debug('[Soundtrack] Play deferred until explicit tap:', err);
      });
    }
  };

  function removeGestureListeners() {
    window.removeEventListener('click', onUserGesture, true);
    window.removeEventListener('touchstart', onUserGesture, true);
    window.removeEventListener('touchend', onUserGesture, true);
    window.removeEventListener('pointerdown', onUserGesture, true);
  }

  window.addEventListener('click', onUserGesture, true);
  window.addEventListener('touchstart', onUserGesture, true);
  window.addEventListener('touchend', onUserGesture, true);
  window.addEventListener('pointerdown', onUserGesture, true);
}

