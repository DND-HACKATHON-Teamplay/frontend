import type React from 'react';
import styles from './DayInfo.module.css';
import typo from '../../styles/typography.module.css';

interface DayInfoData {
  healthStatus: 'BAD' | 'NORMAL' | 'HAPPY';
  sleepTime: number;
  mindStatus: 'BAD' | 'NORMAL' | 'HAPPY';
}

interface DayInfoProps {
  selectedDate?: Date;
  dayInfo?: DayInfoData;
}

const DayInfo: React.FC<DayInfoProps> = ({ selectedDate, dayInfo }) => {
  // 기본 데이터
  const defaultDayInfo: DayInfoData = {
    healthStatus: 'BAD',
    sleepTime: 7,
    mindStatus: 'HAPPY',
  };

  const currentDayInfo = dayInfo || defaultDayInfo;

  // 상태값을 CSS 클래스로 변환
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'BAD':
        return 'bad';
      case 'NORMAL':
        return 'normal';
      case 'HAPPY':
        return 'happy';
      default:
        return 'normal';
    }
  };

  // 상태값을 한국어로 변환
  const getStatusText = (status: string) => {
    switch (status) {
      case 'BAD':
        return '나쁨';
      case 'NORMAL':
        return '보통';
      case 'HAPPY':
        return '좋음';
      default:
        return '보통';
    }
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
            {currentDayInfo.sleepTime}시간
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayInfo;
