import { useState, useMemo } from 'react';
import { CATEGORIES, ITEMS } from '@/data/items';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import ItemCard from '@/components/ItemCard';
import Hero from '@/components/Hero';
import styles from '@/pages/HomePage.module.css';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let result = ITEMS;

    if (activeCategory !== 'all') {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const activeCount = filteredItems.length;

  return (
    <div className={styles.page}>
      <Hero />

      <div className={styles.controls}>
        <CategoryFilter
          categories={CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className={styles.resultsBar}>
        <span className={styles.count}>
          {activeCount} {activeCount === 1 ? 'item' : 'items'}
        </span>
        {activeCategory !== 'all' && (
          <span className={styles.categoryLabel}>
            in{' '}
            <strong>
              {CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </strong>
          </span>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyEmoji}>🔍</span>
          <p>Nothing found for <strong>"{ searchQuery }"</strong></p>
          <p className={styles.emptyHint}>Try a different search or category</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
