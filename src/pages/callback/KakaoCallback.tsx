import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../config/api';

export const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      api.get(`http://localhost:8081/api/oauth/kakao/callback?code=${code}`)
        .then(res => {
          const { accessToken } = res.data;
          localStorage.setItem('accessToken', accessToken);
          navigate('/home');
        })
        .catch(err => {
          alert('카카오 로그인 실패');
          console.error(err);
        });
    } else {
      alert('인가 코드가 없습니다.');
      navigate('/');
    }
  }, [location.search, navigate]);

  return <div>카카오 로그인 중...</div>;
};
