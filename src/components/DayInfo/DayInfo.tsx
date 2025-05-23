import type React from 'react';
import styles from './DayInfo.module.css';
import typo from '../../styles/typography.module.css';
import { mockDayStatusesRaw } from '../../data/mockData';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 기본 데이터 (데이터가 없는 경우)
  const defaultDayInfo: DayInfoData = {
    healthStatus: null,
    sleepTime: null,
    mindStatus: null,
  };

  // 목 데이터에서 선택된 날짜에 해당하는 데이터 찾기 (API 실패시 대체용)
  const getMockDataForSelectedDate = (): DayInfoData => {
    if (!selectedDate) {
      return defaultDayInfo;
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    const dayData = mockDayStatusesRaw.find(data => data.date === dateString);

    if (dayData) {
      return {
        healthStatus: dayData.healthStatus,
        sleepTime: 7, // 목 데이터에서는 고정값
        mindStatus: dayData.mindStatus,
      };
    }

    return defaultDayInfo;
  };

  // API에서 데이터 가져오기
  const fetchDataFromAPI = async (): Promise<DayInfoData> => {
    if (!selectedDate) {
      onDataAvailabilityChange?.(false);
      return defaultDayInfo;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dateString = dailyAPI.formatDateForAPI(selectedDate);
      const result = await dailyAPI.getDailyData(dateString);

      if (result.success && result.data) {
        const convertedData = dailyAPI.convertToDayInfoData(result.data);
        onDataAvailabilityChange?.(true);
        return convertedData;
      } else {
        // API 실패시 목 데이터 사용
        console.warn('API 데이터 조회 실패, 목 데이터 사용:', result.message);
        const mockData = getMockDataForSelectedDate();
        const hasData =
          mockData.healthStatus !== null ||
          mockData.sleepTime !== null ||
          mockData.mindStatus !== null;
        onDataAvailabilityChange?.(hasData);
        return mockData;
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생, 목 데이터 사용:', error);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      const mockData = getMockDataForSelectedDate();
      const hasData =
        mockData.healthStatus !== null ||
        mockData.sleepTime !== null ||
        mockData.mindStatus !== null;
      onDataAvailabilityChange?.(hasData);
      return mockData;
    } finally {
      setIsLoading(false);
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
    return sleepTime === null ? '-' : `${sleepTime}시간`;
  };

  useEffect(() => {
    if (!setDayInfo || !selectedDate) return;

    const loadData = async () => {
      const newDayInfo = await fetchDataFromAPI();
      setDayInfo(newDayInfo);
    };

    loadData();
  }, [selectedDate, setDayInfo]);

  return (
    <div className={styles.dayInfoContainer}>
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '8px', fontSize: '12px', color: '#666' }}>
          데이터를 불러오는 중...
        </div>
      )}

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
