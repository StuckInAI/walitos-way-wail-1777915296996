import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Collection', path: '/collection' },
  { label: 'Updates', path: '/updates' },
  { label: 'About', path: '/about' },
];

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>W</span>
          <span className={styles.logoText}>Walito's Way</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${pathname === link.path ? styles.navLinkActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              {pathname === link.path && <span className={styles.activeDot} />}
            </Link>
          ))}
          <Link
            to="/newsletter"
            className={styles.ctaBtn}
            onClick={() => setMenuOpen(false)}
          >
            Get The List <ArrowRight size={12} />
          </Link>
        </nav>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
