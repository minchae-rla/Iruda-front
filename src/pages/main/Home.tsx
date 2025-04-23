import React from 'react';
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate();
  const handleLogin = ()=> {
    navigate("/login");
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <img src='/img/logo'></img>
      <button onClick={handleLogin}>login</button>
    </div>
  );
};
