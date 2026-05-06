import { User, MapPin, Rss, ArrowUpRight, Heart, Zap, Globe } from 'lucide-react';
import styles from '@/pages/AboutPage.module.css';

const PRINCIPLES = [
  {
    icon: Heart,
    title: 'Paid for myself',
    body: 'Every item on this list I bought with my own money. No gifted products, no sponsored placements, no brand deals. If I paid for it and kept using it, it earns a spot.',
  },
  {
    icon: MapPin,
    title: 'Visited in person',
    body: 'Every place I recommend I have been to — multiple times in most cases. No "best of" roundups sourced from other lists. If I haven\'t eaten there, slept there, or walked around there, it\'s not here.',
  },
  {
    icon: Zap,
    title: 'Used until it broke',
    body: 'Gear, apps, clothing — I only recommend things I\'ve actually integrated into my life. Not things I tried once. Things I reach for every day, pack every trip, or open every morning.',
  },
  {
    icon: Globe,
    title: 'No affiliate links',
    body: 'There are zero affiliate or referral links on this site. I make nothing if you click through. This is purely about sharing what works — the same way you\'d text a friend.',
  },
];

const STATS = [
  { number: '10+', label: 'Years of obsessive research' },
  { number: '40+', label: 'Countries visited' },
  { number: '0', label: 'Sponsored posts, ever' },
  { number: '100%', label: 'Personal money spent' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <User size={12} />
            <span>The person behind the list</span>
          </div>
          <h1 className={styles.heroTitle}>
            Founder. Traveler.
            <br />
            <span className={styles.accent}>Obsessive researcher.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Everything here I've paid for myself, visited in person, or used until it broke.
            No sponsorships. No affiliate links. Just the stuff that actually earned a permanent
            spot in my life.
          </p>
          <p className={styles.heroBio}>
            I'm Wa'il — people call me Walito. I've spent years moving between cities, industries,
            and obsessions, and the one constant is that I can't stop researching the best version
            of everything. The best headphones for a 14-hour flight. The best city for food per
            dollar. The best jacket that works in Tokyo rain and Oaxacan sun. This list is the
            result of that research — tested, revised, and kept alive.
          </p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.avatarBlock}>
            <div className={styles.avatarPlaceholder}>
              <span className={styles.avatarW}>W</span>
            </div>
            <div className={styles.avatarLabel}>
              <span className={styles.avatarName}>Wa'il</span>
              <span className={styles.avatarHandle}>@walito</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsRow}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statNumber}>{s.number}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* Principles */}
      <section className={styles.principles}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>The rules of the list</h2>
          <p className={styles.sectionSub}>
            These aren't policies. They're just how this works.
          </p>
        </div>
        <div className={styles.principlesGrid}>
          {PRINCIPLES.map((p) => (
            <div key={p.title} className={styles.principleCard}>
              <div className={styles.principleIcon}>
                <p.icon size={20} />
              </div>
              <div>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleBody}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <Rss size={28} className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Get new picks in your inbox</h2>
          <p className={styles.ctaSub}>
            Monthly. No noise. Just the new things that earned a spot on the list.
          </p>
          <a href="/newsletter" className={styles.ctaBtn}>
            Join The List
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>Walito's Way — No ads. No affiliate links. Just real taste.</p>
      </footer>
    </div>
  );
}
