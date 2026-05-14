import { useState } from 'react';
import { CATEGORIES } from '@/data/items';
import type { Item } from '@/data/items';
import Hero from '@/components/Hero';
import ItemCard from '@/components/ItemCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import { useItems } from '@/hooks/useItems';
import styles from './HomePage.module.css';

export default function HomePage() {
  const items = useItems();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = items.filter((item: Item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t: string) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Hero />
      <section className={styles.section}>
        <div className={styles.controls}>
          <CategoryFilter
            categories={CATEGORIES}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className={styles.resultsBar}>
          <span className={styles.count}>{filtered.length}</span>
          <span className={styles.categoryLabel}>
            {activeCategory === 'all' ? 'picks across all categories' : `picks in `}
            {activeCategory !== 'all' && <strong>{activeCategory}</strong>}
          </span>
        </div>

        <div className={styles.grid}>
          {filtered.map((item: Item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No picks match your search.</p>
            <p className={styles.emptyHint}>Try a different keyword or category.</p>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>Walito's Way &mdash; {new Date().getFullYear()}</p>
        <p className={styles.footerSub}>Real picks. No noise. No affiliate links.</p>
      </footer>
    </>
  );
}
