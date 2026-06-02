import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const ROTATING_WORDS: string[] = ['Founder.', 'Traveler.', 'Researcher.', 'Curator.', 'Obsessive.'];

export default function Hero() {
  const [email, setEmail] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px 60px',
      background: '#000',
    }}>
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
            overflow: 'hidden',
            border: '1px solid #1a1a1a',
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
                background: '#050505',
                border: 'none',
                outline: 'none',
                color: '#f0f0ff',
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              }}
            />
            <button type="submit" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '12px 20px',
              background: '#fff',
              color: '#000',
              border: 'none',
              fontSize: 10,
              fontWeight: 900,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
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
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            padding: '12px 0',
            borderBottom: '1px solid #fff',
          }}>
            <CheckCircle size={15} />
            You're in. First issue drops next month.
          </div>
        )}

        <p style={{ fontSize: 9, color: '#1e1e1e', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>New picks, monthly. No noise.</p>
      </div>
    </section>
  );
}
