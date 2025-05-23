import type React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatButton.module.css';
import typo from '../../styles/typography.module.css';
import chatIcon from '../../assets/home/chat.svg';
import chatDisabledIcon from '../../assets/home/chat-disabled.svg';

interface ChatButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, disabled = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;

    if (onClick) {
      onClick();
    } else {
      // 전체대화 페이지로 이동 (경로는 실제 라우트에 맞게 수정 필요)
      navigate('/chat');
    }
  };

  return (
    <div className={styles.chatButtonContainer}>
      <button
        type="button"
        className={`${styles.chatButton} ${disabled ? styles.disabled : ''}`}
        onClick={handleClick}
        disabled={disabled}
      >
        <img src={disabled ? chatDisabledIcon : chatIcon} alt="채팅" className={styles.chatIcon} />

        <span
          className={`${styles.chatButtonText} ${
            disabled ? typo.body1ReadingMedium : `${typo.body1ReadingBold} ${typo.body1NormalBold}`
          }`}
        >
          전체 대화보기
        </span>
      </button>
    </div>
  );
};

export default ChatButton;
