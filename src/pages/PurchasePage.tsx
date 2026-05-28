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
    if (!user) { showToast('ë¡œê·¸????ì°œí•˜ê¸°ê? ê°€?¥í•©?ˆë‹¤ ?’›'); navigate('/login'); return; }
    toggleLike(outfit.id);
    showToast(liked ? 'ì°?ëª©ë¡?ì„œ ?œê±°?ì–´?? : 'ì°?ëª©ë¡??ì¶”ê??ì–´???¤ï¸');
  };

  const getMusinsaLink = (itemName: string) =>
    `https://www.musinsa.com/search/goods?keyword=${encodeURIComponent(itemName)}`;

  const totalPrice = outfit.items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + num;
  }, 0);

  return (
    <div className="purchase-wrap">
      <button className="back-btn" onClick={() => navigate(`/detail/${outfit.id}`)}>
        ??ì½”ë”” ?ì„¸ë¡?
      </button>

      {/* ì½”ë”” ?¤ë” */}
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
            <span className="purchase-total-label">?„ì²´ êµ¬ë§¤ ?ˆìƒ ê¸ˆì•¡</span>
            <span className="purchase-total-price">
              ??totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="purchase-header-actions">
            <button
              className={`like-btn-lg${liked ? ' liked' : ''}`}
              onClick={handleLike}
            >
              {liked ? '?¤ï¸ ì°œë¨' : '?¤ ì°œí•˜ê¸?}
            </button>
            <button
              className="buy-btn"
              onClick={() => {
                outfit.items.forEach(item => {
                  window.open(getMusinsaLink(item.name), '_blank');
                });
              }}
            >
              ?›ï¸??„ì²´ ?„ì´???œë²ˆ??ê²€??
            </button>
          </div>
        </div>
      </div>

      {/* ?„ì´??ëª©ë¡ */}
      <div className="purchase-items-section">
        <div className="section-header">
          <div className="section-title">êµ¬ì„± ?„ì´??({outfit.items.length}ê°?</div>
          <div className="result-count">ê°??„ì´?œì„ ?´ë¦­?´ì„œ êµ¬ë§¤?˜ì„¸??/div>
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
                    ë¬´ì‹ ?¬ì—??ì°¾ê¸°
                  </a>
                  <a
                    href={`https://search.shopping.naver.com/search/all?query=${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-btn naver"
                  >
                    ?¤ì´ë²??¼í•‘
                  </a>
                  <a
                    href={`https://www.coupang.com/np/search?q=${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-btn coupang"
                  >
                    ì¿ íŒ¡
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ?„ì²´ êµ¬ë§¤ ?ˆë‚´ */}
      <div className="purchase-guide">
        <div className="purchase-guide-icon">?’¡</div>
        <div>
          <div className="purchase-guide-title">ì½”ë”” ê·¸ë?ë¡?êµ¬ë§¤?˜ëŠ” ë°©ë²•</div>
          <div className="purchase-guide-desc">
            ê°??„ì´?????¼í•‘ëª?ë²„íŠ¼???´ë¦­?˜ë©´ ?´ë‹¹ ?„ì´?œì„ ë°”ë¡œ ê²€?‰í•  ???ˆì–´??
            ë¬´ì‹ ?? ?¤ì´ë²??¼í•‘, ì¿ íŒ¡?ì„œ ë¹„êµ?˜ë©° ê°€??ì¢‹ì? ê°€ê²©ìœ¼ë¡?êµ¬ë§¤?´ë³´?¸ìš”!
          </div>
        </div>
      </div>
    </div>
  );
}
