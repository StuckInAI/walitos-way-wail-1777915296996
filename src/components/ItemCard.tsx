import { useState } from 'react';
import { X, ExternalLink, Star } from 'lucide-react';
import type { Item } from '@/data/items';
import styles from './ItemCard.module.css';

interface Props {
  item: Item;
}

export default function ItemCard({ item }: Props) {
  const [open, setOpen] = useState(false);

  const stars = Array.from({ length: 5 }, (_, i) => i < item.rating);

  return (
    <>
      {/* Card */}
      <article
        className={styles.card}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
        aria-label={`Open ${item.title}`}
      >
        <div className={styles.imgWrap}>
          <img src={item.image} alt={item.title} className={styles.img} loading="lazy" />
          <div className={styles.imgFade} />
          <div className={styles.catBadge}>{item.category}</div>
        </div>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.stars}>
              {stars.map((filled, i) => (
                <Star key={i} size={9} className={filled ? styles.starFilled : styles.starEmpty} />
              ))}
            </div>
            <span className={styles.date}>{item.dateAdded}</span>
          </div>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.take}>{item.personalTake}</p>
          <div className={styles.footer}>
            <span className={styles.cta}>➜ See why I picked this</span>
          </div>
        </div>
      </article>

      {/* Modal overlay */}
      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              type="button"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className={styles.modalImgWrap}>
              <img src={item.image} alt={item.title} className={styles.modalImg} />
              <div className={styles.modalImgFade} />
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <span className={styles.modalCat}>{item.category}</span>
                <span className={styles.modalDate}>Added {item.dateAdded}</span>
              </div>

              <h2 className={styles.modalTitle}>{item.title}</h2>

              <div className={styles.modalStars}>
                {stars.map((filled, i) => (
                  <Star key={i} size={11} className={filled ? styles.starFilled : styles.starEmpty} />
                ))}
              </div>

              <p className={styles.modalDesc}>{item.description}</p>
              <p className={styles.modalTake}>{item.personalTake}</p>

              <div className={styles.modalTags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLink}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={13} />
                  See it for yourself
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
