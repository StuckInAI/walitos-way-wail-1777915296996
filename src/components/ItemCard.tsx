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

function CardIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}

export default function ItemCard({ item }: ItemCardProps) {
  const badgeClass = item.badgeType ? BADGE_CLASS[item.badgeType] : '';
  const badgeIconName = item.badgeType ? BADGE_ICON[item.badgeType] : '';

  const cardContent = (
    <div className={clsx(styles.card, item.link && styles.cardLink)}>
      <div className={styles.top}>
        <div className={styles.iconBox}>
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

      <div className={styles.body}>
        <h3 className={styles.title}>{item.title}</h3>
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
