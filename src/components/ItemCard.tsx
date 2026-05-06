import { useRef, useCallback } from 'react';
import * as LucideIcons from 'lucide-react';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { CuratedItem } from '@/types';
import styles from '@/components/ItemCard.module.css';
import clsx from 'clsx';

type ItemCardProps = {
  item: CuratedItem;
  onClick?: (item: CuratedItem) => void;
};

const BADGE_CLASS: Record<string, string> = {
  fire: 'badgeFire',
  new: 'badgeNew',
  og: 'badgeOg',
  gem: 'badgeGem',
};

const BADGE_ICON: Record<string, string> = {
  fire: 'Flame',
  new: 'Sparkles',
  og: 'Trophy',
  gem: 'Gem',
};

const CATEGORY_COLOR: Record<string, string> = {
  music: '#FF4D00',
  gear: '#00C8FF',
  clothing: '#C8A000',
  food: '#FF2D6B',
  apps: '#9B8FFF',
  books: '#00C878',
  places: '#FF8C00',
};

function CardIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  const badgeClass = item.badgeType ? BADGE_CLASS[item.badgeType] : '';
  const badgeIconName = item.badgeType ? BADGE_ICON[item.badgeType] : '';
  const accentColor = CATEGORY_COLOR[item.category] ?? '#FF4D00';
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (onClick) onClick(item);
    document.querySelectorAll('dialog[open]').forEach((d) => {
      if (d !== dialogRef.current) (d as HTMLDialogElement).close();
    });
    dialogRef.current?.showModal();
  }, [item, onClick]);

  const closeModal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  }, []);

  return (
    <>
      {/* ── Card ── */}
      <div className={styles.anchor}>
        <div
          className={clsx(styles.card, styles.cardLink)}
          onClick={openModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(e); }}
        >
          {/* Bold image block */}
          {item.image && (
            <div className={styles.imageWrap}>
              <img
                src={item.image}
                alt={item.imageAlt ?? item.title}
                className={styles.image}
                loading="lazy"
              />
              <div
                className={styles.imageOverlay}
                style={{ '--accent': accentColor } as React.CSSProperties}
              />
              <div className={styles.imageIconBadge}>
                {item.categoryIcon ? (
                  <CardIcon name={item.categoryIcon} size={16} />
                ) : (
                  <LucideIcons.Star size={16} />
                )}
              </div>
              {item.badge && (
                <span className={clsx(styles.badge, styles[badgeClass], styles.imageBadge)}>
                  {badgeIconName && (
                    <span className={styles.badgeIconWrap}>
                      <CardIcon name={badgeIconName} size={9} />
                    </span>
                  )}
                  {item.badge}
                </span>
              )}
              {item.link && (
                <div className={styles.imageExternalLink}>
                  <ExternalLink size={14} />
                </div>
              )}
            </div>
          )}

          {/* No-image fallback header */}
          {!item.image && (
            <div className={styles.top}>
              <div
                className={styles.iconBox}
                style={{ '--accent': accentColor } as React.CSSProperties}
              >
                {item.categoryIcon ? (
                  <CardIcon name={item.categoryIcon} size={22} />
                ) : (
                  <LucideIcons.Star size={22} />
                )}
              </div>
              <div className={styles.topRight}>
                {item.badge && (
                  <span className={clsx(styles.badge, styles[badgeClass])}>
                    {badgeIconName && (
                      <span className={styles.badgeIconWrap}>
                        <CardIcon name={badgeIconName} size={9} />
                      </span>
                    )}
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className={styles.body}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{item.title}</h3>
            </div>
            <p className={styles.description}>{item.description}</p>
          </div>

          <div className={styles.footer}>
            <div className={styles.tags}>
              {item.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>
            <span className={styles.footerOpen}>
              <ArrowUpRight size={13} />
              <span>View</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Modal / Detail overlay ── */}
      <dialog
        ref={dialogRef}
        className={styles.modal}
        onClick={handleBackdropClick}
      >
        <div
          className={styles.modalInner}
          style={{ '--accent': accentColor } as React.CSSProperties}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Image */}
          {item.image && (
            <div className={styles.modalImageWrap}>
              <img
                src={item.image.replace('w=800', 'w=1200')}
                alt={item.imageAlt ?? item.title}
                className={styles.modalImage}
              />
              <div
                className={styles.modalImageOverlay}
                style={{ '--accent': accentColor } as React.CSSProperties}
              />
              {/* Big title overlay on image */}
              <div className={styles.modalImageTitle}>
                <span
                  className={styles.modalCategoryPill}
                  style={{ background: accentColor }}
                >
                  {item.categoryIcon && <CardIcon name={item.categoryIcon} size={12} />}
                  {item.category}
                </span>
                <h2 className={styles.modalTitle}>{item.title}</h2>
              </div>
            </div>
          )}

          {/* No-image title */}
          {!item.image && (
            <div
              className={styles.modalNoImageHeader}
              style={{ borderColor: accentColor }}
            >
              <div
                className={styles.modalNoImageIcon}
                style={{ color: accentColor }}
              >
                {item.categoryIcon ? (
                  <CardIcon name={item.categoryIcon} size={40} />
                ) : (
                  <LucideIcons.Star size={40} />
                )}
              </div>
              <div>
                <span
                  className={styles.modalCategoryPill}
                  style={{ background: accentColor }}
                >
                  {item.category}
                </span>
                <h2 className={styles.modalTitle} style={{ color: '#fff', marginTop: 8 }}>{item.title}</h2>
              </div>
            </div>
          )}

          {/* Body */}
          <div className={styles.modalBody}>
            {item.badge && (
              <span className={clsx(styles.badge, styles[badgeClass], styles.modalBadge)}>
                {badgeIconName && (
                  <span className={styles.badgeIconWrap}>
                    <CardIcon name={badgeIconName} size={11} />
                  </span>
                )}
                {item.badge}
              </span>
            )}

            <p className={styles.modalDescription}>{item.description}</p>

            <div className={styles.modalTags}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalCta}
                style={{ '--accent': accentColor, background: accentColor } as React.CSSProperties}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                <span>Open link</span>
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
