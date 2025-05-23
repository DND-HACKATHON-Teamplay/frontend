import { useEffect, useState, type ChangeEvent, useRef } from 'react';
import InputBar from '../../components/InputBar/InputBar';
import styles from './RegisterElder.module.css';
import SelectButton from '../../components/SelectButton/SelectButton';
import Button from '../../components/Button/Button';

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

  const [isAbled, setIsAbled] = useState(false);
  const birthInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

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
      </div>
      <div className={styles.ButtonWrapper}>
        <Button
          onClick={() => console.log(elderName, birth, gender, phoneNumber, relationship)}
          disabled={!isAbled}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default RegisterElder;
