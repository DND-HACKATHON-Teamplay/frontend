import React from 'react';
import ReactModal from 'react-modal';
import styles from './RegisterModal.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';

interface ModalProps {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  modalType?: string;
}
export const RegisterModal: React.FC<ModalProps> = ({ modalState, setModalState, modalType }) => {
  const navigate = useNavigate();
  const handleGoToHome = () => {
    setModalState(false);
    navigate('/');
  };
  return (
    <ReactModal
      isOpen={modalState}
      className={styles.RegisterModalContainer}
      overlayClassName={styles.Overlay}
    >
      <div className={styles.RegisterModalTextContainer}>
        {modalType === 'edit' ? (
          <h3 className={styles.RegisterModalTitle}>정보 수정 완료!</h3>
        ) : (
          <h3 className={styles.RegisterModalTitle}>회원가입 완료!</h3>
        )}
        <span className={styles.RegisterModalText}>홈으로 이동하여 서비스를 이용해주세요!</span>
      </div>
      <Button onClick={handleGoToHome}>홈으로</Button>
    </ReactModal>
  );
};
