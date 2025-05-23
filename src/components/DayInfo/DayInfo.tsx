import type React from 'react';
import styles from './DayInfo.module.css';
import typo from '../../styles/typography.module.css';
import { mockDayStatusesRaw } from '../../data/mockData';

interface DayInfoData {
  healthStatus: 'BAD' | 'NORMAL' | 'HAPPY' | null;
  sleepTime: number | null;
  mindStatus: 'BAD' | 'NORMAL' | 'HAPPY' | null;
}

interface DayInfoProps {
  selectedDate?: Date;
  dayInfo?: DayInfoData;
  onDataAvailabilityChange?: (hasData: boolean) => void;
}

const DayInfo: React.FC<DayInfoProps> = ({ selectedDate, dayInfo, onDataAvailabilityChange }) => {
  // 기본 데이터 (데이터가 없는 경우)
  const defaultDayInfo: DayInfoData = {
    healthStatus: null,
    sleepTime: null,
    mindStatus: null,
  };

  // 선택된 날짜에 해당하는 데이터 찾기
  const getDataForSelectedDate = (): DayInfoData => {
    if (!selectedDate) {
      onDataAvailabilityChange?.(false);
      return defaultDayInfo;
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    const dayData = mockDayStatusesRaw.find(data => data.date === dateString);

    if (dayData) {
      onDataAvailabilityChange?.(true);
      return {
        healthStatus: dayData.healthStatus,
        sleepTime: 7, // 목 데이터에서는 고정값
        mindStatus: dayData.mindStatus,
      };
    }

    onDataAvailabilityChange?.(false);
    return defaultDayInfo;
  };

  const currentDayInfo = dayInfo || getDataForSelectedDate();

  // 상태값을 CSS 클래스로 변환 (null인 경우 sleep 스타일 사용)
  const getStatusClass = (status: string | null) => {
    if (status === null) return 'sleep';

    switch (status) {
      case 'BAD':
        return 'bad';
      case 'NORMAL':
        return 'normal';
      case 'HAPPY':
        return 'happy';
      default:
        return 'sleep';
    }
  };

  // 상태값을 한국어로 변환 (null인 경우 '-' 표시)
  const getStatusText = (status: string | null) => {
    if (status === null) return '-';

    switch (status) {
      case 'BAD':
        return '나쁨';
      case 'NORMAL':
        return '보통';
      case 'HAPPY':
        return '좋음';
      default:
        return '-';
    }
  };

  // 수면시간 표시 (null인 경우 '-' 표시)
  const getSleepTimeText = (sleepTime: number | null) => {
    return sleepTime === null ? '-' : `${sleepTime}시간`;
  };

  return (
    <div className={styles.dayInfoContainer}>
      <div className={styles.infoGrid}>
        {/* 건강징후 */}
        <div
          className={`${styles.infoCard} ${styles[getStatusClass(currentDayInfo.healthStatus)]}`}
        >
          <div className={`${styles.infoLabel} ${typo.caption1Medium}`}>건강징후</div>
          <div className={`${styles.infoValue} ${typo.body1NormalBold}`}>
            {getStatusText(currentDayInfo.healthStatus)}
          </div>
        </div>

        {/* 심리상태 */}
        <div className={`${styles.infoCard} ${styles[getStatusClass(currentDayInfo.mindStatus)]}`}>
          <div className={`${styles.infoLabel} ${typo.caption1Medium}`}>심리상태</div>
          <div className={`${styles.infoValue} ${typo.body1NormalBold}`}>
            {getStatusText(currentDayInfo.mindStatus)}
          </div>
        </div>

        {/* 수면 */}
        <div className={`${styles.infoCard} ${styles.sleep}`}>
          <div className={`${styles.infoLabel} ${typo.caption1Medium}`}>수면시간</div>
          <div className={`${styles.infoValue} ${typo.body1NormalBold}`}>
            {getSleepTimeText(currentDayInfo.sleepTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayInfo;
