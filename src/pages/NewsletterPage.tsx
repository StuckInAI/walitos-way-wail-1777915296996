import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function NewsletterPage() {
  const [email, setEmail] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, color: '#f0f0ff' }}>Get The List</h1>
      <p style={{ fontSize: 15, color: '#8888AA', lineHeight: 1.7, marginBottom: 40 }}>
        New picks, monthly. No noise. Just the stuff that actually earned a spot in my life,
        delivered to your inbox before I post it anywhere else.
      </p>

      {!joined ? (
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          gap: 0,
          borderRadius: 999,
          overflow: 'hidden',
          border: '1px solid #1a1a28',
          background: '#0a0a10',
          maxWidth: 420,
          margin: '0 auto',
        }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              flex: 1,
              padding: '14px 20px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f0f0ff',
              fontSize: 14,
            }}
          />
          <button type="submit" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '14px 28px',
            background: '#FF4D00',
            color: '#fff',
            border: 'none',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
          }}>
            Join
            <ArrowRight size={14} />
          </button>
        </form>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: 24,
          borderRadius: 16,
          background: 'rgba(0,255,135,0.08)',
          border: '1px solid rgba(0,255,135,0.2)',
          color: '#00FF87',
          fontSize: 15,
          fontWeight: 600,
        }}>
          <CheckCircle size={18} />
          You're in. First issue drops next month.
        </div>
      )}

      <p style={{ fontSize: 11, color: '#44445A', marginTop: 16 }}>No spam. Unsubscribe anytime.</p>
    </div>
  );
}
