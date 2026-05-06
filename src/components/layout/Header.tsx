import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import styles from '@/components/layout/Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div
            className={styles.avatarWrapper}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <img
              src="https://i.imgur.com/8bJbL9M.jpeg"
              alt="Wa'il — Walito"
              className={styles.avatar}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <span className={styles.brandMark} style={{ display: 'none' }}>W</span>
            {tooltipVisible && (
              <div className={styles.tooltip}>Hi, I'm Wa'il 👋</div>
            )}
          </div>
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
