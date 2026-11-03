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
    audioElement = new Audio('/audio/arz-kiya-hai.m4a');
    audioElement.loop = true;
    audioElement.preload = 'auto';

    audioElement.addEventListener('play', () => {
      isPlaying = true;
      notifyListeners();
    });

    audioElement.addEventListener('pause', () => {
      // Only set isPlaying false if audio was explicitly paused or ended
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
  return audio.play().then(() => {
    isPlaying = true;
    notifyListeners();
  }).catch((err) => {
    // Autoplay was blocked by browser policy until user gesture
    console.debug('[Soundtrack] Autoplay blocked, waiting for user gesture:', err);
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

  // If music is currently enabled and playing, user wants to MUTE it (turn OFF)
  if (isMusicEnabled && !audio.paused) {
    isMusicEnabled = false;
    audio.pause();
    isPlaying = false;
    notifyListeners();
    return false;
  } else {
    // If music was muted or paused by browser autoplay restriction, user wants to PLAY it (turn ON)
    isMusicEnabled = true;
    audio.play().then(() => {
      isPlaying = true;
      notifyListeners();
    }).catch(console.warn);
    isPlaying = true;
    notifyListeners();
    return true;
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

  // Try playing immediately (works if browser allows, e.g. after previous interactions or relaxed autoplay)
  playBackgroundMusic().catch(() => {});

  // On first user touch or click anywhere, start playing
  const onUserGesture = () => {
    const audio = getSoundtrackAudio();
    if (audio && isMusicEnabled) {
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

