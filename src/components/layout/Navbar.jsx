import React from 'react';
import { useStore } from '../../store/useStore';
import { Sun, Moon, CalendarDays, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, setTheme, language, setLanguage } = useStore();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(language === 'eng' ? 'tel' : 'eng');

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-saffron/20 text-[var(--color-saffron)]">
          <CalendarDays size={28} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            {language === 'eng' ? 'Panchangam Calendar' : 'పంచాంగం క్యాలెండర్'}
          </h1>
          <p className="text-xs text-secondary font-medium">
            {language === 'eng' ? 'Daily Tithi & Timing Guide' : 'తిథి మరియు సమయ మార్గదర్శి'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all font-medium text-sm"
          title="Toggle Language"
        >
          <Languages size={18} />
          {language === 'eng' ? 'తెలుగు' : 'English'}
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-[var(--color-gold)]" />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
