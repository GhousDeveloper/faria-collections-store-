export interface Product {
  id: string;
  name: string;
  category: 'Dresses' | 'Tops' | 'Ethnic Wear' | 'Jeans' | 'Activewear' | 'Co-Ord Sets' | 'Accessories';
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  tag?: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  fabricDetails: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
  bgColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  verified: boolean;
  location: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  handle: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  status: 'Order Placed' | 'Processing' | 'Dispatched' | 'Delivered';
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'error';
}

export type PageView = 'home' | 'catalog' | 'product-detail' | 'cart' | 'checkout' | 'wishlist' | 'account';
