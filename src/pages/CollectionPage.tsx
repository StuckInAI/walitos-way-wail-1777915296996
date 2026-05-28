import { useItems } from '../hooks/useItems';
import ItemCard from '../components/ItemCard';

export default function CollectionPage() {
  const { allItems } = useItems();

  const byCategory: Record<string, typeof allItems> = {};
  allItems.forEach((item) => {
    if (!byCategory[item.category]) byCategory[item.category] = [];
    byCategory[item.category].push(item);
  });

  const sortedCategories = Object.keys(byCategory).sort();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#f0f0ff' }}>Full Collection</h1>
      <p style={{ fontSize: 13, color: '#8888AA', marginBottom: 48 }}>
        Everything, organized by category. {allItems.length} picks total.
      </p>

      {sortedCategories.map((cat) => (
        <div key={cat} style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: '#FF4D00',
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: '1px solid #1a1a28',
          }}>
            {cat} ({byCategory[cat].length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {byCategory[cat].map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
