import { useState, useRef } from 'react';
import { CATEGORIES } from '@/data/items';
import type { Item } from '@/data/items';
import { useAdminItems } from '@/hooks/useAdminItems';
import styles from './AdminPage.module.css';
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from 'lucide-react';

const EMPTY_FORM: Omit<Item, 'id'> = {
  title: '',
  category: 'gear',
  description: '',
  personalTake: '',
  tags: [],
  rating: 5,
  link: '',
  image: '',
  dateAdded: new Date().toLocaleString('default', { month: 'short', year: 'numeric' }),
};

const ADMIN_PASSWORD = 'walito2024';

export default function AdminPage() {
  const { items, addItem, updateItem, deleteItem } = useAdminItems();
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState<Omit<Item, 'id'>>(EMPTY_FORM);
  const [tagInput, setTagInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleLogin() {
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      setForm((f) => ({ ...f, image: result }));
    };
    reader.readAsDataURL(file);
  }

  function handleAddTag() {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) {
      setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput('');
  }

  function handleRemoveTag(tag: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description) return;
    if (editingId) {
      updateItem(editingId, form);
    } else {
      addItem(form);
    }
    setForm(EMPTY_FORM);
    setImagePreview('');
    setEditingId(null);
    setTagInput('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      personalTake: item.personalTake,
      tags: item.tags,
      rating: item.rating,
      link: item.link || '',
      image: item.image,
      dateAdded: item.dateAdded,
    });
    setImagePreview(item.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImagePreview('');
    setTagInput('');
  }

  function handleDelete(id: string) {
    if (deleteConfirm === id) {
      deleteItem(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  }

  if (!authed) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginBox}>
          <div className={styles.loginIcon}>
            <Lock size={28} />
          </div>
          <h2 className={styles.loginTitle}>Admin Access</h2>
          <p className={styles.loginSub}>Walito's Way — Content Manager</p>
          <div className={styles.loginField}>
            <div className={styles.pwWrap}>
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Enter password"
                value={pwInput}
                onChange={(e) => setPwInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className={`${styles.pwInput} ${pwError ? styles.pwInputError : ''}`}
              />
              <button
                type="button"
                className={styles.pwToggle}
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {pwError && <p className={styles.pwError}>Incorrect password</p>}
          </div>
          <button className={styles.loginBtn} onClick={handleLogin}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>
            {editingId ? 'Edit Pick' : 'Add New Pick'}
          </h1>
          <p className={styles.pageSub}>
            {editingId
              ? 'Update the details for this item'
              : `${items.length} total picks in the list`}
          </p>
        </div>
        {saved && (
          <div className={styles.savedBadge}>
            <CheckCircle size={15} />
            Saved!
          </div>
        )}
      </div>

      {/* Form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Image upload */}
        <div className={styles.imageSection}>
          <div
            className={styles.imagePreview}
            onClick={() => fileRef.current?.click()}
            style={imagePreview ? { backgroundImage: `url(${imagePreview})` } : {}}
          >
            {!imagePreview && (
              <div className={styles.imagePlaceholder}>
                <ImageIcon size={28} />
                <span>Click to upload image</span>
              </div>
            )}
            {imagePreview && <div className={styles.imageChangeHint}>Click to change</div>}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageFile}
            className={styles.fileInput}
          />
          <div className={styles.imageOrDivider}>
            <span>or paste image URL</span>
          </div>
          <input
            type="url"
            placeholder="https://..."
            value={form.image.startsWith('data:') ? '' : form.image}
            onChange={(e) => {
              setForm((f) => ({ ...f, image: e.target.value }));
              setImagePreview(e.target.value);
            }}
            className={styles.input}
          />
        </div>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.label}>Title *</label>
            <input
              type="text"
              placeholder="e.g. Sony WH-1000XM5"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={styles.select}
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label}>Short Description *</label>
            <input
              type="text"
              placeholder="One sentence that hooks the reader"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={styles.input}
              required
            />
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label}>Personal Take (Walito's voice)</label>
            <textarea
              placeholder="First-person, specific. What makes this irreplaceable to you?"
              value={form.personalTake}
              onChange={(e) => setForm((f) => ({ ...f, personalTake: e.target.value }))}
              className={styles.textarea}
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Link (optional)</label>
            <input
              type="url"
              placeholder="https://..."
              value={form.link}
              onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Date Added</label>
            <input
              type="text"
              placeholder="e.g. Jan 2024"
              value={form.dateAdded}
              onChange={(e) => setForm((f) => ({ ...f, dateAdded: e.target.value }))}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Rating (1–5)</label>
            <div className={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`${styles.ratingBtn} ${form.rating >= n ? styles.ratingBtnActive : ''}`}
                  onClick={() => setForm((f) => ({ ...f, rating: n }))}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label}>Tags</label>
            <div className={styles.tagInputRow}>
              <input
                type="text"
                placeholder="Add a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className={styles.input}
              />
              <button type="button" className={styles.tagAddBtn} onClick={handleAddTag}>
                <Plus size={15} /> Add
              </button>
            </div>
            <div className={styles.tagList}>
              {form.tags.map((tag) => (
                <span key={tag} className={styles.tagChip}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className={styles.tagRemove}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          {editingId && (
            <button type="button" className={styles.cancelBtn} onClick={cancelEdit}>
              <X size={15} /> Cancel
            </button>
          )}
          <button type="submit" className={styles.submitBtn}>
            {editingId ? (
              <><Save size={15} /> Update Pick</>
            ) : (
              <><Plus size={15} /> Add to the List</>
            )}
          </button>
        </div>
      </form>

      {/* Existing items */}
      <div className={styles.listSection}>
        <h2 className={styles.listTitle}>Current Picks</h2>
        <div className={styles.itemList}>
          {items.map((item) => (
            <div key={item.id} className={styles.listItem}>
              <div
                className={styles.listItemThumb}
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className={styles.listItemInfo}>
                <span className={styles.listItemTitle}>{item.title}</span>
                <span className={styles.listItemMeta}>
                  {item.category} · {item.dateAdded}
                </span>
              </div>
              <div className={styles.listItemActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => startEdit(item)}
                  title="Edit"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  className={`${styles.deleteBtn} ${deleteConfirm === item.id ? styles.deleteBtnConfirm : ''}`}
                  onClick={() => handleDelete(item.id)}
                  title={deleteConfirm === item.id ? 'Click again to confirm' : 'Delete'}
                >
                  <Trash2 size={14} />
                  {deleteConfirm === item.id && <span>Confirm?</span>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
