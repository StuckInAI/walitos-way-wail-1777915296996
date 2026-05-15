import { useState } from 'react';
import {
  Plus, Trash2, Edit3, Save, X, Eye, EyeOff,
  Image as ImageIcon, Link as LinkIcon, Tag, Star,
} from 'lucide-react';
import { useAdminItems } from '@/hooks/useAdminItems';
import type { Item } from '@/types';
import styles from './AdminPage.module.css';

type Draft = Omit<Item, 'id'>;

const EMPTY_DRAFT: Draft = {
  title: '',
  description: '',
  category: '',
  image: '',
  rating: 5,
  tags: [],
  link: '',
  personalTake: '',
  dateAdded: new Date().toISOString().slice(0, 10),
  featured: false,
};

function isDraftDirty(draft: Draft, item: Item): boolean {
  return (
    draft.title !== item.title ||
    draft.description !== item.description ||
    draft.category !== item.category ||
    draft.image !== item.image ||
    draft.rating !== item.rating ||
    draft.personalTake !== item.personalTake ||
    draft.dateAdded !== item.dateAdded ||
    (draft.link ?? '') !== (item.link ?? '') ||
    (draft.featured ?? false) !== (item.featured ?? false) ||
    draft.tags.length !== item.tags.length ||
    draft.tags.some((tag, i) => tag !== item.tags[i])
  );
}

export default function AdminPage() {
  const { items, addItem, updateItem, deleteItem } = useAdminItems();
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [editing, setEditing] = useState<Item | null>(null);
  const [tagInput, setTagInput] = useState('');

  function startEdit(item: Item) {
    setEditing(item);
    setDraft({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      rating: item.rating,
      tags: item.tags,
      link: item.link ?? '',
      personalTake: item.personalTake,
      dateAdded: item.dateAdded,
      featured: item.featured ?? false,
    });
  }

  function cancelEdit() {
    setEditing(null);
    setDraft(EMPTY_DRAFT);
    setTagInput('');
  }

  function handleSaveChanges() {
    if (!editing || !draft.title.trim()) return;
    updateItem(editing.id, { ...draft });
    setEditing({ ...draft, id: editing.id });
  }

  function handleSaveAndClose() {
    if (!draft.title.trim()) return;
    if (editing) {
      updateItem(editing.id, { ...draft });
    } else {
      addItem({ ...draft });
    }
    cancelEdit();
  }

  function onImageFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) return;
    if (file.size > 400_000) {
      window.alert(
        'Image is too large to store locally. Use an image URL instead (under 400KB for uploads).'
      );
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setDraft((d) => ({ ...d, image: url }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  const formDirty = editing != null && isDraftDirty(draft, editing);

  function addTag() {
    const t = tagInput.trim();
    if (t && !draft.tags.includes(t)) {
      setDraft((d) => ({ ...d, tags: [...d.tags, t] }));
    }
    setTagInput('');
  }

  function removeTag(tag: string) {
    setDraft((d) => ({ ...d, tags: d.tags.filter((x) => x !== tag) }));
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Admin Panel</h1>
        <p className={styles.pageSubtitle}>Manage your curated picks</p>
      </div>

      <div className={styles.layout}>
        {/* ── FORM ── */}
        <aside className={styles.formPanel}>
          <div className={styles.formHeader}>
            <span>{editing ? 'Edit Item' : 'Add New Item'}</span>
            {editing && (
              <button className={styles.cancelBtn} onClick={cancelEdit}>
                <X size={14} /> Cancel
              </button>
            )}
          </div>

          <div className={styles.formBody}>
            {/* Title */}
            <label className={styles.label}>
              Title
              <input
                className={styles.input}
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                placeholder="e.g. Aesop Resurrection Rinse"
              />
            </label>

            {/* Description */}
            <label className={styles.label}>
              Description
              <textarea
                className={styles.textarea}
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                placeholder="Short description..."
                rows={3}
              />
            </label>

            {/* Personal Take */}
            <label className={styles.label}>
              Personal Take
              <textarea
                className={styles.textarea}
                value={draft.personalTake}
                onChange={(e) => setDraft((d) => ({ ...d, personalTake: e.target.value }))}
                placeholder="Why I love this..."
                rows={3}
              />
            </label>

            {/* Category */}
            <label className={styles.label}>
              Category
              <input
                className={styles.input}
                value={draft.category}
                onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                placeholder="e.g. grooming, food, tech"
              />
            </label>

            {/* Image */}
            <div className={styles.imageSection}>
              <label className={styles.label} htmlFor="admin-item-image-file">
                <span className={styles.labelIcon}>
                  <ImageIcon size={12} /> Image
                </span>
              </label>
              <input
                id="admin-item-image-file"
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={onImageFilePick}
              />
              <label
                htmlFor="admin-item-image-file"
                className={styles.imagePreview}
                style={
                  draft.image
                    ? { backgroundImage: `url(${draft.image})` }
                    : undefined
                }
              >
                {!draft.image ? (
                  <span className={styles.imagePlaceholder}>
                    <ImageIcon size={28} strokeWidth={1.25} />
                    Click to upload
                  </span>
                ) : (
                  <span className={styles.imageChangeHint}>Change image</span>
                )}
              </label>

              <p className={styles.imageOrDivider}>or paste URL</p>
              <input
                className={styles.input}
                value={draft.image}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, image: e.target.value }))
                }
                placeholder="https://..."
              />

            </div>

            {/* Link */}
            <label className={styles.label}>
              <span className={styles.labelIcon}><LinkIcon size={12} /> Link (optional)</span>
              <input
                className={styles.input}
                value={draft.link ?? ''}
                onChange={(e) => setDraft((d) => ({ ...d, link: e.target.value }))}
                placeholder="https://..."
              />
            </label>

            {/* Rating */}
            <label className={styles.label}>
              <span className={styles.labelIcon}><Star size={12} /> Rating</span>
              <input
                type="number"
                min={1}
                max={5}
                className={styles.input}
                value={draft.rating}
                onChange={(e) => setDraft((d) => ({ ...d, rating: Number(e.target.value) }))}
              />
            </label>

            {/* Date Added */}
            <label className={styles.label}>
              Date Added
              <input
                type="date"
                className={styles.input}
                value={draft.dateAdded}
                onChange={(e) => setDraft((d) => ({ ...d, dateAdded: e.target.value }))}
              />
            </label>

            {/* Tags */}
            <div className={styles.label}>
              <span className={styles.labelIcon}><Tag size={12} /> Tags</span>
              <div className={styles.tagInputRow}>
                <input
                  className={styles.input}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag + Enter"
                />
                <button className={styles.addTagBtn} onClick={addTag} type="button">Add</button>
              </div>
              <div className={styles.tagList}>
                {draft.tags.map((t) => (
                  <span key={t} className={styles.tagChip}>
                    {t}
                    <button onClick={() => removeTag(t)} type="button"><X size={10} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Featured toggle */}
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={draft.featured ?? false}
                onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))}
              />
              <span className={styles.toggleIcon}>
                {draft.featured ? <Eye size={12} /> : <EyeOff size={12} />}
              </span>
              Featured
            </label>

            <div className={styles.formActions}>
              {editing ? (
                <>
                  <button
                    className={styles.saveChangesBtn}
                    type="button"
                    disabled={!formDirty}
                    onClick={handleSaveChanges}
                  >
                    <Save size={14} />
                    Save changes
                  </button>
                  <button
                    className={styles.saveBtn}
                    type="button"
                    onClick={handleSaveAndClose}
                  >
                    <Save size={14} />
                    Save & close
                  </button>
                </>
              ) : (
                <button
                  className={styles.saveBtn}
                  type="button"
                  onClick={handleSaveAndClose}
                >
                  <Save size={14} />
                  Add item
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* ── LIST ── */}
        <section className={styles.listPanel}>
          <div className={styles.listHeader}>
            <span>{items.length} item{items.length !== 1 ? 's' : ''}</span>
            <button
              className={styles.newBtn}
              onClick={cancelEdit}
              type="button"
            >
              <Plus size={14} /> New
            </button>
          </div>

          <div className={styles.list}>
            {items.map((item) => (
              <div
                key={item.id}
                className={`${styles.listItem} ${
                  editing?.id === item.id ? styles.listItemActive : ''
                }`}
              >
                {item.image && (
                  <img src={item.image} alt="" className={styles.listThumb} />
                )}
                <div className={styles.listInfo}>
                  <span className={styles.listTitle}>{item.title}</span>
                  <span className={styles.listCategory}>{item.category}</span>
                </div>
                <div className={styles.listActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => startEdit(item)}
                    type="button"
                    title="Edit"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteItem(item.id)}
                    type="button"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
