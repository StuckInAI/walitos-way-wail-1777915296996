export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  tags: string[];
  link?: string;
  personalTake: string;
  dateAdded: string;
  featured?: boolean;
}
