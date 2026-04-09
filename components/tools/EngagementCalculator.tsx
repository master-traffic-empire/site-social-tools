'use client';

import { useState } from 'react';
import { TrendingUp, Calculator } from 'lucide-react';

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter';

const benchmarks: Record<Platform, { low: number; avg: number; good: number; excellent: number }> = {
  instagram: { low: 1, avg: 2.5, good: 5, excellent: 8 },
  tiktok: { low: 2, avg: 5, good: 9, excellent: 15 },
  youtube: { low: 1, avg: 3, good: 6, excellent: 10 },
  twitter: { low: 0.5, avg: 1.5, good: 3, excellent: 5 },
};

const followerBenchmarks: Record<Platform, { label: string; range: string; rate: string }[]> = {
  instagram: [
    { label: 'Nano (1K-10K)', range: '1,000 - 10,000', rate: '4-6%' },
    { label: 'Micro (10K-50K)', range: '10,000 - 50,000', rate: '2-4%' },
    { label: 'Mid (50K-500K)', range: '50,000 - 500,000', rate: '1.5-3%' },
    { label: 'Macro (500K-1M)', range: '500,000 - 1,000,000', rate: '1-2%' },
    { label: 'Mega (1M+)', range: '1,000,000+', rate: '0.5-1.5%' },
  ],
  tiktok: [
    { label: 'Nano (1K-10K)', range: '1,000 - 10,000', rate: '6-12%' },
    { label: 'Micro (10K-50K)', range: '10,000 - 50,000', rate: '4-8%' },
    { label: 'Mid (50K-500K)', range: '50,000 - 500,000', rate: '3-6%' },
    { label: 'Macro (500K-1M)', range: '500,000 - 1,000,000', rate: '2-4%' },
    { label: 'Mega (1M+)', range: '1,000,000+', rate: '1-3%' },
  ],
  youtube: [
    { label: 'Small (1K-10K)', range: '1,000 - 10,000', rate: '4-8%' },
    { label: 'Growing (10K-100K)', range: '10,000 - 100,000', rate: '2-5%' },
    { label: 'Established (100K-1M)', range: '100,000 - 1,000,000', rate: '1-3%' },
    { label: 'Large (1M+)', range: '1,000,000+', rate: '0.5-2%' },
  ],
  twitter: [
    { label: 'Nano (1K-10K)', range: '1,000 - 10,000', rate: '2-4%' },
    { label: 'Micro (10K-50K)', range: '10,000 - 50,000', rate: '1-3%' },
    { label: 'Mid (50K-500K)', range: '50,000 - 500,000', rate: '0.5-1.5%' },
    { label: 'Large (500K+)', range: '500,000+', rate: '0.2-1%' },
  ],
};

const s = {
  container: { maxWidth: 700, margin: '0 auto' },
  platforms: { display: 'flex', flexWrap: 'wrap' as const, gap: 10, marginBottom: 24 },
  platBtn: {
    padding: '10px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'transparent', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
  },
  label: { display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 } as React.CSSProperties,
  input: {
    width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 15, outline: 'none', marginBottom: 16,
  },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 },
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: 'var(--accent)', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 32,
  },
  result: {
    padding: 32, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
    textAlign: 'center' as const, marginBottom: 24,
  },
  rate: { fontSize: 48, fontWeight: 800, marginBottom: 8 },
  rateLabel: { fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 },
  badge: { display: 'inline-block', padding: '6px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600 },
  bar: { height: 8, borderRadius: 4, background: 'var(--bg-tertiary)', margin: '20px 0', position: 'relative' as const },
  barFill: { height: '100%', borderRadius: 4, transition: 'width 0.5s ease' },
  barMarkers: { display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' },
  benchmarks: { marginTop: 24 },
  benchTitle: { fontSize: 16, fontWeight: 600, marginBottom: 12 },
  benchTable: { width: '100%', borderCollapse: 'collapse' as const },
  th: { padding: '10px 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textAlign: 'left' as const, borderBottom: '1px solid var(--border)' },
  td: { padding: '10px 12px', fontSize: 14, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' },
};

const platColors: Record<Platform, string> = {
  instagram: '#E1306C',
  tiktok: '#00f2ea',
  youtube: '#FF0000',
  twitter: '#1DA1F2',
};

export default function EngagementCalculator() {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [rate, setRate] = useState<number | null>(null);

  const calculate = () => {
    const f = parseInt(followers.replace(/,/g, '')) || 0;
    const l = parseInt(likes.replace(/,/g, '')) || 0;
    const c = parseInt(comments.replace(/,/g, '')) || 0;
    const sh = parseInt(shares.replace(/,/g, '')) || 0;
    if (f === 0) return;
    setRate(((l + c + sh) / f) * 100);
  };

  const getRating = (r: number) => {
    const b = benchmarks[platform];
    if (r >= b.excellent) return { label: 'Excellent', color: '#22c55e' };
    if (r >= b.good) return { label: 'Good', color: '#22c55e' };
    if (r >= b.avg) return { label: 'Average', color: 'var(--warning)' };
    return { label: 'Below Average', color: 'var(--danger)' };
  };

  return (
    <div style={s.container}>
      <div style={s.platforms}>
        {(Object.keys(platColors) as Platform[]).map((p) => (
          <button
            key={p}
            style={{
              ...s.platBtn,
              ...(platform === p ? { background: platColors[p] + '20', borderColor: platColors[p], color: platColors[p] } : {}),
            }}
            onClick={() => setPlatform(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <label style={s.label}>Followers</label>
      <input style={s.input} placeholder="e.g., 10000" value={followers} onChange={(e) => setFollowers(e.target.value)} type="text" inputMode="numeric" />

      <div style={s.row}>
        <div>
          <label style={s.label}>Avg. Likes</label>
          <input style={{ ...s.input, marginBottom: 0 }} placeholder="e.g., 500" value={likes} onChange={(e) => setLikes(e.target.value)} type="text" inputMode="numeric" />
        </div>
        <div>
          <label style={s.label}>Avg. Comments</label>
          <input style={{ ...s.input, marginBottom: 0 }} placeholder="e.g., 25" value={comments} onChange={(e) => setComments(e.target.value)} type="text" inputMode="numeric" />
        </div>
        <div>
          <label style={s.label}>Avg. Shares</label>
          <input style={{ ...s.input, marginBottom: 0 }} placeholder="e.g., 10" value={shares} onChange={(e) => setShares(e.target.value)} type="text" inputMode="numeric" />
        </div>
      </div>

      <button style={s.btn} onClick={calculate}>
        <Calculator size={18} />
        Calculate
      </button>

      {rate !== null && (
        <>
          <div style={s.result}>
            <div style={{ ...s.rate, color: getRating(rate).color }}>
              {rate.toFixed(2)}%
            </div>
            <div style={s.rateLabel}>Engagement Rate</div>
            <span style={{ ...s.badge, background: getRating(rate).color + '20', color: getRating(rate).color }}>
              {getRating(rate).label}
            </span>

            <div style={s.bar}>
              <div style={{ ...s.barFill, width: `${Math.min(rate / benchmarks[platform].excellent * 100, 100)}%`, background: getRating(rate).color }} />
            </div>
            <div style={s.barMarkers}>
              <span>0%</span>
              <span>Avg: {benchmarks[platform].avg}%</span>
              <span>Good: {benchmarks[platform].good}%</span>
              <span>{benchmarks[platform].excellent}%+</span>
            </div>
          </div>

          <div style={s.benchmarks}>
            <div style={s.benchTitle}>
              <TrendingUp size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
              {platform.charAt(0).toUpperCase() + platform.slice(1)} Benchmarks by Follower Count
            </div>
            <table style={s.benchTable}>
              <thead>
                <tr>
                  <th style={s.th}>Tier</th>
                  <th style={s.th}>Followers</th>
                  <th style={s.th}>Avg. Engagement Rate</th>
                </tr>
              </thead>
              <tbody>
                {followerBenchmarks[platform].map((b) => (
                  <tr key={b.label}>
                    <td style={s.td}>{b.label}</td>
                    <td style={s.td}>{b.range}</td>
                    <td style={s.td}>{b.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
