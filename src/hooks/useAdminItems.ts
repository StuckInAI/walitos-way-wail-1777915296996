import { useState, useEffect } from 'react';
import { defaultItems } from '@/data/items';
import { loadStoredItems, saveStoredItems } from '@/lib/itemsStorage';
import type { Item } from '@/types';

export function useAdminItems() {
  const [items, setItems] = useState<Item[]>(defaultItems);

  useEffect(() => {
    setItems(loadStoredItems());
  }, []);

  function addItem(data: Omit<Item, 'id'>): void {
    const newItem: Item = { ...data, id: crypto.randomUUID() };
    const updated = [newItem, ...items];
    setItems(updated);
    saveStoredItems(updated);
  }

  function updateItem(id: string, data: Omit<Item, 'id'>): void {
    const updated = items.map((item) =>
      item.id === id ? { ...data, id } : item
    );
    setItems(updated);
    saveStoredItems(updated);
  }

  function deleteItem(id: string): void {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveStoredItems(updated);
  }

  return { items, addItem, updateItem, deleteItem };
}
