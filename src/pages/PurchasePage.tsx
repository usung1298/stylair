import { useParams, useNavigate } from 'react-router-dom';
import { OUTFITS } from '../assets/data';
import { useAppContext } from '../context/AppContext';

export default function PurchasePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { likedOutfits, toggleLike, user, showToast, cart, addToCart } = useAppContext();

  const outfit = OUTFITS.find(o => o.id === Number(id));
  if (!outfit) { navigate('/404'); return null; }

  const liked = likedOutfits.includes(outfit.id);

  const handleLike = () => {
    if (!user) { showToast('로그인 후 찜하기가 가능합니다'); navigate('/login'); return; }
    toggleLike(outfit.id);
    showToast(liked ? '찜 목록에서 제거됐어요' : '찜 목록에 추가됐어요');
  };

  const getMusinsaLink = (itemName: string) =>
    'https://www.musinsa.com/search/goods?keyword=' + encodeURIComponent(itemName) + '&keywordType=keyword&gf=A';

  const getNaverLink = (itemName: string) =>
    'https://search.shopping.naver.com/search/all?query=' + encodeURIComponent(itemName);

  const getCoupangLink = (itemName: string) =>
    'https://www.coupang.com/np/search?q=' + encodeURIComponent(itemName);

  const isInCart = (itemName: string) =>
    cart.some(c => c.id === outfit.id + '-' + itemName);

  const handleAddToCart = (itemName: string, emoji: string, price: string) => {
    addToCart({
      id: outfit.id + '-' + itemName,
      outfitId: outfit.id,
      outfitTitle: outfit.title,
      name: itemName,
      emoji,
      price,
    });
    showToast('장바구니에 담았어요 🛒');
  };

  const handleAddAllToCart = () => {
    outfit.items.forEach(item => {
      addToCart({
        id: outfit.id + '-' + item.name,
        outfitId: outfit.id,
        outfitTitle: outfit.title,
        name: item.name,
        emoji: item.emoji,
        price: item.price,
      });
    });
    showToast('전체 아이템을 장바구니에 담았어요 🛒');
  };

  const totalPrice = outfit.items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + num;
  }, 0);

  return (
    <div className="purchase-wrap">
      <button className="back-btn" onClick={() => navigate('/detail/' + outfit.id)}>
        back 코디 상세로
      </button>

      <div className="purchase-header">
        <div className="purchase-img-wrap">
          <img
            src={outfit.image}
            alt={outfit.title}
            className="purchase-img"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
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
              {'₩'}{totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="purchase-header-actions">
            <button className={'like-btn-lg' + (liked ? ' liked' : '')} onClick={handleLike}>
              {liked ? 'heart 찜됨' : 'heart 찜하기'}
            </button>
            <button className="buy-btn" onClick={handleAddAllToCart}>
              🛒 전체 장바구니 담기
            </button>
          </div>
        </div>
      </div>

      <div className="purchase-items-section">
        <div className="section-header">
          <div className="section-title">구성 아이템 ({outfit.items.length}개)</div>
          <div className="result-count">아이템별로 쇼핑몰에서 구매하세요</div>
        </div>
        <div className="purchase-items-grid">
          {outfit.items.map((item, idx) => (
            <div key={idx} className="purchase-item-card">
              <div className="purchase-item-emoji">{item.emoji}</div>
              <div className="purchase-item-info">
                <div className="purchase-item-name">{item.name}</div>
                <div className="purchase-item-price">{item.price}</div>
                <div className="purchase-item-shops">
                  <a href={getMusinsaLink(item.name)} target="_blank" rel="noopener noreferrer" className="shop-btn musinsa">
                    무신사
                  </a>
                  <a href={getNaverLink(item.name)} target="_blank" rel="noopener noreferrer" className="shop-btn naver">
                    네이버 쇼핑
                  </a>
                  <a href={getCoupangLink(item.name)} target="_blank" rel="noopener noreferrer" className="shop-btn coupang">
                    쿠팡
                  </a>
                  <button
                    className={'shop-btn cart-add' + (isInCart(item.name) ? ' in-cart' : '')}
                    onClick={() => handleAddToCart(item.name, item.emoji, item.price)}
                  >
                    {isInCart(item.name) ? '담김' : '+ 담기'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="purchase-guide">
        <div className="purchase-guide-icon">tip</div>
        <div>
          <div className="purchase-guide-title">코디 그대로 구매하는 방법</div>
          <div className="purchase-guide-desc">
            장바구니에 담고 싶은 아이템을 선택하거나, 전체 담기 버튼으로 한 번에 담을 수 있어요.
            무신사, 네이버 쇼핑, 쿠팡에서 비교하며 가장 좋은 가격으로 구매해보세요!
          </div>
        </div>
      </div>
    </div>
  );
}