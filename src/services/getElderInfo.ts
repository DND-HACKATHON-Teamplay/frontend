import axios from 'axios';
import { tokenUtils } from '../utils/auth';

const GET_ELDER_INFO = 'https://bb-konkuk.shop/api/v1/elderly';

export const getElderInfo = async () => {
  const token = tokenUtils.getToken();
  try {
    const response = await axios.get(GET_ELDER_INFO, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('어르신 정보 조회 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '어르신 정보 조회 중 오류 발생');
  }
};
