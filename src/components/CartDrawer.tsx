import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Plus, 
  Minus, 
  Truck, 
  Tag, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
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
    navigateTo 
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 999;
  const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={() => setIsCartDrawerOpen(false)} />

      {/* Drawer Container */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-fuchsia-600" />
            <h3 className="font-bold text-base sm:text-lg text-gray-900">
              Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-fuchsia-50/70 p-3.5 border-b border-fuchsia-100/60">
          <div className="flex items-center justify-between text-xs font-semibold text-fuchsia-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-fuchsia-600" />
              {amountNeeded > 0 ? (
                <>Add <strong className="text-fuchsia-700">Rs. {amountNeeded.toLocaleString()}</strong> more for FREE Shipping!</>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> You've unlocked FREE Shipping!
                </span>
              )}
            </span>
            <span>{progressToFreeShipping}%</span>
          </div>
          <div className="w-full h-1.5 bg-fuchsia-200/70 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-fuchsia-600 to-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-fuchsia-50 flex items-center justify-center text-fuchsia-400">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Your cart is currently empty</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Looks like you haven't added anything to your cart yet. Explore our fresh collection!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('catalog');
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="flex gap-3.5 p-3 rounded-xl border border-gray-100 hover:border-gray-200 bg-white transition-all shadow-2xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-24 object-cover object-top rounded-lg bg-gray-50 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-gray-400 hover:text-rose-500 p-0.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                        Size: {item.selectedSize}
                      </span>
                      <span>•</span>
                      <span className="truncate">Color: {item.selectedColor}</span>
                    </div>

                    <div className="mt-1 font-bold text-xs sm:text-sm text-gray-900">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                        className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                        className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Order Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/60 space-y-3">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Coupon (e.g. FARIA10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="w-full text-xs py-2 pl-8 pr-3 rounded-lg border border-gray-200 bg-white uppercase font-mono placeholder:normal-case focus:outline-none focus:border-fuchsia-500"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-bold uppercase transition-colors"
              >
                Apply
              </button>
            </form>

            {couponCode && (
              <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-200">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" /> Coupon '{couponCode}' applied!
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-Rs. {cartDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{cartShipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `Rs. ${cartShipping}`}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                <span>Estimated Total</span>
                <span className="text-fuchsia-950 font-extrabold">Rs. {cartFinalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout & View Cart Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('cart');
                }}
                className="w-full py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Full Cart
              </button>
            </div>

            <p className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe & Secure Checkout • 100% Satisfaction Guarantee</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
