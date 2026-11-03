// ============================================================
// chapterMemories.ts — All 23 uploaded photos distributed across 15 chapters
// Optimized for direct Vercel static deployment from /memories/
// ============================================================

export interface MemoryItem {
  id: string;
  imageSrc: string;
  chapterId: number;
  chapterTitle: string;
  tag: string;
  tagColor: string; // for pill badge style
  title: string;
  description: string;
  sundramaniNote: string;
  dateTag: string;
  stickerEmoji: string;
}

export const CHAPTER_MEMORIES: MemoryItem[] = [
  // ── Chapter 1: The Secret Invitation (1 photo) ──────────────────────────
  {
    id: 'mem-01',
    imageSrc: '/memories/memory-01.jpg',
    chapterId: 1,
    chapterTitle: 'The Secret Invitation',
    tag: '✨ The Opening Shot',
    tagColor: 'from-pink-500 to-rose-500',
    title: 'The Official Welcome to Your Tiny World',
    description: "Look at that face! That's the face of someone who doesn't know what kind of chaos is waiting for her in this birthday website.",
    sundramaniNote: 'Sundramani says: "I knew from this moment you were stuck with me forever."',
    dateTag: 'Memory #01 • The Journey Begins',
    stickerEmoji: '💌',
  },

  // ── Chapter 2: The Welcome Letter (1 photo) ─────────────────────────────
  {
    id: 'mem-02',
    imageSrc: '/memories/memory-02.jpg',
    chapterId: 2,
    chapterTitle: 'The Welcome Letter',
    tag: '👑 Main Character Energy',
    tagColor: 'from-amber-500 to-rose-500',
    title: 'Peak Shuttumani Aura',
    description: "Effortlessly iconic. Walking around like the whole world was made just to be your background aesthetic.",
    sundramaniNote: 'Sundramani says: "10/10 framing, 100/10 cuteness, 0/10 chill as always."',
    dateTag: 'Memory #02 • Iconic Vibes',
    stickerEmoji: '✨',
  },

  // ── Chapter 3: A Sky Full of Wishes (2 photos) ──────────────────────────
  {
    id: 'mem-03',
    imageSrc: '/memories/memory-03.jpg',
    chapterId: 3,
    chapterTitle: 'A Sky Full of Wishes',
    tag: '🌟 Golden Hour Glow',
    tagColor: 'from-amber-400 to-pink-500',
    title: 'When the Lighting Hit Just Right',
    description: "Every star in the sky had to take a break because you were shining way too bright in this one.",
    sundramaniNote: 'Sundramani says: "Still trying to figure out how someone can be this photogenic."',
    dateTag: 'Memory #03 • Starry Moments',
    stickerEmoji: '⭐',
  },
  {
    id: 'mem-04',
    imageSrc: '/memories/memory-04.jpg',
    chapterId: 3,
    chapterTitle: 'A Sky Full of Wishes',
    tag: '💫 Wish Granted',
    tagColor: 'from-purple-500 to-pink-500',
    title: 'A Little Slice of Magic',
    description: "If wishes were pictures, this one would definitely be at the top of the pile. Pure joy captured in one frame.",
    sundramaniNote: 'Sundramani says: "One of my absolute favourite memories of us."',
    dateTag: 'Memory #04 • Wishful Thinking',
    stickerEmoji: '🪄',
  },

  // ── Chapter 4: 100 Little Reasons (2 photos) ────────────────────────────
  {
    id: 'mem-05',
    imageSrc: '/memories/memory-05.jpg',
    chapterId: 4,
    chapterTitle: '100 Little Reasons',
    tag: '💝 Reason #42',
    tagColor: 'from-rose-500 to-pink-600',
    title: 'Because You Make Ordinary Days Feel Special',
    description: "Reason number 42 on the list of why you are my person: you bring the fun wherever you go. Even doing completely nothing feels like an event.",
    sundramaniNote: 'Sundramani says: "Look at you being adorable without even trying."',
    dateTag: 'Memory #05 • Heartstrings',
    stickerEmoji: '💖',
  },
  {
    id: 'mem-06',
    imageSrc: '/memories/memory-06.jpg',
    chapterId: 4,
    chapterTitle: '100 Little Reasons',
    tag: '🌸 Pure Sweetness',
    tagColor: 'from-pink-400 to-rose-400',
    title: 'The Smile That Solves Everything',
    description: "Literally scientifically impossible to be in a bad mood when looking at this picture.",
    sundramaniNote: 'Sundramani says: "Instant dopamine hit right here."',
    dateTag: 'Memory #06 • Soft Moments',
    stickerEmoji: '🎀',
  },

  // ── Chapter 5: The Bestie Interrogation (2 photos) ──────────────────────
  {
    id: 'mem-07',
    imageSrc: '/memories/memory-07.jpg',
    chapterId: 5,
    chapterTitle: 'The Bestie Interrogation',
    tag: '🔍 Evidence Exhibit A',
    tagColor: 'from-indigo-500 to-purple-600',
    title: 'The Face of Someone Plotting Chaos',
    description: "Interrogation Question 1: What were you thinking in this exact moment? Because it definitely involved mischief.",
    sundramaniNote: 'Sundramani says: "The judge and jury find you guilty of being iconic."',
    dateTag: 'Memory #07 • The Interrogation Files',
    stickerEmoji: '🕵️‍♀️',
  },
  {
    id: 'mem-08',
    imageSrc: '/memories/memory-08.jpg',
    chapterId: 5,
    chapterTitle: 'The Bestie Interrogation',
    tag: '😂 Caught Red Handed',
    tagColor: 'from-fuchsia-500 to-pink-500',
    title: 'Unfiltered Bestie Energy',
    description: "No script, no rehearsal, just two people living in absolute synchronicity.",
    sundramaniNote: 'Sundramani says: "You cannot deny this evidence in court."',
    dateTag: 'Memory #08 • Inculpatory Evidence',
    stickerEmoji: '📸',
  },

  // ── Chapter 6: Who Is More Likely To? (2 photos) ────────────────────────
  {
    id: 'mem-09',
    imageSrc: '/memories/memory-09.jpg',
    chapterId: 6,
    chapterTitle: 'Who Is More Likely To?',
    tag: '⚡ 100% You',
    tagColor: 'from-amber-500 to-orange-500',
    title: 'Most Likely to Start Chaos and Act Shocked',
    description: "Who is more likely to cause a scene in public and then pretend she doesn't know me? Definitely you. Exhibit right here.",
    sundramaniNote: 'Sundramani says: "You know I am right. Do not even argue."',
    dateTag: 'Memory #09 • Chaos Edition',
    stickerEmoji: '🤪',
  },
  {
    id: 'mem-10',
    imageSrc: '/memories/memory-10.jpg',
    chapterId: 6,
    chapterTitle: 'Who Is More Likely To?',
    tag: '🏆 Both Of Us',
    tagColor: 'from-rose-500 to-red-500',
    title: 'Most Likely to Share One Braincell',
    description: "When the telepathy kicks in and we both think the exact same ridiculous thing at the exact same time.",
    sundramaniNote: 'Sundramani says: "Two disasters thriving together as a unit."',
    dateTag: 'Memory #10 • The Duo Dynamic',
    stickerEmoji: '👯‍♀️',
  },

  // ── Chapter 7: This or That (2 photos) ──────────────────────────────────
  {
    id: 'mem-11',
    imageSrc: '/memories/memory-11.jpg',
    chapterId: 7,
    chapterTitle: 'This or That',
    tag: '☕ Chill Vibes',
    tagColor: 'from-teal-500 to-emerald-500',
    title: 'Option A: Soft & Cozy Comfort',
    description: "This or That: 3AM philosophical rants or cozy afternoons with iced coffee? In this photo, you are definitely giving pure cozy royalty.",
    sundramaniNote: 'Sundramani says: "The vibe here is elite and unbothered."',
    dateTag: 'Memory #11 • The Choice Is Yours',
    stickerEmoji: '☁️',
  },
  {
    id: 'mem-12',
    imageSrc: '/memories/memory-12.jpg',
    chapterId: 7,
    chapterTitle: 'This or That',
    tag: '🎉 Wild Adventure',
    tagColor: 'from-violet-500 to-pink-500',
    title: 'Option B: Spontaneous Madness',
    description: "Option B: saying 'yes' to random plans that make zero sense on paper but turn into the best stories of the year.",
    sundramaniNote: 'Sundramani says: "I would choose this adventure with you every single time."',
    dateTag: 'Memory #12 • Spontaneous High',
    stickerEmoji: '🚀',
  },

  // ── Chapter 8: Our Friendship Time Capsule (2 photos) ───────────────────
  {
    id: 'mem-13',
    imageSrc: '/memories/memory-13.jpg',
    chapterId: 8,
    chapterTitle: 'Our Friendship Time Capsule',
    tag: '🫙 Sealed for Eternity',
    tagColor: 'from-amber-600 to-yellow-500',
    title: 'Preserved Forever in the Vault',
    description: "A snapshot saved for our future selves 50 years from now when we are old and still talking trash together.",
    sundramaniNote: 'Sundramani says: "Proof that we were cool once. Very cool."',
    dateTag: 'Memory #13 • Time Capsule Treasure',
    stickerEmoji: '⏳',
  },
  {
    id: 'mem-14',
    imageSrc: '/memories/memory-14.jpg',
    chapterId: 8,
    chapterTitle: 'Our Friendship Time Capsule',
    tag: '📜 Golden Archive',
    tagColor: 'from-rose-500 to-amber-500',
    title: 'Never Let Go of This Memory',
    description: "Some moments deserve to be laminated and kept in your back pocket. This is one of them.",
    sundramaniNote: 'Sundramani says: "One of those days I wish we could hit replay on."',
    dateTag: 'Memory #14 • Core Friendship File',
    stickerEmoji: '🗝️',
  },

  // ── Chapter 9: Open Whenever You Need It (2 photos) ─────────────────────
  {
    id: 'mem-15',
    imageSrc: '/memories/memory-15.jpg',
    chapterId: 9,
    chapterTitle: 'Open Whenever You Need It',
    tag: '✉️ Open When You Need a Smile',
    tagColor: 'from-rose-400 to-pink-500',
    title: 'A Pocketful of Warmth',
    description: "Whenever you feel overwhelmed or tired, come back to this photo. Remember that you are deeply loved, wildly capable, and never alone.",
    sundramaniNote: 'Sundramani says: "Always in your corner, no matter what happens."',
    dateTag: 'Memory #15 • Comfort Envelope',
    stickerEmoji: '💌',
  },
  {
    id: 'mem-16',
    imageSrc: '/memories/memory-16.jpg',
    chapterId: 9,
    chapterTitle: 'Open Whenever You Need It',
    tag: '☀️ Instant Sunshine',
    tagColor: 'from-yellow-400 to-orange-500',
    title: 'Emergency Happy Pills',
    description: "Prescription: Stare at this photo for 10 seconds, smile, and remember that you survived 100% of your bad days.",
    sundramaniNote: 'Sundramani says: "Take two doses of this and text me immediately."',
    dateTag: 'Memory #16 • Sunshine Capsule',
    stickerEmoji: '🌻',
  },

  // ── Chapter 10: The Birthday Cake (2 photos) ────────────────────────────
  {
    id: 'mem-17',
    imageSrc: '/memories/memory-17.jpg',
    chapterId: 10,
    chapterTitle: 'The Birthday Cake',
    tag: '🎂 Candle Wish',
    tagColor: 'from-pink-500 to-rose-600',
    title: 'Making a Wish for Year 2026',
    description: "Close your eyes, blow out the candles, and let the universe do its thing. May every single thing you secretly wish for come true this year.",
    sundramaniNote: 'Sundramani says: "Don’t forget to wish for more snacks for us."',
    dateTag: 'Memory #17 • Birthday Glamour',
    stickerEmoji: '🍰',
  },
  {
    id: 'mem-18',
    imageSrc: '/memories/memory-18.jpg',
    chapterId: 10,
    chapterTitle: 'The Birthday Cake',
    tag: '🎉 Sweet Celebrations',
    tagColor: 'from-fuchsia-500 to-purple-600',
    title: 'The Party Doesn’t Start Until You Walk In',
    description: "Here's to another year of laughing until our stomachs hurt, taking questionable selfies, and hyping each other up unashamedly.",
    sundramaniNote: 'Sundramani says: "Another year hotter, wiser, and more chaotic."',
    dateTag: 'Memory #18 • Birthday Sweetness',
    stickerEmoji: '🧁',
  },

  // ── Chapter 11: The Compliment Machine (1 photo) ────────────────────────
  {
    id: 'mem-19',
    imageSrc: '/memories/memory-19.jpg',
    chapterId: 11,
    chapterTitle: 'The Compliment Machine',
    tag: '✨ Certified 10/10',
    tagColor: 'from-pink-500 to-purple-500',
    title: 'The Realest Compliment of All',
    description: "You don't need a compliment machine to tell you how incredible you are — but just in case, this photo is official documentation of you being absolute perfection.",
    sundramaniNote: 'Sundramani says: "Beauty, brains, and the best heart. Undefeated."',
    dateTag: 'Memory #19 • Flawless Frame',
    stickerEmoji: '💎',
  },

  // ── Chapter 12: Caught in 4K: Unfiltered Vault (2 photos) ────────────────
  {
    id: 'mem-20',
    imageSrc: '/memories/memory-20.jpg',
    chapterId: 12,
    chapterTitle: 'Caught in 4K: Unfiltered Vault',
    tag: '📸 Caught in 4K',
    tagColor: 'from-orange-500 to-rose-500',
    title: 'The Unfiltered Masterpiece #1',
    description: "No filters, no poses, no fake energy — just 100% genuine, authentic, beautiful real life. The photos taken when you didn't even notice are always the best ones.",
    sundramaniNote: 'Sundramani says: "Caught red-handed being effortlessly cute."',
    dateTag: 'Memory #20 • Unfiltered Rawness',
    stickerEmoji: '🎞️',
  },
  {
    id: 'mem-21',
    imageSrc: '/memories/memory-21.jpg',
    chapterId: 12,
    chapterTitle: 'Caught in 4K: Unfiltered Vault',
    tag: '🔥 Stolen Candid',
    tagColor: 'from-purple-500 to-indigo-600',
    title: 'The Unfiltered Masterpiece #2',
    description: "A candid moment between the chaos that captures your true personality better than a thousand posed portraits ever could.",
    sundramaniNote: 'Sundramani says: "This photo belongs in the Louvre, honestly."',
    dateTag: 'Memory #21 • Candid Chronicles',
    stickerEmoji: '🌟',
  },

  // ── Chapter 13: Our Golden Milestones (1 photo) ─────────────────────────
  {
    id: 'mem-22',
    imageSrc: '/memories/memory-22.jpg',
    chapterId: 13,
    chapterTitle: 'Our Golden Milestones',
    tag: '💫 Milestone Moment',
    tagColor: 'from-amber-500 to-yellow-600',
    title: 'A Chapter We Will Never Forget',
    description: "Marking one of the biggest, sweetest milestones of our story. Looking back at where we started and seeing how far we've come together makes my heart so full.",
    sundramaniNote: 'Sundramani says: "One of the proudest and happiest days ever."',
    dateTag: 'Memory #22 • Golden Chapters',
    stickerEmoji: '🏆',
  },

  // ── Chapter 14: The Final Letter (1 photo) ──────────────────────────────
  {
    id: 'mem-23',
    imageSrc: '/memories/memory-23.jpg',
    chapterId: 14,
    chapterTitle: 'The Final Letter',
    tag: '💕 Forever & Always',
    tagColor: 'from-rose-500 to-red-600',
    title: 'My Person, Always',
    description: "To the girl who has held my secrets, shared my laughter, and made this world a hundred times brighter just by walking in it. Here is my heart in one frame.",
    sundramaniNote: 'Sundramani says: "Always you. Through every chapter, every year, every madness."',
    dateTag: 'Memory #23 • The Heart of It All',
    stickerEmoji: '💖',
  },
];

export function getMemoriesForChapter(chapterId: number): MemoryItem[] {
  return CHAPTER_MEMORIES.filter((m) => m.chapterId === chapterId);
}
