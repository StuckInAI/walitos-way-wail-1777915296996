import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import styles from '@/components/layout/Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>
            <LucideIcons.List size={13} />
            The List
          </a>
          <a href="#" className={styles.navLink}>
            <LucideIcons.Info size={13} />
            About
          </a>
          <a href="#" className={styles.navLink}>
            <LucideIcons.Rss size={13} />
            Updates
          </a>
        </nav>

        <div className={styles.meta}>
          <span className={styles.pill}>
            <LucideIcons.Sparkles size={11} />
            Walito's Picks
          </span>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <LucideIcons.X size={18} /> : <LucideIcons.Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
            <LucideIcons.List size={15} />
            The List
          </a>
          <a href="#" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
            <LucideIcons.Info size={15} />
            About
          </a>
          <a href="#" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
            <LucideIcons.Rss size={15} />
            Updates
          </a>
        </div>
      )}
    </header>
  );
}
