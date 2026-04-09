'use client';

import { useState } from 'react';
import { MessageSquare, Copy, Check, RefreshCw } from 'lucide-react';

type Tone = 'funny' | 'professional' | 'casual' | 'inspirational' | 'edgy';

const tones: { value: Tone; label: string; desc: string }[] = [
  { value: 'funny', label: 'Funny', desc: 'Witty, humorous, playful' },
  { value: 'professional', label: 'Professional', desc: 'Polished, authoritative' },
  { value: 'casual', label: 'Casual', desc: 'Relaxed, friendly, conversational' },
  { value: 'inspirational', label: 'Inspirational', desc: 'Uplifting, motivational' },
  { value: 'edgy', label: 'Edgy', desc: 'Bold, controversial, attention-grabbing' },
];

const templates: Record<Tone, ((topic: string) => string)[]> = {
  funny: [
    (t) => `POV: You finally figured out ${t} and now you won't shut up about it.\n\nNo but seriously, this changed everything.`,
    (t) => `My therapist said I need a hobby.\n\nSo here I am, obsessing over ${t} like a totally normal person.`,
    (t) => `Me: I should sleep early tonight.\nAlso me at 2am: *researching ${t}*\n\nWho else?`,
    (t) => `If ${t} was a person, I'd take it out to dinner.\n\nJust saying.`,
    (t) => `Tell me you're into ${t} without telling me you're into ${t}.\n\nI'll go first...`,
  ],
  professional: [
    (t) => `Here's what most people get wrong about ${t}:\n\nThey focus on the wrong metrics. Here are the 3 that actually matter:`,
    (t) => `After months of testing, here's my proven ${t} strategy:\n\nStep 1: Start with the fundamentals\nStep 2: Measure everything\nStep 3: Double down on what works\n\nSave this for later.`,
    (t) => `The ${t} landscape is shifting fast.\n\nHere are 5 trends you need to know about (and how to stay ahead):`,
    (t) => `I've spent 1000+ hours studying ${t}.\n\nHere's the single most important lesson I've learned:`,
    (t) => `Want to master ${t}? Stop doing these 3 things:\n\n1. Chasing shortcuts\n2. Ignoring the data\n3. Going at it alone\n\nStart doing this instead:`,
  ],
  casual: [
    (t) => `Just got into ${t} and honestly? Best decision ever.\n\nDrop your favorite tips below!`,
    (t) => `Trying something new with ${t} today. Wish me luck.\n\nWill update you guys on how it goes!`,
    (t) => `Real talk: ${t} isn't as hard as everyone makes it seem.\n\nHere's what actually helped me get started.`,
    (t) => `Sunday vibes + ${t} = perfect combo.\n\nWhat are you guys up to today?`,
    (t) => `Can we talk about ${t} for a sec? Because I have thoughts.\n\nLet me know if you agree.`,
  ],
  inspirational: [
    (t) => `Your journey with ${t} starts with a single step.\n\nDon't wait for the perfect moment. Start now, adjust later.`,
    (t) => `6 months ago, I knew nothing about ${t}.\n\nToday, it's completely transformed my perspective.\n\nThe lesson? Start before you're ready.`,
    (t) => `The best time to start ${t} was yesterday.\nThe second best time is right now.\n\nWhat's holding you back?`,
    (t) => `Everyone who's great at ${t} was once a beginner.\n\nRemember that the next time you feel like giving up.`,
    (t) => `${t} taught me something powerful:\n\nConsistency beats perfection. Every single time.\n\nKeep going.`,
  ],
  edgy: [
    (t) => `Unpopular opinion: Most ${t} advice on here is garbage.\n\nHere's what actually works (and why nobody talks about it):`,
    (t) => `Stop asking for permission to pursue ${t}.\n\nThe people telling you it's too late already wish they started sooner.`,
    (t) => `Hot take: If you're not failing at ${t}, you're playing it too safe.\n\nBreak something. Learn faster.`,
    (t) => `The ${t} industry doesn't want you to know this.\n\nBut I'm going to tell you anyway.`,
    (t) => `Everyone's copying the same ${t} playbook.\n\nWant to actually stand out? Do the opposite of what the gurus say.`,
  ],
};

const s = {
  container: { maxWidth: 700, margin: '0 auto' },
  label: { display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 } as React.CSSProperties,
  input: {
    width: '100%', padding: '14px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 15, outline: 'none', marginBottom: 24,
  },
  tones: { display: 'flex', flexWrap: 'wrap' as const, gap: 10, marginBottom: 24 },
  toneBtn: {
    padding: '10px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left' as const,
    flex: '1 1 150px',
  },
  toneActive: { borderColor: 'var(--accent)', background: 'var(--accent-light)', color: 'var(--text-primary)' },
  toneName: { fontWeight: 600, fontSize: 14 },
  toneDesc: { fontSize: 12, color: 'var(--text-muted)', marginTop: 2 },
  genBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: 'var(--accent)', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 32,
  },
  card: {
    padding: 20, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', marginBottom: 16, position: 'relative' as const,
  },
  caption: { fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' as const },
  copyBtn: {
    position: 'absolute' as const, top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
  },
};

export default function CaptionGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<Tone>('casual');
  const [captions, setCaptions] = useState<string[]>([]);
  const [copied, setCopied] = useState(-1);

  const generate = () => {
    if (!topic.trim()) return;
    const t = templates[tone];
    // Shuffle and pick 3
    const shuffled = [...t].sort(() => Math.random() - 0.5);
    setCaptions(shuffled.slice(0, 3).map((fn) => fn(topic.trim())));
  };

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(-1), 2000);
  };

  return (
    <div style={s.container}>
      <label style={s.label}>What is your post about?</label>
      <input
        style={s.input}
        placeholder="e.g., morning routine, new product launch, fitness journey..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && generate()}
      />

      <label style={s.label}>Choose a tone</label>
      <div style={s.tones}>
        {tones.map((t) => (
          <button
            key={t.value}
            style={{ ...s.toneBtn, ...(tone === t.value ? s.toneActive : {}) }}
            onClick={() => setTone(t.value)}
          >
            <div style={s.toneName}>{t.label}</div>
            <div style={s.toneDesc}>{t.desc}</div>
          </button>
        ))}
      </div>

      <button style={{ ...s.genBtn, opacity: topic.trim() ? 1 : 0.5 }} onClick={generate} disabled={!topic.trim()}>
        <RefreshCw size={18} />
        Generate Captions
      </button>

      {captions.map((caption, i) => (
        <div key={i} style={s.card}>
          <button style={s.copyBtn} onClick={() => copy(caption, i)}>
            {copied === i ? <Check size={14} /> : <Copy size={14} />}
            {copied === i ? 'Copied' : 'Copy'}
          </button>
          <div style={s.caption}>{caption}</div>
        </div>
      ))}
    </div>
  );
}
