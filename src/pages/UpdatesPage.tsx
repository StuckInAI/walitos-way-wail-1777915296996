import { Calendar, ArrowRight, Tag } from 'lucide-react';
import styles from './UpdatesPage.module.css';

const UPDATES = [
  {
    id: '1',
    date: 'Jul 2024',
    title: 'Added JMM Glass to Design',
    body: 'Found these while looking for something to put in my workspace. Every piece is made to order and the craftsmanship is genuinely old-world. Added three items from their collection.',
    tags: ['design', 'new pick'],
    type: 'new',
  },
  {
    id: '2',
    date: 'Jun 2024',
    title: 'Rabbit R1 — 3 months in',
    body: 'Updated my take on the R1 after carrying it daily for 3 months. The hardware is right. The software is catching up. Still think the form factor wins long-term.',
    tags: ['tech', 'update'],
    type: 'update',
  },
  {
    id: '3',
    date: 'Jun 2024',
    title: 'Eufay UV Printer added to Gear',
    body: 'This machine changed my production workflow. Printing directly on glass and leather with no transfer step is a different league. Added with full notes.',
    tags: ['gear', 'new pick'],
    type: 'new',
  },
  {
    id: '4',
    date: 'May 2024',
    title: 'Maison Margiela Jazz Club — confirmed long-term',
    body: "Been wearing this for over a year now. Still gets the same reaction every time. Moved it from 'testing' to confirmed permanent on the list.",
    tags: ['clothing', 'confirmed'],
    type: 'confirmed',
  },
  {
    id: '5',
    date: 'Apr 2024',
    title: 'Aesop Hand Wash — added to everyday carry',
    body: 'Sounds absurd to add a hand wash to a curated list. But I keep being asked what I use. So here it is.',
    tags: ['clothing', 'new pick'],
    type: 'new',
  },
  {
    id: '6',
    date: 'Mar 2024',
    title: 'Arc Browser review updated',
    body: 'Added notes on Dev Mode and how I use Spaces across three different work contexts. The browser just keeps getting better.',
    tags: ['apps', 'update'],
    type: 'update',
  },
  {
    id: '7',
    date: 'Mar 2024',
    title: 'Sony XM5 — 14 months in',
    body: 'Updated the personal take after 14 months of daily use. Battery still holds. ANC still unmatched on long flights.',
    tags: ['gear', 'update'],
    type: 'update',
  },
  {
    id: '8',
    date: 'Jan 2024',
    title: 'Site launched',
    body: "The list has always existed — in my head, in texts to friends, in voice memos. Now it's a place you can send people. Welcome.",
    tags: ['meta'],
    type: 'milestone',
  },
];

const TYPE_LABELS: Record<string, string> = {
  new: 'New Pick',
  update: 'Updated',
  confirmed: 'Confirmed',
  milestone: 'Milestone',
};

export default function UpdatesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          The log
        </div>
        <h1 className={styles.title}>Updates</h1>
        <p className={styles.subtitle}>
          Every addition, revision, and milestone — in order. This is how you know
          the list is alive, not a static page someone built once and left.
        </p>
      </div>

      <div className={styles.feed}>
        {UPDATES.map((u, i) => (
          <div key={u.id} className={styles.entry}>
            <div className={styles.entryLeft}>
              <div className={`${styles.entryDot} ${styles[`dot_${u.type}`]}`} />
              {i < UPDATES.length - 1 && <div className={styles.entryLine} />}
            </div>
            <div className={styles.entryContent}>
              <div className={styles.entryMeta}>
                <span className={`${styles.typeLabel} ${styles[`type_${u.type}`]}`}>
                  {TYPE_LABELS[u.type]}
                </span>
                <span className={styles.entryDate}>
                  <Calendar size={10} />
                  {u.date}
                </span>
              </div>
              <h2 className={styles.entryTitle}>{u.title}</h2>
              <p className={styles.entryBody}>{u.body}</p>
              <div className={styles.entryTags}>
                {u.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    <Tag size={9} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <p className={styles.ctaText}>Want updates when new picks drop?</p>
        <a href="/newsletter" className={styles.ctaBtn}>
          Get The List <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}
