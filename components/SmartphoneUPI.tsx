
import React, { useState, useEffect, useMemo } from 'react';
import { GlobalState, Transaction, NotificationType } from '../types';
import NotificationOverlay from './NotificationOverlay';
import AIAssistant from './AIAssistant';
import { haptics } from '../utils/haptics';

interface Props {
  userWallet: GlobalState['userWallet'];
  connectivity: GlobalState['connectivity'];
  phoneAlert: { message: string; type: NotificationType } | null;
  onLoadMoney: (amount: number) => void;
  onSync: () => void;
  onToggleConnectivity: (type: 'bluetooth' | 'wifi', value: boolean) => void;
  onToggleAutoReload: (enabled: boolean) => void;
  onCloseAlert: () => void;
  fullState: GlobalState;
}

type ChartType = 'Area' | 'Line' | 'Columns' | 'Step-Line' | 'Candles' | 'Trend Analysis';

const SmartphoneUPI: React.FC<Props> = ({ 
  userWallet, 
  connectivity, 
  phoneAlert,
  onLoadMoney, 
  onSync, 
  onToggleConnectivity,
  onToggleAutoReload,
  onCloseAlert,
  fullState
}) => {
  const [amount, setAmount] = useState<string>('');
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
  const [chartType, setChartType] = useState<ChartType>('Area');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isWatchLinked = connectivity.isBluetoothOn && userWallet.isActive;
  const isLoadReady = connectivity.isWifiOn && isWatchLinked;

  // Prototype / Dummy Data for visualization
  const prototypeData = useMemo(() => [
    { label: 'M', amount: 45, high: 55, low: 30, open: 35, close: 45 },
    { label: 'T', amount: 82, high: 90, low: 60, open: 45, close: 82 },
    { label: 'W', amount: 35, high: 45, low: 20, open: 82, close: 35 },
    { label: 'T', amount: 120, high: 135, low: 100, open: 35, close: 120 },
    { label: 'F', amount: 65, high: 80, low: 50, open: 120, close: 65 },
    { label: 'S', amount: 150, high: 165, low: 130, open: 65, close: 150 },
    { label: 'S', amount: 95, high: 110, low: 80, open: 150, close: 95 },
  ], []);

  const maxVal = 180; // Fixed scale for prototype consistency

  const renderChart = () => {
    const width = 340;
    const height = 80;
    const padding = 10;
    const points = prototypeData.map((d, i) => ({
      x: (i * (width - padding * 2)) / (prototypeData.length - 1) + padding,
      y: height - (d.amount / maxVal) * height + padding,
      ...d
    }));

    switch (chartType) {
      case 'Line':
      case 'Area':
        const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const areaPath = `${linePath} L ${points[points.length - 1].x} ${height + padding} L ${points[0].x} ${height + padding} Z`;
        return (
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height + padding * 2}`} className="overflow-visible">
            {chartType === 'Area' && (
              <path d={areaPath} fill="url(#chartGradient)" className="opacity-30" />
            )}
            <path d={linePath} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'Columns':
        return (
          <div className="flex items-end justify-between h-full w-full gap-2 px-2">
            {prototypeData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end">
                <div 
                  style={{ height: `${(d.amount / maxVal) * 100}%` }}
                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-xl transition-all duration-700 ease-out min-h-[4px]"
                />
              </div>
            ))}
          </div>
        );
      case 'Step-Line':
        let stepPath = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
          stepPath += ` L ${points[i].x} ${points[i - 1].y} L ${points[i].x} ${points[i].y}`;
        }
        return (
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height + padding * 2}`} className="overflow-visible">
            <path d={stepPath} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'Candles':
        return (
          <div className="flex items-end justify-between h-full w-full gap-2 px-2">
            {prototypeData.map((d, i) => {
              const isUp = d.close >= d.open;
              const h = Math.abs(((d.close - d.open) / maxVal) * 100);
              const bottom = (Math.min(d.open, d.close) / maxVal) * 100;
              const wickTop = (d.high / maxVal) * 100;
              const wickBottom = (d.low / maxVal) * 100;
              return (
                <div key={i} className="flex-1 relative h-full flex flex-col items-center">
                  <div className="absolute w-px bg-slate-700" style={{ height: `${wickTop - wickBottom}%`, bottom: `${wickBottom}%` }} />
                  <div 
                    className={`absolute w-full rounded-sm border ${isUp ? 'bg-green-500/40 border-green-500' : 'bg-red-500/40 border-red-500'}`}
                    style={{ height: `${Math.max(h, 2)}%`, bottom: `${bottom}%` }}
                  />
                </div>
              );
            })}
          </div>
        );
      case 'Trend Analysis':
        const trendPoints = [...points];
        const last = trendPoints[trendPoints.length - 1];
        const predicted = { x: last.x + 40, y: last.y - 20 };
        const trendPath = trendPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        return (
          <svg width="100%" height="100%" viewBox={`0 0 ${width + 40} ${height + padding * 2}`} className="overflow-visible">
            <path d={trendPath} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
            <line x1={last.x} y1={last.y} x2={predicted.x} y2={predicted.y} stroke="#6366f1" strokeWidth="3" strokeDasharray="4 4" />
            <circle cx={predicted.x} cy={predicted.y} r="4" fill="#6366f1" className="animate-pulse" />
          </svg>
        );
      default:
        return null;
    }
  };

  const frameClasses = "w-full sm:max-w-sm bg-slate-900 sm:border border-slate-800 sm:rounded-[3rem] p-6 sm:p-8 mb-4 sm:mb-20 shadow-2xl relative overflow-hidden flex flex-col h-[680px]";

  if (showFullHistory) {
    return (
      <div className={`${frameClasses} animate-in slide-in-from-right duration-300 mx-auto`}>
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-20"></div>
        <div className="mt-8 flex items-center gap-4 mb-6 shrink-0">
           <button onClick={() => { haptics.lightClick(); setShowFullHistory(false); }} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
             <i className="fas fa-chevron-left text-slate-300"></i>
           </button>
           <h2 className="text-xl font-bold">History</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hidden pb-10">
          {userWallet.transactions.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
               <div className="w-full border-2 border-dashed border-slate-800 rounded-[2rem] py-12 flex items-center justify-center bg-slate-900/20">
                 <p className="text-slate-600 font-bold uppercase tracking-[0.2em] text-[10px]">No Transactions</p>
               </div>
            </div>
          ) : (
            userWallet.transactions.map(tx => (
              <div key={tx.id} className="bg-slate-800/50 p-4 rounded-2xl flex items-center justify-between border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs ${tx.type === 'CREDIT' ? 'bg-green-500/10 text-green-500' : 'bg-slate-700 text-slate-400'}`}>
                    <i className={`fas ${tx.type === 'CREDIT' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs truncate">{tx.peer}</p>
                    <p className="text-[9px] text-slate-500 font-medium">{new Date(tx.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</p>
                  </div>
                </div>
                <p className={`font-black text-sm whitespace-nowrap ${tx.type === 'CREDIT' ? 'text-green-400' : 'text-slate-100'}`}>
                  {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${frameClasses} mx-auto`}>
      {showAI && <AIAssistant state={fullState} onClose={() => setShowAI(false)} />}
      
      <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-20"></div>
      
      {/* System Status Bar */}
      <div className="flex justify-between items-center mb-4 shrink-0 px-1 mt-1">
        <span className="text-[10px] font-black text-slate-400 tracking-tight">{time}</span>
        <div className="flex items-center gap-2 text-slate-500">
          <i className="fas fa-signal text-[8px]"></i>
          <div className="flex items-center gap-1">
            <span className="text-[8px] font-bold">85%</span>
            <i className="fas fa-battery-three-quarters text-[10px]"></i>
          </div>
        </div>
      </div>

      {/* App Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex flex-col">
           <h2 className="text-2xl font-black">Hi, User</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { haptics.mediumClick(); setShowAI(true); }}
            className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-indigo-500/10"
          >
            <i className="fas fa-robot"></i>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700">
            <i className="fas fa-user text-slate-500"></i>
          </div>
        </div>
      </div>

      {/* Main Content Area - Swipe up scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden space-y-6 pb-20">
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-500/20 relative overflow-hidden group shrink-0">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">ZiP BALANCE</p>
                <h3 className={`text-4xl font-black ${userWallet.balance < 0 ? 'text-red-400' : 'text-white'}`}>₹{userWallet.balance.toFixed(2)}</h3>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <div className="flex gap-2">
                   <button 
                      onClick={(e) => { e.stopPropagation(); onToggleConnectivity('bluetooth', !connectivity.isBluetoothOn); }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${connectivity.isBluetoothOn ? 'bg-blue-400/20 text-blue-400' : 'bg-white/10 text-white/30'}`}
                    >
                      <i className="fab fa-bluetooth-b text-xs"></i>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleConnectivity('wifi', !connectivity.isWifiOn); }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${connectivity.isWifiOn ? 'bg-white/30 text-white' : 'bg-white/10 text-white/30'}`}
                    >
                      <i className="fas fa-wifi text-xs"></i>
                    </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-2">
              <div>
                <p className="text-[9px] font-bold text-indigo-200 uppercase mb-1">PRIMARY BANK</p>
                <p className="text-sm font-bold text-white">₹{userWallet.phoneBalance.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold text-indigo-200 uppercase mb-1">WATCH CONNECTION</p>
                <p className={`text-[10px] font-black flex items-center gap-1.5 ${isWatchLinked ? 'text-green-300' : 'text-indigo-300 opacity-60'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isWatchLinked ? 'bg-green-400 animate-pulse' : 'bg-indigo-400'}`}></span>
                  {isWatchLinked ? 'CONNECTED' : 'OFFLINE'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Reload Row */}
        <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-800/50 flex items-center justify-between transition-all shrink-0">
          <div className="flex-1">
            <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-0.5">Auto-Reload</h4>
            <p className="text-[8px] text-slate-500 font-medium">Auto-fund ₹200 when balance &lt; ₹50</p>
          </div>
          <button 
            onClick={() => { haptics.lightClick(); onToggleAutoReload(!userWallet.isAutoReloadEnabled); }}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${userWallet.isAutoReloadEnabled ? 'bg-indigo-600' : 'bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${userWallet.isAutoReloadEnabled ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        {/* Top-up Input Section */}
        <div className="shrink-0">
          <div className="flex justify-between items-center mb-3 px-1">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">TOP-UP WALLET</h4>
            <span className="text-[8px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">MICRO-PAY READY</span>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">₹</span>
              <input 
                type="number" 
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-8 pr-4 text-sm font-bold focus:outline-none focus:border-indigo-600 transition-all placeholder:text-slate-800 text-white"
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  haptics.mediumClick();
                  onLoadMoney(Number(amount));
                  setAmount('');
                }}
                disabled={!isLoadReady || !amount}
                className={`flex-1 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${isLoadReady && amount ? 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
              >
                <i className="fas fa-plus-circle"></i> Load
              </button>
              <button 
                onClick={() => { haptics.mediumClick(); onSync(); }}
                disabled={!connectivity.isBluetoothOn}
                className={`flex-1 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${connectivity.isBluetoothOn ? 'bg-slate-800 text-indigo-400 border border-indigo-500/10 hover:border-indigo-500/40 active:scale-95' : 'bg-slate-900/50 text-slate-700 border border-slate-800 cursor-not-allowed'}`}
              >
                <i className="fas fa-sync-alt"></i> Sync
              </button>
            </div>
          </div>
        </div>

        {/* Spending Insights Section - Extended width to near edges */}
        <div className="px-1 shrink-0 -mx-4 sm:-mx-6">
          <div className="flex justify-between items-center mb-3 px-4 sm:px-6">
             <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Spending Insights</h4>
             <select 
               value={chartType}
               onChange={(e) => { haptics.lightClick(); setChartType(e.target.value as ChartType); }}
               className="bg-slate-800 border-none rounded-lg text-[9px] font-black text-indigo-400 px-2 py-1 focus:ring-1 focus:ring-indigo-500/30 outline-none uppercase cursor-pointer transition-all hover:bg-slate-700"
             >
               {['Area', 'Line', 'Columns', 'Step-Line', 'Candles', 'Trend Analysis'].map(t => (
                 <option key={t} value={t} className="bg-slate-900 text-slate-300">{t}</option>
               ))}
             </select>
          </div>
          <div className="bg-slate-800/30 rounded-[2.5rem] p-6 border border-slate-800/40 shadow-inner">
             <div className="h-24 w-full flex items-center justify-center">
               {renderChart()}
             </div>
             <div className="flex justify-between mt-4 px-2">
               {prototypeData.map((d, i) => (
                 <span key={i} className="text-[8px] font-black text-slate-600 uppercase transition-colors hover:text-indigo-400">
                   {d.label}
                 </span>
               ))}
             </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="shrink-0 pb-10">
          <div className="flex justify-between items-center mb-5 px-1">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Recent Activity</h4>
            <button 
              onClick={() => { haptics.lightClick(); setShowFullHistory(true); }} 
              className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-all"
            >
              See All
            </button>
          </div>
          
          <div className="space-y-4 px-1 flex flex-col">
            {userWallet.transactions.length === 0 ? (
              <div className="flex-1 flex items-center justify-center mb-4">
                 <div className="w-full border-2 border-dashed border-slate-800/60 rounded-[2.5rem] py-12 flex items-center justify-center bg-slate-900/10">
                   <p className="text-slate-600 font-bold uppercase tracking-[0.25em] text-[10px] opacity-80">No Transactions</p>
                 </div>
              </div>
            ) : (
              userWallet.transactions.slice(0, 2).map(tx => (
                <div key={tx.id} className="bg-slate-800/40 p-5 rounded-[2rem] flex items-center justify-between border border-slate-800/40 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs ${tx.type === 'CREDIT' ? 'bg-green-500/10 text-green-500' : 'bg-slate-700/60 text-slate-400'}`}>
                      <i className={`fas ${tx.type === 'CREDIT' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-white truncate max-w-[140px]">{tx.peer}</p>
                      <p className="text-[10px] text-slate-500 font-medium tracking-tight">
                        {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <p className={`text-[14px] font-black tracking-tight ${tx.type === 'CREDIT' ? 'text-green-400' : (tx.peer.includes('Emergency') ? 'text-red-400' : 'text-slate-200')}`}>
                    {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Home Indicator Pillar */}
      <div className="mt-auto py-2 shrink-0 border-t border-slate-800/30 bg-slate-900/50 backdrop-blur-sm -mx-6 sm:-mx-8 px-6 sm:px-8">
         <div className="w-16 h-1.5 bg-slate-800/50 rounded-full mx-auto"></div>
      </div>

      {phoneAlert && (
        <NotificationOverlay 
          message={phoneAlert.message} 
          type={phoneAlert.type} 
          duration={3500} 
          onClose={onCloseAlert} 
        />
      )}
    </div>
  );
};

export default SmartphoneUPI;
