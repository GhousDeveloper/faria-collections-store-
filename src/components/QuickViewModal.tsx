import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    openProductDetail 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.sizes[0] || 'Standard';
  const currentColor = selectedColor || product.colors[0]?.name || 'Standard';
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentSize, currentColor);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => setQuickViewProduct(null)} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-900 flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative bg-gray-50 aspect-[3/4] md:h-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top"
          />
          {product.discountPercent > 0 && (
            <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
              -{product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto no-scrollbar">
          
          <div>
            <span className="text-[11px] font-bold text-fuchsia-600 uppercase tracking-wider">
              {product.category}
            </span>

            <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-gray-900 mt-1">
              {product.name}
            </h3>

            {/* Stars */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-2xl font-extrabold text-gray-950">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 mt-3 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="mt-4">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide block mb-2">
                  Color: <span className="font-normal text-gray-500">{currentColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        currentColor === c.name ? 'border-fuchsia-600 scale-110 shadow-sm' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {currentColor === c.name && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="mt-4">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide block mb-2">
                  Select Size:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currentSize === s
                          ? 'bg-fuchsia-600 text-white shadow-sm'
                          : 'border border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border border-gray-200 transition-colors ${
                  isWishlisted ? 'text-rose-500 bg-rose-50 border-rose-200' : 'text-gray-500 hover:text-rose-500'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                setQuickViewProduct(null);
                openProductDetail(product);
              }}
              className="w-full text-center text-xs text-fuchsia-700 hover:underline font-semibold py-1"
            >
              View Full Product Details →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
