export type Category = {
  id: string;
  label: string;
  icon: string;
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
  categoryIcon?: string;
  image?: string;
  imageAlt?: string;
  dateAdded?: string;
  // Extended fields for richer detail view
  whyILoveIt?: string;
  rating?: number; // 1-10
  year?: string;   // year discovered or released
};

export type Update = {
  id: string;
  date: string;
  title: string;
  body: string;
  tag: 'new pick' | 'removed' | 'note' | 'update';
  itemId?: string;
};
