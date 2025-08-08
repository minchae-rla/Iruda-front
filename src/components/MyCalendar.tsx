import React, { useState, useMemo } from 'react';
import AddTaskModal from './modals/AddTaskModal';

interface Task {
  id: number;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
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

const formatted = (date: Date) => date.toISOString().split('T')[0];

const isBetween = (date: Date, start: Date, end: Date) => {
  const d = formatted(date);
  return formatted(start) <= d && d <= formatted(end);
};

const MyCalendar = ({ tasks, onTaskAdded, projectId }: MyCalendarProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = useMemo(() => {
    return getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const moveMonth = (delta: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-4">
        {/* 월 이동 */}
        <div className="flex justify-between my-2 items-center">
          <button onClick={() => moveMonth(-1)}>◀ {currentDate.getMonth()}월</button>
          <span className="font-bold text-lg">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </span>
          <button onClick={() => moveMonth(1)}>{currentDate.getMonth() + 2}월 ▶</button>
        </div>

        {/* 일정추가 버튼 */}
        <div className='flex justify-end p-2'>
          <button
            className="rounded bg-blue-800 w-[100px] h-[30px] text-1xl font-medium text-white hover:bg-blue-900"
            onClick={handleAddTask}
          >
            일정 등록
          </button>
        </div>

        {/* 요일 */}
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

        {/* 날짜 셀 */}
        <div className="grid grid-cols-7 text-center">
          {days.map((date, idx) => {
            const dayOfWeek = date?.getDay();
            const textColor =
              dayOfWeek === 0 ? 'text-red-500' :
              dayOfWeek === 6 ? 'text-blue-500' :
              'text-black';

            const dayTasks = date
              ? tasks.filter(task => isBetween(date, task.startDate, task.endDate))
              : [];

            return (
              <div
                key={idx}
                className={`border h-32 p-1 flex flex-col items-start justify-start cursor-pointer text-sm
                ${date && selectedDate?.toDateString() === date.toDateString() ? 'bg-sky-50' : ''}`}
                onClick={() => date && setSelectedDate(date)}
              >
                <div className={`font-semibold text-xs ${textColor}`}>
                  {date ? date.getDate() : ''}
                </div>

                {/* 일정 바 표시 */}
                <div className="mt-1 text-[10px] text-left w-full">
                  {dayTasks.map(task => {
                    const isStart = formatted(task.startDate) === formatted(date!);
                    const isEnd = formatted(task.endDate) === formatted(date!);
                    const isOnlyOneDay = isStart && isEnd;

                    const roundedClass = isOnlyOneDay
                      ? 'rounded-full'
                      : isStart
                      ? 'rounded-l-full'
                      : isEnd
                      ? 'rounded-r-full'
                      : '';

                    return (
                      <div
                        key={task.id}
                        className={`truncate px-1 py-0.5 mb-0.5 text-white text-[10px] ${roundedClass}`}
                        style={{
                          backgroundColor: task.color,
                          textAlign: 'center',
                        }}
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

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onTaskAdded={() => {
            onTaskAdded(); 
            setIsModalOpen(false);
          }}
          selectedDate={selectedDate}
          projectId={projectId}
        />
      )}
    </>
  );
};

export default MyCalendar;
