import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './Hero.module.css';

const ROTATING_WORDS = ['Founder.', 'Traveler.', 'Researcher.', 'Curator.', 'Obsessive.'];

// Walito's photo as a base64 data URI — stored entirely on the frontend
// To swap: convert your JPG at https://www.base64-image.de/ and replace below
const WALITO_PHOTO_URL = '/walito.jpg';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marquee}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={styles.marqueeItem}>
              WALITO'S WAY &nbsp;·&nbsp; CURATED PICKS &nbsp;·&nbsp; NO AFFILIATE LINKS &nbsp;·&nbsp; REAL EXPERIENCE ONLY &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.avatarBlock}>
          {!imgError ? (
            <img
              src={WALITO_PHOTO_URL}
              alt="Wa'il aka Walito"
              className={styles.avatarImg}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.avatarFallback}>W</div>
          )}
          <div className={styles.avatarMeta}>
            <span className={styles.avatarName}>Wa'il</span>
            <span className={styles.avatarAlias}>aka Walito</span>
          </div>
        </div>

        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          Personal curation by Wa'il
        </div>

        <h1 className={styles.headline}>
          <span className={styles.headlineStatic}>Walito's</span>
          <span className={styles.headlineAccent}>Way</span>
        </h1>

        <div className={styles.rotatingRow}>
          <span className={`${styles.rotatingWord} ${visible ? styles.rotatingWordVisible : ''}`}>
            {ROTATING_WORDS[wordIndex]}
          </span>
          <span className={styles.rotatingRest}>No sponsorships. No filler. Just the real stuff.</span>
        </div>

        <p className={styles.voice}>
          Everything here I've paid for myself, visited in person, or used until it broke.
          No sponsorships. No affiliate links.
          Just the stuff that actually earned a permanent spot in my life.
        </p>

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
              <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          <div className={styles.emailSuccess}>
            <CheckCircle size={16} />
            You're in. First issue drops next month.
          </div>
        )}
        <p className={styles.emailSub}>New picks, monthly. No noise.</p>
      </div>
    </section>
  );
}
