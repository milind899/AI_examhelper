import React, { useState, useEffect } from 'react';
import { COURSE_CONTENT } from './constants';
import { Countdown } from './components/Countdown';
import { Pomodoro } from './components/Pomodoro';
import { UnitSection } from './components/UnitSection';
import { AIChat } from './components/AIChat';
import { BookOpen, Sparkles, LayoutDashboard, ListTodo, BarChart3, Search, Bell, Menu, GraduationCap, Calendar } from 'lucide-react';

const App: React.FC = () => {
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedTopics');
    return saved ? JSON.parse(saved) : [];
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  const toggleTopic = (id: string) => {
    setCompletedTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleAskAI = (query: string) => {
    setChatQuery(query);
    setIsChatOpen(true);
  };

  const totalTopics = COURSE_CONTENT.units.reduce((acc, unit) => acc + unit.topics.length, 0);
  const totalCompleted = completedTopics.length;
  const overallProgress = Math.round((totalCompleted / totalTopics) * 100);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans relative overflow-x-hidden selection:bg-[#2f81f7]/30">
      
      {/* Background Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-glow-gradient opacity-20 pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0d1117]/80 backdrop-blur-md border-b border-[#30363d] py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-[#a371f7] to-[#2f81f7] rounded-lg p-1.5 shadow-lg shadow-[#a371f7]/20">
                        <GraduationCap size={20} className="text-white" />
                    </div>
                    <div>
                      <h1 className="font-bold text-lg tracking-tight leading-none text-white">ExamHelper</h1>
                      <span className="text-[10px] text-[#8b949e] font-mono tracking-wide">SRM / {COURSE_CONTENT.courseCode}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                 <div className="hidden md:flex items-center relative group">
                    <Search size={14} className="absolute left-3 text-[#8b949e] group-focus-within:text-[#a371f7] transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search topics..." 
                        className="bg-[#161b22] border border-[#30363d] rounded-full py-1.5 pl-9 pr-4 text-sm text-[#e6edf3] focus:border-[#a371f7] focus:ring-1 focus:ring-[#a371f7] w-64 transition-all placeholder:text-[#8b949e] outline-none"
                    />
                 </div>

                 <div className="flex items-center gap-4 text-[#e6edf3]">
                    <Bell size={18} className="text-[#8b949e] hover:text-[#e6edf3] cursor-pointer transition-colors" />
                    <div className="w-8 h-8 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-xs font-bold text-white hover:border-[#8b949e] transition-colors cursor-pointer">
                        JD
                    </div>
                 </div>
            </div>
        </div>
      </header>

      {/* Main Navigation */}
      <div className="bg-[#0d1117] border-b border-[#30363d] sticky top-[61px] z-30 pt-2">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <nav className="flex gap-8">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-2 pb-3 border-b-2 font-medium text-sm transition-all ${activeTab === 'overview' ? 'border-[#a371f7] text-[#e6edf3]' : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'}`}
                >
                    <LayoutDashboard size={16} />
                    <span>Overview</span>
                </button>
                <button 
                  onClick={() => setActiveTab('syllabus')}
                  className={`flex items-center gap-2 pb-3 border-b-2 font-medium text-sm transition-all ${activeTab === 'syllabus' ? 'border-[#a371f7] text-[#e6edf3]' : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'}`}
                >
                    <ListTodo size={16} />
                    <span>Detailed Syllabus</span>
                </button>
                <button 
                  onClick={() => setActiveTab('stats')}
                  className={`flex items-center gap-2 pb-3 border-b-2 font-medium text-sm transition-all ${activeTab === 'stats' ? 'border-[#a371f7] text-[#e6edf3]' : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'}`}
                >
                    <BarChart3 size={16} />
                    <span>Analytics</span>
                </button>
            </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Hero Card */}
            <div className="relative p-8 rounded-2xl border border-[#30363d] bg-gradient-to-br from-[#161b22] to-[#0d1117] overflow-hidden group shadow-xl shadow-black/20">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                   <div className="w-64 h-64 bg-[#a371f7] blur-[100px] rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a371f7]/10 border border-[#a371f7]/20 text-[#a371f7] text-xs font-medium mb-4">
                        <Sparkles size={12} />
                        <span>AI-Powered Study Companion</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        {COURSE_CONTENT.courseName}
                    </h1>
                    <p className="text-[#8b949e] max-w-lg mb-6 leading-relaxed">
                        Track your progress, practice repeated questions, and master the syllabus with intelligent insights.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                         <button 
                           onClick={() => handleAskAI("Generate a 3-day revision strategy for Computer Networks.")}
                           className="bg-[#e6edf3] hover:bg-white text-[#0d1117] px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-white/5 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                         >
                            <Sparkles size={16} className="text-[#a371f7]" />
                            Create Study Plan
                         </button>
                         <button 
                            onClick={() => setActiveTab('syllabus')}
                            className="bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] px-5 py-2.5 rounded-lg text-sm font-medium border border-[#30363d] transition-all flex items-center gap-2"
                         >
                            <BookOpen size={16} />
                            Go to Modules
                         </button>
                    </div>
                </div>
            </div>

            {/* Units List */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="font-bold text-xl text-white">Course Modules</h2>
                  <div className="text-sm text-[#8b949e]">
                    {completedTopics.length} / {totalTopics} topics completed
                  </div>
               </div>

              <div className="grid gap-5">
                {COURSE_CONTENT.units.map(unit => (
                    <UnitSection 
                    key={unit.id} 
                    unit={unit} 
                    completedTopics={completedTopics} 
                    toggleTopic={toggleTopic}
                    onAskAI={handleAskAI}
                    />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Progress Card */}
            <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d]">
               <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                 <BarChart3 size={18} className="text-[#a371f7]" />
                 Overall Progress
               </h3>
               
               <div className="relative pt-2">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-[#a371f7]">
                        Course Completion
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-white">
                        {overallProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-[#0d1117] border border-[#30363d]">
                    <div style={{ width: `${overallProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#a371f7] to-[#2f81f7]"></div>
                  </div>
               </div>
               
               <div className="mt-4 grid grid-cols-2 gap-3">
                   <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
                      <div className="text-2xl font-bold text-white">{totalCompleted}</div>
                      <div className="text-xs text-[#8b949e] mt-1">Topics Done</div>
                   </div>
                   <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
                      <div className="text-2xl font-bold text-white">{COURSE_CONTENT.units.length}</div>
                      <div className="text-xs text-[#8b949e] mt-1">Total Units</div>
                   </div>
               </div>
            </div>

            <Countdown />
            <Pomodoro />
            
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2f81f7] rounded-full filter blur-[60px] opacity-10"></div>
                <h3 className="font-semibold text-white mb-2 relative z-10">Need Help?</h3>
                <p className="text-sm text-[#8b949e] mb-4 relative z-10">
                    Your AI tutor is ready to explain concepts and solve doubts.
                </p>
                <button 
                    onClick={() => setIsChatOpen(true)}
                    className="w-full py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-sm font-medium text-white transition-colors relative z-10"
                >
                    Chat with Tutor
                </button>
            </div>

          </div>
        </div>
      </main>

      <AIChat 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen} 
        initialQuery={chatQuery}
        clearInitialQuery={() => setChatQuery(undefined)}
      />
    </div>
  );
};

export default App;