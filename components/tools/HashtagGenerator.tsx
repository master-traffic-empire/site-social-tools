'use client';

import { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';

const hashtagDB: Record<string, { top: string[]; medium: string[]; niche: string[] }> = {
  fitness: {
    top: ['fitness', 'workout', 'gym', 'fitnessmotivation', 'fit', 'training', 'health', 'bodybuilding', 'motivation', 'exercise'],
    medium: ['fitfam', 'gymlife', 'personaltrainer', 'healthylifestyle', 'fitnessjourney', 'strengthtraining', 'workoutmotivation', 'fitlife'],
    niche: ['homeworkouts', 'calisthenicslife', 'kettlebellworkout', 'functionalfitness', 'morningworkout', 'legdayworkout', 'fitover40', 'beginnerworkout'],
  },
  food: {
    top: ['food', 'foodie', 'foodporn', 'instafood', 'yummy', 'delicious', 'foodphotography', 'cooking', 'homemade', 'recipe'],
    medium: ['foodblogger', 'foodlover', 'foodstagram', 'healthyfood', 'foodgasm', 'chef', 'eathealthy', 'dinner'],
    niche: ['mealprep', 'plantbasedrecipes', 'veganfoodshare', 'comfortfood', 'homecooking', 'weeknightdinner', 'glutenfreeeats', 'brunchideas'],
  },
  travel: {
    top: ['travel', 'travelgram', 'wanderlust', 'traveling', 'vacation', 'adventure', 'explore', 'travelphotography', 'instatravel', 'trip'],
    medium: ['traveltheworld', 'travelblogger', 'traveladdict', 'beautifuldestinations', 'traveler', 'roadtrip', 'solotravel', 'backpacking'],
    niche: ['hiddengemsof', 'budgettravel', 'digitalnomadlife', 'sustainabletravel', 'offthebeatenpath', 'vanlife', 'slowtravel', 'culturaltravel'],
  },
  fashion: {
    top: ['fashion', 'style', 'ootd', 'fashionista', 'streetstyle', 'fashionblogger', 'outfit', 'instafashion', 'clothing', 'trendy'],
    medium: ['fashionstyle', 'fashioninspo', 'styleinspo', 'outfitoftheday', 'whatiwore', 'fashiondaily', 'lookoftheday', 'styleblogger'],
    niche: ['sustainablefashion', 'thriftedstyle', 'capsulewardrobe', 'minimaliststyle', 'slowfashion', 'vintagefinds', 'modestfashion', 'streetwearstyle'],
  },
  beauty: {
    top: ['beauty', 'makeup', 'skincare', 'beautytips', 'mua', 'cosmetics', 'makeupartist', 'beautiful', 'glam', 'beautycare'],
    medium: ['skincareRoutine', 'makeuptutorial', 'beautyblogger', 'naturalbeauty', 'beautycommunity', 'makeuplover', 'instamakeup', 'beautyproducts'],
    niche: ['cleanbeauty', 'koreanbeauty', 'drugstorebeauty', 'matureskin', 'acnepositivity', 'glassskin', 'skintok', 'beautyover40'],
  },
  business: {
    top: ['business', 'entrepreneur', 'marketing', 'success', 'motivation', 'startup', 'money', 'smallbusiness', 'hustle', 'goals'],
    medium: ['businessowner', 'entrepreneurlife', 'digitalmarketing', 'onlinebusiness', 'businesstips', 'growthmindset', 'sidehustle', 'ceo'],
    niche: ['solopreneur', 'saasfounder', 'bootstrapped', 'indiehacker', 'passiveincome', 'contentcreator', 'personalbranding', 'emailmarketing'],
  },
  photography: {
    top: ['photography', 'photooftheday', 'photo', 'photographer', 'naturephotography', 'landscape', 'portrait', 'canon', 'nikon', 'streetphotography'],
    medium: ['photographylovers', 'photographyislife', 'instaphoto', 'shotoniphone', 'goldenhour', 'moody', 'visualsoflife', 'photographydaily'],
    niche: ['urbanphotography', 'filmisnotdead', 'minimalphoto', 'mobilephotography', 'longexposure', 'droneshots', 'astrophotography', 'bwphotography'],
  },
  tech: {
    top: ['tech', 'technology', 'innovation', 'ai', 'programming', 'coding', 'developer', 'software', 'gadgets', 'computer'],
    medium: ['techlife', 'webdeveloper', 'appdevelopment', 'artificialintelligence', 'machinelearning', 'uxdesign', 'devlife', 'startuplife'],
    niche: ['rustlang', 'reactjs', 'indiedev', 'buildinpublic', 'nocode', 'devtools', 'opensourcecommunity', 'codingbootcamp'],
  },
  pets: {
    top: ['dog', 'cat', 'pets', 'dogsofinstagram', 'catsofinstagram', 'puppy', 'cute', 'petlovers', 'animals', 'kitten'],
    medium: ['doglife', 'catlife', 'adoptdontshop', 'puppylove', 'doglover', 'kitty', 'furbaby', 'petsofinstagram'],
    niche: ['goldenretrieversofinstagram', 'rescuedog', 'seniordogs', 'catmom', 'dogtraining', 'rawfeddog', 'bengalcat', 'doodlesofinstagram'],
  },
  music: {
    top: ['music', 'musician', 'singer', 'hiphop', 'rap', 'dj', 'producer', 'newmusic', 'artist', 'song'],
    medium: ['musicproducer', 'singersongwriter', 'livemusic', 'musicislife', 'indiemusic', 'guitar', 'beats', 'songwriting'],
    niche: ['lofibeats', 'bedroomproducer', 'synthwave', 'jazzguitar', 'musicproduction101', 'coverartist', 'indiefolk', 'beatmaker'],
  },
};

const allTopics = Object.keys(hashtagDB);

function findHashtags(query: string): { top: string[]; medium: string[]; niche: string[] } | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  // Direct match
  if (hashtagDB[q]) return hashtagDB[q];

  // Partial match
  const found = allTopics.find((t) => t.includes(q) || q.includes(t));
  if (found) return hashtagDB[found];

  // Keyword matching
  const keywords: Record<string, string> = {
    gym: 'fitness', workout: 'fitness', exercise: 'fitness', health: 'fitness',
    eat: 'food', cook: 'food', recipe: 'food', restaurant: 'food', meal: 'food',
    trip: 'travel', vacation: 'travel', explore: 'travel', tourist: 'travel',
    clothes: 'fashion', outfit: 'fashion', wear: 'fashion', dress: 'fashion',
    skin: 'beauty', makeup: 'beauty', cosmetic: 'beauty', hair: 'beauty',
    startup: 'business', company: 'business', money: 'business', brand: 'business',
    camera: 'photography', photo: 'photography', picture: 'photography', lens: 'photography',
    code: 'tech', app: 'tech', digital: 'tech', software: 'tech', web: 'tech',
    dog: 'pets', cat: 'pets', puppy: 'pets', kitten: 'pets', animal: 'pets',
    song: 'music', band: 'music', guitar: 'music', piano: 'music', sing: 'music',
  };
  for (const [kw, topic] of Object.entries(keywords)) {
    if (q.includes(kw)) return hashtagDB[topic];
  }

  // Fallback: generic social media hashtags
  return {
    top: ['instagood', 'photooftheday', 'love', 'picoftheday', 'instadaily', 'followme', 'bestoftheday', 'happy', 'trending', 'viral'],
    medium: ['contentcreator', 'explorepage', 'viralpost', 'reelsinstagram', 'growthtips', 'communityovercompetition', 'socialmediastrategy', 'engaged'],
    niche: [q.replace(/\s+/g, ''), `${q.replace(/\s+/g, '')}tips`, `${q.replace(/\s+/g, '')}community`, `${q.replace(/\s+/g, '')}life`, `${q.replace(/\s+/g, '')}daily`, `${q.replace(/\s+/g, '')}lover`, `${q.replace(/\s+/g, '')}ofinstagram`, `${q.replace(/\s+/g, '')}gram`],
  };
}

const s = {
  container: { maxWidth: 700, margin: '0 auto' },
  inputWrap: { position: 'relative' as const, marginBottom: 24 },
  input: {
    width: '100%', padding: '14px 16px 14px 48px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 15, outline: 'none',
  },
  icon: { position: 'absolute' as const, left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' },
  topics: { display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 24 },
  topicBtn: {
    padding: '6px 14px', borderRadius: 16, border: '1px solid var(--border)', background: 'transparent',
    color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
  },
  section: { marginBottom: 28 },
  sectionHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 600 },
  copyBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
  },
  tags: { display: 'flex', flexWrap: 'wrap' as const, gap: 8 },
  tag: {
    padding: '8px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)',
    border: '1px solid var(--border)', fontSize: 14, color: 'var(--accent)', cursor: 'pointer',
  },
  selectedTag: { background: 'var(--accent-light)', borderColor: 'var(--accent)' },
  copyAll: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, padding: '16px 20px',
    background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
  },
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: 'var(--accent)', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer',
  },
};

export default function HashtagGenerator() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState('');

  const results = findHashtags(query);

  const toggleTag = (tag: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const copyTags = (tags: string[], label: string) => {
    navigator.clipboard.writeText(tags.map((t) => `#${t}`).join(' '));
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const copySelected = () => {
    navigator.clipboard.writeText([...selected].map((t) => `#${t}`).join(' '));
    setCopied('selected');
    setTimeout(() => setCopied(''), 2000);
  };

  const tiers = results ? [
    { key: 'top', label: 'Top (High Reach)', color: '#ef4444', tags: results.top },
    { key: 'medium', label: 'Medium (Moderate Reach)', color: '#eab308', tags: results.medium },
    { key: 'niche', label: 'Niche (Low Competition)', color: '#22c55e', tags: results.niche },
  ] : [];

  return (
    <div style={s.container}>
      <div style={s.inputWrap}>
        <Hash size={18} style={s.icon} />
        <input
          style={s.input}
          placeholder="Enter a topic (e.g., fitness, food, travel, tech)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div style={s.topics}>
        {allTopics.map((t) => (
          <button key={t} style={s.topicBtn} onClick={() => setQuery(t)}>
            {t}
          </button>
        ))}
      </div>

      {tiers.map((tier) => (
        <div key={tier.key} style={s.section}>
          <div style={s.sectionHead}>
            <div style={s.sectionTitle}>
              <span style={{ color: tier.color, marginRight: 8 }}>&#9679;</span>
              {tier.label}
            </div>
            <button style={s.copyBtn} onClick={() => copyTags(tier.tags, tier.key)}>
              {copied === tier.key ? <Check size={14} /> : <Copy size={14} />}
              {copied === tier.key ? 'Copied' : 'Copy All'}
            </button>
          </div>
          <div style={s.tags}>
            {tier.tags.map((tag) => (
              <span
                key={tag}
                style={{ ...s.tag, ...(selected.has(tag) ? s.selectedTag : {}) }}
                onClick={() => toggleTag(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      {selected.size > 0 && (
        <div style={s.copyAll}>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            {selected.size} hashtags selected
          </span>
          <button style={s.btn} onClick={copySelected}>
            {copied === 'selected' ? <Check size={16} /> : <Copy size={16} />}
            {copied === 'selected' ? 'Copied!' : 'Copy Selected'}
          </button>
        </div>
      )}
    </div>
  );
}
