import React, { useState, useMemo } from 'react';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];

  // 시작 요일 맞추기
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

const CustomCalendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const days = useMemo(() => {
    return getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const formatted = (date: Date) =>
    date.toISOString().split('T')[0]; // yyyy-mm-dd

  const moveMonth = (delta: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between my-2">
        <button onClick={() => moveMonth(-1)}>◀ {currentDate.getMonth()}월</button>
        <span>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</span>
        <button onClick={() => moveMonth(1)}>{currentDate.getMonth() + 2}월 ▶</button>
      </div>

      <div className="grid grid-cols-7 text-center font-bold">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center">
        {days.map((date, idx) => (
          <div
            key={idx}
            className={`border h-16 flex items-center justify-center cursor-pointer ${
              date && selectedDate?.toDateString() === date.toDateString() ? 'bg-sky-50' : ''
            }`}
            onClick={() => date && setSelectedDate(date)}
          >
            {date ? date.getDate() : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
