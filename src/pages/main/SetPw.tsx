import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export const SetPw = () => {
  const navigate = useNavigate();

  const [userPw, setUserPw] = useState('');
  const [userPwCheck, setUserPwCheck] = useState('');


  const [errors, setErrors] = useState({
    userPw: '',
    userPwCheck: '',
  });

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const handleSetPw = async (e: React.FormEvent) => {
    e.preventDefault();

    let formErrors = { ...errors };
    let isValid = true;

    if (!userPw) {
      formErrors.userPw = '비밀번호를 입력해주세요.';
      isValid = false;
    } else if (userPw.length < 8) {
      formErrors.userPw = '비밀번호는 최소 8자 이상이어야 합니다.';
      isValid = false;
    } else if (!passwordRegex.test(userPw)) {
      formErrors.userPw = '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.';
      isValid = false;
    } else {
      formErrors.userPw = '';
    }

    if (!userPwCheck) {
      formErrors.userPwCheck = '비밀번호를 입력해주세요.';
      isValid = false;
    } else if (userPw !== userPwCheck) {
      formErrors.userPwCheck = '비밀번호가 일치하지 않습니다.'
      isValid = false;
    } else {
      formErrors.userPwCheck = '';
    }

    setErrors(formErrors);

    if (!isValid) return;

    try {
      await api.post(
        'http://localhost:8081/api/users/setPw',
        {
          userPw
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('비밀번호가 변경되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      alert('비밀번호 변경 실패. 다시 시도해주세요.');
    }
  };

  const handleBlur = (field: string) => {
    let formErrors = { ...errors };
    switch (field) {
      case 'userPw':
        if (!userPw) formErrors.userPw = '비밀번호를 입력해주세요.';
        else if (userPw.length < 8) formErrors.userPw = '비밀번호는 최소 8자 이상이어야 합니다.';
        else if (!passwordRegex.test(userPw)) formErrors.userPw = '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.';
        else formErrors.userPw = '';
        break;
      case 'userPwCheck':
        if (!userPwCheck) formErrors.userPwCheck = '비밀번호를 입력해주세요.';
        else if (userPw !== userPwCheck) formErrors.userPwCheck = '비밀번호가 일치하지 않습니다.';
        else formErrors.userPwCheck = '';
        break;
    }
    setErrors(formErrors);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col bg-white min-h-screen">
        <div className="rounded-lg border-2 space-y-3 py-4">
          <div className="flex justify-center items-center gap-4">
            <img src="/img/logo.jpg" className="w-10 h-auto" />
            <h1 className="text-2xl text-blue-900 font-semibold">비밀번호 변경</h1>
          </div>
          <form
            onSubmit={handleSetPw}
            className="flex justify-center items-center flex-col space-y-4 w-[350px]"
          >
            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">새 비밀번호</label>
              <input
                type="password"
                value={userPw}
                placeholder="영문, 숫자, 특수문자 포함 (최소 8자 이상)"
                onChange={(e) => setUserPw(e.target.value)}
                onBlur={() => handleBlur('userPw')}
                className={`border w-[280px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userPw ? 'border-red-500' : ''}`}
              />
              {errors.userPw && <p className="text-red-500 text-left text-xs">{errors.userPw}</p>}
            </div>

            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">새 비밀번호 확인</label>
              <input
                type="password"
                value={userPwCheck}
                onChange={(e) => setUserPwCheck(e.target.value)}
                onBlur={() => handleBlur('userPwCheck')}
                className={`border w-[280px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 ${errors.userPwCheck ? 'border-red-500' : ''}`}
              />
              {errors.userPwCheck && <p className="text-red-500 text-left text-xs">{errors.userPwCheck}</p>}
            </div>

            <button
              type="submit"
              className="rounded bg-blue-800 w-[200px] h-[40px] font-medium text-white hover:bg-blue-900"
            >
              비밀번호 변경
            </button>
          </form>

          <div className="text-center space-x-4">
            <span className='text-sm text-blue-800 hover:underline'>
              <a href="/">로그인</a>
            </span>
            <span className='text-sm text-blue-800 hover:underline'>
              <a href="/findId">아이디 찾기</a>
            </span>
          </div>
        </div>
      </div>

    </>
  );
};
