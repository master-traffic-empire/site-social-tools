import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'SocialKit terms of service.',
};

const s = {
  page: { maxWidth: 700, margin: '0 auto', padding: '48px 24px 64px' },
  h1: { fontSize: 36, fontWeight: 800, marginBottom: 8 },
  updated: { fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 },
  h2: { fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 },
  p: { fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 },
};

export default function TermsPage() {
  return (
    <div style={s.page}>
      <h1 style={s.h1}>Terms of Service</h1>
      <p style={s.updated}>Last updated: April 2025</p>

      <h2 style={s.h2}>Acceptance of Terms</h2>
      <p style={s.p}>
        By accessing and using SocialKit (social.thicket.sh), you agree to these terms of service.
        If you do not agree, please do not use our tools.
      </p>

      <h2 style={s.h2}>Service Description</h2>
      <p style={s.p}>
        SocialKit provides free, browser-based social media utility tools. All tools are provided
        &ldquo;as is&rdquo; without warranty of any kind. We make no guarantees about the availability,
        accuracy, or reliability of any tool.
      </p>

      <h2 style={s.h2}>User Responsibility</h2>
      <p style={s.p}>
        You are responsible for how you use the tools and any content you create using them.
        We are not responsible for any consequences resulting from the use of generated content,
        including but not limited to hashtags, captions, titles, or other text output.
      </p>

      <h2 style={s.h2}>Intellectual Property</h2>
      <p style={s.p}>
        Any content you enter into our tools remains your property. We do not claim ownership
        over any text, images, or other data you process using our tools. The tools themselves,
        including their design and code, are our intellectual property.
      </p>

      <h2 style={s.h2}>Limitation of Liability</h2>
      <p style={s.p}>
        SocialKit and its operators shall not be liable for any direct, indirect, incidental,
        special, or consequential damages resulting from your use of or inability to use the
        tools. This includes damages from reliance on tool outputs, such as giveaway winner
        selections.
      </p>

      <h2 style={s.h2}>Modifications</h2>
      <p style={s.p}>
        We reserve the right to modify, suspend, or discontinue any tool at any time without
        notice. We may also update these terms at any time. Continued use of the site after
        changes constitutes acceptance of the new terms.
      </p>

      <h2 style={s.h2}>Governing Law</h2>
      <p style={s.p}>
        These terms are governed by applicable law. Any disputes shall be resolved through
        appropriate legal channels.
      </p>
    </div>
  );
}
