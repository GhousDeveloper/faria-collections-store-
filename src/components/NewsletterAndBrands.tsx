import React, { useState } from 'react';
import { Send, CheckCircle2, Gift, Sparkles, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SUB_BRANDS } from '../data/products';

export const NewsletterAndBrands: React.FC = () => {
  const { addToast, applyCoupon } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }

    setSubscribed(true);
    applyCoupon('FARIA10');
    addToast('Welcome to FARIA Club! 🎉', '10% discount coupon FARIA10 is now active.', 'success');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Newsletter Gradient Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-purple-700 via-fuchsia-600 to-orange-500 p-8 sm:p-12 text-white shadow-2xl">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-blue-900/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & Form */}
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-amber-200">
              <Sparkles className="w-3.5 h-3.5" /> EXCLUSIVE PRIVILEGE
            </span>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              GET 10% OFF <br className="hidden sm:inline" />
              <span className="text-amber-200">ON YOUR FIRST ORDER</span>
            </h2>

            <p className="text-sm sm:text-base text-white/90 font-light max-w-xl">
              Subscribe to our newsletter & get exclusive offers, secret warehouse sales, new arrivals and style updates delivered to your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white max-w-md animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>You're in! Check your inbox for secret perks.</span>
                </div>
                <p className="text-xs text-white/90 mt-1">
                  Use coupon <span className="font-mono bg-white text-gray-900 px-2 py-0.5 rounded font-bold">FARIA10</span> at checkout for 10% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md pt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-md font-medium"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>SUBSCRIBE</span>
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </form>
            )}

            <div className="flex items-center gap-4 text-[11px] text-white/80 pt-1">
              <span>✓ No spam ever</span>
              <span>•</span>
              <span>✓ Instant discount code</span>
              <span>•</span>
              <span>✓ Unsubscribe anytime</span>
            </div>
          </div>

          {/* Right 3D Gift Box Visual Graphic */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
              {/* Glowing halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 to-amber-300 opacity-60 blur-2xl animate-pulse" />
              
              {/* Gift Presentation Icon Container */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-white/15 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center p-6 text-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-300 via-rose-400 to-fuchsia-500 flex items-center justify-center shadow-lg mb-3">
                  <Gift className="w-9 h-9 text-white drop-shadow-sm" />
                </div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-white">
                  VIP WELCOME BOX
                </span>
                <span className="text-[11px] text-amber-200 font-semibold mt-0.5">
                  Save Rs. 500+ Today
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Brand / Partner Strip (Sub-brands of FARIA COLLECTIONS) */}
      <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-100">
        <p className="text-center text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">
          THE FARIA LUXURY EDIT & SUB-LINES
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-gray-700">
          {SUB_BRANDS.map((brand, idx) => (
            <span
              key={idx}
              className="font-serif-heading text-sm sm:text-base tracking-[0.18em] font-bold uppercase hover:text-fuchsia-600 transition-colors cursor-pointer select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
