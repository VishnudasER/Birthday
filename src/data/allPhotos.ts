// ============================================================
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

export const vaultPhotos: VaultPhoto[] = [
  {
    "id": "vault-001",
    "url": "/photos/web/vault-001.jpg",
    "thumbUrl": "/photos/thumbs/vault-001.jpg",
    "caption": "The duo that nobody asked for but everyone needed \u2764\ufe0f",
    "category": "Together",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 1"
  },
  {
    "id": "vault-002",
    "url": "/photos/web/vault-002.jpg",
    "thumbUrl": "/photos/thumbs/vault-002.jpg",
    "caption": "Lost again, but at least we are lost together \ud83d\uddfa\ufe0f",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 2"
  },
  {
    "id": "vault-003",
    "url": "/photos/web/vault-003.jpg",
    "thumbUrl": "/photos/thumbs/vault-003.jpg",
    "caption": "Why are we like this?! \ud83d\ude02",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 3"
  },
  {
    "id": "vault-004",
    "url": "/photos/web/vault-004.jpg",
    "thumbUrl": "/photos/thumbs/vault-004.jpg",
    "caption": "You radiating pure joy as always \ud83d\udc96",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 4"
  },
  {
    "id": "vault-005",
    "url": "/photos/web/vault-005.jpg",
    "thumbUrl": "/photos/thumbs/vault-005.jpg",
    "caption": "To the girl who makes every single milestone so special \ud83e\udd42",
    "category": "Special",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 5"
  },
  {
    "id": "vault-006",
    "url": "/photos/web/vault-006.jpg",
    "thumbUrl": "/photos/thumbs/vault-006.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 6"
  },
  {
    "id": "vault-007",
    "url": "/photos/web/vault-007.jpg",
    "thumbUrl": "/photos/thumbs/vault-007.jpg",
    "caption": "Two peas in a very chaotic pod \ud83d\ude02",
    "category": "Together",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 7"
  },
  {
    "id": "vault-008",
    "url": "/photos/web/vault-008.jpg",
    "thumbUrl": "/photos/thumbs/vault-008.jpg",
    "caption": "Every journey is 1000x better with you riding shotgun \ud83d\ude99",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 8"
  },
  {
    "id": "vault-009",
    "url": "/photos/web/vault-009.jpg",
    "thumbUrl": "/photos/thumbs/vault-009.jpg",
    "caption": "If you laugh, I laugh. If you fall, I laugh first then help \ud83d\ude1c",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 9"
  },
  {
    "id": "vault-010",
    "url": "/photos/web/vault-010.jpg",
    "thumbUrl": "/photos/thumbs/vault-010.jpg",
    "caption": "Soft golden light and genuine laughter \ud83c\udf1f",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 10"
  },
  {
    "id": "vault-011",
    "url": "/photos/web/vault-011.jpg",
    "thumbUrl": "/photos/thumbs/vault-011.jpg",
    "caption": "A milestone moment etched in my heart forever \ud83c\udf88",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 11"
  },
  {
    "id": "vault-012",
    "url": "/photos/web/vault-012.jpg",
    "thumbUrl": "/photos/thumbs/vault-012.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 12"
  },
  {
    "id": "vault-013",
    "url": "/photos/web/vault-013.jpg",
    "thumbUrl": "/photos/thumbs/vault-013.jpg",
    "caption": "Unfiltered friendship at its finest \ud83e\udd42",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 13"
  },
  {
    "id": "vault-014",
    "url": "/photos/web/vault-014.jpg",
    "thumbUrl": "/photos/thumbs/vault-014.jpg",
    "caption": "Sunsets, wind in our hair, and zero regrets \ud83c\udf05",
    "category": "Adventures",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 14"
  },
  {
    "id": "vault-015",
    "url": "/photos/web/vault-015.jpg",
    "thumbUrl": "/photos/thumbs/vault-015.jpg",
    "caption": "0% serious, 100% ridiculous \ud83e\udd21",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 15"
  },
  {
    "id": "vault-016",
    "url": "/photos/web/vault-016.jpg",
    "thumbUrl": "/photos/thumbs/vault-016.jpg",
    "caption": "That split second before we both burst out laughing \ud83e\udd79",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 16"
  },
  {
    "id": "vault-017",
    "url": "/photos/web/vault-017.jpg",
    "thumbUrl": "/photos/thumbs/vault-017.jpg",
    "caption": "Golden memories woven into our story \ud83d\udcab",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 17"
  },
  {
    "id": "vault-018",
    "url": "/photos/web/vault-018.jpg",
    "thumbUrl": "/photos/thumbs/vault-018.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 18"
  },
  {
    "id": "vault-019",
    "url": "/photos/web/vault-019.jpg",
    "thumbUrl": "/photos/thumbs/vault-019.jpg",
    "caption": "Our default state: unhinged and inseparable \ud83e\udef6\ud83c\udffb",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 19"
  },
  {
    "id": "vault-020",
    "url": "/photos/web/vault-020.jpg",
    "thumbUrl": "/photos/thumbs/vault-020.jpg",
    "caption": "We survived this trip and came back with 800 photos \ud83d\udcf8",
    "category": "Adventures",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 20"
  },
  {
    "id": "vault-021",
    "url": "/photos/web/vault-021.jpg",
    "thumbUrl": "/photos/thumbs/vault-021.jpg",
    "caption": "Please never let anyone see the unedited version of this \ud83d\udc80",
    "category": "Silly",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 21"
  },
  {
    "id": "vault-022",
    "url": "/photos/web/vault-022.jpg",
    "thumbUrl": "/photos/thumbs/vault-022.jpg",
    "caption": "Mid-sentence, mid-laughter, pure perfection \u2728",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 22"
  },
  {
    "id": "vault-023",
    "url": "/photos/web/vault-023.jpg",
    "thumbUrl": "/photos/thumbs/vault-023.jpg",
    "caption": "Happy tears, big hugs, and endless love \ud83e\udd79\u2764\ufe0f",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 23"
  },
  {
    "id": "vault-024",
    "url": "/photos/web/vault-024.jpg",
    "thumbUrl": "/photos/thumbs/vault-024.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 24"
  },
  {
    "id": "vault-025",
    "url": "/photos/web/vault-025.jpg",
    "thumbUrl": "/photos/thumbs/vault-025.jpg",
    "caption": "Golden moments with my favourite human \u2600\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 25"
  },
  {
    "id": "vault-026",
    "url": "/photos/web/vault-026.jpg",
    "thumbUrl": "/photos/thumbs/vault-026.jpg",
    "caption": "Taking over new cities like we own the place \ud83d\ude0e",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 26"
  },
  {
    "id": "vault-027",
    "url": "/photos/web/vault-027.jpg",
    "thumbUrl": "/photos/thumbs/vault-027.jpg",
    "caption": "When you try to take a cute photo but chaos takes over \ud83d\udca5",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 27"
  },
  {
    "id": "vault-028",
    "url": "/photos/web/vault-028.jpg",
    "thumbUrl": "/photos/thumbs/vault-028.jpg",
    "caption": "Sweet candid energy with my favourite girl \ud83c\udf37",
    "category": "Candid",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 28"
  },
  {
    "id": "vault-029",
    "url": "/photos/web/vault-029.jpg",
    "thumbUrl": "/photos/thumbs/vault-029.jpg",
    "caption": "A picture worth ten thousand words and a million hugs \ud83e\udec2",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 29"
  },
  {
    "id": "vault-030",
    "url": "/photos/web/vault-030.jpg",
    "thumbUrl": "/photos/thumbs/vault-030.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 30"
  },
  {
    "id": "vault-031",
    "url": "/photos/web/vault-031.jpg",
    "thumbUrl": "/photos/thumbs/vault-031.jpg",
    "caption": "The duo that nobody asked for but everyone needed \u2764\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 31"
  },
  {
    "id": "vault-032",
    "url": "/photos/web/vault-032.jpg",
    "thumbUrl": "/photos/thumbs/vault-032.jpg",
    "caption": "Lost again, but at least we are lost together \ud83d\uddfa\ufe0f",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 32"
  },
  {
    "id": "vault-033",
    "url": "/photos/web/vault-033.jpg",
    "thumbUrl": "/photos/thumbs/vault-033.jpg",
    "caption": "Why are we like this?! \ud83d\ude02",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 33"
  },
  {
    "id": "vault-034",
    "url": "/photos/web/vault-034.jpg",
    "thumbUrl": "/photos/thumbs/vault-034.jpg",
    "caption": "You radiating pure joy as always \ud83d\udc96",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 34"
  },
  {
    "id": "vault-035",
    "url": "/photos/web/vault-035.jpg",
    "thumbUrl": "/photos/thumbs/vault-035.jpg",
    "caption": "To the girl who makes every single milestone so special \ud83e\udd42",
    "category": "Special",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 35"
  },
  {
    "id": "vault-036",
    "url": "/photos/web/vault-036.jpg",
    "thumbUrl": "/photos/thumbs/vault-036.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 36"
  },
  {
    "id": "vault-037",
    "url": "/photos/web/vault-037.jpg",
    "thumbUrl": "/photos/thumbs/vault-037.jpg",
    "caption": "Two peas in a very chaotic pod \ud83d\ude02",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 37"
  },
  {
    "id": "vault-038",
    "url": "/photos/web/vault-038.jpg",
    "thumbUrl": "/photos/thumbs/vault-038.jpg",
    "caption": "Every journey is 1000x better with you riding shotgun \ud83d\ude99",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 38"
  },
  {
    "id": "vault-039",
    "url": "/photos/web/vault-039.jpg",
    "thumbUrl": "/photos/thumbs/vault-039.jpg",
    "caption": "If you laugh, I laugh. If you fall, I laugh first then help \ud83d\ude1c",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 39"
  },
  {
    "id": "vault-040",
    "url": "/photos/web/vault-040.jpg",
    "thumbUrl": "/photos/thumbs/vault-040.jpg",
    "caption": "Soft golden light and genuine laughter \ud83c\udf1f",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 40"
  },
  {
    "id": "vault-041",
    "url": "/photos/web/vault-041.jpg",
    "thumbUrl": "/photos/thumbs/vault-041.jpg",
    "caption": "A milestone moment etched in my heart forever \ud83c\udf88",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 41"
  },
  {
    "id": "vault-042",
    "url": "/photos/web/vault-042.jpg",
    "thumbUrl": "/photos/thumbs/vault-042.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 42"
  },
  {
    "id": "vault-043",
    "url": "/photos/web/vault-043.jpg",
    "thumbUrl": "/photos/thumbs/vault-043.jpg",
    "caption": "Unfiltered friendship at its finest \ud83e\udd42",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 43"
  },
  {
    "id": "vault-044",
    "url": "/photos/web/vault-044.jpg",
    "thumbUrl": "/photos/thumbs/vault-044.jpg",
    "caption": "Sunsets, wind in our hair, and zero regrets \ud83c\udf05",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 44"
  },
  {
    "id": "vault-045",
    "url": "/photos/web/vault-045.jpg",
    "thumbUrl": "/photos/thumbs/vault-045.jpg",
    "caption": "0% serious, 100% ridiculous \ud83e\udd21",
    "category": "Silly",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 45"
  },
  {
    "id": "vault-046",
    "url": "/photos/web/vault-046.jpg",
    "thumbUrl": "/photos/thumbs/vault-046.jpg",
    "caption": "That split second before we both burst out laughing \ud83e\udd79",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 46"
  },
  {
    "id": "vault-047",
    "url": "/photos/web/vault-047.jpg",
    "thumbUrl": "/photos/thumbs/vault-047.jpg",
    "caption": "Golden memories woven into our story \ud83d\udcab",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 47"
  },
  {
    "id": "vault-048",
    "url": "/photos/web/vault-048.jpg",
    "thumbUrl": "/photos/thumbs/vault-048.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 48"
  },
  {
    "id": "vault-049",
    "url": "/photos/web/vault-049.jpg",
    "thumbUrl": "/photos/thumbs/vault-049.jpg",
    "caption": "Our default state: unhinged and inseparable \ud83e\udef6\ud83c\udffb",
    "category": "Together",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 49"
  },
  {
    "id": "vault-050",
    "url": "/photos/web/vault-050.jpg",
    "thumbUrl": "/photos/thumbs/vault-050.jpg",
    "caption": "We survived this trip and came back with 800 photos \ud83d\udcf8",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 50"
  },
  {
    "id": "vault-051",
    "url": "/photos/web/vault-051.jpg",
    "thumbUrl": "/photos/thumbs/vault-051.jpg",
    "caption": "Please never let anyone see the unedited version of this \ud83d\udc80",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 51"
  },
  {
    "id": "vault-052",
    "url": "/photos/web/vault-052.jpg",
    "thumbUrl": "/photos/thumbs/vault-052.jpg",
    "caption": "Mid-sentence, mid-laughter, pure perfection \u2728",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 52"
  },
  {
    "id": "vault-053",
    "url": "/photos/web/vault-053.jpg",
    "thumbUrl": "/photos/thumbs/vault-053.jpg",
    "caption": "Happy tears, big hugs, and endless love \ud83e\udd79\u2764\ufe0f",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 53"
  },
  {
    "id": "vault-054",
    "url": "/photos/web/vault-054.jpg",
    "thumbUrl": "/photos/thumbs/vault-054.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 54"
  },
  {
    "id": "vault-055",
    "url": "/photos/web/vault-055.jpg",
    "thumbUrl": "/photos/thumbs/vault-055.jpg",
    "caption": "Golden moments with my favourite human \u2600\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 55"
  },
  {
    "id": "vault-056",
    "url": "/photos/web/vault-056.jpg",
    "thumbUrl": "/photos/thumbs/vault-056.jpg",
    "caption": "Taking over new cities like we own the place \ud83d\ude0e",
    "category": "Adventures",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 56"
  },
  {
    "id": "vault-057",
    "url": "/photos/web/vault-057.jpg",
    "thumbUrl": "/photos/thumbs/vault-057.jpg",
    "caption": "When you try to take a cute photo but chaos takes over \ud83d\udca5",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 57"
  },
  {
    "id": "vault-058",
    "url": "/photos/web/vault-058.jpg",
    "thumbUrl": "/photos/thumbs/vault-058.jpg",
    "caption": "Sweet candid energy with my favourite girl \ud83c\udf37",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 58"
  },
  {
    "id": "vault-059",
    "url": "/photos/web/vault-059.jpg",
    "thumbUrl": "/photos/thumbs/vault-059.jpg",
    "caption": "A picture worth ten thousand words and a million hugs \ud83e\udec2",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 59"
  },
  {
    "id": "vault-060",
    "url": "/photos/web/vault-060.jpg",
    "thumbUrl": "/photos/thumbs/vault-060.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 60"
  },
  {
    "id": "vault-061",
    "url": "/photos/web/vault-061.jpg",
    "thumbUrl": "/photos/thumbs/vault-061.jpg",
    "caption": "The duo that nobody asked for but everyone needed \u2764\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 61"
  },
  {
    "id": "vault-062",
    "url": "/photos/web/vault-062.jpg",
    "thumbUrl": "/photos/thumbs/vault-062.jpg",
    "caption": "Lost again, but at least we are lost together \ud83d\uddfa\ufe0f",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 62"
  },
  {
    "id": "vault-063",
    "url": "/photos/web/vault-063.jpg",
    "thumbUrl": "/photos/thumbs/vault-063.jpg",
    "caption": "Why are we like this?! \ud83d\ude02",
    "category": "Silly",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 63"
  },
  {
    "id": "vault-064",
    "url": "/photos/web/vault-064.jpg",
    "thumbUrl": "/photos/thumbs/vault-064.jpg",
    "caption": "You radiating pure joy as always \ud83d\udc96",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 64"
  },
  {
    "id": "vault-065",
    "url": "/photos/web/vault-065.jpg",
    "thumbUrl": "/photos/thumbs/vault-065.jpg",
    "caption": "To the girl who makes every single milestone so special \ud83e\udd42",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 65"
  },
  {
    "id": "vault-066",
    "url": "/photos/web/vault-066.jpg",
    "thumbUrl": "/photos/thumbs/vault-066.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 66"
  },
  {
    "id": "vault-067",
    "url": "/photos/web/vault-067.jpg",
    "thumbUrl": "/photos/thumbs/vault-067.jpg",
    "caption": "Two peas in a very chaotic pod \ud83d\ude02",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 67"
  },
  {
    "id": "vault-068",
    "url": "/photos/web/vault-068.jpg",
    "thumbUrl": "/photos/thumbs/vault-068.jpg",
    "caption": "Every journey is 1000x better with you riding shotgun \ud83d\ude99",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 68"
  },
  {
    "id": "vault-069",
    "url": "/photos/web/vault-069.jpg",
    "thumbUrl": "/photos/thumbs/vault-069.jpg",
    "caption": "If you laugh, I laugh. If you fall, I laugh first then help \ud83d\ude1c",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 69"
  },
  {
    "id": "vault-070",
    "url": "/photos/web/vault-070.jpg",
    "thumbUrl": "/photos/thumbs/vault-070.jpg",
    "caption": "Soft golden light and genuine laughter \ud83c\udf1f",
    "category": "Candid",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 70"
  },
  {
    "id": "vault-071",
    "url": "/photos/web/vault-071.jpg",
    "thumbUrl": "/photos/thumbs/vault-071.jpg",
    "caption": "A milestone moment etched in my heart forever \ud83c\udf88",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 71"
  },
  {
    "id": "vault-072",
    "url": "/photos/web/vault-072.jpg",
    "thumbUrl": "/photos/thumbs/vault-072.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 72"
  },
  {
    "id": "vault-073",
    "url": "/photos/web/vault-073.jpg",
    "thumbUrl": "/photos/thumbs/vault-073.jpg",
    "caption": "Unfiltered friendship at its finest \ud83e\udd42",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 73"
  },
  {
    "id": "vault-074",
    "url": "/photos/web/vault-074.jpg",
    "thumbUrl": "/photos/thumbs/vault-074.jpg",
    "caption": "Sunsets, wind in our hair, and zero regrets \ud83c\udf05",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 74"
  },
  {
    "id": "vault-075",
    "url": "/photos/web/vault-075.jpg",
    "thumbUrl": "/photos/thumbs/vault-075.jpg",
    "caption": "0% serious, 100% ridiculous \ud83e\udd21",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 75"
  },
  {
    "id": "vault-076",
    "url": "/photos/web/vault-076.jpg",
    "thumbUrl": "/photos/thumbs/vault-076.jpg",
    "caption": "That split second before we both burst out laughing \ud83e\udd79",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 76"
  },
  {
    "id": "vault-077",
    "url": "/photos/web/vault-077.jpg",
    "thumbUrl": "/photos/thumbs/vault-077.jpg",
    "caption": "Golden memories woven into our story \ud83d\udcab",
    "category": "Special",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 77"
  },
  {
    "id": "vault-078",
    "url": "/photos/web/vault-078.jpg",
    "thumbUrl": "/photos/thumbs/vault-078.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 78"
  },
  {
    "id": "vault-079",
    "url": "/photos/web/vault-079.jpg",
    "thumbUrl": "/photos/thumbs/vault-079.jpg",
    "caption": "Our default state: unhinged and inseparable \ud83e\udef6\ud83c\udffb",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 79"
  },
  {
    "id": "vault-080",
    "url": "/photos/web/vault-080.jpg",
    "thumbUrl": "/photos/thumbs/vault-080.jpg",
    "caption": "We survived this trip and came back with 800 photos \ud83d\udcf8",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 80"
  },
  {
    "id": "vault-081",
    "url": "/photos/web/vault-081.jpg",
    "thumbUrl": "/photos/thumbs/vault-081.jpg",
    "caption": "Please never let anyone see the unedited version of this \ud83d\udc80",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 81"
  },
  {
    "id": "vault-082",
    "url": "/photos/web/vault-082.jpg",
    "thumbUrl": "/photos/thumbs/vault-082.jpg",
    "caption": "Mid-sentence, mid-laughter, pure perfection \u2728",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 82"
  },
  {
    "id": "vault-083",
    "url": "/photos/web/vault-083.jpg",
    "thumbUrl": "/photos/thumbs/vault-083.jpg",
    "caption": "Happy tears, big hugs, and endless love \ud83e\udd79\u2764\ufe0f",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 83"
  },
  {
    "id": "vault-084",
    "url": "/photos/web/vault-084.jpg",
    "thumbUrl": "/photos/thumbs/vault-084.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 84"
  },
  {
    "id": "vault-085",
    "url": "/photos/web/vault-085.jpg",
    "thumbUrl": "/photos/thumbs/vault-085.jpg",
    "caption": "Golden moments with my favourite human \u2600\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 85"
  },
  {
    "id": "vault-086",
    "url": "/photos/web/vault-086.jpg",
    "thumbUrl": "/photos/thumbs/vault-086.jpg",
    "caption": "Taking over new cities like we own the place \ud83d\ude0e",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 86"
  },
  {
    "id": "vault-087",
    "url": "/photos/web/vault-087.jpg",
    "thumbUrl": "/photos/thumbs/vault-087.jpg",
    "caption": "When you try to take a cute photo but chaos takes over \ud83d\udca5",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 87"
  },
  {
    "id": "vault-088",
    "url": "/photos/web/vault-088.jpg",
    "thumbUrl": "/photos/thumbs/vault-088.jpg",
    "caption": "Sweet candid energy with my favourite girl \ud83c\udf37",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 88"
  },
  {
    "id": "vault-089",
    "url": "/photos/web/vault-089.jpg",
    "thumbUrl": "/photos/thumbs/vault-089.jpg",
    "caption": "A picture worth ten thousand words and a million hugs \ud83e\udec2",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 89"
  },
  {
    "id": "vault-090",
    "url": "/photos/web/vault-090.jpg",
    "thumbUrl": "/photos/thumbs/vault-090.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 90"
  },
  {
    "id": "vault-091",
    "url": "/photos/web/vault-091.jpg",
    "thumbUrl": "/photos/thumbs/vault-091.jpg",
    "caption": "The duo that nobody asked for but everyone needed \u2764\ufe0f",
    "category": "Together",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 91"
  },
  {
    "id": "vault-092",
    "url": "/photos/web/vault-092.jpg",
    "thumbUrl": "/photos/thumbs/vault-092.jpg",
    "caption": "Lost again, but at least we are lost together \ud83d\uddfa\ufe0f",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 92"
  },
  {
    "id": "vault-093",
    "url": "/photos/web/vault-093.jpg",
    "thumbUrl": "/photos/thumbs/vault-093.jpg",
    "caption": "Why are we like this?! \ud83d\ude02",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 93"
  },
  {
    "id": "vault-094",
    "url": "/photos/web/vault-094.jpg",
    "thumbUrl": "/photos/thumbs/vault-094.jpg",
    "caption": "You radiating pure joy as always \ud83d\udc96",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 94"
  },
  {
    "id": "vault-095",
    "url": "/photos/web/vault-095.jpg",
    "thumbUrl": "/photos/thumbs/vault-095.jpg",
    "caption": "To the girl who makes every single milestone so special \ud83e\udd42",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 95"
  },
  {
    "id": "vault-096",
    "url": "/photos/web/vault-096.jpg",
    "thumbUrl": "/photos/thumbs/vault-096.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 96"
  },
  {
    "id": "vault-097",
    "url": "/photos/web/vault-097.jpg",
    "thumbUrl": "/photos/thumbs/vault-097.jpg",
    "caption": "Two peas in a very chaotic pod \ud83d\ude02",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 97"
  },
  {
    "id": "vault-098",
    "url": "/photos/web/vault-098.jpg",
    "thumbUrl": "/photos/thumbs/vault-098.jpg",
    "caption": "Every journey is 1000x better with you riding shotgun \ud83d\ude99",
    "category": "Adventures",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 98"
  },
  {
    "id": "vault-099",
    "url": "/photos/web/vault-099.jpg",
    "thumbUrl": "/photos/thumbs/vault-099.jpg",
    "caption": "If you laugh, I laugh. If you fall, I laugh first then help \ud83d\ude1c",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 99"
  },
  {
    "id": "vault-100",
    "url": "/photos/web/vault-100.jpg",
    "thumbUrl": "/photos/thumbs/vault-100.jpg",
    "caption": "Soft golden light and genuine laughter \ud83c\udf1f",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 100"
  },
  {
    "id": "vault-101",
    "url": "/photos/web/vault-101.jpg",
    "thumbUrl": "/photos/thumbs/vault-101.jpg",
    "caption": "A milestone moment etched in my heart forever \ud83c\udf88",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 101"
  },
  {
    "id": "vault-102",
    "url": "/photos/web/vault-102.jpg",
    "thumbUrl": "/photos/thumbs/vault-102.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 102"
  },
  {
    "id": "vault-103",
    "url": "/photos/web/vault-103.jpg",
    "thumbUrl": "/photos/thumbs/vault-103.jpg",
    "caption": "Unfiltered friendship at its finest \ud83e\udd42",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 103"
  },
  {
    "id": "vault-104",
    "url": "/photos/web/vault-104.jpg",
    "thumbUrl": "/photos/thumbs/vault-104.jpg",
    "caption": "Sunsets, wind in our hair, and zero regrets \ud83c\udf05",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 104"
  },
  {
    "id": "vault-105",
    "url": "/photos/web/vault-105.jpg",
    "thumbUrl": "/photos/thumbs/vault-105.jpg",
    "caption": "0% serious, 100% ridiculous \ud83e\udd21",
    "category": "Silly",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 105"
  },
  {
    "id": "vault-106",
    "url": "/photos/web/vault-106.jpg",
    "thumbUrl": "/photos/thumbs/vault-106.jpg",
    "caption": "That split second before we both burst out laughing \ud83e\udd79",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 106"
  },
  {
    "id": "vault-107",
    "url": "/photos/web/vault-107.jpg",
    "thumbUrl": "/photos/thumbs/vault-107.jpg",
    "caption": "Golden memories woven into our story \ud83d\udcab",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 107"
  },
  {
    "id": "vault-108",
    "url": "/photos/web/vault-108.jpg",
    "thumbUrl": "/photos/thumbs/vault-108.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 108"
  },
  {
    "id": "vault-109",
    "url": "/photos/web/vault-109.jpg",
    "thumbUrl": "/photos/thumbs/vault-109.jpg",
    "caption": "Our default state: unhinged and inseparable \ud83e\udef6\ud83c\udffb",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 109"
  },
  {
    "id": "vault-110",
    "url": "/photos/web/vault-110.jpg",
    "thumbUrl": "/photos/thumbs/vault-110.jpg",
    "caption": "We survived this trip and came back with 800 photos \ud83d\udcf8",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 110"
  },
  {
    "id": "vault-111",
    "url": "/photos/web/vault-111.jpg",
    "thumbUrl": "/photos/thumbs/vault-111.jpg",
    "caption": "Please never let anyone see the unedited version of this \ud83d\udc80",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 111"
  },
  {
    "id": "vault-112",
    "url": "/photos/web/vault-112.jpg",
    "thumbUrl": "/photos/thumbs/vault-112.jpg",
    "caption": "Mid-sentence, mid-laughter, pure perfection \u2728",
    "category": "Candid",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 112"
  },
  {
    "id": "vault-113",
    "url": "/photos/web/vault-113.jpg",
    "thumbUrl": "/photos/thumbs/vault-113.jpg",
    "caption": "Happy tears, big hugs, and endless love \ud83e\udd79\u2764\ufe0f",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 113"
  },
  {
    "id": "vault-114",
    "url": "/photos/web/vault-114.jpg",
    "thumbUrl": "/photos/thumbs/vault-114.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 114"
  },
  {
    "id": "vault-115",
    "url": "/photos/web/vault-115.jpg",
    "thumbUrl": "/photos/thumbs/vault-115.jpg",
    "caption": "Golden moments with my favourite human \u2600\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 115"
  },
  {
    "id": "vault-116",
    "url": "/photos/web/vault-116.jpg",
    "thumbUrl": "/photos/thumbs/vault-116.jpg",
    "caption": "Taking over new cities like we own the place \ud83d\ude0e",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 116"
  },
  {
    "id": "vault-117",
    "url": "/photos/web/vault-117.jpg",
    "thumbUrl": "/photos/thumbs/vault-117.jpg",
    "caption": "When you try to take a cute photo but chaos takes over \ud83d\udca5",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 117"
  },
  {
    "id": "vault-118",
    "url": "/photos/web/vault-118.jpg",
    "thumbUrl": "/photos/thumbs/vault-118.jpg",
    "caption": "Sweet candid energy with my favourite girl \ud83c\udf37",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 118"
  },
  {
    "id": "vault-119",
    "url": "/photos/web/vault-119.jpg",
    "thumbUrl": "/photos/thumbs/vault-119.jpg",
    "caption": "A picture worth ten thousand words and a million hugs \ud83e\udec2",
    "category": "Special",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 119"
  },
  {
    "id": "vault-120",
    "url": "/photos/web/vault-120.jpg",
    "thumbUrl": "/photos/thumbs/vault-120.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 120"
  },
  {
    "id": "vault-121",
    "url": "/photos/web/vault-121.jpg",
    "thumbUrl": "/photos/thumbs/vault-121.jpg",
    "caption": "The duo that nobody asked for but everyone needed \u2764\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 121"
  },
  {
    "id": "vault-122",
    "url": "/photos/web/vault-122.jpg",
    "thumbUrl": "/photos/thumbs/vault-122.jpg",
    "caption": "Lost again, but at least we are lost together \ud83d\uddfa\ufe0f",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 122"
  },
  {
    "id": "vault-123",
    "url": "/photos/web/vault-123.jpg",
    "thumbUrl": "/photos/thumbs/vault-123.jpg",
    "caption": "Why are we like this?! \ud83d\ude02",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 123"
  },
  {
    "id": "vault-124",
    "url": "/photos/web/vault-124.jpg",
    "thumbUrl": "/photos/thumbs/vault-124.jpg",
    "caption": "You radiating pure joy as always \ud83d\udc96",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 124"
  },
  {
    "id": "vault-125",
    "url": "/photos/web/vault-125.jpg",
    "thumbUrl": "/photos/thumbs/vault-125.jpg",
    "caption": "To the girl who makes every single milestone so special \ud83e\udd42",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 125"
  },
  {
    "id": "vault-126",
    "url": "/photos/web/vault-126.jpg",
    "thumbUrl": "/photos/thumbs/vault-126.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 126"
  },
  {
    "id": "vault-127",
    "url": "/photos/web/vault-127.jpg",
    "thumbUrl": "/photos/thumbs/vault-127.jpg",
    "caption": "Two peas in a very chaotic pod \ud83d\ude02",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 127"
  },
  {
    "id": "vault-128",
    "url": "/photos/web/vault-128.jpg",
    "thumbUrl": "/photos/thumbs/vault-128.jpg",
    "caption": "Every journey is 1000x better with you riding shotgun \ud83d\ude99",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 128"
  },
  {
    "id": "vault-129",
    "url": "/photos/web/vault-129.jpg",
    "thumbUrl": "/photos/thumbs/vault-129.jpg",
    "caption": "If you laugh, I laugh. If you fall, I laugh first then help \ud83d\ude1c",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 129"
  },
  {
    "id": "vault-130",
    "url": "/photos/web/vault-130.jpg",
    "thumbUrl": "/photos/thumbs/vault-130.jpg",
    "caption": "Soft golden light and genuine laughter \ud83c\udf1f",
    "category": "Candid",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 130"
  },
  {
    "id": "vault-131",
    "url": "/photos/web/vault-131.jpg",
    "thumbUrl": "/photos/thumbs/vault-131.jpg",
    "caption": "A milestone moment etched in my heart forever \ud83c\udf88",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 131"
  },
  {
    "id": "vault-132",
    "url": "/photos/web/vault-132.jpg",
    "thumbUrl": "/photos/thumbs/vault-132.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 132"
  },
  {
    "id": "vault-133",
    "url": "/photos/web/vault-133.jpg",
    "thumbUrl": "/photos/thumbs/vault-133.jpg",
    "caption": "Unfiltered friendship at its finest \ud83e\udd42",
    "category": "Together",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 133"
  },
  {
    "id": "vault-134",
    "url": "/photos/web/vault-134.jpg",
    "thumbUrl": "/photos/thumbs/vault-134.jpg",
    "caption": "Sunsets, wind in our hair, and zero regrets \ud83c\udf05",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 134"
  },
  {
    "id": "vault-135",
    "url": "/photos/web/vault-135.jpg",
    "thumbUrl": "/photos/thumbs/vault-135.jpg",
    "caption": "0% serious, 100% ridiculous \ud83e\udd21",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 135"
  },
  {
    "id": "vault-136",
    "url": "/photos/web/vault-136.jpg",
    "thumbUrl": "/photos/thumbs/vault-136.jpg",
    "caption": "That split second before we both burst out laughing \ud83e\udd79",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 136"
  },
  {
    "id": "vault-137",
    "url": "/photos/web/vault-137.jpg",
    "thumbUrl": "/photos/thumbs/vault-137.jpg",
    "caption": "Golden memories woven into our story \ud83d\udcab",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 137"
  },
  {
    "id": "vault-138",
    "url": "/photos/web/vault-138.jpg",
    "thumbUrl": "/photos/thumbs/vault-138.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 138"
  },
  {
    "id": "vault-139",
    "url": "/photos/web/vault-139.jpg",
    "thumbUrl": "/photos/thumbs/vault-139.jpg",
    "caption": "Our default state: unhinged and inseparable \ud83e\udef6\ud83c\udffb",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 139"
  },
  {
    "id": "vault-140",
    "url": "/photos/web/vault-140.jpg",
    "thumbUrl": "/photos/thumbs/vault-140.jpg",
    "caption": "We survived this trip and came back with 800 photos \ud83d\udcf8",
    "category": "Adventures",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 140"
  },
  {
    "id": "vault-141",
    "url": "/photos/web/vault-141.jpg",
    "thumbUrl": "/photos/thumbs/vault-141.jpg",
    "caption": "Please never let anyone see the unedited version of this \ud83d\udc80",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 141"
  },
  {
    "id": "vault-142",
    "url": "/photos/web/vault-142.jpg",
    "thumbUrl": "/photos/thumbs/vault-142.jpg",
    "caption": "Mid-sentence, mid-laughter, pure perfection \u2728",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 142"
  },
  {
    "id": "vault-143",
    "url": "/photos/web/vault-143.jpg",
    "thumbUrl": "/photos/thumbs/vault-143.jpg",
    "caption": "Happy tears, big hugs, and endless love \ud83e\udd79\u2764\ufe0f",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 143"
  },
  {
    "id": "vault-144",
    "url": "/photos/web/vault-144.jpg",
    "thumbUrl": "/photos/thumbs/vault-144.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 144"
  },
  {
    "id": "vault-145",
    "url": "/photos/web/vault-145.jpg",
    "thumbUrl": "/photos/thumbs/vault-145.jpg",
    "caption": "Golden moments with my favourite human \u2600\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 145"
  },
  {
    "id": "vault-146",
    "url": "/photos/web/vault-146.jpg",
    "thumbUrl": "/photos/thumbs/vault-146.jpg",
    "caption": "Taking over new cities like we own the place \ud83d\ude0e",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 146"
  },
  {
    "id": "vault-147",
    "url": "/photos/web/vault-147.jpg",
    "thumbUrl": "/photos/thumbs/vault-147.jpg",
    "caption": "When you try to take a cute photo but chaos takes over \ud83d\udca5",
    "category": "Silly",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 147"
  },
  {
    "id": "vault-148",
    "url": "/photos/web/vault-148.jpg",
    "thumbUrl": "/photos/thumbs/vault-148.jpg",
    "caption": "Sweet candid energy with my favourite girl \ud83c\udf37",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 148"
  },
  {
    "id": "vault-149",
    "url": "/photos/web/vault-149.jpg",
    "thumbUrl": "/photos/thumbs/vault-149.jpg",
    "caption": "A picture worth ten thousand words and a million hugs \ud83e\udec2",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 149"
  },
  {
    "id": "vault-150",
    "url": "/photos/web/vault-150.jpg",
    "thumbUrl": "/photos/thumbs/vault-150.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 150"
  },
  {
    "id": "vault-151",
    "url": "/photos/web/vault-151.jpg",
    "thumbUrl": "/photos/thumbs/vault-151.jpg",
    "caption": "The duo that nobody asked for but everyone needed \u2764\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 151"
  },
  {
    "id": "vault-152",
    "url": "/photos/web/vault-152.jpg",
    "thumbUrl": "/photos/thumbs/vault-152.jpg",
    "caption": "Lost again, but at least we are lost together \ud83d\uddfa\ufe0f",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 152"
  },
  {
    "id": "vault-153",
    "url": "/photos/web/vault-153.jpg",
    "thumbUrl": "/photos/thumbs/vault-153.jpg",
    "caption": "Why are we like this?! \ud83d\ude02",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 153"
  },
  {
    "id": "vault-154",
    "url": "/photos/web/vault-154.jpg",
    "thumbUrl": "/photos/thumbs/vault-154.jpg",
    "caption": "You radiating pure joy as always \ud83d\udc96",
    "category": "Candid",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 154"
  },
  {
    "id": "vault-155",
    "url": "/photos/web/vault-155.jpg",
    "thumbUrl": "/photos/thumbs/vault-155.jpg",
    "caption": "To the girl who makes every single milestone so special \ud83e\udd42",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 155"
  },
  {
    "id": "vault-156",
    "url": "/photos/web/vault-156.jpg",
    "thumbUrl": "/photos/thumbs/vault-156.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 156"
  },
  {
    "id": "vault-157",
    "url": "/photos/web/vault-157.jpg",
    "thumbUrl": "/photos/thumbs/vault-157.jpg",
    "caption": "Two peas in a very chaotic pod \ud83d\ude02",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 157"
  },
  {
    "id": "vault-158",
    "url": "/photos/web/vault-158.jpg",
    "thumbUrl": "/photos/thumbs/vault-158.jpg",
    "caption": "Every journey is 1000x better with you riding shotgun \ud83d\ude99",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 158"
  },
  {
    "id": "vault-159",
    "url": "/photos/web/vault-159.jpg",
    "thumbUrl": "/photos/thumbs/vault-159.jpg",
    "caption": "If you laugh, I laugh. If you fall, I laugh first then help \ud83d\ude1c",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 159"
  },
  {
    "id": "vault-160",
    "url": "/photos/web/vault-160.jpg",
    "thumbUrl": "/photos/thumbs/vault-160.jpg",
    "caption": "Soft golden light and genuine laughter \ud83c\udf1f",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 160"
  },
  {
    "id": "vault-161",
    "url": "/photos/web/vault-161.jpg",
    "thumbUrl": "/photos/thumbs/vault-161.jpg",
    "caption": "A milestone moment etched in my heart forever \ud83c\udf88",
    "category": "Special",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 161"
  },
  {
    "id": "vault-162",
    "url": "/photos/web/vault-162.jpg",
    "thumbUrl": "/photos/thumbs/vault-162.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 162"
  },
  {
    "id": "vault-163",
    "url": "/photos/web/vault-163.jpg",
    "thumbUrl": "/photos/thumbs/vault-163.jpg",
    "caption": "Unfiltered friendship at its finest \ud83e\udd42",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 163"
  },
  {
    "id": "vault-164",
    "url": "/photos/web/vault-164.jpg",
    "thumbUrl": "/photos/thumbs/vault-164.jpg",
    "caption": "Sunsets, wind in our hair, and zero regrets \ud83c\udf05",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 164"
  },
  {
    "id": "vault-165",
    "url": "/photos/web/vault-165.jpg",
    "thumbUrl": "/photos/thumbs/vault-165.jpg",
    "caption": "0% serious, 100% ridiculous \ud83e\udd21",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 165"
  },
  {
    "id": "vault-166",
    "url": "/photos/web/vault-166.jpg",
    "thumbUrl": "/photos/thumbs/vault-166.jpg",
    "caption": "That split second before we both burst out laughing \ud83e\udd79",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 166"
  },
  {
    "id": "vault-167",
    "url": "/photos/web/vault-167.jpg",
    "thumbUrl": "/photos/thumbs/vault-167.jpg",
    "caption": "Golden memories woven into our story \ud83d\udcab",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 167"
  },
  {
    "id": "vault-168",
    "url": "/photos/web/vault-168.jpg",
    "thumbUrl": "/photos/thumbs/vault-168.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 168"
  },
  {
    "id": "vault-169",
    "url": "/photos/web/vault-169.jpg",
    "thumbUrl": "/photos/thumbs/vault-169.jpg",
    "caption": "Our default state: unhinged and inseparable \ud83e\udef6\ud83c\udffb",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 169"
  },
  {
    "id": "vault-170",
    "url": "/photos/web/vault-170.jpg",
    "thumbUrl": "/photos/thumbs/vault-170.jpg",
    "caption": "We survived this trip and came back with 800 photos \ud83d\udcf8",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 170"
  },
  {
    "id": "vault-171",
    "url": "/photos/web/vault-171.jpg",
    "thumbUrl": "/photos/thumbs/vault-171.jpg",
    "caption": "Please never let anyone see the unedited version of this \ud83d\udc80",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 171"
  },
  {
    "id": "vault-172",
    "url": "/photos/web/vault-172.jpg",
    "thumbUrl": "/photos/thumbs/vault-172.jpg",
    "caption": "Mid-sentence, mid-laughter, pure perfection \u2728",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 172"
  },
  {
    "id": "vault-173",
    "url": "/photos/web/vault-173.jpg",
    "thumbUrl": "/photos/thumbs/vault-173.jpg",
    "caption": "Happy tears, big hugs, and endless love \ud83e\udd79\u2764\ufe0f",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 173"
  },
  {
    "id": "vault-174",
    "url": "/photos/web/vault-174.jpg",
    "thumbUrl": "/photos/thumbs/vault-174.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 174"
  },
  {
    "id": "vault-175",
    "url": "/photos/web/vault-175.jpg",
    "thumbUrl": "/photos/thumbs/vault-175.jpg",
    "caption": "Golden moments with my favourite human \u2600\ufe0f",
    "category": "Together",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 175"
  },
  {
    "id": "vault-176",
    "url": "/photos/web/vault-176.jpg",
    "thumbUrl": "/photos/thumbs/vault-176.jpg",
    "caption": "Taking over new cities like we own the place \ud83d\ude0e",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 176"
  },
  {
    "id": "vault-177",
    "url": "/photos/web/vault-177.jpg",
    "thumbUrl": "/photos/thumbs/vault-177.jpg",
    "caption": "When you try to take a cute photo but chaos takes over \ud83d\udca5",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 177"
  },
  {
    "id": "vault-178",
    "url": "/photos/web/vault-178.jpg",
    "thumbUrl": "/photos/thumbs/vault-178.jpg",
    "caption": "Sweet candid energy with my favourite girl \ud83c\udf37",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 178"
  },
  {
    "id": "vault-179",
    "url": "/photos/web/vault-179.jpg",
    "thumbUrl": "/photos/thumbs/vault-179.jpg",
    "caption": "A picture worth ten thousand words and a million hugs \ud83e\udec2",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 179"
  },
  {
    "id": "vault-180",
    "url": "/photos/web/vault-180.jpg",
    "thumbUrl": "/photos/thumbs/vault-180.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 180"
  },
  {
    "id": "vault-181",
    "url": "/photos/web/vault-181.jpg",
    "thumbUrl": "/photos/thumbs/vault-181.jpg",
    "caption": "The duo that nobody asked for but everyone needed \u2764\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 181"
  },
  {
    "id": "vault-182",
    "url": "/photos/web/vault-182.jpg",
    "thumbUrl": "/photos/thumbs/vault-182.jpg",
    "caption": "Lost again, but at least we are lost together \ud83d\uddfa\ufe0f",
    "category": "Adventures",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 182"
  },
  {
    "id": "vault-183",
    "url": "/photos/web/vault-183.jpg",
    "thumbUrl": "/photos/thumbs/vault-183.jpg",
    "caption": "Why are we like this?! \ud83d\ude02",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 183"
  },
  {
    "id": "vault-184",
    "url": "/photos/web/vault-184.jpg",
    "thumbUrl": "/photos/thumbs/vault-184.jpg",
    "caption": "You radiating pure joy as always \ud83d\udc96",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 184"
  },
  {
    "id": "vault-185",
    "url": "/photos/web/vault-185.jpg",
    "thumbUrl": "/photos/thumbs/vault-185.jpg",
    "caption": "To the girl who makes every single milestone so special \ud83e\udd42",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 185"
  },
  {
    "id": "vault-186",
    "url": "/photos/web/vault-186.jpg",
    "thumbUrl": "/photos/thumbs/vault-186.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 186"
  },
  {
    "id": "vault-187",
    "url": "/photos/web/vault-187.jpg",
    "thumbUrl": "/photos/thumbs/vault-187.jpg",
    "caption": "Two peas in a very chaotic pod \ud83d\ude02",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 187"
  },
  {
    "id": "vault-188",
    "url": "/photos/web/vault-188.jpg",
    "thumbUrl": "/photos/thumbs/vault-188.jpg",
    "caption": "Every journey is 1000x better with you riding shotgun \ud83d\ude99",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 188"
  },
  {
    "id": "vault-189",
    "url": "/photos/web/vault-189.jpg",
    "thumbUrl": "/photos/thumbs/vault-189.jpg",
    "caption": "If you laugh, I laugh. If you fall, I laugh first then help \ud83d\ude1c",
    "category": "Silly",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 189"
  },
  {
    "id": "vault-190",
    "url": "/photos/web/vault-190.jpg",
    "thumbUrl": "/photos/thumbs/vault-190.jpg",
    "caption": "Soft golden light and genuine laughter \ud83c\udf1f",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 190"
  },
  {
    "id": "vault-191",
    "url": "/photos/web/vault-191.jpg",
    "thumbUrl": "/photos/thumbs/vault-191.jpg",
    "caption": "A milestone moment etched in my heart forever \ud83c\udf88",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 191"
  },
  {
    "id": "vault-192",
    "url": "/photos/web/vault-192.jpg",
    "thumbUrl": "/photos/thumbs/vault-192.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 192"
  },
  {
    "id": "vault-193",
    "url": "/photos/web/vault-193.jpg",
    "thumbUrl": "/photos/thumbs/vault-193.jpg",
    "caption": "Unfiltered friendship at its finest \ud83e\udd42",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 193"
  },
  {
    "id": "vault-194",
    "url": "/photos/web/vault-194.jpg",
    "thumbUrl": "/photos/thumbs/vault-194.jpg",
    "caption": "Sunsets, wind in our hair, and zero regrets \ud83c\udf05",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 194"
  },
  {
    "id": "vault-195",
    "url": "/photos/web/vault-195.jpg",
    "thumbUrl": "/photos/thumbs/vault-195.jpg",
    "caption": "0% serious, 100% ridiculous \ud83e\udd21",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 195"
  },
  {
    "id": "vault-196",
    "url": "/photos/web/vault-196.jpg",
    "thumbUrl": "/photos/thumbs/vault-196.jpg",
    "caption": "That split second before we both burst out laughing \ud83e\udd79",
    "category": "Candid",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 196"
  },
  {
    "id": "vault-197",
    "url": "/photos/web/vault-197.jpg",
    "thumbUrl": "/photos/thumbs/vault-197.jpg",
    "caption": "Golden memories woven into our story \ud83d\udcab",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 197"
  },
  {
    "id": "vault-198",
    "url": "/photos/web/vault-198.jpg",
    "thumbUrl": "/photos/thumbs/vault-198.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 198"
  },
  {
    "id": "vault-199",
    "url": "/photos/web/vault-199.jpg",
    "thumbUrl": "/photos/thumbs/vault-199.jpg",
    "caption": "Our default state: unhinged and inseparable \ud83e\udef6\ud83c\udffb",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 199"
  },
  {
    "id": "vault-200",
    "url": "/photos/web/vault-200.jpg",
    "thumbUrl": "/photos/thumbs/vault-200.jpg",
    "caption": "We survived this trip and came back with 800 photos \ud83d\udcf8",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 200"
  },
  {
    "id": "vault-201",
    "url": "/photos/web/vault-201.jpg",
    "thumbUrl": "/photos/thumbs/vault-201.jpg",
    "caption": "Please never let anyone see the unedited version of this \ud83d\udc80",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 201"
  },
  {
    "id": "vault-202",
    "url": "/photos/web/vault-202.jpg",
    "thumbUrl": "/photos/thumbs/vault-202.jpg",
    "caption": "Mid-sentence, mid-laughter, pure perfection \u2728",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 202"
  },
  {
    "id": "vault-203",
    "url": "/photos/web/vault-203.jpg",
    "thumbUrl": "/photos/thumbs/vault-203.jpg",
    "caption": "Happy tears, big hugs, and endless love \ud83e\udd79\u2764\ufe0f",
    "category": "Special",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 203"
  },
  {
    "id": "vault-204",
    "url": "/photos/web/vault-204.jpg",
    "thumbUrl": "/photos/thumbs/vault-204.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 204"
  },
  {
    "id": "vault-205",
    "url": "/photos/web/vault-205.jpg",
    "thumbUrl": "/photos/thumbs/vault-205.jpg",
    "caption": "Golden moments with my favourite human \u2600\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 205"
  },
  {
    "id": "vault-206",
    "url": "/photos/web/vault-206.jpg",
    "thumbUrl": "/photos/thumbs/vault-206.jpg",
    "caption": "Taking over new cities like we own the place \ud83d\ude0e",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 206"
  },
  {
    "id": "vault-207",
    "url": "/photos/web/vault-207.jpg",
    "thumbUrl": "/photos/thumbs/vault-207.jpg",
    "caption": "When you try to take a cute photo but chaos takes over \ud83d\udca5",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 207"
  },
  {
    "id": "vault-208",
    "url": "/photos/web/vault-208.jpg",
    "thumbUrl": "/photos/thumbs/vault-208.jpg",
    "caption": "Sweet candid energy with my favourite girl \ud83c\udf37",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 208"
  },
  {
    "id": "vault-209",
    "url": "/photos/web/vault-209.jpg",
    "thumbUrl": "/photos/thumbs/vault-209.jpg",
    "caption": "A picture worth ten thousand words and a million hugs \ud83e\udec2",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 209"
  },
  {
    "id": "vault-210",
    "url": "/photos/web/vault-210.jpg",
    "thumbUrl": "/photos/thumbs/vault-210.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 210"
  },
  {
    "id": "vault-211",
    "url": "/photos/web/vault-211.jpg",
    "thumbUrl": "/photos/thumbs/vault-211.jpg",
    "caption": "The duo that nobody asked for but everyone needed \u2764\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 211"
  },
  {
    "id": "vault-212",
    "url": "/photos/web/vault-212.jpg",
    "thumbUrl": "/photos/thumbs/vault-212.jpg",
    "caption": "Lost again, but at least we are lost together \ud83d\uddfa\ufe0f",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 212"
  },
  {
    "id": "vault-213",
    "url": "/photos/web/vault-213.jpg",
    "thumbUrl": "/photos/thumbs/vault-213.jpg",
    "caption": "Why are we like this?! \ud83d\ude02",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 213"
  },
  {
    "id": "vault-214",
    "url": "/photos/web/vault-214.jpg",
    "thumbUrl": "/photos/thumbs/vault-214.jpg",
    "caption": "You radiating pure joy as always \ud83d\udc96",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 214"
  },
  {
    "id": "vault-215",
    "url": "/photos/web/vault-215.jpg",
    "thumbUrl": "/photos/thumbs/vault-215.jpg",
    "caption": "To the girl who makes every single milestone so special \ud83e\udd42",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 215"
  },
  {
    "id": "vault-216",
    "url": "/photos/web/vault-216.jpg",
    "thumbUrl": "/photos/thumbs/vault-216.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 216"
  },
  {
    "id": "vault-217",
    "url": "/photos/web/vault-217.jpg",
    "thumbUrl": "/photos/thumbs/vault-217.jpg",
    "caption": "Two peas in a very chaotic pod \ud83d\ude02",
    "category": "Together",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 217"
  },
  {
    "id": "vault-218",
    "url": "/photos/web/vault-218.jpg",
    "thumbUrl": "/photos/thumbs/vault-218.jpg",
    "caption": "Every journey is 1000x better with you riding shotgun \ud83d\ude99",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 218"
  },
  {
    "id": "vault-219",
    "url": "/photos/web/vault-219.jpg",
    "thumbUrl": "/photos/thumbs/vault-219.jpg",
    "caption": "If you laugh, I laugh. If you fall, I laugh first then help \ud83d\ude1c",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 219"
  },
  {
    "id": "vault-220",
    "url": "/photos/web/vault-220.jpg",
    "thumbUrl": "/photos/thumbs/vault-220.jpg",
    "caption": "Soft golden light and genuine laughter \ud83c\udf1f",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 220"
  },
  {
    "id": "vault-221",
    "url": "/photos/web/vault-221.jpg",
    "thumbUrl": "/photos/thumbs/vault-221.jpg",
    "caption": "A milestone moment etched in my heart forever \ud83c\udf88",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 221"
  },
  {
    "id": "vault-222",
    "url": "/photos/web/vault-222.jpg",
    "thumbUrl": "/photos/thumbs/vault-222.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 222"
  },
  {
    "id": "vault-223",
    "url": "/photos/web/vault-223.jpg",
    "thumbUrl": "/photos/thumbs/vault-223.jpg",
    "caption": "Unfiltered friendship at its finest \ud83e\udd42",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 223"
  },
  {
    "id": "vault-224",
    "url": "/photos/web/vault-224.jpg",
    "thumbUrl": "/photos/thumbs/vault-224.jpg",
    "caption": "Sunsets, wind in our hair, and zero regrets \ud83c\udf05",
    "category": "Adventures",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 224"
  },
  {
    "id": "vault-225",
    "url": "/photos/web/vault-225.jpg",
    "thumbUrl": "/photos/thumbs/vault-225.jpg",
    "caption": "0% serious, 100% ridiculous \ud83e\udd21",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 225"
  },
  {
    "id": "vault-226",
    "url": "/photos/web/vault-226.jpg",
    "thumbUrl": "/photos/thumbs/vault-226.jpg",
    "caption": "That split second before we both burst out laughing \ud83e\udd79",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 226"
  },
  {
    "id": "vault-227",
    "url": "/photos/web/vault-227.jpg",
    "thumbUrl": "/photos/thumbs/vault-227.jpg",
    "caption": "Golden memories woven into our story \ud83d\udcab",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 227"
  },
  {
    "id": "vault-228",
    "url": "/photos/web/vault-228.jpg",
    "thumbUrl": "/photos/thumbs/vault-228.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 228"
  },
  {
    "id": "vault-229",
    "url": "/photos/web/vault-229.jpg",
    "thumbUrl": "/photos/thumbs/vault-229.jpg",
    "caption": "Our default state: unhinged and inseparable \ud83e\udef6\ud83c\udffb",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 229"
  },
  {
    "id": "vault-230",
    "url": "/photos/web/vault-230.jpg",
    "thumbUrl": "/photos/thumbs/vault-230.jpg",
    "caption": "We survived this trip and came back with 800 photos \ud83d\udcf8",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 230"
  },
  {
    "id": "vault-231",
    "url": "/photos/web/vault-231.jpg",
    "thumbUrl": "/photos/thumbs/vault-231.jpg",
    "caption": "Please never let anyone see the unedited version of this \ud83d\udc80",
    "category": "Silly",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 231"
  },
  {
    "id": "vault-232",
    "url": "/photos/web/vault-232.jpg",
    "thumbUrl": "/photos/thumbs/vault-232.jpg",
    "caption": "Mid-sentence, mid-laughter, pure perfection \u2728",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 232"
  },
  {
    "id": "vault-233",
    "url": "/photos/web/vault-233.jpg",
    "thumbUrl": "/photos/thumbs/vault-233.jpg",
    "caption": "Happy tears, big hugs, and endless love \ud83e\udd79\u2764\ufe0f",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 233"
  },
  {
    "id": "vault-234",
    "url": "/photos/web/vault-234.jpg",
    "thumbUrl": "/photos/thumbs/vault-234.jpg",
    "caption": "Did we order too much? Absolutely. Did we finish it? Yes. \ud83c\udf55",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 234"
  },
  {
    "id": "vault-235",
    "url": "/photos/web/vault-235.jpg",
    "thumbUrl": "/photos/thumbs/vault-235.jpg",
    "caption": "Golden moments with my favourite human \u2600\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 235"
  },
  {
    "id": "vault-236",
    "url": "/photos/web/vault-236.jpg",
    "thumbUrl": "/photos/thumbs/vault-236.jpg",
    "caption": "Taking over new cities like we own the place \ud83d\ude0e",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 236"
  },
  {
    "id": "vault-237",
    "url": "/photos/web/vault-237.jpg",
    "thumbUrl": "/photos/thumbs/vault-237.jpg",
    "caption": "When you try to take a cute photo but chaos takes over \ud83d\udca5",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 237"
  },
  {
    "id": "vault-238",
    "url": "/photos/web/vault-238.jpg",
    "thumbUrl": "/photos/thumbs/vault-238.jpg",
    "caption": "Sweet candid energy with my favourite girl \ud83c\udf37",
    "category": "Candid",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 238"
  },
  {
    "id": "vault-239",
    "url": "/photos/web/vault-239.jpg",
    "thumbUrl": "/photos/thumbs/vault-239.jpg",
    "caption": "A picture worth ten thousand words and a million hugs \ud83e\udec2",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 239"
  },
  {
    "id": "vault-240",
    "url": "/photos/web/vault-240.jpg",
    "thumbUrl": "/photos/thumbs/vault-240.jpg",
    "caption": "Our friendship is 80% talking about what to eat next \ud83c\udf69",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 240"
  },
  {
    "id": "vault-241",
    "url": "/photos/web/vault-241.jpg",
    "thumbUrl": "/photos/thumbs/vault-241.jpg",
    "caption": "The duo that nobody asked for but everyone needed \u2764\ufe0f",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 241"
  },
  {
    "id": "vault-242",
    "url": "/photos/web/vault-242.jpg",
    "thumbUrl": "/photos/thumbs/vault-242.jpg",
    "caption": "Lost again, but at least we are lost together \ud83d\uddfa\ufe0f",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 242"
  },
  {
    "id": "vault-243",
    "url": "/photos/web/vault-243.jpg",
    "thumbUrl": "/photos/thumbs/vault-243.jpg",
    "caption": "Why are we like this?! \ud83d\ude02",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 243"
  },
  {
    "id": "vault-244",
    "url": "/photos/web/vault-244.jpg",
    "thumbUrl": "/photos/thumbs/vault-244.jpg",
    "caption": "You radiating pure joy as always \ud83d\udc96",
    "category": "Candid",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 244"
  },
  {
    "id": "vault-245",
    "url": "/photos/web/vault-245.jpg",
    "thumbUrl": "/photos/thumbs/vault-245.jpg",
    "caption": "To the girl who makes every single milestone so special \ud83e\udd42",
    "category": "Special",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 245"
  },
  {
    "id": "vault-246",
    "url": "/photos/web/vault-246.jpg",
    "thumbUrl": "/photos/thumbs/vault-246.jpg",
    "caption": "The cafe was cute, but your smile was cuter \ud83e\udd50",
    "category": "Food & Treats",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 246"
  },
  {
    "id": "vault-247",
    "url": "/photos/web/vault-247.jpg",
    "thumbUrl": "/photos/thumbs/vault-247.jpg",
    "caption": "Two peas in a very chaotic pod \ud83d\ude02",
    "category": "Together",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 247"
  },
  {
    "id": "vault-248",
    "url": "/photos/web/vault-248.jpg",
    "thumbUrl": "/photos/thumbs/vault-248.jpg",
    "caption": "Every journey is 1000x better with you riding shotgun \ud83d\ude99",
    "category": "Adventures",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 248"
  },
  {
    "id": "vault-249",
    "url": "/photos/web/vault-249.jpg",
    "thumbUrl": "/photos/thumbs/vault-249.jpg",
    "caption": "If you laugh, I laugh. If you fall, I laugh first then help \ud83d\ude1c",
    "category": "Silly",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 249"
  },
  {
    "id": "vault-250",
    "url": "/photos/web/vault-250.jpg",
    "thumbUrl": "/photos/thumbs/vault-250.jpg",
    "caption": "Soft golden light and genuine laughter \ud83c\udf1f",
    "category": "Candid",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 250"
  },
  {
    "id": "vault-251",
    "url": "/photos/web/vault-251.jpg",
    "thumbUrl": "/photos/thumbs/vault-251.jpg",
    "caption": "A milestone moment etched in my heart forever \ud83c\udf88",
    "category": "Special",
    "favourite": false,
    "alt": "Shuttumani & Sundramani memory 251"
  },
  {
    "id": "vault-252",
    "url": "/photos/web/vault-252.jpg",
    "thumbUrl": "/photos/thumbs/vault-252.jpg",
    "caption": "Sweet treats for the sweetest bestie in the world \ud83c\udf68",
    "category": "Food & Treats",
    "favourite": true,
    "alt": "Shuttumani & Sundramani memory 252"
  }
];

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
