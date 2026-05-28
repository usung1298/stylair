import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, showToast } = useAppContext();

  const getMusinsaLink = (itemName: string) =>
    'https://www.musinsa.com/search/goods?keyword=' + encodeURIComponent(itemName) + '&keywordType=keyword&gf=A';

  const getNaverLink = (itemName: string) =>
    'https://search.shopping.naver.com/search/all?query=' + encodeURIComponent(itemName);

  const getCoupangLink = (itemName: string) =>
    'https://www.coupang.com/np/search?q=' + encodeURIComponent(itemName);

  const totalPrice = cart.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + num;
  }, 0);

  const handleClear = () => {
    clearCart();
    showToast('장바구니를 비웠어요');
  };

  return (
    <div className="cart-wrap">
      <button className="back-btn" onClick={() => navigate(-1)}>← 뒤로</button>

      <div className="section-header">
        <div className="section-title">🛒 장바구니</div>
        {cart.length > 0 && (
          <button className="cart-clear-btn" onClick={handleClear}>전체 비우기</button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <div className="empty-title">장바구니가 비어있어요</div>
          <p className="empty-desc" style={{ marginBottom: '1.5rem' }}>
            코디 상세 페이지에서 아이템을 담아보세요
          </p>
          <button className="btn-primary" onClick={() => navigate('/')}>코디 보러가기</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-emoji">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-outfit">{item.outfitTitle}</div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{item.price}</div>
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
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => { removeFromCart(item.id); showToast('삭제됐어요'); }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* 총 금액 */}
          <div className="cart-total">
            <div className="cart-total-info">
              <span className="cart-total-label">총 {cart.length}개 아이템</span>
              <span className="cart-total-price">
                {'₩'}{totalPrice.toLocaleString()}
              </span>
            </div>
            <button
              className="buy-btn"
              style={{ width: '100%', padding: '14px', borderRadius: '12px', marginTop: '1rem' }}
              onClick={() => {
                cart.forEach(item => window.open(getMusinsaLink(item.name), '_blank'));
                showToast('무신사에서 검색해보세요!');
              }}
            >
              🛍️ 전체 아이템 무신사 검색
            </button>
          </div>
        </>
      )}
    </div>
  );
}