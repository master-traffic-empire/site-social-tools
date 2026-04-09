'use client';

import { useState } from 'react';
import { User, Copy, Check, RefreshCw } from 'lucide-react';

const niches = [
  'Fitness & Health', 'Food & Cooking', 'Travel', 'Fashion & Style', 'Beauty & Skincare',
  'Business & Entrepreneur', 'Photography', 'Tech & Coding', 'Music', 'Art & Design',
  'Gaming', 'Lifestyle', 'Parenting', 'Education', 'Real Estate',
];

const bioTemplates: ((name: string, niche: string, keywords: string) => string)[] = [
  (name, niche, kw) => `${name}\n${niche} | ${kw}\nSharing what I learn along the way\nDMs open for collabs`,
  (name, niche, kw) => `${name} | ${niche}\n${kw}\nHelping you level up\nLink below for more`,
  (name, niche) => `${name}\nPassionate about ${niche.toLowerCase()}\nCreating content that matters\nNew posts weekly`,
  (name, niche, kw) => `${name}\n${niche} creator\n${kw}\nBuilding something cool\nStay tuned`,
  (name, niche, kw) => `${name} // ${niche}\nOn a mission: ${kw}\nFollow for daily inspo\nCollab? DM me`,
  (name, niche) => `Hi, I'm ${name}\n${niche} enthusiast\nDocumenting the journey\nLet's connect`,
  (name, niche, kw) => `${name}\nMaking ${niche.toLowerCase()} simple\n${kw}\nFree tips in highlights`,
  (name, niche) => `${name}\n${niche} | Creator | Dreamer\nTurning ideas into reality\nBased in the internet`,
];

const s = {
  container: { maxWidth: 600, margin: '0 auto' },
  label: { display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 } as React.CSSProperties,
  input: {
    width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 15, outline: 'none', marginBottom: 20,
  },
  select: {
    width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 15, outline: 'none', marginBottom: 20,
    appearance: 'none' as const,
  },
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: 'var(--accent)', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 32,
  },
  card: {
    padding: 20, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', marginBottom: 16, position: 'relative' as const,
  },
  bio: { fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' as const, fontFamily: 'var(--font-sans)' },
  charCount: { fontSize: 12, color: 'var(--text-muted)', marginTop: 8 },
  copyBtn: {
    position: 'absolute' as const, top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
  },
};

export default function BioGenerator() {
  const [name, setName] = useState('');
  const [niche, setNiche] = useState('');
  const [keywords, setKeywords] = useState('');
  const [bios, setBios] = useState<string[]>([]);
  const [copied, setCopied] = useState(-1);

  const generate = () => {
    if (!name.trim() || !niche) return;
    const kw = keywords.trim() || niche;
    const shuffled = [...bioTemplates].sort(() => Math.random() - 0.5);
    setBios(shuffled.slice(0, 4).map((fn) => fn(name.trim(), niche, kw)));
  };

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(-1), 2000);
  };

  return (
    <div style={s.container}>
      <label style={s.label}>Your Name or Brand</label>
      <input style={s.input} placeholder="e.g., Alex Chen" value={name} onChange={(e) => setName(e.target.value)} />

      <label style={s.label}>Your Niche</label>
      <select style={s.select} value={niche} onChange={(e) => setNiche(e.target.value)}>
        <option value="">Select a niche...</option>
        {niches.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <label style={s.label}>Keywords or Tagline (optional)</label>
      <input style={s.input} placeholder="e.g., Plant-based recipes, NYC based" value={keywords} onChange={(e) => setKeywords(e.target.value)} />

      <button style={{ ...s.btn, opacity: name.trim() && niche ? 1 : 0.5 }} onClick={generate} disabled={!name.trim() || !niche}>
        <RefreshCw size={18} />
        Generate Bios
      </button>

      {bios.map((bio, i) => (
        <div key={i} style={s.card}>
          <button style={s.copyBtn} onClick={() => copy(bio, i)}>
            {copied === i ? <Check size={14} /> : <Copy size={14} />}
            {copied === i ? 'Copied' : 'Copy'}
          </button>
          <div style={s.bio}>{bio}</div>
          <div style={{ ...s.charCount, color: bio.length > 150 ? 'var(--danger)' : 'var(--text-muted)' }}>
            {bio.length}/150 characters
          </div>
        </div>
      ))}
    </div>
  );
}
