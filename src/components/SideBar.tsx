import React, { useEffect, useState } from 'react';
import AddProjectModal from './modals/AddProjectModal';
import api from '../config/api';

interface SideBarProps {
  onProjectSelect: (projectId: number) => void;
  onViewChange: (view: 'calendar' | 'all' | 'today' | 'tomorrow' | 'completed') => void;
}

export const SideBar = ({ onProjectSelect, onViewChange }: SideBarProps) => {
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

  const handleAddProject = () => setIsModalOpen(true);

  return (
    <>
      <aside className="w-64 border-r bg-background">

        <div className="flex flex-col gap-2 p-4 border-b">
          <button onClick={() => onViewChange('all')} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/all_schedule.png" className="w-[20px] h-auto" />
            전체 일정
          </button>
          <button onClick={() => onViewChange('today')} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/today.png" className="w-[20px] h-auto" />
            오늘
          </button>
          <button onClick={() => onViewChange('tomorrow')} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/tomorrow.png" className="w-[20px] h-auto" />
            내일
          </button>
          <button onClick={() => onViewChange('completed')} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/complete_blue.png" className="w-[20px] h-auto" />
            완료된 일정
          </button>
          <button onClick={handleAddProject} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/edit_project.png" className="w-[20px] h-auto" />
            프로젝트 추가
          </button>
        </div>

        <div className="flex flex-col justify-center items-start gap-2 p-4">
          <div className="mt-2 px-2 py-1 text-sm font-bold text-muted-foreground">프로젝트</div>
          {projects.map((project: any) => (
            <button
              key={project.id}
              className="flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-blue-50 truncate w-[220px]"
              onClick={() => onProjectSelect(project.id)}
            >
              <span className="text-blue-500">#</span>
              <span className="truncate">{project.name}</span>
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
