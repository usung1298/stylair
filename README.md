# STYLAIR - AI 코디 추천 웹앱

> React 기말 과제 | AI 기반 패션 코디 추천 서비스

## 배포 URL
- Vercel: (배포 후 URL 입력)
- GitHub: (레포 URL 입력)

---

## 기술 스택
- **React 18** + **TypeScript**
- **React Router DOM v6** — 클라이언트 사이드 라우팅
- **Context API** — 전역 상태 관리
- **Vite** — 빌드 도구
- **Anthropic Claude API** — AI 코디 추천

---

## 폴더 구조
```
src/
├── components/     # 재사용 컴포넌트 (Header, Footer, OutfitCard, FilterBar, RecommendationList, Sidebar, ThemeToggle)
├── pages/          # 페이지 컴포넌트 (Home, Detail, Login, MyPage, NotFound)
├── context/        # Context API (AppContext)
├── hooks/          # 커스텀 훅 (useFilter, useAI)
├── types/          # TypeScript 타입 정의
├── router/         # React Router 설정
├── assets/         # 코디 데이터 (data.ts)
└── App.tsx
```

---

## 구현 요구사항 체크리스트

### 컴포넌트 (8개)
- [x] `Header` — 네비게이션, 로그인/로그아웃, 다크모드 토글
- [x] `Footer` — 서비스 정보
- [x] `OutfitCard` — 코디 카드 (찜하기 포함)
- [x] `FilterBar` — 계절/스타일/검색 필터
- [x] `RecommendationList` — 코디 목록 렌더링
- [x] `Sidebar` — 모바일 사이드 메뉴
- [x] `ThemeToggle` — 독립 다크모드 토글
- [x] `AppProvider` — Context 제공자

### React Router (5개 화면)
| URL | 페이지 |
|-----|--------|
| `/` | 메인 홈 화면 |
| `/detail/:id` | 코디 상세 페이지 |
| `/login` | 로그인 화면 |
| `/mypage` | 찜 목록 마이페이지 |
| `*` | 404 오류 페이지 |

### Hook 함수 (6종)
| Hook | 사용 위치 | 사용 이유 |
|------|-----------|-----------|
| `useState` | AppContext, LoginPage | 로그인 상태, 찜 목록, 필터값, 폼 입력값 등 UI 상태 관리 |
| `useEffect` | AppContext | LocalStorage 저장/복원, 다크모드 class 적용 등 사이드이펙트 처리 |
| `useContext` | useAppContext hook | 전역 상태(user, likedOutfits, isDark)에 컴포넌트 어디서나 접근 |
| `useMemo` | useFilter hook | 필터 조건 변경 시에만 코디 목록 재계산하여 렌더링 최적화 |
| `useNavigate` | Header, DetailPage 등 | React Router를 통한 프로그래매틱 페이지 이동 |
| `useParams` | DetailPage | URL 파라미터(:id)에서 코디 ID 추출 |

### 전역 상태 (Context API)
- `user` — 로그인 상태 (여러 컴포넌트 공유)
- `likedOutfits` — 찜한 코디 목록
- `isDark` — 다크모드 상태
- `showToast()` — 토스트 메시지

Context API를 사용한 이유: Header, OutfitCard, DetailPage, MyPage 등 여러 컴포넌트에서 동일한 `user`, `likedOutfits` 데이터가 필요하여 Props Drilling 없이 공유하기 위함.

### TypeScript 적용
`src/types/index.ts`에 `Outfit`, `OutfitItem`, `User`, `AppContextType` 인터페이스 정의.
모든 컴포넌트 Props에 인터페이스 적용 (`OutfitCardProps`, `FilterBarProps`, `SidebarProps` 등).

### 가산점 기능
- [x] **AI 스타일 추천** — Anthropic Claude API 실제 연동
- [x] **다크모드** — CSS 변수로 테마 전환
- [x] **LocalStorage** — 로그인/찜 목록 영구 저장
- [x] **애니메이션** — 카드 호버, 토스트, 버튼 효과
- [x] **반응형** — 모바일 대응

---

## 실행 방법

```bash
npm install
npm run dev
```

## 빌드 & 배포

```bash
npm run build
# dist/ 폴더를 Vercel/Netlify에 배포
```

## Vercel 배포
1. GitHub에 push
2. vercel.com → New Project → Import
3. Framework Preset: Vite → Deploy
