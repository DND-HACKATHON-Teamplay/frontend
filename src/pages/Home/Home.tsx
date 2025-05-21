import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

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

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setUsername('');
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
            <button type="button" className={styles.logoutButton} onClick={handleLogout}>
              🔓 로그아웃
            </button>
          </div>
        ) : (
          <div className={styles.loginSection}>
            <p>구글 로그인 후 이용 가능한 서비스입니다.</p>
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
