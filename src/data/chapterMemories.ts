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
    tag: '✨ Opening Shot',
    tagColor: 'from-pink-500 to-rose-500',
    title: 'The Journey Begins',
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
    tag: '💝 Little Efforts',
    tagColor: 'from-pink-500 to-rose-500',
    title: 'Every Little Effort Makes My Gift Special',
    description: "She put so much thought and effort into preparing a special gift for my sister. That's my Shuttumani, making even the smallest moments feel incredibly thoughtful.",
    sundramaniNote: 'Sundramani says: "Seeing you put so much effort into my sister\'s gift made me love you even more."',
    dateTag: 'Memory #02 • Little Efforts',
    stickerEmoji: '✨',
  },

  // ── Chapter 3: A Sky Full of Wishes (2 photos) ──────────────────────────
  {
    id: 'mem-03',
    imageSrc: '/memories/memory-03.jpg',
    chapterId: 3,
    chapterTitle: 'A Sky Full of Wishes',
    tag: '🌶️ Spicy Moments',
    tagColor: 'from-amber-500 to-orange-500',
    title: 'Good Food Tastes Better With You Around',
    description: "Nashville spicy fried chicken, a little heat, and your company. Sometimes, the simplest food dates turn into memories worth keeping forever.",
    sundramaniNote: 'Sundramani says: "That spicy chicken was amazing, but sharing that moment with you made it even better."',
    dateTag: 'Memory #03 • Spicy Moments',
    stickerEmoji: '⭐',
  },
  {
    id: 'mem-04',
    imageSrc: '/memories/memory-04.jpg',
    chapterId: 3,
    chapterTitle: 'A Sky Full of Wishes',
    tag: '🥾 Little Adventures',
    tagColor: 'from-emerald-500 to-teal-500',
    title: 'Even Tired Moments Become Beautiful With You',
    description: "Sitting on a rock, catching your breath after the trek. Even when you were tired, this little moment became another beautiful part of our adventure.",
    sundramaniNote: 'Sundramani says: "You might have been tired, but this is one of those moments I never want to forget."',
    dateTag: 'Memory #04 • Little Adventures',
    stickerEmoji: '🪄',
  },

  // ── Chapter 4: 100 Little Reasons (2 photos) ────────────────────────────
  {
    id: 'mem-05',
    imageSrc: '/memories/memory-05.jpg',
    chapterId: 4,
    chapterTitle: '100 Little Reasons',
    tag: '🍗 Food Therapy',
    tagColor: 'from-rose-500 to-red-500',
    title: 'Another Chicken Date, Another Beautiful Memory Together',
    description: "No fancy plans, just authentic fried chicken and us enjoying every bite. These little food adventures have their own special place in my heart.",
    sundramaniNote: 'Sundramani says: "Honestly, I could go on a hundred more chicken dates with you."',
    dateTag: 'Memory #05 • Food Therapy',
    stickerEmoji: '💖',
  },
  {
    id: 'mem-06',
    imageSrc: '/memories/memory-06.jpg',
    chapterId: 4,
    chapterTitle: '100 Little Reasons',
    tag: '🎬 Firsts Forever',
    tagColor: 'from-purple-500 to-pink-500',
    title: 'Our First Movie Date, A Memory Forever',
    description: "Our first movie date! A simple outing that marked another beautiful first in our journey together. Some beginnings become memories we carry for a lifetime.",
    sundramaniNote: 'Sundramani says: "I still cherish our first movie date, and I\'d happily relive that day with you."',
    dateTag: 'Memory #06 • Firsts Forever',
    stickerEmoji: '🎀',
  },

  // ── Chapter 5: The Bestie Interrogation (2 photos) ──────────────────────
  {
    id: 'mem-07',
    imageSrc: '/memories/memory-07.jpg',
    chapterId: 5,
    chapterTitle: 'The Bestie Interrogation',
    tag: '☕ Full Face Challenge',
    tagColor: 'from-pink-500 to-rose-500',
    title: 'A Perfect Date And My Little Photography Mission',
    description: "One of our best cafe dates, where I had a special mission: convincing you to show your entire face in the picture instead of your usual half-face selfies.",
    sundramaniNote: 'Sundramani says: "I just wanted one full-face picture, but somehow that became another unforgettable memory!"',
    dateTag: 'Memory #07 • Full Face Challenge',
    stickerEmoji: '📸',
  },
  {
    id: 'mem-08',
    imageSrc: '/memories/memory-08.jpg',
    chapterId: 5,
    chapterTitle: 'The Bestie Interrogation',
    tag: '🌙 Under The Stars',
    tagColor: 'from-indigo-500 to-purple-600',
    title: 'Two Shadows, One Peaceful Night, Endless Beautiful Memories',
    description: "Just the two of us sitting together on a peaceful beach at night. No big conversations or plans, just the sound of the waves and a moment I wish could last forever.",
    sundramaniNote: 'Sundramani says: "Sometimes, sitting beside you in silence is all the happiness I need."',
    dateTag: 'Memory #08 • Under The Stars',
    stickerEmoji: '🌊',
  },

  // ── Chapter 6: Who Is More Likely To? (2 photos) ────────────────────────
  {
    id: 'mem-09',
    imageSrc: '/memories/memory-09.jpg',
    chapterId: 6,
    chapterTitle: 'Who Is More Likely To?',
    tag: '🍌 Banana Vibes',
    tagColor: 'from-amber-500 to-yellow-500',
    title: 'Your Crazy Expressions Made This Story Unforgettable',
    description: "That screaming expression of yours deserved its own Instagram story, especially with one of your favourite songs, Banana. A perfectly crazy moment that still makes me smile.",
    sundramaniNote: 'Sundramani says: "Your expressions, that song, and my story. Honestly, this combination was legendary!"',
    dateTag: 'Memory #09 • Banana Vibes',
    stickerEmoji: '🤪',
  },
  {
    id: 'mem-10',
    imageSrc: '/memories/memory-10.jpg',
    chapterId: 6,
    chapterTitle: 'Who Is More Likely To?',
    tag: '😜 Crazy Together',
    tagColor: 'from-rose-500 to-red-500',
    title: 'Your Weirdest Faces Are My Favourite Entertainment',
    description: "You sticking your tongue out and making that absolutely ridiculous face, while I quietly appear in the background. Another unplanned picture that captures our silly side perfectly.",
    sundramaniNote: 'Sundramani says: "Never stop making those weird faces. They are one of my favourite things about you!"',
    dateTag: 'Memory #10 • Crazy Together',
    stickerEmoji: '👯‍♀️',
  },

  // ── Chapter 7: This or That (2 photos) ──────────────────────────────────
  {
    id: 'mem-11',
    imageSrc: '/memories/memory-11.jpg',
    chapterId: 7,
    chapterTitle: 'This or That',
    tag: '🪞 Mirror Magic',
    tagColor: 'from-teal-500 to-emerald-500',
    title: 'A Day Of Reflections, Laughter, And Beautiful Memories',
    description: "Our visit to the Calicut Planetarium, surrounded by endless mirrors and endless laughter. We explored, enjoyed ourselves, and made one of those days that will always stay special.",
    sundramaniNote: 'Sundramani says: "That day was so much fun. I\'d happily revisit every mirror just to relive it with you."',
    dateTag: 'Memory #11 • Mirror Magic',
    stickerEmoji: '✨',
  },
  {
    id: 'mem-12',
    imageSrc: '/memories/memory-12.jpg',
    chapterId: 7,
    chapterTitle: 'This or That',
    tag: '🕵️‍♂️ Partners In Crime',
    tagColor: 'from-violet-500 to-pink-500',
    title: 'Looking Like Thieves, Creating Our Favourite Memories',
    description: "Only half our faces showing, looking like two people planning something suspicious. Yet somehow, this became one of your favourite pictures, and one of my favourite memories too.",
    sundramaniNote: 'Sundramani says: "We may look like thieves here, but the only thing we\'ve stolen is each other\'s hearts."',
    dateTag: 'Memory #12 • Partners In Crime',
    stickerEmoji: '🖤',
  },

  // ── Chapter 8: Our Friendship Time Capsule (2 photos) ───────────────────
  {
    id: 'mem-13',
    imageSrc: '/memories/memory-13.jpg',
    chapterId: 8,
    chapterTitle: 'Our Friendship Time Capsule',
    tag: '👗 Birthday Look',
    tagColor: 'from-amber-500 to-yellow-500',
    title: 'Finding The Perfect Look For Her Special Day',
    description: "While shopping for your sister's birthday, you tried this beautiful outfit. And honestly, it looked like it was made just for you.",
    sundramaniNote: 'Sundramani says: "I knew this outfit was special because you looked absolutely stunning in it."',
    dateTag: 'Memory #13 • Birthday Look',
    stickerEmoji: '⏳',
  },
  {
    id: 'mem-14',
    imageSrc: '/memories/memory-14.jpg',
    chapterId: 8,
    chapterTitle: 'Our Friendship Time Capsule',
    tag: '🤩 Pure Excitement',
    tagColor: 'from-rose-500 to-amber-500',
    title: 'Your Excitement Made This Birthday Even More Special',
    description: "You were overflowing with excitement on your sister's birthday, while my eyes were doing their own thing in the selfie. A funny picture, but a golden memory for me.",
    sundramaniNote: 'Sundramani says: "Your excitement was everything, and my bulging eyes just made this picture even more memorable."',
    dateTag: 'Memory #14 • Pure Excitement',
    stickerEmoji: '🗝️',
  },

  // ── Chapter 9: Open Whenever You Need It (2 photos) ─────────────────────
  {
    id: 'mem-15',
    imageSrc: '/memories/memory-15.jpg',
    chapterId: 9,
    chapterTitle: 'Open Whenever You Need It',
    tag: '🌄 Wayanad Diaries',
    tagColor: 'from-emerald-500 to-teal-500',
    title: 'A Beautiful Journey Made Better By Your Company',
    description: "Our Wayanad trip gave us another beautiful chapter to remember. From travelling together to exploring new places, every little moment felt special with you.",
    sundramaniNote: 'Sundramani says: "Wayanad was beautiful, but having you beside me made the entire journey unforgettable."',
    dateTag: 'Memory #15 • Wayanad Diaries',
    stickerEmoji: '💌',
  },
  {
    id: 'mem-16',
    imageSrc: '/memories/memory-16.jpg',
    chapterId: 9,
    chapterTitle: 'Open Whenever You Need It',
    tag: '💖 My Favourite',
    tagColor: 'from-rose-400 to-pink-500',
    title: 'The Picture You Dislike, The One I Adore',
    description: "Maybe this isn't your favourite picture, but it has always been one of mine. That beautiful smile is enough to make this photograph special to me.",
    sundramaniNote: 'Sundramani says: "You may not like this picture, but trust me, your smile makes it one of my favourites."',
    dateTag: 'Memory #16 • My Favourite',
    stickerEmoji: '🌻',
  },

  // ── Chapter 10: The Birthday Cake (2 photos) ────────────────────────────
  {
    id: 'mem-17',
    imageSrc: '/memories/memory-17.jpg',
    chapterId: 10,
    chapterTitle: 'The Birthday Cake',
    tag: '🎸 After Hours',
    tagColor: 'from-violet-500 to-purple-600',
    title: 'Little Selfies After Making Beautiful Music Together',
    description: "After our guitar practice, we captured this little selfie in your room. Nothing extravagant, just us, music, and a moment worth remembering.",
    sundramaniNote: 'Sundramani says: "Those little moments after practice are memories I wish we could keep repeating."',
    dateTag: 'Memory #17 • After Hours',
    stickerEmoji: '🍰',
  },
  {
    id: 'mem-18',
    imageSrc: '/memories/memory-18.jpg',
    chapterId: 10,
    chapterTitle: 'The Birthday Cake',
    tag: '🚂 Until We Meet',
    tagColor: 'from-amber-600 to-orange-500',
    title: 'A Goodbye Filled With Tears And Beautiful Memories',
    description: "The railway station, the tears, and the difficult goodbye as I headed back to my hometown. It was heartbreaking, yet this photograph remains one of our most cherished memories.",
    sundramaniNote: 'Sundramani says: "I still remember those tears. Leaving you that day was difficult, but this picture means everything to me."',
    dateTag: 'Memory #18 • Until We Meet',
    stickerEmoji: '🧁',
  },

  // ── Chapter 11: The Compliment Machine (1 photo) ────────────────────────
  {
    id: 'mem-19',
    imageSrc: '/memories/memory-19.jpg',
    chapterId: 11,
    chapterTitle: 'The Compliment Machine',
    tag: '🔥 Unstoppable Duo',
    tagColor: 'from-rose-500 to-purple-500',
    title: 'Two Souls, One Picture, And Unlimited Confidence',
    description: "Our Aura moment in Kochi during the MBA induction. We looked absolutely unstoppable in this picture, capturing the confidence, excitement, and energy of that day.",
    sundramaniNote: 'Sundramani says: "We weren\'t just taking a selfie; we were showing the world our unstoppable energy."',
    dateTag: 'Memory #19 • Unstoppable Duo',
    stickerEmoji: '💎',
  },

  // ── Chapter 12: Caught in 4K: Unfiltered Vault (2 photos) ────────────────
  {
    id: 'mem-20',
    imageSrc: '/memories/memory-20.jpg',
    chapterId: 12,
    chapterTitle: 'Caught in 4K: Unfiltered Vault',
    tag: '🧸 Teddy Love',
    tagColor: 'from-pink-400 to-rose-400',
    title: 'A Little Teddy, An Image Full Of Love',
    description: "You holding that little teddy with its sweet I Love You message. One of your prettiest solo pictures, filled with innocence, warmth, and an adorable charm.",
    sundramaniNote: 'Sundramani says: "That teddy is cute, but nothing can compete with the person holding it."',
    dateTag: 'Memory #20 • Teddy Love',
    stickerEmoji: '🎞️',
  },
  {
    id: 'mem-21',
    imageSrc: '/memories/memory-21.jpg',
    chapterId: 12,
    chapterTitle: 'Caught in 4K: Unfiltered Vault',
    tag: '🪞 Picture Perfect',
    tagColor: 'from-purple-500 to-indigo-600',
    title: 'Two Stunning Faces, One Perfect Mirror Moment Together',
    description: "A mirror capture that turned out absolutely stunning. We both looked our best, and this photograph perfectly captures one of those effortless moments together.",
    sundramaniNote: 'Sundramani says: "Not going to lie, we both looked incredibly good in this one!"',
    dateTag: 'Memory #21 • Picture Perfect',
    stickerEmoji: '🌟',
  },

  // ── Chapter 13: Our Golden Milestones (1 photo) ─────────────────────────
  {
    id: 'mem-22',
    imageSrc: '/memories/memory-22.jpg',
    chapterId: 13,
    chapterTitle: 'Our Golden Milestones',
    tag: '🌿 Green Flag',
    tagColor: 'from-emerald-500 to-teal-600',
    title: 'Apparently, I Am Your Favourite Green Flag',
    description: "You posted this selfie calling me the best green flag you've ever seen. That little appreciation made this picture more meaningful than you probably realise.",
    sundramaniNote: 'Sundramani says: "Being your favourite green flag is a title I\'ll happily carry forever."',
    dateTag: 'Memory #22 • Green Flag',
    stickerEmoji: '🏆',
  },

  // ── Chapter 14: The Final Letter (1 photo) ──────────────────────────────
  {
    id: 'mem-23',
    imageSrc: '/memories/memory-23.jpg',
    chapterId: 14,
    chapterTitle: 'The Final Letter',
    tag: '🌊 Natural Beauty',
    tagColor: 'from-cyan-500 to-blue-600',
    title: 'Your Smile, Flowing Waters, And A Perfect Frame',
    description: "With water flowing beautifully in the background and your lovely smile stealing the spotlight, this photograph feels like a perfect blend of nature and beauty.",
    sundramaniNote: 'Sundramani says: "The flowing water makes the background beautiful, but your smile is what makes this picture special."',
    dateTag: 'Memory #23 • Natural Beauty',
    stickerEmoji: '💖',
  },
];

export function getMemoriesForChapter(chapterId: number): MemoryItem[] {
  return CHAPTER_MEMORIES.filter((m) => m.chapterId === chapterId);
}
