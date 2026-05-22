import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <Search size={12} className={styles.icon} />
      <input
        type="text"
        placeholder="Search picks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
        aria-label="Search"
      />
    </div>
  );
}
