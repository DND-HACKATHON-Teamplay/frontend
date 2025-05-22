const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bb-konkuk.shop';

// API 응답 타입 정의
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

// 공통 fetch 함수
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('accessToken');

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.ok) {
      return { success: true };
    }
    return {
      success: false,
      message: `API 오류: ${response.status}`,
    };
  } catch (error) {
    console.error('API 요청 실패:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.',
    };
  }
}

// 인증 관련 API
export const authAPI = {
  // 로그아웃
  logout: async (): Promise<ApiResponse> => {
    return apiRequest('/api/v1/member/logout', {
      method: 'POST',
    });
  },

  // 사용자 정보 조회 (추후 구현 시)
  getUserInfo: async (): Promise<ApiResponse> => {
    return apiRequest('/api/v1/member/info', {
      method: 'GET',
    });
  },
};

// OAuth 관련 함수
export const oauthAPI = {
  // 구글 로그인 URL 생성
  getGoogleLoginUrl: (): string => {
    return `${API_BASE_URL}/oauth2/authorization/google`;
  },

  // 카카오 로그인 URL 생성
  getKakaoLoginUrl: (): string => {
    return `${API_BASE_URL}/oauth2/authorization/kakao`;
  },
};
