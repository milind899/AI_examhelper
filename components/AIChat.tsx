import React, { useState, useRef, useEffect } from 'react';
import { generateStudyHelp } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Sparkles, Send, X, Bot, User, Loader2, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIChatProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialQuery?: string;
  clearInitialQuery: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, setIsOpen, initialQuery, clearInitialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello! I\'m your exam Copilot. I can explain complex topics, solve PYQs, or generate a study plan for you.',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
      clearInitialQuery();
    }
  }, [initialQuery, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateStudyHelp(text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#161b22] text-white rounded-full p-1 pr-5 shadow-[0_0_20px_rgba(163,113,247,0.4)] border border-[#30363d] transition-all hover:scale-105 hover:border-[#a371f7] group z-50 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-copilot-gradient flex items-center justify-center relative overflow-hidden">
           <Sparkles size={20} className="text-white relative z-10" />
           <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
        <span className="font-semibold text-sm group-hover:text-[#a371f7] transition-colors">Ask Copilot</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-[420px] h-[600px] max-h-[85vh] bg-[#0d1117]/95 backdrop-blur-xl border border-[#30363d] rounded-xl shadow-panel z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200 ring-1 ring-[#30363d]">
      {/* Header */}
      <div className="bg-[#161b22]/80 border-b border-[#30363d] p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-copilot-gradient flex items-center justify-center">
             <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-bold text-sm text-gh-text">GitHub Copilot</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsOpen(false)} className="text-gh-text-secondary hover:text-white p-1.5 rounded-md hover:bg-[#30363d] transition-colors">
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
               <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#a371f7] to-[#2f81f7] flex items-center justify-center shrink-0 mt-0.5">
                 <Sparkles size={12} className="text-white" />
               </div>
            )}
            
            <div 
              className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-[#1f6feb]/20 border border-[#1f6feb]/40 text-[#e6edf3]' 
                  : 'bg-[#161b22] border border-[#30363d] text-[#e6edf3]'
              }`}
            >
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>

            {msg.role === 'user' && (
               <div className="w-6 h-6 rounded-full bg-[#30363d] flex items-center justify-center shrink-0 mt-0.5 border border-[#6e7681]">
                 <User size={12} className="text-white" />
               </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
             <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#a371f7] to-[#2f81f7] flex items-center justify-center shrink-0">
                 <Sparkles size={12} className="text-white" />
             </div>
             <div className="bg-[#161b22] border border-[#30363d] rounded-lg px-3.5 py-2.5 flex items-center gap-2 text-sm text-gh-text-secondary">
                <Loader2 size={14} className="animate-spin text-[#a371f7]" /> Thinking...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-[#0d1117] border-t border-[#30363d] shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative group"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot about Computer Networks..."
            className="w-full bg-[#161b22] border border-[#30363d] text-gh-text rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#a371f7] focus:ring-1 focus:ring-[#a371f7] transition-all placeholder:text-[#484f58]"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-1 text-[#8b949e] hover:text-[#e6edf3] disabled:opacity-30 transition-colors"
          >
            <div className={`p-1 rounded ${input.trim() ? 'bg-[#238636] text-white' : ''}`}>
                <Send size={14} />
            </div>
          </button>
        </form>
        <div className="flex justify-center mt-2">
            <span className="text-[10px] text-[#484f58] flex items-center gap-1">
                Powered by <span className="text-[#a371f7]">Gemini</span>
            </span>
        </div>
      </div>
    </div>
  );
};