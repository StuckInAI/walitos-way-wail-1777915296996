import { useState, useEffect } from 'react';
import { ITEMS } from '@/data/items';
import type { Item } from '@/data/items';

const STORAGE_KEY = 'walitos_way_items';

function loadItems(): Item[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Item[];
  } catch {
    // ignore
  }
  return ITEMS;
}

export function useItems(): Item[] {
  const [items, setItems] = useState<Item[]>(loadItems);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return items;
}
