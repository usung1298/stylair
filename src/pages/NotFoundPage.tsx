import { useNavigate } from 'react-router-dom';

// NotFoundPage: 404 오류 페이지
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>페이지를 찾을 수 없어요</h2>
      <p>존재하지 않는 URL입니다.</p>
      <button className="btn-primary" onClick={() => navigate('/')}>홈으로 돌아가기</button>
    </div>
  );
}
