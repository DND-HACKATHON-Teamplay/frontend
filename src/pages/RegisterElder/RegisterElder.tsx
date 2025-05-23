import { useEffect, useState, type ChangeEvent, useRef } from 'react';
import InputBar from '../../components/InputBar/InputBar';
import styles from './RegisterElder.module.css';
import SelectButton from '../../components/SelectButton/SelectButton';
import Button from '../../components/Button/Button';
import { postRegisterElder } from '../../services/Register/register';
import { RegisterModal } from './RegisterModal/RegisterModal';
import SelectTime from '../../components/SelectTime/SelectTime';

const genderSelectArr = ['남성', '여성'];
const relationShipSelectArr = ['자식', '손자', '형제', '친척'];

const RegisterElder = () => {
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

  const [isAbled, setIsAbled] = useState(false);
  const birthInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const [modalState, setModalState] = useState<boolean>(false);

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

  useEffect(() => {
    const isNameValid = elderName.trim().length > 0;
    const isBirthValid = /^\d{8}$/.test(birth) || /^\d{4} \/ \d{2} \/ \d{2}$/.test(birth);
    const isPhoneValid = !!formatPhoneNumber(phoneNumber.replace(/\D/g, ''));
    setIsAbled(isNameValid && isBirthValid && isPhoneValid);
  }, [elderName, birth, phoneNumber]);

  const registerElder = async () => {
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

      const response = await postRegisterElder(
        elderName,
        birthDate,
        genderCode,
        plainPhone,
        relationshipCode,
        timeToCall,
      );

      console.log('등록 성공:', response);
      setModalState(true);
    } catch (error) {
      console.error('어르신 등록 실패:', error);
    }
  };

  return (
    <div className={styles.PageWrapper}>
      <h1 className={styles.PageTitle}>어르신 등록하기</h1>
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
      <div className={styles.ButtonWrapper}>
        <Button onClick={registerElder} disabled={!isAbled}>
          다음
        </Button>
      </div>
      <RegisterModal modalState={modalState} setModalState={setModalState} />
    </div>
  );
};

export default RegisterElder;
