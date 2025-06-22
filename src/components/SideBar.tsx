import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import AddProjectModal from './modals/AddProjectModal';

interface SideBarProps {
  onProjectSelect: (projectId: number) => void;
}

export const SideBar = ({ onProjectSelect }: SideBarProps) => { 
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects/getProject');
      setProjects(response.data);
    } catch (error) {
      console.error('프로젝트 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = () => {
    setIsModalOpen(true);
  };

  const handleGetProject = (projectId: number) => {
    onProjectSelect(projectId);
  };

  return (
    <>
      <aside className="w-64 border-r bg-background">
        <div className="flex flex-col justify-center items-start gap-4 p-4 border-b">
          <div className="flex gap-2">
            <button
              className="flex justify-center items-center gap-2 hover:bg-blue-50 px-2 py-1 rounded"
              onClick={handleAddProject}
            >
              <img src="/img/edit_project.png" className="w-[20px] h-auto" />
              <span className="text-sm">프로젝트 추가</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button className="flex justify-center items-center gap-2 hover:bg-blue-50 px-2 py-1 rounded">
              <img src="/img/all_schedule.png" className="w-[20px] h-auto" />
              <span className="text-sm">전체 일정</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button className="flex justify-center items-center gap-2 hover:bg-blue-50 px-2 py-1 rounded">
              <img src="/img/today.png" className="w-[20px] h-auto" />
              <span className="text-sm">오늘</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button className="flex justify-center items-center gap-2 hover:bg-blue-50 px-2 py-1 rounded">
              <img src="/img/tomorrow.png" className="w-[20px] h-auto" />
              <span className="text-sm">내일</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button className="flex justify-center items-center gap-2 hover:bg-blue-50 px-2 py-1 rounded">
              <img src="/img/complete_blue.png" className="w-[20px] h-auto" />
              <span className="text-sm">완료된 일정</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start gap-2 p-4">
          <div className="mt-2 px-2 py-1 text-sm font-bold text-muted-foreground">프로젝트</div>
          {projects.map((project: any) => (
            <button
              key={project.id}
              className="flex items-center gap-2 text-sm font-normal hover:bg-blue-50 px-2 py-1 rounded"
              onClick={() => handleGetProject(project.id)}  
            >
              <span className="text-blue-500">#</span>
              <span className='text-left truncate w-[180px]'>{project.name}</span>
            </button>
          ))}
        </div>
      </aside>

      {isModalOpen && (
        <AddProjectModal
          onClose={() => setIsModalOpen(false)}
          onProjectAdded={fetchProjects}
        />
      )}
    </>
  );
};
