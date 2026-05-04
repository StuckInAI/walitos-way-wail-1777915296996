import { Category } from '@/types';
import styles from '@/components/CategoryFilter.module.css';
import clsx from 'clsx';

type CategoryFilterProps = {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
};

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scroll}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={clsx(styles.btn, active === cat.id && styles.btnActive)}
            onClick={() => onChange(cat.id)}
          >
            <span className={styles.emoji}>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
