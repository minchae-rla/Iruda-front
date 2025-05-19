import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';


interface setPwModalProps {
  foundUserId: string
  onClose: () => void
}

export default function FindIdResultModal({ foundUserId, onClose }: setPwModalProps) {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/');
  const handleFindPw = () => navigate('/findPw');


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center animate-in fade-in duration-700">
      <div className="bg-white w-[450px] h-[270px] rounded-lg p-4">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">아이디 찾기 결과</h2>
          <button onClick={onClose}>
            <img src="/img/x.png" className="w-[25px] h-[25px]" />
          </button>
        </div>

        <div className="h-[200px] text-center">
          <p className="text-sm text-gray-400 p-3">회원님의 아이디는</p>
          <div className="p-3 border-b">
            <p className="text-blue-800 font-bold text-xl mb-3">{foundUserId}</p>
          </div>
          <div className="flex justify-center gap-2 p-4">
            <button className="rounded bg-blue-800 w-[120px] h-[40px] font-medium text-white hover:bg-blue-900" onClick={handleLogin}>
              로그인
            </button>

            <button className="rounded bg-blue-800 w-[120px] h-[40px] font-medium text-white hover:bg-blue-900" onClick={handleFindPw}>
              비밀번호 찾기
            </button>

            <button className="rounded w-[120px] h-[40px] border border-gray-200 hover:bg-gray-100" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
