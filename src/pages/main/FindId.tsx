import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import FindIdResultModal from '../../components/modals/FindIdResultModal';

export const FindId = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPhoneCheck, setUserPhoneCheck] = useState('');
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({
    userName: '',
    userBirth: '',
    userPhone: '',
    userPhoneCheck: '',
  });

  const birthRegex = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;

  const handleFindId = async (e: React.FormEvent) => {
    e.preventDefault();

    let formErrors = { ...errors };
    let isValid = true;

    if (!userName) {
      formErrors.userName = '이름을 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userName = '';
    }

    if (!userBirth) {
      formErrors.userBirth = '생년원일을 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userBirth = '';
    }

    if (!userPhone) {
      formErrors.userPhone = '전화번호 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userPhone = '';
    }

    if (!userPhoneCheck) {
      formErrors.userPhoneCheck = '인증번호를 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userPhoneCheck = '';
    }

    setErrors(formErrors);

    if (!isValid) return;

    try {
      const response = await api.post(
        'http://localhost:8081/api/users/findId',
        {
          name: userName,
          birth: userBirth,
          phone: userPhone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const foundUserId = response.data;
      console.log(foundUserId);
      setUserId(foundUserId);
      setShowModal(true);
    } catch (error) {
      console.error('아이디 찾기 실패:', error);
      alert('아이디찾기 실패. 다시 시도해주세요.');
    }
  };

  const handleBlur = (field: string) => {
    let formErrors = { ...errors };
    switch (field) {
      case 'userName':
        if (!userName) formErrors.userName = '이름을 입력해주세요.';
        else formErrors.userName = '';
        break;
      case 'userBirth':
        if (!userBirth) {
          formErrors.userBirth = '생년월일을 입력해주세요.';
        } else if (!birthRegex.test(userBirth)) {
          formErrors.userBirth = '생년월일은 20001010 형식으로 입력해주세요.';
        } else {
          formErrors.userBirth = '';
        }
        break;
      case 'userPhone':
        if (!userName) formErrors.userPhone = '전화번호를 입력해주세요.';
        else formErrors.userPhone = '';
        break;
      case 'userPhoneCheck':
        if (!userName) formErrors.userPhoneCheck = '인증번호를 입력해주세요.';
        else formErrors.userPhoneCheck = '';
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
            <h1 className="text-2xl text-blue-900 font-semibold">아이디 찾기</h1>
          </div>
          <form
            onSubmit={handleFindId}
            className="flex justify-center items-center flex-col space-y-4 w-[350px]"
          >
            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">이름</label>
              <input
                value={userName}
                placeholder="ex)홍길동"
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => handleBlur('userName')}
                className={`border w-[280px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userName ? 'border-red-500' : ''}`}
              />
              {errors.userName && <p className="text-red-500 text-left text-xs">{errors.userName}</p>}
            </div>

            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">생년월일</label>
              <input
                type="text"
                value={userBirth}
                placeholder="ex)20001010"
                maxLength={8}
                onChange={(e) => setUserBirth(e.target.value)}
                onBlur={() => handleBlur('userBirth')}
                className={`border w-[280px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userBirth ? 'border-red-500' : ''}`}
              />
              {errors.userBirth && <p className="text-red-500 text-left text-xs">{errors.userBirth}</p>}
            </div>

            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">전화번호</label>
              <div className='flex gap-2'>
                <input
                  value={userPhone}
                  placeholder="ex)01012345678 (하이픈 없이 입력)"
                  onChange={(e) => setUserPhone(e.target.value)}
                  onBlur={() => handleBlur('userPhone')}
                  className={`border w-[280px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userPhone ? 'border-red-500' : ''}`}
                />
                <button type='button' className='border w-[50px] h-[35px] rounded-md text-sm hover:bg-gray-100'>발송</button>
              </div>
              {errors.userPhone && <p className="text-red-500 text-left text-xs">{errors.userPhone}</p>}
            </div>

            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">인증번호 입력</label>
              <input
                value={userPhoneCheck}
                onChange={(e) => setUserPhoneCheck(e.target.value)}
                onBlur={() => handleBlur('userPhoneCheck')}
                className={`border w-[280px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userPhoneCheck ? 'border-red-500' : ''}`}
              />
              {errors.userPhoneCheck && <p className="text-red-500 text-left text-xs">{errors.userPhoneCheck}</p>}
            </div>

            <button
              type="submit"
              className="rounded bg-blue-800 w-[200px] h-[40px] font-medium text-white hover:bg-blue-900"
            >
              아이디 찾기
            </button>
          </form>

          <div className="text-center space-x-4">
            <span className='text-sm text-blue-800 hover:underline'>
              <a href="/">로그인</a>
            </span>
            <span className='text-sm text-blue-800 hover:underline'>
              <a href="/findPw">비밀번호 찾기</a>
            </span>
          </div>
        </div>
      </div>

      {showModal && (
        <FindIdResultModal
          foundUserId={userId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
