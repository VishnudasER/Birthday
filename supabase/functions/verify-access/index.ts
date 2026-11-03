// ============================================================
// Edge Function: verify-access
// POST /functions/v1/verify-access
// Body: { code: string }
//
// Returns: { authorized: boolean, sessionToken?: string, error?: string }
//
// Deploy: supabase functions deploy verify-access
// ============================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') ?? '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Rate limiting (simple in-memory, replace with Upstash Redis for production)
const attemptMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attemptMap.get(ip);
  if (!entry || now > entry.resetAt) {
    attemptMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ authorized: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Rate limiting
  const clientIp = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({ authorized: false, error: 'Too many attempts. Please try again in a minute.' }),
      { status: 429, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }

  let body: { code?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ authorized: false, error: 'Invalid request body.' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const code = typeof body.code === 'string' ? body.code.trim() : '';

  // Validate input
  if (!code || code.length > 64) {
    return new Response(JSON.stringify({ authorized: false, error: 'Please enter the access code.' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Compare against server-side secret
  // ⚠️ Set BIRTHDAY_ACCESS_CODE in your Supabase project secrets:
  //    supabase secrets set BIRTHDAY_ACCESS_CODE="your-secret-code"
  const correctCode = Deno.env.get('BIRTHDAY_ACCESS_CODE');
  if (!correctCode) {
    console.error('BIRTHDAY_ACCESS_CODE not set in environment');
    return new Response(JSON.stringify({ authorized: false, error: 'Server not configured.' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Constant-time comparison (prevents timing attacks)
  const encoder = new TextEncoder();
  const codeBytes = encoder.encode(code);
  const correctBytes = encoder.encode(correctCode);
  let match = codeBytes.length === correctBytes.length;
  for (let i = 0; i < Math.max(codeBytes.length, correctBytes.length); i++) {
    if ((codeBytes[i] ?? 0) !== (correctBytes[i] ?? 0)) match = false;
  }

  if (!match) {
    return new Response(JSON.stringify({ authorized: false, error: 'Hmm, that code doesn\'t seem right. Try again! 🥺' }), {
      status: 401,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Issue a short-lived session token using Supabase anonymous auth
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.session) {
    console.error('Anonymous sign-in error:', error);
    return new Response(JSON.stringify({ authorized: false, error: 'Could not create session. Please retry.' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({ authorized: true, sessionToken: data.session.access_token }),
    { status: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
  );
});
