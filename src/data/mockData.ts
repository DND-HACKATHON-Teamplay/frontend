// 백엔드에서 받는 원본 데이터 타입
export interface DayStatusRaw {
  date: string; // YYYY-MM-DD 형식
  healthStatus: 'BAD' | 'NORMAL' | 'HAPPY';
  mindStatus: 'BAD' | 'NORMAL' | 'HAPPY';
}

// 프론트엔드에서 사용할 가공된 데이터 타입
export interface DayStatus {
  date: string;
  ringIcon: string; // 링 아이콘 파일명 (예: "100.svg")
}

// 상태 조합에 따른 점수 계산 함수 (null 값 처리 추가)
export const calculateScore = (healthStatus: string | null, mindStatus: string | null): number => {
  // 둘 중 하나라도 null이면 0점
  if (healthStatus === null || mindStatus === null) return 0;

  // 점수 계산 로직
  if (healthStatus === 'HAPPY' && mindStatus === 'HAPPY') return 100; // HAPPY + HAPPY
  if (
    (healthStatus === 'HAPPY' && mindStatus === 'NORMAL') ||
    (healthStatus === 'NORMAL' && mindStatus === 'HAPPY')
  )
    return 80; // HAPPY + NORMAL
  if (healthStatus === 'NORMAL' && mindStatus === 'NORMAL') return 60; // NORMAL + NORMAL
  if (
    (healthStatus === 'BAD' && mindStatus === 'NORMAL') ||
    (healthStatus === 'NORMAL' && mindStatus === 'BAD')
  )
    return 40; // BAD + NORMAL
  if (healthStatus === 'BAD' && mindStatus === 'BAD') return 20; // BAD + BAD

  return 0; // 기본값
};

// 백엔드 데이터를 프론트엔드용으로 변환하는 함수
export const transformDayStatus = (rawData: DayStatusRaw): DayStatus => {
  const score = calculateScore(rawData.healthStatus, rawData.mindStatus);
  return {
    date: rawData.date,
    ringIcon: `${score}.svg`,
  };
};

// 원본 목 데이터 (백엔드에서 받는 형태)
export const mockDayStatusesRaw: DayStatusRaw[] = [
  { date: '2025-05-21', healthStatus: 'NORMAL', mindStatus: 'HAPPY' },
  { date: '2025-05-22', healthStatus: 'NORMAL', mindStatus: 'NORMAL' },
  { date: '2025-05-23', healthStatus: 'BAD', mindStatus: 'NORMAL' },
  // { date: '2025-05-24', healthStatus: 'HAPPY', mindStatus: 'HAPPY' }, // 서버 데이터 사용을 위해 삭제
  { date: '2025-05-25', healthStatus: 'HAPPY', mindStatus: 'NORMAL' },
  { date: '2025-05-26', healthStatus: 'HAPPY', mindStatus: 'HAPPY' },
  { date: '2025-05-27', healthStatus: 'NORMAL', mindStatus: 'HAPPY' },
  // { date: '2025-05-28', healthStatus: 'BAD', mindStatus: 'NORMAL' }, // 28일 데이터 없음 (테스트용)
];

// 변환된 목 데이터 (캘린더에서 사용할 형태)
export const mockDayStatuses: DayStatus[] = mockDayStatusesRaw.map(transformDayStatus);
