import { useMemo } from 'react';
import { categories } from '@/data/items';
import type { Category, Item } from '@/data/items';
import { useItems } from '@/hooks/useItems';
import ItemCard from '@/components/ItemCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import styles from './CollectionPage.module.css';

type GroupedEntry = { label: string; items: Item[] };

export default function CollectionPage() {
  const { items, search, setSearch, activeCategory, setActiveCategory } = useItems();

  const grouped = useMemo(() => {
    return categories
      .filter((c: Category) => c.id !== 'all')
      .reduce<Record<string, GroupedEntry>>((acc, cat: Category) => {
        const catItems = items.filter((item: Item) => item.category === cat.id);
        if (catItems.length > 0) {
          acc[cat.id] = { label: cat.label, items: catItems };
        }
        return acc;
      }, {});
  }, [items]);

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {Object.entries(grouped).length === 0 ? (
        <div className={styles.empty}>
          <p>No items found.</p>
        </div>
      ) : (
        <div className={styles.sections}>
          {Object.entries(grouped).map(([catId, { label, items: catItems }]) => (
            <section key={catId} className={styles.section}>
              <h2 className={styles.sectionTitle}>{label}</h2>
              <div className={styles.grid}>
                {catItems.map((item: Item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
