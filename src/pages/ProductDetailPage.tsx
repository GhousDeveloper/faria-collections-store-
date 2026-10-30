import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  Ruler, 
  Share2, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    navigateTo, 
    setIsCartDrawerOpen, 
    addToast 
  } = useStore();

  const product = selectedProduct || PRODUCTS[0];
  
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'fabric' | 'shipping' | 'reviews'>('desc');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied!', 'Product link copied to clipboard.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-fuchsia-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('catalog', product.category)} className="hover:text-fuchsia-600">
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-gray-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* LEFT: GALLERY (7 Columns on Desktop) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails list */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
            {product.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImage === imgUrl ? 'border-fuchsia-600 shadow-md scale-102' : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>

          {/* Large Main Photo */}
          <div className="flex-1 relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-lg group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                -{product.discountPercent}% OFF
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-all"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* RIGHT: PURCHASE CONTROLS (5 Columns on Desktop) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <span className="text-xs font-bold text-fuchsia-600 uppercase tracking-widest">
              FARIA COLLECTIONS • {product.category}
            </span>
            <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 mt-1 leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewsCount} verified customer reviews)</span>
            </div>

            {/* Pricing block */}
            <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-gray-100">
              <span className="text-3xl font-extrabold text-gray-950 font-serif-heading">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Inclusive of all sales taxes</p>
          </div>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
                <span>Color: <span className="font-normal text-gray-500">{selectedColor}</span></span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === c.name ? 'border-fuchsia-600 scale-110 shadow-md ring-2 ring-fuchsia-200' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && <Check className="w-4 h-4 text-white drop-shadow-sm" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection + Size Guide Modal Trigger */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
              <span>Select Size: <span className="font-normal text-gray-500">{selectedSize}</span></span>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="inline-flex items-center gap-1 text-[11px] text-fuchsia-600 hover:underline normal-case font-semibold"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-11 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedSize === s
                      ? 'bg-fuchsia-600 text-white shadow-md'
                      : 'border border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-100 rounded-l-xl transition-colors font-bold"
              >
                -
              </button>
              <span className="px-4 text-xs font-extrabold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-100 rounded-r-xl transition-colors font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border border-gray-200 transition-all ${
                  isFavorited ? 'text-rose-500 bg-rose-50 border-rose-200' : 'text-gray-500 hover:text-rose-500 hover:border-rose-200'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>BUY NOW • CASH ON DELIVERY / CARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Store Guarantee Box */}
          <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-2.5 text-xs text-gray-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-fuchsia-600" />
              <span><strong>Free Shipping:</strong> On orders above Rs. 999 across all Pakistan.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-fuchsia-600" />
              <span><strong>7-Day Returns:</strong> Hassle-free exchange policy.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-fuchsia-600" />
              <span><strong>Authenticity Guarantee:</strong> 100% genuine craftsmanship and materials.</span>
            </div>
          </div>

        </div>

      </div>

      {/* TABBED DETAILS SECTION */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex items-center gap-8 border-b border-gray-200 text-sm font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'desc' ? 'text-fuchsia-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Description
            {activeTab === 'desc' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-fuchsia-600" />}
          </button>
          <button
            onClick={() => setActiveTab('fabric')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'fabric' ? 'text-fuchsia-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Fabric & Care
            {activeTab === 'fabric' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-fuchsia-600" />}
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'shipping' ? 'text-fuchsia-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Shipping & Returns
            {activeTab === 'shipping' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-fuchsia-600" />}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'reviews' ? 'text-fuchsia-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Customer Reviews ({product.reviewsCount})
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-fuchsia-600" />}
          </button>
        </div>

        <div className="py-6 text-sm text-gray-700 leading-relaxed max-w-3xl">
          {activeTab === 'desc' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                <li>Designed for modern comfort and versatility.</li>
                <li>Finished with reinforced contrast seam stitching.</li>
                <li>Tailored fit with relaxed drape for daytime and evening styling.</li>
              </ul>
            </div>
          )}

          {activeTab === 'fabric' && (
            <div className="space-y-3">
              <h5 className="font-bold text-gray-900">Composition & Craftsmanship:</h5>
              <p>{product.fabricDetails}</p>
              <h5 className="font-bold text-gray-900 pt-2">Wash Care Guidelines:</h5>
              <p className="text-xs text-gray-600">
                Gentle cold hand wash or machine cycle at 30°C. Do not bleach. Line dry in shade. Warm iron on reverse side.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 text-xs text-gray-600">
              <p><strong>Standard Delivery:</strong> 2-4 business days nationwide (Karachi, Lahore, Islamabad, Peshawar, Quetta, Multan, Faisalabad).</p>
              <p><strong>Express Delivery:</strong> Next-day delivery available for Lahore and Karachi.</p>
              <p><strong>Returns & Exchanges:</strong> If you are not satisfied with fit, request an exchange within 7 calendar days of receipt via our customer WhatsApp.</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                <div className="text-3xl font-extrabold text-gray-900">{product.rating}</div>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Based on {product.reviewsCount} verified customer evaluations</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 bg-white border border-gray-100 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">Sara M. — Verified Buyer</span>
                    <span className="text-gray-400">2 days ago</span>
                  </div>
                  <div className="flex text-amber-400"><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /></div>
                  <p className="text-gray-600">"The fitting is impeccable! So breathable and received compliments at my work event. 10/10 recommend."</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-gray-900">
              You May Also Like
            </h3>
            <button
              onClick={() => navigateTo('catalog', product.category)}
              className="text-xs font-bold text-fuchsia-600 hover:underline uppercase"
            >
              View More in {product.category} →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h4 className="font-bold text-sm text-gray-900 uppercase">Size Guide (Inches)</h4>
              <button onClick={() => setShowSizeGuide(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 text-xs overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400">
                    <th className="py-2">Size</th>
                    <th className="py-2">Bust / Chest</th>
                    <th className="py-2">Waist</th>
                    <th className="py-2">Hips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr><td className="py-2 font-bold">XS</td><td>32 - 34"</td><td>25 - 26"</td><td>35 - 36"</td></tr>
                  <tr><td className="py-2 font-bold">S</td><td>34 - 36"</td><td>27 - 28"</td><td>37 - 38"</td></tr>
                  <tr><td className="py-2 font-bold">M</td><td>36 - 38"</td><td>29 - 30"</td><td>39 - 40"</td></tr>
                  <tr><td className="py-2 font-bold">L</td><td>38 - 40"</td><td>31 - 33"</td><td>41 - 43"</td></tr>
                  <tr><td className="py-2 font-bold">XL</td><td>40 - 43"</td><td>34 - 36"</td><td>44 - 46"</td></tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
