import type React from 'react';
import styles from './Header.module.css';
import typo from '../../../styles/typography.module.css';

interface HeaderProps {
  currentDate: Date;
  onDatePickerClick?: () => void;
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentDate, onDatePickerClick, onSettingsClick }) => {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}.${month}`;
  };

  return (
    <div className={styles.header}>
      {/* 왼쪽 빈 공간 */}
      <div className={styles.leftSpace} />

      {/* 중앙 날짜 선택 버튼 */}
      <button type="button" className={styles.datePickerButton} onClick={onDatePickerClick}>
        <span className={`${styles.dateText} ${typo.headingH4Bold}`}>
          {formatDate(currentDate)}
        </span>
        <img src="/src/assets/home/dropdown.svg" alt="dropdown" className={styles.dropdownIcon} />
      </button>

      {/* 오른쪽 설정 버튼 */}
      <button type="button" className={styles.settingsButton} onClick={onSettingsClick}>
        <img src="/src/assets/home/setting.svg" alt="settings" className={styles.settingsIcon} />
      </button>
    </div>
  );
};

export default Header;
