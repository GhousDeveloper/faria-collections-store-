import React, { useState } from 'react';
import { Truck, Sparkles, RefreshCw, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import heroModelImg from '../assets/images/glam_studio_model_1793038626898.jpg';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      badge: 'NEW SEASON',
      headline: 'Elevate Your Everyday Style',
      subtitle: 'Discover premium fashion curated for every mood, every moment.',
      discount: 'UP TO 60% OFF',
      image: heroModelImg,
      modelOutfit: 'Lavender Tailored Blazer Suit with Minimalist Accessories'
    },
    {
      badge: 'AUTUMN EDIT',
      headline: 'Effortless Charm & Timeless Grace',
      subtitle: 'Hand-crafted artisanal silhouettes tailored in pure natural silks and linened cuts.',
      discount: 'SPECIAL 40% OFF',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      modelOutfit: 'Terracotta Monochromatic Trousers & Statement Trench'
    },
    {
      badge: 'FESTIVE LUXE',
      headline: 'Glamour Crafted For Celebrations',
      subtitle: 'Exquisite evening wear, shimmering textures, and hand-embroidered heirlooms.',
      discount: 'BUY 2 GET 1',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85',
      modelOutfit: 'Vintage Botanical Blossom Flounce Midi Dress'
    }
  ];

  const current = slides[activeSlide];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#2f0743] via-[#7d1773] to-[#e64c65]">
      {/* Dynamic decorative backdrop curves and glossy floating elements matching reference */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right warm orange & coral fluid glow */}
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-orange-400 via-rose-500 to-fuchsia-600 opacity-60 blur-3xl transform rotate-12" />
        
        {/* Left deep purple glow */}
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-indigo-900/60 blur-3xl" />
        
        {/* Floating smooth spherical orb accents */}
        <div className="hidden lg:block absolute top-1/4 left-6 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-400 opacity-70 blur-xs shadow-2xl animate-float" />
        <div className="hidden lg:block absolute bottom-1/3 left-1/3 w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 opacity-60 blur-xs shadow-lg animate-float" style={{ animationDelay: '2s' }} />
        <div className="hidden lg:block absolute top-16 right-1/4 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 opacity-40 blur-xs animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 pb-16 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 text-white text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold tracking-wider uppercase text-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>{current.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight drop-shadow-sm text-white">
              {current.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-white/90 max-w-xl font-light leading-relaxed">
              {current.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigateTo('catalog')}
                className="px-7 py-3.5 rounded-lg bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 group"
              >
                <span>SHOP NOW</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('catalog', 'Co-Ord Sets')}
                className="px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                EXPLORE COLLECTION
              </button>
            </div>

            {/* 3 Benefit Bullets matching reference image */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-pink-300">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">FREE SHIPPING</p>
                  <p className="text-[11px] text-white/75">On orders above Rs. 999</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">PREMIUM QUALITY</p>
                  <p className="text-[11px] text-white/75">Finest materials</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-xs text-rose-300">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">EASY RETURNS</p>
                  <p className="text-[11px] text-white/75">Hassle free returns</p>
                </div>
              </div>

            </div>

            {/* Carousel slide indicator dots */}
            <div className="flex items-center gap-2 pt-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* RIGHT EDITORIAL IMAGE & FLOATING PROMO BADGE */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Glowing backdrop circle */}
            <div className="absolute w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full bg-gradient-to-tr from-fuchsia-500/40 via-rose-500/30 to-amber-400/40 blur-2xl -z-10" />

            {/* Model Image Frame */}
            <div className="relative w-full max-w-[380px] sm:max-w-[430px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-violet-950/30 aspect-[3/4] group">
              <img
                src={current.image}
                alt={current.headline}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay at bottom for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-pink-300 tracking-wider">FEATURED LOOK</span>
                  <p className="text-xs font-medium text-white truncate max-w-[220px]">
                    {current.modelOutfit}
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('catalog')}
                  className="px-3 py-1 bg-white text-gray-900 rounded-lg text-xs font-bold hover:bg-pink-100 transition-colors shadow-sm"
                >
                  Shop
                </button>
              </div>
            </div>

            {/* Floating Circular Badge: UP TO 60% OFF (Matching Reference) */}
            <div className="absolute -top-4 -right-2 sm:-right-4 sm:-top-4 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-amber-500 p-1 shadow-2xl flex items-center justify-center text-center animate-glow z-20">
              <div className="w-full h-full rounded-full border border-white/40 flex flex-col items-center justify-center p-2 text-white">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-amber-200">
                  UP TO
                </span>
                <span className="font-extrabold text-xl sm:text-2xl leading-none tracking-tight">
                  60%
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                  OFF
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
