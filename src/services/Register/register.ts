// 어르신 등록하기 api
import axios from 'axios';
import { tokenUtils } from '../../utils/auth';

const REGISTER_API = 'https://bb-konkuk.shop/api/v1/elderly';

export const postRegisterElder = async (
  name: string,
  birthDate: string,
  gender: string,
  phoneNumber: string,
  relationship: string,
  timeToCall: string,
) => {
  const token = tokenUtils.getToken();
  console.log(name, birthDate, gender, phoneNumber, relationship, timeToCall);
  try {
    const response = await axios.post(
      REGISTER_API,
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
    console.error('어르신 등록 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '어르신 등록 중 오류 발생');
  }
};
