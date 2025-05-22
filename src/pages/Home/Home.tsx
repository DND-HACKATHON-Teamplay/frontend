import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      // 실제로는 토큰을 디코딩하거나 API 호출로 사용자 정보를 가져와야 함
      setUsername('사용자');
    }
  }, []);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // 토큰이 없으면 바로 로그인 페이지로
      navigate('/login');
      return;
    }

    setIsLoggingOut(true);

    try {
      // 백엔드 로그아웃 API 호출
      const apiUrl = import.meta.env.VITE_API_URL || 'https://bb-konkuk.shop';
      const response = await fetch(`${apiUrl}/api/v1/member/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('서버에서 로그아웃 성공');
      } else if (response.status === 500) {
        console.warn('서버 로그아웃 실패 (500 에러), 로컬에서만 처리합니다.');
      } else {
        console.warn(`서버 로그아웃 실패 (${response.status}), 로컬에서만 처리합니다.`);
      }
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
      console.warn('네트워크 오류로 인해 로컬에서만 로그아웃 처리합니다.');
    } finally {
      // 성공/실패 관계없이 로컬 상태는 정리
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      setUsername('');
      setIsLoggingOut(false);

      // 로그인 페이지로 리다이렉트
      navigate('/login');
    }
  };

  return (
    <div className="page-wrapper">
      <div className={styles.container}>
        <h1>🏠 Home Page</h1>

        {isLoggedIn ? (
          <div className={styles.welcomeSection}>
            <p>
              <span className={styles.username}>{username}</span>님, 환영합니다!
            </p>
            <p>성공적으로 로그인되었습니다.</p>
            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? '🔄 로그아웃 중...' : '🔓 로그아웃'}
            </button>
          </div>
        ) : (
          <div className={styles.loginSection}>
            <p>구글 또는 카카오 로그인 후 이용 가능한 서비스입니다.</p>
            <button type="button" className={styles.loginButton} onClick={handleGoToLogin}>
              🔐 로그인 하러 가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
