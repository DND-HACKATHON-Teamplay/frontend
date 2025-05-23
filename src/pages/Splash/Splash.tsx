import React from 'react';
import styles from './Splash.module.css';
import logo from '../../assets/splash/logo.svg';
import splashIcon from '../../assets/splash/splash-icon.svg';

const Splash: React.FC = () => {
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
