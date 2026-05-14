import { useState } from 'react';
import { ITEMS, CATEGORIES } from '@/data/items';
import { ExternalLink, Tag, Calendar, Star } from 'lucide-react';
import styles from './CollectionPage.module.css';

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? ITEMS
    : ITEMS.filter((i) => i.category === activeCategory);

  const categoryCounts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.id] = cat.id === 'all' ? ITEMS.length : ITEMS.filter((i) => i.category === cat.id).length;
    return acc;
  }, {});

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          Full archive
        </div>
        <h1 className={styles.title}>The Collection</h1>
        <p className={styles.subtitle}>
          Everything on the list, organized by category. Every item has been personally
          tested, used, or visited. Updated regularly.
        </p>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>Categories</p>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.sidebarItem} ${activeCategory === cat.id ? styles.sidebarItemActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className={styles.sidebarItemLabel}>{cat.label}</span>
              <span className={styles.sidebarItemCount}>{categoryCounts[cat.id] ?? 0}</span>
            </button>
          ))}
        </aside>

        <div className={styles.content}>
          <div className={styles.resultsBar}>
            <span className={styles.resultsCount}>{filtered.length} items</span>
            {activeCategory !== 'all' && (
              <span className={styles.resultsCategory}>
                in {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </span>
            )}
          </div>

          <div className={styles.list}>
            {filtered.map((item) => (
              <div key={item.id} className={styles.row}>
                <div className={styles.rowImage}>
                  <img src={item.image} alt={item.title} className={styles.rowImg} />
                </div>
                <div className={styles.rowBody}>
                  <div className={styles.rowMeta}>
                    <span className={styles.rowCategory}>{item.category}</span>
                    <div className={styles.rowStars}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          fill={i < item.rating ? 'currentColor' : 'none'}
                          className={i < item.rating ? styles.starFilled : styles.starEmpty}
                        />
                      ))}
                    </div>
                    <span className={styles.rowDate}>
                      <Calendar size={10} />
                      {item.dateAdded}
                    </span>
                  </div>
                  <h3 className={styles.rowTitle}>{item.title}</h3>
                  <p className={styles.rowDesc}>{item.description}</p>
                  <p className={styles.rowTake}>"{item.personalTake}"</p>
                  <div className={styles.rowFooter}>
                    <div className={styles.rowTags}>
                      {item.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className={styles.tag}>
                          <Tag size={9} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.rowLink}
                      >
                        <ExternalLink size={12} />
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
