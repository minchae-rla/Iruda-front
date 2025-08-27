import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from './modals/ProfileMenu';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex h-20 items-center justify-between border-b px-4 relative">
      <div>
        <a href="/home" className="text-blue-800 hover:underline">
          <img src="/img/logo.jpg" className="w-12 h-auto" />
        </a>
      </div>

      <div className='flex gap-5 items-center'>
        <img src="/img/bell.png" className="w-10 h-auto" />
        <ProfileMenu />
      </div>
    </header>
  );
};
