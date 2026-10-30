import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  ChevronRight,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartFinalTotal, 
    couponCode, 
    applyCoupon, 
    removeCoupon, 
    navigateTo, 
    toggleWishlist 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingThreshold = 999;
  const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-gray-900">Shopping Cart</span>
      </nav>

      <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-8">
        <div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-gray-950">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review your selected fashion items and proceed to secure checkout.
          </p>
        </div>
        <button
          onClick={() => navigateTo('catalog')}
          className="text-xs font-bold text-fuchsia-600 hover:underline uppercase"
        >
          Continue Shopping →
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-3xl p-8 max-w-xl mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="font-serif-heading text-xl font-bold text-gray-900">Your Shopping Cart is Empty</h3>
          <p className="text-xs text-gray-500">
            Looks like you haven't chosen any items yet. Discover our fresh arrivals and curated suits.
          </p>
          <button
            onClick={() => navigateTo('catalog')}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: CART ITEMS (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free shipping alert banner */}
            <div className="p-4 rounded-2xl bg-fuchsia-50/70 border border-fuchsia-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs text-fuchsia-950 font-medium">
                <Truck className="w-5 h-5 text-fuchsia-600 shrink-0" />
                {amountNeeded > 0 ? (
                  <span>Add <strong className="text-fuchsia-700">Rs. {amountNeeded.toLocaleString()}</strong> more to enjoy FREE SHIPPING across Pakistan!</span>
                ) : (
                  <span className="text-emerald-700 font-bold">🎉 Congratulations! You have unlocked FREE Shipping on this order.</span>
                )}
              </div>
              <span className="text-xs font-bold text-fuchsia-700 hidden sm:inline">{progressToFreeShipping}%</span>
            </div>

            <div className="divide-y divide-gray-100 border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-xs">
              {cart.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 sm:w-24 aspect-[3/4] object-cover rounded-xl bg-gray-50 shrink-0"
                  />

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold text-fuchsia-600">
                      {item.product.category}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-gray-950 mt-0.5 truncate">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-gray-500 mt-1">
                      <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">
                        Size: {item.selectedSize}
                      </span>
                      <span>•</span>
                      <span>Color: {item.selectedColor}</span>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                      <button
                        onClick={() => toggleWishlist(item.product)}
                        className="text-[11px] text-gray-500 hover:text-rose-500 font-medium flex items-center gap-1"
                      >
                        <Heart className="w-3.5 h-3.5" /> Save for later
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-[11px] text-rose-500 hover:underline font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                      className="p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-extrabold text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                      className="p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right sm:w-28">
                    <div className="text-base sm:text-lg font-extrabold text-gray-950">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                    <span className="text-[11px] text-gray-400">
                      Rs. {item.product.price.toLocaleString()} each
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT: ORDER SUMMARY (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-md space-y-4">
              <h3 className="font-bold text-base text-gray-900 pb-3 border-b border-gray-100 uppercase tracking-wide">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-xl border border-gray-200 uppercase font-mono focus:outline-none focus:border-fuchsia-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase hover:bg-black"
                >
                  Apply
                </button>
              </form>

              {couponCode && (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-xs font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    Coupon '{couponCode}' applied
                  </span>
                  <button onClick={removeCoupon} className="text-rose-600 underline text-[11px]">
                    Remove
                  </button>
                </div>
              )}

              <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-Rs. {cartDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cartShipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `Rs. ${cartShipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-950 pt-3 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-fuchsia-950">Rs. {cartFinalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('checkout')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-rose-600 to-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-[11px] text-gray-400 space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Encrypted 256-bit SSL Checkout</span>
                </p>
                <p>Cash on Delivery & Bank Transfer Supported</p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
