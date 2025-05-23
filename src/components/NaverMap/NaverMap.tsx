import { useEffect, useRef } from 'react';
import styles from './NaverMap.module.css';

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울시청 좌표
      zoom: 15,
    };

    new window.naver.maps.Map(mapRef.current, mapOptions);
  }, []);

  return <div ref={mapRef} className={styles.MapContainer} />;
};

export default NaverMap;
