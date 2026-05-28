import { Outfit } from '../types';

export const OUTFITS: Outfit[] = [
  {
    id: 1, emoji: '🧥',
    title: '오버핏 데님 룩', brand: "ZARA x Levi's", price: '₩182,000',
    season: '봄', style: '캐주얼', tags: ['데님', '오버핏', '봄'],
    desc: '클래식한 오버핏 데님 재킷과 와이드 팬츠의 조화. 흰 티셔츠로 깔끔함을 더했습니다.',
    items: [
      { name: '오버핏 데님 재킷', emoji: '🧥', price: '₩89,000' },
      { name: '와이드 데님 팬츠', emoji: '👖', price: '₩59,000' },
      { name: '화이트 베이직 티', emoji: '👕', price: '₩19,000' },
      { name: '화이트 스니커즈', emoji: '👟', price: '₩59,000' },
    ],
  },
  {
    id: 2, emoji: '👗',
    title: '플로럴 원피스 룩', brand: 'H&M', price: '₩129,000',
    season: '여름', style: '캐주얼', tags: ['원피스', '플로럴', '여름'],
    desc: '화사한 플로럴 패턴의 미디 원피스. 여름 날 산책이나 피크닉에 완벽한 룩입니다.',
    items: [
      { name: '플로럴 미디 원피스', emoji: '👗', price: '₩79,000' },
      { name: '에스파드리유', emoji: '👡', price: '₩35,000' },
      { name: '위커 백', emoji: '👜', price: '₩29,000' },
    ],
  },
  {
    id: 3, emoji: '🧣',
    title: '레이어드 니트 룩', brand: 'COS', price: '₩245,000',
    season: '가을', style: '미니멀', tags: ['니트', '레이어드', '가을'],
    desc: '크림색 오버핏 니트와 베이지 트렌치코트의 완벽한 레이어링. 가을의 감성을 담은 룩.',
    items: [
      { name: '오버핏 크림 니트', emoji: '🧶', price: '₩89,000' },
      { name: '베이지 트렌치코트', emoji: '🧥', price: '₩129,000' },
      { name: '슬랙스', emoji: '👖', price: '₩59,000' },
      { name: '로퍼', emoji: '🥿', price: '₩69,000' },
    ],
  },
  {
    id: 4, emoji: '🥾',
    title: '레이어드 겨울 룩', brand: 'Moncler x Arket', price: '₩389,000',
    season: '겨울', style: '캐주얼', tags: ['패딩', '겨울', '레이어드'],
    desc: '두꺼운 다운 재킷과 터틀넥의 조화. 따뜻하면서도 세련된 겨울 룩.',
    items: [
      { name: '다운 패딩', emoji: '🧥', price: '₩249,000' },
      { name: '터틀넥 니트', emoji: '🧶', price: '₩59,000' },
      { name: '조거 팬츠', emoji: '👖', price: '₩49,000' },
      { name: '부츠', emoji: '🥾', price: '₩89,000' },
    ],
  },
  {
    id: 5, emoji: '👔',
    title: '모던 포멀 룩', brand: 'Theory', price: '₩320,000',
    season: '봄', style: '포멀', tags: ['포멀', '수트', '비즈니스'],
    desc: '슬림 핏 수트와 화이트 셔츠의 클래식 조합. 비즈니스 미팅이나 중요한 자리에 완벽.',
    items: [
      { name: '슬림핏 재킷', emoji: '🧥', price: '₩159,000' },
      { name: '드레스 팬츠', emoji: '👖', price: '₩89,000' },
      { name: '화이트 셔츠', emoji: '👔', price: '₩59,000' },
      { name: '레더 슈즈', emoji: '👞', price: '₩119,000' },
    ],
  },
  {
    id: 6, emoji: '🎽',
    title: '스트릿 스포티 룩', brand: 'Nike x Supreme', price: '₩198,000',
    season: '여름', style: '스트릿', tags: ['스트릿', '스포티', '여름'],
    desc: '그래픽 티셔츠와 트랙 팬츠의 스트릿 스포티 룩. 편안하면서도 트렌디한 스타일.',
    items: [
      { name: '그래픽 반팔티', emoji: '🎽', price: '₩59,000' },
      { name: '트랙 팬츠', emoji: '🩱', price: '₩79,000' },
      { name: '청키 스니커즈', emoji: '👟', price: '₩109,000' },
      { name: '크로스백', emoji: '🎒', price: '₩49,000' },
    ],
  },
  {
    id: 7, emoji: '🧤',
    title: '빈티지 레트로 룩', brand: 'Vintage Shop', price: '₩155,000',
    season: '가을', style: '미니멀', tags: ['빈티지', '레트로', '가을'],
    desc: '90년대 감성의 빈티지 청자켓과 플리스 조합. 유니크한 분위기의 가을 코디.',
    items: [
      { name: '빈티지 데님자켓', emoji: '🧥', price: '₩49,000' },
      { name: '플리스 집업', emoji: '🧤', price: '₩39,000' },
      { name: '화이트 테이퍼드 팬츠', emoji: '👖', price: '₩45,000' },
      { name: '청키 부츠', emoji: '🥾', price: '₩79,000' },
    ],
  },
  {
    id: 8, emoji: '👒',
    title: '리조트 썸머 룩', brand: 'Sundek x Vans', price: '₩135,000',
    season: '여름', style: '캐주얼', tags: ['여름', '리조트', '바캉스'],
    desc: '린넨 셔츠와 버뮤다 쇼츠의 리조트 룩. 바닷가나 휴가지에 완벽한 여름 코디.',
    items: [
      { name: '린넨 셔츠', emoji: '👔', price: '₩49,000' },
      { name: '버뮤다 쇼츠', emoji: '🩳', price: '₩35,000' },
      { name: '슬라이드', emoji: '🩴', price: '₩25,000' },
      { name: '스트로우 햇', emoji: '👒', price: '₩29,000' },
    ],
  },
];
