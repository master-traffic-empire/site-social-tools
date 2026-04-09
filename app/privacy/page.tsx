import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'SocialKit privacy policy. Your data never leaves your browser.',
};

const s = {
  page: { maxWidth: 700, margin: '0 auto', padding: '48px 24px 64px' },
  h1: { fontSize: 36, fontWeight: 800, marginBottom: 8 },
  updated: { fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 },
  h2: { fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 },
  p: { fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 },
};

export default function PrivacyPage() {
  return (
    <div style={s.page}>
      <h1 style={s.h1}>Privacy Policy</h1>
      <p style={s.updated}>Last updated: April 2025</p>

      <h2 style={s.h2}>Overview</h2>
      <p style={s.p}>
        SocialKit (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates social.thicket.sh. This page informs you of our policies
        regarding the collection, use, and disclosure of information when you use our tools.
      </p>

      <h2 style={s.h2}>Data Collection</h2>
      <p style={s.p}>
        All SocialKit tools run entirely in your web browser. We do not collect, store, or transmit
        any of the data you enter into our tools. Images you upload are processed locally on your
        device and never sent to our servers.
      </p>

      <h2 style={s.h2}>Analytics</h2>
      <p style={s.p}>
        We use Google Analytics (GA4) to collect anonymous usage statistics such as page views,
        session duration, and general geographic region. This data helps us understand which tools
        are most useful and how to improve the site. No personally identifiable information is
        collected through analytics.
      </p>

      <h2 style={s.h2}>Cookies</h2>
      <p style={s.p}>
        We use minimal cookies necessary for analytics functionality. We do not use advertising
        cookies or share cookie data with third parties.
      </p>

      <h2 style={s.h2}>Local Storage</h2>
      <p style={s.p}>
        Some tools may use your browser&apos;s local storage to save preferences or settings between
        visits. This data is stored only on your device and is never transmitted to us.
      </p>

      <h2 style={s.h2}>Third-Party Services</h2>
      <p style={s.p}>
        The only third-party service we use is Google Analytics for anonymous usage statistics.
        We do not use any advertising networks, social media tracking pixels, or other third-party
        data collection tools.
      </p>

      <h2 style={s.h2}>Changes</h2>
      <p style={s.p}>
        We may update this privacy policy from time to time. Any changes will be reflected on this
        page with an updated date.
      </p>

      <h2 style={s.h2}>Contact</h2>
      <p style={s.p}>
        If you have questions about this privacy policy, please reach out through our website.
      </p>
    </div>
  );
}
