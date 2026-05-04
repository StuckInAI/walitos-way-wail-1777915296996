import styles from '@/components/Hero.module.css';

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.eyebrow}>
        <span className={styles.dot} />
        <span>Updated regularly</span>
      </div>
      <h1 className={styles.title}>
        The stuff I actually
        <span className={styles.accent}> love.</span>
      </h1>
      <p className={styles.subtitle}>
        No ads. No affiliate games. No SEO fluff. Just Walito's honest, curated picks across
        music, gear, clothing, food, apps, and everything else that makes life better.
      </p>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>30+</span>
          <span className={styles.statLabel}>items</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNumber}>8</span>
          <span className={styles.statLabel}>categories</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.statNumber}>100%</span>
          <span className={styles.statLabel}>real picks</span>
        </div>
      </div>
    </div>
  );
}
