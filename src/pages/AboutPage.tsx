import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import styles from '@/pages/AboutPage.module.css';
import walitoPhoto from '@/assets/walito.jpg';

export default function AboutPage() {
  const [imgError, setImgError] = useState(false);

  const principles = [
    {
      icon: 'ShieldCheck',
      title: 'No Sponsorships',
      body: 'Nothing here is paid for. Nobody has given me free stuff to feature. Every item earned its place by actually being good.',
    },
    {
      icon: 'CreditCard',
      title: 'Paid With My Own Money',
      body: "I've bought everything on this list. Skin in the game. If I recommend it, I spent real money on it.",
    },
    {
      icon: 'Clock',
      title: 'Time-Tested',
      body: "Nothing goes on the list until it's proven itself over time. No first impressions. Only things I've used repeatedly.",
    },
    {
      icon: 'Zap',
      title: 'Ruthlessly Curated',
      body: 'The list stays short on purpose. If something stops earning its place, it gets cut. Quality over quantity, always.',
    },
  ];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <LucideIcons.User size={13} />
            About Walito
          </div>
          <h1 className={styles.heroTitle}>
            I only put things here I actually{' '}
            <span className={styles.accent}>love.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            &ldquo;The only things worth recommending are the ones you\'d defend in an argument.&rdquo;
          </p>
          <p className={styles.heroBio}>
            I&apos;m Wa&apos;il &mdash; a founder, traveler, and obsessive researcher based between New York and
            wherever the interesting stuff is happening. I built this list because I kept getting
            asked the same questions: what do you use, what do you listen to, where do you stay.
            Now I have one place to point people.
          </p>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.avatarBlock}>
            <div className={styles.photoFrame}>
              {!imgError ? (
                <img
                  src={walitoPhoto}
                  alt="Wa'il — Walito"
                  className={styles.photo}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={styles.avatarFallback}>
                  <span className={styles.avatarW}>W</span>
                </div>
              )}
              <div className={styles.photoAccent} />
            </div>
            <div className={styles.avatarLabel}>
              <span className={styles.avatarName}>Wa&apos;il</span>
              <span className={styles.avatarHandle}>@walito</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className={styles.statsRow}>
        {[
          { number: '70+', label: 'items curated' },
          { number: '10', label: 'categories' },
          { number: '4+', label: 'years of testing' },
          { number: '0', label: 'paid placements' },
        ].map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statNumber}>{s.number}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Principles */}
      <section className={styles.principles}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>The rules I follow</h2>
          <p className={styles.sectionSub}>How something earns a spot on this list.</p>
        </div>
        <div className={styles.principlesGrid}>
          {principles.map((p) => {
            const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[p.icon];
            return (
              <div key={p.title} className={styles.principleCard}>
                <div className={styles.principleIcon}>
                  {Icon && <Icon size={18} />}
                </div>
                <div>
                  <div className={styles.principleTitle}>{p.title}</div>
                  <div className={styles.principleBody}>{p.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <LucideIcons.Mail size={32} className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Get the list in your inbox</h2>
          <p className={styles.ctaSub}>
            New additions, occasional deep-dives, and the thinking behind the curation.
            No spam. Unsubscribe any time.
          </p>
          <Link to="/newsletter" className={styles.ctaBtn}>
            <LucideIcons.ArrowRight size={15} />
            Subscribe
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className={styles.footer}>
        <p className={styles.footerText}>Walito&apos;s Way &mdash; curated cool since 2021</p>
      </div>
    </div>
  );
}
