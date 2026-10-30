import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export const ShopByCategory: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 uppercase">
            SHOP BY CATEGORY
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-fuchsia-600 to-rose-600 rounded-full mt-1.5" />
        </div>

        <button
          type="button"
          onClick={() => navigateTo('catalog')}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-fuchsia-600 transition-colors uppercase tracking-wider"
        >
          <span>VIEW ALL</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-fuchsia-600" />
        </button>
      </div>

      {/* Circular Categories Grid / Horizontal Scroll for Mobile */}
      <div className="flex items-center justify-between gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigateTo('catalog', cat.slug)}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
          >
            {/* Outer Circular Disk Container */}
            <div 
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl flex items-center justify-center border-2 border-transparent group-hover:border-fuchsia-400"
              style={{ backgroundColor: cat.bgColor }}
            >
              {/* Inner Circle with Image */}
              <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-xs">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Pulsing subtle ring on hover */}
              <div className="absolute inset-0 rounded-full border border-fuchsia-500/0 group-hover:border-fuchsia-500/30 transition-all pointer-events-none" />
            </div>

            {/* Category Name */}
            <span className="mt-3 text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wide group-hover:text-fuchsia-600 transition-colors text-center">
              {cat.name}
            </span>
            <span className="text-[11px] text-gray-400 font-medium -mt-0.5">
              {cat.count}+ Items
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
