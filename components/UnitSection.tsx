import React, { useState } from 'react';
import { Unit } from '../types';
import { Check, Book, ChevronRight, Sparkles, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface UnitSectionProps {
  unit: Unit;
  completedTopics: string[];
  toggleTopic: (id: string) => void;
  onAskAI: (text: string) => void;
}

export const UnitSection: React.FC<UnitSectionProps> = ({ unit, completedTopics, toggleTopic, onAskAI }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const completedCount = unit.topics.filter(t => completedTopics.includes(t.id)).length;
  const progress = Math.round((completedCount / unit.topics.length) * 100);
  const isComplete = progress === 100;

  return (
    <div className="border border-[#30363d] rounded-xl bg-[#161b22] overflow-hidden transition-all hover:border-[#8b949e]/50">
      {/* Header Card */}
      <div 
        className="p-4 cursor-pointer hover:bg-[#1c2128] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-lg ${isComplete ? 'bg-[#238636]/10 text-[#238636]' : 'bg-[#a371f7]/10 text-[#a371f7]'}`}>
                  {isComplete ? <CheckCircle2 size={20} /> : <Book size={20} />}
               </div>
               <div>
                 <h3 className="font-bold text-[#e6edf3] text-lg">{unit.title}</h3>
                 <div className="text-xs text-[#8b949e] mt-0.5">{unit.topics.length} topics • {unit.pyqs.length} key questions</div>
               </div>
            </div>
            <button className="text-[#8b949e]">
                {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
        </div>
        
        {/* Progress Bar in Header */}
        <div className="w-full h-1.5 bg-[#0d1117] rounded-full overflow-hidden">
            <div 
                className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-[#238636]' : 'bg-[#a371f7]'}`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-[#30363d]">
            
            {/* Topics Grid */}
            <div className="p-2 space-y-1 bg-[#0d1117]/50">
                {unit.topics.map((topic) => {
                    const isChecked = completedTopics.includes(topic.id);
                    return (
                        <div 
                            key={topic.id} 
                            className={`group flex items-center justify-between p-2.5 rounded-lg transition-all ${isChecked ? 'bg-[#161b22]' : 'hover:bg-[#1f242c]'}`}
                        >
                            <div 
                                className="flex items-center gap-3 flex-1 cursor-pointer"
                                onClick={() => toggleTopic(topic.id)}
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#238636] border-[#238636] text-white' : 'border-[#30363d] bg-[#0d1117] hover:border-[#8b949e]'}`}>
                                    {isChecked && <Check size={12} strokeWidth={3} />}
                                </div>
                                <span className={`text-sm font-medium ${isChecked ? 'text-[#8b949e] line-through' : 'text-[#e6edf3]'}`}>
                                    {topic.name}
                                </span>
                            </div>
                            
                            {/* Actions */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAskAI(`Explain the topic "${topic.name}" from ${unit.title} simply.`);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-[#a371f7] hover:bg-[#a371f7]/10 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium"
                            >
                                <Sparkles size={14} />
                                <span className="hidden sm:inline">Explain</span>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Important Questions Section */}
            {unit.pyqs.length > 0 && (
                <div className="p-4 bg-[#0d1117] border-t border-[#30363d]">
                    <div className="flex items-center gap-2 mb-3">
                        <HelpCircle size={14} className="text-[#e6edf3]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8b949e]">Repeated PYQs</h4>
                    </div>
                    <div className="grid gap-2">
                        {unit.pyqs.map((pyq, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#8b949e]/50 transition-colors group">
                                <p className="text-sm text-[#e6edf3] font-medium mb-2">{pyq}</p>
                                <button 
                                    onClick={() => onAskAI(`Help me answer this exam question: "${pyq}". Provide key points.`)}
                                    className="text-xs text-[#2f81f7] hover:text-[#58a6ff] flex items-center gap-1 font-medium"
                                >
                                    <Sparkles size={12} />
                                    Generate Answer Draft
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};