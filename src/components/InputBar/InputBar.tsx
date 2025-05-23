import React, { type ChangeEvent, type FocusEvent, type RefObject } from 'react';
import styles from './InputBar.module.css';

interface InputBarProps {
  title: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

const InputBar: React.FC<InputBarProps> = ({
  title,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  inputRef,
}) => {
  return (
    <div className={styles.InputBarContainer}>
      <h2 className={styles.InputBarTitle}>{title}</h2>
      <input
        className={styles.InputBar}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={inputRef}
      />
    </div>
  );
};

export default InputBar;
