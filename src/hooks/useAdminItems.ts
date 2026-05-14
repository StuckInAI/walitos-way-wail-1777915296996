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

function saveItems(items: Item[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function useAdminItems() {
  const [items, setItems] = useState<Item[]>(loadItems);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  function addItem(data: Omit<Item, 'id'>): void {
    const newItem: Item = {
      ...data,
      id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    };
    setItems((prev) => [newItem, ...prev]);
  }

  function updateItem(id: string, data: Omit<Item, 'id'>): void {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...data, id } : item))
    );
  }

  function deleteItem(id: string): void {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return { items, addItem, updateItem, deleteItem };
}
