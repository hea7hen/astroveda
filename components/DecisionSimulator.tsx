
import React, { useState } from 'react';
import { UserProfile, SimulationResult } from '../types';
import { simulateDecision } from '../services/sambanovaService';
import { Button, Card, Input } from './UI';

const DecisionSimulator: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await simulateDecision(profile, query);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-8 border-gold/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45L19.15 19H4.85L12 5.45zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/></svg>
        </div>
        <h3 className="text-xl font-medium">Decision Simulator</h3>
        <span className="text-[10px] bg-gold text-slate-900 px-1.5 py-0.5 rounded font-bold uppercase ml-auto">Premium</span>
      </div>
      
      {!result ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">Describe a choice you're facing (e.g., "Should I quit my job to start a bakery next month?")</p>
          <textarea 
            className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-gold/50"
            placeholder="Type your dilemma here..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Button 
            onClick={handleSimulate} 
            disabled={loading || !query} 
            className="w-full"
          >
            {loading ? "Consulting celestial alignments..." : "Simulate Outcome"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase">Growth Potential</span>
              <div className="h-2 bg-white/10 rounded-full">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${result.growthFactor}%` }} />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase">Risk Level</span>
              <div className="h-2 bg-white/10 rounded-full">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${result.riskFactor}%` }} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <h4 className="text-emerald-400 font-medium mb-1">Path A: Action</h4>
              <p className="text-sm text-slate-300">{result.optionA}</p>
            </div>
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <h4 className="text-amber-400 font-medium mb-1">Path B: Patience</h4>
              <p className="text-sm text-slate-300">{result.optionB}</p>
            </div>
          </div>

          <p className="text-sm italic text-slate-400 leading-relaxed border-t border-white/5 pt-4">
            "{result.explanation}"
          </p>

          <Button variant="outline" onClick={() => setResult(null)} className="w-full">New Simulation</Button>
        </div>
      )}
    </Card>
  );
};

export default DecisionSimulator;
