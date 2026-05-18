import { categories } from '@/data/items';
import { useItems } from '@/hooks/useItems';
import ItemCard from '@/components/ItemCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Hero from '@/components/Hero';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { items, search, setSearch, activeCategory, setActiveCategory } = useItems();

  return (
    <div className={styles.page}>
      <Hero />

      <div className={styles.toolbar}>
        <div className={styles.toolbarInner}>
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      <div className={styles.gridWrap}>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptySymbol}>—</span>
            <p>Nothing found.</p>
            <p className={styles.emptyHint}>Try a different search or category.</p>
          </div>
        ) : (
          <>
            <p className={styles.count}>
              {items.length} {items.length === 1 ? 'pick' : 'picks'}
              {activeCategory !== 'all' && <span className={styles.countCat}> in {activeCategory}</span>}
            </p>
            <div className={styles.grid}>
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerMark}>W</span>
        <p className={styles.footerText}>Walito's Way</p>
        <p className={styles.footerSub}>Everything here I've paid for myself.</p>
      </footer>
    </div>
  );
}
