import { Product, CategoryItem, Testimonial, InstagramPost } from '../types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'dresses',
    name: 'Dresses',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    count: 48,
    bgColor: '#f3e8ff', // soft lilac
  },
  {
    id: 'tops',
    name: 'Tops',
    slug: 'Tops',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    count: 36,
    bgColor: '#fce7f3', // soft pink
  },
  {
    id: 'ethnic-wear',
    name: 'Ethnic Wear',
    slug: 'Ethnic Wear',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    count: 29,
    bgColor: '#fef3c7', // soft warm amber
  },
  {
    id: 'jeans',
    name: 'Jeans',
    slug: 'Jeans',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    count: 24,
    bgColor: '#e0f2fe', // soft sky blue
  },
  {
    id: 'activewear',
    name: 'Activewear',
    slug: 'Activewear',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    count: 18,
    bgColor: '#f3e8ff', // soft violet
  },
  {
    id: 'co-ord-sets',
    name: 'Co-Ord Sets',
    slug: 'Co-Ord Sets',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    count: 32,
    bgColor: '#ffe4e6', // soft rose
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    count: 54,
    bgColor: '#ffedd5', // soft peach
  },
];

export const PRODUCTS: Product[] = [
  // TRENDING NOW (Exact items from the reference image)
  {
    id: 'fc-101',
    name: 'Floral Maxi Dress',
    category: 'Dresses',
    price: 1499,
    originalPrice: 2499,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 250,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Floral Rose', hex: '#f43f5e' },
      { name: 'Blush Pink', hex: '#fbcfe8' },
      { name: 'Sage Green', hex: '#a7f3d0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A timeless silhouette adorned with delicate vintage floral motifs, an airy tier flounce hem, and an adjustable cinched waist for effortless elegance.',
    fabricDetails: '100% Breathable Chiffon Georgette, fully lined with soft modal cotton.',
    inStock: true
  },
  {
    id: 'fc-102',
    name: 'Linen Oversized Shirt',
    category: 'Tops',
    price: 899,
    originalPrice: 1400,
    discountPercent: 35,
    rating: 4.7,
    reviewsCount: 180,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Lilac Mist', hex: '#c084fc' },
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Sky Azure', hex: '#93c5fd' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Tailored with relaxed dropped shoulders and shell buttons, this breathable pure linen shirt offers easy layering from day to evening.',
    fabricDetails: '100% Pure Organic French Linen.',
    inStock: true
  },
  {
    id: 'fc-103',
    name: 'Cotton Co-ord Set',
    category: 'Co-Ord Sets',
    price: 1799,
    originalPrice: 2299,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 170,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Coral Sunset', hex: '#fb7185' },
      { name: 'Peach Sorbet', hex: '#fdba74' },
      { name: 'Terracotta', hex: '#ea580c' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A two-piece structured co-ord featuring a collared cropped jacket with utility patch pockets and matching high-waisted relaxed trousers.',
    fabricDetails: 'Premium Pre-washed 100% Khadi Cotton.',
    inStock: true
  },
  {
    id: 'fc-104',
    name: 'Ruffle Sleeve Top',
    category: 'Tops',
    price: 699,
    originalPrice: 1299,
    discountPercent: 30,
    rating: 4.6,
    reviewsCount: 145,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Chantilly White', hex: '#fdfbf7' },
      { name: 'Midnight Onyx', hex: '#1e293b' }
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Chic flutter cap sleeves with delicate pin-tuck details along the V-neckline. Pairs flawlessly with denim or tailored culottes.',
    fabricDetails: 'Soft Cotton Poplin with subtle stretch.',
    inStock: true
  },
  {
    id: 'fc-105',
    name: 'High Waist Jeans',
    category: 'Jeans',
    price: 1299,
    originalPrice: 1999,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 230,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Classic Indigo', hex: '#1e3a8a' },
      { name: 'Washed Azure', hex: '#60a5fa' },
      { name: 'Vintage Black', hex: '#334155' }
    ],
    sizes: ['26', '28', '30', '32', '34'],
    description: 'Sculpting high-rise fit with a clean straight-leg cut. Engineered with 2% elastane for shape retention and all-day comfort.',
    fabricDetails: '98% Cotton Denim, 2% Elastane.',
    inStock: true
  },
  {
    id: 'fc-106',
    name: 'Wrap Midi Dress',
    category: 'Dresses',
    price: 1499,
    originalPrice: 2299,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 154,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#f43f5e' },
      { name: 'Lavender Blush', hex: '#d8b4fe' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Flattering surplice wrap bodice with an authentic self-tie sash at the side waist and romantic tulip hemline.',
    fabricDetails: 'Silky Rayon Crepe with fluid drape.',
    inStock: true
  },
  {
    id: 'fc-107',
    name: 'Knitted Tank Top',
    category: 'Tops',
    price: 749,
    originalPrice: 999,
    discountPercent: 25,
    rating: 4.5,
    reviewsCount: 88,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Alabaster Ivory', hex: '#f8fafc' },
      { name: 'Warm Taupe', hex: '#d7ccc8' },
      { name: 'Sage', hex: '#bbf7d0' }
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Fine ribbed knit tank with square neckline and wide bra-friendly shoulder straps.',
    fabricDetails: 'Combed Viscose-Cotton Blend.',
    inStock: true
  },
  {
    id: 'fc-108',
    name: 'Palazzo Pants',
    category: 'Ethnic Wear',
    price: 699,
    originalPrice: 1200,
    discountPercent: 30,
    rating: 4.7,
    reviewsCount: 102,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Peach Bloom', hex: '#fed7aa' },
      { name: 'Pearl Cream', hex: '#fef08a' }
    ],
    sizes: ['Free Size', 'Plus Size'],
    description: 'Extra wide flare palazzos with deep slash pockets and an elasticated waistband with beaded tassels.',
    fabricDetails: 'Pure Cotton Mulmul.',
    inStock: true
  },

  // NEW ARRIVALS (Items with "NEW" badge from reference image)
  {
    id: 'fc-201',
    name: 'Embroidered Kurta Set',
    category: 'Ethnic Wear',
    price: 1799,
    originalPrice: 2499,
    discountPercent: 28,
    rating: 4.9,
    reviewsCount: 42,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Golden Marigold', hex: '#f59e0b' },
      { name: 'Crimson Silk', hex: '#be123c' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Intricately embroidered neckline with zari mirror work accents, paired with tailored cigarette pants and organza dupatta.',
    fabricDetails: 'Handloom Chanderi Silk with cotton silk pants.',
    inStock: true
  },
  {
    id: 'fc-202',
    name: 'Satin Slip Dress',
    category: 'Dresses',
    price: 1299,
    originalPrice: 1899,
    discountPercent: 32,
    rating: 4.8,
    reviewsCount: 65,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#fef08a' },
      { name: 'Emerald', hex: '#065f46' },
      { name: 'Noir', hex: '#0f172a' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Cut on the bias for an iconic 90s silhouette that skims curves effortlessly with adjustable spaghetti straps.',
    fabricDetails: 'Heavyweight Lustrous Charmeuse Satin.',
    inStock: true
  },
  {
    id: 'fc-203',
    name: 'Printed Kaftan',
    category: 'Ethnic Wear',
    price: 1399,
    originalPrice: 1999,
    discountPercent: 30,
    rating: 4.7,
    reviewsCount: 38,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Olive Bohemian', hex: '#3f6212' },
      { name: 'Indigo Flora', hex: '#1e3a8a' }
    ],
    sizes: ['Free Size'],
    description: 'Resort-ready printed kaftan with drawstring waist ties tipped in metallic hardware.',
    fabricDetails: '100% Breathable Silk-Cotton Modal.',
    inStock: true
  },
  {
    id: 'fc-204',
    name: 'Pleated Skirt',
    category: 'Dresses',
    price: 1199,
    originalPrice: 1699,
    discountPercent: 29,
    rating: 4.6,
    reviewsCount: 51,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Mocha Rose', hex: '#a8a29e' },
      { name: 'Forest Green', hex: '#14532d' }
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Permanent accordion knife pleats that catch the light with every step. Metallic lurex elastic waistband.',
    fabricDetails: 'Poly Georgette with shimmering sheen.',
    inStock: true
  },
  {
    id: 'fc-205',
    name: 'Lace Top',
    category: 'Tops',
    price: 1099,
    originalPrice: 1599,
    discountPercent: 31,
    rating: 4.8,
    reviewsCount: 47,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Snow Lace', hex: '#ffffff' },
      { name: 'Onyx Lace', hex: '#09090b' }
    ],
    sizes: ['S', 'M', 'L'],
    description: 'High-neck Victorian inspired lace blouse with scalloped cuffs and mother-of-pearl buttons.',
    fabricDetails: 'Corded French Guipure Lace.',
    inStock: true
  },
  {
    id: 'fc-206',
    name: 'White Co-ord Set',
    category: 'Co-Ord Sets',
    price: 1799,
    originalPrice: 2499,
    discountPercent: 28,
    rating: 4.9,
    reviewsCount: 78,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Porcelain White', hex: '#ffffff' },
      { name: 'Oatmeal Heather', hex: '#e7e5e4' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Clean minimalist aesthetic featuring an unstructured wrap top paired with wide culotte trousers.',
    fabricDetails: 'Heavyweight Textured Crepe.',
    inStock: true
  },
  {
    id: 'fc-207',
    name: 'Denim Jacket',
    category: 'Tops',
    price: 1399,
    originalPrice: 2199,
    discountPercent: 36,
    rating: 4.8,
    reviewsCount: 92,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Vintage Acid Wash', hex: '#93c5fd' },
      { name: 'Dark Indigo', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Authentic 90s boxy silhouette with custom silver logo buttons and dual chest flap pockets.',
    fabricDetails: '100% Rigid Ring-Spun Denim Cotton.',
    inStock: true
  },
  {
    id: 'fc-208',
    name: 'Blazer Co-ord Set',
    category: 'Co-Ord Sets',
    price: 2199,
    originalPrice: 3200,
    discountPercent: 31,
    rating: 5.0,
    reviewsCount: 115,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Lilac Lavender', hex: '#c084fc' },
      { name: 'Dusty Sage', hex: '#86efac' },
      { name: 'Midnight Charcoal', hex: '#1e293b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'The iconic hero look! Single-breasted peak lapel tailored lilac blazer with matching high-rise wide leg trousers.',
    fabricDetails: 'Poly-Viscose Tailoring Twill with satin lining.',
    inStock: true
  },

  // BEST SELLERS
  {
    id: 'fc-301',
    name: 'Floral Dress',
    category: 'Dresses',
    price: 1299,
    originalPrice: 1899,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 99,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85'],
    colors: [{ name: 'Coral Floral', hex: '#fb7185' }],
    sizes: ['S', 'M', 'L'],
    description: 'Romantic vintage blossom print dress designed with smocked back bodice and flutter sleeves.',
    fabricDetails: 'Georgette Silk Blend.',
    inStock: true
  },
  {
    id: 'fc-302',
    name: 'Denim Jacket Luxe',
    category: 'Tops',
    price: 1299,
    originalPrice: 1999,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 75,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85'],
    colors: [{ name: 'Deep Indigo', hex: '#1e3a8a' }],
    sizes: ['S', 'M', 'L'],
    description: 'Timeless trucker cut with reinforced contrast top-stitching and antiqued brass shank buttons.',
    fabricDetails: '100% Cotton Denim.',
    inStock: true
  },
  {
    id: 'fc-303',
    name: 'A-Line Midi Dress',
    category: 'Dresses',
    price: 1499,
    originalPrice: 2199,
    discountPercent: 28,
    rating: 4.9,
    reviewsCount: 110,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85'],
    colors: [{ name: 'Rose Petal', hex: '#fda4af' }],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'An universally flattering silhouette with structured fit-and-flare cut and functional side pockets.',
    fabricDetails: 'Modal Cotton Blend.',
    inStock: true
  },
  {
    id: 'fc-304',
    name: 'Co-ord Set Rust',
    category: 'Co-Ord Sets',
    price: 1699,
    originalPrice: 2499,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 95,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'],
    colors: [{ name: 'Terracotta Rust', hex: '#ea580c' }],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Earth-tone luxury co-ord set featuring high-waisted cigarette pants and a belted trench tunic.',
    fabricDetails: 'Heavy Linen Blend.',
    inStock: true
  },

  // ACCESSORIES & EXTRA LIFESTYLE
  {
    id: 'fc-401',
    name: 'Saffiano Leather Tote',
    category: 'Accessories',
    price: 2499,
    originalPrice: 3500,
    discountPercent: 29,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'],
    colors: [{ name: 'Camel Tan', hex: '#b45309' }, { name: 'Onyx', hex: '#09090b' }],
    sizes: ['One Size'],
    description: 'Structured genuine Saffiano leather tote with gold-plated hardware, top zip closure, and padded 14-inch laptop compartment.',
    fabricDetails: '100% Genuine Full-grain Saffiano Leather.',
    inStock: true
  },
  {
    id: 'fc-402',
    name: 'Ribbed Seamless Active Set',
    category: 'Activewear',
    price: 1599,
    originalPrice: 2200,
    discountPercent: 27,
    rating: 4.8,
    reviewsCount: 79,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=85',
    images: ['https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85'],
    colors: [{ name: 'Charcoal Black', hex: '#18181b' }, { name: 'Lilac', hex: '#c084fc' }],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'High-compression 4-way stretch seamless sports bra with removable cups paired with high-waist squat-proof cycling tights.',
    fabricDetails: '78% Polyamide, 22% Spandex.',
    inStock: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Priya S.',
    rating: 5,
    comment: 'Amazing quality and fit. The Lilac Blazer Co-ord perfectly matched the photos! My new go-to for wardrobe essentials.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    verified: true,
    location: 'Lahore'
  },
  {
    id: 'test-2',
    name: 'Neha K.',
    rating: 5,
    comment: 'Super fast delivery and beautiful luxury packaging. Highly recommended! The linen shirt is so breathable and soft.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    verified: true,
    location: 'Karachi'
  },
  {
    id: 'test-3',
    name: 'Anjali R.',
    rating: 5,
    comment: 'Trendy styles at unbelievable prices. My entire wardrobe is now FARIA COLLECTIONS. The fabric quality is so premium!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
    verified: true,
    location: 'Islamabad'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    likes: 1420,
    comments: 86,
    caption: 'Golden hour in our signature FARIA terracotta co-ord ✨',
    handle: '@fariacollections'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    likes: 2100,
    comments: 112,
    caption: 'Effortless florals for weekend brunch 🌸 #FariaStyle',
    handle: '@fariacollections'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=600&q=80',
    likes: 980,
    comments: 45,
    caption: 'Linen minimalism on repeat. Tag someone who loves relaxed fits 🤍',
    handle: '@fariacollections'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    likes: 1840,
    comments: 94,
    caption: 'Denim that fits like it was made just for you 👖',
    handle: '@fariacollections'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    likes: 3200,
    comments: 180,
    caption: 'Festive elegance meets modern craftsmanship 💛',
    handle: '@fariacollections'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
    likes: 2450,
    comments: 130,
    caption: 'Silk & satin evenings. What color would you wear? 🥂',
    handle: '@fariacollections'
  },
  {
    id: 'ig-7',
    image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=600&q=80',
    likes: 1690,
    comments: 72,
    caption: 'Monochrome perfection with our modern white edit 🕊️',
    handle: '@fariacollections'
  },
  {
    id: 'ig-8',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    likes: 2890,
    comments: 164,
    caption: 'Lilac power suiting for fearless days 💜 #FariaPower',
    handle: '@fariacollections'
  }
];

export const SUB_BRANDS = [
  'FARIA STUDIO',
  'FARIA EDIT',
  'FARIA PREMIUM',
  'FARIA SELECT',
  'FARIA ESSENTIALS',
  'FARIA LUXE'
];
