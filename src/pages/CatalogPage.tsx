import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  X, 
  ChevronRight, 
  ArrowUpDown,
  Check,
  Star
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const CatalogPage: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, navigateTo } = useStore();

  const [selectedCat, setSelectedCat] = useState<string>(selectedCategory || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Available size options
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', 'Free Size'];

  // Toggle size filter
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCat('All');
    setMaxPrice(3500);
    setSelectedSizes([]);
    setMinRating(0);
    setSearchQuery('');
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCat !== 'All' && p.category !== selectedCat) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }
      // Rating filter
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // featured default
    });
  }, [selectedCat, searchQuery, maxPrice, selectedSizes, minRating, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={resetFilters} className="hover:text-fuchsia-600 transition-colors">
          Catalog
        </button>
        {selectedCat !== 'All' && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-gray-800">{selectedCat}</span>
          </>
        )}
        {searchQuery && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-fuchsia-600">"{searchQuery}"</span>
          </>
        )}
      </nav>

      {/* Catalog Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {selectedCat === 'All' ? 'Complete Collection' : selectedCat}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> items tailored for effortless elegance
          </p>
        </div>

        {/* Controls: Filter Button (Mobile), Sort & Grid Toggles */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4 text-fuchsia-600" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <span className="hidden sm:inline font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-gray-900 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {/* Grid/List View Toggle */}
          <div className="hidden sm:flex items-center border border-gray-200 rounded-xl overflow-hidden p-0.5 bg-gray-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-fuchsia-600' : 'text-gray-400 hover:text-gray-700'
              }`}
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-2xs text-fuchsia-600' : 'text-gray-400 hover:text-gray-700'
              }`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        
        {/* DESKTOP FILTER SIDEBAR (3 Columns) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="font-bold text-xs uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-fuchsia-600" /> Filters
            </span>
            {(selectedCat !== 'All' || maxPrice < 3500 || selectedSizes.length > 0 || minRating > 0 || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-rose-500 hover:underline font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              Categories
            </h4>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedCat('All')}
                className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                  selectedCat === 'All'
                    ? 'bg-fuchsia-50 text-fuchsia-700 font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>All Categories</span>
                <span>{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.slug)}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    selectedCat === cat.slug
                      ? 'bg-fuchsia-50 text-fuchsia-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-gray-400">
                    {PRODUCTS.filter((p) => p.category === cat.slug).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                Price Range
              </h4>
              <span className="text-xs font-bold text-fuchsia-700">
                Up to Rs. {maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={600}
              max={3500}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-fuchsia-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>Rs. 600</span>
              <span>Rs. 3,500</span>
            </div>
          </div>

          {/* Size Filter */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              Size
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {allSizes.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-fuchsia-600 text-white shadow-xs'
                        : 'border border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              Customer Rating
            </h4>
            <div className="space-y-1.5">
              {[4.8, 4.5, 4.0].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    minRating === rating ? 'bg-fuchsia-50 text-fuchsia-800 font-bold' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{rating} Stars & above</span>
                  </div>
                  {minRating === rating && <Check className="w-3.5 h-3.5 text-fuchsia-600" />}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* PRODUCTS GRID (9 Columns) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl p-8">
              <h3 className="font-serif-heading text-xl font-bold text-gray-800">
                No matching garments found
              </h3>
              <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto">
                Try widening your price range or clearing specific size filters to discover more items.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-shadow"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full sm:w-40 aspect-[3/4] object-cover rounded-xl bg-gray-50"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-fuchsia-600">
                        {p.category}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 mt-0.5">{p.name}</h3>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">{p.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-extrabold text-gray-900">
                          Rs. {p.price.toLocaleString()}
                        </span>
                        {p.originalPrice > p.price && (
                          <span className="text-xs text-gray-400 line-through">
                            Rs. {p.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-3">
                      <button
                        onClick={() => navigateTo('product-detail')}
                        className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white rounded-lg text-xs font-bold uppercase shadow-sm"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-gray-900 uppercase">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">Category</h4>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCat('All')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    selectedCat === 'All' ? 'bg-fuchsia-600 text-white' : 'bg-gray-100'
                  }`}
                >
                  All
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCat(c.slug)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      selectedCat === c.slug ? 'bg-fuchsia-600 text-white' : 'bg-gray-100'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">
                Price (Up to Rs. {maxPrice})
              </h4>
              <input
                type="range"
                min={600}
                max={3500}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-fuchsia-600"
              />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-fuchsia-600 text-white font-bold rounded-xl text-xs uppercase"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
