import type React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenUtils } from '../../utils/auth';
import styles from './Splash.module.css';
import logo from '../../assets/splash/logo.svg';
import splashIcon from '../../assets/splash/splash-icon.svg';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // 로그인 상태 확인 후 조건부 이동
      if (tokenUtils.isLoggedIn()) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }, 2000);

    // 컴포넌트가 언마운트되면 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h1 className={styles.mainText}>
            매일 전하는
            <br />
            안부인사
          </h1>

          <div className={styles.knockIcon}>
            <img src={logo} alt="똑똑" className={styles.logoImage} />
          </div>
        </div>

        <div className={styles.bottomIcon}>
          <img src={splashIcon} alt="splash icon" className={styles.splashIconImage} />
        </div>
      </div>
    </div>
  );
};

export default Splash;
