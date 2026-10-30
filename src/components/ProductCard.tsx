import React from 'react';
import { Heart, Star, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  showNewBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showNewBadge = false }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    addToCart, 
    openProductDetail, 
    setQuickViewProduct 
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-xl border border-gray-100/80 hover:border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer" onClick={() => openProductDetail(product)}>
        
        {/* Main Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Discount Badge or NEW badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
          {showNewBadge || product.isNew ? (
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm tracking-wider">
              NEW
            </span>
          ) : product.discountPercent > 0 ? (
            <span className="bg-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
              -{product.discountPercent}%
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            isFavorited
              ? 'bg-rose-50 text-rose-500 scale-110'
              : 'bg-white/90 text-gray-500 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-1.5 px-3 bg-white/95 hover:bg-white text-gray-900 rounded-lg text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 backdrop-blur-xs transition-all hover:scale-[1.02]"
          >
            <Eye className="w-3.5 h-3.5 text-fuchsia-600" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        
        <div>
          {/* Category Tag */}
          <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 
            onClick={() => openProductDetail(product)}
            className="font-semibold text-sm text-gray-900 truncate hover:text-fuchsia-600 transition-colors cursor-pointer mt-0.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-bold text-sm sm:text-base text-gray-900">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* ADD TO CART Button */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="w-full py-2 px-3 rounded-lg border border-gray-200 hover:border-fuchsia-600 bg-gray-50 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-rose-600 hover:text-white text-gray-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 group/btn shadow-2xs hover:shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gray-600 group-hover/btn:text-white transition-colors" />
            <span>ADD TO CART</span>
          </button>
        </div>

      </div>
    </div>
  );
};
