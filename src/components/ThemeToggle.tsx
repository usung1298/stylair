import { useAppContext } from '../context/AppContext';

// ThemeToggle 컴포넌트: 독립적으로 재사용 가능한 다크모드 토글
interface ThemeToggleProps {
  size?: 'sm' | 'md';
}

export default function ThemeToggle({ size = 'md' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useAppContext();
  return (
    <button
      className={`theme-toggle theme-toggle--${size}`}
      onClick={toggleTheme}
      aria-label="테마 전환"
    >
      {isDark ? '🌙 다크' : '☀️ 라이트'}
    </button>
  );
}
