import Link from 'next/link';

const styles = {
  footer: {
    borderTop: '1px solid var(--border)',
    background: 'var(--bg-secondary)',
    padding: '48px 24px 32px',
    marginTop: 'auto',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    gap: 32,
  },
  brand: {
    maxWidth: 300,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 8,
  },
  brandDesc: {
    fontSize: 14,
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  },
  column: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  },
  columnTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    marginBottom: 4,
  },
  link: {
    fontSize: 14,
    color: 'var(--text-muted)',
    textDecoration: 'none',
  },
  bottom: {
    maxWidth: 'var(--max-width)',
    margin: '24px auto 0',
    paddingTop: 24,
    borderTop: '1px solid var(--border)',
    textAlign: 'center' as const,
    fontSize: 13,
    color: 'var(--text-muted)',
  },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.brand}>
          <div style={styles.brandName}>SocialKit</div>
          <div style={styles.brandDesc}>
            Free social media tools for creators and marketers. All tools run in your browser — no sign-up, no data collection.
          </div>
        </div>
        <div style={styles.column}>
          <div style={styles.columnTitle}>Tools</div>
          <Link href="/#instagram" style={styles.link}>Instagram Tools</Link>
          <Link href="/#tiktok" style={styles.link}>TikTok Tools</Link>
          <Link href="/#youtube" style={styles.link}>YouTube Tools</Link>
          <Link href="/#twitter" style={styles.link}>Twitter / X Tools</Link>
          <Link href="/#cross-platform" style={styles.link}>Cross-Platform</Link>
        </div>
        <div style={styles.column}>
          <div style={styles.columnTitle}>Company</div>
          <Link href="/about" style={styles.link}>About</Link>
          <Link href="/privacy" style={styles.link}>Privacy Policy</Link>
          <Link href="/terms" style={styles.link}>Terms of Service</Link>
        </div>
      </div>
      <div style={styles.bottom}>
        &copy; {new Date().getFullYear()} SocialKit. All rights reserved.
      </div>
    </footer>
  );
}
