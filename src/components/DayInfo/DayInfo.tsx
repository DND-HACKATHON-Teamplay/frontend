import type React from 'react';
import styles from './DayInfo.module.css';

interface DayInfoData {
  healthStatus: {
    label: string;
    value: string;
    color: 'red' | 'green' | 'blue';
  };
  mentalState: {
    label: string;
    value: string;
    color: 'red' | 'green' | 'blue';
  };
  sleep: {
    label: string;
    value: string;
    color: 'red' | 'green' | 'blue';
  };
}

interface DayInfoProps {
  selectedDate?: Date;
  dayInfo?: DayInfoData;
}

const DayInfo: React.FC<DayInfoProps> = ({ selectedDate, dayInfo }) => {
  // 기본 데이터 (선택된 날짜가 28일인 경우의 예시)
  const defaultDayInfo: DayInfoData = {
    healthStatus: {
      label: '건강징후',
      value: '나쁨',
      color: 'red',
    },
    mentalState: {
      label: '심리상태',
      value: '좋음',
      color: 'green',
    },
    sleep: {
      label: '수면',
      value: '7시간 12분',
      color: 'blue',
    },
  };

  const currentDayInfo = dayInfo || defaultDayInfo;

  return (
    <div className={styles.dayInfoContainer}>
      <div className={styles.infoGrid}>
        {/* 건강징후 */}
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>{currentDayInfo.healthStatus.label}</div>
          <div className={`${styles.infoValue} ${styles[currentDayInfo.healthStatus.color]}`}>
            {currentDayInfo.healthStatus.value}
          </div>
        </div>

        {/* 심리상태 */}
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>{currentDayInfo.mentalState.label}</div>
          <div className={`${styles.infoValue} ${styles[currentDayInfo.mentalState.color]}`}>
            {currentDayInfo.mentalState.value}
          </div>
        </div>

        {/* 수면 */}
        <div className={styles.infoCard}>
          <div className={styles.infoLabel}>{currentDayInfo.sleep.label}</div>
          <div className={`${styles.infoValue} ${styles[currentDayInfo.sleep.color]}`}>
            {currentDayInfo.sleep.value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayInfo;
