'use client';

import { useState, useEffect } from 'react';
import { Calendar, Plus, X, Clock, Camera, LogIn, BarChart3 } from 'lucide-react';
import { useFacebook } from '@/lib/facebook';
import { fetchRecentMedia, type IGMedia } from '@/lib/instagram-api';

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter';

const platformColors: Record<Platform, string> = {
  instagram: '#E1306C',
  tiktok: '#00f2ea',
  youtube: '#FF0000',
  twitter: '#1DA1F2',
};

const bestTimes: Record<Platform, Record<string, number[]>> = {
  instagram: {
    Mon: [7, 11, 12, 14, 19],
    Tue: [7, 10, 14, 19],
    Wed: [7, 11, 14, 19],
    Thu: [7, 11, 12, 14, 19, 20],
    Fri: [7, 11, 14, 15],
    Sat: [9, 10, 11],
    Sun: [9, 10, 11, 19],
  },
  tiktok: {
    Mon: [6, 10, 22],
    Tue: [2, 4, 9],
    Wed: [7, 8, 11],
    Thu: [9, 12, 19],
    Fri: [5, 13, 15],
    Sat: [11, 19, 20],
    Sun: [7, 8, 16],
  },
  youtube: {
    Mon: [14, 15, 16],
    Tue: [14, 15, 16],
    Wed: [14, 15, 16],
    Thu: [12, 15, 16],
    Fri: [12, 15, 16],
    Sat: [9, 10, 11],
    Sun: [9, 10, 11],
  },
  twitter: {
    Mon: [8, 10, 12],
    Tue: [8, 10, 15],
    Wed: [9, 12, 17],
    Thu: [8, 10, 12],
    Fri: [9, 10, 11],
    Sat: [8, 9],
    Sun: [9],
  },
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dayMap: Record<number, string> = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' };
const hours = Array.from({ length: 18 }, (_, i) => i + 5); // 5am to 10pm

interface PlannedPost {
  day: string;
  hour: number;
  note: string;
}

const s = {
  container: { maxWidth: 900, margin: '0 auto' },
  platforms: { display: 'flex', flexWrap: 'wrap' as const, gap: 10, marginBottom: 24 },
  platBtn: {
    padding: '10px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'transparent', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
  },
  legend: { display: 'flex', gap: 20, marginBottom: 16, flexWrap: 'wrap' as const, fontSize: 13, color: 'var(--text-muted)' },
  legendItem: { display: 'flex', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 3 },
  grid: { overflowX: 'auto' as const, marginBottom: 24 },
  table: { width: '100%', borderCollapse: 'collapse' as const, minWidth: 700 },
  th: { padding: '8px 4px', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' as const },
  td: {
    padding: 2, textAlign: 'center' as const, position: 'relative' as const, cursor: 'pointer',
  },
  cell: {
    width: '100%', height: 32, borderRadius: 4, border: '1px solid transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, transition: 'all 0.15s',
  },
  timeLabel: { padding: '8px 4px', fontSize: 11, color: 'var(--text-muted)', textAlign: 'right' as const, whiteSpace: 'nowrap' as const },
  posts: { marginTop: 24 },
  postCard: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px',
    background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: 8,
  },
  removeBtn: { background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 },
  igBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer',
  },
  realDataBanner: {
    padding: 16, background: 'rgba(225, 48, 108, 0.08)', borderRadius: 'var(--radius-sm)',
    border: '1px solid rgba(225, 48, 108, 0.2)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12,
  },
  loadingBar: { height: 3, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden', margin: '16px 0' },
  loadingFill: {
    height: '100%', background: 'linear-gradient(90deg, var(--accent), #E1306C, var(--accent))',
    borderRadius: 2, animation: 'loadSlide 1.5s ease-in-out infinite', width: '40%',
  },
};

function analyzePostingPattern(posts: IGMedia[]): Record<string, number[]> {
  const pattern: Record<string, Set<number>> = {};
  for (const d of days) pattern[d] = new Set();

  for (const post of posts) {
    const date = new Date(post.timestamp);
    const dayName = dayMap[date.getDay()];
    const hour = date.getHours();
    if (dayName) {
      pattern[dayName].add(hour);
    }
  }

  const result: Record<string, number[]> = {};
  for (const d of days) {
    result[d] = Array.from(pattern[d]).sort((a, b) => a - b);
  }
  return result;
}

export default function SchedulerPlanner() {
  const { isLoggedIn, isSDKLoaded, igAccount, login, isLoggingIn, error: fbError } = useFacebook();

  const [platform, setPlatform] = useState<Platform>('instagram');
  const [posts, setPosts] = useState<PlannedPost[]>([]);
  const [realPattern, setRealPattern] = useState<Record<string, number[]> | null>(null);
  const [loadingPattern, setLoadingPattern] = useState(false);
  const [useRealData, setUseRealData] = useState(false);

  useEffect(() => {
    if (isLoggedIn && igAccount && platform === 'instagram' && !realPattern) {
      loadPostingPattern();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, igAccount, platform]);

  const loadPostingPattern = async () => {
    if (!igAccount) return;
    setLoadingPattern(true);
    try {
      const media = await fetchRecentMedia(igAccount.id, igAccount.pageAccessToken, 25);
      const pattern = analyzePostingPattern(media);
      setRealPattern(pattern);
      setUseRealData(true);
    } catch {
      // Silently fall back to default times
    } finally {
      setLoadingPattern(false);
    }
  };

  const activeTimes = useRealData && realPattern ? realPattern : bestTimes[platform];

  const isBestTime = (day: string, hour: number) => {
    return activeTimes[day]?.includes(hour) || false;
  };

  const hasPost = (day: string, hour: number) => {
    return posts.some((p) => p.day === day && p.hour === hour);
  };

  const togglePost = (day: string, hour: number) => {
    if (hasPost(day, hour)) {
      setPosts(posts.filter((p) => !(p.day === day && p.hour === hour)));
    } else {
      setPosts([...posts, { day, hour, note: '' }]);
    }
  };

  const formatHour = (h: number) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hr = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hr}${ampm}`;
  };

  return (
    <div style={s.container}>
      <style>{`
        @keyframes loadSlide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      <div style={s.platforms}>
        {(Object.keys(platformColors) as Platform[]).map((p) => (
          <button
            key={p}
            style={{
              ...s.platBtn,
              ...(platform === p ? { background: platformColors[p] + '20', borderColor: platformColors[p], color: platformColors[p] } : {}),
            }}
            onClick={() => { setPlatform(p); if (p !== 'instagram') setUseRealData(false); }}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Real data toggle for Instagram */}
      {platform === 'instagram' && isLoggedIn && realPattern && (
        <div style={s.realDataBanner}>
          <BarChart3 size={18} color="#E1306C" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
              Your Posting Pattern
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Showing times based on your actual posting history
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useRealData} onChange={(e) => setUseRealData(e.target.checked)} />
            Use my data
          </label>
        </div>
      )}

      {platform === 'instagram' && !isLoggedIn && (
        <div style={{ marginBottom: 20, padding: 16, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Connect Instagram to see your actual posting times overlaid on the schedule
            </div>
          </div>
          <button style={s.igBtn} onClick={login} disabled={!isSDKLoaded || isLoggingIn}>
            <Camera size={14} />
            Connect
          </button>
        </div>
      )}

      {loadingPattern && <div style={s.loadingBar}><div style={s.loadingFill} /></div>}

      <div style={s.legend}>
        <div style={s.legendItem}>
          <div style={{ ...s.legendDot, background: platformColors[platform] + '40' }} />
          {useRealData ? 'Your posting times' : 'Best time to post'}
        </div>
        <div style={s.legendItem}>
          <div style={{ ...s.legendDot, background: platformColors[platform] }} />
          Scheduled
        </div>
        <div style={s.legendItem}>
          <div style={{ ...s.legendDot, background: 'var(--bg-tertiary)' }} />
          Available
        </div>
      </div>

      <div style={s.grid}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={{ ...s.th, textAlign: 'right' as const, width: 50 }}>
                <Clock size={14} />
              </th>
              {days.map((d) => (
                <th key={d} style={s.th}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td style={s.timeLabel}>{formatHour(hour)}</td>
                {days.map((day) => {
                  const best = isBestTime(day, hour);
                  const posted = hasPost(day, hour);
                  return (
                    <td key={day} style={s.td} onClick={() => togglePost(day, hour)}>
                      <div
                        style={{
                          ...s.cell,
                          background: posted
                            ? platformColors[platform]
                            : best
                            ? platformColors[platform] + '30'
                            : 'var(--bg-tertiary)',
                          border: best && !posted ? `1px solid ${platformColors[platform]}50` : '1px solid transparent',
                          color: posted ? 'white' : 'transparent',
                          fontWeight: 700,
                        }}
                      >
                        {posted ? <Plus size={12} /> : ''}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {posts.length > 0 && (
        <div style={s.posts}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar size={18} color="var(--accent)" />
            Scheduled Posts ({posts.length})
          </div>
          {posts
            .sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day) || a.hour - b.hour)
            .map((p, i) => (
              <div key={i} style={s.postCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: platformColors[platform] }}>
                    {p.day} {formatHour(p.hour)}
                  </div>
                  {isBestTime(p.day, p.hour) && (
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--success)20', color: 'var(--success)' }}>
                      {useRealData ? 'Your usual time' : 'Optimal'}
                    </span>
                  )}
                </div>
                <button style={s.removeBtn} onClick={() => setPosts(posts.filter((_, j) => j !== i))}>
                  <X size={16} />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
