'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Gift, Shuffle, Copy, Filter, Trash2, Users, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Comment {
  username: string;
  text: string;
  id: number;
}

const s = {
  container: { maxWidth: 800, margin: '0 auto' },
  label: { display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 } as React.CSSProperties,
  textarea: {
    width: '100%', minHeight: 200, padding: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.6, resize: 'vertical' as const, outline: 'none',
  },
  hint: { fontSize: 13, color: 'var(--text-muted)', marginTop: 8 },
  filters: { display: 'flex', flexWrap: 'wrap' as const, gap: 12, margin: '20px 0', alignItems: 'center' },
  checkbox: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer' },
  input: {
    width: 60, padding: '6px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 14, textAlign: 'center' as const, outline: 'none',
  },
  numInput: {
    width: 60, padding: '8px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 14, textAlign: 'center' as const, outline: 'none',
  },
  row: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' as const, margin: '20px 0' },
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--radius-sm)',
    border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s',
  },
  primaryBtn: { background: 'var(--accent)', color: 'white' },
  secondaryBtn: { background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' },
  stats: { display: 'flex', gap: 24, margin: '20px 0', flexWrap: 'wrap' as const },
  stat: {
    padding: '12px 20px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10,
  },
  statNum: { fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' },
  statLabel: { fontSize: 12, color: 'var(--text-muted)' },
  spinner: {
    margin: '32px 0', padding: 32, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)',
    border: '2px solid var(--accent)', textAlign: 'center' as const, position: 'relative' as const, overflow: 'hidden',
  },
  spinnerName: { fontSize: 28, fontWeight: 800, color: 'var(--accent)', transition: 'all 0.08s' },
  winnerCard: {
    margin: '32px 0', padding: 32, background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))',
    borderRadius: 'var(--radius)', border: '2px solid var(--accent)', textAlign: 'center' as const,
  },
  winnerTitle: { fontSize: 14, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 12 },
  winnerName: { fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 },
  winnerComment: { fontSize: 14, color: 'var(--text-secondary)', fontStyle: 'italic', maxWidth: 500, margin: '0 auto' },
  list: {
    maxHeight: 300, overflowY: 'auto' as const, margin: '20px 0', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', background: 'var(--bg-secondary)',
  },
  listItem: {
    padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: 14,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  username: { fontWeight: 600, color: 'var(--accent)', marginRight: 8 },
};

function parseComments(raw: string): Comment[] {
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  const comments: Comment[] = [];
  let id = 0;

  for (const line of lines) {
    // Try to parse "username: comment" or "@username comment"
    const match = line.match(/^@?(\S+)[:\s]+(.+)$/);
    if (match) {
      comments.push({ username: match[1].replace(/^@/, ''), text: match[2].trim(), id: id++ });
    } else {
      // Just treat the whole line as a comment with generated username
      comments.push({ username: `user_${id + 1}`, text: line, id: id++ });
    }
  }
  return comments;
}

export default function CommentPicker() {
  const [raw, setRaw] = useState('');
  const [dedupe, setDedupe] = useState(true);
  const [minWords, setMinWords] = useState(0);
  const [numWinners, setNumWinners] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [filtered, setFiltered] = useState<Comment[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [spinName, setSpinName] = useState('');
  const [winners, setWinners] = useState<Comment[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const processComments = useCallback(() => {
    let parsed = parseComments(raw);
    if (dedupe) {
      const seen = new Set<string>();
      parsed = parsed.filter((c) => {
        const key = c.username.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    if (minWords > 0) {
      parsed = parsed.filter((c) => c.text.split(/\s+/).length >= minWords);
    }
    setComments(parseComments(raw));
    setFiltered(parsed);
    setWinners([]);
  }, [raw, dedupe, minWords]);

  useEffect(() => {
    processComments();
  }, [processComments]);

  const pickWinner = () => {
    if (filtered.length === 0) return;
    setWinners([]);
    setSpinning(true);

    let tick = 0;
    const totalTicks = 30;
    intervalRef.current = setInterval(() => {
      const idx = crypto.getRandomValues(new Uint32Array(1))[0] % filtered.length;
      setSpinName(filtered[idx].username);
      tick++;

      if (tick >= totalTicks) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        // Final picks
        const picks: Comment[] = [];
        const available = [...filtered];
        const count = Math.min(numWinners, available.length);
        for (let i = 0; i < count; i++) {
          const rnd = crypto.getRandomValues(new Uint32Array(1))[0] % available.length;
          picks.push(available[rnd]);
          available.splice(rnd, 1);
        }
        setWinners(picks);
        setSpinning(false);

        // Confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#E1306C', '#00f2ea', '#1DA1F2', '#22c55e'],
        });
      }
    }, 60 + tick * 3);
  };

  const copyWinners = () => {
    const text = winners.map((w) => `@${w.username} — ${w.text}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={s.container}>
      <label style={s.label}>Paste Instagram Comments</label>
      <textarea
        style={s.textarea}
        placeholder={'Paste comments here, one per line.\nFormat: @username comment text\n\nExample:\n@john_doe Great giveaway!\n@jane_smith I would love to win this\n@creator123 Amazing content as always'}
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
      />
      <div style={s.hint}>
        Paste comments in "@username comment" format, one per line. Plain text lines also work.
      </div>

      <div style={s.filters}>
        <Filter size={16} color="var(--text-muted)" />
        <label style={s.checkbox}>
          <input type="checkbox" checked={dedupe} onChange={(e) => setDedupe(e.target.checked)} />
          Remove duplicate usernames
        </label>
        <label style={s.checkbox}>
          Min words:
          <input type="number" min={0} max={50} value={minWords} onChange={(e) => setMinWords(Number(e.target.value))} style={s.input} />
        </label>
      </div>

      <div style={s.stats}>
        <div style={s.stat}>
          <Users size={18} color="var(--text-muted)" />
          <div>
            <div style={s.statNum}>{comments.length}</div>
            <div style={s.statLabel}>Total Comments</div>
          </div>
        </div>
        <div style={s.stat}>
          <Filter size={18} color="var(--text-muted)" />
          <div>
            <div style={s.statNum}>{filtered.length}</div>
            <div style={s.statLabel}>After Filters</div>
          </div>
        </div>
      </div>

      <div style={s.row}>
        <label style={{ ...s.checkbox, fontSize: 15 }}>
          Winners:
          <input type="number" min={1} max={20} value={numWinners} onChange={(e) => setNumWinners(Number(e.target.value))} style={s.numInput} />
        </label>
        <button
          style={{ ...s.btn, ...s.primaryBtn, opacity: filtered.length === 0 ? 0.5 : 1 }}
          onClick={pickWinner}
          disabled={filtered.length === 0 || spinning}
        >
          <Shuffle size={18} />
          {spinning ? 'Picking...' : 'Pick Winner'}
        </button>
        <button
          style={{ ...s.btn, ...s.secondaryBtn }}
          onClick={() => { setRaw(''); setWinners([]); }}
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      {spinning && (
        <div style={s.spinner}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Selecting winner...</div>
          <div style={s.spinnerName}>{spinName}</div>
        </div>
      )}

      {winners.length > 0 && !spinning && (
        <div style={s.winnerCard}>
          <div style={s.winnerTitle}>
            <Trophy size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
            {winners.length === 1 ? 'Winner' : `${winners.length} Winners`}
          </div>
          {winners.map((w, i) => (
            <div key={w.id} style={{ marginBottom: winners.length > 1 && i < winners.length - 1 ? 20 : 0 }}>
              <div style={s.winnerName}>@{w.username}</div>
              <div style={s.winnerComment}>&ldquo;{w.text}&rdquo;</div>
            </div>
          ))}
          <button style={{ ...s.btn, ...s.secondaryBtn, marginTop: 20 }} onClick={copyWinners}>
            <Copy size={16} /> Copy Result
          </button>
        </div>
      )}

      {filtered.length > 0 && (
        <>
          <label style={{ ...s.label, marginTop: 24 }}>Comment Pool ({filtered.length})</label>
          <div style={s.list}>
            {filtered.map((c) => (
              <div key={c.id} style={s.listItem}>
                <div>
                  <span style={s.username}>@{c.username}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{c.text}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
