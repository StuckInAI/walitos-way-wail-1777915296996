export type Category = {
  id: string;
  label: string;
  emoji: string;
  description: string;
};

export type Tag = string;

export type CuratedItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: Tag[];
  link?: string;
  badge?: string;
  badgeType?: 'fire' | 'new' | 'og' | 'gem';
  imageEmoji?: string;
};
