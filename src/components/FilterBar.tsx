// FilterBar 컴포넌트 Props 인터페이스
interface FilterBarProps {
  season: string;
  setSeason: (v: string) => void;
  style: string;
  setStyle: (v: string) => void;
  query: string;
  setQuery: (v: string) => void;
}

const SEASONS = ['봄', '여름', '가을', '겨울'];
const STYLES  = ['캐주얼', '포멀', '스트릿', '미니멀', '빈티지'];

// FilterBar 컴포넌트: 계절/스타일/검색 필터
export default function FilterBar({ season, setSeason, style, setStyle, query, setQuery }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">계절</span>
        <button className={`filter-chip${season === '' ? ' active' : ''}`} onClick={() => setSeason('')}>전체</button>
        {SEASONS.map(s => (
          <button
            key={s}
            className={`filter-chip${season === s ? ' active' : ''}`}
            onClick={() => setSeason(s)}
          >{s}</button>
        ))}
      </div>
      <div className="filter-group">
        <span className="filter-label">스타일</span>
        <button className={`filter-chip${style === '' ? ' active' : ''}`} onClick={() => setStyle('')}>전체</button>
        {STYLES.map(s => (
          <button
            key={s}
            className={`filter-chip${style === s ? ' active' : ''}`}
            onClick={() => setStyle(s)}
          >{s}</button>
        ))}
      </div>
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="코디 검색..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
