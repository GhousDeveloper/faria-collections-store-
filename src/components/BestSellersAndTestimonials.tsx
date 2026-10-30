import React from 'react';
import { ArrowRight, Star, CheckCircle, Quote } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, TESTIMONIALS } from '../data/products';
import { ProductCard } from './ProductCard';

export const BestSellersAndTestimonials: React.FC = () => {
  const { navigateTo } = useStore();
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* LEFT: BEST SELLERS (7 Columns on Desktop) */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 uppercase">
                BEST SELLERS
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-fuchsia-600 to-rose-600 rounded-full mt-1.5" />
            </div>

            <button
              type="button"
              onClick={() => navigateTo('catalog', null, 'bestseller')}
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-fuchsia-600 transition-colors uppercase tracking-wider"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-fuchsia-600" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* RIGHT: WHAT OUR CUSTOMERS SAY (5 Columns on Desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 uppercase">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-fuchsia-600 to-rose-600 rounded-full mt-1.5" />
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-between">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow relative"
              >
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[10px] text-gray-400 font-medium ml-1">5.0 Star Rating</span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed font-normal">
                  "{t.comment}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-8 h-8 rounded-full object-cover border border-fuchsia-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                        {t.name}
                        {t.verified && (
                          <CheckCircle className="w-3 h-3 text-emerald-500 fill-emerald-100" />
                        )}
                      </h4>
                      <p className="text-[10px] text-gray-400">{t.location}, Verified Buyer</p>
                    </div>
                  </div>

                  <Quote className="w-5 h-5 text-fuchsia-200" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
