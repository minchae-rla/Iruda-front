import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export const FindPw = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPhoneCheck, setUserPhoneCheck] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 인증 여부 상태 추가

  const [errors, setErrors] = useState({
    userId: '',
    userName: '',
    userBirth: '',
    userPhone: '',
    userPhoneCheck: '',
  });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const birthRegex = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;

  /** 📌 SMS 발송 */
  const sendSmsCode = async () => {
    try {
      const res = await api.post('http://localhost:8081/api/sms/send', { phoneNumber: userPhone });
      alert(res.data);
    } catch (error) {
      alert('인증번호 발송 실패');
    }
  };

  /** 📌 SMS 인증 확인 */
  const verifySmsCode = async () => {
    try {
      const res = await api.post('http://localhost:8081/api/sms/verify', {
        phoneNumber: userPhone,
        code: userPhoneCheck,
      });
      if (res.data.verified) {
        alert('인증에 성공했습니다.');
        setIsPhoneVerified(true);
      } else {
        alert('인증에 실패하였습니다.');
        setIsPhoneVerified(false);
      }
    } catch (error) {
      alert('인증 확인 실패');
      setIsPhoneVerified(false);
    }
  };

  const handleFindPw = async (e: React.FormEvent) => {
    e.preventDefault();

    let formErrors = { ...errors };
    let isValid = true;

    if (!userId) {
      formErrors.userId = '아이디를 입력해주세요.';
      isValid = false;
    } else if (!emailRegex.test(userId)) {
      formErrors.userId = '올바른 이메일 형식을 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userId = '';
    }

    if (!userName) {
      formErrors.userName = '이름을 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userName = '';
    }

    if (!userBirth) {
      formErrors.userBirth = '생년월일을 입력해주세요.';
      isValid = false;
    } else if (!birthRegex.test(userBirth)) {
      formErrors.userBirth = '생년월일은 20001010 형식으로 입력해주세요.';
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

    if (!isPhoneVerified) {
      formErrors.userPhoneCheck = '전화번호 인증이 필요합니다.';
      isValid = false;
    }

    setErrors(formErrors);

    if (!isValid) return;

    try {
      const response = await api.post(
        'http://localhost:8081/api/users/findPw',
        {
          userId: userId,
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
      const foundId = response.data;
      navigate('/setPw', { state: { userId: foundId } });
    } catch (error) {
      console.error('비밀번호 찾기 실패:', error);
      alert('비밀번호 찾기 실패. 다시 시도해주세요.');
    }
  };

  const handleBlur = (field: string) => {
    let formErrors = { ...errors };
    switch (field) {
      case 'userName':
        if (!userName) formErrors.userName = '이름을 입력해주세요.';
        else formErrors.userName = '';
        break;
      case 'userId':
        if (!userId) formErrors.userId = '아이디를 입력해주세요.';
        else if (!emailRegex.test(userId)) formErrors.userId = '올바른 이메일 형식을 입력해주세요.';
        else formErrors.userId = '';
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
        if (!userPhone) formErrors.userPhone = '전화번호를 입력해주세요.';
        else formErrors.userPhone = '';
        break;
      case 'userPhoneCheck':
        if (!userPhoneCheck) formErrors.userPhoneCheck = '인증번호를 입력해주세요.';
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
            <h1 className="text-2xl text-blue-900 font-semibold">비밀번호 찾기</h1>
          </div>
          <form
            onSubmit={handleFindPw}
            className="flex justify-center items-center flex-col space-y-4 w-[350px]"
          >
            {/* 아이디 */}
            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">아이디(이메일)</label>
              <input
                value={userId}
                placeholder="ex)example@email.com"
                onChange={(e) => setUserId(e.target.value)}
                onBlur={() => handleBlur('userId')}
                className={`border w-[280px] h-[35px] rounded-md pl-2 ${errors.userId ? 'border-red-500' : ''}`}
              />
              {errors.userId && <p className="text-red-500 text-left text-xs">{errors.userId}</p>}
            </div>

            {/* 이름 */}
            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">이름</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => handleBlur('userName')}
                className={`border w-[280px] h-[35px] rounded-md pl-2 ${errors.userName ? 'border-red-500' : ''}`}
              />
              {errors.userName && <p className="text-red-500 text-left text-xs">{errors.userName}</p>}
            </div>

            {/* 생년월일 */}
            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">생년월일</label>
              <input
                type="text"
                value={userBirth}
                placeholder="ex)20001010"
                maxLength={8}
                onChange={(e) => setUserBirth(e.target.value)}
                onBlur={() => handleBlur('userBirth')}
                className={`border w-[280px] h-[35px] rounded-md pl-2 ${errors.userBirth ? 'border-red-500' : ''}`}
              />
              {errors.userBirth && <p className="text-red-500 text-left text-xs">{errors.userBirth}</p>}
            </div>

            {/* 전화번호 + 발송 버튼 */}
            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">전화번호</label>
              <div className="flex gap-2">
                <input
                  value={userPhone}
                  placeholder="ex)01012345678"
                  onChange={(e) => setUserPhone(e.target.value)}
                  onBlur={() => handleBlur('userPhone')}
                  className={`border w-[280px] h-[35px] rounded-md pl-2 ${errors.userPhone ? 'border-red-500' : ''}`}
                />
                <button type="button" onClick={sendSmsCode} className="border w-[50px] h-[35px] rounded-md text-sm hover:bg-gray-100">
                  발송
                </button>
              </div>
              {errors.userPhone && <p className="text-red-500 text-left text-xs">{errors.userPhone}</p>}
            </div>

            {/* 인증번호 + 확인 버튼 */}
            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">인증번호 입력</label>
              <div className="flex gap-2">
                <input
                  value={userPhoneCheck}
                  onChange={(e) => setUserPhoneCheck(e.target.value)}
                  onBlur={() => handleBlur('userPhoneCheck')}
                  className={`border w-[280px] h-[35px] rounded-md pl-2 ${errors.userPhoneCheck ? 'border-red-500' : ''}`}
                />
                <button type="button" onClick={verifySmsCode} className="border w-[50px] h-[35px] rounded-md text-sm hover:bg-gray-100">
                  확인
                </button>
              </div>
              {errors.userPhoneCheck && <p className="text-red-500 text-left text-xs">{errors.userPhoneCheck}</p>}
            </div>

            <button type="submit" className="rounded bg-blue-800 w-[200px] h-[40px] text-white">
              비밀번호 찾기
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
