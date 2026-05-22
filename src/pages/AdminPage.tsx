import { useState } from 'react';
import { Plus, Trash2, Save, Image } from 'lucide-react';
import { useItems } from '@/hooks/useItems';
import styles from './AdminPage.module.css';

const CATEGORIES = ['grooming', 'food', 'tech', 'style', 'travel', 'books', 'home', 'watches', 'wellness'];

export default function AdminPage() {
  const { allItems, addItem, removeItem } = useItems();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'tech',
    image: '',
    personalTake: '',
    tags: '',
    link: '',
    rating: '5',
    featured: false,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox'
      ? target.checked
      : target.value;
    setForm((f) => ({ ...f, [target.name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      title: form.title,
      description: form.description,
      category: form.category,
      image: form.image || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=90',
      personalTake: form.personalTake,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      link: form.link || undefined,
      rating: parseInt(form.rating, 10),
      featured: form.featured,
      dateAdded: new Date().toISOString().slice(0, 7),
    });
    setForm({ title: '', description: '', category: 'tech', image: '', personalTake: '', tags: '', link: '', rating: '5', featured: false });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Backend</span>
        <h1 className={styles.title}>Admin</h1>
        <p className={styles.subtitle}>Add and manage picks. Stored locally in your browser.</p>
      </div>

      <div className={styles.layout}>
        {/* Form */}
        <div className={styles.formSection}>
          <div className={styles.sectionLabel}>Add New Pick</div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} className={styles.input} placeholder="Product or place name" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} className={styles.textarea} placeholder="One line description" required rows={2} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Personal Take *</label>
              <textarea name="personalTake" value={form.personalTake} onChange={handleChange} className={styles.textarea} placeholder="Your first-person story. The specific detail that proves you've used it." required rows={3} />
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Category</label>
                <select name="category" value={form.category} onChange={handleChange} className={styles.select}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Rating (1–5)</label>
                <select name="rating" value={form.rating} onChange={handleChange} className={styles.select}>
                  {[5,4,3,2,1].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                <Image size={11} style={{display:'inline',marginRight:4}} />
                Image URL
              </label>
              <input name="image" value={form.image} onChange={handleChange} className={styles.input} placeholder="https://... (leave blank for default)" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Link (optional)</label>
              <input name="link" value={form.link} onChange={handleChange} className={styles.input} placeholder="https://..." />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Tags (comma separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} className={styles.input} placeholder="tech, ai, productivity" />
            </div>
            <div className={styles.checkRow}>
              <input type="checkbox" name="featured" id="featured" checked={form.featured} onChange={handleChange} className={styles.checkbox} />
              <label htmlFor="featured" className={styles.checkLabel}>Featured pick</label>
            </div>
            <button type="submit" className={styles.submitBtn}>
              <Plus size={14} />
              {saved ? 'Saved!' : 'Add Pick'}
              {!saved && <Save size={12} />}
            </button>
          </form>
        </div>

        {/* Existing picks */}
        <div className={styles.listSection}>
          <div className={styles.sectionLabel}>All Picks ({allItems.length})</div>
          <div className={styles.pickList}>
            {allItems.map((item) => (
              <div key={item.id} className={styles.pickRow}>
                <div className={styles.pickImgWrap}>
                  <img src={item.image} alt={item.title} className={styles.pickImg} />
                </div>
                <div className={styles.pickInfo}>
                  <span className={styles.pickTitle}>{item.title}</span>
                  <span className={styles.pickCat}>{item.category} · {item.dateAdded}</span>
                </div>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => removeItem(item.id)}
                  title="Remove"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
