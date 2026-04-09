'use client';

import { useState } from 'react';
import { FileText, Copy, Check, Plus, Trash2 } from 'lucide-react';

interface Timestamp {
  time: string;
  label: string;
}

const s = {
  container: { maxWidth: 700, margin: '0 auto' },
  label: { display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 } as React.CSSProperties,
  input: {
    width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 14, outline: 'none', marginBottom: 16,
  },
  textarea: {
    width: '100%', minHeight: 80, padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.6, resize: 'vertical' as const, outline: 'none', marginBottom: 16,
  },
  section: { marginBottom: 24 },
  tsRow: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 },
  tsTime: {
    width: 80, padding: '10px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 14, outline: 'none', textAlign: 'center' as const,
  },
  tsLabel: {
    flex: 1, padding: '10px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 14, outline: 'none',
  },
  removeBtn: { background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 6 },
  addBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 'var(--radius-sm)',
    border: '1px dashed var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer',
  },
  genBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: '#FF0000', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 24,
  },
  output: {
    padding: 24, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', position: 'relative' as const,
  },
  outputText: { fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' as const, fontFamily: 'var(--font-mono)' },
  copyBtn: {
    position: 'absolute' as const, top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
  },
};

export default function DescriptionTemplate() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [timestamps, setTimestamps] = useState<Timestamp[]>([
    { time: '0:00', label: 'Intro' },
    { time: '1:30', label: '' },
    { time: '5:00', label: '' },
    { time: '', label: 'Outro' },
  ]);
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    tiktok: '',
    twitter: '',
    website: '',
  });
  const [keywords, setKeywords] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const addTimestamp = () => {
    setTimestamps([...timestamps, { time: '', label: '' }]);
  };

  const removeTimestamp = (idx: number) => {
    setTimestamps(timestamps.filter((_, i) => i !== idx));
  };

  const updateTimestamp = (idx: number, field: 'time' | 'label', value: string) => {
    const updated = [...timestamps];
    updated[idx] = { ...updated[idx], [field]: value };
    setTimestamps(updated);
  };

  const generate = () => {
    const parts: string[] = [];

    // Summary
    if (summary) {
      parts.push(summary);
    } else if (title) {
      parts.push(`In this video, I cover everything you need to know about ${title}.`);
    }
    parts.push('');

    // Timestamps
    const validTs = timestamps.filter((ts) => ts.time && ts.label);
    if (validTs.length > 0) {
      parts.push('TIMESTAMPS:');
      validTs.forEach((ts) => parts.push(`${ts.time} ${ts.label}`));
      parts.push('');
    }

    // Social links
    const links: string[] = [];
    if (socialLinks.instagram) links.push(`Instagram: ${socialLinks.instagram}`);
    if (socialLinks.tiktok) links.push(`TikTok: ${socialLinks.tiktok}`);
    if (socialLinks.twitter) links.push(`Twitter/X: ${socialLinks.twitter}`);
    if (socialLinks.website) links.push(`Website: ${socialLinks.website}`);
    if (links.length > 0) {
      parts.push('CONNECT WITH ME:');
      links.forEach((l) => parts.push(l));
      parts.push('');
    }

    // Keywords
    if (keywords) {
      parts.push('TAGS:');
      parts.push(keywords);
      parts.push('');
    }

    // Footer
    parts.push('---');
    parts.push(`Thanks for watching! If you found this helpful, please like, comment, and subscribe for more content like this.`);

    setOutput(parts.join('\n'));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={s.container}>
      <div style={s.section}>
        <label style={s.label}>Video Title</label>
        <input style={s.input} placeholder="What is your video about?" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div style={s.section}>
        <label style={s.label}>Summary (first 2-3 lines appear in search)</label>
        <textarea style={s.textarea} placeholder="Brief description of what viewers will learn or see..." value={summary} onChange={(e) => setSummary(e.target.value)} />
      </div>

      <div style={s.section}>
        <label style={s.label}>Timestamps</label>
        {timestamps.map((ts, i) => (
          <div key={i} style={s.tsRow}>
            <input
              style={s.tsTime}
              placeholder="0:00"
              value={ts.time}
              onChange={(e) => updateTimestamp(i, 'time', e.target.value)}
            />
            <input
              style={s.tsLabel}
              placeholder="Section name..."
              value={ts.label}
              onChange={(e) => updateTimestamp(i, 'label', e.target.value)}
            />
            <button style={s.removeBtn} onClick={() => removeTimestamp(i)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button style={s.addBtn} onClick={addTimestamp}>
          <Plus size={14} /> Add Timestamp
        </button>
      </div>

      <div style={s.section}>
        <label style={s.label}>Social Media Links</label>
        <input style={s.input} placeholder="Instagram URL" value={socialLinks.instagram} onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })} />
        <input style={s.input} placeholder="TikTok URL" value={socialLinks.tiktok} onChange={(e) => setSocialLinks({ ...socialLinks, tiktok: e.target.value })} />
        <input style={s.input} placeholder="Twitter/X URL" value={socialLinks.twitter} onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })} />
        <input style={s.input} placeholder="Website URL" value={socialLinks.website} onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value })} />
      </div>

      <div style={s.section}>
        <label style={s.label}>Keywords / Tags (comma-separated)</label>
        <input style={s.input} placeholder="e.g., tutorial, beginner guide, 2025, tips" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
      </div>

      <button style={s.genBtn} onClick={generate}>
        <FileText size={18} />
        Generate Description
      </button>

      {output && (
        <div style={s.output}>
          <button style={s.copyBtn} onClick={copy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <div style={s.outputText}>{output}</div>
        </div>
      )}
    </div>
  );
}
