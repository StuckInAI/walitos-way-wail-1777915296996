import { categories } from '../data/items';
import { useItems } from '../hooks/useItems';
import ItemCard from '../components/ItemCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Hero from '../components/Hero';

export default function HomePage() {
  const { items, search, setSearch, activeCategory, setActiveCategory } = useItems();

  return (
    <div>
      <Hero />

      {/* Toolbar */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        marginBottom: 32,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px 80px',
      }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: 32, color: '#1a1a28', marginBottom: 12 }}>—</p>
            <p style={{ color: '#8888AA', fontSize: 14 }}>Nothing found.</p>
            <p style={{ color: '#44445A', fontSize: 12, marginTop: 4 }}>Try a different search or category.</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 12, color: '#44445A', marginBottom: 20 }}>
              {items.length} {items.length === 1 ? 'pick' : 'picks'}
              {activeCategory !== 'all' && (
                <span style={{ color: '#FF4D00' }}> in {activeCategory}</span>
              )}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #1a1a28',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#FF4D00', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px', color: '#fff', fontWeight: 800, fontSize: 14,
        }}>W</div>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#f0f0ff' }}>Walito's Way</p>
        <p style={{ fontSize: 12, color: '#44445A', marginTop: 4 }}>Everything here I've paid for myself.</p>
      </footer>
    </div>
  );
}
