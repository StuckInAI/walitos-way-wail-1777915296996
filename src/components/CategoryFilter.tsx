import {
  LayoutGrid,
  Sparkles,
  UtensilsCrossed,
  Cpu,
  Shirt,
  Plane,
  BookOpen,
  Home,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '@/data/items';
import styles from './CategoryFilter.module.css';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  LayoutGrid,
  Sparkles,
  UtensilsCrossed,
  Cpu,
  Shirt,
  Plane,
  BookOpen,
  Home,
};

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
          const Icon = CATEGORY_ICONS[cat.icon];
          const isActive = cat.id === active;
          return (
            <button
              key={cat.id}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => onChange(cat.id)}
              type="button"
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
