'use client';

import Link from 'next/link';
import { Wrench, Menu, X, LogOut, Camera } from 'lucide-react';
import { useState } from 'react';
import { useFacebook } from '@/lib/facebook';

const styles = {
  header: {
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
    background: 'rgba(10, 10, 15, 0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: 20,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 28,
  },
  link: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  menuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    padding: 4,
  },
  mobileNav: {
    position: 'fixed' as const,
    top: 64,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'var(--bg-primary)',
    padding: 24,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
    zIndex: 99,
  },
  mobileLink: {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontSize: 18,
    fontWeight: 500,
    padding: '12px 0',
    borderBottom: '1px solid var(--border)',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    objectFit: 'cover' as const,
    border: '1px solid var(--border)',
  },
  username: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--text-secondary)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 8px',
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-muted)',
    fontSize: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  connectBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    background: 'linear-gradient(135deg, #833AB4, #E1306C)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    color: 'white',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, igAccount, login, logout, isSDKLoaded, isLoggingIn } = useFacebook();

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link href="/" style={styles.logo}>
          <Wrench size={22} color="var(--accent)" />
          SocialKit
        </Link>
        <nav style={styles.nav} className="desktop-nav">
          <Link href="/" style={styles.link}>Tools</Link>
          <Link href="/about" style={styles.link}>About</Link>
          {isLoggedIn && igAccount ? (
            <div style={styles.userSection}>
              {igAccount.profilePictureUrl && (
                <img src={igAccount.profilePictureUrl} alt={igAccount.username} style={styles.avatar} />
              )}
              <span style={styles.username}>@{igAccount.username}</span>
              <button style={styles.logoutBtn} onClick={logout} title="Disconnect Instagram">
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <button
              style={styles.connectBtn}
              onClick={login}
              disabled={!isSDKLoaded || isLoggingIn}
            >
              <Camera size={14} />
              {isLoggingIn ? 'Connecting...' : 'Connect IG'}
            </button>
          )}
        </nav>
        <button
          style={styles.menuBtn}
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <nav style={styles.mobileNav} className="mobile-nav">
          <Link href="/" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Tools</Link>
          <Link href="/about" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/privacy" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Privacy</Link>
          <Link href="/terms" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Terms</Link>
          {isLoggedIn && igAccount ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
              {igAccount.profilePictureUrl && (
                <img src={igAccount.profilePictureUrl} alt={igAccount.username} style={styles.avatar} />
              )}
              <span style={{ fontSize: 16, color: 'var(--text-primary)' }}>@{igAccount.username}</span>
              <button style={{ ...styles.logoutBtn, fontSize: 14, padding: '6px 12px' }} onClick={() => { logout(); setMenuOpen(false); }}>
                <LogOut size={14} /> Disconnect
              </button>
            </div>
          ) : (
            <button
              style={{ ...styles.connectBtn, padding: '10px 20px', fontSize: 15 }}
              onClick={() => { login(); setMenuOpen(false); }}
              disabled={!isSDKLoaded || isLoggingIn}
            >
              <Camera size={16} />
              {isLoggingIn ? 'Connecting...' : 'Connect Instagram'}
            </button>
          )}
        </nav>
      )}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
