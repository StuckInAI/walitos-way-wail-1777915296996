import type { Category } from '../data/items';

interface Props {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div style={{
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
    }}>
      {categories.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            type="button"
            style={{
              padding: '6px 16px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: isActive ? 700 : 500,
              background: isActive ? '#fff' : 'transparent',
              color: isActive ? '#050508' : '#8888AA',
              border: isActive ? 'none' : '1px solid #1a1a28',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
