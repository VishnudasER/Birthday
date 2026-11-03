// ============================================================
// API client — Frontend-first architecture for Git & Vercel hosting
// Secure client-side gate with shuttumani051199 and local responses persistence
// ============================================================
import type {
  SubmissionPayload,
  SubmissionResponse,
  AccessCheckResponse,
} from '@/types';
import { safeLocalGet, safeLocalSet, safeLocalRemove } from '@/lib/utils';
import { saveTimeCapsuleResponses, saveQuizResponses } from '@/lib/responsesStore';

const SESSION_STORAGE_KEY = 'birthday_auth_session';
const SECRET_ACCESS_CODE = 'shuttumani051199';

// ── Session token persistence ─
let _sessionToken: string | null = safeLocalGet<string | null>(SESSION_STORAGE_KEY, null);

export function setSessionToken(token: string) {
  _sessionToken = token;
  safeLocalSet(SESSION_STORAGE_KEY, token);
}

export function clearSessionToken() {
  _sessionToken = null;
  safeLocalRemove(SESSION_STORAGE_KEY);
}

export function hasSession(): boolean {
  if (_sessionToken) return true;
  const stored = safeLocalGet<string | null>(SESSION_STORAGE_KEY, null);
  if (stored) {
    _sessionToken = stored;
    return true;
  }
  return false;
}

// ── Access gate: verify secret code ───────────────────────
export async function verifyAccessCode(
  code: string
): Promise<AccessCheckResponse> {
  const cleanCode = code.trim().toLowerCase();

  if (cleanCode === SECRET_ACCESS_CODE) {
    const token = `auth_shuttumani_${Date.now()}`;
    setSessionToken(token);
    return { authorized: true, sessionToken: token };
  }

  return {
    authorized: false,
    error: "Hmm, that code doesn't seem right. Try again! 🥺",
  };
}

// ── Submit quiz or time capsule (frontend-only, zero backend dependencies) ──
export async function submitData(
  payload: SubmissionPayload
): Promise<SubmissionResponse> {
  try {
    const submissionId = `SUB-${Date.now().toString(36).toUpperCase()}`;

    if (payload.submissionType === 'timecapsule') {
      saveTimeCapsuleResponses(payload.answers);
    } else if (payload.submissionType === 'quiz') {
      saveQuizResponses(
        payload.answers,
        payload.score,
        payload.percentage,
        payload.totalFactual
      );
    }

    return {
      success: true,
      submissionId,
    };
  } catch (err) {
    console.error('[Storage] Error saving submission:', err);
    return {
      success: false,
      error: 'Could not save responses locally. Please try again.',
    };
  }
}
