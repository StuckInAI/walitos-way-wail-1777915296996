import { MapPin, Zap, Heart, ExternalLink } from 'lucide-react';
import styles from './AboutPage.module.css';
import walitoPhoto from '../components/walito-photo';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroBlock}>
        <div className={styles.photoCol}>
          <div className={styles.photoWrap}>
            <img
              src={walitoPhoto}
              alt="Wa'il — Walito"
              className={styles.photo}
            />
            <div className={styles.photoBorder} />
          </div>
          <div className={styles.photoMeta}>
            <span className={styles.photoName}>Wa'il</span>
            <span className={styles.photoTitle}>Walito · Founder & Curator</span>
          </div>
        </div>

        <div className={styles.introCol}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            About Walito's Way
          </div>
          <h1 className={styles.title}>I research everything obsessively so you don't have to.</h1>
          <p className={styles.lead}>
            My name is Wa'il. I go by Walito. I'm a founder, traveler, and compulsive optimizer.
            I've always kept a mental list of the things that actually work — the gear that holds up,
            the music that moves something, the places that change you.
          </p>
          <p className={styles.body}>
            This site is that list made public. Everything here I've personally paid for, used until
            it broke, revisited, and decided was worth keeping. No brand deals. No sponsored content.
            No affiliate links. If I recommend something, it's because a friend asked me and I
            couldn't stop talking about it.
          </p>
          <p className={styles.body}>
            The rule is simple: if I wouldn't text it to a friend, it doesn't go on the list.
          </p>

          <div className={styles.pillRow}>
            <span className={styles.pill}><MapPin size={12} /> Based in Nairobi</span>
            <span className={styles.pill}><Zap size={12} /> Founder</span>
            <span className={styles.pill}><Heart size={12} /> Obsessive researcher</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>The Philosophy</h2>
        <div className={styles.principlesGrid}>
          {[
            {
              num: '01',
              title: 'Real experience only.',
              body: "If I haven't used it, eaten it, worn it, or been there — it's not on the list. No secondhand recommendations.",
            },
            {
              num: '02',
              title: 'Specificity over superlatives.',
              body: "Anyone can say something is 'amazing'. I tell you the exact counter in Shinjuku at 1am, or the one setting on the headphones that matters.",
            },
            {
              num: '03',
              title: 'No noise.',
              body: 'I update the list when I find something genuinely worth adding. No filler. No trend-chasing. The list stays lean on purpose.',
            },
            {
              num: '04',
              title: 'No financial interest.',
              body: "Zero affiliate links. Zero sponsorships. If I'm recommending something, the only reason is that I think you should know about it.",
            },
          ].map((p) => (
            <div key={p.num} className={styles.principle}>
              <span className={styles.principleNum}>{p.num}</span>
              <h3 className={styles.principleTitle}>{p.title}</h3>
              <p className={styles.principleBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contactBlock}>
        <h2 className={styles.contactTitle}>Want to reach me?</h2>
        <p className={styles.contactBody}>
          I'm reachable. If you have a question about anything on the list, a recommendation
          to share, or just want to talk — find me below.
        </p>
        <div className={styles.contactLinks}>
          <a href="mailto:hello@walitosway.com" className={styles.contactLink}>
            <ExternalLink size={13} />
            hello@walitosway.com
          </a>
        </div>
      </div>
    </div>
  );
}
