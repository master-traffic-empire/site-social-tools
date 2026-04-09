'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const MAX = 280;

const s = {
  container: { maxWidth: 560, margin: '0 auto' },
  textarea: {
    width: '100%', minHeight: 160, padding: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius) var(--radius) 0 0', color: 'var(--text-primary)', fontSize: 16, lineHeight: 1.6,
    resize: 'none' as const, outline: 'none', borderBottom: 'none',
  },
  bar: {
    padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: '0 0 var(--radius) var(--radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  progress: { flex: 1, height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, marginRight: 16, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2, transition: 'all 0.2s' },
  count: { fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' as const },
  copyBtn: {
    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
    marginLeft: 12,
  },
  preview: {
    marginTop: 32, padding: 24, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
  },
  previewHeader: { display: 'flex', gap: 12, marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: 'var(--text-muted)' },
  previewName: { fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' },
  previewHandle: { fontSize: 14, color: 'var(--text-muted)' },
  previewText: { fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' as const },
  previewMeta: { marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-muted)' },
  hint: {
    marginTop: 16, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)',
    fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5,
  },
};

export default function TweetCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const len = text.length;
  const remaining = MAX - len;
  const pct = Math.min((len / MAX) * 100, 100);
  const color = remaining < 0 ? 'var(--danger)' : remaining < 20 ? 'var(--warning)' : 'var(--twitter)';

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={s.container}>
      <textarea
        style={s.textarea}
        placeholder="Start typing your tweet..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={s.bar}>
        <div style={s.progress}>
          <div style={{ ...s.progressFill, width: `${pct}%`, background: color }} />
        </div>
        <span style={{ ...s.count, color }}>
          {remaining}
        </span>
        {text && (
          <button style={s.copyBtn} onClick={copy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        )}
      </div>

      {remaining < 0 && (
        <div style={{ ...s.hint, background: 'var(--danger)15', color: 'var(--danger)' }}>
          Your tweet is {Math.abs(remaining)} characters over the limit. Shorten your text.
        </div>
      )}

      {text && (
        <div style={s.preview}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16 }}>Preview</div>
          <div style={s.previewHeader}>
            <div style={s.avatar}>Y</div>
            <div>
              <div style={s.previewName}>Your Name</div>
              <div style={s.previewHandle}>@yourhandle</div>
            </div>
          </div>
          <div style={s.previewText}>{text}</div>
          <div style={s.previewMeta}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      )}

      <div style={s.hint}>
        <strong>Tips:</strong> URLs count as 23 characters regardless of length. Mentions (@user) count as their full character length. Emojis count as 2 characters each.
      </div>
    </div>
  );
}
