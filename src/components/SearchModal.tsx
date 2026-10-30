import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Tag, Sparkles, TrendingUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductDetail, navigateTo } = useStore();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const popularSearches = [
    'Floral Maxi Dress',
    'Linen Oversized Shirt',
    'Co-Ord Set',
    'Denim Jacket',
    'Kurta Set',
    'Palazzo Pants'
  ];

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full bg-white shadow-2xl border-b border-gray-100 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto w-full p-4 sm:p-6">
          
          {/* Search Header Form */}
          <div className="flex items-center gap-3 border-b-2 border-fuchsia-600 pb-3">
            <Search className="w-6 h-6 text-fuchsia-600 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for dresses, co-ords, linen shirts, ethnic wear..."
              className="w-full text-base sm:text-xl font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Categories Bar */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Tag className="w-3 h-3 text-fuchsia-500" /> Categories:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  navigateTo('catalog', cat.slug);
                }}
                className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-fuchsia-100 hover:text-fuchsia-700 text-xs font-medium text-gray-700 shrink-0 transition-colors"
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Results or Suggestions */}
          <div className="mt-4 overflow-y-auto max-h-[55vh] pr-2 no-scrollbar">
            {query.trim() === '' ? (
              <div className="py-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  <span>Popular Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 hover:border-fuchsia-500 hover:text-fuchsia-600 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-3 py-2">
                <div className="flex items-center justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                  <span>Found {filteredProducts.length} matching items</span>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('catalog', null, query);
                    }}
                    className="text-fuchsia-600 font-bold hover:underline"
                  >
                    View all results →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        openProductDetail(p);
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-16 object-cover rounded-lg bg-gray-100 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          {p.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs sm:text-sm font-bold text-gray-900">
                            Rs. {p.price.toLocaleString()}
                          </span>
                          {p.originalPrice > p.price && (
                            <span className="text-[11px] text-gray-400 line-through">
                              Rs. {p.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-600 font-medium">No products found matching "{query}"</p>
                <p className="text-xs text-gray-400 mt-1">Try checking for typos or searching for a category like "Dresses" or "Co-ord sets".</p>
              </div>
            )}
          </div>

        </div>
      </div>
      <div className="flex-1" onClick={() => setIsSearchOpen(false)} />
    </div>
  );
};
