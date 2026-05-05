import * as LucideIcons from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { CuratedItem } from '@/types';
import styles from '@/components/ItemCard.module.css';
import clsx from 'clsx';

type ItemCardProps = {
  item: CuratedItem;
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

export default function ItemCard({ item }: ItemCardProps) {
  const badgeClass = item.badgeType ? BADGE_CLASS[item.badgeType] : '';
  const badgeIconName = item.badgeType ? BADGE_ICON[item.badgeType] : '';
  const accentColor = CATEGORY_COLOR[item.category] ?? '#FF4D00';

  const cardContent = (
    <div className={clsx(styles.card, item.link && styles.cardLink)}>
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
          {/* Category icon badge floated over image */}
          <div className={styles.imageIconBadge}>
            {item.categoryIcon ? (
              <CardIcon name={item.categoryIcon} size={16} />
            ) : (
              <LucideIcons.Star size={16} />
            )}
          </div>
          {/* Badge pill top-right of image */}
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
            {item.link && (
              <span className={styles.linkIcon}>
                <ExternalLink size={13} />
              </span>
            )}
          </div>
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{item.title}</h3>
          {item.link && (
            <span className={styles.linkIcon}>
              <ExternalLink size={13} />
            </span>
          )}
        </div>
        <p className={styles.description}>{item.description}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.tags}>
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.anchor}
      >
        {cardContent}
      </a>
    );
  }

  return <div className={styles.anchor}>{cardContent}</div>;
}
