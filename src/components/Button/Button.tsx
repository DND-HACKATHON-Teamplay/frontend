// 버튼 컴포넌트
import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      className={classNames(styles.ButtonContainer, disabled && styles.DisabledButton)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
