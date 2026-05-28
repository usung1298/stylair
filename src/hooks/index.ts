import { useState, useMemo } from 'react';
import { Outfit } from '../types';

// useFilter: 계절/스타일/검색 필터
export function useFilter(outfits: Outfit[]) {
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

// useAI: Vercel Serverless Function을 통해 Gemini API 호출
export function useAI() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const recommend = async (season: string, style: string, occasion: string) => {
    if (!season && !style && !occasion) {
      setError('계절, 스타일, 상황 중 하나 이상 선택해주세요.');
      return;
    }
    setLoading(true);
    setResult('');
    setError('');

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ season, style, occasion }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (err) {
      setError('AI 추천을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, recommend };
}