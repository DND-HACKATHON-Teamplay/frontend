import styles from './DetailChat.module.css';
import { useLocation } from 'react-router-dom';
import DayInfo from '../../components/DayInfo/DayInfo';

const DetailChat = () => {
  const location = useLocation();
  const date = location?.state.selectedDate.toLocaleDateString('ko-KR');
  const dayInfo = location?.state.dayInfo;
  console.log('날짜 : ', date);
  console.log('상태 : ', location?.state.dayInfo);
  return (
    <div className={styles.DetailChatPage}>
      <DayInfo dayInfo={dayInfo} />
    </div>
  );
};

export default DetailChat;
