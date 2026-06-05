import { useState } from 'react';
import { X, ExternalLink, Star } from 'lucide-react';
import type { Item } from '../data/items';

interface Props {
  item: Item;
}

export default function ItemCard({ item }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [imgErr, setImgErr] = useState<boolean>(false);

  const stars: boolean[] = Array.from({ length: 5 }, (_, i) => i < item.rating);

  return (
    <>
      {/* Card */}
      <article
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
        aria-label={`Open ${item.title}`}
        style={{
          background: '#0a0a0a',
          border: '2px solid #1a1a1a',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'translateY(-4px)';
          el.style.borderColor = '#ff4d00';
          el.style.boxShadow = '0 8px 32px rgba(255, 77, 0, 0.12)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'translateY(0)';
          el.style.borderColor = '#1a1a1a';
          el.style.boxShadow = 'none';
        }}
      >
        {/* Image */}
        <div style={{
          position: 'relative',
          height: 220,
          overflow: 'hidden',
          background: '#050505',
        }}>
          {!imgErr ? (
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              onError={() => setImgErr(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(30%) contrast(1.1)',
                transition: 'filter 0.3s ease',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1a1a1a',
              fontSize: 48,
              fontWeight: 900,
              fontFamily: "'Arial Black', Impact, sans-serif",
            }}>
              {item.title.charAt(0)}
            </div>
          )}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: 'linear-gradient(transparent, #0a0a0a)',
          }} />
          <span style={{
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '5px 12px',
            fontSize: 9,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            background: '#ff4d00',
            color: '#000',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {item.category}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: '18px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {stars.map((filled, i) => (
                <Star key={i} size={10} fill={filled ? '#ff4d00' : 'none'} color={filled ? '#ff4d00' : '#222'} />
              ))}
            </div>
            <span style={{ fontSize: 9, color: '#333', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.dateAdded}</span>
          </div>
          <h3 style={{
            fontSize: 16,
            fontWeight: 900,
            color: '#fff',
            marginBottom: 8,
            lineHeight: 1.2,
            fontFamily: "'Arial Black', Impact, sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
          }}>{item.title}</h3>
          <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6, marginBottom: 14 }}>{item.personalTake.slice(0, 100)}...</p>
          <span style={{
            fontSize: 10,
            fontWeight: 900,
            color: '#ff4d00',
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderBottom: '2px solid #ff4d00',
            paddingBottom: 2,
          }}>SEE WHY →</span>
        </div>
      </article>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0a0a0a',
              border: '2px solid #ff4d00',
              maxWidth: 560,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              type="button"
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 10,
                width: 36,
                height: 36,
                background: '#ff4d00',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                cursor: 'pointer',
                fontWeight: 900,
              }}
            >
              <X size={16} />
            </button>

            {/* Modal image */}
            <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
              {!imgErr ? (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%) contrast(1.1)' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#050505', color: '#1a1a1a', fontSize: 64, fontWeight: 900,
                  fontFamily: "'Arial Black', Impact, sans-serif",
                }}>{item.title.charAt(0)}</div>
              )}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
                background: 'linear-gradient(transparent, #0a0a0a)',
              }} />
            </div>

            {/* Modal body */}
            <div style={{ padding: '28px 32px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{
                  padding: '4px 12px', fontSize: 9, fontWeight: 900,
                  textTransform: 'uppercase', letterSpacing: '0.15em',
                  background: '#ff4d00', color: '#000',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{item.category}</span>
                <span style={{ fontSize: 10, color: '#444', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}>Added {item.dateAdded}</span>
              </div>

              <h2 style={{
                fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 12, lineHeight: 1.1,
                fontFamily: "'Arial Black', Impact, sans-serif",
                textTransform: 'uppercase', letterSpacing: '-0.04em',
              }}>
                {item.title}
              </h2>

              <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                {stars.map((filled, i) => (
                  <Star key={i} size={12} fill={filled ? '#ff4d00' : 'none'} color={filled ? '#ff4d00' : '#222'} />
                ))}
              </div>

              <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, marginBottom: 16 }}>
                {item.description}
              </p>

              <p style={{
                fontSize: 14, color: '#ccc', lineHeight: 1.7, marginBottom: 24,
                fontStyle: 'italic', borderLeft: '3px solid #ff4d00', paddingLeft: 20,
                background: 'rgba(255, 77, 0, 0.03)', padding: '16px 20px',
              }}>
                {item.personalTake}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                {item.tags.map((tag) => (
                  <span key={tag} style={{
                    padding: '4px 12px', fontSize: 9, fontWeight: 800,
                    background: '#111', color: '#666',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    border: '1px solid #1a1a1a',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{tag}</span>
                ))}
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 28px',
                    background: '#ff4d00',
                    color: '#000',
                    fontSize: 11,
                    fontWeight: 900,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontFamily: "'JetBrains Mono', monospace",
                    border: '2px solid #ff4d00',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <ExternalLink size={14} />
                  SEE IT FOR YOURSELF
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
