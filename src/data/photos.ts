// ============================================================
// Photo Manifest — add all your photos here
// ============================================================
// HOW TO ADD PHOTOS:
//  1. Upload photos to your private Supabase Storage bucket
//     under the path: photos/{id}/original.jpg
//     and thumbnails: photos/{id}/thumb.jpg
//  2. Add a new entry to the `photos` array below with a
//     stable `id` matching the folder name.
//  3. Run `npm run build` — no gallery component changes needed.
//
// CATEGORIES (customise freely):
//  'Together' | 'Adventures' | 'Silly' | 'Candid' | 'Special' | 'Food'
//
// ⚠️  Photos live in PRIVATE Supabase Storage.
//     Signed URLs are generated server-side on demand.
//     Never paste permanent public URLs here.
// ============================================================

export type PhotoCategory =
  | 'Together'
  | 'Adventures'
  | 'Silly'
  | 'Candid'
  | 'Special'
  | 'Food'
  | 'Uncategorised';

export interface Photo {
  /** Stable ID matching the Supabase Storage folder name */
  id: string;
  /** Caption shown below the photo */
  caption: string;
  /** Optional date string e.g. 'March 2024' */
  date?: string;
  /** Optional personal note from the creator */
  note?: string;
  /** Category for filtering */
  category?: PhotoCategory;
  /** Whether this is a favourite */
  favourite?: boolean;
  /** Alt text for accessibility */
  alt: string;
}

// ── Sample manifest (replace with real photos) ──────────────
// Using placeholder references — real images must be uploaded
// to Supabase Storage and the IDs must match the folder names.

export const photos: Photo[] = [
  {
    id: 'photo-001',
    caption: 'The one where we look like we have our life together 😂',
    date: 'A beautiful day',
    note: 'We absolutely did not have our life together. But we looked great.',
    category: 'Together',
    favourite: true,
    alt: 'Us together, smiling',
  },
  {
    id: 'photo-002',
    caption: 'The adventure we said would be "quick"',
    date: 'Some afternoon',
    note: 'It was not quick. We were out for hours. No regrets.',
    category: 'Adventures',
    favourite: true,
    alt: 'An adventure we went on',
  },
  {
    id: 'photo-003',
    caption: 'This is why we need a designated photographer 📸',
    category: 'Silly',
    alt: 'A silly photo of us',
  },
  {
    id: 'photo-004',
    caption: 'The candid that somehow turned out perfect',
    category: 'Candid',
    favourite: true,
    alt: 'A candid moment',
  },
  {
    id: 'photo-005',
    caption: 'Food > everything else, as always',
    category: 'Food',
    alt: 'Food we enjoyed together',
  },
  {
    id: 'photo-006',
    caption: 'A very special moment 💕',
    category: 'Special',
    favourite: true,
    alt: 'A special memory',
  },
  {
    id: 'photo-007',
    caption: "The one where we're both laughing at something I can't remember",
    category: 'Together',
    alt: 'Laughing together',
  },
  {
    id: 'photo-008',
    caption: 'Peak us energy',
    category: 'Silly',
    alt: 'Being silly together',
  },
  // ── ADD MORE PHOTOS HERE ─────────────────────────────────
  // Copy the template above for each new photo.
  // Make sure the `id` matches your Supabase Storage folder name.
];

// ── Utility helpers ──────────────────────────────────────────
export const getFavourites = () => photos.filter((p) => p.favourite);
export const getByCategory = (cat: PhotoCategory) =>
  photos.filter((p) => p.category === cat);
export const getPhotoById = (id: string) =>
  photos.find((p) => p.id === id);
export const getAllCategories = (): PhotoCategory[] => [
  ...new Set(photos.map((p) => p.category ?? 'Uncategorised')),
];
