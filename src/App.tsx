/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PromoOfferStrip } from './components/PromoOfferStrip';
import { ShopByCategory } from './components/ShopByCategory';
import { TrendingNow } from './components/TrendingNow';
import { PromoBanners } from './components/PromoBanners';
import { NewArrivals } from './components/NewArrivals';
import { TrustBar } from './components/TrustBar';
import { BestSellersAndTestimonials } from './components/BestSellersAndTestimonials';
import { InstagramSection } from './components/InstagramSection';
import { NewsletterAndBrands } from './components/NewsletterAndBrands';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/ToastContainer';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';

const MainContent: React.FC = () => {
  const { pageView, navigateTo, setIsSearchOpen, setIsCartDrawerOpen, cartTotalCount, wishlist } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-fuchsia-100 selection:text-fuchsia-900">
      <Navbar />

      <main className="flex-1">
        {pageView === 'home' && (
          <>
            <HeroSection />
            <PromoOfferStrip />
            <ShopByCategory />
            <TrendingNow />
            <PromoBanners />
            <NewArrivals />
            <TrustBar />
            <BestSellersAndTestimonials />
            <InstagramSection />
            <NewsletterAndBrands />
          </>
        )}

        {pageView === 'catalog' && <CatalogPage />}
        {pageView === 'product-detail' && <ProductDetailPage />}
        {pageView === 'cart' && <CartPage />}
        {pageView === 'checkout' && <CheckoutPage />}
        {pageView === 'wishlist' && <WishlistPage />}
        {pageView === 'account' && <AccountPage />}
      </main>

      <Footer />

      {/* Floating Bottom Navigation Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-30 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            pageView === 'home' ? 'text-fuchsia-600' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <button
          onClick={() => navigateTo('catalog')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            pageView === 'catalog' ? 'text-fuchsia-600' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-fuchsia-600 to-rose-600 flex items-center justify-center text-white text-xs font-bold -mt-2 shadow-md">
            FC
          </div>
          <span className="mt-0.5">Shop</span>
        </button>

        <button
          onClick={() => navigateTo('wishlist')}
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            pageView === 'wishlist' ? 'text-fuchsia-600' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span>Wishlist</span>
        </button>

        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center gap-0.5 text-[10px] font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartTotalCount > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 rounded-full bg-fuchsia-600 text-white text-[9px] font-bold flex items-center justify-center">
              {cartTotalCount}
            </span>
          )}
          <span>Cart</span>
        </button>
      </div>

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
