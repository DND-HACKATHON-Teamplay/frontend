import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { tokenUtils } from '../../utils/auth';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인
    if (tokenUtils.isLoggedIn()) {
      setIsLoggedIn(true);
      // 실제로는 API 호출로 사용자 정보를 가져와야 함
      setUsername('사용자');
    }
  }, []);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    if (!tokenUtils.isLoggedIn()) {
      navigate('/login');
      return;
    }

    setIsLoggingOut(true);

    try {
      // API 서비스를 통한 로그아웃 요청
      const result = await authAPI.logout();

      if (result.success) {
        console.log('서버에서 로그아웃 성공');
      } else {
        console.warn('서버 로그아웃 실패:', result.message);
      }
    } catch (error) {
      console.error('로그아웃 중 예외 발생:', error);
    } finally {
      // 성공/실패 관계없이 로컬 상태 정리
      tokenUtils.removeToken();
      setIsLoggedIn(false);
      setUsername('');
      setIsLoggingOut(false);
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
