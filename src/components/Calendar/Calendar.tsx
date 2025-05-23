import type React from 'react';
import { useState } from 'react';
import styles from './Calendar.module.css';
import type { DayStatus } from '../../data/mockData';
import typo from '../../styles/typography.module.css';

// 링 아이콘들 import
import ring0 from '../../assets/home/0.svg';
import ring20 from '../../assets/home/20.svg';
import ring40 from '../../assets/home/40.svg';
import ring60 from '../../assets/home/60.svg';
import ring80 from '../../assets/home/80.svg';
import ring100 from '../../assets/home/100.svg';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  dayStatuses?: DayStatus[]; // 서버에서 받아올 링 아이콘 상태들
  currentDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  dayStatuses = [],
  currentDate: propCurrentDate,
}) => {
  const [currentDate, setCurrentDate] = useState(propCurrentDate || new Date(2025, 4, 1)); // 2025년 5월

  // 링 아이콘 매핑 객체
  const ringIcons: { [key: string]: string } = {
    '0.svg': ring0,
    '20.svg': ring20,
    '40.svg': ring40,
    '60.svg': ring60,
    '80.svg': ring80,
    '100.svg': ring100,
  };

  const today = new Date();
  // 오늘 날짜를 자정으로 설정 (시간 비교 제거)
  today.setHours(0, 0, 0, 0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 월의 첫 번째 날과 마지막 날 구하기
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // 달력에 표시할 날짜들 생성 (필요한 주만)
  const calendarDays: (Date | null)[] = [];

  // 첫 번째 주의 빈 공간들 (일요일부터 시작)
  const firstDayWeekday = firstDayOfMonth.getDay();
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }

  // 실제 날짜들
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    calendarDays.push(new Date(year, month, day));
  }

  // 마지막 주를 완성하기 위한 다음 달 날짜들 (7로 나누어 떨어지게)
  const totalCells = calendarDays.length;
  const remainingCells = totalCells % 7;
  if (remainingCells > 0) {
    const cellsToAdd = 7 - remainingCells;
    for (let day = 1; day <= cellsToAdd; day++) {
      calendarDays.push(new Date(year, month + 1, day));
    }
  }

  // 날짜 선택 처리
  const handleDateClick = (date: Date | null) => {
    if (!date || isFutureDate(date)) return;
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  // 날짜가 같은지 비교
  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 미래 날짜인지 확인
  const isFutureDate = (date: Date) => {
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck > today;
  };

  // 날짜에 해당하는 링 아이콘 찾기
  const getRingIconForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const dayStatus = dayStatuses.find(status => status.date === dateString);
    return dayStatus?.ringIcon || '0.svg';
  };

  // 요일 이름 배열
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className={styles.calendar}>
      {/* 요일 헤더 */}
      <div className={styles.weekHeader}>
        {dayNames.map((day, index) => (
          <div
            key={day}
            className={`${styles.weekDay} ${typo.labelNormalMedium} ${index === 0 ? styles.sunday : ''}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className={styles.daysGrid}>
        {calendarDays.map((date, index) => {
          if (!date) {
            return (
              <div
                key={`empty-${year}-${month}-empty-${index}-${Math.random()}`}
                className={styles.emptyDay}
              />
            );
          }

          const isCurrentMonth = date.getMonth() === month;
          const isSelected = selectedDate && isSameDate(date, selectedDate);
          const isFuture = isFutureDate(date);
          const ringIcon = isCurrentMonth && !isFuture ? getRingIconForDate(date) : null;

          return (
            <button
              type="button"
              key={date.toISOString()}
              className={`
                ${styles.dayButton}
                ${!isCurrentMonth ? styles.otherMonth : ''}
                ${isSelected ? styles.selected : ''}
                ${isFuture ? styles.futureDate : ''}
              `}
              onClick={() => handleDateClick(date)}
              disabled={isFuture}
            >
              <div className={styles.dayContent}>
                {ringIcon && ringIcons[ringIcon] && !isFuture && (
                  <div className={styles.emojiCircle}>
                    <img src={ringIcons[ringIcon]} alt="day status" className={styles.ringIcon} />
                  </div>
                )}
                <div
                  className={`${styles.dayNumber} ${isFuture ? typo.body1NormalMedium : typo.caption1Medium}`}
                >
                  {date.getDate()}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
