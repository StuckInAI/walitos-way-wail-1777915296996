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
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
