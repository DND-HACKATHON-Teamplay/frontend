import styles from './DetailChat.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import DayInfo from '../../components/DayInfo/DayInfo';
import closeIcon from '../../assets/home/x.svg';
import AIicon from '../../assets/AIicon.svg';
import { useEffect, useState } from 'react';
import { getChats } from '../../services/getChats';

interface ChatData {
  is_elderly: boolean;
  conversation: string;
}

const DetailChat = () => {
  const location = useLocation();
  const date = location?.state.selectedDate.toLocaleDateString('ko-KR');
  const dayInfo = location?.state.dayInfo;

  const [chatData, setChatData] = useState<ChatData[]>();

  const navigate = useNavigate();

  const fetchChatData = async () => {
    try {
      const selectedDate = location.state.selectedDate;
      const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

      console.log('API 호출 날짜:', formattedDate);
      const response = await getChats(formattedDate);
      setChatData(response);
    } catch (error) {
      console.error('채팅 내역 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchChatData();
  }, []);

  return (
    <div className={styles.DetailChatPage}>
      <div className={styles.HeaderContainer}>
        <img
          className={styles.CloseIcon}
          src={closeIcon}
          alt="닫기 버튼"
          onClick={() => navigate(-1)}
        />
        <span className={styles.DateText}>{date}</span>
      </div>
      <div className={styles.DayInfoContainer}>
        <DayInfo dayInfo={dayInfo} />
      </div>
      <div className={styles.ChatContainer}>
        {chatData &&
          chatData.map((chat, index) =>
            chat.is_elderly ? (
              <div key={index} className={styles.ElderlyChatContainer}>
                <span className={styles.ElderlyChat}>{chat.conversation}</span>
              </div>
            ) : (
              <div className={styles.AIContainer}>
                <img src={AIicon} alt="ai 아이콘" />

                <div key={index} className={styles.AIChatContainer}>
                  <span className={styles.AIChat}>{chat.conversation}</span>
                </div>
              </div>
            ),
          )}
      </div>
    </div>
  );
};

export default DetailChat;
