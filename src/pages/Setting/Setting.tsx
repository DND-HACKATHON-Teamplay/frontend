import styles from './Setting.module.css';
import arrowBack from '../../assets/arrowBack.svg';
import arrowRight from '../../assets/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SettingModal } from './SettingModal/SettingModal';

const Setting = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

  const handleLogout = async () => {
    setModalType('logout');
    setModalState(true);
  };
  const handleDeleteUser = async () => {
    setModalType('deleteUser');
    setModalState(true);
  };

  return (
    <div>
      <div className={styles.HeaderContainer}>
        <img
          className={styles.BackIcon}
          src={arrowBack}
          alt="뒤로가기 버튼"
          onClick={() => navigate(-1)}
        />
        <span className={styles.SettingTitle}>설정</span>
      </div>
      <div className={styles.SettingContentWrapper}>
        <button className={styles.SettingButton} onClick={() => navigate('/editelder')}>
          <span className={styles.SettingText}>어르신 정보 수정</span>
          <img className={styles.ArrowRightIcon} src={arrowRight} alt="설정 버튼" />
        </button>
        <div className={styles.UserSettingContainer}>
          <button className={styles.SettingButton} onClick={handleLogout}>
            <span className={styles.SettingText}>로그아웃</span>
            <img className={styles.ArrowRightIcon} src={arrowRight} alt="설정 버튼" />
          </button>
          <button className={styles.SettingButton} onClick={handleDeleteUser}>
            <span className={styles.SettingText}>회원탈퇴</span>
            <img className={styles.ArrowRightIcon} src={arrowRight} alt="설정 버튼" />
          </button>
        </div>
      </div>
      <SettingModal modalState={modalState} modalType={modalType} setModalState={setModalState} />
    </div>
  );
};

export default Setting;
