import styles from './UpdatesPage.module.css';

const updates = [
  {
    id: '1',
    date: 'May 2024',
    tag: 'New Pick',
    title: 'Added: PLAUD NotePin',
    body: 'This thing has quietly replaced my entire note-taking workflow. Every meeting, every call, summarized automatically. My team thinks I\'m taking meticulous notes. I\'m not.',
  },
  {
    id: '2',
    date: 'May 2024',
    tag: 'New Pick',
    title: 'Added: Eufairy UV DTF Printer',
    body: 'What used to require a $10k print shop setup now fits on a desk. Full-color UV print onto glass in 90 seconds. The creative possibilities are genuinely wild.',
  },
  {
    id: '3',
    date: 'April 2024',
    tag: 'Update',
    title: 'Rabbit R1 — 60 Day Update',
    body: 'Still rough around the edges but the core concept holds. Over-the-air updates have improved responsiveness significantly. Worth watching.',
  },
  {
    id: '4',
    date: 'April 2024',
    tag: 'New Pick',
    title: 'Added: Echo Hydrogen Water Bottle',
    body: 'Was fully skeptical. Did 30 days. Post-workout soreness dropped noticeably around day 10. Still puzzled by the science but the result is real.',
  },
  {
    id: '5',
    date: 'March 2024',
    tag: 'New Pick',
    title: 'Added: MoonSwatch',
    body: 'Queued 2 hours for this on launch day in Dubai. At $260 it is the steal of the decade. Every watch person who sees it stops me.',
  },
  {
    id: '6',
    date: 'March 2024',
    tag: 'New Pick',
    title: 'Added: JMM Glass Studio',
    body: 'Discovered at a craft market in LA. Three pieces on my shelf. Every single visitor asks about them. Objects that start conversations.',
  },
  {
    id: '7',
    date: 'February 2024',
    tag: 'New Pick',
    title: 'Added: Superhuman AI',
    body: 'Hit inbox zero for the first time in 4 years on day three. The AI triage saves me 45 minutes daily. Non-negotiable.',
  },
  {
    id: '8',
    date: 'January 2024',
    tag: 'Removed',
    title: 'Removed: Notion (personal plan)',
    body: 'Replaced entirely by a combination of Superhuman + voice notes + PLAUD. If a tool stops being the best at its job, it leaves the list.',
  },
];

const tagColors: Record<string, string> = {
  'New Pick': styles.tagNew,
  'Update': styles.tagUpdate,
  'Removed': styles.tagRemoved,
};

export default function UpdatesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Changelog</span>
        <h1 className={styles.title}>Updates</h1>
        <p className={styles.subtitle}>What's been added, changed, or removed — and why.</p>
      </div>

      <div className={styles.feed}>
        {updates.map((u) => (
          <div key={u.id} className={styles.entry}>
            <div className={styles.entryMeta}>
              <span className={styles.entryDate}>{u.date}</span>
              <span className={`${styles.entryTag} ${tagColors[u.tag] ?? ''}`}>{u.tag}</span>
            </div>
            <div className={styles.entryContent}>
              <h2 className={styles.entryTitle}>{u.title}</h2>
              <p className={styles.entryBody}>{u.body}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerMark}>—W</span>
        <p className={styles.footerText}>Updated monthly. No noise.</p>
      </footer>
    </div>
  );
}
