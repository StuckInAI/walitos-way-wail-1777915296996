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
          background: '#0c0c14',
          border: '1px solid #1a1a28',
          borderRadius: 12,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLElement).style.borderColor = '#2a2a3e';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.borderColor = '#1a1a28';
        }}
      >
        {/* Image */}
        <div style={{
          position: 'relative',
          height: 200,
          overflow: 'hidden',
          background: '#0a0a10',
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
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#44445A',
              fontSize: 32,
              fontWeight: 800,
            }}>
              {item.title.charAt(0)}
            </div>
          )}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'linear-gradient(transparent, #0c0c14)',
          }} />
          <span style={{
            position: 'absolute',
            top: 10,
            left: 10,
            padding: '3px 10px',
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            background: 'rgba(255,77,0,0.15)',
            color: '#FF4D00',
          }}>
            {item.category}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 18px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {stars.map((filled, i) => (
                <Star key={i} size={9} fill={filled ? '#FF4D00' : 'none'} color={filled ? '#FF4D00' : '#44445A'} />
              ))}
            </div>
            <span style={{ fontSize: 10, color: '#44445A' }}>{item.dateAdded}</span>
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f0f0ff', marginBottom: 6, lineHeight: 1.3 }}>{item.title}</h3>
          <p style={{ fontSize: 12, color: '#8888AA', lineHeight: 1.5, marginBottom: 12 }}>{item.personalTake.slice(0, 100)}...</p>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#FF4D00' }}>➜ See why I picked this</span>
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
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0c0c14',
              border: '1px solid #1a1a28',
              borderRadius: 16,
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
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'rgba(5,5,8,0.8)',
                border: '1px solid #1a1a28',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8888AA',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            {/* Modal image */}
            <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
              {!imgErr ? (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#0a0a10', color: '#44445A', fontSize: 48, fontWeight: 800,
                }}>{item.title.charAt(0)}</div>
              )}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
                background: 'linear-gradient(transparent, #0c0c14)',
              }} />
            </div>

            {/* Modal body */}
            <div style={{ padding: '24px 28px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{
                  padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: 1,
                  background: 'rgba(255,77,0,0.15)', color: '#FF4D00',
                }}>{item.category}</span>
                <span style={{ fontSize: 11, color: '#44445A' }}>Added {item.dateAdded}</span>
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f0f0ff', marginBottom: 10, lineHeight: 1.2 }}>
                {item.title}
              </h2>

              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {stars.map((filled, i) => (
                  <Star key={i} size={11} fill={filled ? '#FF4D00' : 'none'} color={filled ? '#FF4D00' : '#44445A'} />
                ))}
              </div>

              <p style={{ fontSize: 14, color: '#8888AA', lineHeight: 1.7, marginBottom: 12 }}>
                {item.description}
              </p>

              <p style={{ fontSize: 13, color: '#f0f0ff', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic', borderLeft: '2px solid #FF4D00', paddingLeft: 16 }}>
                {item.personalTake}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {item.tags.map((tag) => (
                  <span key={tag} style={{
                    padding: '4px 12px', borderRadius: 999, fontSize: 10, fontWeight: 600,
                    background: '#12121e', color: '#6666AA', textTransform: 'uppercase', letterSpacing: 0.5,
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
                    gap: 8,
                    padding: '10px 24px',
                    borderRadius: 999,
                    background: '#FF4D00',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <ExternalLink size={13} />
                  See it for yourself
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
