import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, isDark, toggleTheme, showToast, cart } = useAppContext();

  const isActive = (path: string) => location.pathname === path ? 'nav-btn active' : 'nav-btn';

  const handleLogout = () => {
    setUser(null);
    showToast('로그아웃 되었습니다');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>STYLAIR</div>
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

        {/* 장바구니 버튼 */}
        <button className="cart-btn" onClick={() => navigate('/cart')} title="장바구니">
          🛒
          {cart.length > 0 && (
            <span className="cart-badge">{cart.length}</span>
          )}
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