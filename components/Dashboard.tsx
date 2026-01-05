
import React, { useEffect, useState } from 'react';
import { UserProfile, Prediction } from '../types';
import { generateLifePrediction } from '../services/sambanovaService';
import { Card, Button } from './UI';
import DecisionSimulator from './DecisionSimulator';

const Dashboard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentPlan, setPaymentPlan] = useState<string | null>(null);

  useEffect(() => {
    // Check payment status
    const savedPlan = localStorage.getItem('astroveda_payment_plan');
    setPaymentPlan(savedPlan);

    const fetchPrediction = async () => {
      // Only fetch if payment is completed
      if (!savedPlan) {
        setLoading(false);
        return;
      }

      try {
        const pred = await generateLifePrediction(profile, savedPlan as 'basic' | 'premium');
        setPrediction(pred);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, [profile]);

  return (
    <div className="max-w-xl mx-auto px-6 pt-10 pb-24 space-y-8">
      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-gold text-[10px] uppercase tracking-widest font-bold">Your Current Phase</p>
          <h1 className="text-3xl leading-tight font-medium">Welcome, <span className="serif italic">{profile.name}</span></h1>
        </div>
        <div className="text-right glass px-3 py-2 rounded-xl">
          <div className="text-gold text-[10px] uppercase tracking-widest font-bold">Lagna</div>
          <div className="text-lg serif leading-none">{profile.astroIdentity?.lagna}</div>
        </div>
      </div>

      {/* Main Guidance Section */}
      <section className="space-y-6">
        {!paymentPlan ? (
          <Card className="h-96 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-center">Payment Required</h3>
            <p className="text-slate-400 text-center px-8">Please complete payment to view your cosmic insights.</p>
          </Card>
        ) : loading ? (
          <Card className="h-96 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
            <p className="text-slate-500 animate-pulse italic text-center px-8">Syncing your birth imprint with current cosmic transits...</p>
            {paymentPlan === 'premium' && (
              <p className="text-xs text-gold uppercase tracking-widest">Premium Analysis Active</p>
            )}
          </Card>
        ) : prediction && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 space-y-6">
            {/* 1. Conclusion (Headline) */}
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-medium leading-tight text-white serif italic">
                {prediction.headline}
              </h2>
              {/* 2. Reassurance */}
              <p className="text-slate-400 leading-relaxed italic border-x border-gold/20 px-4">
                "{prediction.reassurance}"
              </p>
            </div>

            {/* 3. Interpretation Card */}
            <Card className="!bg-gold/5 border-gold/20 space-y-4">
               <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-bold">What This Means For You</h3>
               <p className="text-lg text-slate-200 leading-snug">{prediction.interpretation}</p>
            </Card>

            {/* 4. Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl">
                <h4 className="text-[10px] font-bold uppercase text-emerald-400 mb-3 tracking-widest">Do more of this</h4>
                <ul className="space-y-2">
                  {prediction.actionsDo.map((item, i) => (
                    <li key={i} className="text-sm text-emerald-100 flex gap-2">
                      <span className="text-emerald-400">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-2xl">
                <h4 className="text-[10px] font-bold uppercase text-rose-400 mb-3 tracking-widest">Avoid this for now</h4>
                <ul className="space-y-2">
                  {prediction.actionsAvoid.map((item, i) => (
                    <li key={i} className="text-sm text-rose-100 flex gap-2">
                      <span className="text-rose-400">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 5. Astrology "Why" & Timing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">The Cosmic Why</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{prediction.astrologyLogic}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Strategic Timing</h3>
                <p className="text-xs text-gold leading-relaxed font-medium">{prediction.timing}</p>
              </div>
            </div>

            {/* 6. One Small Step */}
            <div className="p-6 rounded-2xl border border-dashed border-gold/30 bg-gold/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-slate-900 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gold uppercase tracking-widest font-bold">One small step this week</p>
                <p className="text-sm text-slate-200">{prediction.oneSmallStep}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Decision Simulator */}
      <section className="pt-8">
        <DecisionSimulator profile={profile} />
      </section>

      {/* Astro Identity Quick Stats (Footer style) */}
      <div className="pt-8 border-t border-white/5">
        <h3 className="text-center text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Your Birth Imprint</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 text-center">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">Rashi</span>
            <span className="text-xs font-medium text-slate-300">{profile.astroIdentity?.rashi}</span>
          </div>
          <div className="p-3 text-center">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">Nakshatra</span>
            <span className="text-xs font-medium text-slate-300">{profile.astroIdentity?.nakshatra}</span>
          </div>
          <div className="p-3 text-center">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">Current Dasha</span>
            <span className="text-xs font-medium text-slate-300">{profile.astroIdentity?.dasha}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
