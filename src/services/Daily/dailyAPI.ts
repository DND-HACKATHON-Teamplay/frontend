import { tokenUtils } from '../../utils/auth';
import axios from 'axios';

// 일일 데이터 타입 정의 (기존 타입과 일치)
export interface DailyData {
  id: number;
  healthStatus: 'HAPPY' | 'NORMAL' | 'SAD';
  sleepTime: number;
  mindStatus: 'HAPPY' | 'NORMAL' | 'SAD';
  createdDate: string;
  updatedDate: string;
}

// Home 컴포넌트의 DayInfoData 타입
export interface DayInfoData {
  healthStatus: 'BAD' | 'NORMAL' | 'HAPPY' | null;
  sleepTime: number | null;
  mindStatus: 'BAD' | 'NORMAL' | 'HAPPY' | null;
}

// API 응답 타입
interface DailyApiResponse {
  success: boolean;
  data?: DailyData;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bb-konkuk.shop';

export const dailyAPI = {
  // 특정 날짜의 일일 데이터 조회
  getDailyData: async (date: string): Promise<DailyApiResponse> => {
    try {
      const token = tokenUtils.getToken();

      if (!token) {
        return {
          success: false,
          message: '인증 토큰이 없습니다.',
        };
      }

      const response = await axios.get(`${API_BASE_URL}/api/v1/call/daily`, {
        params: { date },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const rawData = response.data;

      // 필요한 데이터만 추출
      const dailyData: DailyData = {
        id: rawData.id,
        healthStatus: rawData.healthStatus,
        sleepTime: rawData.sleepTime,
        mindStatus: rawData.mindStatus,
        createdDate: rawData.createdDate,
        updatedDate: rawData.updatedDate,
      };

      return {
        success: true,
        data: dailyData,
      };
    } catch (error) {
      console.error('일일 데이터 조회 실패:', error);

      // axios 에러 처리
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        return {
          success: false,
          message: `API 호출 실패 (${status}): ${message}`,
        };
      }

      return {
        success: false,
        message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      };
    }
  },

  // 날짜 형식을 API에 맞게 변환하는 유틸리티 함수
  formatDateForAPI: (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // API 상태를 DayInfo 상태로 변환
  convertToDayInfoData: (apiData: DailyData): DayInfoData => {
    const convertStatus = (status: 'HAPPY' | 'NORMAL' | 'SAD'): 'BAD' | 'NORMAL' | 'HAPPY' => {
      switch (status) {
        case 'HAPPY':
          return 'HAPPY';
        case 'NORMAL':
          return 'NORMAL';
        case 'SAD':
          return 'BAD';
        default:
          return 'NORMAL';
      }
    };

    return {
      healthStatus: convertStatus(apiData.healthStatus),
      sleepTime: apiData.sleepTime,
      mindStatus: convertStatus(apiData.mindStatus),
    };
  },
};
