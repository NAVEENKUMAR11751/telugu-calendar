import React from 'react';
import { useStore } from '../../store/useStore';
import { MONTHS, MONTHS_TEL, TELUGU_MONTHS, DEFAULT_TITHIS, DEFAULT_TITHIS_TEL, LABELS } from '../../utils/constants';
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
  };
  return styles[category] || "bg-gray-100 text-gray-600 border border-gray-200";
};

const DetailPanel = ({ dateStr, day, month, year, panchangData, onClose }) => {
  const { theme, language } = useStore();
  const isDarkMode = theme === 'dark';
  const isTel = language === 'tel';
  const L = LABELS[language] || LABELS.eng;
  const months = isTel ? MONTHS_TEL : MONTHS;

  const events = panchangData?.events || [];
  const tithi = isTel
    ? (panchangData?.tithi || DEFAULT_TITHIS_TEL[(day-1)%30])
    : (panchangData?.tithi || DEFAULT_TITHIS[(day-1)%30]);

  const nakshatra = isTel
    ? (NAKSHATRA_TEL[panchangData?.nakshatra] || panchangData?.nakshatra || "—")
    : (panchangData?.nakshatra || "—");
  const yoga = isTel
    ? (YOGA_TEL[panchangData?.yoga] || panchangData?.yoga || "—")
    : (panchangData?.yoga || "—");
  const paksha = isTel
    ? (PAKSHA_TEL[panchangData?.paksha] || panchangData?.paksha || "—")
    : ((panchangData?.paksha || "Shukla") + " Paksha");

  const date = new Date(year, month-1, day);
  const dayNamesEng = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayNamesTel = ["ఆదివారం","సోమవారం","మంగళవారం","బుధవారం","గురువారం","శుక్రవారం","శనివారం"];
  const dayNames = isTel ? dayNamesTel : dayNamesEng;

  return (
    <div className={`rounded-3xl p-5 mt-4 shadow-xl ${isDarkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-100"}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {dayNames[date.getDay()]}, {day} {months[month-1]} {year}
          </h3>
          <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
            {panchangData?.teluguMonth || TELUGU_MONTHS[month-1]} మాసం • {paksha}
          </p>
        </div>
        <button onClick={onClose} className={`text-xl rounded-full w-8 h-8 flex items-center justify-center ${isDarkMode ? "hover:bg-slate-700 text-slate-400" : "hover:bg-gray-100 text-gray-400"}`}>×</button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: L.tithi,     value: tithi,                               icon: "📅" },
          { label: L.nakshatra, value: nakshatra,                           icon: "⭐" },
          { label: L.yoga,      value: yoga,                                icon: "🕉️" },
          { label: L.paksha,    value: paksha,                              icon: "🌙" },
          { label: L.sunrise,   value: panchangData?.sunrise || "6:00 AM",  icon: "🌅" },
          { label: L.sunset,    value: panchangData?.sunset  || "6:30 PM",  icon: "🌇" },
        ].map(({ label, value, icon }) => (
          <div key={label} className={`rounded-xl p-3 ${isDarkMode ? "bg-slate-700/60" : "bg-gray-50"}`}>
            <div className={`text-xs mb-0.5 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>{icon} {label}</div>
            <div className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{value}</div>
          </div>
        ))}
      </div>

      {events.length > 0 ? (
        <div>
          <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>{L.eventsLabel}</p>
          <div className="flex flex-col gap-2">
            {events.map((e, i) => (
              <div key={i} className={`flex items-center gap-2 rounded-xl px-3 py-2 ${getCategoryStyle(e.category)}`}>
                <span className="text-base">{e.icon}</span>
                <div>
                  <div className="text-xs font-bold">
                    {isTel ? (EVENT_TITLES_TEL[e.title] || e.title) : e.title}
                  </div>
                  <div className="text-[10px] opacity-70">{e.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className={`text-sm text-center py-4 ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>{L.noEvents}</p>
      )}
    </div>
  );
};

export default DetailPanel;
