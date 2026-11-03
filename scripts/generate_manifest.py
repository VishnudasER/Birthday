import os
import json
import random

random.seed(42)

categories = ['Together', 'Adventures', 'Silly', 'Candid', 'Special', 'Food & Treats']

captions_pool = {
    'Together': [
        'The duo that nobody asked for but everyone needed ❤️',
        'Just Shuttumani and Sundramani being completely iconic ✨',
        'One of those days where we laughed until our stomachs hurt 🥹',
        'Our default state: unhinged and inseparable 🫶🏻',
        'The best memories are always the unplanned ones 💕',
        'Side by side, forever and always 🌸',
        'Two peas in a very chaotic pod 😂',
        'Proof that we actually clean up well sometimes 💅',
        'I would choose you as my best friend in every lifetime 🥺',
        'Golden moments with my favourite human ☀️',
        'Every single day with you is an adventure 💫',
        'The face you make when the gossip is too juicy 🤫',
        'Unfiltered friendship at its finest 🥂',
        'Best friends who slay together stay together 💖',
        'If being obsessed with your best friend was a crime, lock me up 🔒'
    ],
    'Adventures': [
        'We said it would be a 15-minute trip. It was 5 hours. 🚗',
        'Lost again, but at least we are lost together 🗺️',
        'Exploring the world one chaotic step at a time 🌍',
        'Sunsets, wind in our hair, and zero regrets 🌅',
        'The road trip playlist was 100% screams and 0% singing 🎶',
        'Taking over new cities like we own the place 😎',
        'Nature walk? More like photoshoot with trees 🌿',
        'Every journey is 1000x better with you riding shotgun 🚙',
        'Collecting skies, cities, and unforgettable days ✈️',
        'We survived this trip and came back with 800 photos 📸'
    ],
    'Silly': [
        'Please never let anyone see the unedited version of this 💀',
        'Peak brain rot energy and I love it 🤪',
        'Why are we like this?! 😂',
        'The designated photographer gave up on us here 🤣',
        '0% serious, 100% ridiculous 🤡',
        'Whatever we were doing here made total sense in the moment 🙃',
        'When you try to take a cute photo but chaos takes over 💥',
        'Goofy bestie hours are the best hours 🙈',
        'If you laugh, I laugh. If you fall, I laugh first then help 😜',
        'My favorite partner in crime and tomfoolery 🥳'
    ],
    'Candid': [
        'Caught in 4K being effortlessly cute 📸',
        'Mid-sentence, mid-laughter, pure perfection ✨',
        'The genuine smiles when you don\'t know the camera is on 🌸',
        'You radiating pure joy as always 💖',
        'Candid shots always tell the truest stories 📖',
        'That split second before we both burst out laughing 🥹',
        'Just living in the moment, no poses needed 🍃',
        'Sweet candid energy with my favourite girl 🌷',
        'A glimpse into our real, unfiltered happiness 🤍',
        'Soft golden light and genuine laughter 🌟'
    ],
    'Special': [
        'A milestone moment etched in my heart forever 🎈',
        'Dressed up, celebrating, and feeling magical 🪄',
        'Happy tears, big hugs, and endless love 🥹❤️',
        'One of those nights that will stay with us forever 🎆',
        'To the girl who makes every single milestone so special 🥂',
        'Celebrating you today, tomorrow, and forever 🎂',
        'Golden memories woven into our story 💫',
        'Core memory unlocked 🔓❤️',
        'A picture worth ten thousand words and a million hugs 🫂',
        'Standing by your side for all the big moments 🌟'
    ],
    'Food & Treats': [
        'Food tastes better when we are fighting over the last bite 🍟',
        'Did we order too much? Absolutely. Did we finish it? Yes. 🍕',
        'Coffee date turned into a 3-hour life debrief ☕',
        'Sweet treats for the sweetest bestie in the world 🍨',
        'Sugar rush and endless yap sessions 🍰',
        'The cafe was cute, but your smile was cuter 🥐',
        'Brunching like royalty 🥑',
        'Our friendship is 80% talking about what to eat next 🍩'
    ]
}

total_photos = 252
all_photos = []

for i in range(1, total_photos + 1):
    pid = f'vault-{i:03d}'
    cat = categories[(i - 1) % len(categories)]
    cat_pool = captions_pool[cat]
    caption = cat_pool[(i - 1) % len(cat_pool)]
    
    photo = {
        'id': pid,
        'url': f'/photos/web/{pid}.jpg',
        'thumbUrl': f'/photos/thumbs/{pid}.jpg',
        'caption': caption,
        'category': cat,
        'favourite': (i % 7 == 0) or (i in [1, 5, 20, 45, 72, 98, 130, 175, 210, 250]),
        'alt': f'Shuttumani & Sundramani memory {i}'
    }
    all_photos.append(photo)

header = """// ============================================================
// Comprehensive Photo Vault — 252 real memories
// "A Little World Called Us ❤️"
// ============================================================

export type VaultCategory =
  | 'All'
  | 'Favourites'
  | 'Together'
  | 'Adventures'
  | 'Silly'
  | 'Candid'
  | 'Special'
  | 'Food & Treats';

export interface VaultPhoto {
  id: string;
  url: string;
  thumbUrl: string;
  caption: string;
  category: 'Together' | 'Adventures' | 'Silly' | 'Candid' | 'Special' | 'Food & Treats';
  favourite?: boolean;
  alt: string;
}

export const vaultPhotos: VaultPhoto[] = """

footer = """;

export const VAULT_CATEGORIES: VaultCategory[] = [
  'All',
  'Favourites',
  'Together',
  'Adventures',
  'Silly',
  'Candid',
  'Special',
  'Food & Treats',
];
"""

with open('src/data/allPhotos.ts', 'w') as f:
    f.write(header + json.dumps(all_photos, indent=2) + footer)

print(f'Successfully wrote src/data/allPhotos.ts with {len(all_photos)} photos!')
