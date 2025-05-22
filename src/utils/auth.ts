// 토큰 관리
export const tokenUtils = {
  // 토큰 저장
  setToken: (token: string): void => {
    localStorage.setItem('accessToken', token);
  },

  // 토큰 조회
  getToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  // 토큰 삭제
  removeToken: (): void => {
    localStorage.removeItem('accessToken');
  },

  // 로그인 상태 확인
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
};

// JWT 토큰 디코딩 (선택사항)
export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT 디코딩 실패:', error);
    return null;
  }
};
