import axios from 'axios';
import { tokenUtils } from '../utils/auth';

const GET_CHATS_API = 'https://bb-konkuk.shop/api/v1/conversation/by-call-date?date=';

export const getChats = async (date: string) => {
  console.log(date);
  const token = tokenUtils.getToken();
  try {
    const response = await axios.get(`${GET_CHATS_API}${date}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('대화 내용 조회 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '대화 내용 조회 중 오류 발생');
  }
};
