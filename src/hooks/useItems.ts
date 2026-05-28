import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Item } from '../data/items';
import { loadStoredItems, saveStoredItems, ITEMS_UPDATED_EVENT } from '../lib/itemsStorage';

interface UseItemsReturn {
  items: Item[];
  allItems: Item[];
  search: string;
  setSearch: (s: string) => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

export function useItems(): UseItemsReturn {
  const [allItems, setAllItems] = useState<Item[]>(() => loadStoredItems());
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const handler = (): void => {
      setAllItems(loadStoredItems());
    };
    window.addEventListener(ITEMS_UPDATED_EVENT, handler);
    return () => window.removeEventListener(ITEMS_UPDATED_EVENT, handler);
  }, []);

  const items = useMemo(() => {
    let filtered = allItems;
    if (activeCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [allItems, activeCategory, search]);

  const addItem = useCallback((item: Item): void => {
    setAllItems((prev) => {
      const next = [item, ...prev];
      saveStoredItems(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string): void => {
    setAllItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      saveStoredItems(next);
      return next;
    });
  }, []);

  return { items, allItems, search, setSearch, activeCategory, setActiveCategory, addItem, removeItem };
}
