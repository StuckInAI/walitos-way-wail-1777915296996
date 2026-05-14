import { useState } from 'react';
import { defaultItems } from '@/data/items';
import type { Item } from '@/types';

const STORAGE_KEY = 'walitos-items';

function loadItems(): Item[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Item[];
  } catch {
    // ignore
  }
  return defaultItems;
}

function saveItems(items: Item[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useAdminItems() {
  const [items, setItems] = useState<Item[]>(loadItems);

  function addItem(data: Omit<Item, 'id'>): void {
    const newItem: Item = { ...data, id: crypto.randomUUID() };
    const updated = [newItem, ...items];
    setItems(updated);
    saveItems(updated);
  }

  function updateItem(id: string, data: Omit<Item, 'id'>): void {
    const updated = items.map((item) =>
      item.id === id ? { ...data, id } : item
    );
    setItems(updated);
    saveItems(updated);
  }

  function deleteItem(id: string): void {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveItems(updated);
  }

  return { items, addItem, updateItem, deleteItem };
}
