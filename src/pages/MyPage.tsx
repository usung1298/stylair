import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { OUTFITS } from '../assets/data';
import OutfitCard from '../components/OutfitCard';

// MyPage: 찜한 코디 목록 및 사용자 정보
export default function MyPage() {
  const navigate = useNavigate();
  const { user, likedOutfits } = useAppContext();

  // 로그인 안 된 경우 리다이렉트
  if (!user) { navigate('/login'); return null; }

  const liked = OUTFITS.filter(o => likedOutfits.includes(o.id));

  return (
    <div className="mypage-wrap">
      {/* 사용자 프로필 */}
      <div className="mypage-hero">
        <div className="avatar-lg">{user.name.slice(0, 1).toUpperCase()}</div>
        <div>
          <div className="mypage-name">{user.name}</div>
          <div className="mypage-email">{user.email}</div>
          <div className="style-prefs">
            {user.preferredStyles.map(s => <span key={s} className="style-pref">{s}</span>)}
          </div>
        </div>
      </div>

      {/* 찜 목록 */}
      <div className="section-header">
        <div className="section-title">❤️ 찜한 코디</div>
        <div className="result-count">{liked.length}개</div>
      </div>

      {liked.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💔</div>
          <div className="empty-title">아직 찜한 코디가 없어요</div>
          <p className="empty-desc" style={{ marginBottom: '1.5rem' }}>마음에 드는 코디를 찜해보세요</p>
          <button className="btn-primary" onClick={() => navigate('/')}>코디 보러가기</button>
        </div>
      ) : (
        <div className="outfit-grid">
          {liked.map(o => <OutfitCard key={o.id} outfit={o} />)}
        </div>
      )}
    </div>
  );
}
