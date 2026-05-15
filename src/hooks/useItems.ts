import { useState, useMemo, useEffect } from 'react';
import { defaultItems } from '@/data/items';
import {
  loadStoredItems,
  ITEMS_UPDATED_EVENT,
  ITEMS_STORAGE_KEY,
} from '@/lib/itemsStorage';
import type { Item } from '@/types';

export function useItems() {
  const [items, setItems] = useState<Item[]>(defaultItems);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setItems(loadStoredItems());

    function syncItems() {
      setItems(loadStoredItems());
    }

    function onStorage(e: StorageEvent) {
      if (e.key === ITEMS_STORAGE_KEY) syncItems();
    }

    window.addEventListener(ITEMS_UPDATED_EVENT, syncItems);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener(ITEMS_UPDATED_EVENT, syncItems);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item: Item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [items, search, activeCategory]);

  return {
    items: filtered,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
  };
}
