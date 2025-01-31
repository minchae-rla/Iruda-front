import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../config/api';
import { Signup } from '../../types/user/type';

export type Project = {
  id: number;
  name: string;
  projectType: string;
}

const signupUser = async (signup: Signup) => {
  await api.post('/api/users/signup', signup);
}
const getUserProjects = async (userId: number) => {
  const res = await api.get(`/api/projects/${userId}`);
  return res.data as Project[];
}

export const SignUp = () => {
  const navigate = useNavigate();

  const [signupReq, setSignupReq] = useState<Signup>({
    userId: '',
    userPw: '',
    name: '',
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const userId = 2;
  const listProject = async (userId: number)=> getUserProjects(userId).then(data => setProjects(data));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupReq((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    await signupUser(signupReq);
    navigate('/login');
  }

  useEffect(()=>{
    if(userId) {
      listProject(userId);
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      회원가입 페이지
      <input
        type='text'
        name='userId'
        onChange={handleChange}
        placeholder='id'
      />
      <input
        type='password'
        name='userPw'
        onChange={handleChange}
        placeholder='pw'
      />
      <input
        type='text'
        name='name'
        onChange={handleChange}
        placeholder='name'
      />
      <button onClick={handleSubmit}>
        저장
      </button>
    </div>
  );
};

