import React, { useEffect, useState } from 'react';
import AddProjectModal from './modals/AddProjectModal';
import api from '../config/api';

interface SideBarProps {
  onProjectSelect: (projectId: number) => void;
  onViewChange: (view: 'calendar' | 'all' | 'today' | 'tomorrow' | 'completed') => void;
}

export const SideBar = ({ onProjectSelect, onViewChange }: SideBarProps) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [updateModal, setUpdateModal] = useState<{ projectId: number; name: string } | null>(null);

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
    setUpdateModal(null);
    setIsModalOpen(true);
  };

  const toggleMenu = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDelete = async (projectId: number) => {
    if (!window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) return;
    try {
      await api.delete('/api/projects/deleteProject', { data: { projectId } });
      fetchProjects();
      setOpenMenuId(null);
    } catch (error) {
      console.error('프로젝트 삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <aside className="w-64 border-r bg-background" onClick={() => setOpenMenuId(null)}>
        <div className="flex flex-col gap-2 p-4 border-b">
          <button onClick={() => onViewChange('all')} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/all_schedule.png" className="w-[20px] h-auto" />전체 일정
          </button>
          <button onClick={() => onViewChange('today')} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/today.png" className="w-[20px] h-auto" />오늘
          </button>
          <button onClick={() => onViewChange('tomorrow')} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/tomorrow.png" className="w-[20px] h-auto" />내일
          </button>
          <button onClick={() => onViewChange('completed')} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/complete_blue.png" className="w-[20px] h-auto" />완료된 일정
          </button>
          <button onClick={handleAddProject} className="flex gap-2 items-center px-2 py-1 rounded hover:bg-blue-50">
            <img src="/img/edit_project.png" className="w-[20px] h-auto" />프로젝트 추가
          </button>
        </div>

        <div className="flex flex-col justify-center items-start gap-2 p-4">
          <div className="mt-2 px-2 py-1 text-sm font-bold text-muted-foreground">프로젝트</div>
          {projects.map((project: any) => (
            <div key={project.id} className="relative w-full flex items-center justify-between group" onClick={(e) => e.stopPropagation()}>
              <button className="flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-blue-50 truncate w-[180px]"
                      onClick={() => onProjectSelect(project.id)}>
                <span className="text-blue-500">#</span>
                <span className="truncate">{project.name}</span>
              </button>

              <button onClick={(e) => toggleMenu(project.id, e)} className="p-1 hover:bg-gray-100 rounded">
                <img src="/img/3dot_gray.png" className="w-[16px] h-[16px]" />
              </button>

              {openMenuId === project.id && (
                <div className="absolute right-0 top-full mt-1 bg-white border rounded shadow-md z-10" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => { setUpdateModal({ projectId: project.id, name: project.name }); setIsModalOpen(true); }}
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100">수정</button>
                  <button onClick={() => handleDelete(project.id)}
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100">삭제</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {isModalOpen && (
        <AddProjectModal
          onClose={() => { setIsModalOpen(false); setUpdateModal(null); }}
          onProjectUpdated={fetchProjects}
          projectId={updateModal?.projectId}
          initialName={updateModal?.name}
        />
      )}
    </>
  );
};
