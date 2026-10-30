import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigateTo, openProductDetail } = useStore();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-gray-900">My Wishlist</span>
      </nav>

      <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-8">
        <div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-gray-950">
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Keep track of your favorite styles and easily move them to your bag when you're ready.
          </p>
        </div>
        <button
          onClick={() => navigateTo('catalog')}
          className="text-xs font-bold text-fuchsia-600 hover:underline uppercase"
        >
          Explore More →
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl p-8 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif-heading text-xl font-bold text-gray-900">Your Wishlist is Empty</h3>
          <p className="text-xs text-gray-500">
            Tap the heart icon on any product card while browsing to save it here for later.
          </p>
          <button
            onClick={() => navigateTo('catalog')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-95"
          >
            Start Browsing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer" onClick={() => openProductDetail(product)}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {product.discountPercent > 0 && (
                  <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                    -{product.discountPercent}%
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-rose-500 hover:bg-white flex items-center justify-center shadow-sm"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => openProductDetail(product)}
                    className="font-semibold text-sm text-gray-900 truncate hover:text-fuchsia-600 cursor-pointer mt-0.5"
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-bold text-sm text-gray-950">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
