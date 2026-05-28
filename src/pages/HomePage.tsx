import { useRef } from 'react';
import { OUTFITS } from '../assets/data';
import { useFilter, useAI } from '../hooks';
import FilterBar from '../components/FilterBar';
import RecommendationList from '../components/RecommendationList';

export default function HomePage() {
  const { season, setSeason, style, setStyle, query, setQuery, filtered } = useFilter(OUTFITS);
  const { result, loading, error, recommend } = useAI();

  const aiSeasonRef   = useRef<HTMLSelectElement>(null);
  const aiStyleRef    = useRef<HTMLSelectElement>(null);
  const aiOccasionRef = useRef<HTMLSelectElement>(null);

  const handleAI = () => {
    recommend(
      aiSeasonRef.current?.value ?? '',
      aiStyleRef.current?.value ?? '',
      aiOccasionRef.current?.value ?? '',
    );
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-tag">✦ AI 기반 코디 추천 서비스</div>
        <h1>당신만을 위한<br />스타일을 찾아드립니다</h1>
        <p>AI가 분석한 트렌드와 취향을 결합하여 완벽한 코디를 추천해 드립니다.</p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => document.getElementById('ai-section')?.scrollIntoView({ behavior: 'smooth' })}>
            ✨ AI 코디 받기
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('list-section')?.scrollIntoView({ behavior: 'smooth' })}>
            전체 코디 보기
          </button>
        </div>
      </section>

      <section className="ai-section" id="ai-section">
        <div className="ai-header">
          <div className="ai-icon">✨</div>
          <div>
            <div className="ai-title">AI 스타일 추천</div>
            <div className="ai-sub">취향과 상황을 선택하면 Gemini AI가 맞춤 코디를 추천해 드립니다</div>
          </div>
        </div>
        <div className="ai-controls">
          <select className="ai-select" ref={aiSeasonRef}>
            <option value="">계절 선택</option>
            {['봄','여름','가을','겨울'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="ai-select" ref={aiStyleRef}>
            <option value="">스타일 선택</option>
            {['캐주얼','포멀','스트릿','미니멀','빈티지','스포티'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="ai-select" ref={aiOccasionRef}>
            <option value="">상황 선택</option>
            {['데이트','출근','여행','모임','캠퍼스','파티','운동'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="ai-run-btn" onClick={handleAI} disabled={loading}>
            {loading ? '분석 중...' : '✨ 추천받기'}
          </button>
        </div>
        <div className="ai-result">
          {loading ? (
            <div className="ai-loading">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span style={{ marginLeft: 8 }}>Gemini AI가 코디를 분석 중이에요...</span>
            </div>
          ) : error ? (
            <span style={{ color: 'var(--danger)' }}>{error}</span>
          ) : result ? (
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.8 }}>{result}</pre>
          ) : (
            <span className="ai-placeholder">계절, 스타일, 상황을 선택하고 '추천받기'를 클릭하면 AI가 맞춤 코디를 추천해 드립니다 🎯</span>
          )}
        </div>
      </section>

      <div id="list-section">
        <FilterBar
          season={season} setSeason={setSeason}
          style={style}   setStyle={setStyle}
          query={query}   setQuery={setQuery}
        />
        <div className="main-content">
          <div className="section-header">
            <div className="section-title">추천 코디</div>
            <div className="result-count">{filtered.length}개의 코디</div>
          </div>
          <RecommendationList outfits={filtered} />
        </div>
      </div>
    </main>
  );
}