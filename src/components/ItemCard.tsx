import { useState } from 'react';
import { ExternalLink, X, Star, Calendar, Tag, ArrowRight } from 'lucide-react';
import type { Item } from '@/data/items';
import styles from './ItemCard.module.css';

type Props = { item: Item };

export default function ItemCard({ item }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <article className={styles.card} onClick={() => setOpen(true)}>
        <div className={styles.imageWrap}>
          <img src={item.image} alt={item.title} className={styles.image} />
          <div className={styles.imageOverlay} />
          <span className={styles.categoryBadge}>{item.category}</span>
          <div className={styles.viewHint}>
            <ArrowRight size={14} />
            <span>See why I picked this</span>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.meta}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  fill={i < item.rating ? 'currentColor' : 'none'}
                  className={i < item.rating ? styles.starFilled : styles.starEmpty}
                />
              ))}
            </div>
            <span className={styles.dateAdded}>
              <Calendar size={10} />
              {item.dateAdded}
            </span>
          </div>

          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>

          <div className={styles.tags}>
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Modal overlay */}
      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className={styles.closeBtn}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              aria-label="Close"
              type="button"
            >
              <X size={18} />
            </button>

            {/* Modal image */}
            <div className={styles.modalImageWrap}>
              <img src={item.image} alt={item.title} className={styles.modalImage} />
              <div className={styles.modalImageOverlay} />
              <span className={styles.modalCategoryBadge}>{item.category}</span>
              <h2 className={styles.modalTitleOverlay}>{item.title}</h2>
            </div>

            {/* Modal content */}
            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <div className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < item.rating ? 'currentColor' : 'none'}
                      className={i < item.rating ? styles.starFilled : styles.starEmpty}
                    />
                  ))}
                </div>
                <span className={styles.dateAdded}>
                  <Calendar size={11} />
                  Added {item.dateAdded}
                </span>
              </div>

              <p className={styles.modalDescription}>{item.description}</p>

              <div className={styles.modalTakeWrap}>
                <span className={styles.modalTakeLabel}>Walito's take</span>
                <p className={styles.modalTake}>"{item.personalTake}"</p>
              </div>

              <div className={styles.modalTags}>
                {item.tags.map((tag) => (
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
                  className={styles.modalLink}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                  Visit {item.title}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
