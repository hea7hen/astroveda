
import React, { useEffect } from 'react';
import { Card, Button } from './UI';
import { PaymentPlan } from '../types';

interface PaywallProps {
  onPaymentComplete: (plan: PaymentPlan) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Paywall: React.FC<PaywallProps> = ({ onPaymentComplete }) => {
  useEffect(() => {
    // Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = async (amount: number, plan: PaymentPlan) => {
    if (!window.Razorpay) {
      alert('Payment gateway is loading. Please wait a moment and try again.');
      return;
    }

    // For Razorpay, you'll need to create an order on your backend first
    // Since we don't have a backend, we'll use a mock approach
    // In production, you should call your backend API to create an order
    
    // Note: For production, you should create orders on your backend server
    // This is a client-side implementation for testing/demo purposes
    // In production, call your backend API to create an order first
    
    const razorpayKey = process.env.RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      alert('Razorpay key is not configured. Please add RAZORPAY_KEY_ID to your environment variables.');
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount * 100, // Amount in paise (₹10 = 1000 paise, ₹99 = 9900 paise)
      currency: 'INR',
      name: 'Astroveda',
      description: plan === 'premium' 
        ? 'Premium Astrological Prediction - Deep cosmic analysis' 
        : 'Basic Astrological Prediction - Essential cosmic guidance',
      image: '', // Optional: Add your logo URL here
      handler: function (response: any) {
        // Payment successful
        console.log('Payment successful:', response);
        // Store payment status
        localStorage.setItem('astroveda_payment_plan', plan || 'basic');
        localStorage.setItem('astroveda_payment_id', response.razorpay_payment_id);
        localStorage.setItem('astroveda_payment_amount', amount.toString());
        localStorage.setItem('astroveda_payment_timestamp', new Date().toISOString());
        onPaymentComplete(plan);
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#D4AF37'
      },
      modal: {
        ondismiss: function() {
          console.log('Payment cancelled');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="w-full">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gold/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl leading-tight font-medium">Unlock Your Cosmic Insights</h1>
          <p className="text-slate-400 leading-relaxed">
            Choose your prediction tier to sync with the stars and discover what the cosmos has in store for you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Basic Plan - ₹10 */}
          <Card className="border-white/10 hover:border-gold/30 transition-all cursor-pointer">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium mb-1">Basic Prediction</h3>
                  <p className="text-sm text-slate-400">Essential cosmic guidance</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gold">₹10</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>Personalized astrological insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>Current phase analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>Actionable guidance</span>
                </li>
              </ul>
              <Button 
                onClick={() => handlePayment(10, 'basic')} 
                className="w-full"
                variant="outline"
              >
                Choose Basic - ₹10
              </Button>
            </div>
          </Card>

          {/* Premium Plan - ₹99 */}
          <Card className="border-gold/50 bg-gold/5 hover:border-gold transition-all cursor-pointer relative">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] bg-gold text-slate-900 px-2 py-1 rounded font-bold uppercase">Most Popular</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium mb-1">Premium Prediction</h3>
                  <p className="text-sm text-slate-400">Deep, accurate cosmic analysis</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gold">₹99</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>Highly accurate predictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>Detailed planetary analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>Advanced timing insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <Button 
                onClick={() => handlePayment(99, 'premium')} 
                className="w-full"
              >
                Choose Premium - ₹99
              </Button>
            </div>
          </Card>
        </div>

        <p className="text-xs text-center text-slate-500">
          Secure payment powered by Razorpay. Your payment information is encrypted and secure.
        </p>
      </div>
    </div>
  );
};

export default Paywall;

