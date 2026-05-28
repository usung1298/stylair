import { useParams, useNavigate } from 'react-router-dom';
import { OUTFITS } from '../assets/data';
import { useAppContext } from '../context/AppContext';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { likedOutfits, toggleLike, user, showToast } = useAppContext();

  const outfit = OUTFITS.find(o => o.id === Number(id));
  if (!outfit) { navigate('/404'); return null; }

  const liked = likedOutfits.includes(outfit.id);

  const handleLike = () => {
    if (!user) { showToast('로그인 후 찜하기가 가능합니다 💛'); navigate('/login'); return; }
    toggleLike(outfit.id);
    showToast(liked ? '찜 목록에서 제거됐어요' : '찜 목록에 추가됐어요 ❤️');
  };

  return (
    <div className="detail-wrap">
      <button className="back-btn" onClick={() => navigate(-1)}>← 목록으로</button>
      <div className="detail-grid">
        <div className="detail-img-wrap">
          <img
            src={outfit.image}
            alt={outfit.title}
            className="detail-img"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
            }}
          />
          <div className="detail-img-fallback hidden">{outfit.emoji}</div>
        </div>
        <div className="detail-info">
          <div className="detail-tags">
            {[...outfit.tags, outfit.season, outfit.style].map(t => (
              <span key={t} className="detail-tag">{t}</span>
            ))}
          </div>
          <h1>{outfit.title}</h1>
          <div className="detail-brand">{outfit.brand}</div>
          <div className="detail-price">{outfit.price}</div>
          <p className="detail-desc">{outfit.desc}</p>
          <div className="detail-items">
            <h3>구성 아이템</h3>
            {outfit.items.map(item => (
              <div key={item.name} className="item-row">
                <span className="item-emoji">{item.emoji}</span>
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="detail-actions">
            <button className={`like-btn-lg${liked ? ' liked' : ''}`} onClick={handleLike}>
              {liked ? '❤️ 찜됨' : '🤍 찜하기'}
            </button>
            <button className="buy-btn" onClick={() => navigate(`/purchase/${outfit.id}`)}>
              🛍️ 구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}