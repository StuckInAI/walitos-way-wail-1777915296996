import { useState } from 'react';
import { ITEMS, CATEGORIES } from '@/data/items';
import type { Item } from '@/data/items';
import Hero from '@/components/Hero';
import ItemCard from '@/components/ItemCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = ITEMS.filter((item: Item) => {
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
        <div className={styles.grid}>
          {filtered.map((item: Item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className={styles.empty}>No picks match your search.</p>
        )}
      </section>
    </>
  );
}
