'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { tools, categories, Category } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';

const styles = {
  hero: {
    textAlign: 'center' as const,
    padding: '64px 24px 48px',
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  h1: {
    fontSize: 44,
    fontWeight: 800,
    lineHeight: 1.15,
    marginBottom: 16,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: 'var(--text-secondary)',
    maxWidth: 600,
    margin: '0 auto 32px',
    lineHeight: 1.6,
  },
  searchWrap: {
    position: 'relative' as const,
    maxWidth: 480,
    margin: '0 auto 16px',
  },
  searchIcon: {
    position: 'absolute' as const,
    left: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
  },
  searchInput: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-primary)',
    fontSize: 15,
    outline: 'none',
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 8,
    justifyContent: 'center',
    maxWidth: 'var(--max-width)',
    margin: '0 auto 48px',
    padding: '0 24px',
  },
  filterBtn: {
    padding: '8px 16px',
    borderRadius: 20,
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  filterActive: {
    background: 'var(--accent)',
    borderColor: 'var(--accent)',
    color: 'white',
  },
  section: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 24px 48px',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    display: 'inline-block',
  },
};

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const filtered = tools.filter((t) => {
    const matchesQuery =
      !query ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCategory === 'all' || t.category === activeCategory;
    return matchesQuery && matchesCat;
  });

  const groupedByCategory = (Object.keys(categories) as Category[])
    .map((cat) => ({
      category: cat,
      ...categories[cat],
      tools: filtered.filter((t) => t.category === cat),
    }))
    .filter((g) => g.tools.length > 0);

  return (
    <>
      <div style={styles.hero}>
        <h1 style={styles.h1}>
          Free Social Media Tools
        </h1>
        <p style={styles.subtitle}>
          15 free tools for Instagram, TikTok, YouTube, and Twitter/X. All client-side -- your data never leaves your browser.
        </p>
        <div style={styles.searchWrap}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.filters}>
        <button
          style={{
            ...styles.filterBtn,
            ...(activeCategory === 'all' ? styles.filterActive : {}),
          }}
          onClick={() => setActiveCategory('all')}
        >
          All Tools
        </button>
        {(Object.keys(categories) as Category[]).map((cat) => (
          <button
            key={cat}
            style={{
              ...styles.filterBtn,
              ...(activeCategory === cat ? { background: categories[cat].color, borderColor: categories[cat].color, color: 'white' } : {}),
            }}
            onClick={() => setActiveCategory(cat)}
          >
            {categories[cat].label}
          </button>
        ))}
      </div>

      {groupedByCategory.map((group) => (
        <section key={group.category} id={group.category} style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span style={{ ...styles.dot, background: group.color }} />
            {group.label} Tools
          </h2>
          <div style={styles.grid}>
            {group.tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--text-muted)' }}>
          No tools match your search. Try a different query.
        </div>
      )}
    </>
  );
}
