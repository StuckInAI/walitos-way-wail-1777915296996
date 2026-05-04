import { Search, X } from 'lucide-react';
import styles from '@/components/SearchBar.module.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <Search className={styles.icon} size={16} />
      <input
        className={styles.input}
        type="text"
        placeholder="Search music, gear, food…"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
      {value && (
        <button
          className={styles.clear}
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
