import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/Login/auth';
import type { UserInfo } from '../../services/Login/auth';
import { tokenUtils } from '../../utils/auth';
import Header from '../../components/Calendar/Component/Header';
import Calendar from '../../components/Calendar/Calendar';
import DayInfo from '../../components/DayInfo/DayInfo';
import ChatButton from '../../components/ChatButton/ChatButton';
import { mockDayStatuses } from '../../data/mockData';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 달력 관련 state
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // 2025년 5월
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 4, 28)); // 28일 선택

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (tokenUtils.isLoggedIn()) {
        setIsLoggedIn(true);

        // 사용자 정보 조회 시도
        try {
          const result = await authAPI.getUserInfo();
          if (result.success && result.data) {
            const userInfo = result.data as UserInfo;
            setUsername(userInfo.name || userInfo.email || '사용자');
          } else {
            // API 실패 시 기본값 사용
            setUsername('사용자');
          }
        } catch (error) {
          console.error('사용자 정보 조회 실패:', error);
          setUsername('사용자');
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
    console.log('날짜 선택기 클릭됨');
    // 여기에 바텀시트 열기 로직 추가 예정
  };

  // 설정 버튼 클릭 핸들러
  const handleSettingsClick = () => {
    console.log('설정 버튼 클릭됨');
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

        <DayInfo selectedDate={selectedDate} />

        {/* 채팅 버튼 */}
        <ChatButton />
      </div>
    </div>
  );
};

export default Home;
