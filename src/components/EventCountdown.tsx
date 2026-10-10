import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface EventCountdownProps {
  targetDate: string;
}

export const EventCountdown: React.FC<EventCountdownProps> = ({ targetDate }) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#A8BDA5]/20 text-[#153D32]">
        <Clock className="w-3.5 h-3.5" />
        <span>{t.events.filterPast}</span>
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-[#153D32]/5 border border-[#A8BDA5]/40 rounded-xl px-3 py-1.5">
      <Clock className="w-4 h-4 text-[#C6A66A] shrink-0" />
      <span className="text-xs text-[#252A27]/70 font-medium hidden sm:inline">
        {t.events.countdownLabel}
      </span>
      <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#153D32]">
        <span className="bg-white px-1.5 py-0.5 rounded-sm shadow-2xs border border-[#A8BDA5]/30">
          {timeLeft.days}{t.events.days}
        </span>
        <span>:</span>
        <span className="bg-white px-1.5 py-0.5 rounded-sm shadow-2xs border border-[#A8BDA5]/30">
          {String(timeLeft.hours).padStart(2, '0')}{t.events.hours}
        </span>
        <span>:</span>
        <span className="bg-white px-1.5 py-0.5 rounded-sm shadow-2xs border border-[#A8BDA5]/30">
          {String(timeLeft.minutes).padStart(2, '0')}{t.events.minutes}
        </span>
        <span>:</span>
        <span className="bg-white px-1.5 py-0.5 rounded-sm shadow-2xs border border-[#A8BDA5]/30 text-[#C6A66A]">
          {String(timeLeft.seconds).padStart(2, '0')}{t.events.seconds}
        </span>
      </div>
    </div>
  );
};
