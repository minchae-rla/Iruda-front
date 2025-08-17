import React, { useState, useMemo } from 'react';
import AddTaskModal from './modals/TaskModal';

interface Task {
  id: number;
  title: string;
  content: string;
  startDate: Date | string;
  endDate: Date | string;
  alarmSet: string;
  color: string; 
}

interface MyCalendarProps {
  tasks: Task[];
  onTaskAdded: () => void;
  projectId: number;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];

  const startDay = date.getDay();
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const formatted = (date: Date | string | null | undefined) => {
  try {
    return new Date(date!).toISOString().split('T')[0];
  } catch {
    return '';
  }
};

const isBetween = (date: Date, start: Date | string, end: Date | string) => {
  const d = formatted(date);
  return formatted(start) <= d && d <= formatted(end);
};

const tailwindColorMap: Record<string, string> = {
  'red-400': '#f87171',
  'orange-400': '#fb923c',
  'yellow-400': '#facc15',
  'green-400': '#4ade80',
  'blue-400': '#60a5fa',
  'indigo-400': '#818cf8',
  'purple-400': '#a78bfa',
  'pink-400': '#f472b6',
  'gray-400': '#9ca3af',
};

const MyCalendar = ({ tasks, onTaskAdded, projectId }: MyCalendarProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);

  const days = useMemo(() => {
    return getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const moveMonth = (delta: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta);
    setCurrentDate(newDate);
    setSelectedDate(null);
    setButtonPosition(null); 
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between my-2 items-center">
          <button onClick={() => moveMonth(-1)}>◀ {currentDate.getMonth()}월</button>
          <span className="font-bold text-lg">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </span>
          <button onClick={() => moveMonth(1)}>{currentDate.getMonth() + 2}월 ▶</button>
        </div>

        <div className="grid grid-cols-7 text-center font-bold">
          {WEEKDAYS.map((day, idx) => (
            <div
              key={day}
              className={`${idx === 0 ? 'text-red-500' : ''} ${idx === 6 ? 'text-blue-500' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 text-center">
          {days.map((date, idx) => {
            const dayOfWeek = date?.getDay();
            const textColor =
              dayOfWeek === 0 ? 'text-red-500' :
                dayOfWeek === 6 ? 'text-blue-500' :
                  'text-black';

            const dayTasks = date
              ? tasks
                .filter(task => isBetween(date, task.startDate, task.endDate))
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
              : [];

            return (
              <div
                key={idx}
                className={`border h-36 p-1 flex flex-col items-start justify-start cursor-pointer text-sm
                ${date && selectedDate?.toDateString() === date.toDateString() ? 'bg-sky-50' : ''}`}
                onClick={(e) => {
                  if (date) {
                    setSelectedDate(date);
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    setButtonPosition({
                      top: rect.top + window.scrollY + 20,
                      left: rect.left + window.scrollX + rect.width / 2 - 50,
                    });
                  }
                }}
              >
                <div className={`font-semibold text-xs ${textColor}`}>
                  {date ? date.getDate() : ''}
                </div>

                <div className="mt-1 text-[10px] text-left w-full space-y-0.5">
                  {dayTasks.map((task, i) => {
                    const taskStart = formatted(task.startDate);
                    const taskEnd = formatted(task.endDate);
                    const current = formatted(date!);

                    const isStart = taskStart === current;
                    const isEnd = taskEnd === current;
                    const isOnlyOneDay = isStart && isEnd;

                    const roundedClass = isOnlyOneDay
                      ? 'rounded-full'
                      : isStart
                        ? 'rounded-l-full'
                        : isEnd
                          ? 'rounded-r-full'
                          : '';

                    const bgColor = tailwindColorMap[task.color] || '#60a5fa';
                    return (
                      <div
                        key={task.id + '-' + i}
                        className={`truncate px-1 text-white text-[10px] ${roundedClass}`}
                        style={{
                          backgroundColor: bgColor,
                          textAlign: 'center',
                          height: '20px',
                          lineHeight: '20px',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                        title={task.title}
                      >
                        {isStart ? task.title : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {buttonPosition && (
        <button
          className="fixed z-50 bg-white text-black px-3 py-1 rounded border border-gray-200 shadow hover:bg-gray-100"
          style={{ top: buttonPosition.top, left: buttonPosition.left }}
          onClick={() => {
            setIsModalOpen(true);
            setButtonPosition(null); 
          }}
        >
          일정 등록
        </button>
      )}

      {isModalOpen && (
        <AddTaskModal
          onClose={() => {
            setIsModalOpen(false);
            setButtonPosition(null);
          }}
          onTaskAdded={() => {
            onTaskAdded();
            setIsModalOpen(false);
            setButtonPosition(null);
          }}
          selectedDate={selectedDate}
          projectId={projectId}
        />
      )}
    </>
  );
};

export default MyCalendar;
