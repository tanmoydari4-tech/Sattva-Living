import React, { useState, useEffect } from 'react';
import { Check, Flame, Sparkles, Heart, Sun, Moon, Droplets, BookOpen, Footprints, Smile } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from './Toast';
import { store } from '../services/store';
import { HabitLog } from '../types';

interface HabitTrackerProps {
  userId: string;
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({ userId }) => {
  const { t, isBengali } = useLanguage();
  const { showToast } = useToast();

  const todayStr = new Date().toISOString().split('T')[0];

  const [habits, setHabits] = useState({
    walk: false,
    healthyMeals: false,
    mindfulness: false,
    sleepRoutine: false,
    waterHydration: false,
    gratitudeJournal: false,
  });

  const [energyLevel, setEnergyLevel] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [dailyNote, setDailyNote] = useState('');
  const [streakCount, setStreakCount] = useState(0);
  const [weeklyHistory, setWeeklyHistory] = useState<{ date: string; dayName: string; completedCount: number }[]>([]);

  // Load habit log for today and calculate streaks
  useEffect(() => {
    const logs = store.getHabitLogs(userId);
    const todayLog = logs.find(l => l.date === todayStr);

    if (todayLog) {
      setHabits(todayLog.habits);
      setEnergyLevel(todayLog.energyLevel);
      setDailyNote(todayLog.dailyNote || '');
    }

    // Calculate streak
    let streak = 0;
    const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));
    
    // Check consecutive days
    const checkDate = new Date();
    // If today is logged with at least 1 habit, start checking today; else check yesterday
    if (todayLog && Object.values(todayLog.habits).some(v => v)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const dateKey = checkDate.toISOString().split('T')[0];
      const found = sortedLogs.find(l => l.date === dateKey);
      if (found && Object.values(found.habits).some(v => v)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    setStreakCount(streak);

    // Calculate last 7 days history for weekly chart
    const daysArr: { date: string; dayName: string; completedCount: number }[] = [];
    const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayNamesBn = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      const log = logs.find(l => l.date === dateKey);
      const completed = log ? Object.values(log.habits).filter(Boolean).length : 0;
      const dayName = isBengali ? dayNamesBn[d.getDay()] : dayNamesEn[d.getDay()];

      daysArr.push({
        date: dateKey,
        dayName,
        completedCount: completed,
      });
    }
    setWeeklyHistory(daysArr);
  }, [userId, todayStr, isBengali]);

  const toggleHabit = (key: keyof typeof habits) => {
    setHabits(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    const log: Omit<HabitLog, 'id'> = {
      userId,
      date: todayStr,
      habits,
      energyLevel,
      dailyNote,
    };
    store.logHabit(log);
    showToast(t.dashboard.habitSaved, 'success');
  };

  const habitItemsConfig = [
    {
      key: 'walk' as const,
      label: t.dashboard.habitItems.walk,
      icon: <Footprints className="w-5 h-5 text-emerald-700" />,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    },
    {
      key: 'healthyMeals' as const,
      label: t.dashboard.habitItems.healthyMeals,
      icon: <Heart className="w-5 h-5 text-amber-700" />,
      color: 'bg-amber-50 border-amber-200 text-amber-950',
    },
    {
      key: 'mindfulness' as const,
      label: t.dashboard.habitItems.mindfulness,
      icon: <Sun className="w-5 h-5 text-teal-700" />,
      color: 'bg-teal-50 border-teal-200 text-teal-950',
    },
    {
      key: 'sleepRoutine' as const,
      label: t.dashboard.habitItems.sleepRoutine,
      icon: <Moon className="w-5 h-5 text-indigo-700" />,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-950',
    },
    {
      key: 'waterHydration' as const,
      label: t.dashboard.habitItems.waterHydration,
      icon: <Droplets className="w-5 h-5 text-sky-700" />,
      color: 'bg-sky-50 border-sky-200 text-sky-950',
    },
    {
      key: 'gratitudeJournal' as const,
      label: t.dashboard.habitItems.gratitudeJournal,
      icon: <BookOpen className="w-5 h-5 text-rose-700" />,
      color: 'bg-rose-50 border-rose-200 text-rose-950',
    },
  ];

  const completedToday = Object.values(habits).filter(Boolean).length;
  const progressPct = Math.round((completedToday / 6) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner: Streak and Daily Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Streak card */}
        <div className="bg-white p-5 rounded-2xl border border-[#A8BDA5]/40 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shadow-2xs">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-serif font-bold text-[#153D32]">{streakCount}</span>
              <span className="text-xs text-[#252A27]/60">{isBengali ? 'দিন' : 'Days'}</span>
            </div>
            <p className="text-xs font-medium text-[#252A27]/70">{t.dashboard.streak}</p>
          </div>
        </div>

        {/* Today's completion rate */}
        <div className="bg-white p-5 rounded-2xl border border-[#A8BDA5]/40 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shadow-2xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-bold text-[#153D32]">{completedToday} / 6</span>
              <span className="text-xs font-semibold text-emerald-700">{progressPct}%</span>
            </div>
            <div className="w-full bg-[#E4ECE2] h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#153D32] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Encouragement message */}
        <div className="bg-[#153D32] text-white p-5 rounded-2xl flex flex-col justify-center">
          <span className="text-xs uppercase tracking-wider text-[#DFCA9B] font-semibold">
            {isBengali ? 'আজকের প্রেরণা' : 'Daily Affirmation'}
          </span>
          <p className="text-xs sm:text-sm italic text-[#F8F6F0]/90 mt-1">
            {isBengali
              ? '“ধারাবাহিকতাই শক্তি। প্রতিটি পদক্ষেপ আপনার শান্তির বিনিয়োগ।”'
              : '“Small mindful choices create profound inner vitality over time.”'}
          </p>
        </div>
      </div>

      {/* Habits Checklist Grid */}
      <div className="bg-white p-6 rounded-2xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#153D32]">{t.dashboard.habitsTitle}</h3>
          <p className="text-xs text-[#252A27]/70 mt-0.5">{t.dashboard.habitsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {habitItemsConfig.map((item) => {
            const isChecked = habits[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleHabit(item.key)}
                className={`flex items-center gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? `${item.color} shadow-xs font-medium`
                    : 'bg-[#F8F6F0]/60 border-[#A8BDA5]/30 text-[#252A27]/80 hover:bg-white'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                    isChecked
                      ? 'bg-[#153D32] text-white border-[#153D32]'
                      : 'border-[#A8BDA5]/60 bg-white text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="shrink-0">{item.icon}</div>
                <span className="text-xs sm:text-sm flex-1 leading-snug">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Energy Check & Notes */}
        <div className="pt-4 border-t border-[#A8BDA5]/20 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1.5 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-[#C6A66A]" />
              <span>{t.dashboard.energyQuestion}</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setEnergyLevel(lvl as 1 | 2 | 3 | 4 | 5)}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium border transition-all ${
                    energyLevel === lvl
                      ? 'bg-[#153D32] text-white border-[#153D32] shadow-xs'
                      : 'bg-[#F8F6F0] text-[#252A27]/70 border-[#A8BDA5]/30 hover:bg-white'
                  }`}
                >
                  {lvl}★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1.5">
              {isBengali ? 'আজকের সংক্ষিপ্ত চিন্তা বা অনুভূতি' : 'Gentle Daily Reflection Note'}
            </label>
            <input
              type="text"
              value={dailyNote}
              onChange={(e) => setDailyNote(e.target.value)}
              placeholder={isBengali ? 'যেমন: সকালের হাঁটা মনকে খুব শান্ত করেছে...' : 'e.g., Felt relaxed during afternoon stretch...'}
              className="w-full text-xs px-3 py-2 rounded-lg border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#153D32] text-white hover:bg-[#0E2922] transition-transform active:scale-95 shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>{t.dashboard.saveHabit}</span>
          </button>
        </div>
      </div>

      {/* Weekly History Chart / Bars */}
      <div className="bg-white p-6 rounded-2xl border border-[#A8BDA5]/40 shadow-xs">
        <h4 className="font-serif text-sm font-bold text-[#153D32] mb-4">{t.dashboard.weeklySummary}</h4>
        <div className="grid grid-cols-7 gap-2">
          {weeklyHistory.map((day) => {
            const heightPct = Math.round((day.completedCount / 6) * 100);
            return (
              <div key={day.date} className="flex flex-col items-center gap-2">
                <div className="w-full h-24 bg-[#F8F6F0] rounded-xl flex items-end p-1 overflow-hidden border border-[#A8BDA5]/20">
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${
                      day.completedCount >= 4 ? 'bg-[#153D32]' : 'bg-[#A8BDA5]'
                    }`}
                    style={{ height: `${Math.max(heightPct, 8)}%` }}
                    title={`${day.date}: ${day.completedCount}/6 completed`}
                  />
                </div>
                <span className="text-[11px] font-medium text-[#252A27]/70">{day.dayName}</span>
                <span className="text-[10px] text-[#252A27]/50">{day.completedCount}/6</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
