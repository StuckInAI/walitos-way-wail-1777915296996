import * as LucideIcons from 'lucide-react';
import { Category } from '@/types';
import styles from '@/components/CategoryFilter.module.css';
import clsx from 'clsx';

type CategoryFilterProps = {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
};

function CategoryIcon({ name, size = 15 }: { name: string; size?: number }) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}

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
            <span className={styles.iconWrap}>
              <CategoryIcon name={cat.icon} size={14} />
            </span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
