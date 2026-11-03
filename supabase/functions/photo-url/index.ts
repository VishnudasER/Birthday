// ============================================================
// Edge Function: photo-url
// GET /functions/v1/photo-url?photoId=<id>&type=<thumb|original>
// Headers: Authorization: Bearer <session_token>
//
// Returns: { url: string, expiresAt: string }
//
// Deploy: supabase functions deploy photo-url
// ============================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') ?? '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// URL lifetime: 60 minutes
const SIGNED_URL_EXPIRES_IN = 3600;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Verify auth header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
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

  // Verify user token
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return new Response(JSON.stringify({ error: 'Invalid or expired session.' }), {
      status: 401,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Parse query params
  const url = new URL(req.url);
  const photoId = url.searchParams.get('photoId');
  const type = url.searchParams.get('type') ?? 'thumb';

  if (!photoId || !/^[a-zA-Z0-9_-]+$/.test(photoId)) {
    return new Response(JSON.stringify({ error: 'Invalid or missing photoId' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Bucket name can be configured or defaults to 'birthday-photos'
  const bucketName = Deno.env.get('PHOTOS_BUCKET_NAME') ?? 'birthday-photos';
  
  // Storage structure:
  // type === 'thumb' -> `thumbs/${photoId}.jpg` (or `${photoId}-thumb.jpg` / fallback to `${photoId}.jpg`)
  // type === 'original' -> `originals/${photoId}.jpg` (or `${photoId}.jpg`)
  const filePath = type === 'thumb' ? `thumbs/${photoId}.jpg` : `originals/${photoId}.jpg`;

  // Generate signed URL
  let { data, error } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(filePath, SIGNED_URL_EXPIRES_IN);

  // If subfolder doesn't exist, try root path `${photoId}.jpg`
  if (error || !data?.signedUrl) {
    const fallbackPath = `${photoId}.jpg`;
    const fallback = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fallbackPath, SIGNED_URL_EXPIRES_IN);
    
    if (fallback.error || !fallback.data?.signedUrl) {
      return new Response(
        JSON.stringify({ error: 'Photo not found in storage bucket.' }),
        { status: 404, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }
    data = fallback.data;
  }

  const expiresAt = new Date(Date.now() + SIGNED_URL_EXPIRES_IN * 1000).toISOString();

  return new Response(
    JSON.stringify({ url: data.signedUrl, expiresAt }),
    { status: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
  );
});
