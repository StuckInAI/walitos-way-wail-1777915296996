import * as LucideIcons from 'lucide-react';
import type { Category } from '@/data/items';
import styles from './CategoryFilter.module.css';

type Props = {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
};

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.scroll}>
        {categories.map((cat) => {
          const Icon = (LucideIcons as Record<string, React.FC<{ size?: number }>>)[cat.icon];
          const isActive = cat.id === active;
          return (
            <button
              key={cat.id}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => onChange(cat.id)}
            >
              {Icon && <Icon size={13} />}
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
