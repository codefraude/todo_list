import React, { useCallback } from "react";

const SearchBar: React.FC<{
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
}> = ({ value, onChange, onClear }) => {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") onClear?.();
    },
    [onClear]
  );

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12, width: "min(100%, 900px)" }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search todos..."
        aria-label="Search todos"
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #444",
          background: "#111",
          color: "#fff",
          outline: "none",
        }}
      />
      {value && (
        <button
          onClick={onClear}
          style={{
            padding: "0 12px",
            borderRadius: 8,
            border: "1px solid #555",
            background: "#333",
            color: "#fff",
            cursor: "pointer",
          }}
          aria-label="Clear search"
          title="Clear"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
