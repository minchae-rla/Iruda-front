import React from 'react';
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate();
  const handleLogin = ()=> {
    navigate("/login");
  }
  const handleSingUp = ()=> {
    navigate("/signUp")
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen bg-white space-y-4">
      <div><img src='src\img\logo.jpg' className='w-32 h-auto'></img></div>
      <div className='w-[220px] h-auto space-y-2'>
        <p className='text-2xl text-black text-left'>계획했던 일들을</p>
        <h1 className='text-5xl text-black text-right font-medium'>"이루다"</h1>
      </div>
      <div className='flex justify-center items-center space-x-4'>
      <button onClick={handleLogin} className='rounded bg-blue-800 w-[110px] h-[40px] text-2xl font-medium text-white hover:bg-blue-900'>로그인</button>
      <button onClick={handleSingUp} className='rounded bg-blue-800 w-[110px] h-[40px] text-2xl font-medium text-white hover:bg-blue-900'>회원가입</button>
      </div>
      <div className='flex space-x-7'>
        <img src='src\img\kakao.png' className='w-16 h-auto'></img>
        <img src='src\img\google.png' className='w-16 h-auto'></img>
      </div>
      
    </div>
  );
};
