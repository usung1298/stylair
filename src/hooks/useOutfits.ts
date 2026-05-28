// src/hooks/useOutfits.ts
import { useMemo } from 'react';
import { OUTFITS } from '../assets/outfits';
import { Outfit, Season, Style } from '../types';

// useMemo를 활용해 필터링된 코디 리스트를 메모이제이션
// → filterSeason, filterStyle, query가 바뀔 때만 재계산
export function useOutfits(filterSeason: Season, filterStyle: Style, query: string): Outfit[] {
  return useMemo(() => {
    const q = query.toLowerCase().trim();
    return OUTFITS.filter(o => {
      const seasonOk = !filterSeason || o.season === filterSeason;
      const styleOk  = !filterStyle  || o.style  === filterStyle;
      const searchOk = !q
        || o.title.toLowerCase().includes(q)
        || o.brand.toLowerCase().includes(q)
        || o.tags.some(t => t.includes(q));
      return seasonOk && styleOk && searchOk;
    });
  }, [filterSeason, filterStyle, query]);
}
