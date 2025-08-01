import React, { useState, useMemo } from 'react';

interface Task {
  id: number;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  alarmSet: string;
}

interface MyCalendarProps {
  tasks: Task[];
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];

  // 시작 요일 맞추기 (전 달의 빈 칸)
  const startDay = date.getDay();
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // 실제 날짜 채우기
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const MyCalendar = ({ tasks }: MyCalendarProps) => {

  console.log(tasks);

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const days = useMemo(() => {
    return getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const formatted = (date: Date) => date.toISOString().split('T')[0];

  const moveMonth = (delta: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  return (
    <div className="p-4">
      {/* 상단 월 이동 */}
      <div className="flex justify-between my-2 items-center">
        <button onClick={() => moveMonth(-1)}>◀ {currentDate.getMonth()}월</button>
        <span className="font-bold text-lg">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </span>
        <button onClick={() => moveMonth(1)}>{currentDate.getMonth() + 2}월 ▶</button>
      </div>

      {/* 요일 표시 */}
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
            dayOfWeek === 0
              ? 'text-red-500'
              : dayOfWeek === 6
              ? 'text-blue-500'
              : 'text-black';

          // 해당 날짜에 맞는 일정들만 필터링
          // 날짜채우기
          const dayTasks = date
            ? tasks.filter(task => formatted(task.startDate) === formatted(date))
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

              {/* 일정 출력 */}
              <div className="mt-1 text-[10px] text-left text-gray-600 overflow-auto w-full">
                {dayTasks.map(task => (
                  <div key={task.id} className="truncate">
                    • {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCalendar;
