import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenUtils } from '../../utils/auth';
import styles from './OAuthCallback.module.css';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('처리 중...');

  useEffect(() => {
    const handleCallback = () => {
      const query = new URLSearchParams(window.location.search);
      const accessToken = query.get('accessToken');
      const error = query.get('error');

      // 에러가 있는 경우
      if (error) {
        console.error('OAuth 에러:', error);
        setStatus('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }

      // 토큰이 있는 경우
      if (accessToken) {
        try {
          // 토큰 유효성 간단 체크
          if (accessToken.length < 10) {
            throw new Error('유효하지 않은 토큰');
          }

          // 토큰 저장 (유틸리티 함수 사용)
          tokenUtils.setToken(accessToken);

          setStatus('로그인 성공! 메인 페이지로 이동합니다.');

          // 잠시 후 홈으로 리다이렉트
          setTimeout(() => {
            navigate('/', { replace: true }); // replace로 히스토리 대체
          }, 1500);
        } catch (error) {
          console.error('토큰 저장 중 오류 발생:', error);
          setStatus('로그인 처리 중 오류가 발생했습니다.');

          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } else {
        setStatus('로그인 실패! 인증 정보를 받지 못했습니다.');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.loadingSpinner} />
      <h2 className={styles.statusText}>{status}</h2>
    </div>
  );
};

export default OAuthCallback;
