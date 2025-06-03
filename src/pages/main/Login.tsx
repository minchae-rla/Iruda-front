import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/users/login',
        { userId, userPw },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { accessToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      navigate('/Home');
    } catch (error) {
      alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
      console.error(error);
    }
  };

  // const handleKakao = async () => {
  //   const res = await fetch('http://localhost:8081/api/auth/kakao');
  //   const { redirectUrl } = await res.json();
  //   window.location.href = redirectUrl;
  // };

  const handleKakao = () => navigate('/kakaoSignUp');

  const handleSignUp = () => navigate('/signUp');
  const handleFindId = () => navigate('/findId');
  const handleFindPw = () => navigate('/findPw');

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-white space-y-4">
      <div className="flex justify-center items-center gap-2">
        <img src="/img/logo.jpg" className="w-12 h-auto" />
        <h1 className="text-4xl text-blue-800 font-semibold">IRUDA</h1>
      </div>
      <form onSubmit={handleLogin} className="flex justify-center items-center flex-col gap-4">
        <input
          className="border w-[200px] h-[40px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2"
          type="text" placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          className="border w-[200px] h-[40px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2"
          type="password" placeholder="비밀번호"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        />
        <button type="submit" className="rounded bg-blue-800 w-[200px] h-[40px] text-1xl font-medium text-white hover:bg-blue-900">
          로그인
        </button>
      </form>
      <div className="flex flex-col gap-4">
        <p className='text-sm text-gray-600'>소셜로 간편하게 로그인</p>
        <div className='flex gap-7'>
          <img src="/img/kakao.png" className='w-10 h-auto hover:cursor-pointer' onClick={handleKakao} />
          <img src="/img/naver.png" className='w-10 h-auto hover:cursor-pointer' />
          <img src="/img/google.png" className='w-10 h-auto hover:cursor-pointer' />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button onClick={handleSignUp} className="w-[85px] h-[40px] text-sm font-medium text-gray-500 hover:underline">회원가입</button>
        <button onClick={handleFindId} className="w-[85px] h-[40px] text-sm font-medium text-gray-500 hover:underline">아이디찾기</button>
        <button onClick={handleFindPw} className="w-[85px] h-[40px] text-sm font-medium text-gray-500 hover:underline">비밀번호찾기</button>
      </div>
    </div>
  );
};
