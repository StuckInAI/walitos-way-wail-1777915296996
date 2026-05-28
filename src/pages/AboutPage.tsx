import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WALITO_PHOTO = 'https://znfsypnfeqkwmfywvbnv.supabase.co/storage/v1/object/public/prompt-images/build-images/1779997357644-image.png';

export default function AboutPage() {
  return (
    <div style={{ background: '#050508', minHeight: '100vh' }}>
      {/* Full-bleed hero with photo */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 480,
        overflow: 'hidden',
        background: '#000',
      }}>
        <img
          src={WALITO_PHOTO}
          alt="Wa'il aka Walito"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            filter: 'grayscale(20%) contrast(1.1)',
            display: 'block',
            opacity: 0.85,
          }}
        />
        {/* Gradient fade to bottom */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,5,8,0.1) 0%, rgba(5,5,8,0.4) 50%, rgba(5,5,8,0.97) 88%, rgba(5,5,8,1) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Name overlay at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 40,
          right: 40,
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 8,
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          }}>The person behind the picks</p>
          <h1 style={{
            fontSize: 'clamp(52px, 10vw, 100px)',
            fontWeight: 900,
            fontFamily: "'Arial Black', Arial, Impact, sans-serif",
            letterSpacing: '-0.05em',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            color: '#fff',
            margin: 0,
          }}>Walito</h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 24px 96px' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#333',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: '1px solid #111',
          }}>Who I am</p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#888', marginBottom: 16 }}>
            I'm Wa'il — most people call me Walito. I'm a founder, traveler, and obsessive researcher
            who can't stop hunting for the best version of everything.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#888', marginBottom: 16 }}>
            This site is my personal list — every item, place, and tool here is something I've bought
            with my own money, visited in person, or used until it broke. No sponsorships, no affiliate
            links, no paid placements. Ever.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#888' }}>
            I built Walito's Way because friends kept asking me for recommendations. Rather than
            repeating myself, I made this — a living document of the things that actually earned
            a permanent spot in my life.
          </p>
        </div>

        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#333',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: '1px solid #111',
          }}>The rules</p>
          {[
            "If it's on the list, I've personally used or experienced it.",
            'No affiliate links. No sponsored content. No exceptions.',
            "If something stops being great, it gets removed.",
            "If a friend asks, I'd recommend it without hesitation.",
          ].map((rule, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 20,
              padding: '16px 0',
              borderBottom: '1px solid #0d0d0d',
              fontSize: 14,
              color: '#666',
              lineHeight: 1.6,
            }}>
              <span style={{
                fontSize: 10,
                fontWeight: 900,
                color: '#FF4D00',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                letterSpacing: '0.1em',
                flexShrink: 0,
                paddingTop: 2,
                minWidth: 24,
              }}>0{i + 1}</span>
              {rule}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          padding: 32,
          background: '#0c0c14',
          border: '1px solid #1a1a28',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0ff', marginBottom: 8 }}>Want the monthly picks?</h3>
          <p style={{ fontSize: 13, color: '#8888AA', marginBottom: 20 }}>New finds, monthly. Zero noise.</p>
          <Link
            to="/newsletter"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 28px',
              background: '#FF4D00',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Get The List
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
