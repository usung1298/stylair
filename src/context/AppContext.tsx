import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, User, CartItem } from '../types';

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}

interface Props { children: ReactNode; }

export function AppProvider({ children }: Props) {
  const [user, setUserState] = useState<User | null>(null);
  const [likedOutfits, setLikedOutfits] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('stylair_state');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.user) setUserState(s.user);
        if (s.likedOutfits) setLikedOutfits(s.likedOutfits);
        if (s.cart) setCart(s.cart);
        if (typeof s.isDark === 'boolean') setIsDark(s.isDark);
      } catch (_) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stylair_state', JSON.stringify({ user, likedOutfits, cart, isDark }));
  }, [user, likedOutfits, cart, isDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const setUser = (u: User | null) => setUserState(u);

  const toggleLike = (id: number) => {
    setLikedOutfits(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      if (prev.find(c => c.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      likedOutfits, toggleLike,
      cart, addToCart, removeFromCart, clearCart,
      isDark, toggleTheme,
      showToast,
    }}>
      {children}
      <div className={'toast' + (toastVisible ? ' show' : '')}>{toast}</div>
    </AppContext.Provider>
  );
}