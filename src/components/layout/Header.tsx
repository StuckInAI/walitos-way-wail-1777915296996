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

const WALITO_PHOTO = 'https://znfsypnfeqkwmfywvbnv.supabase.co/storage/v1/object/public/prompt-images/build-images/1780426765540-Screenshot-2026-06-02-at-2.58.52-PM.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const isActive = (path: string): boolean =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const navItems: Array<{ to: string; label: string; icon: React.ReactNode }> = [
    { to: '/', label: 'The List', icon: <LayoutGrid size={13} /> },
    { to: '/collection', label: 'Collection', icon: <Library size={13} /> },
    { to: '/about', label: 'About', icon: <User size={13} /> },
    { to: '/updates', label: 'Updates', icon: <Rss size={13} /> },
  ];

  return (
    <>
      {/* Full-bleed hero background photo */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 520,
        overflow: 'hidden',
        background: '#000',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={WALITO_PHOTO}
            alt="Walito"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: 'grayscale(25%) contrast(1.1)',
              display: 'block',
            }}
          />
        </div>
        {/* Fade overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,1) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Title overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}>
          <div style={{ padding: '0 32px 36px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            }}>Curated by Wa'il</span>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.88, margin: '4px 0 6px' }}>
              <span style={{
                fontSize: 'clamp(56px, 10vw, 100px)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.06em',
                textTransform: 'uppercase',
                fontFamily: "'Arial Black', Arial, Impact, sans-serif",
                lineHeight: 1,
              }}>WALITO'S</span>
              <span style={{
                fontSize: 'clamp(80px, 15vw, 160px)',
                fontWeight: 900,
                letterSpacing: '-0.07em',
                textTransform: 'uppercase',
                fontFamily: "'Arial Black', Arial, Impact, sans-serif",
                lineHeight: 0.9,
                WebkitTextStroke: '2px #fff',
                color: 'transparent',
                textShadow: '3px 3px 0 rgba(255,255,255,0.08), 6px 6px 0 rgba(255,255,255,0.04)',
              }}>WAY</span>
            </div>
            <span style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            }}>No sponsorships · No filler · Just the real stuff</span>
          </div>
        </div>
      </div>

      {/* Sticky nav */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #111',
        borderTop: isHome ? '1px solid #111' : 'none',
        height: 58,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}>
          {/* Brand */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{
              width: 34, height: 34, background: '#fff', color: '#000',
              fontWeight: 900, fontSize: 16, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontFamily: "'Arial Black', Arial, sans-serif",
              borderRadius: '50%', letterSpacing: '-0.04em',
            }}>W</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{
                fontSize: 14, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em',
                lineHeight: 1, fontFamily: "'Arial Black', Arial, Impact, sans-serif",
                textTransform: 'uppercase',
              }}>Walito's Way</span>
              <span style={{
                fontSize: 9, color: '#333', letterSpacing: '0.14em',
                textTransform: 'uppercase', lineHeight: 1,
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              }}>curated cool</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  fontSize: 12,
                  fontWeight: isActive(item.to) ? 700 : 700,
                  color: isActive(item.to) ? '#fff' : '#444',
                  background: isActive(item.to) ? '#111' : 'transparent',
                  border: isActive(item.to) ? '1px solid #333' : '1px solid transparent',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link
              to="/newsletter"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                background: '#fff',
                color: '#000',
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'opacity 0.15s ease',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              }}
              className="desktop-cta"
            >
              <Mail size={12} />
              Get The List
              <ArrowRight size={12} />
            </Link>
            <Link
              to="/admin"
              title="Admin"
              style={{
                width: 32, height: 32, display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: '#111', border: '1px solid #1a1a1a',
                color: '#444', textDecoration: 'none', transition: 'all 0.15s',
              }}
              className="desktop-admin"
            >
              <Settings size={14} />
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              type="button"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#555',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
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
            display: 'flex',
            flexDirection: 'column',
            borderTop: '1px solid #111',
            background: '#000',
          }}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 24px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: isActive(item.to) ? '#fff' : '#555',
                  borderBottom: '1px solid #0a0a0a',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  transition: 'color 0.15s ease, background 0.15s ease',
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
                gap: 12,
                padding: '16px 24px',
                fontSize: 12,
                fontWeight: 700,
                color: '#555',
                borderBottom: '1px solid #0a0a0a',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              }}
            >
              <Mail size={15} />
              Get The List
            </Link>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 24px',
                fontSize: 12,
                fontWeight: 700,
                color: '#555',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              }}
            >
              <Settings size={15} />
              Admin
            </Link>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .desktop-admin { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
