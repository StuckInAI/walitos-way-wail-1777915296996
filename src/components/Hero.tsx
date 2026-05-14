import { useState } from 'react';
import { ArrowRight, Mail, CheckCircle } from 'lucide-react';
import styles from './Hero.module.css';

const WALITO_PHOTO = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80';

export default function Hero({ totalCount }: { totalCount: number }) {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          Personal curation by Wa'il
        </div>

        <h1 className={styles.headline}>
          Walito's Way
        </h1>

        <p className={styles.voice}>
          Founder. Traveler. Obsessive researcher. Everything here I've paid for myself,
          visited in person, or used until it broke. No sponsorships. No affiliate links.
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
