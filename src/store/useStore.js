import { create } from 'zustand';

export const useStore = create((set) => ({
  language: 'eng', // 'eng' or 'tel'
  theme: 'light', // 'light' or 'dark'
  
  // Date context
  currentMonth: new Date().getMonth() + 1, // 1-12
  currentYear: new Date().getFullYear(),
  
  // Keep track of today for highlighting and jumping
  todayDate: (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })(),
  
  selectedDate: null, 
  
  // Actions
  setLanguage: (lang) => set({ language: lang }),
  setTheme: (theme) => set({ theme }),
  
  setMonth: (month) => set({ currentMonth: month }),
  setYear: (year) => set({ currentYear: year }),
  setSelectedDate: (dateStr) => set({ selectedDate: dateStr }),
}));
