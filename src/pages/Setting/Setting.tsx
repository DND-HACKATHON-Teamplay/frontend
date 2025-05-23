import styles from './Setting.module.css';
import arrowBack from '../../assets/arrowBack.svg';
import arrowRight from '../../assets/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/Login/auth';
import { tokenUtils } from '../../utils/auth';
import { deleteUser } from '../../services/deleteUser';

const Setting = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');
    if (!confirmed) return;

    const response = await authAPI.logout();
    console.log(response);

    if (response.success) {
      tokenUtils.removeToken();
      navigate('/login');
    } else {
      alert(response.message || '로그아웃에 실패했습니다.');
    }
  };
  const handleDeleteUser = async () => {
    const confirmed = window.confirm(
      '정말로 회원을 탈퇴하시겠습니까? 탈퇴 후 복구가 불가능합니다.',
    );
    if (!confirmed) return;

    try {
      await deleteUser();
      tokenUtils.removeToken(); // 토큰 삭제
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error: any) {
      alert(error.message || '회원 탈퇴 중 오류가 발생했습니다.');
    }
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
        <button className={styles.SettingButton}>
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
    </div>
  );
};

export default Setting;
