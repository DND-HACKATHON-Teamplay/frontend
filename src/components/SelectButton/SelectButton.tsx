import React from 'react';
import styles from './SelectButton.module.css';

interface SelectButtonProps {
  title: string;
  selectArr: string[];
  selectedButton: string;
  setSelectedButton: (value: string) => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({
  title,
  selectArr,
  selectedButton,
  setSelectedButton,
}) => {
  return (
    <div className={styles.SelectButtonContainer}>
      <h2 className={styles.SelectButtonTitle}>{title}</h2>
      <div className={styles.SelectButtonWrapper}>
        {selectArr.map((item, index) =>
          selectedButton === item ? (
            <button key={index} className={styles.SelectedButton}>
              {item}
            </button>
          ) : (
            <button
              key={index}
              className={styles.NotSelectedButton}
              onClick={() => setSelectedButton(item)}
            >
              {item}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default SelectButton;
