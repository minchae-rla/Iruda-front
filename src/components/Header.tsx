import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex h-20 items-center justify-between border-b px-4">
      <div>
        <a href="/home" className="text-blue-800 hover:underline">
          <img src="/img/logo.jpg" className="w-12 h-auto"></img>
        </a>
      </div>

      <div className='flex gap-5'>
        <img src="/img/bell.png" className="w-10 h-auto"></img>
        <img src="/img/user_black.png" className="w-10 h-auto"></img>
      </div>
    </header>
  );
};