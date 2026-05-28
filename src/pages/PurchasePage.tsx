import { useParams, useNavigate } from 'react-router-dom';
import { OUTFITS } from '../assets/data';
import { useAppContext } from '../context/AppContext';

export default function PurchasePage() {
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

  const getMusinsaLink = (itemName: string) =>
    `https://search.musinsa.com/search/musinsa?q=${encodeURIComponent(itemName)}`;

  const totalPrice = outfit.items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + num;
  }, 0);

  return (
    <div className="purchase-wrap">
      <button className="back-btn" onClick={() => navigate(`/detail/${outfit.id}`)}>
        ← 코디 상세로
      </button>

      {/* 코디 헤더 */}
      <div className="purchase-header">
        <div className="purchase-img-wrap">
          <img
            src={outfit.image}
            alt={outfit.title}
            className="purchase-img"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="purchase-info">
          <div className="detail-tags" style={{ marginBottom: '1rem' }}>
            {[...outfit.tags, outfit.season, outfit.style].map(t => (
              <span key={t} className="detail-tag">{t}</span>
            ))}
          </div>
          <h1>{outfit.title}</h1>
          <div className="detail-brand">{outfit.brand}</div>
          <p className="detail-desc">{outfit.desc}</p>
          <div className="purchase-total">
            <span className="purchase-total-label">전체 구매 예상 금액</span>
            <span className="purchase-total-price">
              ₩{totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="purchase-header-actions">
            <button
              className={`like-btn-lg${liked ? ' liked' : ''}`}
              onClick={handleLike}
            >
              {liked ? '❤️ 찜됨' : '🤍 찜하기'}
            </button>
            <button
              className="buy-btn"
              onClick={() => {
                outfit.items.forEach(item => {
                  window.open(getMusinsaLink(item.name), '_blank');
                });
              }}
            >
              🛍️ 전체 아이템 한번에 검색
            </button>
          </div>
        </div>
      </div>

      {/* 아이템 목록 */}
      <div className="purchase-items-section">
        <div className="section-header">
          <div className="section-title">구성 아이템 ({outfit.items.length}개)</div>
          <div className="result-count">각 아이템을 클릭해서 구매하세요</div>
        </div>
        <div className="purchase-items-grid">
          {outfit.items.map((item, idx) => (
            <div key={idx} className="purchase-item-card">
              <div className="purchase-item-emoji">{item.emoji}</div>
              <div className="purchase-item-info">
                <div className="purchase-item-name">{item.name}</div>
                <div className="purchase-item-price">{item.price}</div>
                <div className="purchase-item-shops">
                  <a
                    href={getMusinsaLink(item.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-btn musinsa"
                  >
                    무신사에서 찾기
                  </a>
                  <a
                    href={`https://search.shopping.naver.com/search/all?query=${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-btn naver"
                  >
                    네이버 쇼핑
                  </a>
                  <a
                    href={`https://www.coupang.com/np/search?q=${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-btn coupang"
                  >
                    쿠팡
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 전체 구매 안내 */}
      <div className="purchase-guide">
        <div className="purchase-guide-icon">💡</div>
        <div>
          <div className="purchase-guide-title">코디 그대로 구매하는 방법</div>
          <div className="purchase-guide-desc">
            각 아이템 옆 쇼핑몰 버튼을 클릭하면 해당 아이템을 바로 검색할 수 있어요.
            무신사, 네이버 쇼핑, 쿠팡에서 비교하며 가장 좋은 가격으로 구매해보세요!
          </div>
        </div>
      </div>
    </div>
  );
}