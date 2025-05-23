// 어르신 등록하기 api
import axios from 'axios';
import { tokenUtils } from '../utils/auth';

const DELETE_USER_API = 'https://bb-konkuk.shop/api/v1/member';

export const deleteUser = async () => {
  const token = tokenUtils.getToken();
  try {
    const response = await axios.delete(DELETE_USER_API, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('회원 탈퇴 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '회원 탈퇴 중 오류 발생');
  }
};
