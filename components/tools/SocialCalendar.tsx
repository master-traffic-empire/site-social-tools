'use client';

import { useState } from 'react';
import { CalendarDays, Info } from 'lucide-react';

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin';

const platforms: { id: Platform; label: string; color: string }[] = [
  { id: 'instagram', label: 'Instagram', color: '#E1306C' },
  { id: 'tiktok', label: 'TikTok', color: '#00f2ea' },
  { id: 'youtube', label: 'YouTube', color: '#FF0000' },
  { id: 'twitter', label: 'Twitter/X', color: '#1DA1F2' },
  { id: 'linkedin', label: 'LinkedIn', color: '#0077B5' },
];

// Engagement scores per platform per hour per day (0-10)
const engagementData: Record<Platform, number[][]> = {
  instagram: [
    // Mon Tue Wed Thu Fri Sat Sun — each row = 1 hour (6am to 11pm = 18 hours)
    [3,3,3,3,2,1,1], // 6am
    [6,6,6,6,5,3,3], // 7am
    [5,5,5,5,4,4,4], // 8am
    [5,5,5,5,4,6,6], // 9am
    [4,6,4,4,3,7,7], // 10am
    [7,5,7,7,6,7,7], // 11am
    [7,5,5,7,5,5,5], // 12pm
    [5,4,4,4,4,4,4], // 1pm
    [7,7,7,7,6,4,3], // 2pm
    [5,5,5,5,7,3,3], // 3pm
    [4,4,4,4,4,3,3], // 4pm
    [5,5,5,5,4,4,4], // 5pm
    [5,5,5,5,5,4,4], // 6pm
    [8,8,8,8,5,5,6], // 7pm
    [7,6,6,7,4,5,5], // 8pm
    [5,5,5,5,3,4,4], // 9pm
    [3,3,3,3,2,3,3], // 10pm
    [2,2,2,2,2,2,2], // 11pm
  ],
  tiktok: [
    [4,2,3,3,3,2,3], // 6am
    [5,4,6,5,5,3,5], // 7am
    [4,4,6,5,4,4,6], // 8am
    [5,7,5,7,5,5,5], // 9am
    [7,5,4,5,5,5,4], // 10am
    [5,5,7,5,5,7,4], // 11am
    [5,5,5,7,5,5,5], // 12pm
    [5,4,4,4,7,4,4], // 1pm
    [4,4,4,4,4,4,4], // 2pm
    [4,4,4,4,6,4,4], // 3pm
    [5,5,5,5,5,5,7], // 4pm
    [5,5,5,5,5,5,5], // 5pm
    [5,5,5,5,5,5,5], // 6pm
    [5,5,5,7,5,7,5], // 7pm
    [5,5,5,5,5,8,5], // 8pm
    [5,5,5,5,5,5,5], // 9pm
    [8,5,5,5,5,5,5], // 10pm
    [4,4,4,4,4,4,4], // 11pm
  ],
  youtube: [
    [2,2,2,2,2,3,3], // 6am
    [3,3,3,3,3,4,4], // 7am
    [3,3,3,3,3,5,5], // 8am
    [4,4,4,4,4,7,7], // 9am
    [5,5,5,5,5,7,7], // 10am
    [5,5,5,5,5,7,7], // 11am
    [5,5,5,7,7,5,5], // 12pm
    [5,5,5,5,5,5,5], // 1pm
    [7,7,7,5,5,5,5], // 2pm
    [8,8,8,7,7,4,4], // 3pm
    [7,7,7,7,7,4,4], // 4pm
    [5,5,5,5,5,4,4], // 5pm
    [5,5,5,5,5,4,4], // 6pm
    [5,5,5,5,5,5,5], // 7pm
    [5,5,5,5,5,5,5], // 8pm
    [4,4,4,4,4,4,4], // 9pm
    [3,3,3,3,3,3,3], // 10pm
    [2,2,2,2,2,2,2], // 11pm
  ],
  twitter: [
    [2,2,2,2,2,2,2], // 6am
    [3,3,3,3,3,3,3], // 7am
    [7,7,5,7,5,6,5], // 8am
    [5,5,7,5,7,5,7], // 9am
    [7,7,5,7,7,5,4], // 10am
    [5,5,5,5,6,4,4], // 11am
    [7,5,7,7,5,4,4], // 12pm
    [5,5,5,5,5,4,4], // 1pm
    [4,4,4,4,4,3,3], // 2pm
    [4,7,4,4,4,3,3], // 3pm
    [4,4,4,4,4,3,3], // 4pm
    [5,5,6,5,4,4,4], // 5pm
    [4,4,4,4,4,4,4], // 6pm
    [4,4,4,4,4,4,4], // 7pm
    [3,3,3,3,3,3,3], // 8pm
    [3,3,3,3,3,3,3], // 9pm
    [2,2,2,2,2,2,2], // 10pm
    [2,2,2,2,2,2,2], // 11pm
  ],
  linkedin: [
    [3,3,3,3,3,1,1], // 6am
    [5,6,5,5,5,2,2], // 7am
    [7,7,7,7,6,2,2], // 8am
    [7,7,7,7,7,2,2], // 9am
    [8,7,8,7,8,2,2], // 10am
    [7,7,7,7,6,2,2], // 11am
    [7,7,7,7,7,2,2], // 12pm
    [5,5,5,5,5,1,1], // 1pm
    [4,4,4,4,4,1,1], // 2pm
    [4,4,4,4,4,1,1], // 3pm
    [4,4,4,4,3,1,1], // 4pm
    [5,5,5,5,4,1,1], // 5pm
    [4,4,4,4,3,1,1], // 6pm
    [3,3,3,3,2,1,1], // 7pm
    [2,2,2,2,2,1,1], // 8pm
    [2,2,2,2,2,1,1], // 9pm
    [1,1,1,1,1,1,1], // 10pm
    [1,1,1,1,1,1,1], // 11pm
  ],
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 18 }, (_, i) => i + 6);

function getColor(score: number, platformColor: string): string {
  if (score <= 2) return 'rgba(255,255,255,0.03)';
  if (score <= 4) return `${platformColor}15`;
  if (score <= 6) return `${platformColor}35`;
  if (score <= 7) return `${platformColor}60`;
  return `${platformColor}90`;
}

const formatHour = (h: number) => {
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hr = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hr}${ampm}`;
};

const s = {
  container: { maxWidth: 900, margin: '0 auto' },
  platforms: { display: 'flex', flexWrap: 'wrap' as const, gap: 10, marginBottom: 24 },
  platBtn: {
    padding: '10px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'transparent', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
  },
  grid: { overflowX: 'auto' as const },
  table: { width: '100%', borderCollapse: 'collapse' as const, minWidth: 700 },
  th: { padding: '8px 4px', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' as const },
  timeLabel: { padding: '8px 4px', fontSize: 11, color: 'var(--text-muted)', textAlign: 'right' as const, whiteSpace: 'nowrap' as const },
  cell: { width: '100%', height: 28, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, cursor: 'default' },
  legend: { display: 'flex', gap: 16, marginTop: 16, fontSize: 12, color: 'var(--text-muted)', alignItems: 'center' },
  legendBar: { display: 'flex', gap: 2, alignItems: 'center' },
  legendBlock: { width: 24, height: 12, borderRadius: 2 },
  tip: { marginTop: 20, padding: 16, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start' },
  tipText: { fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 },
};

export default function SocialCalendar() {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [hovered, setHovered] = useState<string | null>(null);

  const plat = platforms.find((p) => p.id === platform)!;
  const data = engagementData[platform];

  return (
    <div style={s.container}>
      <div style={s.platforms}>
        {platforms.map((p) => (
          <button
            key={p.id}
            style={{
              ...s.platBtn,
              ...(platform === p.id ? { background: p.color + '20', borderColor: p.color, color: p.color } : {}),
            }}
            onClick={() => setPlatform(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={s.grid}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={{ ...s.th, textAlign: 'right', width: 50 }}></th>
              {days.map((d) => <th key={d} style={s.th}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, hi) => (
              <tr key={hour}>
                <td style={s.timeLabel}>{formatHour(hour)}</td>
                {days.map((day, di) => {
                  const score = data[hi]?.[di] || 0;
                  const key = `${day}-${hour}`;
                  return (
                    <td key={day} style={{ padding: 2 }}>
                      <div
                        style={{
                          ...s.cell,
                          background: getColor(score, plat.color),
                          border: hovered === key ? `1px solid ${plat.color}` : '1px solid transparent',
                        }}
                        onMouseEnter={() => setHovered(key)}
                        onMouseLeave={() => setHovered(null)}
                        title={`${day} ${formatHour(hour)}: ${score}/10 engagement`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={s.legend}>
        <span>Low</span>
        <div style={s.legendBar}>
          {[2, 4, 6, 7, 9].map((score) => (
            <div key={score} style={{ ...s.legendBlock, background: getColor(score, plat.color) }} />
          ))}
        </div>
        <span>High</span>
      </div>

      <div style={s.tip}>
        <Info size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={s.tipText}>
          <strong>Pro tip:</strong> These times are based on aggregated engagement data and serve as general guidelines.
          Your actual best posting times depend on your specific audience demographics and timezone.
          Use your platform&apos;s built-in analytics to refine these suggestions for your account.
        </div>
      </div>
    </div>
  );
}
