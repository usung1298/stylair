import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, User } from '../types';

const AppContext = createContext<AppContextType | null>(null);

// useContext hook wrapper
export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}

interface Props { children: ReactNode; }

export function AppProvider({ children }: Props) {
  // useState: 사용자 로그인 상태
  const [user, setUserState] = useState<User | null>(null);
  // useState: 찜한 코디 목록
  const [likedOutfits, setLikedOutfits] = useState<number[]>([]);
  // useState: 다크모드 상태
  const [isDark, setIsDark] = useState(true);
  // useState: 토스트 메시지
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // useEffect: LocalStorage에서 상태 복원
  useEffect(() => {
    const saved = localStorage.getItem('stylair_state');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.user) setUserState(s.user);
        if (s.likedOutfits) setLikedOutfits(s.likedOutfits);
        if (typeof s.isDark === 'boolean') setIsDark(s.isDark);
      } catch (_) {}
    }
  }, []);

  // useEffect: 상태 변경 시 LocalStorage 저장
  useEffect(() => {
    localStorage.setItem('stylair_state', JSON.stringify({ user, likedOutfits, isDark }));
  }, [user, likedOutfits, isDark]);

  // useEffect: 다크모드 class 적용
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const setUser = (u: User | null) => setUserState(u);

  const toggleLike = (id: number) => {
    setLikedOutfits(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleTheme = () => setIsDark(prev => !prev);

  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  return (
    <AppContext.Provider value={{ user, setUser, likedOutfits, toggleLike, isDark, toggleTheme, showToast }}>
      {children}
      <div className={`toast${toastVisible ? ' show' : ''}`}>{toast}</div>
    </AppContext.Provider>
  );
}
