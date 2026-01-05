
import React, { useState } from 'react';
import { UserProfile } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-slate-900">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[2px] h-[2px] bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
        <div className="absolute top-[40%] left-[15%] w-[1.5px] h-[1.5px] bg-white rounded-full animate-pulse delay-700" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 glass border-t-0 border-x-0">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center">
              <span className="text-slate-900 font-bold">A</span>
            </div>
            <span className="text-xl font-medium tracking-tight serif italic">Astroveda</span>
          </div>
          
          {userProfile && (
            <button 
              onClick={() => setUserProfile(null)}
              className="text-xs text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              Reset Chart
            </button>
          )}
        </div>
      </header>

      <main className="pt-20">
        {!userProfile ? (
          <Onboarding onComplete={setUserProfile} />
        ) : (
          <Dashboard profile={userProfile} />
        )}
      </main>

      {/* Mobile-first bottom nav for Dashboard */}
      {userProfile && (
        <nav className="fixed bottom-0 left-0 right-0 glass border-b-0 border-x-0 z-50 md:hidden">
          <div className="flex justify-around items-center py-4">
            <button className="flex flex-col items-center gap-1 text-gold">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v9h14v-9h3L12 3zm0 4.84L16.5 12h-1.5v7H9v-7H7.5L12 7.84z"/></svg>
               <span className="text-[10px] font-bold uppercase">Today</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-500">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
               <span className="text-[10px] font-bold uppercase">Transit</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-500">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
               <span className="text-[10px] font-bold uppercase">Simulator</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;
