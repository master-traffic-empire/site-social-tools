import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SocialKit — Free Social Media Tools',
  description: 'SocialKit provides free, privacy-first social media tools for creators and marketers. All tools run in your browser.',
};

const s = {
  page: { maxWidth: 700, margin: '0 auto', padding: '48px 24px 64px' },
  h1: { fontSize: 36, fontWeight: 800, marginBottom: 16 },
  p: { fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 },
  h2: { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 12 },
  list: { paddingLeft: 24, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 },
};

export default function AboutPage() {
  return (
    <div style={s.page}>
      <h1 style={s.h1}>About SocialKit</h1>
      <p style={s.p}>
        SocialKit is a collection of free social media tools built for creators, marketers, and anyone
        who manages a social media presence. Every tool runs entirely in your browser — no sign-ups,
        no data collection, no server-side processing.
      </p>

      <h2 style={s.h2}>Why SocialKit?</h2>
      <p style={s.p}>
        Managing social media accounts requires jumping between dozens of tools, many of which demand
        sign-ups, subscriptions, or access to your accounts. SocialKit takes a different approach:
      </p>
      <ul style={s.list}>
        <li>All tools are 100% free with no hidden paywalls</li>
        <li>Everything runs client-side in your browser</li>
        <li>Your data never leaves your device</li>
        <li>No account creation required</li>
        <li>No ads or tracking beyond basic analytics</li>
      </ul>

      <h2 style={s.h2}>Our Tools</h2>
      <p style={s.p}>
        We offer tools across all major social media platforms: Instagram, TikTok, YouTube, and
        Twitter/X. From comment pickers for giveaways to image resizers for every platform,
        each tool is designed to solve a specific problem creators face daily.
      </p>

      <h2 style={s.h2}>Privacy First</h2>
      <p style={s.p}>
        We believe your content and data belong to you. All image processing, text formatting,
        and calculations happen in your browser using JavaScript. Images you upload for resizing
        or thumbnail checking are never sent to any server. Nothing is stored or transmitted.
      </p>

      <h2 style={s.h2}>Open and Transparent</h2>
      <p style={s.p}>
        SocialKit is part of the Thicket utility tools network. We build practical, focused tools
        that respect your time and privacy. If you have feedback or tool suggestions, we are
        always looking to improve.
      </p>
    </div>
  );
}
