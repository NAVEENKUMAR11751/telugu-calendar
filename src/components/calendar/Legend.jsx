import React from 'react';
import { useStore } from '../../store/useStore';
import { LABELS } from '../../utils/constants';

const Legend = () => {
  const { theme, language } = useStore();
  const isDarkMode = theme === 'dark';
  const L = LABELS[language] || LABELS.eng;

  const items = [
    { color: "bg-orange-400",                      label: L.legend.festival },
    { color: "bg-blue-400",                        label: L.legend.ekadashi },
    { color: "bg-yellow-400",                      label: L.legend.pournami },
    { color: "bg-gray-800",                        label: L.legend.amavasya },
    { color: "bg-green-400",                       label: L.legend.holiday },
    { color: "bg-red-400",                         label: L.legend.sunday },
    { color: "bg-blue-300",                        label: L.legend.saturday },
    { color: "bg-orange-500 ring-2 ring-orange-300", label: L.legend.today },
  ];

  return (
    <div className={`rounded-2xl px-4 py-3 mt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center
      ${isDarkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-100"}`}>
      {items.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className={`w-3 h-3 rounded-full ${color}`} />
          <span className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
