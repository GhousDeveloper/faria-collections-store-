import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <footer className="w-full bg-[#0d0314] text-gray-300 pt-16 pb-12 border-t border-purple-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <div 
              onClick={() => navigateTo('home')} 
              className="cursor-pointer group flex flex-col items-start"
            >
              <div className="flex items-center gap-1">
                <span className="font-serif-heading text-2xl font-extrabold text-white">FARIA</span>
                <span className="font-serif-heading text-2xl font-light text-fuchsia-400">COLLECTIONS</span>
              </div>
              <span className="text-[8.5px] tracking-[0.25em] font-medium text-fuchsia-300 uppercase -mt-0.5">
                FASHION FOR EVERY MOMENT
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Your destination for premium fashion, timeless style and effortless elegance. Curating modern wardrobe essentials with high craftsmanship.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-fuchsia-600 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 border-l-2 border-fuchsia-500 pl-2">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', null, 'new')} className="hover:text-fuchsia-400 transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', 'Dresses')} className="hover:text-fuchsia-400 transition-colors">
                  Women
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', 'Tops')} className="hover:text-fuchsia-400 transition-colors">
                  Men
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', 'Ethnic Wear')} className="hover:text-fuchsia-400 transition-colors">
                  Kids & Teens
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog')} className="hover:text-fuchsia-400 transition-colors">
                  Collections
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog', null, 'sale')} className="text-rose-400 hover:text-rose-300 font-semibold">
                  Sale Edit %
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 border-l-2 border-fuchsia-500 pl-2">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-fuchsia-400 transition-colors">
                  Track Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-fuchsia-400 transition-colors">
                  Returns & Exchange
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog')} className="hover:text-fuchsia-400 transition-colors">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog')} className="hover:text-fuchsia-400 transition-colors">
                  Size Guide & Measurements
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog')} className="hover:text-fuchsia-400 transition-colors">
                  Help & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Information */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 border-l-2 border-fuchsia-500 pl-2">
              INFORMATION
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-400 transition-colors">
                  About FARIA COLLECTIONS
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-400 transition-colors">
                  Sustainability & Fabrics
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-400 transition-colors">
                  Store Locator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Us */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 border-l-2 border-fuchsia-500 pl-2">
              CONTACT US
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                <span>+92 300 7654321</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                <span className="truncate">support@fariacollections.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                <span>Mon – Sat: 10:00 AM – 8:00 PM</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-fuchsia-400 shrink-0 mt-0.5" />
                <span>FARIA Flagship Store, M.M. Alam Road, Gulberg III, Lahore, Pakistan</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <p>© 2026 FARIA COLLECTIONS. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400">Accepted Payments:</span>
            <div className="flex items-center gap-2 text-gray-300 font-mono text-[11px]">
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-bold">COD</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-blue-400 font-bold">VISA</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-orange-400 font-bold">MASTERCARD</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-teal-400 font-bold">EASYPAISA</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-red-400 font-bold">JAZZCASH</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
