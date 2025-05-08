import React, { useState } from 'react';
import api from '../../config/api';

interface ProjectModalProps {
  onClose: () => void;
  onProjectAdded: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ onClose, onProjectAdded }) => {
  const [title, setTitle] = useState('');
  // const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      await api.post('/api/projects/addProject', {
        name: title,
        // memberEmail: email,
      });
      onProjectAdded();
      onClose();
    } catch (error) {
      console.error('프로젝트 추가 실패:', error);
      alert('프로젝트 추가에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-96 shadow">
        <h2 className="text-lg font-bold mb-4">프로젝트 추가</h2>
        
        <div className="mb-4">
          <label className="block mb-1 text-sm">프로젝트 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="예: 신규 일정 시스템"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block mb-1 text-sm">팀원 이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="example@domain.com"
          />
        </div> */}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm border rounded">취소</button>
          <button onClick={handleSubmit} className="px-4 py-2 text-sm bg-blue-500 text-white rounded">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
