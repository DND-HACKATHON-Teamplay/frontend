import type React from 'react';
import styles from './DayInfo.module.css';
import typo from '../../styles/typography.module.css';
import { useEffect, useState } from 'react';
import { dailyAPI, type DayInfoData } from '../../services/Daily/dailyAPI';

interface DayInfoProps {
  selectedDate?: Date;
  dayInfo?: DayInfoData;
  setDayInfo?: (value: DayInfoData) => void;
  onDataAvailabilityChange?: (hasData: boolean) => void;
}

const DayInfo: React.FC<DayInfoProps> = ({
  selectedDate,
  dayInfo,
  setDayInfo,
  onDataAvailabilityChange,
}) => {
  // Removed unused isLoading state
  const [error, setError] = useState<string | null>(null);

  // 기본 데이터 (데이터가 없는 경우)
  const defaultDayInfo: DayInfoData = {
    healthStatus: null,
    sleepTime: null,
    mindStatus: null,
  };

  // API에서 데이터 가져오기
  // DayInfo.tsx 수정
  const fetchDataFromAPI = async (): Promise<DayInfoData> => {
    if (!selectedDate) {
      onDataAvailabilityChange?.(false);
      return defaultDayInfo;
    }

    setError(null);

    try {
      const dateString = dailyAPI.formatDateForAPI(selectedDate);
      const result = await dailyAPI.getDailyData(dateString);

      if (result.success && result.data) {
        const convertedData = dailyAPI.convertToDayInfoData(result.data);

        // 실제 데이터가 있는지 확인 (모든 값이 null이 아닌지 체크)
        const hasRealData =
          convertedData.healthStatus !== null ||
          convertedData.mindStatus !== null ||
          convertedData.sleepTime !== null;

        console.log('✅ API 데이터 변환 완료:', {
          원본: result.data,
          변환후: convertedData,
          실제데이터존재: hasRealData,
        });

        onDataAvailabilityChange?.(hasRealData);
        return convertedData;
      } else {
        // API 실패시 기본 데이터 반환
        console.warn('API 데이터 조회 실패:', result.message);
        onDataAvailabilityChange?.(false);
        return defaultDayInfo;
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      onDataAvailabilityChange?.(false);
      return defaultDayInfo;
    }
  };

  const currentDayInfo = dayInfo || defaultDayInfo;

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
    if (sleepTime === null || sleepTime === undefined) return '-';
    return `${sleepTime}시간`;
  };

  useEffect(() => {
    if (!selectedDate) {
      setDayInfo?.(defaultDayInfo);
      return;
    }

    const loadData = async () => {
      const newDayInfo = await fetchDataFromAPI();
      setDayInfo?.(newDayInfo);
    };

    loadData();
  }, [selectedDate, setDayInfo]);

  return (
    <div className={styles.dayInfoContainer}>
      {error && (
        <div style={{ textAlign: 'center', padding: '8px', fontSize: '12px', color: '#ff6b6b' }}>
          {error}
        </div>
      )}

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
