'use client';

import { useState } from 'react';
import { Split, Copy, Check } from 'lucide-react';

const MAX_CHARS = 280;

function splitIntoTweets(text: string, addNumbering: boolean): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const tweets: string[] = [];
  let current = '';

  // First pass: split at word boundaries, try sentence breaks
  for (const word of words) {
    const tentative = current ? `${current} ${word}` : word;
    // Reserve space for numbering
    const reserved = addNumbering ? 6 : 0; // " 1/99"
    if (tentative.length + reserved > MAX_CHARS) {
      if (current) tweets.push(current.trim());
      current = word;
    } else {
      current = tentative;
    }
  }
  if (current.trim()) tweets.push(current.trim());

  // Add numbering
  if (addNumbering && tweets.length > 1) {
    const total = tweets.length;
    return tweets.map((t, i) => `${t}\n\n${i + 1}/${total}`);
  }

  return tweets;
}

const s = {
  container: { maxWidth: 600, margin: '0 auto' },
  label: { display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 } as React.CSSProperties,
  textarea: {
    width: '100%', minHeight: 200, padding: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.6, resize: 'vertical' as const, outline: 'none', marginBottom: 16,
  },
  row: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' as const, marginBottom: 24 },
  checkbox: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer' },
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: '#1DA1F2', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer',
  },
  tweet: {
    padding: 20, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', marginBottom: 12, position: 'relative' as const,
  },
  tweetNum: { fontSize: 12, fontWeight: 600, color: '#1DA1F2', marginBottom: 8 },
  tweetText: { fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' as const },
  tweetFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  charCount: { fontSize: 12, fontWeight: 600 },
  copyBtn: {
    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
  },
  copyAllBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 14, cursor: 'pointer',
    marginBottom: 24,
  },
};

export default function ThreadFormatter() {
  const [text, setText] = useState('');
  const [addNumbering, setAddNumbering] = useState(true);
  const [tweets, setTweets] = useState<string[]>([]);
  const [copied, setCopied] = useState(-1);
  const [copiedAll, setCopiedAll] = useState(false);

  const format = () => {
    if (!text.trim()) return;
    setTweets(splitIntoTweets(text, addNumbering));
  };

  const copy = (tweet: string, idx: number) => {
    navigator.clipboard.writeText(tweet);
    setCopied(idx);
    setTimeout(() => setCopied(-1), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(tweets.join('\n\n---\n\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div style={s.container}>
      <label style={s.label}>Paste your long text</label>
      <textarea
        style={s.textarea}
        placeholder="Paste your long-form text here. It will be split into tweet-sized chunks..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={s.row}>
        <label style={s.checkbox}>
          <input type="checkbox" checked={addNumbering} onChange={(e) => setAddNumbering(e.target.checked)} />
          Add thread numbering (1/5, 2/5...)
        </label>
      </div>

      <div style={{ ...s.row, marginBottom: 32 }}>
        <button style={{ ...s.btn, opacity: text.trim() ? 1 : 0.5 }} onClick={format} disabled={!text.trim()}>
          <Split size={18} />
          Split Into Thread
        </button>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {text.length} characters total
        </span>
      </div>

      {tweets.length > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>{tweets.length} tweets</span>
            <button style={s.copyAllBtn} onClick={copyAll}>
              {copiedAll ? <Check size={16} /> : <Copy size={16} />}
              {copiedAll ? 'Copied!' : 'Copy All'}
            </button>
          </div>
          {tweets.map((tweet, i) => {
            const len = tweet.length;
            return (
              <div key={i} style={s.tweet}>
                <div style={s.tweetNum}>Tweet {i + 1}</div>
                <div style={s.tweetText}>{tweet}</div>
                <div style={s.tweetFooter}>
                  <span style={{ ...s.charCount, color: len > MAX_CHARS ? 'var(--danger)' : 'var(--text-muted)' }}>
                    {len}/{MAX_CHARS}
                  </span>
                  <button style={s.copyBtn} onClick={() => copy(tweet, i)}>
                    {copied === i ? <Check size={14} /> : <Copy size={14} />}
                    {copied === i ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
