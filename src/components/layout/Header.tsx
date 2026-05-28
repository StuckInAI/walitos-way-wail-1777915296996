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

const WALITO_PHOTO = 'https://i.imgur.com/8bQpDvN.jpeg';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const location = useLocation();

  const isActive = (path: string): boolean =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const navItems: Array<{ to: string; label: string; icon: React.ReactNode }> = [
    { to: '/', label: 'The List', icon: <LayoutGrid size={13} /> },
    { to: '/collection', label: 'Collection', icon: <Library size={13} /> },
    { to: '/about', label: 'About', icon: <User size={13} /> },
    { to: '/updates', label: 'Updates', icon: <Rss size={13} /> },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(5,5,8,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1a1a28',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #FF4D00',
            flexShrink: 0,
          }}>
            {!imgError ? (
              <img
                src={WALITO_PHOTO}
                alt="Walito"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: '#FF4D00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: 16,
              }}>W</div>
            )}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#f0f0ff', letterSpacing: '-0.5px', lineHeight: 1.2 }}>Walito's Way</div>
            <div style={{ fontSize: 10, color: '#8888AA', textTransform: 'uppercase', letterSpacing: 2 }}>curated cool</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: isActive(item.to) ? 700 : 500,
                color: isActive(item.to) ? '#fff' : '#8888AA',
                background: isActive(item.to) ? 'rgba(255,77,0,0.15)' : 'transparent',
                transition: 'all 0.15s ease',
                textDecoration: 'none',
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link
            to="/newsletter"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 16px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              background: '#FF4D00',
              color: '#fff',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
          >
            <Mail size={12} />
            Get The List
            <ArrowRight size={12} />
          </Link>
          <Link
            to="/admin"
            title="Admin"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#44445A',
              transition: 'color 0.15s',
            }}
          >
            <Settings size={14} />
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            type="button"
            style={{
              width: 32,
              height: 32,
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f0f0ff',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #1a1a28',
          background: 'rgba(5,5,8,0.98)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: isActive(item.to) ? 700 : 500,
                color: isActive(item.to) ? '#fff' : '#8888AA',
                background: isActive(item.to) ? 'rgba(255,77,0,0.1)' : 'transparent',
                textDecoration: 'none',
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <Link
            to="/newsletter"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: '#FF4D00',
              textDecoration: 'none',
            }}
          >
            <Mail size={15} />
            Get The List
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
