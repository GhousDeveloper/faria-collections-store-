import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export const NewArrivals: React.FC = () => {
  const { navigateTo } = useStore();
  const carouselRef = useRef<HTMLDivElement>(null);

  const newProducts = PRODUCTS.filter((p) => p.isNew);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 uppercase">
            NEW ARRIVALS
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-fuchsia-600 to-rose-600 rounded-full mt-1.5" />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigateTo('catalog', null, 'new')}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-fuchsia-600 transition-colors uppercase tracking-wider"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-fuchsia-600" />
          </button>

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-2xs hover:border-gray-400 transition-colors"
              aria-label="Previous Products"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-2xs hover:border-gray-400 transition-colors"
              aria-label="Next Products"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Carousel Grid */}
      <div
        ref={carouselRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
      >
        {newProducts.map((product) => (
          <div
            key={product.id}
            className="w-[200px] sm:w-[220px] md:w-[240px] flex-shrink-0"
          >
            <ProductCard product={product} showNewBadge={true} />
          </div>
        ))}
      </div>
    </section>
  );
};
