'use client';

import { useState } from 'react';
import { Music, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface SoundCategory {
  name: string;
  description: string;
  trending: boolean;
  contentIdeas: string[];
  bestFor: string[];
  tips: string;
}

const soundCategories: SoundCategory[] = [
  {
    name: 'Trending Pop Songs',
    description: 'Current chart-topping songs and viral snippets. These change weekly — check TikTok Creative Center for the latest.',
    trending: true,
    contentIdeas: [
      'Dance challenges with the chorus',
      'Lip-sync transitions',
      'Before/after reveals timed to the beat drop',
      'Get Ready With Me with the song as background',
      'Outfit changes on beat switches',
    ],
    bestFor: ['Fashion', 'Beauty', 'Dance', 'Lifestyle'],
    tips: 'Use the first 15 seconds of trending songs. The algorithm favors early adoption — use sounds within the first 48 hours of them trending.',
  },
  {
    name: 'Nostalgic / Throwback Audio',
    description: 'Classic songs, TV show quotes, and movie dialogue from the 90s-2000s. Consistently popular across demographics.',
    trending: true,
    contentIdeas: [
      '"Things that just hit different" compilations',
      'Childhood vs adulthood comparisons',
      'Recreating old trends with a modern twist',
      'Memory lane / photo dumps',
      '"Tell me your age without telling me your age"',
    ],
    bestFor: ['Lifestyle', 'Comedy', 'Nostalgia content'],
    tips: 'Nostalgia content gets high save rates. Pair with relatable text overlays targeting specific age groups.',
  },
  {
    name: 'Voiceover / Narration Sounds',
    description: 'Original voiceovers, story narrations, and spoken word. Great for educational and informational content.',
    trending: true,
    contentIdeas: [
      'Storytime with text overlay',
      'Step-by-step tutorials',
      'Product reviews with honest commentary',
      'Day-in-my-life narration',
      'Explaining complex topics simply',
    ],
    bestFor: ['Education', 'Business', 'Tech', 'Storytime'],
    tips: 'Use your own voice when possible — original audio gets algorithm preference. Keep narration concise and add captions.',
  },
  {
    name: 'Dramatic / Cinematic Sounds',
    description: 'Epic orchestral hits, suspenseful builds, and dramatic reveal music. Perfect for transformation content.',
    trending: false,
    contentIdeas: [
      'Before/after transformations',
      'Big reveal moments',
      'Room makeovers and renovations',
      'Cooking plating reveals',
      'Art process with dramatic finish',
    ],
    bestFor: ['DIY', 'Art', 'Food', 'Home decor', 'Fitness transformations'],
    tips: 'Time your reveal to the beat drop or climax. The anticipation-payoff loop keeps viewers watching until the end.',
  },
  {
    name: 'Lo-fi / Chill Beats',
    description: 'Relaxing background music, lo-fi hip-hop, ambient sounds. Steady performer for aesthetic content.',
    trending: false,
    contentIdeas: [
      'Study with me / work with me',
      'Aesthetic routines (morning, skincare, cooking)',
      'Journaling and planning content',
      'Cozy vibes and room tours',
      'ASMR-style content',
    ],
    bestFor: ['Lifestyle', 'Productivity', 'Aesthetic', 'ASMR'],
    tips: 'Great for longer watch times. Lo-fi content has a dedicated audience — consistency matters more than virality here.',
  },
  {
    name: 'Funny / Meme Audio',
    description: 'Viral dialogue, reaction sounds, comedic audio clips. High sharing potential.',
    trending: true,
    contentIdeas: [
      'Relatable situation skits',
      'Expectation vs reality',
      'POV scenarios',
      'Reaction content',
      'Self-deprecating humor about your niche',
    ],
    bestFor: ['Comedy', 'Relatable content', 'Any niche with humor'],
    tips: 'Timing is everything with comedy audio. Practice the timing before filming. Duets and stitches with funny audio perform well.',
  },
  {
    name: 'Motivational / Hype Audio',
    description: 'Inspirational speeches, pump-up music, success-themed audio. Performs well in morning routine and fitness niches.',
    trending: false,
    contentIdeas: [
      'Morning routine motivation',
      'Workout montages',
      'Business/hustle journey',
      'Goal-setting content',
      'Progress and growth compilations',
    ],
    bestFor: ['Fitness', 'Business', 'Self-improvement', 'Motivation'],
    tips: 'Pair with fast-cut editing and strong visuals. Post between 5-7AM when the motivation-seeking audience is active.',
  },
  {
    name: 'ASMR / Satisfying Sounds',
    description: 'Crunching, tapping, whispering, oddly satisfying audio. Extremely high watch time and loop rates.',
    trending: true,
    contentIdeas: [
      'Product unboxing with crisp sounds',
      'Cooking ASMR (chopping, sizzling)',
      'Art and craft processes',
      'Organizing and cleaning',
      'Writing and journaling sounds',
    ],
    bestFor: ['Food', 'Art', 'Organization', 'Unboxing', 'Cleaning'],
    tips: 'Invest in good audio capture. Viewers watch with sound ON for ASMR content. Keep videos short (15-30s) for maximum loops.',
  },
];

const s = {
  container: { maxWidth: 750, margin: '0 auto' },
  intro: { fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24, padding: 16, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' },
  card: {
    background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
    marginBottom: 12, overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
    cursor: 'pointer', gap: 12,
  },
  cardTitle: { display: 'flex', alignItems: 'center', gap: 10 },
  name: { fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' },
  trendBadge: { fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--success)20', color: 'var(--success)', fontWeight: 600 },
  desc: { fontSize: 13, color: 'var(--text-muted)', marginTop: 2 },
  body: { padding: '0 20px 20px', borderTop: '1px solid var(--border)' },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 0.5, marginBottom: 8 },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { padding: '6px 0', fontSize: 14, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: 8 },
  tags: { display: 'flex', flexWrap: 'wrap' as const, gap: 6 },
  tag: { padding: '4px 10px', borderRadius: 4, background: 'var(--bg-tertiary)', fontSize: 12, color: 'var(--text-secondary)' },
  tip: { display: 'flex', gap: 10, padding: 12, background: 'var(--accent-light)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 },
};

export default function TrendingSounds() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div style={s.container}>
      <div style={s.intro}>
        <strong>How to use:</strong> Browse trending sound categories below. Each category includes content ideas and tips for using that style of audio effectively on TikTok. For specific trending songs, check TikTok&apos;s Creative Center which updates in real-time.
      </div>

      {soundCategories.map((cat, i) => (
        <div key={i} style={s.card}>
          <div style={s.cardHeader} onClick={() => setExpanded(expanded === i ? null : i)}>
            <div>
              <div style={s.cardTitle}>
                <Music size={18} color="var(--tiktok)" />
                <span style={s.name}>{cat.name}</span>
                {cat.trending && <span style={s.trendBadge}>Trending</span>}
              </div>
              <div style={s.desc}>{cat.description}</div>
            </div>
            {expanded === i ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
          </div>

          {expanded === i && (
            <div style={s.body}>
              <div style={s.section}>
                <div style={s.sectionTitle}>Content Ideas</div>
                <ul style={s.list}>
                  {cat.contentIdeas.map((idea, j) => (
                    <li key={j} style={s.listItem}>
                      <span style={{ color: 'var(--tiktok)', flexShrink: 0 }}>&#8226;</span>
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={s.section}>
                <div style={s.sectionTitle}>Best For</div>
                <div style={s.tags}>
                  {cat.bestFor.map((tag, j) => (
                    <span key={j} style={s.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div style={s.section}>
                <div style={s.tip}>
                  <Lightbulb size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{cat.tips}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
