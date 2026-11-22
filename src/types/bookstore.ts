export type CategorySlug =
  | 'computer-science'
  | 'programming'
  | 'business-entrepreneurship'
  | 'science-technology'
  | 'novels-fiction'
  | 'islamic-books'
  | 'self-development'
  | 'education-academic';

export interface Review {
  id: string;
  reviewerName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  category: CategorySlug;
  categoryName: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  coverImage: string;
  coverAlt: string;
  description: string;
  seoDescription: string;
  highlights: string[];
  isbn: string;
  publisher: string;
  pages: number;
  language: string;
  binding: 'Hardcover' | 'Paperback';
  edition: string;
  inStock: boolean;
  popularityScore: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isSpecialOffer: boolean;
  reviews: Review[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  shortTitle: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
  imageAlt: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  city: string;
  quote: string;
}

export interface DemoOrder {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'bank';
  items: {
    id: string;
    title: string;
    author: string;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  promoCode?: string;
}
