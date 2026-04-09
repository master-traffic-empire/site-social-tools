'use client';

import { useState } from 'react';
import { Type, Copy, Check, RefreshCw } from 'lucide-react';

type TitleStyle = 'how-to' | 'listicle' | 'curiosity' | 'comparison' | 'question' | 'all';

const titlePatterns: Record<Exclude<TitleStyle, 'all'>, ((topic: string) => string)[]> = {
  'how-to': [
    (t) => `How to ${t} (Step-by-Step Guide)`,
    (t) => `How to ${t} in 2025 — Complete Beginner's Guide`,
    (t) => `How I Learned to ${t} in 30 Days`,
    (t) => `How to ${t} (Even If You Have Zero Experience)`,
    (t) => `The Easiest Way to ${t} — Full Tutorial`,
    (t) => `How to ${t} Like a Pro`,
    (t) => `How to ${t} WITHOUT Spending a Fortune`,
  ],
  listicle: [
    (t) => `10 ${t} Tips Nobody Talks About`,
    (t) => `5 ${t} Mistakes That Are Holding You Back`,
    (t) => `7 ${t} Secrets the Pros Don't Share`,
    (t) => `3 ${t} Hacks That Actually Work`,
    (t) => `12 ${t} Ideas You Need to Try`,
    (t) => `The Top 5 ${t} Tools You Need Right Now`,
    (t) => `8 ${t} Trends That Will Dominate 2025`,
  ],
  curiosity: [
    (t) => `I Tried ${t} for 30 Days — Here's What Happened`,
    (t) => `The Truth About ${t} Nobody Wants to Admit`,
    (t) => `Why ${t} Will Change Everything`,
    (t) => `${t}: What They Don't Tell You`,
    (t) => `I Was Wrong About ${t}`,
    (t) => `This ${t} Trick Changed My Life`,
    (t) => `The ${t} Secret That Went Viral`,
  ],
  comparison: [
    (t) => `${t}: Expectation vs Reality`,
    (t) => `Cheap vs Expensive ${t} — Is It Worth It?`,
    (t) => `${t}: Beginner vs Advanced`,
    (t) => `${t}: What I Expected vs What I Got`,
    (t) => `The Best vs Worst ${t} Compared`,
    (t) => `${t}: Then vs Now`,
  ],
  question: [
    (t) => `Is ${t} Actually Worth It?`,
    (t) => `Why Is Everyone Talking About ${t}?`,
    (t) => `Can You Really ${t}?`,
    (t) => `What Happens When You ${t}?`,
    (t) => `Should You Start ${t} in 2025?`,
    (t) => `Why Does ${t} Work So Well?`,
  ],
};

const s = {
  container: { maxWidth: 700, margin: '0 auto' },
  label: { display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 } as React.CSSProperties,
  input: {
    width: '100%', padding: '14px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 15, outline: 'none', marginBottom: 20,
  },
  styles: { display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 24 },
  styleBtn: {
    padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'transparent', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
  },
  active: { background: 'var(--accent-light)', borderColor: 'var(--accent)', color: 'var(--text-primary)' },
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: '#FF0000', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 32,
  },
  card: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px',
    background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
    marginBottom: 10, gap: 12,
  },
  title: { fontSize: 15, color: 'var(--text-primary)', fontWeight: 500, flex: 1 },
  charCount: { fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' as const, padding: '4px 8px', borderRadius: 4 },
  copyBtn: {
    display: 'flex', alignItems: 'center', padding: 8, borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', flexShrink: 0,
  },
};

const styleOptions: { value: TitleStyle; label: string }[] = [
  { value: 'all', label: 'All Styles' },
  { value: 'how-to', label: 'How-To' },
  { value: 'listicle', label: 'Listicle' },
  { value: 'curiosity', label: 'Curiosity Gap' },
  { value: 'comparison', label: 'Comparison' },
  { value: 'question', label: 'Question' },
];

export default function TitleGenerator() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState<TitleStyle>('all');
  const [titles, setTitles] = useState<string[]>([]);
  const [copied, setCopied] = useState(-1);

  const generate = () => {
    if (!topic.trim()) return;
    let pool: ((topic: string) => string)[] = [];

    if (style === 'all') {
      pool = Object.values(titlePatterns).flat();
    } else {
      pool = titlePatterns[style];
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setTitles(shuffled.slice(0, 8).map((fn) => fn(topic.trim())));
  };

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(-1), 2000);
  };

  return (
    <div style={s.container}>
      <label style={s.label}>Video Topic</label>
      <input
        style={s.input}
        placeholder="e.g., learn guitar, home workouts, meal prep..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && generate()}
      />

      <label style={s.label}>Title Style</label>
      <div style={s.styles}>
        {styleOptions.map((opt) => (
          <button
            key={opt.value}
            style={{ ...s.styleBtn, ...(style === opt.value ? s.active : {}) }}
            onClick={() => setStyle(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button style={{ ...s.btn, opacity: topic.trim() ? 1 : 0.5 }} onClick={generate} disabled={!topic.trim()}>
        <RefreshCw size={18} />
        Generate Titles
      </button>

      {titles.map((title, i) => {
        const len = title.length;
        const isGood = len <= 60;
        return (
          <div key={i} style={s.card}>
            <div style={s.title}>{title}</div>
            <span
              style={{
                ...s.charCount,
                background: isGood ? 'var(--success)15' : 'var(--warning)15',
                color: isGood ? 'var(--success)' : 'var(--warning)',
              }}
            >
              {len} chars
            </span>
            <button style={s.copyBtn} onClick={() => copy(title, i)}>
              {copied === i ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        );
      })}
    </div>
  );
}
