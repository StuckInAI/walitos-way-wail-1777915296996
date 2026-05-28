import { useState, useRef } from 'react';
import { useItems } from '../hooks/useItems';
import { Plus, Trash2 } from 'lucide-react';
import type { Item } from '../data/items';

export default function AdminPage() {
  const { allItems, addItem, removeItem } = useItems();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('tech');
  const [personalTake, setPersonalTake] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [tags, setTags] = useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: Item = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      category,
      image: imageUrl.trim() || 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=90',
      rating,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      link: link.trim() || undefined,
      personalTake: personalTake.trim(),
      dateAdded: new Date().toISOString().slice(0, 7),
      featured: false,
    };

    addItem(newItem);
    setTitle('');
    setDescription('');
    setPersonalTake('');
    setLink('');
    setImageUrl('');
    setTags('');
    setRating(5);
  };

  const handleFileSelect = (): void => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const result = ev.target?.result;
      if (typeof result === 'string') setImageUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: '#0a0a10',
    border: '1px solid #1a1a28',
    borderRadius: 8,
    color: '#f0f0ff',
    fontSize: 13,
    outline: 'none',
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#f0f0ff' }}>Admin</h1>
      <p style={{ fontSize: 13, color: '#8888AA', marginBottom: 40 }}>Add and manage your picks.</p>

      {/* Add form */}
      <form onSubmit={handleSubmit} style={{
        padding: 28,
        borderRadius: 16,
        background: '#0c0c14',
        border: '1px solid #1a1a28',
        marginBottom: 48,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f0f0ff', marginBottom: 4 }}>Add New Pick</h3>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <textarea
          placeholder="Personal take — why you picked this"
          value={personalTake}
          onChange={(e) => setPersonalTake(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="tech">Tech</option>
            <option value="style">Style</option>
            <option value="travel">Travel</option>
            <option value="food">Food & Drink</option>
            <option value="grooming">Grooming</option>
            <option value="books">Books</option>
            <option value="home">Home</option>
            <option value="watches">Watches</option>
            <option value="wellness">Wellness</option>
          </select>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={inputStyle}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} star{r !== 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Image URL (or upload below)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={inputStyle}
        />

        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ fontSize: 12, color: '#8888AA' }}
          />
        </div>

        <input
          type="text"
          placeholder="Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '12px 24px',
          borderRadius: 999,
          background: '#FF4D00',
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}>
          <Plus size={14} />
          Add Pick
        </button>
      </form>

      {/* Items list */}
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f0f0ff', marginBottom: 16 }}>
        Current Picks ({allItems.length})
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {allItems.map((item) => (
          <div key={item.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: 10,
            background: '#0c0c14',
            border: '1px solid #1a1a28',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
                background: '#0a0a10',
              }}>
                <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#f0f0ff' }}>{item.title}</p>
                <p style={{ fontSize: 11, color: '#44445A' }}>{item.category} · {item.dateAdded}</p>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              type="button"
              style={{
                width: 32, height: 32, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,45,107,0.1)', color: '#FF2D6B',
                border: 'none', cursor: 'pointer',
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
