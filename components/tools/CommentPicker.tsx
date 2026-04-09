'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Gift, Shuffle, Copy, Filter, Trash2, Users, Trophy, Camera, LogIn, Image, MessageCircle, Heart, ChevronRight, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFacebook } from '@/lib/facebook';
import { fetchRecentMedia, fetchComments, type IGMedia, type IGComment } from '@/lib/instagram-api';

interface Comment {
  username: string;
  text: string;
  id: string;
}

const s = {
  container: { maxWidth: 860, margin: '0 auto' },
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
  excludeInput: {
    flex: 1, minWidth: 180, padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 14, outline: 'none',
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
  igBtn: { background: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)', color: 'white' },
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
  // Instagram integration styles
  connectSection: {
    margin: '0 0 32px', padding: 40, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)',
    border: '1px solid var(--border)', textAlign: 'center' as const,
  },
  connectTitle: { fontSize: 24, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' },
  connectDesc: { fontSize: 15, color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.6 },
  or: { display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0', color: 'var(--text-muted)', fontSize: 13 },
  orLine: { flex: 1, height: 1, background: 'var(--border)' },
  postGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, margin: '20px 0' },
  postCard: {
    borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', overflow: 'hidden',
    cursor: 'pointer', transition: 'all 0.2s', background: 'var(--bg-secondary)',
  },
  postImage: { width: '100%', aspectRatio: '1', objectFit: 'cover' as const, display: 'block' },
  postInfo: { padding: '10px 12px' },
  postStats: { display: 'flex', gap: 12, fontSize: 13, color: 'var(--text-muted)' },
  postStatItem: { display: 'flex', alignItems: 'center', gap: 4 },
  postCaption: { fontSize: 12, color: 'var(--text-secondary)', marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const },
  selectedPost: {
    margin: '20px 0', padding: 16, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)',
    border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', gap: 16,
  },
  selectedThumb: { width: 64, height: 64, borderRadius: 'var(--radius-sm)', objectFit: 'cover' as const },
  loadingBar: {
    height: 3, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden', margin: '16px 0',
  },
  loadingFill: {
    height: '100%', background: 'linear-gradient(90deg, var(--accent), #E1306C, var(--accent))',
    borderRadius: 2, animation: 'loadSlide 1.5s ease-in-out infinite',
    width: '40%',
  },
  errorBox: {
    padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: 'var(--radius-sm)', color: '#ef4444', fontSize: 14, margin: '16px 0',
  },
  tabRow: { display: 'flex', gap: 0, margin: '0 0 24px', borderBottom: '1px solid var(--border)' },
  tab: {
    padding: '12px 20px', fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', cursor: 'pointer',
    border: 'none', background: 'none', borderBottom: '2px solid transparent', transition: 'all 0.2s',
  },
  tabActive: { color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)' },
};

type Mode = 'instagram' | 'manual';

function parseComments(raw: string): Comment[] {
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  const comments: Comment[] = [];
  let id = 0;

  for (const line of lines) {
    const match = line.match(/^@?(\S+)[:\s]+(.+)$/);
    if (match) {
      comments.push({ username: match[1].replace(/^@/, ''), text: match[2].trim(), id: String(id++) });
    } else {
      comments.push({ username: `user_${id + 1}`, text: line, id: String(id++) });
    }
  }
  return comments;
}

export default function CommentPicker() {
  const { isLoggedIn, isSDKLoaded, igAccount, login, isLoggingIn, error: fbError } = useFacebook();

  const [mode, setMode] = useState<Mode>('instagram');
  const [raw, setRaw] = useState('');
  const [dedupe, setDedupe] = useState(true);
  const [minWords, setMinWords] = useState(0);
  const [excludeAccounts, setExcludeAccounts] = useState('');
  const [numWinners, setNumWinners] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [filtered, setFiltered] = useState<Comment[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [spinName, setSpinName] = useState('');
  const [winners, setWinners] = useState<Comment[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Instagram state
  const [posts, setPosts] = useState<IGMedia[]>([]);
  const [selectedPost, setSelectedPost] = useState<IGMedia | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load posts when logged in
  useEffect(() => {
    if (isLoggedIn && igAccount && mode === 'instagram' && posts.length === 0) {
      loadPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, igAccount, mode]);

  const loadPosts = async () => {
    if (!igAccount) return;
    setLoadingPosts(true);
    setApiError(null);
    try {
      const media = await fetchRecentMedia(igAccount.id, igAccount.pageAccessToken);
      setPosts(media);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoadingPosts(false);
    }
  };

  const selectPost = async (post: IGMedia) => {
    if (!igAccount) return;
    setSelectedPost(post);
    setLoadingComments(true);
    setApiError(null);
    setWinners([]);
    try {
      const igComments = await fetchComments(post.id, igAccount.pageAccessToken);
      const parsed: Comment[] = igComments.map((c) => ({
        username: c.username,
        text: c.text,
        id: c.id,
      }));
      setComments(parsed);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Failed to load comments');
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  // Filter logic
  const applyFilters = useCallback(() => {
    let pool = [...comments];

    if (dedupe) {
      const seen = new Set<string>();
      pool = pool.filter((c) => {
        const key = c.username.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    if (minWords > 0) {
      pool = pool.filter((c) => c.text.split(/\s+/).length >= minWords);
    }

    if (excludeAccounts.trim()) {
      const excluded = new Set(
        excludeAccounts.split(',').map((a) => a.trim().replace(/^@/, '').toLowerCase()).filter(Boolean)
      );
      pool = pool.filter((c) => !excluded.has(c.username.toLowerCase()));
    }

    setFiltered(pool);
  }, [comments, dedupe, minWords, excludeAccounts]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Manual mode: parse raw text into comments
  useEffect(() => {
    if (mode === 'manual') {
      setComments(parseComments(raw));
      setWinners([]);
    }
  }, [raw, mode]);

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
    const text = winners.map((w) => `@${w.username} -- ${w.text}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  const resetPicker = () => {
    setRaw('');
    setWinners([]);
    setComments([]);
    setFiltered([]);
    setSelectedPost(null);
  };

  return (
    <div style={s.container}>
      <style>{`
        @keyframes loadSlide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(-100%); }
        }
        .ig-post-card:hover { border-color: var(--accent) !important; transform: translateY(-2px); box-shadow: var(--shadow); }
        .ig-post-card.selected { border-color: var(--accent) !important; box-shadow: 0 0 0 1px var(--accent); }
      `}</style>

      {/* Mode tabs */}
      <div style={s.tabRow}>
        <button
          style={{ ...s.tab, ...(mode === 'instagram' ? s.tabActive : {}) }}
          onClick={() => { setMode('instagram'); resetPicker(); }}
        >
          <Camera size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />
          Connect Instagram
        </button>
        <button
          style={{ ...s.tab, ...(mode === 'manual' ? s.tabActive : {}) }}
          onClick={() => { setMode('manual'); resetPicker(); }}
        >
          Paste Comments
        </button>
      </div>

      {/* Instagram mode */}
      {mode === 'instagram' && !isLoggedIn && (
        <div style={s.connectSection}>
          <Camera size={40} color="#E1306C" style={{ marginBottom: 16 }} />
          <div style={s.connectTitle}>Connect Your Instagram</div>
          <div style={s.connectDesc}>
            Log in with Facebook to pull real comments from your Instagram posts. Select a post, and the tool will fetch all comments automatically.
          </div>
          <button
            style={{ ...s.btn, ...s.igBtn, padding: '14px 32px', fontSize: 16 }}
            onClick={login}
            disabled={!isSDKLoaded || isLoggingIn}
          >
            <LogIn size={20} />
            {isLoggingIn ? 'Connecting...' : !isSDKLoaded ? 'Loading...' : 'Connect with Facebook'}
          </button>
          {fbError && <div style={s.errorBox}>{fbError}</div>}
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16 }}>
            Requires an Instagram Business or Creator account connected to a Facebook Page.
            <br />Your data stays in your browser -- nothing is stored on our servers.
          </div>
        </div>
      )}

      {mode === 'instagram' && isLoggedIn && igAccount && !selectedPost && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            {igAccount.profilePictureUrl && (
              <img
                src={igAccount.profilePictureUrl}
                alt={igAccount.username}
                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
              />
            )}
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>@{igAccount.username}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Select a post to pick a winner from</div>
            </div>
          </div>

          {loadingPosts && (
            <div style={s.loadingBar}><div style={s.loadingFill} /></div>
          )}
          {apiError && <div style={s.errorBox}>{apiError}</div>}

          <div style={s.postGrid}>
            {posts.map((post) => (
              <div
                key={post.id}
                className="ig-post-card"
                style={s.postCard}
                onClick={() => selectPost(post)}
              >
                <img
                  src={post.thumbnail_url || post.media_url}
                  alt={post.caption?.slice(0, 40) || 'Post'}
                  style={s.postImage}
                />
                <div style={s.postInfo}>
                  <div style={s.postStats}>
                    <span style={s.postStatItem}><Heart size={13} /> {post.like_count}</span>
                    <span style={s.postStatItem}><MessageCircle size={13} /> {post.comments_count}</span>
                  </div>
                  {post.caption && <div style={s.postCaption}>{post.caption.slice(0, 60)}</div>}
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && !loadingPosts && !apiError && (
            <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
              No posts found. Make sure your Instagram account has recent posts.
            </div>
          )}
        </>
      )}

      {mode === 'instagram' && isLoggedIn && selectedPost && (
        <>
          <div style={s.selectedPost}>
            <img
              src={selectedPost.thumbnail_url || selectedPost.media_url}
              alt="Selected post"
              style={s.selectedThumb}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>
                {selectedPost.caption?.slice(0, 80) || 'No caption'}
                {selectedPost.caption && selectedPost.caption.length > 80 ? '...' : ''}
              </div>
              <div style={{ display: 'flex', gap: 12, fontSize: 13, color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Heart size={13} /> {selectedPost.like_count}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageCircle size={13} /> {selectedPost.comments_count}</span>
              </div>
            </div>
            <button
              style={{ ...s.btn, ...s.secondaryBtn, padding: '8px 16px', fontSize: 13 }}
              onClick={() => { setSelectedPost(null); setComments([]); setFiltered([]); setWinners([]); }}
            >
              <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back
            </button>
          </div>

          {loadingComments && (
            <div style={s.loadingBar}><div style={s.loadingFill} /></div>
          )}
          {apiError && <div style={s.errorBox}>{apiError}</div>}
        </>
      )}

      {/* Manual mode */}
      {mode === 'manual' && (
        <>
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
        </>
      )}

      {/* Shared: Filters, stats, picker -- show when we have comments */}
      {(comments.length > 0 || (mode === 'manual' && raw.trim())) && (
        <>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px' }}>
            <X size={14} color="var(--text-muted)" />
            <label style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Exclude accounts:</label>
            <input
              type="text"
              placeholder="@account1, @account2"
              value={excludeAccounts}
              onChange={(e) => setExcludeAccounts(e.target.value)}
              style={s.excludeInput}
            />
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
              onClick={resetPicker}
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
        </>
      )}
    </div>
  );
}
