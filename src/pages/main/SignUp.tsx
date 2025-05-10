import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import PrivacyAgreeModal from '../../components/modals/PrivacyAgreeModal';

export const SignUp = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userPwCheck, setUserPwCheck] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPhoneCheck, setUserPhoneCheck] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userPrivacyAgree, setUserPrivacyAgree] = useState(false);

  const [errors, setErrors] = useState({
    userName: '',
    userId: '',
    userPw: '',
    userPwCheck: '',
    userPhone: '',
    userPhoneCheck: '',
    userDepartment: '',
    userBirth: '',
    userPrivacyAgree: '',
  });

  const handlePrivacyAgree = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAgree = () => {
    setUserPrivacyAgree(true);
    setIsModalOpen(false);
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    let formErrors = { ...errors };
    let isValid = true;

    if (!userName) {
      formErrors.userName = '이름을 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userName = '';
    }

    if (!userId) {
      formErrors.userId = '아이디를 입력해주세요.';
      isValid = false;
    } else if (!emailRegex.test(userId)) {
      formErrors.userId = '올바른 이메일 형식을 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userId = '';
    }

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

    if (!userPhone) {
      formErrors.userPhone = '전화번호를 입력해주세요.';
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

    if (!userDepartment) {
      formErrors.userDepartment = '소속을 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userDepartment = '';
    }

    if (!userBirth) {
      formErrors.userBirth = '생년월일을 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userBirth = '';
    }

    if (!userPrivacyAgree) {
      formErrors.userPrivacyAgree = '개인정보 수집 및 이용에 동의해야 합니다.';
      isValid = false;
    } else {
      formErrors.userPrivacyAgree = '';
    }

    setErrors(formErrors);

    if (!isValid) return;

    try {
      await api.post(
        'http://localhost:8081/api/users/signup',
        {
          name: userName,
          userId,
          userPw,
          phone: userPhone,
          department: userDepartment,
          birth: userBirth,
          privacyAgree: userPrivacyAgree,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패. 다시 시도해주세요.');
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
      case 'userPhone':
        if (!userPhone) formErrors.userPhone = '전화번호를 입력해주세요.';
        else formErrors.userPhone = '';
        break;
      case 'userPhoneCheck':
        if (!userPhoneCheck) formErrors.userPhoneCheck = '인증번호를 입력해주세요.';
        else formErrors.userPhoneCheck = '';
        break;
      case 'userDepartment':
        if (!userDepartment) formErrors.userDepartment = '소속을 입력해주세요.';
        else formErrors.userDepartment = '';
        break;
      default:
        break;
      case 'userBirth':
        if (!userBirth) formErrors.userBirth = '생년월일을 입력해주세요.';
        else formErrors.userBirth = '';
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
            <h1 className="text-2xl text-blue-900 font-semibold">회원가입</h1>
          </div>
          <form
            onSubmit={handleSignUp}
            className="flex justify-center items-center flex-col space-y-4 w-[350px]"
          >
            <div className="space-y-2 w-[250px]">
              <label className="block w-full text-left text-sm">이름</label>
              <input
                value={userName}
                placeholder="홍길동"
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => handleBlur('userName')}
                className={`border w-[250px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userName ? 'border-red-500' : ''}`}
              />
              {errors.userName && <p className="text-red-500 text-left text-xs">{errors.userName}</p>}
            </div>

            <div className="space-y-2 w-[250px]">
              <label className="block w-full text-left text-sm">아이디(이메일)</label>
              <input
                type="email"
                value={userId}
                placeholder="example@email.com"
                onChange={(e) => setUserId(e.target.value)}
                onBlur={() => handleBlur('userId')}
                className={`border w-[250px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userId ? 'border-red-500' : ''}`}
              />
              {errors.userId && <p className="text-red-500 text-left text-xs">{errors.userId}</p>}
            </div>

            <div className="space-y-2 w-[250px]">
              <label className="block w-full text-left text-sm">비밀번호</label>
              <input
                type="password"
                value={userPw}
                placeholder="영문, 숫자, 특수문자 포함 (최소 8자 이상)"
                onChange={(e) => setUserPw(e.target.value)}
                onBlur={() => handleBlur('userPw')}
                className={`border w-[250px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userPw ? 'border-red-500' : ''}`}
              />
              {errors.userPw && <p className="text-red-500 text-left text-xs">{errors.userPw}</p>}
            </div>

            <div className="space-y-2 w-[250px]">
              <label className="block w-full text-left text-sm">비밀번호 확인</label>
              <input
                type="password"
                value={userPwCheck}
                onChange={(e) => setUserPwCheck(e.target.value)}
                onBlur={() => handleBlur('userPwCheck')}
                className={`border w-[250px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 ${errors.userPwCheck ? 'border-red-500' : ''}`}
              />
              {errors.userPwCheck && <p className="text-red-500 text-left text-xs">{errors.userPwCheck}</p>}
            </div>

            <div className="space-y-2 w-[250px]">
              <label className="block w-full text-left text-sm">전화번호</label>
              <input
                value={userPhone}
                placeholder="01012345678 (하이픈 없이 입력)"
                onChange={(e) => setUserPhone(e.target.value)}
                onBlur={() => handleBlur('userPhone')}
                className={`border w-[250px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userPhone ? 'border-red-500' : ''}`}
              />
              {errors.userPhone && <p className="text-red-500 text-left text-xs">{errors.userPhone}</p>}
            </div>

            <div className="space-y-2 w-[250px]">
              <label className="block w-full text-left text-sm">인증번호 입력</label>
              <input
                value={userPhoneCheck}
                onChange={(e) => setUserPhoneCheck(e.target.value)}
                onBlur={() => handleBlur('userPhoneCheck')}
                className={`border w-[250px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userPhoneCheck ? 'border-red-500' : ''}`}
              />
              {errors.userPhoneCheck && <p className="text-red-500 text-left text-xs">{errors.userPhoneCheck}</p>}
            </div>

            <div className="space-y-2 w-[250px]">
              <label className="block w-full text-left text-sm">생년월일</label>
              <input
                type="date"
                value={userBirth}
                onChange={(e) => setUserBirth(e.target.value)}
                onBlur={() => handleBlur('userBirth')}
                className={`border w-[250px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userBirth ? 'border-red-500' : ''}`}
              />
              {errors.userBirth && <p className="text-red-500 text-left text-xs">{errors.userBirth}</p>}
            </div>

            <div className="space-y-2 w-[250px]">
              <label className="block w-full text-left text-sm">소속(팀)</label>
              <input
                value={userDepartment}
                onChange={(e) => setUserDepartment(e.target.value)}
                onBlur={() => handleBlur('userDepartment')}
                className={`border w-[250px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 ${errors.userDepartment ? 'border-red-500' : ''}`}
              />
              {errors.userDepartment && <p className="text-red-500 text-left text-xs">{errors.userDepartment}</p>}
            </div>

            <div className="space-y-2 w-[280px]">

              <label className="w-full text-sm">
                <span className='text-gray-500'>[필수]</span>
                개인정보 수집 및 이용 동의
                <input
                  type="checkbox"
                  checked={userPrivacyAgree}
                  onChange={() => setUserPrivacyAgree(!userPrivacyAgree)}
                  className="form-checkbox h-3 w-3 text-blue-800 ml-1"
                />
                <button type="button" className="text-sm text-blue-800 hover:underline" onClick={handlePrivacyAgree}>약관 전체 보기</button>
              </label>
              {errors.userPrivacyAgree && <p className="text-red-500 text-left text-xs">{errors.userPrivacyAgree}</p>}
            </div>

            <button
              type="submit"
              className="rounded bg-blue-800 w-[200px] h-[40px] font-medium text-white hover:bg-blue-900"
            >
              회원가입 완료
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?
              <a href="/" className="text-blue-800 hover:underline">
                로그인
              </a>
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && <PrivacyAgreeModal onClose={handleCloseModal} onAgree={handleAgree} />}
    </>
  );
};
