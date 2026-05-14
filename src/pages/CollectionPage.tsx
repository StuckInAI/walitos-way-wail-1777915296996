import { useState } from 'react';
import { ITEMS, CATEGORIES } from '@/data/items';
import type { Item } from '@/data/items';
import ItemCard from '@/components/ItemCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import styles from './CollectionPage.module.css';

export default function CollectionPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = ITEMS.filter((item: Item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const grouped = CATEGORIES.filter((c) => c.id !== 'all').reduce(
    (acc, cat) => {
      const items = filtered.filter((i) => i.category === cat.id);
      if (items.length > 0) acc[cat.id] = { label: cat.label, items };
      return acc;
    },
    {} as Record<string, { label: string; items: Item[] }>
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          Every pick
        </div>
        <h1 className={styles.title}>The Full Collection</h1>
        <p className={styles.subtitle}>
          {ITEMS.length} curated picks across {CATEGORIES.length - 1} categories.
          Every single thing I'd recommend without hesitation.
        </p>
      </div>

      <div className={styles.controls}>
        <CategoryFilter
          categories={CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <div className={styles.controlsRight}>
          <SearchBar value={search} onChange={setSearch} />
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${view === 'grid' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('grid')}
              aria-label="Grid view"
            >
              Grid
            </button>
            <button
              className={`${styles.viewBtn} ${view === 'list' ? styles.viewBtnActive : ''}`}
              onClick={() => setView('list')}
              aria-label="List view"
            >
              List
            </button>
          </div>
        </div>
      </div>

      {activeCategory === 'all' ? (
        <div className={styles.grouped}>
          {Object.entries(grouped).map(([catId, { label, items }]) => (
            <div key={catId} className={styles.group}>
              <div className={styles.groupHeader}>
                <h2 className={styles.groupTitle}>{label}</h2>
                <span className={styles.groupCount}>{items.length}</span>
              </div>
              <div className={view === 'grid' ? styles.grid : styles.list}>
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={view === 'grid' ? styles.grid : styles.list}>
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <p>No picks match your search.</p>
          <p className={styles.emptyHint}>Try a different keyword or category.</p>
        </div>
      )}
    </div>
  );
}
