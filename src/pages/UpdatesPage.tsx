import { Calendar, ArrowRight, Tag, Plus, RefreshCw, CheckCircle, Flag } from 'lucide-react';
import styles from './UpdatesPage.module.css';

const UPDATES = [
  {
    id: '1',
    date: 'Oct 2024',
    title: 'Kindle Paperwhite — added to Gear',
    body: 'I read more in the 6 months after buying this than in the previous 2 years combined. No notifications. Backlit in the dark. Fits in a jacket pocket. It removed every excuse I had for not reading.',
    tags: ['gear', 'new pick'],
    type: 'new',
  },
  {
    id: '2',
    date: 'Sep 2024',
    title: 'Sugarhill Nairobi — best wings in the city',
    body: 'Added to Food after my fourth visit in a month. The honey sriracha wings are the reason. Unpretentious, fast, consistently good. The kind of place you only tell people you actually like.',
    tags: ['food', 'nairobi', 'new pick'],
    type: 'new',
  },
  {
    id: '3',
    date: 'Sep 2024',
    title: 'Spirited Away — added to Film',
    body: "Miyazaki proves animation is a medium, not a genre. I've shown this to people who 'don't watch anime' and they don't move for two hours. Added with a full write-up.",
    tags: ['film', 'new pick'],
    type: 'new',
  },
  {
    id: '4',
    date: 'Aug 2024',
    title: 'Patagonia Black Hole Duffel — travel bag confirmed',
    body: "Added to Clothing after 18 months of use. Airports, hiking trails, overnight trips — not a single seam has failed. The only bag I travel with now.",
    tags: ['clothing', 'travel', 'confirmed'],
    type: 'confirmed',
  },
  {
    id: '5',
    date: 'Jul 2024',
    title: 'Added JMM Glass to Design',
    body: 'Found these while looking for something to put in my workspace. Every piece is made to order and the craftsmanship is genuinely old-world. Added three items from their collection.',
    tags: ['design', 'new pick'],
    type: 'new',
  },
  {
    id: '6',
    date: 'Jun 2024',
    title: 'Rabbit R1 — 3 months in',
    body: 'Updated my take on the R1 after carrying it daily for 3 months. The hardware is right. The software is catching up. Still think the form factor wins long-term.',
    tags: ['tech', 'update'],
    type: 'update',
  },
  {
    id: '7',
    date: 'Jun 2024',
    title: 'Eufay UV Printer added to Gear',
    body: 'This machine changed my production workflow. Printing directly on glass and leather with no transfer step is a different league. Added with full notes.',
    tags: ['gear', 'new pick'],
    type: 'new',
  },
  {
    id: '8',
    date: 'May 2024',
    title: 'Maison Margiela Jazz Club — confirmed long-term',
    body: "Been wearing this for over a year now. Still gets the same reaction every time. Moved it from 'testing' to confirmed permanent on the list.",
    tags: ['clothing', 'confirmed'],
    type: 'confirmed',
  },
  {
    id: '9',
    date: 'Apr 2024',
    title: 'Aesop Hand Wash — added to everyday carry',
    body: 'Sounds absurd to add a hand wash to a curated list. But I keep being asked what I use. So here it is.',
    tags: ['clothing', 'new pick'],
    type: 'new',
  },
  {
    id: '10',
    date: 'Mar 2024',
    title: 'Arc Browser review updated',
    body: 'Added notes on Dev Mode and how I use Spaces across three different work contexts. The browser just keeps getting better.',
    tags: ['apps', 'update'],
    type: 'update',
  },
  {
    id: '11',
    date: 'Mar 2024',
    title: 'Sony XM5 — 14 months in',
    body: 'Updated the personal take after 14 months of daily use. Battery still holds. ANC still unmatched on long flights.',
    tags: ['gear', 'update'],
    type: 'update',
  },
  {
    id: '12',
    date: 'Jan 2024',
    title: 'Site launched',
    body: "The list has always existed — in my head, in texts to friends, in voice memos. Now it's a place you can send people. Welcome.",
    tags: ['meta'],
    type: 'milestone',
  },
];

const TYPE_CONFIG: Record<string, { label: string; Icon: React.FC<{ size?: number }> }> = {
  new: { label: 'New Pick', Icon: Plus },
  update: { label: 'Updated', Icon: RefreshCw },
  confirmed: { label: 'Confirmed', Icon: CheckCircle },
  milestone: { label: 'Milestone', Icon: Flag },
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
        {UPDATES.map((u, i) => {
          const config = TYPE_CONFIG[u.type] ?? TYPE_CONFIG.new;
          const Icon = config.Icon;
          return (
            <div key={u.id} className={styles.entry}>
              <div className={styles.entryLeft}>
                <div className={`${styles.entryDot} ${styles[`dot_${u.type}`]}`}>
                  <Icon size={10} />
                </div>
                {i < UPDATES.length - 1 && <div className={styles.entryLine} />}
              </div>
              <div className={styles.entryContent}>
                <div className={styles.entryMeta}>
                  <span className={`${styles.typeLabel} ${styles[`type_${u.type}`]}`}>
                    {config.label}
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
          );
        })}
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
