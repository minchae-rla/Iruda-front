import React, { useEffect, useState } from 'react';
import api from '../../config/api';

interface TaskModalProps {
  onClose: () => void;
  onTaskAdded: () => void;
  projectId: number;
  selectedDate: Date | null;
}

const tailwindColors = [
  'red-400',
  'orange-400',
  'yellow-400',
  'green-400',
  'blue-400',
  'indigo-400',
  'purple-400',
  'pink-400',
  'gray-400',
];

const TaskModal: React.FC<TaskModalProps> = ({ onClose, onTaskAdded, projectId, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [alarmSet, setAlarmSet] = useState(false);
  const [color, setColor] = useState('blue-500');

  useEffect(() => {
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split('T')[0];
      setStartDate(formatted);
      setEndDate(formatted);
    }
  }, [selectedDate]);

  const handleSubmit = async () => {
    try {
      await api.post(`/api/tasks/add/${projectId}`, {
        title,
        content,
        startDate,
        endDate,
        alarmSet: alarmSet ? 'on' : 'off',
        color,
      });

      onTaskAdded();
      onClose();
    } catch (error) {
      console.error('일정 추가 실패:', error);
      alert('일정 추가에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center animate-in fade-in duration-700">
      <div className="bg-white w-[450px] h-auto rounded-lg p-4">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">일정 등록</h2>
          <button onClick={onClose}>
            <img src="/img/x.png" className="w-[25px] h-[25px]" alt="닫기" />
          </button>
        </div>

        <div className="text-left mt-4 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">일정 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 휴가, 회의, 마감 등"
              className="w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-blue-900"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">일정 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="상세 내용을 입력하세요"
              rows={3}
              className="w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-blue-900"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-blue-900"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">종료일</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border-2 border-gray-200 p-2 rounded focus:outline-none focus:border-blue-900"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">알람 설정</label>
            <button
              type="button"
              onClick={() => setAlarmSet(!alarmSet)}
              className="mt-1"
              aria-pressed={alarmSet}
              aria-label="알람 켜기/끄기"
            >
              <img
                src={alarmSet ? '/img/alarm_on.png' : '/img/alarm_off.png'}
                alt={alarmSet ? '알람 켜짐' : '알람 꺼짐'}
                className="w-[30px] h-[30px]"
              />
            </button>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">색상 선택</label>
            <div className="flex gap-3 mt-1">
              {tailwindColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`
                    w-7 h-7 rounded-full cursor-pointer
                    ${c === 'red-400' ? 'bg-red-400' : ''}
                    ${c === 'orange-400' ? 'bg-orange-400' : ''}
                    ${c === 'yellow-400' ? 'bg-yellow-400' : ''}
                    ${c === 'green-400' ? 'bg-green-400' : ''}
                    ${c === 'blue-400' ? 'bg-blue-400' : ''}
                    ${c === 'indigo-400' ? 'bg-indigo-400' : ''}
                    ${c === 'purple-400' ? 'bg-purple-400' : ''}
                    ${c === 'pink-400' ? 'bg-pink-400' : ''}
                    ${c === 'gray-400' ? 'bg-gray-400' : ''}
                    ${color === c ? 'ring-2 ring-offset-1 ring-black' : ''}
                    transition
                  `}
                  aria-label={`색상 선택: ${c}`}
                  title={c}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 mt-2">
          <button
            className="rounded bg-blue-800 px-4 py-1 hover:bg-blue-900 text-white"
            onClick={handleSubmit}
            disabled={!title || !startDate || !endDate}
          >
            저장
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

export default TaskModal;
