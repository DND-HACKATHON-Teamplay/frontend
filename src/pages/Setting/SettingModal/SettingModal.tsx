import React from 'react';
import ReactModal from 'react-modal';
import styles from './SettingModal.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { authAPI } from '../../../services/Login/auth';
import { tokenUtils } from '../../../utils/auth';
import { deleteUser } from '../../../services/deleteUser';

interface ModalProps {
  modalState: boolean;
  modalType: string;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SettingModal: React.FC<ModalProps> = ({ modalState, modalType, setModalState }) => {
  const navigate = useNavigate();
  const clickToCancle = () => {
    setModalState(false);
  };
  const handleLogout = async () => {
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
    try {
      await deleteUser();
      tokenUtils.removeToken(); // 토큰 삭제
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error: any) {
      alert(error.message || '회원 탈퇴 중 오류가 발생했습니다.');
    }
  };
  return (
    <ReactModal
      isOpen={modalState}
      className={styles.SettingModalContainer}
      overlayClassName={styles.Overlay}
    >
      {modalType === 'logout' ? (
        <div className={styles.SettingModalTextContainer}>
          <h3 className={styles.SettingModalTitle}>로그아웃 하시겠어요?</h3>
          <span className={styles.SettingModalText}>언제든지 다시 로그인할 수 있습니다.</span>
        </div>
      ) : (
        <div className={styles.SettingModalTextContainerDelete}>
          <h3 className={styles.SettingModalTitle}>정말로 탈퇴하시겠어요?</h3>
          <span className={styles.SettingModalText}>
            탈퇴시 모든 데이터가 삭제되며 복구할 수 없습니다.
          </span>
        </div>
      )}

      <div className={styles.ButtonWrapper}>
        <Button onClick={clickToCancle} btnType="cancel">
          취소
        </Button>
        <Button onClick={modalType === 'logout' ? handleLogout : handleDeleteUser} btnType="edit">
          확인
        </Button>
      </div>
    </ReactModal>
  );
};
