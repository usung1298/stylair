import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Header 컴포넌트: 네비게이션, 로그인/로그아웃, 다크모드 토글
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, isDark, toggleTheme, showToast } = useAppContext();

  const isActive = (path: string) => location.pathname === path ? 'nav-btn active' : 'nav-btn';

  const handleLogout = () => {
    setUser(null);
    showToast('로그아웃 되었습니다');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>✦ STYLAIR</div>
      <nav className="nav">
        <button className={isActive('/')} onClick={() => navigate('/')}>홈</button>
        <button className={isActive('/mypage')} onClick={() => navigate('/mypage')}>마이페이지</button>
        {!user && (
          <button className={isActive('/login')} onClick={() => navigate('/login')}>로그인</button>
        )}
      </nav>
      <div className="header-right">
        <button className="theme-btn" onClick={toggleTheme} title="테마 전환">
          {isDark ? '🌙' : '☀️'}
        </button>
        {user ? (
          <div className="user-badge" onClick={() => navigate('/mypage')}>
            <div className="avatar">{user.name.slice(0, 1).toUpperCase()}</div>
            <span>{user.name}</span>
            <button className="logout-btn" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>
              로그아웃
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
        )}
      </div>
    </header>
  );
}
