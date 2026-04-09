'use client';

import Link from 'next/link';
import { Wrench, Menu, X } from 'lucide-react';
import { useState } from 'react';

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
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
