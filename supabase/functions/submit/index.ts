// ============================================================
// Edge Function: submit
// POST /functions/v1/submit
// Headers: Authorization: Bearer <session_token>
// Body: QuizSubmissionPayload | TimeCapsuleSubmissionPayload
//
// Returns: { success: boolean, submissionId?: string, error?: string }
//
// Deploy: supabase functions deploy submit
// ============================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') ?? '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Max field lengths
const MAX_ANSWER_LENGTH = 2000;
const MAX_ANSWERS = 20;

function sanitiseString(s: unknown): string {
  if (typeof s !== 'string') return '';
  return s.slice(0, MAX_ANSWER_LENGTH).trim();
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Verify session token
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }
  const token = authHeader.slice(7);

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Verify the token by getting the user
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid or expired session.' }), {
      status: 401,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid request body.' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const submissionType = body.submissionType;
  if (submissionType !== 'quiz' && submissionType !== 'timecapsule') {
    return new Response(JSON.stringify({ success: false, error: 'Invalid submission type.' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const sessionId = sanitiseString(body.sessionId).slice(0, 64);
  if (!sessionId) {
    return new Response(JSON.stringify({ success: false, error: 'Missing sessionId.' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  if (submissionType === 'timecapsule') {
    // Validate time capsule answers
    const rawAnswers = Array.isArray(body.answers) ? body.answers : [];
    if (rawAnswers.length > MAX_ANSWERS) {
      return new Response(JSON.stringify({ success: false, error: 'Too many answers.' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const answers = rawAnswers
      .filter((a): a is Record<string, unknown> => typeof a === 'object' && a !== null)
      .map((a) => ({
        promptId: sanitiseString(a.promptId).slice(0, 32),
        answer: sanitiseString(a.answer),
      }))
      .filter((a) => a.promptId && a.answer);

    const { data, error } = await supabase
      .from('timecapsule_submissions')
      .insert({
        user_id: user.id,
        session_id: sessionId,
        answers,
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Insert error:', error);
      return new Response(JSON.stringify({ success: false, error: 'Could not save your answers. Please try again.' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, submissionId: data.id }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  if (submissionType === 'quiz') {
    const rawAnswers = Array.isArray(body.answers) ? body.answers : [];
    if (rawAnswers.length > MAX_ANSWERS) {
      return new Response(JSON.stringify({ success: false, error: 'Too many answers.' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const answers = rawAnswers
      .filter((a): a is Record<string, unknown> => typeof a === 'object' && a !== null)
      .map((a) => ({
        questionId: sanitiseString(a.questionId).slice(0, 32),
        selectedIndex: typeof a.selectedIndex === 'number' ? Math.floor(a.selectedIndex) : 0,
        isCorrect: typeof a.isCorrect === 'boolean' ? a.isCorrect : null,
      }));

    // NOTE: Browser-computed scores are stored as-is but marked unverified.
    // For verified scoring, re-evaluate against the question bank here.
    const clientScore = typeof body.score === 'number' ? Math.floor(body.score) : 0;
    const clientPercent = typeof body.percentage === 'number' ? Math.floor(body.percentage) : 0;

    const { data, error } = await supabase
      .from('quiz_submissions')
      .insert({
        user_id: user.id,
        session_id: sessionId,
        answers,
        client_score: clientScore,
        client_percentage: clientPercent,
        score_verified: false, // mark as browser-computed
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Insert error:', error);
      return new Response(JSON.stringify({ success: false, error: 'Could not save quiz results.' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, submissionId: data.id }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: false, error: 'Unhandled submission type.' }), {
    status: 400,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
});
