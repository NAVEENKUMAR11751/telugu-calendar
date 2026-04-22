import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { DEFAULT_TITHIS, DEFAULT_TITHIS_TEL, TELUGU_MONTHS, MONTHS, MONTHS_TEL } from '../../utils/constants';
import { EVENT_TITLES_TEL, NAKSHATRA_TEL, YOGA_TEL, PAKSHA_TEL } from '../../utils/translations';

const getCategoryStyle = (category) => {
  const styles = {
    "Festival": "bg-orange-100 text-orange-700 border border-orange-200",
    "Ekadashi": "bg-blue-100 text-blue-700 border border-blue-200",
    "Pournami": "bg-yellow-100 text-yellow-700 border border-yellow-200",
    "Amavasya": "bg-gray-800 text-gray-100 border border-gray-600",
    "Sankranti": "bg-amber-100 text-amber-700 border border-amber-200",
    "Masik Shivaratri": "bg-purple-100 text-purple-700 border border-purple-200",
    "Public Holiday": "bg-green-100 text-green-700 border border-green-200",
    "Important Tithi": "bg-rose-100 text-rose-700 border border-rose-200",
    "Fasting Day": "bg-teal-100 text-teal-700 border border-teal-200",
    "Auspicious Day": "bg-lime-100 text-lime-700 border border-lime-200",
    "Telugu New Year": "bg-pink-100 text-pink-700 border border-pink-200",
    "Telugu Month Start": "bg-cyan-100 text-cyan-700 border border-cyan-200",
  };
  return styles[category] || "bg-gray-100 text-gray-600 border border-gray-200";
};

const getCellBg = (dow, isToday, isSelected, isDarkMode, events) => {
  const hasAmavasya = events?.some(e => e.category === "Amavasya");
  const hasPournami = events?.some(e => e.category === "Pournami");
  const hasFestival = events?.some(e => ["Festival","Sankranti","Telugu New Year"].includes(e.category));
  if (isToday) return isDarkMode ? "bg-orange-900/40 border-2 border-orange-400 shadow-lg ring-2 ring-orange-400/40" : "bg-orange-50 border-2 border-orange-400 shadow-lg ring-2 ring-orange-300/40";
  if (isSelected) return isDarkMode ? "bg-slate-700 border-2 border-slate-400 shadow-lg" : "bg-slate-100 border-2 border-slate-500 shadow-lg";
  if (hasAmavasya) return isDarkMode ? "bg-gray-900 border border-gray-600" : "bg-gray-900 border border-gray-700";
  if (hasPournami) return isDarkMode ? "bg-yellow-900/30 border border-yellow-700/50" : "bg-yellow-50 border border-yellow-200";
  if (hasFestival) return isDarkMode ? "bg-orange-900/20 border border-orange-700/40" : "bg-orange-50/80 border border-orange-200";
  if (dow === 0) return isDarkMode ? "bg-red-900/20 border border-red-800/40" : "bg-red-50 border border-red-100";
  if (dow === 6) return isDarkMode ? "bg-blue-900/20 border border-blue-800/40" : "bg-blue-50/60 border border-blue-100";
  return isDarkMode ? "bg-slate-800 border border-slate-700/50" : "bg-white border border-gray-100";
};

const getDateNumStyle = (dow, isDarkMode, events) => {
  const hasAmavasya = events?.some(e => e.category === "Amavasya");
  if (hasAmavasya) return "text-gray-100 font-bold";
  if (dow === 0) return isDarkMode ? "text-red-400 font-bold" : "text-red-600 font-bold";
  if (dow === 6) return isDarkMode ? "text-blue-400 font-bold" : "text-blue-600 font-bold";
  return isDarkMode ? "text-slate-200 font-semibold" : "text-gray-800 font-semibold";
};

const Tooltip = ({ data, day, month, year, isDarkMode, language }) => {
  const isTel = language === 'tel';
  const months = isTel ? MONTHS_TEL : MONTHS;
  const dayNamesEng = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayNamesTel = ["ఆదివారం","సోమవారం","మంగళవారం","బుధవారం","గురువారం","శుక్రవారం","శనివారం"];
  const dayNames = isTel ? dayNamesTel : dayNamesEng;
  const date = new Date(year, month - 1, day);
  const tithi = isTel ? (data?.tithi || DEFAULT_TITHIS_TEL[(day-1)%30]) : (data?.tithi || DEFAULT_TITHIS[(day-1)%30]);
  const nakshatra = isTel ? (NAKSHATRA_TEL[data?.nakshatra] || data?.nakshatra || "—") : (data?.nakshatra || "—");
  const yoga = isTel ? (YOGA_TEL[data?.yoga] || data?.yoga || "—") : (data?.yoga || "—");
  const paksha = isTel ? (PAKSHA_TEL[data?.paksha] || data?.paksha || "—") : ((data?.paksha || "Shukla") + " Paksha");
  const L = isTel
    ? { tm:"తెలుగు మాసం", tithi:"తిథి", naks:"నక్షత్రం", yoga:"యోగం", paksha:"పక్షం", rise:"🌅 సూర్యోదయం", set:"🌇 సూర్యాస్తమయం" }
    : { tm:"Telugu Month", tithi:"Tithi", naks:"Nakshatra", yoga:"Yoga", paksha:"Paksha", rise:"🌅 Sunrise", set:"🌇 Sunset" };

  return (
    <div className={`absolute z-50 w-64 rounded-2xl shadow-2xl p-4 text-sm pointer-events-none bottom-full left-1/2 -translate-x-1/2 mb-2 ${isDarkMode ? "bg-slate-900 border border-slate-700 text-slate-200" : "bg-white border border-gray-200 text-gray-700"}`} style={{ filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.18))" }}>
      <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent ${isDarkMode ? "border-t-slate-700" : "border-t-gray-200"}`} />
      <div className="font-bold text-base mb-2">{dayNames[date.getDay()]}, {day} {months[month-1]} {year}</div>
      <div className="space-y-1">
        <div className="flex justify-between"><span className="opacity-60">{L.tm}</span><span className="font-medium">{data?.teluguMonth || TELUGU_MONTHS[month-1]}</span></div>
        <div className="flex justify-between"><span className="opacity-60">{L.tithi}</span><span className="font-medium">{tithi}</span></div>
        {data?.nakshatra && <div className="flex justify-between"><span className="opacity-60">{L.naks}</span><span className="font-medium">{nakshatra}</span></div>}
        {data?.yoga && <div className="flex justify-between"><span className="opacity-60">{L.yoga}</span><span className="font-medium">{yoga}</span></div>}
        {data?.paksha && <div className="flex justify-between"><span className="opacity-60">{L.paksha}</span><span className="font-medium">{paksha}</span></div>}
        <div className="border-t pt-1 mt-1 flex justify-between" style={{borderColor:isDarkMode?"#334155":"#e5e7eb"}}><span className="opacity-60">{L.rise}</span><span className="font-medium">{data?.sunrise||"6:00 AM"}</span></div>
        <div className="flex justify-between"><span className="opacity-60">{L.set}</span><span className="font-medium">{data?.sunset||"6:30 PM"}</span></div>
        {data?.events?.length > 0 && (
          <div className="border-t pt-2 mt-1" style={{borderColor:isDarkMode?"#334155":"#e5e7eb"}}>
            {data.events.map((e,i) => (
              <div key={i} className="text-xs font-semibold">{e.icon} {isTel ? (EVENT_TITLES_TEL[e.title] || e.title) : e.title}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DayCell = ({ day, month, year, data, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const { theme, todayDate, selectedDate, language } = useStore();
  const isDarkMode = theme === 'dark';
  const isTel = language === 'tel';
  const dateStr = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  const isToday = dateStr === todayDate;
  const isSelected = selectedDate === dateStr;
  const events = data?.events || [];
  const tithi = isTel ? (data?.tithi || DEFAULT_TITHIS_TEL[(day-1)%30]) : (data?.tithi || DEFAULT_TITHIS[(day-1)%30]);
  const date = new Date(year, month-1, day);
  const dow = date.getDay();
  const hasAmavasya = events.some(e => e.category === "Amavasya");
  const todayLabel = isTel ? "నేడు" : "Today";
  const sunLabel   = isTel ? "ఆది"  : "Sun";
  const satLabel   = isTel ? "శని"  : "Sat";

  return (
    <div
      className={`relative rounded-2xl p-2 cursor-pointer transition-all duration-200 hover:scale-[1.04] hover:shadow-xl hover:z-10 select-none ${getCellBg(dow, isToday, isSelected, isDarkMode, events)}`}
      style={{ minHeight:"100px" }}
      onClick={() => onClick(dateStr)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isToday && (
        <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
        </span>
      )}
      {events.some(e => e.category === "Pournami") && !isToday && (
        <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
          <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400" />
        </span>
      )}
      <div className="flex items-start justify-between mb-1">
        <span className={`text-base leading-tight ${getDateNumStyle(dow, isDarkMode, events)} ${isToday ? "!text-orange-600" : ""}`}>{day}</span>
        <div className="flex gap-0.5 flex-wrap justify-end">
          {isToday && <span className="text-[8px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-tight">{todayLabel}</span>}
          {dow === 0 && !isToday && <span className="text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-tight">{sunLabel}</span>}
          {dow === 6 && !isToday && <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-tight">{satLabel}</span>}
        </div>
      </div>
      <div className={`text-[9px] leading-tight mb-1 truncate ${hasAmavasya ? "text-gray-300" : isDarkMode ? "text-slate-400" : "text-gray-400"}`}>{tithi}</div>
      <div className="flex flex-col gap-0.5">
        {events.slice(0,2).map((event,i) => (
          <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded-lg font-medium truncate leading-tight ${getCategoryStyle(event.category)}`}>
            {event.icon} {isTel ? (EVENT_TITLES_TEL[event.title] || event.title) : event.title}
          </span>
        ))}
        {events.length > 2 && (
          <span className={`text-[9px] px-1.5 py-0.5 rounded-lg font-medium leading-tight ${isDarkMode ? "bg-slate-700 text-slate-300" : "bg-gray-100 text-gray-500"}`}>
            +{events.length - 2} {isTel ? 'మరిన్ని' : 'more'}
          </span>
        )}
      </div>
      {hovered && <Tooltip data={data} day={day} month={month} year={year} isDarkMode={isDarkMode} language={language} />}
    </div>
  );
};

export default DayCell;
