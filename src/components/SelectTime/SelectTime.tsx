import React, { type ChangeEvent } from 'react';
import styles from './SelectTime.module.css';

interface SelectTimeProps {
  hour: string;
  minutes: string;
  isAm: boolean;
  onChangeHour: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeMinutes: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurHour: () => void;
  onBlurMinutes: () => void;
  onKeyDownHour: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDownMinutes: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsAm: (value: boolean) => void;
}

const SelectTime: React.FC<SelectTimeProps> = ({
  hour,
  minutes,
  isAm,
  onChangeHour,
  onChangeMinutes,
  onBlurHour,
  onBlurMinutes,
  onKeyDownHour,
  onKeyDownMinutes,
  setIsAm,
}) => {
  return (
    <div className={styles.SelectTimeContainer}>
      <h2 className={styles.SelectTimeTitle}>안부전화 시간</h2>
      <div className={styles.TimeContainer}>
        <input
          className={styles.TimeInput}
          type="text"
          value={hour}
          onChange={onChangeHour}
          onBlur={onBlurHour}
          onKeyDown={onKeyDownHour}
        />
        <div className={styles.DotsWrapper}>
          <div className={styles.Dot} />
          <div className={styles.Dot} />
        </div>
        <input
          className={styles.TimeInput}
          type="text"
          value={minutes}
          onChange={onChangeMinutes}
          onBlur={onBlurMinutes}
          onKeyDown={onKeyDownMinutes}
        />
        <div className={styles.AMPMContainer}>
          {isAm ? (
            <>
              <button className={styles.PMButton} onClick={() => setIsAm(false)}>
                PM
              </button>
              <button className={styles.AMButtonActive}>AM</button>
            </>
          ) : (
            <>
              <button className={styles.PMButtonActive}>PM</button>
              <button className={styles.AMButton} onClick={() => setIsAm(true)}>
                AM
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectTime;
