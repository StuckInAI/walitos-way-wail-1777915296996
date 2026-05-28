import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 18px',
      borderRadius: 999,
      background: '#0a0a10',
      border: '1px solid #1a1a28',
      minWidth: 240,
    }}>
      <Search size={14} color="#44445A" />
      <input
        type="text"
        placeholder="Search picks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#f0f0ff',
          fontSize: 13,
        }}
      />
    </div>
  );
}
