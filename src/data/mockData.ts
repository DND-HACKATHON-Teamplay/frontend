// 서버에서 받아올 이모티콘 상태 타입 정의
export interface DayStatus {
  date: string; // YYYY-MM-DD format
  emoji: string;
}

// 2025년 5월 예시 데이터
export const mockDayStatuses: DayStatus[] = [
  { date: '2025-05-01', emoji: '😊' },
  { date: '2025-05-02', emoji: '😴' },
  { date: '2025-05-03', emoji: '😢' },
  { date: '2025-05-04', emoji: '😡' },
  { date: '2025-05-05', emoji: '🤔' },
  { date: '2025-05-06', emoji: '😎' },
  { date: '2025-05-07', emoji: '🥰' },
  { date: '2025-05-08', emoji: '😅' },
  { date: '2025-05-09', emoji: '😴' },
  { date: '2025-05-10', emoji: '😊' },
  { date: '2025-05-11', emoji: '🤗' },
  { date: '2025-05-12', emoji: '😌' },
  { date: '2025-05-13', emoji: '😄' },
  { date: '2025-05-14', emoji: '😊' },
  { date: '2025-05-15', emoji: '😴' },
  { date: '2025-05-16', emoji: '🙂' },
  { date: '2025-05-17', emoji: '😊' },
  { date: '2025-05-18', emoji: '😅' },
  { date: '2025-05-19', emoji: '😌' },
  { date: '2025-05-20', emoji: '😊' },
  { date: '2025-05-21', emoji: '🤔' },
  { date: '2025-05-22', emoji: '😎' },
  { date: '2025-05-23', emoji: '😊' },
  { date: '2025-05-24', emoji: '😴' },
  { date: '2025-05-25', emoji: '😅' },
  { date: '2025-05-26', emoji: '😊' },
  { date: '2025-05-27', emoji: '🤗' },
  { date: '2025-05-28', emoji: '😌' }, // 선택된 날짜
  { date: '2025-05-29', emoji: '😊' },
  { date: '2025-05-30', emoji: '🎉' },
  { date: '2025-05-31', emoji: '😴' },
];

// 다른 월의 예시 데이터도 추가 가능
export const mockDayStatusesApril: DayStatus[] = [
  { date: '2025-04-01', emoji: '🌸' },
  { date: '2025-04-02', emoji: '😊' },
  { date: '2025-04-03', emoji: '😴' },
  // ... 더 많은 데이터
];

export const mockDayStatusesJune: DayStatus[] = [
  { date: '2025-06-01', emoji: '☀️' },
  { date: '2025-06-02', emoji: '😊' },
  { date: '2025-06-03', emoji: '🌺' },
  // ... 더 많은 데이터
];
