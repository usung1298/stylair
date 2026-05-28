import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Sidebar 컴포넌트: 모바일 메뉴
interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const go = (path: string) => { navigate(path); onClose(); };

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-logo">✦ STYLAIR</div>
        <nav className="sidebar-nav">
          <button onClick={() => go('/')}>🏠 홈</button>
          {user && <button onClick={() => go('/mypage')}>❤️ 마이페이지</button>}
          {!user && <button onClick={() => go('/login')}>🔑 로그인</button>}
        </nav>
      </aside>
    </>
  );
}
