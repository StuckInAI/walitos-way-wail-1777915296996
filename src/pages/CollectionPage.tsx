import { useState, useMemo } from 'react';
import { LayoutGrid, List, SortAsc, SortDesc, Filter } from 'lucide-react';
import { ITEMS, CATEGORIES } from '@/data/items';
import ItemCard from '@/components/ItemCard';
import styles from '@/pages/CollectionPage.module.css';

type SortKey = 'dateAdded' | 'title' | 'category' | 'rating';
type SortDir = 'asc' | 'desc';
type ViewMode = 'grid' | 'list';

export default function CollectionPage() {
  const [sortKey, setSortKey] = useState<SortKey>('dateAdded');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const clearFilters = () => setSelectedCategories([]);

  const sorted = useMemo(() => {
    let result = [...ITEMS];
    if (selectedCategories.length > 0) {
      result = result.filter(i => selectedCategories.includes(i.category));
    }
    result.sort((a, b) => {
      let valA: string | number = '';
      let valB: string | number = '';
      if (sortKey === 'title') {
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
      } else if (sortKey === 'category') {
        valA = a.category;
        valB = b.category;
      } else if (sortKey === 'rating') {
        valA = a.rating ?? 0;
        valB = b.rating ?? 0;
      } else {
        // dateAdded — treat as string sort ("Month YYYY")
        valA = a.dateAdded ?? '';
        valB = b.dateAdded ?? '';
      }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [sortKey, sortDir, selectedCategories]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const categoriesWithAll = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.eyebrow}>
          <LayoutGrid size={13} />
          Full Collection
        </div>
        <h1 className={styles.title}>Every Pick</h1>
        <p className={styles.subtitle}>
          {ITEMS.length} items across {categoriesWithAll.length} categories.
          Sort, filter, and browse the complete list.
        </p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlsLeft}>
          <div className={styles.filterGroup}>
            <Filter size={13} className={styles.filterIcon} />
            <span className={styles.filterLabel}>Filter:</span>
            {categoriesWithAll.map(cat => (
              <button
                key={cat.id}
                className={`${styles.catBtn} ${selectedCategories.includes(cat.id) ? styles.catBtnActive : ''}`}
                onClick={() => toggleCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
            {selectedCategories.length > 0 && (
              <button className={styles.clearBtn} onClick={clearFilters}>
                Clear
              </button>
            )}
          </div>
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.sortGroup}>
            {(['title', 'category', 'dateAdded'] as SortKey[]).map(key => (
              <button
                key={key}
                className={`${styles.sortBtn} ${sortKey === key ? styles.sortBtnActive : ''}`}
                onClick={() => toggleSort(key)}
              >
                {key === 'dateAdded' ? 'Date' : key.charAt(0).toUpperCase() + key.slice(1)}
                {sortKey === key && (
                  sortDir === 'asc' ? <SortAsc size={12} /> : <SortDesc size={12} />
                )}
              </button>
            ))}
          </div>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.resultsCount}>
        Showing <strong>{sorted.length}</strong> of {ITEMS.length} items
        {selectedCategories.length > 0 && (
          <span className={styles.activeFilters}>
            {' '}— filtered by: {selectedCategories.join(', ')}
          </span>
        )}
      </div>

      {/* Grid or List */}
      {viewMode === 'grid' ? (
        <div className={styles.grid}>
          {sorted.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {sorted.map(item => (
            <div key={item.id} className={styles.listRow}>
              <div className={styles.listMeta}>
                <span
                  className={styles.listCategory}
                  style={{ color: getCategoryColor(item.category) }}
                >
                  {item.category}
                </span>
                {item.dateAdded && (
                  <span className={styles.listDate}>{item.dateAdded}</span>
                )}
              </div>
              <div className={styles.listTitle}>{item.title}</div>
              <div className={styles.listDesc}>{item.description.slice(0, 120)}…</div>
              <div className={styles.listTags}>
                {item.tags.slice(0, 3).map(t => (
                  <span key={t} className={styles.listTag}>#{t}</span>
                ))}
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.listLink}
                >
                  ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <footer className={styles.footer}>
        <p className={styles.footerText}>Walito's Way — {ITEMS.length} picks, no filler.</p>
      </footer>
    </div>
  );
}

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    music: '#FF4D00',
    gear: '#00C8FF',
    clothing: '#C8A000',
    food: '#FF2D6B',
    apps: '#9B8FFF',
    books: '#00C878',
    places: '#FF8C00',
    film: '#E040FB',
    design: '#00BCD4',
  };
  return map[category] ?? '#FF4D00';
}
