import type React from 'react';
import styles from './DayInfo.module.css';
import typo from '../../styles/typography.module.css';

interface DayInfoData {
  healthStatus: {
    label: string;
    value: string;
    status: 'bad' | 'normal' | 'good';
  };
  mentalState: {
    label: string;
    value: string;
    status: 'bad' | 'normal' | 'good';
  };
  sleep: {
    label: string;
    value: string;
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
      status: 'bad',
    },
    mentalState: {
      label: '심리상태',
      value: '좋음',
      status: 'good',
    },
    sleep: {
      label: '수면',
      value: '7시간',
    },
  };

  const currentDayInfo = dayInfo || defaultDayInfo;

  return (
    <div className={styles.dayInfoContainer}>
      <div className={styles.infoGrid}>
        {/* 건강징후 */}
        <div className={`${styles.infoCard} ${styles[currentDayInfo.healthStatus.status]}`}>
          <div className={`${styles.infoLabel} ${typo.caption1Medium}`}>
            {currentDayInfo.healthStatus.label}
          </div>
          <div className={`${styles.infoValue} ${typo.body1NormalBold}`}>
            {currentDayInfo.healthStatus.value}
          </div>
        </div>

        {/* 심리상태 */}
        <div className={`${styles.infoCard} ${styles[currentDayInfo.mentalState.status]}`}>
          <div className={`${styles.infoLabel} ${typo.caption1Medium}`}>
            {currentDayInfo.mentalState.label}
          </div>
          <div className={`${styles.infoValue} ${typo.body1NormalBold}`}>
            {currentDayInfo.mentalState.value}
          </div>
        </div>

        {/* 수면 */}
        <div className={`${styles.infoCard} ${styles.sleep}`}>
          <div className={`${styles.infoLabel} ${typo.caption1Medium}`}>
            {currentDayInfo.sleep.label}
          </div>
          <div className={`${styles.infoValue} ${typo.body1NormalBold}`}>
            {currentDayInfo.sleep.value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayInfo;
