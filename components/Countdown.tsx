import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Edit2 } from 'lucide-react';

export const Countdown: React.FC = () => {
  const [examDate, setExamDate] = useState<string>(() => {
    return localStorage.getItem('examDate') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  });
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('examDate', examDate);
  }, [examDate]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(examDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [examDate]);

  return (
    <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5">
      <div className="flex justify-between items-start mb-4">
         <div>
            <h4 className="font-semibold text-white flex items-center gap-2">
                <Calendar size={18} className="text-[#a371f7]" />
                Exam Countdown
            </h4>
            <p className="text-xs text-[#8b949e] mt-1">Keep track of your deadline</p>
         </div>
         {isEditing ? (
            <input 
              type="date" 
              value={examDate} 
              onChange={(e) => setExamDate(e.target.value)}
              onBlur={() => setIsEditing(false)}
              className="bg-[#0d1117] border border-[#30363d] text-white text-xs rounded px-2 py-1 outline-none focus:border-[#a371f7]"
              autoFocus
            />
         ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1.5 hover:bg-[#30363d] rounded text-[#8b949e] hover:text-white transition-colors"
            >
               <Edit2 size={14} />
            </button>
         )}
      </div>
      
      {timeLeft ? (
        <div className="grid grid-cols-4 gap-2 text-center">
           {[
             { val: timeLeft.days, label: 'Days' },
             { val: timeLeft.hours, label: 'Hrs' },
             { val: timeLeft.minutes, label: 'Mins' },
             { val: timeLeft.seconds, label: 'Secs' }
           ].map((item, i) => (
             <div key={i} className="bg-[#0d1117] rounded-lg p-2 border border-[#30363d]">
               <div className="text-xl font-bold text-white font-mono">{String(item.val).padStart(2, '0')}</div>
               <div className="text-[10px] text-[#8b949e] uppercase tracking-wider font-medium">{item.label}</div>
             </div>
           ))}
        </div>
      ) : (
         <div className="text-center py-4 bg-[#0d1117] rounded-lg border border-[#30363d] border-dashed">
           <span className="text-sm text-[#ff7b72] font-semibold">Exam Started / Ended</span>
         </div>
      )}
      
      {!isEditing && timeLeft && (
          <div className="mt-3 text-center">
              <span className="text-xs text-[#8b949e] bg-[#0d1117] px-2 py-1 rounded-full border border-[#30363d]">
                 Target: {new Date(examDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
          </div>
      )}
    </div>
  );
};