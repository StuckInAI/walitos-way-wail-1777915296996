import Hero from '@/components/Hero';
import styles from './HomePage.module.css';
import { items, categories } from '@/data/items';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import ItemCard from '@/components/ItemCard';
import { useState, useMemo } from 'react';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div>
      <Hero />
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className={styles.grid}>
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No picks match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
