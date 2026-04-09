'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Calculator, Camera, LogIn, RefreshCw } from 'lucide-react';
import { useFacebook } from '@/lib/facebook';
import { fetchProfile, fetchRecentMedia, type IGProfile, type IGMedia } from '@/lib/instagram-api';

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
  igBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer',
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
  realDataCard: {
    padding: 24, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
    marginBottom: 24,
  },
  realDataHeader: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 },
  profilePic: { width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' as const },
  postBreakdown: { marginTop: 16 },
  postRow: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
    borderBottom: '1px solid var(--border)', fontSize: 13,
  },
  postThumb: { width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'cover' as const },
  loadingBar: { height: 3, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden', margin: '16px 0' },
  loadingFill: {
    height: '100%', background: 'linear-gradient(90deg, var(--accent), #E1306C, var(--accent))',
    borderRadius: 2, animation: 'loadSlide 1.5s ease-in-out infinite', width: '40%',
  },
  errorBox: {
    padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: 'var(--radius-sm)', color: '#ef4444', fontSize: 14, margin: '16px 0',
  },
  divider: { display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0', color: 'var(--text-muted)', fontSize: 13 },
  dividerLine: { flex: 1, height: 1, background: 'var(--border)' },
};

const platColors: Record<Platform, string> = {
  instagram: '#E1306C',
  tiktok: '#00f2ea',
  youtube: '#FF0000',
  twitter: '#1DA1F2',
};

export default function EngagementCalculator() {
  const { isLoggedIn, isSDKLoaded, igAccount, login, isLoggingIn, error: fbError } = useFacebook();

  const [platform, setPlatform] = useState<Platform>('instagram');
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [rate, setRate] = useState<number | null>(null);

  // Real data state
  const [igProfile, setIgProfile] = useState<IGProfile | null>(null);
  const [igPosts, setIgPosts] = useState<IGMedia[]>([]);
  const [realRate, setRealRate] = useState<number | null>(null);
  const [loadingReal, setLoadingReal] = useState(false);
  const [realError, setRealError] = useState<string | null>(null);

  const loadRealData = async () => {
    if (!igAccount) return;
    setLoadingReal(true);
    setRealError(null);
    try {
      const [profile, media] = await Promise.all([
        fetchProfile(igAccount.id, igAccount.pageAccessToken),
        fetchRecentMedia(igAccount.id, igAccount.pageAccessToken, 25),
      ]);
      setIgProfile(profile);
      setIgPosts(media);

      if (profile.followers_count > 0 && media.length > 0) {
        const totalEngagement = media.reduce((sum, p) => sum + (p.like_count || 0) + (p.comments_count || 0), 0);
        const avgEngagement = totalEngagement / media.length;
        setRealRate((avgEngagement / profile.followers_count) * 100);
      }
    } catch (err) {
      setRealError(err instanceof Error ? err.message : 'Failed to load profile data');
    } finally {
      setLoadingReal(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && igAccount && platform === 'instagram' && !igProfile) {
      loadRealData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, igAccount, platform]);

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

  const renderRateResult = (calcRate: number, source: string) => (
    <div style={s.result}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{source}</div>
      <div style={{ ...s.rate, color: getRating(calcRate).color }}>
        {calcRate.toFixed(2)}%
      </div>
      <div style={s.rateLabel}>Engagement Rate</div>
      <span style={{ ...s.badge, background: getRating(calcRate).color + '20', color: getRating(calcRate).color }}>
        {getRating(calcRate).label}
      </span>

      <div style={s.bar}>
        <div style={{ ...s.barFill, width: `${Math.min(calcRate / benchmarks[platform].excellent * 100, 100)}%`, background: getRating(calcRate).color }} />
      </div>
      <div style={s.barMarkers}>
        <span>0%</span>
        <span>Avg: {benchmarks[platform].avg}%</span>
        <span>Good: {benchmarks[platform].good}%</span>
        <span>{benchmarks[platform].excellent}%+</span>
      </div>
    </div>
  );

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

      {/* Real Instagram data section */}
      {platform === 'instagram' && isLoggedIn && igAccount && (
        <div style={s.realDataCard}>
          <div style={s.realDataHeader}>
            {igProfile?.profile_picture_url && (
              <img src={igProfile.profile_picture_url} alt={igProfile.username} style={s.profilePic} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>
                @{igProfile?.username || igAccount.username}
              </div>
              {igProfile && (
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {igProfile.followers_count.toLocaleString()} followers -- {igProfile.media_count} posts
                </div>
              )}
            </div>
            <button style={{ ...s.btn, padding: '8px 16px', fontSize: 13, marginBottom: 0 }} onClick={loadRealData} disabled={loadingReal}>
              <RefreshCw size={14} /> Refresh
            </button>
          </div>

          {loadingReal && <div style={s.loadingBar}><div style={s.loadingFill} /></div>}
          {realError && <div style={s.errorBox}>{realError}</div>}

          {realRate !== null && renderRateResult(realRate, `Real data from last ${igPosts.length} posts`)}

          {igPosts.length > 0 && (
            <div style={s.postBreakdown}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Recent Post Performance
              </div>
              {igPosts.slice(0, 10).map((post) => {
                const postRate = igProfile && igProfile.followers_count > 0
                  ? ((post.like_count + post.comments_count) / igProfile.followers_count * 100)
                  : 0;
                return (
                  <div key={post.id} style={s.postRow}>
                    <img src={post.thumbnail_url || post.media_url} alt="" style={s.postThumb} />
                    <div style={{ flex: 1, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {post.caption?.slice(0, 50) || 'No caption'}
                    </div>
                    <div style={{ color: 'var(--text-muted)', minWidth: 80, textAlign: 'right' }}>
                      {post.like_count} likes
                    </div>
                    <div style={{ fontWeight: 600, color: getRating(postRate).color, minWidth: 60, textAlign: 'right' }}>
                      {postRate.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {platform === 'instagram' && !isLoggedIn && (
        <div style={{ padding: 20, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>
            Connect Instagram to calculate engagement from your real post data
          </div>
          <button style={s.igBtn} onClick={login} disabled={!isSDKLoaded || isLoggingIn}>
            <Camera size={16} />
            {isLoggingIn ? 'Connecting...' : 'Connect Instagram'}
          </button>
          {fbError && <div style={s.errorBox}>{fbError}</div>}
        </div>
      )}

      {(platform !== 'instagram' || !isLoggedIn) && (
        <>
          {platform === 'instagram' && isLoggedIn && (
            <div style={s.divider}>
              <div style={s.dividerLine} />
              <span>or calculate manually</span>
              <div style={s.dividerLine} />
            </div>
          )}
        </>
      )}

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
          {renderRateResult(rate, 'Manual calculation')}

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
