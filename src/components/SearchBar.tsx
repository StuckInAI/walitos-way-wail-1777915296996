import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <Search size={14} className={styles.icon} />
      <input
        type="text"
        placeholder="Search picks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} aria-label="Clear search">
          <X size={13} />
        </button>
      )}
    </div>
  );
}
