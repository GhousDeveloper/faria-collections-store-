import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Settings, 
  Clock, 
  Truck, 
  CheckCircle, 
  ChevronRight, 
  Phone, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const { orders, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-gray-900">My Account</span>
      </nav>

      {/* Account Profile Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-violet-950 via-purple-900 to-fuchsia-900 text-white shadow-xl mb-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-300 via-rose-400 to-fuchsia-400 p-1">
            <div className="w-full h-full rounded-full bg-purple-950 flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl">
              AT
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1">
              ★ VIP Gold Member
            </div>
            <h1 className="font-serif-heading text-xl sm:text-2xl font-bold">Amina Tariq</h1>
            <p className="text-xs text-purple-200/80">amina.t@example.com • Islamabad, Pakistan</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('catalog')}
            className="px-5 py-2.5 rounded-xl bg-white text-gray-900 text-xs font-bold uppercase tracking-wider hover:bg-pink-100 transition-colors shadow-sm"
          >
            Shop New Arrivals
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'orders' ? 'bg-fuchsia-50 text-fuchsia-700 shadow-2xs' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Package className="w-4 h-4 text-fuchsia-600" />
            <span>Orders & Tracking ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'addresses' ? 'bg-fuchsia-50 text-fuchsia-700 shadow-2xs' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MapPin className="w-4 h-4 text-fuchsia-600" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'profile' ? 'bg-fuchsia-50 text-fuchsia-700 shadow-2xs' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="w-4 h-4 text-fuchsia-600" />
            <span>Profile & Security</span>
          </button>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 mt-6 text-xs text-gray-500 space-y-2">
            <h5 className="font-bold text-gray-800 uppercase tracking-wider">Customer Concierge</h5>
            <p>Need help with sizing or exchange?</p>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-fuchsia-600 font-bold hover:underline"
            >
              <Phone className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9">
          
          {/* ORDERS & TRACKING TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-bold text-base text-gray-900 uppercase tracking-wide">
                Your Order History
              </h3>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl p-6">
                  <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-5">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">Order #{ord.id}</span>
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">Placed on {ord.date} • {ord.paymentMethod}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-gray-950">Rs. {ord.total.toLocaleString()}</span>
                        <p className="text-[10px] text-gray-400">Total Paid / Payable</p>
                      </div>
                    </div>

                    {/* Tracking Timeline */}
                    <div className="py-2">
                      <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                        Live Tracking Status
                      </h5>
                      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold text-gray-600 relative">
                        <div className="space-y-1">
                          <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <span className="text-emerald-700 font-bold block">Order Placed</span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Package className="w-4 h-4" />
                          </div>
                          <span className="text-emerald-700 font-bold block">Processing</span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-7 h-7 mx-auto rounded-full bg-fuchsia-600 text-white flex items-center justify-center shadow-xs animate-pulse">
                            <Truck className="w-4 h-4" />
                          </div>
                          <span className="text-fuchsia-700 font-bold block">Dispatched</span>
                        </div>
                        <div className="space-y-1 opacity-40">
                          <div className="w-7 h-7 mx-auto rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <span className="block">Delivered</span>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3 pt-3 border-t border-gray-100">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img
                            src={it.product.image}
                            alt={it.product.name}
                            className="w-12 h-16 object-cover rounded-lg bg-gray-50 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-xs text-gray-900 truncate">{it.product.name}</h5>
                            <p className="text-[11px] text-gray-500">Size: {it.selectedSize} • Color: {it.selectedColor} • Qty: {it.quantity}</p>
                          </div>
                          <span className="font-bold text-xs text-gray-900">
                            Rs. {(it.product.price * it.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-500 flex items-center justify-between">
                      <span>Shipping to: <strong>{ord.shippingAddress.address}, {ord.shippingAddress.city}</strong></span>
                      <span className="text-fuchsia-700 font-semibold">{ord.shippingAddress.phone}</span>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-gray-900 uppercase tracking-wide">
                Saved Delivery Addresses
              </h3>
              <div className="p-4 rounded-2xl border-2 border-fuchsia-500/50 bg-fuchsia-50/20 relative space-y-2 text-xs">
                <span className="bg-fuchsia-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Default Address
                </span>
                <h4 className="font-bold text-gray-900 text-sm">Amina Tariq</h4>
                <p className="text-gray-600">House 42, Street 8, Sector F-7/2, Islamabad, 44000</p>
                <p className="text-gray-500">Phone: +92 300 1234567</p>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-base text-gray-900 uppercase tracking-wide">
                Account Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-500 font-semibold block mb-1">Full Name</label>
                  <input type="text" readOnly value="Amina Tariq" className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50" />
                </div>
                <div>
                  <label className="text-gray-500 font-semibold block mb-1">Email</label>
                  <input type="text" readOnly value="amina.t@example.com" className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50" />
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
