import React from 'react';
import type { ToastMessage } from '../types/todo';

const Toast: React.FC<{ toast: ToastMessage; onClose: () => void }> = ({ toast, onClose }) => {
  if (!toast.visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        background: '#333',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: 8,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 6px 22px rgba(0,0,0,0.35)',
      }}
    >
      <span>{toast.message}</span>
      <button
        style={{ background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16 }}
        onClick={onClose}
        aria-label="Close toast"
        title="Close"
      >
        ✖
      </button>
    </div>
  );
};

export default Toast;
