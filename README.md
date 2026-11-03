# A Little World Called Us ❤️

> *"Made with love, a little madness, and way too many memories."*  
> **For:** Shuttumani❤️🫶🏻😘  
> **From:** Sundramani❤️🫶🏻😘  

A bespoke, production-ready interactive birthday experience built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and Supabase.

---

## 🌟 The 15 Chapters Experience

1. **The Secret Invitation (`ChapterInvitation`)**: Wax seal envelope opening animation, suspicious button teasing, music cue.
2. **The Welcome Letter (`ChapterWelcomeLetter`)**: Personal typed bestie letter with gradual reveal and playful side notes.
3. **Sky Full of Wishes (`ChapterSkyWishes`)**: Night sky interactive lantern & star release with personalized wishes and glow effects.
4. **The Memory Museum (`ChapterMemoryMuseum`)**: Full curated photo museum with Polaroid frames, lightboxes, filtering, swipe gestures, and favoriting.
5. **100 Little Reasons (`ChapterLittleReasons`)**: Flip cards and list view containing 100 genuine reasons, randomizer, and favorites counter.
6. **The Bestie Interrogation (`ChapterBestieQuiz`)**: 15 custom questions with instant playful reactions, score tally, category analysis, and review.
7. **Who Is More Likely To? (`ChapterMoreLikely`)**: Side-by-side teasing comparison cards with custom dynamic banter.
8. **This or That (`ChapterThisOrThat`)**: Rapid-fire split decision cards with summary percentage match.
9. **Friendship Time Capsule (`ChapterTimeCapsule`)**: Autosaving prompts, secret message, server submission with instant JSON/txt fallback download.
10. **Open Whenever You Need It (`ChapterOpenWhenever`)**: 6 virtual envelope letters for different moods (e.g. "When you miss me", "When you're angry", etc.).
11. **The Birthday Cake (`ChapterBirthdayCake`)**: 3D styled cake with interactive blowing out candles, sparkles, and celebration.
12. **Mini-Game Arcade (`ChapterMiniArcade`)**: 3 playable mobile-friendly arcade games (Catch the Hearts, Bestie Memory Match, Mystery Gift Box).
13. **The Compliment Machine (`ChapterComplimentMachine`)**: Retro sparkle machine dispensing unlimited personalized hype and compliments.
14. **The Final Letter (`ChapterFinalLetter`)**: Starry night backdrop, deep emotional personal letter with glowing signature.
15. **The Final Surprise (`ChapterFinalSurprise`)**: Ribbon-wrapped gift box unboxing, final message, confetti storm, and replay options.

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(In demo mode without Supabase, the app runs smoothly with offline fallback and placeholders.)*

### 3. Run Dev Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔐 Supabase Backend & Private Photo Storage

1. **Database & Storage Setup**: Run `supabase/schema.sql` in your Supabase SQL Editor.
2. **Deploy Functions**:
   ```bash
   supabase functions deploy verify-access --no-verify-jwt
   supabase functions deploy submit
   supabase functions deploy photo-url
   ```
3. **Set Secrets**:
   ```bash
   supabase secrets set BIRTHDAY_ACCESS_CODE="your-passcode"
   supabase secrets set ALLOWED_ORIGIN="https://your-domain.vercel.app"
   ```
4. **Photos**:
   Upload photos to the private `birthday-photos` bucket in Supabase Storage (`thumbs/` and `originals/`).

---

## 🚢 Deployment to Vercel

1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variable:
   - `VITE_SUPABASE_FUNCTIONS_URL`: `https://<your-project-ref>.supabase.co/functions/v1`
4. Deploy!
