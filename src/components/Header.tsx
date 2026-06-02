import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  Library,
  User,
  Rss,
  Mail,
  ArrowRight,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import styles from './Header.module.css';

const WALITO_PHOTO = 'https://znfsypnfeqkwmfywvbnv.supabase.co/storage/v1/object/public/prompt-images/build-images/1780426765540-Screenshot-2026-06-02-at-2.58.52-PM.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const isActive = (path: string): boolean =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      {/* Hero header with full-bleed background photo */}
      <div className={styles.heroHeader}>
        <div className={styles.heroImageWrap}>
          <img
            src={WALITO_PHOTO}
            alt="Walito"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroFade} />
        <div className={styles.heroOverlay}>
          <div className={styles.heroOverlayInner}>
            <span className={styles.heroEyebrow}>Curated by Wa'il</span>
            <div className={styles.heroTitle}>
              <span className={styles.heroTitleLine1}>WALITO'S</span>
              <span className={styles.heroTitleLine2}>WAY</span>
            </div>
            <span className={styles.heroSub}>No sponsorships · No filler · Just the real stuff</span>
          </div>
        </div>
      </div>

      {/* Sticky nav bar */}
      <header className={`${styles.header} ${isHome ? styles.headerHome : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandMark}>W</span>
            <div className={styles.brandText}>
              <span className={styles.brandName}>Walito's Way</span>
              <span className={styles.brandTagline}>curated cool</span>
            </div>
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
            >
              <LayoutGrid size={13} />
              The List
            </Link>
            <Link
              to="/collection"
              className={`${styles.navLink} ${isActive('/collection') ? styles.navLinkActive : ''}`}
            >
              <Library size={13} />
              Collection
            </Link>
            <Link
              to="/about"
              className={`${styles.navLink} ${isActive('/about') ? styles.navLinkActive : ''}`}
            >
              <User size={13} />
              About
            </Link>
            <Link
              to="/updates"
              className={`${styles.navLink} ${isActive('/updates') ? styles.navLinkActive : ''}`}
            >
              <Rss size={13} />
              Updates
            </Link>
          </nav>

          <div className={styles.meta}>
            <Link to="/newsletter" className={styles.ctaBtn}>
              <Mail size={13} />
              Get The List
              <ArrowRight size={13} />
            </Link>
            <Link
              to="/admin"
              className={styles.adminBtn}
              title="Admin"
            >
              <Settings size={14} />
            </Link>
            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              type="button"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            <Link to="/" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              <LayoutGrid size={15} />
              The List
            </Link>
            <Link to="/collection" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              <Library size={15} />
              Collection
            </Link>
            <Link to="/about" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              <User size={15} />
              About
            </Link>
            <Link to="/updates" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              <Rss size={15} />
              Updates
            </Link>
            <Link to="/newsletter" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              <Mail size={15} />
              Get The List
            </Link>
            <Link to="/admin" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              <Settings size={15} />
              Admin
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
