
import React, { useState } from 'react';
import { Button, Card, Input, Label } from './UI';
import { UserProfile, LifeContext, PaymentPlan } from '../types';
import { calculateAstroIdentity } from '../services/astroService';
import Paywall from './Paywall';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const CONTEXTS: LifeContext[] = ['Career', 'Relationships', 'Emotional Health', 'Finance', 'Big Decision'];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan>(null);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    dob: '',
    tob: '',
    pob: '',
    context: 'Emotional Health'
  });

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const handleFinish = () => {
    // Always show paywall before syncing with stars
    // User must complete payment to proceed
    setShowPaywall(true);
  };

  const handlePaymentComplete = (plan: PaymentPlan) => {
    setPaymentPlan(plan);
    proceedToDashboard();
  };

  const proceedToDashboard = () => {
    const astroIdentity = calculateAstroIdentity(profile as any);
    onComplete({ ...profile, astroIdentity } as UserProfile);
  };

  const progress = showPaywall ? 100 : (step / 5) * 100;


  return (
    <div className="max-w-md mx-auto w-full px-6 pt-12 pb-24">
      {/* Progress Bar */}
      <div className="h-1 bg-white/10 rounded-full mb-12 overflow-hidden">
        <div 
          className="h-full bg-gold transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      

      <div className="space-y-8 min-h-[400px]">
        {showPaywall ? (
          <Paywall onPaymentComplete={handlePaymentComplete} />
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl leading-tight">Begin your <span className="text-gold italic">Astroveda</span> journey.</h1>
                <p className="text-slate-400 leading-relaxed">Before we look at the stars, let us look at the person. What is your name?</p>
                <div className="space-y-4">
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="E.g. Aarav Sharma" 
                    value={profile.name}
                    onChange={e => setProfile({...profile, name: e.target.value})}
                  />
                  <Button disabled={!profile.name} onClick={next} className="w-full">Continue</Button>
                </div>
              </div>
            )}

            {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl">What brings you here, {profile.name}?</h2>
            <p className="text-slate-400">Choose the area of life that needs the most clarity right now.</p>
            <div className="grid grid-cols-1 gap-3">
              {CONTEXTS.map(ctx => (
                <button
                  key={ctx}
                  onClick={() => { setProfile({...profile, context: ctx}); next(); }}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    profile.context === ctx ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 bg-white/5 text-slate-300'
                  }`}
                >
                  {ctx}
                </button>
              ))}
            </div>
            <Button variant="secondary" onClick={prev} className="w-full">Back</Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl">When did your journey begin?</h2>
            <p className="text-slate-400">Your birth date creates the celestial imprint of your life's timing.</p>
            <div className="space-y-4">
              <Label>Date of Birth</Label>
              <Input 
                type="date" 
                value={profile.dob}
                onChange={e => setProfile({...profile, dob: e.target.value})}
              />
              <Button disabled={!profile.dob} onClick={next} className="w-full">Next</Button>
              <Button variant="secondary" onClick={prev} className="w-full">Back</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl">The precise moment.</h2>
            <p className="text-slate-400">Time of birth helps us calculate your Ascendant (Lagna) — your personal gateway.</p>
            <div className="space-y-4">
              <Label>Time of Birth</Label>
              <Input 
                type="time" 
                value={profile.tob}
                onChange={e => setProfile({...profile, tob: e.target.value})}
              />
              <Button disabled={!profile.tob} onClick={next} className="w-full">Next</Button>
              <Button variant="secondary" onClick={prev} className="w-full">Back</Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl">Where did you land?</h2>
            <p className="text-slate-400">The earth's position relative to the stars at your birth place.</p>
            <div className="space-y-4">
              <Label>City of Birth</Label>
              <Input 
                placeholder="Mumbai, India" 
                value={profile.pob}
                onChange={e => setProfile({...profile, pob: e.target.value})}
              />
              <Button disabled={!profile.pob} onClick={handleFinish} className="w-full">Sync with Stars</Button>
              <Button variant="secondary" onClick={prev} className="w-full">Back</Button>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
