import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'; // react-calendar의 Calendar
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [value, setValue] = useState(new Date());

  const handleChange = (date: React.SetStateAction<Date> | React.SetStateAction<Date>[]) => {
    if (Array.isArray(date)) {
      setValue(date[0]);
    } else {
      setValue(date);
    }
  };

  return (
    <div>
      <h2>내 일정 캘린더</h2>
      <Calendar
        value={value}
        // onChange={handleChange}
      />
      <p>선택된 날짜: {value.toDateString()}</p>
    </div>
  );
};

export default MyCalendar;
