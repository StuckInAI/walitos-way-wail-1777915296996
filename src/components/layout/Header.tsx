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
import walitoPhoto from '../walito-photo';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const isActive = (path: string): boolean =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const navItems = [
    { to: '/', label: 'The List', icon: <LayoutGrid size={13} /> },
    { to: '/collection', label: 'Collection', icon: <Library size={13} /> },
    { to: '/about', label: 'About', icon: <User size={13} /> },
    { to: '/updates', label: 'Updates', icon: <Rss size={13} /> },
  ];

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.imageBleed}>
          {!imgError ? (
            <img
              src={walitoPhoto}
              alt="Walito"
              className={styles.bgImage}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.imagePlaceholder}>W</div>
          )}
          <div className={styles.gradientOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.artText}>
            <span className={styles.eyebrow}>CURATED BY WA'IL</span>
            <div className={styles.titleWrapper}>
              <h1 className={styles.titleLine1}>WALITO'S</h1>
              <h1 className={styles.titleLine2}>WAY</h1>
            </div>
            <p className={styles.tagline}>
              NO SPONSORSHIPS • NO FILLER • JUST THE REAL STUFF
            </p>
          </div>
        </div>
      </div>

      <header className={`${styles.header} ${isHome ? styles.headerHome : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            <div className={styles.logoBox}>W</div>
            <div className={styles.brandMeta}>
              <span className={styles.brandTitle}>WALITO'S WAY</span>
              <span className={styles.brandSub}>CURATED COOL</span>
            </div>
          </Link>

          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${styles.navLink} ${isActive(item.to) ? styles.navActive : ''}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link to="/newsletter" className={styles.ctaButton}>
              <Mail size={13} />
              <span>JOIN THE LIST</span>
              <ArrowRight size={13} />
            </Link>
            <Link to="/admin" className={styles.adminIcon} title="Admin">
              <Settings size={14} />
            </Link>
            <button
              className={styles.mobileToggle}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={styles.mobileNavLink}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <Link to="/newsletter" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              <Mail size={15} /> JOIN THE LIST
            </Link>
            <Link to="/admin" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              <Settings size={15} /> ADMIN
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
