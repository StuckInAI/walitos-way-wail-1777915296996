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
      padding: '64px 24px 64px',
      background: '#000',
      borderBottom: '3px solid #ff4d00',
    }}>
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 640,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
      }}>
        {/* Rotating word */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{
            fontSize: 24,
            fontWeight: 900,
            color: '#ff4d00',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.3s ease',
            minWidth: 140,
            fontFamily: "'Arial Black', Impact, sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
          }}>
            {ROTATING_WORDS[wordIndex]}
          </span>
          <span style={{ fontSize: 14, color: '#666', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            No sponsorships. No filler.
          </span>
        </div>

        {/* Voice paragraph */}
        <p style={{
          fontSize: 15,
          lineHeight: 1.8,
          color: '#666',
          maxWidth: 520,
          borderLeft: '3px solid #ff4d00',
          paddingLeft: 20,
          textAlign: 'left',
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
            maxWidth: 440,
            overflow: 'hidden',
            border: '2px solid #ff4d00',
          }}>
            <input
              type="email"
              placeholder="YOUR@EMAIL.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '14px 20px',
                background: '#0a0a0a',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            />
            <button type="submit" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 24px',
              background: '#ff4d00',
              color: '#000',
              border: 'none',
              fontSize: 11,
              fontWeight: 900,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace",
              transition: 'background 0.15s ease',
            }}>
              GET THE LIST
              <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: '#ff4d00',
            fontSize: 14,
            fontWeight: 900,
            padding: '14px 0',
            borderBottom: '3px solid #ff4d00',
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            <CheckCircle size={16} />
            You're in. First issue drops next month.
          </div>
        )}

        <p style={{
          fontSize: 9,
          color: '#333',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: "'JetBrains Mono', monospace",
        }}>New picks, monthly. No noise.</p>
      </div>
    </section>
  );
}
