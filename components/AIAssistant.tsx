
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { GlobalState } from '../types';

interface Props {
  state: GlobalState;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const PREDEFINED_QUESTIONS = [
  "Analyze my weekly spending patterns",
  "How much can I save this month?",
  "Flag any unusual transaction activity",
  "Should I top up my ZiP wallet now?",
  "Create a ₹1000 savings goal plan",
  "Suggest a daily spending cap for me",
  "How often do I use Emergency ZiP?",
  "Best way to manage my bank balance"
];

const AIAssistant: React.FC<Props> = ({ state, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Proactive Insights Logic
  const proactiveInsights = useMemo(() => {
    const insights: string[] = [];
    const { balance, phoneBalance, transactions } = state.userWallet;
    
    if (balance < 50 && !state.userWallet.isAutoReloadEnabled) {
      insights.push("Low ZiP balance. Consider enabling Auto-Reload to avoid payment friction.");
    }
    
    if (balance < 0) {
      insights.push("You're in Emergency credit. Clearing this should be your top priority to avoid convenience fees.");
    }

    const recentHighSpend = transactions.slice(0, 3).some(t => t.amount > 150);
    if (recentHighSpend) {
      insights.push("Detected high-value micro-payments recently. Want to set a daily cap?");
    }

    if (phoneBalance > 5000 && balance < 100) {
      insights.push("Strong bank reserves detected. You can safely top up your ZiP wallet for convenience.");
    }

    return insights;
  }, [state]);

  useEffect(() => {
    // Initial Greeting with Proactive Insight
    const insight = proactiveInsights.length > 0 
      ? `\n\n**Quick Insight:** ${proactiveInsights[Math.floor(Math.random() * proactiveInsights.length)]}` 
      : "";
      
    setMessages([
      { 
        role: 'assistant', 
        content: `Hello! I'm ZiP, your personal finance wingman. I've analyzed your recent patterns.${insight}\n\nHow can I help you optimize your money today?`,
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (customMsg?: string) => {
    const textToSend = customMsg || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = { role: 'user', content: textToSend, timestamp: new Date() };
    if (!customMsg) setInput('');
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const statsContext = `
        Current ZiP Balance: ₹${state.userWallet.balance}
        Primary Bank Balance: ₹${state.userWallet.phoneBalance}
        Total Synced Transactions: ${state.userWallet.transactions.length}
        Pending Syncs: ${state.userWallet.pendingSync.length}
        Recent Activity: ${state.userWallet.transactions.slice(0, 10).map(t => `${t.peer}: ₹${t.amount} (${t.type})`).join(', ')}
        Auto-Reload Status: ${state.userWallet.isAutoReloadEnabled ? 'ENABLED' : 'DISABLED'}
        Proactive Observations: ${proactiveInsights.join(' | ')}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          { role: 'user', parts: [{ text: `APP CONTEXT:\n${statsContext}\n\nUSER REQUEST: ${textToSend}` }] }
        ],
        config: {
          systemInstruction: `You are ZiP, a sophisticated, proactive financial coach for the ZiPPaY app.
          CORE CAPABILITIES:
          1. PROACTIVE COACHING: Analyze patterns (e.g., frequent small spends) and suggest optimizations. Provide specific goal-setting advice for savings.
          2. GOAL SETTING: Help users set and track mini-savings goals relative to their bank balance.
          3. ANOMALY DETECTION: Flag transactions that seem unusually high or frequent compared to the average micro-payment.
          4. TONE: Intelligent, witty, supportive, and data-driven.
          5. CONSTRAINTS: Keep responses under 80 words. Use markdown bold for key numbers or insights.`,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I'm having trouble processing that right now. Let's try again?";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText, timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Network hiccup! Please ensure your environment is configured correctly.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-[110] flex flex-col bg-slate-950 animate-in fade-in zoom-in duration-300">
      {/* Header */}
      <div className="pt-10 pb-4 px-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <i className="fas fa-bolt text-white text-lg"></i>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">ZiP Coach</h3>
            <p className="text-[10px] text-slate-500 font-medium">AI Financial Strategy • v5.0</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="w-8 h-8 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Message Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} group animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm transition-all ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-500/10' 
                : 'bg-slate-800/80 backdrop-blur-sm text-slate-200 rounded-tl-none border border-slate-700/50'
            }`}>
              {msg.content.split('\n').map((line, idx) => (
                <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
            <span className="text-[8px] text-slate-600 mt-1 px-1 font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-800/50 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-700/30 flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-900/80 border-t border-slate-800 backdrop-blur-xl">
        {/* Dropdown for Predefined Questions */}
        <div className="mb-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 ml-1">Quick Strategy</label>
          <select 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-[11px] font-bold text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 appearance-none cursor-pointer"
            onChange={(e) => {
              if (e.target.value) {
                handleSend(e.target.value);
                e.target.value = ""; // Reset dropdown
              }
            }}
            defaultValue=""
          >
            <option value="" disabled>Select a coaching question...</option>
            {PREDEFINED_QUESTIONS.map((q, idx) => (
              <option key={idx} value={q}>{q}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-10 mt-[-32px] text-slate-500">
            <i className="fas fa-chevron-down text-[10px]"></i>
          </div>
        </div>

        <div className="relative group">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your own question..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-slate-700 text-slate-200"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white disabled:opacity-30 disabled:grayscale transition-all hover:bg-indigo-500 active:scale-90 shadow-lg shadow-indigo-600/20"
          >
            <i className="fas fa-arrow-up text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
