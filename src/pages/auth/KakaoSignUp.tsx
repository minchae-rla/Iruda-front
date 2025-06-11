import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { useSearchParams } from 'react-router-dom';
import PrivacyAgreeModal from '../../components/modals/PrivacyAgreeModal';

export const KakaoSignUp = () => {
  const navigate = useNavigate();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [searchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provider, setProvider] = useState('');
  const [providerId, setProviderId] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPhoneCheck, setUserPhoneCheck] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userPrivacyAgree, setUserPrivacyAgree] = useState(false);

  const [errors, setErrors] = useState({
    userPhone: '',
    userPhoneCheck: '',
    userDepartment: '',
    userBirth: '',
    userPrivacyAgree: '',
  });

  useEffect(() => {
    const providerParam = searchParams.get('provider');
    const providerIdParam = searchParams.get('providerId');
    const userNameParam = searchParams.get('name');
    const userIdParam = searchParams.get('userId');

    if (providerParam) setProvider(providerParam);
    if (providerIdParam) setProviderId(providerIdParam);
    if (userNameParam) setName(userNameParam);
    if (userIdParam) setUserId(userIdParam);
  }, [searchParams]);

  useEffect(() => {
    if (provider && providerId) {
      return;
    }
    if (provider === '' && providerId === '') {
      return;
    }
    alert('잘못된 접근입니다.');
    navigate('/');
  }, [provider, providerId]);

  const sendSmsCode = async () => {
    try {
      const res = await api.post('http://localhost:8081/api/sms/send', { phoneNumber: userPhone });
      alert(res.data);
    } catch (error) {
      alert('인증번호 발송 실패');
    }
  };

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


  const birthRegex = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    let formErrors = { ...errors };
    let isValid = true;

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

    if (!isPhoneVerified) {
      formErrors.userPhoneCheck = '전화번호 인증이 필요합니다.';
      isValid = false;
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
    } else if (!birthRegex.test(userBirth)) {
      formErrors.userBirth = '생년월일은 20001010 형식으로 입력해주세요.';
      isValid = false;
    } else {
      formErrors.userBirth = '';
    }

    if (!userPrivacyAgree) {
      formErrors.userPrivacyAgree = '개인정보 동의는 필수입니다.';
      isValid = false;
    } else {
      formErrors.userPrivacyAgree = '';
    }

    setErrors(formErrors);
    if (!isValid) return;

    try {
      await api.post('/api/users/signup', {
        provider,
        providerId,
        name,
        userId,
        phone: userPhone,
        department: userDepartment,
        birth: userBirth,
        privacyAgree: userPrivacyAgree,
      });

      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패. 다시 시도해주세요.');
    }
  };

  const handlePrivacyAgree = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAgree = () => {
    setUserPrivacyAgree(true);
    setIsModalOpen(false);
  };

  const handleBlur = (field: string) => {
    let formErrors = { ...errors };
    switch (field) {
      case 'userPhone':
        formErrors.userPhone = userPhone ? '' : '전화번호를 입력해주세요.';
        break;
      case 'userPhoneCheck':
        formErrors.userPhoneCheck = userPhoneCheck ? '' : '인증번호를 입력해주세요.';
        break;
      case 'userDepartment':
        formErrors.userDepartment = userDepartment ? '' : '소속을 입력해주세요.';
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
      default:
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
            <h1 className="text-2xl text-blue-900 font-semibold">소셜회원가입</h1>
          </div>
          <form
            onSubmit={handleSignUp}
            className="flex justify-center items-center flex-col space-y-4 w-[350px]"
          >
            <input type="hidden" name="provider" value={provider} />
            <input type="hidden" name="providerId" value={providerId} />
            <input type="hidden" name="name" value={name} />
            <input type="hidden" name="userId" value={userId} />

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
                  placeholder="ex)01012345678 ('-' 없이 입력)"
                  onChange={(e) => setUserPhone(e.target.value)}
                  onBlur={() => handleBlur('userPhone')}
                  className={`border w-[280px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userPhone ? 'border-red-500' : ''}`}
                />
                <button type='button' className='border w-[50px] h-[35px] rounded-md text-sm hover:bg-gray-100' onClick={sendSmsCode}>발송</button>
              </div>
              {errors.userPhone && <p className="text-red-500 text-left text-xs">{errors.userPhone}</p>}
            </div>

            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">인증번호 입력</label>
              <div className='flex gap-2'>
                <input
                  value={userPhoneCheck}
                  onChange={(e) => setUserPhoneCheck(e.target.value)}
                  onBlur={() => handleBlur('userPhoneCheck')}
                  className={`border w-[280px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 placeholder:text-xs ${errors.userPhoneCheck ? 'border-red-500' : ''}`}
                />
                <button type='button' className='border w-[50px] h-[35px] rounded-md text-sm hover:bg-gray-100' onClick={verifySmsCode}>확인</button>
              </div>
              {errors.userPhoneCheck && <p className="text-red-500 text-left text-xs">{errors.userPhoneCheck}</p>}
            </div>

            <div className="space-y-2 w-[280px]">
              <label className="block w-full text-left text-sm">소속(팀)</label>
              <input
                value={userDepartment}
                onChange={(e) => setUserDepartment(e.target.value)}
                onBlur={() => handleBlur('userDepartment')}
                className={`border w-[280px] h-[35px] rounded-md focus:outline-none focus:border-blue-900 focus:border-2 pl-2 ${errors.userDepartment ? 'border-red-500' : ''}`}
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