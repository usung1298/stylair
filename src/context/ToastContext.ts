// src/context/ToastContext.ts
import { createContext, useContext } from 'react';

export const ToastContext = createContext<(msg: string) => void>(() => {});

export function useToastContext() {
  return useContext(ToastContext);
}
