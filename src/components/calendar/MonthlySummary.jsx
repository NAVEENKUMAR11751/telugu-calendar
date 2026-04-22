import React from 'react';
import { useStore } from '../../store/useStore';
import { TELUGU_MONTHS, LABELS } from '../../utils/constants';
import { EVENT_TITLES_TEL } from '../../utils/translations';
import calendarData from '../../data/calendar-2026.json';


const MonthlySummary = ({ month, year }) => {
  const { theme, language } = useStore();
  const isDarkMode = theme === 'dark';
  const isTel = language === 'tel';
  const L = LABELS[language] || LABELS.eng;

  const daysInMonth = new Date(year, month, 0).getDate();
  let festivals = 0, holidays = 0, sundays = 0;
  let nextFestival = null;
  const today = new Date();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const data = calendarData[dateStr];
    if (date.getDay() === 0) sundays++;
    if (data?.events) {
      data.events.forEach(e => {
        if (e.category === "Festival" || e.category === "Telugu New Year" || e.category === "Sankranti") festivals++;
        if (e.category === "Public Holiday") holidays++;
      });
      if (!nextFestival && date >= today && data.events.length > 0) {
        nextFestival = { date: dateStr, event: data.events[0] };
      }
    }
  }

  const teluguMonth = TELUGU_MONTHS[month - 1];
  const paksham = today.getDate() <= 15
    ? (language === 'tel' ? "శుక్ల పక్షం" : "Shukla")
    : (language === 'tel' ? "కృష్ణ పక్షం" : "Krishna");

  const cards = [
    { label: L.festivals, value: festivals, color: "text-orange-500", bg: isDarkMode ? "bg-orange-900/30" : "bg-orange-50" },
    { label: L.holidays, value: holidays, color: "text-green-500", bg: isDarkMode ? "bg-green-900/30" : "bg-green-50" },
    { label: L.sundays, value: sundays, color: "text-red-500", bg: isDarkMode ? "bg-red-900/30" : "bg-red-50" },
  ];

  return (
    <div className={`rounded-2xl px-5 py-4 mt-4 ${isDarkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-100"}`}>
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3">
          {cards.map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-xl px-4 py-2 ${bg}`}>
              <div className={`text-xl font-bold ${color}`}>{value}</div>
              <div className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>{label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm mt-4 sm:mt-0">
          <div className={`${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
            <span className="opacity-60 text-xs block">{L.teluguMonth}</span>
            <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{teluguMonth}</span>
          </div>
          <div className={`${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
            <span className="opacity-60 text-xs block">{L.paksham}</span>
            <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{paksham}</span>
          </div>
          {nextFestival && (
            <div className={`${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              <span className="opacity-60 text-xs block">{L.nextFestival}</span>
              <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"} text-xs`}>
                {nextFestival.event.icon} {isTel ? (EVENT_TITLES_TEL[nextFestival.event.title] || nextFestival.event.title) : nextFestival.event.title}{' '}
                <span className="opacity-60">({nextFestival.date})</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
