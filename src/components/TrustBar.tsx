import React from 'react';
import { Award, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'PREMIUM QUALITY',
      description: 'Finest fabrics & trusted quality'
    },
    {
      icon: RotateCcw,
      title: 'EASY RETURNS',
      description: '7 days return & exchange'
    },
    {
      icon: ShieldCheck,
      title: 'SECURE PAYMENT',
      description: '100% safe & secure'
    },
    {
      icon: Truck,
      title: 'FAST DELIVERY',
      description: 'Quick delivery at your doorstep'
    }
  ];

  return (
    <section className="w-full bg-[#1e072b] border-y border-purple-900/40 py-8 sm:py-10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-4 text-white group cursor-default"
              >
                {/* Glowing Outline Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-fuchsia-500/30 flex items-center justify-center shrink-0 group-hover:border-fuchsia-400 group-hover:bg-purple-800/50 transition-all duration-300 shadow-[0_0_15px_rgba(192,38,211,0.15)]">
                  <Icon className="w-6 h-6 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
                </div>

                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white">
                    {b.title}
                  </h4>
                  <p className="text-xs text-purple-200/75 mt-0.5 font-light">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
