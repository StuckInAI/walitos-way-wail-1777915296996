import { useState, useCallback } from 'react';
import { defaultItems } from '@/data/items';
import type { Item } from '@/data/items';

const STORAGE_KEY = 'walitos-items';

function loadItems(): Item[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Item[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return defaultItems;
}

function saveItems(items: Item[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function useItems() {
  const [allItems, setAllItems] = useState<Item[]>(loadItems);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const items = allItems.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.personalTake.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const addItem = useCallback((item: Omit<Item, 'id'>) => {
    const newItem: Item = { ...item, id: Date.now().toString() };
    setAllItems((prev) => {
      const next = [newItem, ...prev];
      saveItems(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setAllItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      saveItems(next);
      return next;
    });
  }, []);

  return { items, allItems, search, setSearch, activeCategory, setActiveCategory, addItem, removeItem };
}
