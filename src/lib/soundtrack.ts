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
let hasStartedAudiblePlayback = false;
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
      hasStartedAudiblePlayback = true;
      isPlaying = true;
      isMusicEnabled = true;
      notifyListeners();
    });

    audioElement.addEventListener('pause', () => {
      if (!isMusicEnabled) {
        hasStartedAudiblePlayback = false;
        isPlaying = false;
        notifyListeners();
      }
    });

    audioElement.addEventListener('ended', () => {
      hasStartedAudiblePlayback = false;
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

  return audio.play().then(() => {
    hasStartedAudiblePlayback = true;
  }).catch((err) => {
    // Autoplay blocked by Safari policy. Cleanly reset element so it's ready for tap.
    audio.pause();
    hasStartedAudiblePlayback = false;
    console.debug('[Soundtrack] Autoplay blocked, primed for first tap:', err);
  });
}

export function pauseBackgroundMusic() {
  const audio = getSoundtrackAudio();
  isMusicEnabled = false;
  isPlaying = false;
  hasStartedAudiblePlayback = false;
  if (audio) {
    audio.pause();
  }
  notifyListeners();
}

export function toggleBackgroundMusic(): boolean {
  const audio = getSoundtrackAudio();
  if (!audio) return false;

  // Check if music is ACTUALLY producing sound right now:
  const isActuallyAudible = !audio.paused && audio.currentTime > 0 && hasStartedAudiblePlayback;

  if (isActuallyAudible) {
    // If music is already playing audibly -> MUTE IT (turn OFF)
    isMusicEnabled = false;
    isPlaying = false;
    hasStartedAudiblePlayback = false;
    audio.pause();
    notifyListeners();
    return false;
  } else {
    // If music is silent, blocked, or paused -> PLAY IT IMMEDIATELY (turn ON)
    isMusicEnabled = true;
    isPlaying = true;
    notifyListeners();
    audio.play().then(() => {
      hasStartedAudiblePlayback = true;
    }).catch(console.warn);
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

  const audio = getSoundtrackAudio();
  if (!audio) return;

  // Try playing immediately (works if browser allows, e.g. desktop Chrome)
  audio.play().then(() => {
    hasStartedAudiblePlayback = true;
  }).catch(() => {
    // Autoplay blocked: cleanly pause so audio.paused is strictly true
    audio.pause();
    hasStartedAudiblePlayback = false;
  });

  // On first user touch or click anywhere (touchend/click are the valid gesture events on iOS Safari)
  const unlock = () => {
    if (!hasStartedAudiblePlayback && isMusicEnabled) {
      audio.play().then(() => {
        hasStartedAudiblePlayback = true;
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


