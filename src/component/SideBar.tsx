import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

export const SideBar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 border-r bg-background">
        <div className="flex flex-col gap-1 p-2">
          <button className="justify-start gap-2 text-sm font-normal">
            <span>프로젝트 추가</span>
          </button>

          <button className="justify-start gap-2 text-sm font-normal">
            <span>오늘 일정</span>
          </button>

          <button className="justify-start gap-2 text-sm font-normal">
            <span>오늘</span>
          </button>

          <button className="justify-start gap-2 text-sm font-normal">
            <span>내일</span>
          </button>

          <button className="justify-start gap-2 text-sm font-normal">
            <span>완료된 일정</span>
          </button>

          <div className="mt-4 px-2 py-1 text-sm font-medium text-muted-foreground">프로젝트</div>

          <button className="justify-start gap-2 text-sm font-normal bg-blue-50">
            <span className="text-blue-500">#</span>
            <span>워크플레이스</span>
          </button>

          <button className="justify-start gap-2 text-sm font-normal">
            <span className="text-blue-500">#</span>
            <span>2주간의 이력...</span>
          </button>

          <button className="justify-start gap-2 text-sm font-normal">
            <span className="text-blue-500">#</span>
            <span>데이터보드</span>
          </button>
        </div>
    </aside>
  );
};