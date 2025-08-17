import React from 'react';

interface Task {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  alarmSet: string;
  color: string;
}

interface DetailTaskModalProps {
  task: Task;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const tailwindColorMap: Record<string, string> = {
  'red-400': 'bg-red-400',
  'orange-400': 'bg-orange-400',
  'yellow-400': 'bg-yellow-400',
  'green-400': 'bg-green-400',
  'blue-400': 'bg-blue-400',
  'indigo-400': 'bg-indigo-400',
  'purple-400': 'bg-purple-400',
  'pink-400': 'bg-pink-400',
  'gray-400': 'bg-gray-400',
};

const DetailTaskModal: React.FC<DetailTaskModalProps> = ({ task, onClose, onEdit, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center animate-in fade-in duration-700">
      <div className="bg-white w-[450px] h-auto rounded-lg p-4">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">일정 상세</h2>
          <button onClick={onClose}>
            <img src="/img/x.png" className="w-[25px] h-[25px]" alt="닫기" />
          </button>
        </div>

        {/* 상세 내용 */}
        <div className="text-left mt-4 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">일정 제목</label>
            <div className="border border-gray-200 p-2 rounded bg-gray-50">
              {task.title}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">일정 내용</label>
            <div className="border border-gray-200 p-2 rounded bg-gray-50 whitespace-pre-wrap">
              {task.content || '내용 없음'}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-semibold">시작일</label>
              <div className="border border-gray-200 p-2 rounded bg-gray-50">
                {task.startDate}
              </div>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-semibold">종료일</label>
              <div className="border border-gray-200 p-2 rounded bg-gray-50">
                {task.endDate}
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">알람 설정</label>
            <div className="flex items-center gap-2">
              <img
                src={task.alarmSet === 'on' ? '/img/alarm_on.png' : '/img/alarm_off.png'}
                alt={task.alarmSet === 'on' ? '알람 켜짐' : '알람 꺼짐'}
                className="w-[30px] h-[30px]"
              />
              <span>{task.alarmSet === 'on' ? '알람 켜짐' : '알람 꺼짐'}</span>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">색상</label>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full ${tailwindColorMap[task.color] || 'bg-blue-400'}`}
              ></div>
              <span>{task.color}</span>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2 p-4 mt-2">
          <button
            className="rounded bg-blue-800 px-4 py-1 hover:bg-blue-900 text-white"
            onClick={() => onEdit(task)}
          >
            수정
          </button>
          <button
            className="rounded bg-red-600 px-4 py-1 hover:bg-red-700 text-white"
            onClick={() => onDelete(task.id)}
          >
            삭제
          </button>
          <button
            className="rounded px-4 py-1 border border-gray-200"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTaskModal;
