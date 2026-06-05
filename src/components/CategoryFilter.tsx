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
      gap: 4,
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
              padding: '7px 18px',
              fontSize: 10,
              fontWeight: 900,
              background: isActive ? '#ff4d00' : 'transparent',
              color: isActive ? '#000' : '#555',
              border: isActive ? '2px solid #ff4d00' : '2px solid #1a1a1a',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
