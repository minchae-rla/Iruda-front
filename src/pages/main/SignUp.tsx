import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../config/api';
import { Signup } from '../../types/user/type';

export const SignUp = () => {


  return (
    <div className="flex justify-center items-center flex-col h-screen bg-white space-y-4">
      <div className='flex justify-center items-center gap-4'>
        <img src='src\img\logo.jpg' className='w-12 h-auto'></img>
        <h1 className='text-3xl text-blue-800 font-semibold'>회원가입</h1>
      </div>
      <form className='flex justify-center items-center flex-col h-screen bg-blue-50'>
        <div>이름<input type='text' name='userName'></input></div>
        <div>아이디(이메일)<input type='text' name='userName'></input></div>
        <div>비밀번호<input type='text' name='userName'></input></div>
        <div>비밀번호 확인<input type='text' name='userName'></input></div>
        <div>전화번호<input type='text' name='userName'></input></div>
        <div>전화번호 인증<input type='text' name='userName'></input></div>
        <div>부서<input type='text' name='userName'></input></div>
        <button type='submit' className='rounded bg-blue-800 w-[200px] h-[40px] text-1xl font-medium text-white hover:bg-blue-900'>회원가입 완료</button>
      </form>
    </div>
  );
};

