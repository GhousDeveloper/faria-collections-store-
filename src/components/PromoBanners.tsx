import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromoBanners: React.FC = () => {
  const { navigateTo } = useStore();

  const banners = [
    {
      id: 'banner-summer',
      title: 'SUMMER COLLECTION',
      subtitle: 'Light, Breezy & Beautiful',
      bgGradient: 'from-violet-900 via-purple-900 to-indigo-950',
      badgeColor: 'text-violet-300',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=85',
      category: 'Dresses'
    },
    {
      id: 'banner-new',
      title: 'NEW ARRIVALS',
      subtitle: 'Fresh Styles Just For You',
      bgGradient: 'from-rose-600 via-pink-600 to-orange-500',
      badgeColor: 'text-amber-200',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=85',
      category: 'Co-Ord Sets'
    },
    {
      id: 'banner-party',
      title: 'PARTY WEAR',
      subtitle: 'Shine In Every Occasion',
      bgGradient: 'from-purple-950 via-fuchsia-950 to-indigo-950',
      badgeColor: 'text-pink-300',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=85',
      category: 'Dresses'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {banners.map((b) => (
          <div
            key={b.id}
            onClick={() => navigateTo('catalog', b.category)}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${b.bgGradient} text-white shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer h-52 sm:h-60 flex items-center justify-between p-6 sm:p-7 border border-white/10`}
          >
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-radial-at-c from-white/10 via-transparent to-black/20 pointer-events-none" />

            {/* Left Content */}
            <div className="relative z-10 max-w-[55%] flex flex-col justify-between h-full">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${b.badgeColor}`}>
                  CURATED EDIT
                </span>
                <h3 className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight leading-tight uppercase mt-1 drop-shadow-sm">
                  {b.title}
                </h3>
                <p className="text-xs text-white/80 font-light mt-1.5 leading-relaxed">
                  {b.subtitle}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-pink-100 group-hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5 text-fuchsia-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Fashion Model Image */}
            <div className="relative w-[45%] h-full flex items-center justify-end">
              <div className="w-36 sm:w-44 h-full rounded-xl overflow-hidden shadow-lg border-2 border-white/20 transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
