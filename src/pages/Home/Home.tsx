import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/Login/auth';
import type { UserInfo } from '../../services/Login/auth';
import { tokenUtils } from '../../utils/auth';
import Header from '../../components/Calendar/Component/Header';
import Calendar from '../../components/Calendar/Calendar';
import DayInfo from '../../components/DayInfo/DayInfo';
import ChatButton from '../../components/ChatButton/ChatButton';
import DatePickerBottomSheet from '../../components/Calendar/Component/DatePickerBottomSheet';
import { mockDayStatuses } from '../../data/mockData';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasDataForSelectedDate, setHasDataForSelectedDate] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // 달력 관련 state
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 4, 24));

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (tokenUtils.isLoggedIn()) {
        // 사용자 정보 조회 시도
        try {
          const result = await authAPI.getUserInfo();
          if (result.success && result.data) {
            const userInfo = result.data as UserInfo;
            // username 사용하지 않으므로 제거
            console.log('사용자:', userInfo.name || userInfo.email || '사용자');
          }
        } catch (error) {
          console.error('사용자 정보 조회 실패:', error);
        }
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [navigate]);

  // 달력 날짜 선택 핸들러
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log('선택된 날짜:', date.toLocaleDateString('ko-KR'));
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
  const handleDatePickerSelect = (date: Date) => {
    setCurrentDate(date);
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  // 설정 버튼 클릭 핸들러
  const handleSettingsClick = () => {
    console.log('설정 버튼 클릭됨');
  };

  // 데이터 가용성 변경 핸들러
  const handleDataAvailabilityChange = (hasData: boolean) => {
    setHasDataForSelectedDate(hasData);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>🔄 로딩 중...</div>
      </div>
    );
  }

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
          dayStatuses={mockDayStatuses}
          currentDate={currentDate}
        />

        <DayInfo
          selectedDate={selectedDate}
          onDataAvailabilityChange={handleDataAvailabilityChange}
        />

        {/* 채팅 버튼 */}
        <ChatButton disabled={!hasDataForSelectedDate} />
        <button type="button" onClick={() => navigate('/register')}>
          등록하기로 가기
        </button>
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
