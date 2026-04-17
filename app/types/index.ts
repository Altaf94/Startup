// Menu Item Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  allergens?: string[];
  preparationTime?: string;
   imageWidth?: number;
  imageHeight?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Cart Types
export interface CartItem extends MenuItem {
  quantity: number;
  specialInstructions?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

// Order Types
export type OrderStatus = 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'dispatched' 
  | 'delivered' 
  | 'cancelled';

export type DeliveryType = 'delivery';

export type PaymentMethod = 
  | 'credit_card' 
  | 'debit_card' 
  | 'wallet' 
  | 'cod';

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  description: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zipCode?: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerDetails;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  timeline: OrderTimeline[];
  subtotal: number;
  tax?: number;
  deliveryFee: number;
  discount: number;
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
}

// Testimonial Type
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  dish?: string;
}

// Offer Type
export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  image: string;
  terms: string[];
}

// Branch Location Type
export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// FAQ Type
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Contact Form Type
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// SEO Types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
}
