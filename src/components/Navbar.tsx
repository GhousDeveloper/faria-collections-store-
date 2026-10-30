import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Flame,
  Phone,
  Truck,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export const Navbar: React.FC = () => {
  const { 
    cartTotalCount, 
    wishlist, 
    navigateTo, 
    pageView, 
    setIsCartDrawerOpen, 
    setIsSearchOpen,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [localSearchInput, setLocalSearchInput] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchInput.trim()) {
      setSearchQuery(localSearchInput);
      navigateTo('catalog', null, localSearchInput);
      setLocalSearchInput('');
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { label: 'HOME', action: () => navigateTo('home') },
    { label: 'NEW ARRIVALS', action: () => navigateTo('catalog', null, 'new') },
    { label: 'WOMEN', action: () => navigateTo('catalog', 'Dresses') },
    { label: 'MEN', action: () => navigateTo('catalog', 'Tops') },
    { label: 'KIDS', action: () => navigateTo('catalog', 'Ethnic Wear') },
    { label: 'COLLECTIONS', action: () => navigateTo('catalog') },
    { 
      label: 'SALE', 
      action: () => navigateTo('catalog', null, 'sale'), 
      badge: 'HOT',
      badgeColor: 'bg-rose-500 text-white' 
    },
    { label: 'BLOG', action: () => navigateTo('home') },
    { label: 'CONTACT US', action: () => navigateTo('home') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white transition-all duration-300">
      {/* Top micro-announcement bar */}
      <div className="bg-gradient-to-r from-violet-900 via-fuchsia-800 to-rose-700 text-white text-[11px] font-medium tracking-wider py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-normal">
              <Sparkles className="w-3 h-3 text-amber-300" /> PROMO
            </span>
            <span>GET 10% OFF YOUR FIRST ORDER WITH CODE: <strong className="text-amber-300">FARIA10</strong></span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[11px] text-white/90">
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-amber-300" /> Free Shipping Above Rs. 999
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-white" onClick={() => navigateTo('account')}>
              Track Order
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">PKR (Rs.)</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`border-b border-gray-100 transition-all duration-200 ${isScrolled ? 'shadow-md py-2.5' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Mobile menu trigger */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-fuchsia-700 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* BRAND LOGO */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer group flex flex-col items-start select-none"
          >
            <div className="flex items-center gap-1">
              <span className="font-serif-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 group-hover:text-fuchsia-900 transition-colors">
                FARIA
              </span>
              <span className="font-serif-heading text-2xl sm:text-3xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-rose-600">
                COLLECTIONS
              </span>
            </div>
            <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.25em] font-medium text-gray-500 uppercase -mt-1 group-hover:text-gray-700">
              FASHION FOR EVERY MOMENT
            </span>
          </div>

          {/* SEARCH BAR (CENTER) */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg mx-4 items-center relative"
          >
            <input 
              type="text"
              placeholder="Search for products, brands and more..."
              value={localSearchInput}
              onChange={(e) => setLocalSearchInput(e.target.value)}
              onClick={() => setIsSearchOpen(true)}
              className="w-full bg-gray-50/90 border border-gray-200 rounded-full py-2.5 pl-4 pr-12 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 focus:bg-white focus:ring-2 focus:ring-fuchsia-100 transition-all"
            />
            <button 
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white flex items-center justify-center hover:opacity-95 shadow-sm transition-all"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* RIGHT ACTION ICONS */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search icon for mobile */}
            <button 
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-gray-700 hover:text-fuchsia-700"
              aria-label="Open Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button 
              type="button"
              onClick={() => navigateTo('wishlist')}
              className="p-2 relative text-gray-700 hover:text-fuchsia-700 transition-colors flex flex-col items-center"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden xl:inline text-[11px] font-medium text-gray-600 mt-0.5">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute 0 top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                className="p-2 text-gray-700 hover:text-fuchsia-700 transition-colors flex flex-col items-center"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
                <span className="hidden xl:inline text-[11px] font-medium text-gray-600 mt-0.5">Account</span>
              </button>

              {/* Account Dropdown */}
              {showAccountDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-sm animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setShowAccountDropdown(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Welcome back!</p>
                    <p className="font-semibold text-gray-900">Amina Tariq</p>
                    <p className="text-[11px] text-fuchsia-600 font-medium">VIP Gold Member</p>
                  </div>
                  <button 
                    onClick={() => { setShowAccountDropdown(false); navigateTo('account'); }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700 font-medium transition-colors"
                  >
                    My Orders & Tracking
                  </button>
                  <button 
                    onClick={() => { setShowAccountDropdown(false); navigateTo('wishlist'); }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700 font-medium transition-colors"
                  >
                    My Wishlist ({wishlist.length})
                  </button>
                  <button 
                    onClick={() => { setShowAccountDropdown(false); navigateTo('account'); }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700 font-medium transition-colors"
                  >
                    Saved Addresses
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button 
                      onClick={() => setShowAccountDropdown(false)}
                      className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 text-xs font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button 
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 relative text-gray-700 hover:text-fuchsia-700 transition-colors flex flex-col items-center"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-800" />
                <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartTotalCount}
                </span>
              </div>
              <span className="hidden xl:inline text-[11px] font-medium text-gray-600 mt-0.5">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav className="hidden lg:block border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-7 py-3 text-[13px] font-semibold tracking-wide text-gray-700">
            {navLinks.map((link) => (
              <li key={link.label} className="relative">
                <button
                  type="button"
                  onClick={link.action}
                  className="hover:text-fuchsia-700 transition-colors uppercase flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className={pageView === 'catalog' && link.label === 'COLLECTIONS' ? 'text-fuchsia-700' : ''}>
                    {link.label}
                  </span>
                  {link.badge && (
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full ${link.badgeColor}`}>
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-fuchsia-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <span className="font-serif-heading text-xl font-extrabold text-gray-900">FARIA</span>
                <span className="font-serif-heading text-xl font-light text-fuchsia-600 ml-1">COLLECTIONS</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <input 
                  type="text"
                  placeholder="Search catalog..."
                  value={localSearchInput}
                  onChange={(e) => setLocalSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit(e);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-fuchsia-500"
                />
                <button 
                  onClick={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-fuchsia-600"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      link.action();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-gray-800 hover:bg-fuchsia-50 hover:text-fuchsia-700 flex items-center justify-between transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-300" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Shop Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        navigateTo('catalog', cat.slug);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-xs font-medium text-gray-700 hover:text-fuchsia-700 py-1.5 px-2 rounded hover:bg-gray-50"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-fuchsia-600" /> WhatsApp: +92 300 7654321
                </p>
                <p>Support: 10:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
