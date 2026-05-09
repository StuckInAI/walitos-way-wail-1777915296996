import { useState } from 'react';
import { Rss, Plus, RefreshCw, Trash2, MessageSquare, ArrowUpRight, Calendar, Filter } from 'lucide-react';
import { ITEMS } from '@/data/items';
import styles from '@/pages/UpdatesPage.module.css';
import { Update } from '@/types';

const TAG_ICONS: Record<Update['tag'], React.ReactNode> = {
  'new pick': <Plus size={12} />,
  'update': <RefreshCw size={12} />,
  'removed': <Trash2 size={12} />,
  'note': <MessageSquare size={12} />,
};

const TAG_STYLES: Record<Update['tag'], string> = {
  'new pick': 'tagNew',
  'update': 'tagUpdate',
  'removed': 'tagRemoved',
  'note': 'tagNote',
};

const UPDATES: Update[] = [
  {
    id: 'u-001',
    date: 'December 2024',
    title: 'Added Kendrick Lamar — GNX',
    body: 'Still processing this album. Three weeks in and I keep going back. Pure artistry from front to back.',
    tag: 'new pick',
    itemId: 'music-3',
  },
  {
    id: 'u-002',
    date: 'November 2024',
    title: 'Added JMM Glass',
    body: 'Finally putting this on the list. These pieces change the energy of any room. If you know, you know.',
    tag: 'new pick',
    itemId: 'design-4',
  },
  {
    id: 'u-003',
    date: 'October 2024',
    title: 'Added Eufairy UV Printer',
    body: 'Been using this for about 6 months for custom merch prototypes. More capable than it has any right to be at this price point.',
    tag: 'new pick',
    itemId: 'gear-8',
  },
  {
    id: 'u-004',
    date: 'April 2024',
    title: 'Added Rabbit R1',
    body: 'Controversial pick and I know it. I stand by it as a first-gen piece of hardware that points at something real. The TE design alone is worth acknowledging.',
    tag: 'new pick',
    itemId: 'gear-9',
  },
  {
    id: 'u-005',
    date: 'February 2024',
    title: 'Added Perplexity AI to Apps',
    body: 'Replaced my default search for research tasks entirely. The citation model is what makes it genuinely different.',
    tag: 'new pick',
    itemId: 'apps-5',
  },
  {
    id: 'u-006',
    date: 'January 2024',
    title: 'Added Seoul, South Korea',
    body: 'Just got back from my first trip. Dongdaemun at 3am is something you have to experience. Adding to places immediately.',
    tag: 'new pick',
    itemId: 'places-4',
  },
  {
    id: 'u-007',
    date: 'November 2023',
    title: 'Added Cursor (AI code editor)',
    body: 'VS Code is a museum piece now. Tab completion that actually reads your mind. Leveled up overnight.',
    tag: 'new pick',
    itemId: 'apps-6',
  },
  {
    id: 'u-008',
    date: 'October 2023',
    title: 'Added Arca',
    body: 'Should have been on here from the start. Mutant is chaos that becomes addictive. Nobody else is doing this.',
    tag: 'new pick',
    itemId: 'music-8',
  },
  {
    id: 'u-009',
    date: 'August 2023',
    title: 'Added Mexico City to Places',
    body: "Spent three weeks in Roma Norte. Twenty-two million people and somehow the most navigable mega-city I've ever been to.",
    tag: 'new pick',
    itemId: 'places-5',
  },
  {
    id: 'u-010',
    date: 'July 2023',
    title: 'Added Keychron Q1 Pro',
    body: 'The sound profile is everything. Colleagues notice on video calls. Worth every penny for a serious desk setup.',
    tag: 'new pick',
    itemId: 'gear-3',
  },
  {
    id: 'u-011',
    date: 'June 2023',
    title: 'Added Oaxaca, Mexico',
    body: 'The tlayudas alone justify this entry. The mercado is the platonic ideal of a market.',
    tag: 'new pick',
    itemId: 'places-3',
  },
  {
    id: 'u-012',
    date: 'April 2023',
    title: 'Added Readwise Reader',
    body: 'Replaced Instapaper, Pocket, and three other apps in one move. The Obsidian highlights sync sealed it.',
    tag: 'new pick',
    itemId: 'apps-7',
  },
  {
    id: 'u-013',
    date: 'January 2024',
    title: 'Note: All picks are self-funded',
    body: "Just to be clear — I have never accepted payment, product gifting, or affiliate arrangements for anything on this list. If that ever changes, I'll say so explicitly.",
    tag: 'note',
  },
];

function getItemForUpdate(update: Update) {
  if (!update.itemId) return null;
  return ITEMS.find(i => i.id === update.itemId) ?? null;
}

export default function UpdatesPage() {
  const [activeTag, setActiveTag] = useState<'all' | Update['tag']>('all');

  const filtered = activeTag === 'all'
    ? UPDATES
    : UPDATES.filter(u => u.tag === activeTag);

  const counts = {
    all: UPDATES.length,
    'new pick': UPDATES.filter(u => u.tag === 'new pick').length,
    update: UPDATES.filter(u => u.tag === 'update').length,
    removed: UPDATES.filter(u => u.tag === 'removed').length,
    note: UPDATES.filter(u => u.tag === 'note').length,
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.hero}>
        <div className={styles.eyebrow}>
          <Rss size={12} />
          <span>What's changed</span>
        </div>
        <h1 className={styles.title}>Updates</h1>
        <p className={styles.subtitle}>
          This list is alive. Here's what's been added, changed, or noted — in reverse chronological order.
        </p>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{counts['new pick']}</span>
            <span className={styles.statLabel}>new picks</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>{counts.note}</span>
            <span className={styles.statLabel}>notes</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>{UPDATES.length}</span>
            <span className={styles.statLabel}>total entries</span>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        <Filter size={13} className={styles.filterIcon} />
        {(['all', 'new pick', 'update', 'removed', 'note'] as const).map(tag => (
          <button
            key={tag}
            className={`${styles.filterBtn} ${activeTag === tag ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag === 'all' ? 'All' : tag}
            <span className={styles.filterCount}>{counts[tag]}</span>
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className={styles.feed}>
        {filtered.map((update) => {
          const linkedItem = getItemForUpdate(update);
          return (
            <div key={update.id} className={styles.entry}>
              <div className={styles.entryLeft}>
                <div className={styles.entryDot} />
                <div className={styles.entryLine} />
              </div>
              <div className={styles.entryContent}>
                <div className={styles.entryMeta}>
                  <span className={`${styles.tag} ${styles[TAG_STYLES[update.tag]]}`}>
                    {TAG_ICONS[update.tag]}
                    {update.tag}
                  </span>
                  <span className={styles.entryDate}>
                    <Calendar size={11} />
                    {update.date}
                  </span>
                </div>
                <h3 className={styles.entryTitle}>{update.title}</h3>
                <p className={styles.entryBody}>{update.body}</p>
                {linkedItem && linkedItem.link && (
                  <a
                    href={linkedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.entryLink}
                  >
                    <ArrowUpRight size={13} />
                    View {linkedItem.title}
                  </a>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className={styles.empty}>
            No entries for this filter.
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>Walito's Way — updated regularly, no filler.</p>
      </footer>
    </div>
  );
}
