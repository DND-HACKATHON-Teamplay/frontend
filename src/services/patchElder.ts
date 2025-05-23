import axios from 'axios';
import { tokenUtils } from '../utils/auth';

const EDIT_ELDER = 'https://bb-konkuk.shop/api/v1/elderly';

export const patchElder = async (
  name: string,
  birthDate: string,
  gender: string,
  phoneNumber: string,
  relationship: string,
  timeToCall: string,
) => {
  const token = tokenUtils.getToken();
  try {
    const response = await axios.patch(
      EDIT_ELDER,
      {
        name: name,
        birthDate: birthDate,
        gender: gender,
        phoneNumber: phoneNumber,
        relationship: relationship,
        timeToCall: timeToCall,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('어르신 정보 조회 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '어르신 정보 조회 중 오류 발생');
  }
};
