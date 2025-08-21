import { useCallback, useState } from 'react';
import type { ToastMessage } from '../types/todo';

export function useToast(initial?: Partial<ToastMessage>) {
  const [toast, setToast] = useState<ToastMessage>({
    message: initial?.message ?? '',
    visible: initial?.visible ?? false,
  });

  const showToast = useCallback((message: string, ms = 2500) => {
    setToast({ message, visible: true });
    window.setTimeout(() => setToast({ message: '', visible: false }), ms);
  }, []);

  const hideToast = useCallback(() => {
    setToast({ message: '', visible: false });
  }, []);

  return { toast, showToast, hideToast };
}
