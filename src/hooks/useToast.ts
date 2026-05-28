// src/hooks/useToast.ts
import { useState, useCallback } from 'react';

// useState + useCallback을 활용한 토스트 알림 hook
export function useToast() {
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2800);
  }, []);

  return { message, visible, showToast };
}
