import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleSignUp = ()=>{
    // navigate('/signup')
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <main className="w-[1080px] h-[700px] flex flex-col justify-center items-center bg-white">
        {/* Logo */}
        <div className="logo">
          <img src="../../img/logo.jpg" alt="logo" className="w-[85px] h-[85px]" />
        </div>

        {/* Ment */}
        <div className="ment text-center mb-8">
          <span className="text-2xl block">계획했던 일들을</span>
          <span className="text-5xl font-medium block mt-4 ml-[60px]">"이루다"</span>
        </div>

        {/* Login Buttons */}
        <div className="login mb-8">
          <button className="bg-blue-700 text-white py-2 px-4 rounded-lg text-lg mr-4 mb-4">
            로그인
          </button>
          <button onClick={handleSignUp} className="bg-blue-700 text-white py-2 px-4 rounded-lg text-lg mb-4">
            회원가입
          </button>
          
        </div>
      </main>
    </div>
  );
};

export default Login;
