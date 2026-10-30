import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ToastMessage, Order, PageView } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  pageView: PageView;
  selectedProduct: Product | null;
  selectedCategory: string | null;
  searchQuery: string;
  isSearchOpen: boolean;
  isCartDrawerOpen: boolean;
  quickViewProduct: Product | null;
  toasts: ToastMessage[];
  couponCode: string;
  discountPercentage: number;
  orders: Order[];
  
  // Actions
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, size: string, color: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  openProductDetail: (product: Product) => void;
  navigateTo: (page: PageView, category?: string | null, search?: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  cartTotalCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartFinalTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('faria_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: PRODUCTS[0],
          quantity: 1,
          selectedSize: 'M',
          selectedColor: PRODUCTS[0].colors[0]?.name || 'Default'
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('faria_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1], PRODUCTS[7]];
    } catch {
      return [];
    }
  });

  const [pageView, setPageView] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [couponCode, setCouponCode] = useState('FARIA10');
  const [discountPercentage, setDiscountPercentage] = useState(10); // Default 10% promo active
  
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('faria_orders');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'FC-89241',
          date: '2026-10-24',
          items: [
            {
              product: PRODUCTS[1],
              quantity: 1,
              selectedSize: 'M',
              selectedColor: 'Lilac Mist'
            }
          ],
          subtotal: 899,
          discount: 90,
          shipping: 0,
          total: 809,
          status: 'Dispatched',
          shippingAddress: {
            fullName: 'Amina Tariq',
            email: 'amina.t@example.com',
            phone: '+92 300 1234567',
            address: 'House 42, Street 8, Sector F-7/2',
            city: 'Islamabad',
            postalCode: '44000'
          },
          paymentMethod: 'Cash on Delivery'
        }
      ];
    } catch {
      return [];
    }
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('faria_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('faria_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('faria_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0]?.name || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize && item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedSize: chosenSize, selectedColor: chosenColor }];
      }
    });

    addToast(`Added to cart!`, `${product.name} (${chosenSize}) added.`, 'success');
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (item.product.id !== productId) return true;
        if (size && item.selectedSize !== size) return true;
        if (color && item.selectedColor !== color) return true;
        return false;
      })
    );
    addToast('Item removed', 'Product removed from your cart.', 'info');
  };

  const updateQuantity = (productId: string, size: string, color: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size && item.selectedColor === color) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast('Removed from wishlist', product.name, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast('Added to wishlist', `${product.name} saved for later.`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setPageView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: PageView, category: string | null = null, search = '') => {
    setPageView(page);
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    if (search !== undefined) {
      setSearchQuery(search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FARIA10') {
      setCouponCode('FARIA10');
      setDiscountPercentage(10);
      addToast('Coupon Applied!', '10% discount applied to your order.', 'success');
      return true;
    } else if (clean === 'FARIA20' || clean === 'SPECIAL20') {
      setCouponCode('FARIA20');
      setDiscountPercentage(20);
      addToast('Special 20% Applied!', 'VIP 20% discount applied.', 'success');
      return true;
    } else if (clean === 'FREESHIP') {
      setCouponCode('FREESHIP');
      setDiscountPercentage(5);
      addToast('Free Shipping Code Applied!', 'Enjoy free express shipping.', 'success');
      return true;
    } else {
      addToast('Invalid Coupon Code', 'Try using code FARIA10 for 10% off.', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercentage(0);
    addToast('Coupon removed', undefined, 'info');
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `FC-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Order Placed'
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast('Order Placed Successfully! 🎉', `Order ID: ${newOrder.id}`, 'success');
    return newOrder;
  };

  // Cart math
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = Math.round((cartSubtotal * discountPercentage) / 100);
  // Free shipping above PKR 999
  const cartShipping = cartSubtotal >= 999 || couponCode === 'FREESHIP' || cartSubtotal === 0 ? 0 : 150;
  const cartFinalTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        pageView,
        selectedProduct,
        selectedCategory,
        searchQuery,
        isSearchOpen,
        isCartDrawerOpen,
        quickViewProduct,
        toasts,
        couponCode,
        discountPercentage,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        openProductDetail,
        navigateTo,
        applyCoupon,
        removeCoupon,
        placeOrder,
        addToast,
        removeToast,
        setIsSearchOpen,
        setIsCartDrawerOpen,
        setQuickViewProduct,
        setSearchQuery,
        setSelectedCategory,
        cartTotalCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartFinalTotal
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
