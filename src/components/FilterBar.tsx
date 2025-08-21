import React from 'react';
import type { FilterType } from '../types/todo';

interface Props {
  value: FilterType;
  onChange: (f: FilterType) => void;
}

const tabs: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
];

const FilterBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: 8, margin: '0 0 12px 0' }} role="tablist" aria-label="Filter todos">
      {tabs.map((t) => (
        <button
          key={t.key}
          role="tab"
          aria-selected={value === t.key}
          onClick={() => onChange(t.key)}
          style={{
            padding: '6px 10px',
            borderRadius: 8,
            border: '1px solid #555',
            background: value === t.key ? '#444' : 'transparent',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
