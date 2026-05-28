import { useNavigate } from 'react-router-dom';
import { Outfit } from '../types';
import { useAppContext } from '../context/AppContext';

// OutfitCard 컴포넌트 Props 인터페이스
interface OutfitCardProps {
  outfit: Outfit;
}

// OutfitCard 컴포넌트: 코디 카드 UI
export default function OutfitCard({ outfit }: OutfitCardProps) {
  const navigate = useNavigate();
  const { likedOutfits, toggleLike, user, showToast } = useAppContext();
  const liked = likedOutfits.includes(outfit.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      showToast('로그인 후 찜하기가 가능합니다 💛');
      navigate('/login');
      return;
    }
    toggleLike(outfit.id);
    showToast(liked ? '찜 목록에서 제거됐어요' : '찜 목록에 추가됐어요 ❤️');
  };

  return (
    <div className="outfit-card" onClick={() => navigate(`/detail/${outfit.id}`)}>
      <div className="card-img">
        <div className="card-img-inner">{outfit.emoji}</div>
        <div className="card-overlay">
          {outfit.tags.slice(0, 2).map(tag => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="card-body">
        <div className="card-title">{outfit.title}</div>
        <div className="card-brand">{outfit.brand}</div>
        <div className="card-bottom">
          <span className="card-price">{outfit.price}</span>
          <button
            className={`like-btn${liked ? ' liked' : ''}`}
            onClick={handleLike}
            aria-label="찜하기"
          >
            {liked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}
