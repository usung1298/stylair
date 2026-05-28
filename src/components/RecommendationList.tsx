import { Outfit } from '../types';
import OutfitCard from './OutfitCard';

// RecommendationList 컴포넌트 Props 인터페이스
interface RecommendationListProps {
  outfits: Outfit[];
}

// RecommendationList 컴포넌트: 필터링된 코디 목록
export default function RecommendationList({ outfits }: RecommendationListProps) {
  if (outfits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <div className="empty-title">검색 결과가 없어요</div>
        <p className="empty-desc">다른 필터를 선택해보세요</p>
      </div>
    );
  }

  return (
    <div className="outfit-grid">
      {outfits.map(outfit => (
        <OutfitCard key={outfit.id} outfit={outfit} />
      ))}
    </div>
  );
}
