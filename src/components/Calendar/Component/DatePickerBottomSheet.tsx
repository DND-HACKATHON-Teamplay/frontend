import type React from 'react';
import { useState } from 'react';
import styles from './DatePickerBottomSheet.module.css';
import typo from '../../../styles/typography.module.css';
import closeIcon from '../../../assets/home/x.svg';
import arrowLeftIcon from '../../../assets/home/left-shevron.svg';
import arrowRightIcon from '../../../assets/home/right-shevron.svg';
import arrowRightDisabledIcon from '../../../assets/home/right-shevron-disabled.svg';

interface DatePickerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

const DatePickerBottomSheet: React.FC<DatePickerBottomSheetProps> = ({
  isOpen,
  onClose,
  currentDate,
  onDateSelect,
}) => {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedYear(selectedYear - 1);
    } else if (direction === 'next' && selectedYear < 2025) {
      setSelectedYear(selectedYear + 1);
    }
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(selectedYear, monthIndex, 1);
    onDateSelect(newDate);
    onClose();
  };

  const isCurrentMonth = (monthIndex: number) => {
    return selectedYear === currentYear && monthIndex === currentMonth;
  };

  const isDisabledMonth = (monthIndex: number) => {
    const monthDate = new Date(selectedYear, monthIndex, 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 현재 월보다 미래인 경우 비활성화
    return monthDate > today;
  };

  const isNextYearDisabled = selectedYear >= 2025;

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.bottomSheet}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
        role="dialog"
        tabIndex={-1}
      >
        {/* 헤더 */}
        <div className={styles.header}>
          <h2 className={`${styles.title} ${typo.body1NormalBold}`}>달력 선택</h2>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            <img src={closeIcon} alt="닫기" className={styles.closeIcon} />
          </button>
        </div>

        {/* 연도 선택 */}
        <div className={styles.yearSelector}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => handleYearChange('prev')}
          >
            <img src={arrowLeftIcon} alt="이전 연도" className={styles.arrowIcon} />
          </button>

          <span className={`${styles.yearText} ${typo.headingH3Bold}`}>{selectedYear}</span>

          <button
            type="button"
            className={`${styles.arrowButton} ${isNextYearDisabled ? styles.disabledArrow : ''}`}
            onClick={() => handleYearChange('next')}
            disabled={isNextYearDisabled}
          >
            <img
              src={isNextYearDisabled ? arrowRightDisabledIcon : arrowRightIcon}
              alt="다음 연도"
              className={styles.arrowIcon}
            />
          </button>
        </div>

        {/* 월 선택 그리드 */}
        <div className={styles.monthGrid}>
          {months.map((month, index) => (
            <button
              key={month}
              className={`
                ${styles.monthButton}
                ${isCurrentMonth(index) ? styles.currentMonth : ''}
                ${isDisabledMonth(index) ? styles.disabledMonth : ''}
              `}
              onClick={() => handleMonthSelect(index)}
              disabled={isDisabledMonth(index)}
              type="button"
            >
              <span
                className={`${styles.monthText} ${isCurrentMonth(index) ? typo.body1NormalBold : typo.body1NormalMedium}`}
              >
                {month}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatePickerBottomSheet;
