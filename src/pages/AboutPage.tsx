import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WALITO_PHOTO = 'https://i.imgur.com/8bQpDvN.jpeg';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Photo */}
      <div style={{
        width: 120, height: 120, borderRadius: '50%', overflow: 'hidden',
        border: '3px solid #FF4D00', margin: '0 auto 32px',
      }}>
        <img
          src={WALITO_PHOTO}
          alt="Wa'il aka Walito"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <h1 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 8, color: '#f0f0ff' }}>
        About Walito
      </h1>
      <p style={{ textAlign: 'center', color: '#FF4D00', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 40 }}>
        The person behind the picks
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#8888AA' }}>
          I'm Wa'il — most people call me Walito. I'm a founder, traveler, and obsessive researcher
          who can't stop hunting for the best version of everything.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#8888AA' }}>
          This site is my personal list — every item, place, and tool here is something I've bought
          with my own money, visited in person, or used until it broke. No sponsorships, no affiliate
          links, no paid placements. Ever.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#8888AA' }}>
          I built Walito's Way because friends kept asking me for recommendations. Rather than
          repeating myself, I made this — a living document of the things that actually earned
          a permanent spot in my life.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#8888AA' }}>
          If something's on this list, it means I'd recommend it to my best friend without
          hesitation. That's the bar.
        </p>
      </div>

      <div style={{
        marginTop: 48,
        padding: 32,
        borderRadius: 16,
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
            borderRadius: 999,
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
  );
}
