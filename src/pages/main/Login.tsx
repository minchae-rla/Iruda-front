import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleSignUp = ()=>{
    // navigate('/signup')
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
          <button onClick={handleSignUp} className="bg-blue-700 text-white py-2 px-4 rounded-lg text-lg mb-4">
            회원가입
          </button>
    </div>
  );
};

export default Login;
