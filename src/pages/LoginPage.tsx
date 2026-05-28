import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// LoginPage: 이메일/비밀번호 입력 및 로그인 상태 저장
export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, showToast } = useAppContext();

  // useState: 폼 입력값
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  // useState: 유효성 오류 메시지
  const [emailErr, setEmailErr] = useState('');
  const [pwErr, setPwErr]       = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailErr('');
    setPwErr('');
    let valid = true;
    if (!email || !email.includes('@')) { setEmailErr('올바른 이메일을 입력해 주세요.'); valid = false; }
    if (!password || password.length < 4) { setPwErr('비밀번호는 4자 이상이어야 합니다.'); valid = false; }
    if (!valid) return;

    const name = email.split('@')[0];
    setUser({ name, email, preferredStyles: ['캐주얼', '미니멀'] });
    showToast('환영합니다, ' + name + '님! ✨');
    navigate('/');
  };

  return (
    <div className="auth-wrap">
      <div className="auth-title">로그인</div>
      <div className="auth-sub">계정에 로그인하여 나만의 코디를 관리하세요</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">이메일</label>
          <input
            type="email" className="form-input"
            placeholder="email@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          {emailErr && <div className="form-error">{emailErr}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">비밀번호</label>
          <input
            type="password" className="form-input"
            placeholder="4자 이상"
            value={password} onChange={e => setPassword(e.target.value)}
          />
          {pwErr && <div className="form-error">{pwErr}</div>}
        </div>
        <button type="submit" className="form-btn">로그인</button>
      </form>
      <div className="form-footer">
        계정이 없으신가요?{' '}
        <span className="form-link" onClick={() => { setEmail('demo@stylair.com'); setPassword('demo1234'); }}>
          데모 정보 입력
        </span>
      </div>
    </div>
  );
}
