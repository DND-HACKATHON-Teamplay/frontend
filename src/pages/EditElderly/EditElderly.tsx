import React, { useEffect, useRef, useState, type ChangeEvent } from 'react';
import styles from './EditElderly.module.css';
import InputBar from '../../components/InputBar/InputBar';
import SelectButton from '../../components/SelectButton/SelectButton';
import SelectTime from '../../components/SelectTime/SelectTime';
import { getElderInfo } from '../../services/getElderInfo';
import { patchElder } from '../../services/patchElder';
import { useNavigate } from 'react-router-dom';
import arrowBack from '../../assets/arrowBack.svg';
import { RegisterModal } from '../RegisterElder/RegisterModal/RegisterModal';

const genderSelectArr = ['남성', '여성'];
const relationShipSelectArr = ['자식', '손자', '형제', '친척'];

const EditElderly = () => {
  const navigate = useNavigate();
  const [elderName, setElderName] = useState('');
  const [birth, setBirth] = useState('');
  const [isBirthFormatted, setIsBirthFormatted] = useState(false);
  const [gender, setGender] = useState('남성');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneFormatted, setIsPhoneFormatted] = useState(false);
  const [relationship, setRelationship] = useState('자식');
  const [hour, setHour] = useState<string>('12');
  const [minutes, setMinutes] = useState<string>('00');

  const [isAm, setIsAm] = useState<boolean>(false);

  const birthInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const [modalState, setModalState] = useState<boolean>(false);

  const fetchElderData = async () => {
    try {
      const response = await getElderInfo();
      console.log(response);

      // 생년월일 포맷: "1965-01-11" → "1965 / 01 / 11"
      const formattedBirth = response.birthDate.replace(/-/g, ' / ');

      // 성별 포맷: "MALE" → "남성", "FEMALE" → "여성"
      const genderMap: Record<string, string> = {
        MALE: '남성',
        FEMALE: '여성',
      };

      // 관계 포맷: "CHILD" → "자식" 등
      const relationshipMap: Record<string, string> = {
        CHILD: '자식',
        GRANDCHILD: '손자',
        SIBLING: '형제',
        OTHER: '친척',
      };

      setElderName(response.name);
      setBirth(formattedBirth);
      setGender(genderMap[response.gender] || '남성');
      setPhoneNumber(response.phoneNumber);
      setRelationship(relationshipMap[response.relationshipWithGuardian] || '자식');
    } catch (error: any) {
      alert(error.message || '어르신 조회 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchElderData();
  }, []);

  // 생년월일 입력 처리
  const handleInputBirth = (e: ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, ''); // 숫자만
    if (raw.length > 8) raw = raw.slice(0, 8);
    setIsBirthFormatted(false);
    setBirth(raw);
  };

  // 포커스 아웃 시 생년월일 형식 변환
  const handleBlurBirth = () => {
    if (birth.length === 8) {
      setBirth(`${birth.slice(0, 4)} / ${birth.slice(4, 6)} / ${birth.slice(6, 8)}`);
      setIsBirthFormatted(true);
    }
  };

  // 포커스 인 시 다시 숫자만 보이도록
  const handleFocusBirth = () => {
    if (isBirthFormatted) {
      setBirth(birth.replace(/\D/g, ''));
      setIsBirthFormatted(false);
    }
  };

  // 휴대폰 번호 입력 처리
  const handleInputPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 11) raw = raw.slice(0, 11);
    setIsPhoneFormatted(false);
    setPhoneNumber(raw);
  };

  // 포커스 아웃 시 번호 형식 변환
  const handleBlurPhone = () => {
    const formatted = formatPhoneNumber(phoneNumber);
    if (formatted) {
      setPhoneNumber(formatted);
      setIsPhoneFormatted(true);
    }
  };

  // 포커스 인 시 다시 숫자만 보이도록
  const handleFocusPhone = () => {
    if (isPhoneFormatted) {
      setPhoneNumber(phoneNumber.replace(/\D/g, ''));
      setIsPhoneFormatted(false);
    }
  };

  const handleChangeHour = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setHour(raw); // 일단 필터링된 숫자만 반영 (검증은 blur 또는 enter에서)
  };

  const handleBlurHour = () => {
    const num = parseInt(hour, 10);
    if (!isNaN(num)) {
      const clamped = Math.min(Math.max(num, 1), 12);
      setHour(clamped.toString().padStart(2, '0'));
    } else {
      setHour('12'); // 기본값
    }
  };

  const handleKeyDownHour = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlurHour();
    }
  };

  const handleChangeMinutes = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setMinutes(raw);
  };

  const handleBlurMinutes = () => {
    const num = parseInt(minutes, 10);
    if (!isNaN(num)) {
      const clamped = Math.min(Math.max(num, 0), 59);
      setMinutes(clamped.toString().padStart(2, '0'));
    } else {
      setMinutes('00');
    }
  };

  const handleKeyDownMinutes = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlurMinutes();
    }
  };

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setElderName(e.target.value);
  };

  const formatPhoneNumber = (input: string): string | null => {
    if (/^01[016789]\d{7,8}$/.test(input)) {
      return input.length === 10
        ? `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6)}`
        : `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`;
    }
    if (/^0[2-6][0-9]{7,8}$/.test(input)) {
      return input.length === 10
        ? `${input.slice(0, 2)}-${input.slice(2, 6)}-${input.slice(6)}`
        : `${input.slice(0, 2)}-${input.slice(2, 7)}-${input.slice(7)}`;
    }
    return null;
  };

  const editElder = async () => {
    try {
      const formattedBirth = birth.replace(/\D/g, ''); // YYYYMMDD
      const birthDate = `${formattedBirth.slice(0, 4)}-${formattedBirth.slice(4, 6)}-${formattedBirth.slice(6, 8)}`;

      const genderCode = gender === '남성' ? 'MALE' : 'FEMALE';

      const relationshipMap: Record<string, string> = {
        자식: 'CHILD',
        손자: 'GRANDCHILD',
        형제: 'SIBLING',
        친척: 'OTHER',
      };
      const relationshipCode = relationshipMap[relationship];

      const plainPhone = phoneNumber.replace(/\D/g, ''); // 숫자만

      // AM/PM 적용
      let hr = parseInt(hour, 10);
      if (!isAm && hr !== 12) hr += 12; // PM일 때 12 더함 (단, 12시는 그대로)
      if (isAm && hr === 12) hr = 0; // AM 12시는 00시로 처리
      const hour24 = hr.toString().padStart(2, '0');
      const timeToCall = `${hour24}:${minutes.padStart(2, '0')}:00`; // 초는 항상 "00"

      const response = await patchElder(
        elderName,
        birthDate,
        genderCode,
        plainPhone,
        relationshipCode,
        timeToCall,
      );

      console.log('등록 성공:', response);
    } catch (error) {
      console.error('어르신 등록 실패:', error);
    }
  };

  const handleOpenModal = () => {
    editElder();
    setModalState(true);
  };
  return (
    <>
      <div className={styles.HeaderContainer}>
        <img
          className={styles.ArrowBackIcon}
          src={arrowBack}
          alt="뒤로 가기"
          onClick={() => navigate(-1)}
        />
        <span className={styles.PageTitle}>어르신 정보 수정</span>
        <span className={styles.CompleteText} onClick={handleOpenModal}>
          완료
        </span>
      </div>
      <div className={styles.PageWrapper}>
        <div className={styles.ContentWrapper}>
          <InputBar
            title="성함"
            type="text"
            placeholder="성함을 입력해주세요."
            value={elderName}
            onChange={handleInputName}
          />
          <InputBar
            title="생년월일"
            type="text"
            placeholder="YYYY / MM / DD"
            value={birth}
            onChange={handleInputBirth}
            onBlur={handleBlurBirth}
            onFocus={handleFocusBirth}
            inputRef={birthInputRef}
          />
          <SelectButton
            title="성별"
            selectArr={genderSelectArr}
            selectedButton={gender}
            setSelectedButton={setGender}
          />
          <InputBar
            title="휴대폰 번호"
            type="text"
            placeholder="010-1234-5678"
            value={phoneNumber}
            onChange={handleInputPhoneNumber}
            onBlur={handleBlurPhone}
            onFocus={handleFocusPhone}
            inputRef={phoneInputRef}
          />
          <SelectButton
            title="어르신과의 관계"
            selectArr={relationShipSelectArr}
            selectedButton={relationship}
            setSelectedButton={setRelationship}
          />
          <SelectTime
            hour={hour}
            minutes={minutes}
            isAm={isAm}
            onChangeHour={handleChangeHour}
            onChangeMinutes={handleChangeMinutes}
            onBlurHour={handleBlurHour}
            onBlurMinutes={handleBlurMinutes}
            onKeyDownHour={handleKeyDownHour}
            onKeyDownMinutes={handleKeyDownMinutes}
            setIsAm={setIsAm}
          />
        </div>
      </div>
      <RegisterModal modalState={modalState} setModalState={setModalState} modalType="edit" />
    </>
  );
};

export default EditElderly;
