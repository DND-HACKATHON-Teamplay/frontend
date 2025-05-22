import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { oauthAPI } from '../../services/api';
import { tokenUtils } from '../../utils/auth';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 이미 로그인된 사용자는 홈으로 리다이렉트
    if (tokenUtils.isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = oauthAPI.getGoogleLoginUrl();
  };

  const handleKakaoLogin = () => {
    window.location.href = oauthAPI.getKakaoLoginUrl();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>로그인</h1>
        <p className={styles.description}>서비스를 이용하기 위해 로그인해주세요.</p>

        <button type="button" className={styles.googleButton} onClick={handleGoogleLogin}>
          <span className={styles.googleIcon}>G</span>
          구글 계정으로 로그인
        </button>

        <button type="button" className={styles.kakaoButton} onClick={handleKakaoLogin}>
          <span className={styles.kakaoIcon}>K</span>
          카카오 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
