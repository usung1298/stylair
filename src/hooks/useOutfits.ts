import { useState, useMemo } from 'react';
import { Outfit } from '../types';

export function useOutfits(outfits: Outfit[]) {
  const [season, setSeason] = useState('');
  const [style, setStyle] = useState('');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return outfits.filter(o => {
      const seasonOk = !season || o.season === season;
      const styleOk  = !style  || o.style  === style;
      const q = query.toLowerCase();
      const searchOk = !q || o.title.toLowerCase().includes(q) || o.tags.some(t => t.includes(q));
      return seasonOk && styleOk && searchOk;
    });
  }, [outfits, season, style, query]);

  return { season, setSeason, style, setStyle, query, setQuery, filtered };
}