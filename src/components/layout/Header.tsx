import styles from '@/components/layout/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>W</span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Walito's Way</span>
            <span className={styles.brandTagline}>curated cool</span>
          </div>
        </div>
        <div className={styles.meta}>
          <span className={styles.pill}>✦ The List</span>
        </div>
      </div>
    </header>
  );
}
