import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export const Pomodoro: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus'); 

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const currentTime = minutes * 60 + seconds;
  const progress = ((totalTime - currentTime) / totalTime) * 100;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play().catch(e => console.log("Audio play failed", e));
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, minutes]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'focus') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  // Circular progress calculation
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-5">
      <div className="flex justify-between items-center mb-6">
         <h4 className="font-semibold text-white flex items-center gap-2">
           <Timer size={18} className="text-[#2f81f7]" />
           Focus Timer
         </h4>
         <div className="flex bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
             <button 
               onClick={() => switchMode('focus')}
               className={`text-[10px] font-bold px-3 py-1 rounded-md transition-all ${mode === 'focus' ? 'bg-[#2f81f7] text-white shadow-sm' : 'text-[#8b949e] hover:text-[#e6edf3]'}`}
             >
               FOCUS
             </button>
             <button 
               onClick={() => switchMode('break')}
               className={`text-[10px] font-bold px-3 py-1 rounded-md transition-all ${mode === 'break' ? 'bg-[#238636] text-white shadow-sm' : 'text-[#8b949e] hover:text-[#e6edf3]'}`}
             >
               BREAK
             </button>
         </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <svg className="transform -rotate-90 w-40 h-40 drop-shadow-2xl">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#0d1117"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={mode === 'focus' ? '#2f81f7' : '#238636'}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <span className="text-4xl font-mono font-bold text-white tracking-widest">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase text-[#8b949e] mt-1 font-semibold tracking-widest">
                {isActive ? 'Running' : 'Paused'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            onClick={toggleTimer}
            className={`py-2 rounded-lg text-sm font-semibold border border-[rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-2 text-white shadow-lg ${mode === 'focus' ? 'bg-[#2f81f7] hover:bg-[#3d8bfd]' : 'bg-[#238636] hover:bg-[#2ea043]'}`}
          >
            {isActive ? <Pause size={16} /> : <Play size={16} />}
            {isActive ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={resetTimer}
            className="bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] py-2 rounded-lg text-sm font-semibold border border-[#30363d] transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};