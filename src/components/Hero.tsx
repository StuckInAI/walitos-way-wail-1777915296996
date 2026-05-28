import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const WALITO_PHOTO = 'https://i.imgur.com/8bQpDvN.jpeg';
const ROTATING_WORDS: string[] = ['Founder.', 'Traveler.', 'Researcher.', 'Curator.', 'Obsessive.'];

export default function Hero() {
  const [email, setEmail] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: 520,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px 60px',
    }}>
      {/* Background photo */}
      {!imgError && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}>
          <img
            src={WALITO_PHOTO}
            alt=""
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              opacity: 0.18,
              filter: 'grayscale(50%)',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.95) 80%, rgba(5,5,8,1) 100%)',
          }} />
        </div>
      )}

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 640,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}>
        {/* Eyebrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: 3,
          color: '#FF4D00',
          fontWeight: 600,
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#FF4D00',
          }} />
          Personal curation by Wa'il
        </div>

        {/* Rotating word */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#FF4D00',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.3s ease',
            minWidth: 120,
          }}>
            {ROTATING_WORDS[wordIndex]}
          </span>
          <span style={{ fontSize: 14, color: '#8888AA' }}>
            No sponsorships. No filler. Just the real stuff.
          </span>
        </div>

        {/* Voice paragraph */}
        <p style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: '#8888AA',
          maxWidth: 520,
        }}>
          Everything here I've paid for myself, visited in person, or used until it broke.
          No affiliate links. Just the stuff that actually earned a permanent spot in my life.
        </p>

        {/* Email form */}
        {!joined ? (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: 0,
            width: '100%',
            maxWidth: 420,
            borderRadius: 999,
            overflow: 'hidden',
            border: '1px solid #1a1a28',
            background: '#0a0a10',
          }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '12px 20px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f0f0ff',
                fontSize: 13,
              }}
            />
            <button type="submit" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '12px 24px',
              background: '#FF4D00',
              color: '#fff',
              border: 'none',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              Get The List
              <ArrowRight size={13} />
            </button>
          </form>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#00FF87',
            fontSize: 13,
            fontWeight: 600,
          }}>
            <CheckCircle size={15} />
            You're in. First issue drops next month.
          </div>
        )}

        <p style={{ fontSize: 11, color: '#44445A' }}>New picks, monthly. No noise.</p>
      </div>
    </section>
  );
}
