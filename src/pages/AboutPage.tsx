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

  const timeline = [
    { year: '2021', event: 'Started keeping a private list. Friends kept asking what I use, what I listen to, where to go.' },
    { year: '2022', event: 'The list grew past 30 items. Decided to build it into something shareable.' },
    { year: '2023', event: 'Added Places, Film, and Design. Traveled to Tokyo, Oaxaca, Mexico City. The list doubled.' },
    { year: '2024', event: 'Launched Walito\'s Way publicly. Added AI tools, new gear, Seoul. Still updating monthly.' },
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
            &ldquo;The only things worth recommending are the ones you&apos;d defend in an argument.&rdquo;
          </p>
          <p className={styles.heroBio}>
            I&apos;m Wa&apos;il &mdash; a founder, traveler, and obsessive researcher based between New York and
            wherever the interesting stuff is happening. I built this list because I kept getting
            asked the same questions: what do you use, what do you listen to, where do you stay.
            Now I have one place to point people.
          </p>
          <div className={styles.heroActions}>
            <Link to="/newsletter" className={styles.heroCta}>
              <LucideIcons.Mail size={15} />
              Get The List
              <LucideIcons.ArrowRight size={15} />
            </Link>
            <Link to="/" className={styles.heroSecondary}>
              <LucideIcons.LayoutGrid size={15} />
              Browse All Picks
            </Link>
          </div>
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
              <span className={styles.avatarHandle}>@walito &mdash; Founder &amp; Curator</span>
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

      {/* Timeline */}
      <section className={styles.timeline}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>How this list grew</h2>
          <p className={styles.sectionSub}>A brief history of the curation.</p>
        </div>
        <div className={styles.timelineList}>
          {timeline.map((t, i) => (
            <div key={i} className={styles.timelineItem}>
              <div className={styles.timelineYear}>{t.year}</div>
              <div className={styles.timelineDot} />
              <div className={styles.timelineEvent}>{t.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Common questions</h2>
        </div>
        <div className={styles.faqList}>
          {[
            {
              q: 'Do you accept paid placements or sponsorships?',
              a: 'No. Everything on this list I paid for myself. If that ever changes I will say so explicitly and loudly.',
            },
            {
              q: 'How often is the list updated?',
              a: 'Roughly monthly. I only add something when I\'m confident it\'s genuinely earned a spot — usually after 60+ days of regular use.',
            },
            {
              q: 'Can I suggest something for the list?',
              a: 'You can reach out via the newsletter. I read everything. I don\'t promise to add it — I\'ve been burned by hype before.',
            },
            {
              q: 'Why should I trust your picks?',
              a: 'You shouldn\'t trust anyone\'s picks blindly, including mine. But I\'ve spent real money on all of this, I have no financial incentive to steer you wrong, and I\'ll tell you when something disappoints me too.',
            },
          ].map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <div className={styles.faqQ}>
                <LucideIcons.ChevronRight size={14} className={styles.faqChevron} />
                {item.q}
              </div>
              <div className={styles.faqA}>{item.a}</div>
            </div>
          ))}
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
