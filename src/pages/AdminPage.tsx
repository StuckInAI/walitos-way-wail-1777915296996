import { useState, useRef } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Search,
  Eye,
  EyeOff,
  Image,
  Link,
  Star,
  Tag,
  Calendar,
} from 'lucide-react';
import { useAdminItems } from '@/hooks/useAdminItems';
import type { Item } from '@/data/items';
import styles from './AdminPage.module.css';

const EMPTY_ITEM: Omit<Item, 'id'> = {
  title: '',
  description: '',
  personalTake: '',
  category: 'gear',
  tags: [],
  rating: 5,
  image: '',
  link: '',
  dateAdded: new Date().toISOString().slice(0, 10),
  featured: false,
};

export default function AdminPage() {
  const { items, addItem, updateItem, deleteItem } = useAdminItems();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Item | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Item, 'id'>>(EMPTY_ITEM);
  const [tagInput, setTagInput] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = items.filter(
    (it) =>
      it.title.toLowerCase().includes(search.toLowerCase()) ||
      it.category.toLowerCase().includes(search.toLowerCase())
  );

  function openCreate() {
    setDraft({ ...EMPTY_ITEM, dateAdded: new Date().toISOString().slice(0, 10) });
    setTagInput('');
    setEditing(null);
    setCreating(true);
  }

  function openEdit(item: Item) {
    setDraft({
      title: item.title,
      description: item.description,
      personalTake: item.personalTake,
      category: item.category,
      tags: [...item.tags],
      rating: item.rating,
      image: item.image,
      link: item.link ?? '',
      dateAdded: item.dateAdded,
      featured: item.featured ?? false,
    });
    setTagInput('');
    setEditing(item);
    setCreating(false);
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
  }

  function handleSave() {
    if (!draft.title.trim()) return;
    if (editing) {
      updateItem({ ...editing, ...draft });
    } else {
      addItem(draft);
    }
    closeForm();
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (t && !draft.tags.includes(t)) {
      setDraft((d) => ({ ...d, tags: [...d.tags, t] }));
    }
    setTagInput('');
  }

  function removeTag(tag: string) {
    setDraft((d) => ({ ...d, tags: d.tags.filter((t) => t !== tag) }));
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.heading}>Admin</h1>
          <p className={styles.subheading}>{items.length} items in collection</p>
        </div>
        <button className={styles.addBtn} onClick={openCreate}>
          <Plus size={14} />
          Add Item
        </button>
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <Search size={14} className={styles.searchIcon} />
        <input
          ref={searchRef}
          className={styles.searchInput}
          placeholder="Search items…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Form */}
      {(creating || editing) && (
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>{editing ? 'Edit Item' : 'New Item'}</h2>
            <button className={styles.iconBtn} onClick={closeForm}>
              <X size={16} />
            </button>
          </div>

          <div className={styles.formGrid}>
            {/* Title */}
            <label className={styles.label}>
              Title
              <input
                className={styles.input}
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                placeholder="Item title"
              />
            </label>

            {/* Category */}
            <label className={styles.label}>
              Category
              <input
                className={styles.input}
                value={draft.category}
                onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                placeholder="e.g. gear, food, place"
              />
            </label>

            {/* Image URL */}
            <label className={`${styles.label} ${styles.spanFull}`}>
              <span className={styles.labelInner}>
                <Image size={12} /> Image URL
              </span>
              <input
                className={styles.input}
                value={draft.image}
                onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
                placeholder="https://…"
              />
            </label>

            {/* Link */}
            <label className={`${styles.label} ${styles.spanFull}`}>
              <span className={styles.labelInner}>
                <Link size={12} /> Link
              </span>
              <input
                className={styles.input}
                value={draft.link ?? ''}
                onChange={(e) => setDraft((d) => ({ ...d, link: e.target.value }))}
                placeholder="https://…"
              />
            </label>

            {/* Description */}
            <label className={`${styles.label} ${styles.spanFull}`}>
              Description
              <textarea
                className={styles.textarea}
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                rows={2}
                placeholder="Short description"
              />
            </label>

            {/* Personal Take */}
            <label className={`${styles.label} ${styles.spanFull}`}>
              Personal Take
              <textarea
                className={styles.textarea}
                value={draft.personalTake}
                onChange={(e) => setDraft((d) => ({ ...d, personalTake: e.target.value }))}
                rows={3}
                placeholder="Your honest opinion…"
              />
            </label>

            {/* Rating */}
            <label className={styles.label}>
              <span className={styles.labelInner}>
                <Star size={12} /> Rating
              </span>
              <input
                className={styles.input}
                type="number"
                min={1}
                max={5}
                value={draft.rating}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, rating: Math.min(5, Math.max(1, Number(e.target.value))) }))
                }
              />
            </label>

            {/* Date */}
            <label className={styles.label}>
              <span className={styles.labelInner}>
                <Calendar size={12} /> Date Added
              </span>
              <input
                className={styles.input}
                type="date"
                value={draft.dateAdded}
                onChange={(e) => setDraft((d) => ({ ...d, dateAdded: e.target.value }))}
              />
            </label>

            {/* Featured */}
            <label className={`${styles.label} ${styles.checkLabel}`}>
              <input
                type="checkbox"
                checked={draft.featured ?? false}
                onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))}
              />
              <span className={styles.labelInner}>
                {draft.featured ? <Eye size={12} /> : <EyeOff size={12} />}
                Featured
              </span>
            </label>

            {/* Tags */}
            <div className={`${styles.label} ${styles.spanFull}`}>
              <span className={styles.labelInner}>
                <Tag size={12} /> Tags
              </span>
              <div className={styles.tagRow}>
                <input
                  className={styles.input}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tag…"
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                />
                <button className={styles.tagAddBtn} onClick={addTag} type="button">
                  Add
                </button>
              </div>
              <div className={styles.tagList}>
                {draft.tags.map((t) => (
                  <span key={t} className={styles.tagChip}>
                    {t}
                    <button className={styles.tagRemove} onClick={() => removeTag(t)} type="button">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button className={styles.cancelBtn} onClick={closeForm}>
              Cancel
            </button>
            <button className={styles.saveBtn} onClick={handleSave} disabled={!draft.title.trim()}>
              <Save size={14} />
              {editing ? 'Save Changes' : 'Create Item'}
            </button>
          </div>
        </div>
      )}

      {/* Item list */}
      <div className={styles.list}>
        {filtered.length === 0 && (
          <p className={styles.empty}>No items found.</p>
        )}
        {filtered.map((item) => (
          <div key={item.id} className={styles.row}>
            <img src={item.image} alt={item.title} className={styles.rowThumb} />
            <div className={styles.rowInfo}>
              <span className={styles.rowTitle}>{item.title}</span>
              <span className={styles.rowMeta}>{item.category} · ★{item.rating}</span>
            </div>
            <div className={styles.rowActions}>
              <button className={styles.iconBtn} onClick={() => openEdit(item)} title="Edit">
                <Edit3 size={14} />
              </button>
              {confirmDelete === item.id ? (
                <>
                  <button
                    className={styles.deleteConfirmBtn}
                    onClick={() => { deleteItem(item.id); setConfirmDelete(null); }}
                  >
                    Confirm
                  </button>
                  <button className={styles.iconBtn} onClick={() => setConfirmDelete(null)}>
                    <X size={14} />
                  </button>
                </>
              ) : (
                <button
                  className={`${styles.iconBtn} ${styles.deleteBtn}`}
                  onClick={() => setConfirmDelete(item.id)}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
