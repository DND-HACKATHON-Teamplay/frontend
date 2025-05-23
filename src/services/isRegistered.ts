// 어르신 등록까지 완전 회원가입 완료됐는지 여부 api
// 등록까지
import axios from 'axios';
import { tokenUtils } from '../utils/auth';

const IS_REGISTERED_API = 'https://bb-konkuk.shop/api/v1/member';

export const isRegisteredApi = async () => {
  const token = tokenUtils.getToken();
  try {
    const response = await axios.get(IS_REGISTERED_API, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('어르신 등록 여부 확인 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '어르신 등록 여부 확인 중 오류 발생');
  }
};
