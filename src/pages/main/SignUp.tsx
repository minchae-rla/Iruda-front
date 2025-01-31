import React from 'react';
import { useNavigate } from 'react-router-dom'

export const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUp = ()=> {
    navigate("/signup");
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      회원가입 페이지
    </div>
  );
};

