
import React, { useState, useEffect } from 'react';
import { haptics } from '../utils/haptics';
import { sounds } from '../utils/audio';

interface Props {
  onAuthenticated: () => void;
}

const BiometricAuth: React.FC<Props> = ({ onAuthenticated }) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(false);

  const handleScan = () => {
    if (scanning) return;
    
    setScanning(true);
    haptics.mediumClick();
    
    // Simulate scan duration
    setTimeout(() => {
      setScanning(false);
      sounds.playSuccess();
      haptics.successPulse();
      onAuthenticated();
    }, 1500);
  };

  return (
    <div className="absolute inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 sm:rounded-[3rem]">
      <div className="mb-8 relative">
        <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center relative overflow-hidden">
          {scanning && (
            <div className="absolute inset-0 bg-indigo-500/20 animate-ping"></div>
          )}
          <i className={`fas fa-fingerprint text-5xl transition-all duration-500 ${scanning ? 'text-indigo-400 scale-110' : 'text-slate-600'}`}></i>
          
          {/* Scanning Beam */}
          {scanning && (
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,1)] animate-scan-down"></div>
          )}
        </div>
      </div>

      <h1 className="text-2xl font-black text-white tracking-tight mb-2">ZiP<span className="text-indigo-500">PaY</span></h1>
      <p className="text-sm text-slate-500 font-medium mb-12 px-8">
        {scanning ? 'Verifying Identity...' : 'Biometric identification required to access UPI Wallet'}
      </p>

      <button
        onClick={handleScan}
        className="w-full max-w-xs bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 border border-slate-700/50 shadow-lg flex items-center justify-center gap-3"
      >
        <i className="fas fa-unlock-alt"></i>
        <span>Unlock UPI</span>
      </button>

      <div className="mt-8 text-[10px] text-slate-700 font-black uppercase tracking-[0.2em]">
        Secure Enclave Protected
      </div>

      <style>{`
        @keyframes scan-down {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-down {
          animation: scan-down 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BiometricAuth;
