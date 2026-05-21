import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './Hero.module.css';

const ROTATING_WORDS = ['Founder.', 'Traveler.', 'Researcher.', 'Curator.', 'Obsessive.'];

export default function Hero() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <section className={styles.hero}>
      {/* Marquee */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marquee}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={styles.marqueeItem}>
              WALITO'S WAY &nbsp;/&nbsp; CURATED PICKS &nbsp;/&nbsp; NO AFFILIATE LINKS &nbsp;/&nbsp; REAL EXPERIENCE ONLY &nbsp;/&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        {/* Eyebrow */}
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          Personal curation by Wa'il
        </div>

        {/* Rotating line */}
        <div className={styles.rotatingRow}>
          <span className={`${styles.rotatingWord} ${visible ? styles.rotatingWordVisible : ''}`}>
            {ROTATING_WORDS[wordIndex]}
          </span>
          <span className={styles.rotatingRest}>No sponsorships. No filler. Just the real stuff.</span>
        </div>

        {/* Voice */}
        <p className={styles.voice}>
          Everything here I've paid for myself, visited in person, or used until it broke.
          No sponsorships. No affiliate links.
          Just the stuff that actually earned a permanent spot in my life.
        </p>

        {/* Email form */}
        {!joined ? (
          <form className={styles.emailForm} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
              required
            />
            <button type="submit" className={styles.emailBtn}>
              Get The List
              <ArrowRight size={13} />
            </button>
          </form>
        ) : (
          <div className={styles.emailSuccess}>
            <CheckCircle size={15} />
            You're in. First issue drops next month.
          </div>
        )}
        <p className={styles.emailSub}>New picks, monthly. No noise.</p>
      </div>
    </section>
  );
}
