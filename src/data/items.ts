export interface Category {
  id: string;
  label: string;
  icon: string;
}

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

export const categories: Category[] = [
  { id: 'all', label: 'All', icon: 'LayoutGrid' },
  { id: 'grooming', label: 'Grooming', icon: 'Sparkles' },
  { id: 'food', label: 'Food & Drink', icon: 'UtensilsCrossed' },
  { id: 'tech', label: 'Tech', icon: 'Cpu' },
  { id: 'style', label: 'Style', icon: 'Shirt' },
  { id: 'travel', label: 'Travel', icon: 'Plane' },
  { id: 'books', label: 'Books', icon: 'BookOpen' },
  { id: 'home', label: 'Home', icon: 'Home' },
];

export const defaultItems: Item[] = [
  {
    id: '1',
    title: 'Aesop Resurrection Rinse-Free Hand Wash',
    description: 'The best hand wash I have ever used. Period.',
    category: 'grooming',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    rating: 5,
    tags: ['grooming', 'luxury', 'everyday'],
    link: 'https://www.aesop.com',
    personalTake: 'I bought this on a whim at the airport and have never gone back to anything else.',
    dateAdded: '2024-01',
    featured: true,
  },
  {
    id: '2',
    title: 'Oura Ring Gen 3',
    description: 'Sleep and health tracking that actually changes how you live.',
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1617625802912-cde586faf331?w=600&q=80',
    rating: 5,
    tags: ['health', 'wearable', 'sleep'],
    link: 'https://ouraring.com',
    personalTake: 'Wore it for a week and completely restructured my sleep schedule. Worth every penny.',
    dateAdded: '2024-02',
    featured: true,
  },
  {
    id: '3',
    title: 'Café de Olla',
    description: 'Traditional Mexican spiced coffee that ruins all other coffee forever.',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
    rating: 5,
    tags: ['coffee', 'mexico', 'morning'],
    personalTake: 'First had this at a market in Oaxaca. Now I make it every morning.',
    dateAdded: '2024-01',
    featured: false,
  },
  {
    id: '4',
    title: 'Acronym J1A-GT Jacket',
    description: 'The jacket that makes you feel like you are living in 2074.',
    category: 'style',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    rating: 4,
    tags: ['techwear', 'outerwear', 'investment'],
    link: 'https://acrnm.com',
    personalTake: 'Expensive. Worth it. The engineering is unlike anything else in fashion.',
    dateAdded: '2023-11',
    featured: false,
  },
  {
    id: '5',
    title: 'Aman Tokyo',
    description: 'The most serene hotel experience in one of the world\'s busiest cities.',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
    rating: 5,
    tags: ['hotel', 'tokyo', 'luxury'],
    link: 'https://www.aman.com/resorts/aman-tokyo',
    personalTake: 'Stayed here once. Still think about the onsen every single day.',
    dateAdded: '2023-09',
    featured: true,
  },
  {
    id: '6',
    title: 'The Dawn of Everything',
    description: 'Graeber and Wengrow rewrite human history. Everything you know is wrong.',
    category: 'books',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    rating: 5,
    tags: ['history', 'anthropology', 'mind-bending'],
    link: 'https://us.macmillan.com/books/9780374157357/thedawnofeverything',
    personalTake: 'Read it twice. Changed how I think about society, freedom, and human potential.',
    dateAdded: '2023-12',
    featured: false,
  },
  {
    id: '7',
    title: 'Muji Wall Mounted CD Player',
    description: 'Pull the cord, music plays. The most peaceful object in my apartment.',
    category: 'home',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80',
    rating: 5,
    tags: ['muji', 'minimalist', 'music'],
    link: 'https://www.muji.com',
    personalTake: 'Sounds ridiculous but this single object changed my relationship with music.',
    dateAdded: '2024-01',
    featured: false,
  },
  {
    id: '8',
    title: 'Patagonia Black Hole Duffel 55L',
    description: 'The only bag you need for every trip under two weeks.',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    rating: 4,
    tags: ['travel', 'gear', 'durable'],
    link: 'https://www.patagonia.com',
    personalTake: 'Took this to 14 countries. Still looks new. Built like a tank.',
    dateAdded: '2023-10',
    featured: false,
  },
];

// Re-export defaultItems as items for backward compatibility
export const items = defaultItems;
