import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Phone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartFinalTotal, 
    placeOrder, 
    navigateTo 
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: 'Amina Tariq',
    email: 'amina.t@example.com',
    phone: '+92 300 1234567',
    address: 'House 42, Street 8, Sector F-7/2',
    city: 'Islamabad',
    postalCode: '44000',
    notes: 'Please call before delivery'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'wallet' | 'bank'>('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const cities = [
    'Islamabad',
    'Lahore',
    'Karachi',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const shippingCost = shippingMethod === 'express' ? 300 : cartShipping;
  const finalOrderTotal = Math.max(0, cartSubtotal - cartDiscount + shippingCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const paymentLabel = 
      paymentMethod === 'cod' ? 'Cash on Delivery (COD)' :
      paymentMethod === 'card' ? 'Credit / Debit Card' :
      paymentMethod === 'wallet' ? 'EasyPaisa / JazzCash' : 'Bank Transfer';

    const newOrder = placeOrder({
      items: cart,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: shippingCost,
      total: finalOrderTotal,
      shippingAddress: formData,
      paymentMethod: paymentLabel
    });

    setConfirmedOrder(newOrder);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-in zoom-in-95 duration-300">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-600">
              THANK YOU FOR SHOPPING WITH FARIA COLLECTIONS!
            </span>
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-gray-950 mt-1">
              Your Order Has Been Confirmed
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              We've received your order and our styling team is preparing your package.
            </p>
          </div>

          {/* Order Details Receipt Card */}
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Order Reference:</span>
              <span className="font-mono font-extrabold text-fuchsia-900">{confirmedOrder.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Delivery:</span>
              <span className="font-bold text-gray-900">2 - 3 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Address:</span>
              <span className="font-medium text-gray-900 text-right">{formData.address}, {formData.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-bold text-gray-900">{confirmedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-extrabold text-gray-950">
              <span>Total Payable:</span>
              <span className="text-fuchsia-900">Rs. {confirmedOrder.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('account')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Track Order In Account
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95"
            >
              Continue Shopping
            </button>
          </div>

          <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5 pt-2">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Need updates? Contact our VIP WhatsApp support at +92 300 7654321</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <button onClick={() => navigateTo('cart')} className="hover:text-fuchsia-600 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-gray-900">Secure Checkout</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-gray-950">
          Checkout & Shipping
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Complete your delivery details to finalize your order.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT: SHIPPING & PAYMENT FORM (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs flex items-center justify-center font-bold">1</span>
              <span>Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">Phone Number (For Courier SMS / Call) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+92 300 0000000"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-fuchsia-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs flex items-center justify-center font-bold">2</span>
              <span>Shipping Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">Street Address, House / Apartment *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">City *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-fuchsia-500 bg-white"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">Special Delivery Instructions (Optional)</label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-fuchsia-500"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs flex items-center justify-center font-bold">3</span>
              <span>Delivery Method</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label 
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  shippingMethod === 'standard' ? 'border-fuchsia-600 bg-fuchsia-50/40 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                  className="mt-0.5 accent-fuchsia-600"
                />
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-fuchsia-600" />
                    <span>Standard Courier (2-4 Days)</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">TCS / Trax / Leopards tracking</p>
                  <p className="text-xs font-extrabold text-emerald-700 mt-1">
                    {cartShipping === 0 ? 'FREE' : `Rs. ${cartShipping}`}
                  </p>
                </div>
              </label>

              <label 
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  shippingMethod === 'express' ? 'border-fuchsia-600 bg-fuchsia-50/40 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                  className="mt-0.5 accent-fuchsia-600"
                />
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Express VIP (Next Day)</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">Priority dispatch & handling</p>
                  <p className="text-xs font-extrabold text-gray-900 mt-1">
                    Rs. 300
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs flex items-center justify-center font-bold">4</span>
              <span>Payment Option</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <label 
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'cod' ? 'border-fuchsia-600 bg-fuchsia-50/40 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-fuchsia-600"
                  />
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="font-bold text-gray-900 block">Cash on Delivery (COD)</span>
                    <span className="text-[11px] text-gray-500">Pay cash upon package arrival at your doorstep</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Most Popular
                </span>
              </label>

              <label 
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'card' ? 'border-fuchsia-600 bg-fuchsia-50/40 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-fuchsia-600"
                  />
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="font-bold text-gray-900 block">Credit / Debit Card</span>
                    <span className="text-[11px] text-gray-500">Visa, Mastercard, UnionPay, PayPak</span>
                  </div>
                </div>
              </label>

              <label 
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'wallet' ? 'border-fuchsia-600 bg-fuchsia-50/40 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="accent-fuchsia-600"
                  />
                  <Smartphone className="w-5 h-5 text-teal-600" />
                  <div>
                    <span className="font-bold text-gray-900 block">EasyPaisa / JazzCash Mobile Wallet</span>
                    <span className="text-[11px] text-gray-500">Direct mobile wallet payment</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* RIGHT: ORDER SUMMARY (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-md space-y-4 sticky top-28">
            <h3 className="font-bold text-base text-gray-900 pb-3 border-b border-gray-100 uppercase tracking-wide">
              Your Items ({cart.length})
            </h3>

            {/* Product items mini list */}
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 pr-1 no-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-16 object-cover rounded-lg bg-gray-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-xs text-gray-900 truncate">{item.product.name}</h5>
                    <p className="text-[11px] text-gray-400">Qty: {item.quantity} • {item.selectedSize}</p>
                    <p className="font-bold text-xs text-gray-900 mt-0.5">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-gray-900">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher Discount</span>
                  <span>-Rs. {cartDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{shippingCost === 0 ? <strong className="text-emerald-600">FREE</strong> : `Rs. ${shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-gray-950 pt-3 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-fuchsia-950 text-xl">Rs. {finalOrderTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-rose-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-amber-200" />
              <span>PLACE ORDER NOW</span>
            </button>

            <div className="text-center text-[10px] text-gray-400 pt-2 space-y-1">
              <p>By placing order, you agree to our Terms and 7-day Return Policy.</p>
              <p>Free exchanges on size mismatch available nationwide.</p>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
