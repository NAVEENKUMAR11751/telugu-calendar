import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import CalendarGrid from '../components/calendar/CalendarGrid';
import DetailPanel from '../components/calendar/DetailPanel';
import MonthlySummary from '../components/calendar/MonthlySummary';
import Legend from '../components/calendar/Legend';
import calendarData from '../data/calendar-2026.json';
import { WEEKDAYS, WEEKDAYS_TEL, MONTHS, MONTHS_TEL, YEARS, LABELS } from '../utils/constants';

const Home = () => {
  const {
    currentMonth, setMonth,
    currentYear, setYear,
    selectedDate, setSelectedDate,
    todayDate,
    theme,
    language,
  } = useStore();

  const isDarkMode = theme === 'dark';
  const L = LABELS[language] || LABELS.eng;
  const weekdays = language === 'tel' ? WEEKDAYS_TEL : WEEKDAYS;
  const months = language === 'tel' ? MONTHS_TEL : MONTHS;

  const navigate = (dir) => {
    if (dir === "prev") {
      if (currentMonth === 1) { setMonth(12); setYear(currentYear - 1); }
      else setMonth(currentMonth - 1);
    } else {
      if (currentMonth === 12) { setMonth(1); setYear(currentYear + 1); }
      else setMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const handleJumpToToday = () => {
    const today = new Date();
    setMonth(today.getMonth() + 1);
    setYear(today.getFullYear());
    setSelectedDate(todayDate);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentMonth, currentYear]);

  let selectedDay = null;
  let selectedMonth = currentMonth;
  let selectedYear = currentYear;
  if (selectedDate) {
    const parts = selectedDate.split("-");
    selectedYear = parseInt(parts[0]);
    selectedMonth = parseInt(parts[1]);
    selectedDay = parseInt(parts[2]);
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">

      {/* Navigation Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("prev")}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all hover:scale-110
              ${isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"}`}>
            ‹
          </button>

          <div className="flex items-center gap-2">
            <select
              value={currentMonth}
              onChange={e => { setMonth(Number(e.target.value)); setSelectedDate(null); }}
              className={`font-bold text-xl px-2 py-1 rounded-xl border-none outline-none cursor-pointer appearance-none
                ${isDarkMode ? "bg-slate-800 text-white" : "bg-transparent text-gray-900"}`}>
              {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
            </select>

            <select
              value={currentYear}
              onChange={e => { setYear(Number(e.target.value)); setSelectedDate(null); }}
              className={`font-bold text-xl px-2 py-1 rounded-xl border-none outline-none cursor-pointer appearance-none
                ${isDarkMode ? "bg-slate-800 text-white" : "bg-transparent text-gray-900"}`}>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <button onClick={() => navigate("next")}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all hover:scale-110
              ${isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"}`}>
            ›
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className={`text-xs hidden md:block ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
            {L.keysHint}
          </span>
          <button onClick={handleJumpToToday}
            className="px-4 py-1.5 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-all hover:scale-105 shadow-md shadow-orange-200">
            {L.todayBtn}
          </button>
        </div>
      </div>

      <p className={`text-sm -mt-6 mb-2 ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
        {L.clickHint}
      </p>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1">
        {weekdays.map((day, i) => (
          <div key={day} className={`text-center text-xs font-bold py-2 rounded-xl
            ${i === 0 ? (isDarkMode ? "text-red-400" : "text-red-500") :
              i === 6 ? (isDarkMode ? "text-blue-400" : "text-blue-500") :
              isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <CalendarGrid />

      {/* Detail Panel */}
      {selectedDate && (
        <DetailPanel
          dateStr={selectedDate}
          day={selectedDay}
          month={selectedMonth}
          year={selectedYear}
          panchangData={calendarData[selectedDate]}
          onClose={() => setSelectedDate(null)}
        />
      )}

      {/* Monthly Summary */}
      <MonthlySummary month={currentMonth} year={currentYear} />

      {/* Legend */}
      <Legend />

    </div>
  );
};

export default Home;
