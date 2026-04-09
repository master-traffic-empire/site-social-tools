import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { tools, getToolBySlug, getRelatedTools, categories } from '@/lib/tools';
import ToolRenderer from '@/components/tools/ToolRegistry';
import ToolCard from '@/components/ToolCard';
import siteConfig from '@/site.config';

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      type: 'website',
      url: `${siteConfig.baseUrl}/tools/${slug}`,
    },
  };
}

const s = {
  page: { maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 24px 64px' },
  breadcrumb: { fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, display: 'flex', gap: 8, alignItems: 'center' },
  breadLink: { color: 'var(--text-muted)', textDecoration: 'none' },
  header: { marginBottom: 32 },
  badge: { display: 'inline-block', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 4, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: 0.5 },
  h1: { fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 },
  desc: { fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 700 },
  tool: { marginBottom: 48 },
  section: { marginBottom: 40 },
  sectionTitle: { fontSize: 22, fontWeight: 700, marginBottom: 16 },
  howTo: { listStyle: 'none', padding: 0, counterReset: 'howto' },
  howToItem: {
    counterIncrement: 'howto', position: 'relative' as const, paddingLeft: 40, marginBottom: 16,
    fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6,
  },
  stepNum: {
    position: 'absolute' as const, left: 0, top: 0, width: 28, height: 28, borderRadius: '50%',
    background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 13, fontWeight: 700,
  },
  faq: { marginBottom: 12, padding: 20, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' },
  faqQ: { fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 },
  faqA: { fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 },
  related: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 },
  jsonLd: { display: 'none' },
};

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const cat = categories[tool.category];
  const related = getRelatedTools(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.metaDescription,
    url: `${siteConfig.baseUrl}/tools/${slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div style={s.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav style={s.breadcrumb}>
        <a href="/" style={s.breadLink}>Home</a>
        <span>/</span>
        <a href={`/#${tool.category}`} style={s.breadLink}>{cat.label}</a>
        <span>/</span>
        <span style={{ color: 'var(--text-secondary)' }}>{tool.shortName}</span>
      </nav>

      <div style={s.header}>
        <span style={{ ...s.badge, background: `${cat.color}15`, color: cat.color }}>
          {cat.label}
        </span>
        <h1 style={s.h1}>{tool.name}</h1>
        <p style={s.desc}>{tool.longDescription}</p>
      </div>

      <div style={s.tool}>
        <ToolRenderer slug={slug} />
      </div>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>How to Use</h2>
        <ol style={s.howTo}>
          {tool.howTo.map((step, i) => (
            <li key={i} style={s.howToItem}>
              <span style={s.stepNum}>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>Frequently Asked Questions</h2>
        {tool.faq.map((item, i) => (
          <div key={i} style={s.faq}>
            <div style={s.faqQ}>{item.q}</div>
            <div style={s.faqA}>{item.a}</div>
          </div>
        ))}
      </div>

      {related.length > 0 && (
        <div style={s.section}>
          <h2 style={s.sectionTitle}>Related Tools</h2>
          <div style={s.related}>
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
