import React from 'react';
import { Percent, Gift, Truck, CreditCard, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromoOfferStrip: React.FC = () => {
  const { navigateTo, applyCoupon } = useStore();

  const offers = [
    {
      id: 'offer-1',
      title: 'UP TO 60% OFF',
      subtitle: 'On Selected Items',
      icon: Percent,
      gradient: 'from-violet-700 via-purple-600 to-fuchsia-600',
      action: () => navigateTo('catalog', null, 'sale'),
      cta: 'Shop Sale'
    },
    {
      id: 'offer-2',
      title: 'BUY 2 GET 1 FREE',
      subtitle: 'On All Products',
      icon: Gift,
      gradient: 'from-rose-500 via-pink-500 to-orange-400',
      action: () => {
        applyCoupon('FARIA20');
        navigateTo('catalog');
      },
      cta: 'Claim Offer'
    },
    {
      id: 'offer-3',
      title: 'FREE SHIPPING',
      subtitle: 'Above Rs. 999 • Only For Today',
      icon: Truck,
      gradient: 'from-purple-800 via-indigo-700 to-blue-600',
      action: () => navigateTo('catalog'),
      cta: 'Explore'
    },
    {
      id: 'offer-4',
      title: 'EXTRA 10% OFF',
      subtitle: 'On Prepaid & Online Orders',
      icon: CreditCard,
      gradient: 'from-cyan-600 via-teal-600 to-blue-700',
      action: () => {
        applyCoupon('FARIA10');
        navigateTo('catalog');
      },
      cta: 'Code: FARIA10'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {offers.map((offer) => {
          const Icon = offer.icon;
          return (
            <div
              key={offer.id}
              onClick={offer.action}
              className={`cursor-pointer rounded-2xl p-4 sm:p-5 bg-gradient-to-r ${offer.gradient} text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group relative overflow-hidden`}
            >
              {/* Subtle background glow */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

              {/* Icon Container with Glass Effect */}
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/25 group-hover:rotate-6 transition-transform">
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-sm sm:text-base leading-tight tracking-tight uppercase drop-shadow-xs">
                  {offer.title}
                </h4>
                <p className="text-xs text-white/90 mt-0.5 font-light truncate">
                  {offer.subtitle}
                </p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-white/80 mt-1 group-hover:text-white">
                  <span>{offer.cta}</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
