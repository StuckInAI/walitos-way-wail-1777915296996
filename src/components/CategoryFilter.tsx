import type { Category } from '@/data/items';
import styles from './CategoryFilter.module.css';

interface Props {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`${styles.btn} ${active === cat.id ? styles.btnActive : ''}`}
          onClick={() => onChange(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
