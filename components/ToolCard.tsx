import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Tool, categories } from '@/lib/tools';

const styles = {
  card: {
    display: 'block',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: 24,
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.2s ease',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  badge: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: 4,
    marginTop: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const cat = categories[tool.category];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[tool.icon] || Icons.Wrench;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      style={styles.card}
      className="tool-card"
    >
      <div
        style={{
          ...styles.iconWrap,
          background: `${cat.color}15`,
        }}
      >
        <IconComponent size={24} color={cat.color} />
      </div>
      <div style={styles.name}>{tool.shortName}</div>
      <div style={styles.desc}>{tool.description}</div>
      <span
        style={{
          ...styles.badge,
          background: `${cat.color}15`,
          color: cat.color,
        }}
      >
        {cat.label}
      </span>
    </Link>
  );
}
