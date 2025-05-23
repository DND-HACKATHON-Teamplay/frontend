import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  btnType?: 'edit' | 'cancel'; // 제한된 타입 사용 권장
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, btnType }) => {
  return (
    <button
      className={classNames(
        styles.ButtonContainer,
        disabled && styles.DisabledButton,
        btnType === 'edit' && styles.EditButton,
        btnType === 'cancel' && styles.CancelButton,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
