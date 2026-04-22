import React from 'react';
import { useStore } from '../../store/useStore';
import DayCell from './DayCell';
import calendarData from '../../data/calendar-2026.json';

const CalendarGrid = () => {
  const { currentYear, currentMonth, setSelectedDate } = useStore();

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const startDay = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0(Sun) - 6(Sat)

  const emptyCells = Array.from({ length: startDay }).map((_, i) => (
    <div key={`empty-${i}`} className="rounded-2xl bg-gray-50/50 dark:bg-slate-900/30" style={{ minHeight: "100px" }} />
  ));

  const daysList = Array.from({ length: daysInMonth }).map((_, i) => {
    const day = i + 1;
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayData = calendarData[dateStr] || {};
    
    return {
      day,
      dateStr,
      dayData
    };
  });

  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 relative z-10 w-full auto-rows-fr">
      {emptyCells}
      {daysList.map(({ day, dateStr, dayData }) => (
        <DayCell 
          key={dateStr}
          day={day}
          month={currentMonth}
          year={currentYear}
          data={dayData}
          onClick={(dStr) => setSelectedDate(dStr)}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
