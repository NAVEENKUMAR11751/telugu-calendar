import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { X, Moon, Sun, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import ParticleEffect from '../../animations/ParticleEffect';

const PanchangamModal = ({ dayData, onClose }) => {
  const { language } = useStore();
  const d = dayData.details?.panchangam;
  const fest = dayData.details?.festival;

  // Labels based on lang
  const t = {
    tithi: language === 'eng' ? 'Tithi' : 'తిథి',
    nakshatram: language === 'eng' ? 'Nakshatram' : 'నక్షత్రం',
    rahuKalam: language === 'eng' ? 'Rahu Kalam' : 'రాహు కాలం',
    goodTime: language === 'eng' ? 'Good Time' : 'మంచి సమయం',
    close: language === 'eng' ? 'Close' : 'మూసివేయి',
    noData: language === 'eng' ? 'No detailed panchangam data available for this date.' : 'ఈ తేదీకి పూర్తి పంచాంగం అందుబాటులో లేదు.'
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        {fest && fest.effect && <ParticleEffect effectType={fest.effect} />}
        
        <div className="relative z-10 p-6 sm:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <X size={20} />
          </button>

          <header className="mb-6 text-center sm:text-left">
             <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-maroon)] bg-clip-text text-transparent">
               {dayData.fullDate}
             </h2>
             {dayData.details?.teluguDate && (
                 <p className="text-lg font-medium mt-1 text-[var(--color-deepblue)] dark:text-blue-300">
                    {dayData.details.teluguDate}
                 </p>
             )}
             {fest && (
                 <div className="mt-4 inline-block bg-[var(--color-gold)] text-amber-900 px-4 py-1.5 rounded-full font-bold shadow-sm">
                    {language === 'eng' ? fest.name : fest.teluguName}
                 </div>
             )}
          </header>

          {!d ? (
             <div className="py-12 text-center text-secondary opacity-70">
                <p>{t.noData}</p>
             </div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 gap-y-8">
                {/* Core Items */}
                <div className="space-y-4">
                   <div className="flex bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 items-start gap-4">
                      <div className="mt-1"><Moon className="text-[var(--color-deepblue)] dark:text-blue-300" /></div>
                      <div>
                         <h4 className="text-sm font-bold text-secondary uppercase">{t.tithi}</h4>
                         <p className="font-medium text-lg leading-snug">{d.tithi}</p>
                      </div>
                   </div>
                   <div className="flex bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 items-start gap-4">
                      <div className="mt-1"><Sparkles className="text-[var(--color-saffron)]" /></div>
                      <div>
                         <h4 className="text-sm font-bold text-secondary uppercase">{t.nakshatram}</h4>
                         <p className="font-medium text-lg leading-snug">{d.nakshatram}</p>
                      </div>
                   </div>
                </div>

                {/* Timings Items */}
                <div className="space-y-3">
                   <h3 className="font-bold border-b border-slate-200 dark:border-slate-700 pb-2 mb-3">Timings / ముహూర్తము</h3>
                   
                   <div className="flex justify-between items-center bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                      <div className="flex items-center gap-2 font-medium">
                         <AlertTriangle size={16} />
                         {t.rahuKalam}
                      </div>
                      <div className="font-bold text-sm tracking-wide">{d.rahuKalam}</div>
                   </div>

                   <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                      <div className="flex items-center gap-2 font-medium">
                         <CheckCircle size={16} />
                         {t.goodTime}
                      </div>
                      <div className="font-bold text-sm tracking-wide">{d.goodTime || '--'}</div>
                   </div>

                   <div className="flex justify-between items-center p-2 text-sm">
                      <span className="text-secondary flex items-center gap-1.5"><Sun size={14}/> Sunrise</span>
                      <span className="font-medium">{d.sunrise}</span>
                   </div>
                   <div className="flex justify-between items-center p-2 text-sm">
                      <span className="text-secondary flex items-center gap-1.5"><Moon size={14}/> Sunset</span>
                      <span className="font-medium">{d.sunset}</span>
                   </div>
                </div>
             </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};

// Simple Sparkles fallback if lucide is busy
const Sparkles = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
)

export default PanchangamModal;
