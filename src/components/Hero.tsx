import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import styles from './Hero.module.css';
import walitoPhoto from './walito-photo';

type HeroProps = {
  totalCount: number;
};

export default function Hero({ totalCount }: HeroProps) {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
    }
  };

  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span>Updated regularly</span>
          <span className={styles.eyebrowDivider}>—</span>
          <LucideIcons.MapPin size={11} />
          <span>Walito's picks</span>
        </div>

        <h1 className={styles.title}>
          The stuff I actually
          <span className={styles.accent}> love.</span>
        </h1>

        <p className={styles.subtitle}>
          Founder. Traveler. Obsessive researcher. Everything here I've paid for myself,
          visited in person, or used until it broke. No sponsorships. No affiliate links.
          Just the stuff that actually earned a permanent spot in my life.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{totalCount}+</span>
            <span className={styles.statLabel}>items</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>10</span>
            <span className={styles.statLabel}>categories</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>real picks</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>0</span>
            <span className={styles.statLabel}>ads</span>
          </div>
        </div>

        <div className={styles.newsletterBlock}>
          {!joined ? (
            <form className={styles.newsletterForm} onSubmit={handleJoin}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.joinBtn}>
                Join The List
                <LucideIcons.ArrowRight size={13} />
              </button>
            </form>
          ) : (
            <div className={styles.joinedMsg}>
              <LucideIcons.CheckCircle size={16} />
              You're in. New picks, monthly.
            </div>
          )}
          <p className={styles.newsletterSub}>New picks, monthly. No noise.</p>
        </div>

        <div className={styles.categories}>
          {[
            { icon: 'Music2', label: 'Music' },
            { icon: 'Zap', label: 'Gear' },
            { icon: 'Shirt', label: 'Clothing' },
            { icon: 'UtensilsCrossed', label: 'Food' },
            { icon: 'AppWindow', label: 'Apps' },
            { icon: 'BookOpen', label: 'Books' },
            { icon: 'MapPin', label: 'Places' },
            { icon: 'Film', label: 'Film' },
            { icon: 'Pen', label: 'Design' },
            { icon: 'Cpu', label: 'Tech' },
          ].map(({ icon, label }) => {
            const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[icon];
            return (
              <span key={label} className={styles.categoryChip}>
                {Icon && <Icon size={11} />}
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <div className={styles.heroRight}>
        <div className={styles.photoWrap}>
          <img
            src={walitoPhoto}
            alt="Wa'il — Walito"
            className={styles.heroPhoto}
          />
          <div className={styles.photoLabel}>
            <span className={styles.photoLabelName}>Wa'il</span>
            <span className={styles.photoLabelSub}>Walito · Curator</span>
          </div>
          <div className={styles.photoBorder} />
        </div>
      </div>
    </div>
  );
}
