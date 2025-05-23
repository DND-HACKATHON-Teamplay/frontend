import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/Login/auth';
import type { UserInfo } from '../../services/Login/auth';
import { tokenUtils } from '../../utils/auth';
import classNames from 'classnames';
import styles from './Home.module.css';
import fontStyles from '../../styles/typography.module.css';

const Home = () => {
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (tokenUtils.isLoggedIn()) {
        // setIsLoggedIn(true);

        // 사용자 정보 조회 시도
        try {
          const result = await authAPI.getUserInfo();
          if (result.success && result.data) {
            const userInfo = result.data as UserInfo;
            setUsername(userInfo.name || userInfo.email || '사용자');
          } else {
            // API 실패 시 기본값 사용
            setUsername('사용자');
          }
        } catch (error) {
          console.error('사용자 정보 조회 실패:', error);
          setUsername('사용자');
        }
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // const handleGoToLogin = () => {
  //   navigate('/login');
  // };

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
      // setIsLoggedIn(false);
      setUsername('');
      setIsLoggingOut(false);
      navigate('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="page-wrapper">
        <div className={styles.container}>
          <h1>🔄 로딩 중...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className={styles.container}>
        <span className={classNames(styles.testText, fontStyles.displayD2Bold)}>연습용</span>
        <h1>🏠 Home Page</h1>

        <div className={styles.welcomeSection}>
          <p>
            <span className={styles.username}>{username}</span>님, 환영합니다!
          </p>
          <p>성공적으로 로그인되었습니다!!</p>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? '🔄 로그아웃 중...' : '🔓 로그아웃'}
          </button>
        </div>
        <button onClick={() => navigate('/register')}>등록하기로 가기</button>
      </div>
    </div>
  );
};

export default Home;
