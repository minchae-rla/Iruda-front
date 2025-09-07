import React, { useState, useEffect } from 'react';
import api from '../../config/api';

interface AddProjectModalProps {
  onClose: () => void;
  onProjectUpdated: () => void;
  initialName?: string;
  projectId?: number;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ onClose, onProjectUpdated, initialName = '', projectId }) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSubmit = async () => {
    try {
      if (projectId) {
        await api.put('/api/projects/updateProject', { projectId, name });
      } else {
        await api.post('/api/projects/add', { name });
      }
      onProjectUpdated();
      onClose();
    } catch (error) {
      console.error('프로젝트 저장 실패:', error);
      alert('프로젝트 저장에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center animate-in fade-in duration-700">
      <div className="bg-white w-[450px] h-[270px] rounded-lg p-4">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">{projectId ? '프로젝트 수정' : '프로젝트 추가'}</h2>
          <button onClick={onClose}>
            <img src="/img/x.png" className="w-[25px] h-[25px]" />
          </button>
        </div>

        <div className="h-[200px] text-left">
          <p className="text-sm text-gray-400 p-3">{projectId ? '프로젝트 이름을 수정해주세요.' : '새로운 프로젝트의 정보를 입력해주세요.'}</p>

          <div className="p-3">
            <label className="block mb-1 text-lg font-semibold">프로젝트 제목</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-blue-900 focus:border-2"
              placeholder="예: 신규 일정 시스템"
            />
          </div>

          <div className="flex justify-end gap-2 p-4">
            <button className="rounded bg-blue-800 w-[60px] hover:bg-blue-900 text-white" onClick={handleSubmit}>
              저장
            </button>
            <button className="rounded w-[60px] border border-gray-200" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
