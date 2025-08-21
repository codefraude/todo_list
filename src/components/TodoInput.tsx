import React, { useCallback } from 'react';
import Button from './Buttons';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onAdd: () => void;
}

const TodoInput: React.FC<Props> = ({ value, onChange, onAdd }) => {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') onAdd();
    },
    [onAdd]
  );

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        marginBottom: 16,
        width: 'min(100%, 900px)',
      }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="New todo title"
        aria-label="New todo title"
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 8,
          border: '1px solid #444',
          background: '#111',
          color: '#fff',
          outline: 'none',
        }}
      />
      <Button label="Add" onClick={onAdd} variant="primary" />
    </div>
  );
};

export default TodoInput;
