import { defaultItems } from '../data/items';
import type { Item } from '../types';

export const ITEMS_STORAGE_KEY = 'walitos-items';
export const ITEMS_UPDATED_EVENT = 'walitos-items-updated';
const MAX_STORAGE_BYTES = 4_000_000;
const MAX_DATA_URI_LENGTH = 200_000;

function normalizeItem(raw: unknown): Item | null {
  if (!raw || typeof raw !== 'object') return null;

  const o = raw as Record<string, unknown>;
  const id = typeof o.id === 'string' ? o.id.trim() : '';
  const title = typeof o.title === 'string' ? o.title.trim() : '';
  if (!id || !title) return null;

  const rating =
    typeof o.rating === 'number' && o.rating >= 1 && o.rating <= 5
      ? o.rating
      : 5;

  let image = typeof o.image === 'string' ? o.image : '';
  if (image.startsWith('data:') && image.length > MAX_DATA_URI_LENGTH) {
    image = '';
  }

  return {
    id,
    title,
    description: typeof o.description === 'string' ? o.description : '',
    category: typeof o.category === 'string' ? o.category : '',
    image,
    rating,
    tags: Array.isArray(o.tags)
      ? o.tags.filter((t): t is string => typeof t === 'string')
      : [],
    link: typeof o.link === 'string' && o.link ? o.link : undefined,
    personalTake: typeof o.personalTake === 'string' ? o.personalTake : '',
    dateAdded: typeof o.dateAdded === 'string' ? o.dateAdded : '',
    featured: o.featured === true,
  };
}

function clearCorruptStorage(): void {
  try {
    localStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function loadStoredItems(): Item[] {
  try {
    const raw = localStorage.getItem(ITEMS_STORAGE_KEY);
    if (!raw) return defaultItems;
    if (raw.length > MAX_STORAGE_BYTES) {
      clearCorruptStorage();
      return defaultItems;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      clearCorruptStorage();
      return defaultItems;
    }

    const items = parsed
      .map(normalizeItem)
      .filter((item): item is Item => item !== null);

    return items.length > 0 ? items : defaultItems;
  } catch {
    clearCorruptStorage();
    return defaultItems;
  }
}

function stripOversizedImages(items: Item[]): Item[] {
  return items.map((item) => {
    if (
      item.image.startsWith('data:') &&
      item.image.length > MAX_DATA_URI_LENGTH
    ) {
      return { ...item, image: '' };
    }
    return item;
  });
}

export function saveStoredItems(items: Item[]): void {
  const safe = stripOversizedImages(items);
  try {
    const payload = JSON.stringify(safe);
    if (payload.length > MAX_STORAGE_BYTES) {
      console.warn('Saved items too large for localStorage');
      return;
    }
    localStorage.setItem(ITEMS_STORAGE_KEY, payload);
    window.dispatchEvent(new Event(ITEMS_UPDATED_EVENT));
  } catch {
    console.warn('Could not save items to localStorage');
  }
}

export function clearStoredItems(): void {
  clearCorruptStorage();
  window.dispatchEvent(new Event(ITEMS_UPDATED_EVENT));
}
