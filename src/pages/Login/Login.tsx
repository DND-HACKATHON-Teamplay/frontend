import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { oauthAPI } from '../../services/Login/auth';
import { tokenUtils } from '../../utils/auth';
import styles from './Login.module.css';
import loginGif from '../../assets/login/login.gif';
import logo from '../../assets/login/logo.svg';
import googleIcon from '../../assets/login/google.svg';
import kakaoIcon from '../../assets/login/kakao.svg';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoSection}>
          <img src={loginGif} alt="똑똑" className={styles.loginGif} />
        </div>

        <div className={styles.descriptionSection}>
          <img src={logo} alt="똑똑!" className={styles.logoImage} />
          <span className={styles.descriptionText}>
            하루 한 번, 어르신 마음을 <strong>똑똑</strong> 두드리는 <br />
            AI 케어콜 서비스
          </span>
        </div>

        <div className={styles.buttonSection}>
          <button type="button" className={styles.googleButton} onClick={handleGoogleLogin}>
            <div className={styles.googleIcon}>
              <img src={googleIcon} alt="Google" className={styles.iconImage} />
            </div>
            구글로 로그인
          </button>

          <button type="button" className={styles.kakaoButton} onClick={handleKakaoLogin}>
            <div className={styles.kakaoIcon}>
              <img src={kakaoIcon} alt="Kakao" className={styles.iconImage} />
            </div>
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
