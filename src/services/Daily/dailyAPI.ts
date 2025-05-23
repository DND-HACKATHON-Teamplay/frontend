import { tokenUtils } from '../../utils/auth';
import axios from 'axios';

// 일일 데이터 타입 정의 (null 허용으로 수정)
export interface DailyData {
  id: number;
  healthStatus: 'HAPPY' | 'NORMAL' | 'BAD' | null;
  sleepTime: number | null;
  mindStatus: 'HAPPY' | 'NORMAL' | 'BAD' | null;
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

      // 서버에서 데이터가 없는 경우 null 유지
      const dailyData: DailyData = {
        id: rawData.id || 0,
        healthStatus: rawData.healthStatus || null, // null 유지
        sleepTime: rawData.sleepTime ? Number(rawData.sleepTime) : null, // null 유지
        mindStatus: rawData.mindStatus || null, // null 유지
        createdDate: rawData.createdDate || new Date().toISOString(),
        updatedDate: rawData.updatedDate || new Date().toISOString(),
      };

      return {
        success: true,
        data: dailyData,
      };
    } catch (error) {
      // axios 에러 처리
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const errorData = error.response?.data;

        const message = errorData?.message || error.message;
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

  // API 상태를 DayInfo 상태로 변환 (null 값 유지)
  convertToDayInfoData: (apiData: DailyData): DayInfoData => {
    const converted = {
      healthStatus: apiData.healthStatus, // null이면 null 그대로 유지
      sleepTime: apiData.sleepTime, // null이면 null 그대로 유지
      mindStatus: apiData.mindStatus, // null이면 null 그대로 유지
    };

    return converted;
  },
};
