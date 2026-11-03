# ============================================================
# Supabase Edge Functions & Backend Setup
# ============================================================

## Functions Overview
1. **verify-access** (`supabase/functions/verify-access/index.ts`):
   - Validates the secret passkey with constant-time comparison & rate-limiting.
   - Issues short-lived anonymous session JWT on success.
2. **submit** (`supabase/functions/submit/index.ts`):
   - Validates authenticated session token.
   - Sanitizes and safely inserts Quiz & Time Capsule answers into the database.
3. **photo-url** (`supabase/functions/photo-url/index.ts`):
   - Authenticates session and returns time-limited signed URLs for photos in the private `birthday-photos` bucket.

---

## Step-by-Step Deployment Guide

### 1. Database Setup
In your Supabase project's SQL Editor (or via CLI):
- Run the contents of `supabase/schema.sql`.
- This creates `quiz_submissions`, `timecapsule_submissions`, RLS policies, indexes, and the private `birthday-photos` storage bucket.

### 2. Set Project Secrets
Run the following in terminal with Supabase CLI:
```bash
supabase secrets set BIRTHDAY_ACCESS_CODE="your-passcode-for-her"
supabase secrets set ALLOWED_ORIGIN="https://your-vercel-app.vercel.app"
supabase secrets set PHOTOS_BUCKET_NAME="birthday-photos"
```

### 3. Deploy Edge Functions
```bash
supabase functions deploy verify-access --no-verify-jwt
supabase functions deploy submit
supabase functions deploy photo-url
```

### 4. Connect with Frontend
Set in your Vercel / `.env` configuration:
```env
VITE_SUPABASE_FUNCTIONS_URL=https://<your-project-ref>.supabase.co/functions/v1
```
