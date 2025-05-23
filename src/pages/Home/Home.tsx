import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenUtils } from '../../utils/auth';
import { dailyAPI, type DayInfoData } from '../../services/Daily/dailyAPI';
import Header from '../../components/Calendar/Component/Header';
import Calendar from '../../components/Calendar/Calendar';
import DayInfo from '../../components/DayInfo/DayInfo';
import ChatButton from '../../components/ChatButton/ChatButton';
import DatePickerBottomSheet from '../../components/Calendar/Component/DatePickerBottomSheet';
import type { DayStatus } from '../../data/mockData';
import styles from './Home.module.css';
import { isRegisteredApi } from '../../services/isRegistered';

const Home = () => {
  const navigate = useNavigate();
  const [hasDataForSelectedDate, setHasDataForSelectedDate] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // 달력 관련 state
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 4, 24));

  // 해당 날 정보
  const [dayInfo, setDayInfo] = useState<DayInfoData>();

  // 서버 데이터를 포함한 달력 상태
  const [calendarStatuses, setCalendarStatuses] = useState<DayStatus[]>([]);

  const calculateScore = (healthStatus: string | null, mindStatus: string | null): number => {
    const getStatusScore = (status: string | null): number => {
      if (status === null) return 0;

      switch (status) {
        case 'HAPPY':
          return 50;
        case 'NORMAL':
          return 30;
        case 'BAD':
          return 10;
        default:
          return 0;
      }
    };

    return getStatusScore(healthStatus) + getStatusScore(mindStatus);
  };

  // 전체 달력 데이터 로딩 함수
  const loadCalendarData = async (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newStatuses: DayStatus[] = [];

    // 현재 달의 모든 날짜에 대해 데이터 조회
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);

      // 미래 날짜는 건너뛰기
      if (currentDay > today) continue;

      try {
        const dateString = dailyAPI.formatDateForAPI(currentDay);
        const result = await dailyAPI.getDailyData(dateString);

        if (result.success && result.data) {
          const convertedData = dailyAPI.convertToDayInfoData(result.data);
          const score = calculateScore(convertedData.healthStatus, convertedData.mindStatus);

          newStatuses.push({
            date: currentDay.toISOString().split('T')[0],
            ringIcon: `${score}.svg`,
          });
        }
      } catch (error) {
        console.warn(`❌ ${day}일 데이터 로딩 실패:`, error);
      }
    }

    setCalendarStatuses(newStatuses);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (tokenUtils.isLoggedIn()) {
       try {
          // 어르신 등록 여부 확인
          const isRegisteredResponse = await isRegisteredApi();
          if (isRegisteredResponse) {
            navigate('/register');
            return; // 더 이상 진행하지 않음
          }
        } catch (error) {
          console.error('등록 여부 확인 실패:', error);
        }

        // 인증 확인 후 달력 데이터 로딩
        await loadCalendarData(currentDate);
      } else {
        navigate('/login');
      }
    };

    checkAuthStatus();
  }, [navigate, currentDate]);

  // dayInfo가 업데이트될 때 달력 상태도 업데이트 (개별 날짜)
  useEffect(() => {
    if (dayInfo && selectedDate && (dayInfo.healthStatus !== null || dayInfo.mindStatus !== null)) {
      const dateString = selectedDate.toISOString().split('T')[0]; // Calendar 형식과 맞춤
      const score = calculateScore(dayInfo.healthStatus, dayInfo.mindStatus);

      // 기존 달력 상태에서 해당 날짜 업데이트
      setCalendarStatuses(prev => {
        const existing = prev.find(status => status.date === dateString);
        if (existing) {
          // 기존 데이터 업데이트
          return prev.map(status =>
            status.date === dateString ? { ...status, ringIcon: `${score}.svg` } : status,
          );
        } else {
          // 새 데이터 추가
          return [...prev, { date: dateString, ringIcon: `${score}.svg` }];
        }
      });
    }
  }, [dayInfo, selectedDate]);

  // 달력 날짜 선택 핸들러
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // 헤더의 날짜 선택기 클릭 핸들러
  const handleDatePickerClick = () => {
    setIsDatePickerOpen(true);
  };

  // 바텀시트 닫기 핸들러
  const handleDatePickerClose = () => {
    setIsDatePickerOpen(false);
  };

  // 바텀시트에서 날짜 선택 핸들러
  const handleDatePickerSelect = async (date: Date) => {
    setCurrentDate(date);
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), 1));

    // 새로운 달을 선택했을 때 해당 달의 데이터도 다시 로딩
    await loadCalendarData(date);
  };

  // 설정 버튼 클릭 핸들러
  const handleSettingsClick = () => {
    console.log('설정 버튼 클릭됨');
    navigate('/setting');
  };

  // 데이터 가용성 변경 핸들러
  const handleDataAvailabilityChange = (hasData: boolean) => {
    setHasDataForSelectedDate(hasData);
  };

  return (
    <div className={styles.homeContainer}>
      {/* 헤더 */}
      <Header
        currentDate={currentDate}
        onDatePickerClick={handleDatePickerClick}
        onSettingsClick={handleSettingsClick}
      />

      {/* 달력과 DayInfo를 하나의 컨테이너로 묶음 */}
      <div className={styles.calendarContainer}>
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          dayStatuses={calendarStatuses}
          currentDate={currentDate}
        />

        <DayInfo
          selectedDate={selectedDate}
          dayInfo={dayInfo}
          setDayInfo={setDayInfo}
          onDataAvailabilityChange={handleDataAvailabilityChange}
        />

        {/* 채팅 버튼 */}
        <ChatButton
          disabled={!hasDataForSelectedDate}
          selectedDate={selectedDate}
          dayInfo={dayInfo}
        />
      </div>

      {/* 날짜 선택 바텀시트 */}
      <DatePickerBottomSheet
        isOpen={isDatePickerOpen}
        onClose={handleDatePickerClose}
        currentDate={currentDate}
        onDateSelect={handleDatePickerSelect}
      />
    </div>
  );
};

export default Home;
