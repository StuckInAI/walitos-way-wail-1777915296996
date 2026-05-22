import { useState } from 'react';
import { items } from '@/data/items';
import styles from './CollectionPage.module.css';

const CATS = ['All', 'Tech', 'Style', 'Travel', 'Home', 'Wellness', 'Watches', 'Grooming', 'Food', 'Books'];

export default function CollectionPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? items
    : items.filter((i) => i.category.toLowerCase() === active.toLowerCase());

  const featured = items.filter((i) => i.featured);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>The Archive</span>
        <h1 className={styles.title}>Collection</h1>
        <p className={styles.subtitle}>
          {items.length} picks. Everything personally paid for, visited, or used until it broke.
        </p>
      </div>

      {/* Featured */}
      <div className={styles.featuredSection}>
        <div className={styles.sectionLabel}>Featured Picks</div>
        <div className={styles.featuredGrid}>
          {featured.map((item) => (
            <div key={item.id} className={styles.featuredCard}>
              <div className={styles.featuredImgWrap}>
                <img src={item.image} alt={item.title} className={styles.featuredImg} />
                <div className={styles.featuredImgFade} />
              </div>
              <div className={styles.featuredInfo}>
                <span className={styles.featuredCat}>{item.category}</span>
                <h3 className={styles.featuredTitle}>{item.title}</h3>
                <p className={styles.featuredTake}>{item.personalTake}</p>
                <span className={styles.featuredDate}>Added {item.dateAdded}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All items */}
      <div className={styles.allSection}>
        <div className={styles.filterRow}>
          {CATS.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${active === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setActive(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.listGrid}>
          {filtered.map((item) => (
            <div key={item.id} className={styles.listCard}>
              <div className={styles.listImgWrap}>
                <img src={item.image} alt={item.title} className={styles.listImg} />
              </div>
              <div className={styles.listInfo}>
                <div className={styles.listTop}>
                  <span className={styles.listCat}>{item.category}</span>
                  <span className={styles.listDate}>{item.dateAdded}</span>
                </div>
                <h3 className={styles.listTitle}>{item.title}</h3>
                <p className={styles.listTake}>{item.personalTake}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.listLink}>
                    See it →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerMark}>—W</span>
        <p className={styles.footerText}>Updated monthly. No sponsorships. No affiliate links.</p>
      </footer>
    </div>
  );
}
