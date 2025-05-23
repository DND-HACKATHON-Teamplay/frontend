import type React from 'react';
import { useState } from 'react';
import styles from './Calendar.module.css';
import type { DayStatus } from '../../data/mockData';
import typo from '../../styles/typography.module.css';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  dayStatuses?: DayStatus[]; // 서버에서 받아올 이모티콘 상태들
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, dayStatuses = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // 2025년 5월

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 월의 첫 번째 날과 마지막 날 구하기
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // 달력에 표시할 날짜들 생성 (6주 * 7일 = 42일)
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

  // 나머지 빈 공간들을 다음 달 날짜로 채우기
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push(new Date(year, month + 1, day));
  }

  // 날짜 선택 처리
  const handleDateClick = (date: Date | null) => {
    if (date && onDateSelect) {
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

  // 날짜에 해당하는 이모티콘 찾기
  const getEmojiForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const dayStatus = dayStatuses.find(status => status.date === dateString);
    return dayStatus?.emoji || '';
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
          const emoji = isCurrentMonth ? getEmojiForDate(date) : '';

          return (
            <button
              type="button"
              key={date.toISOString()}
              className={`
                ${styles.dayButton}
                ${!isCurrentMonth ? styles.otherMonth : ''}
                ${isSelected ? styles.selected : ''}
              `}
              onClick={() => handleDateClick(date)}
            >
              <div className={styles.dayContent}>
                {emoji && (
                  <div className={styles.emojiCircle}>
                    <span className={styles.emoji}>{emoji}</span>
                  </div>
                )}
                <div className={`${styles.dayNumber} ${typo.caption1Medium}`}>{date.getDate()}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
