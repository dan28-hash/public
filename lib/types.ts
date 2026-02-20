export interface Product {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  imageUrl: string;
  images: string[];
  specs: Record<string, string>;
  moq: number;
  tags: string[];
  featured: boolean;
}

export interface Category {
  _id: string;
  slug: string;
  title: string;
  description: string;
  productCount: number;
  imageUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  role: "customer" | "admin";
}

export interface AuthSession {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
  };
  phone: string;
  email: string;
  website: string;
}

// --- Quote System ---

export type QuoteStatus = "draft" | "submitted" | "reviewed" | "accepted" | "rejected";

export interface QuoteItem {
  productId: string;
  slug: string;
  title: string;
  quantity: number;
  imageUrl: string;
  moq: number;
}

export interface Quote {
  _id: string;
  items: QuoteItem[];
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  notes: string;
  userId: string;
  userName: string;
  userCompany: string;
  userEmail: string;
  internalNotes?: string;
}

// --- Orders ---

export type OrderStatus = "processing" | "confirmed" | "production" | "shipped" | "delivered";

export interface Order {
  _id: string;
  quoteId: string;
  status: OrderStatus;
  createdAt: string;
  items: QuoteItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

// --- Chat ---

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

// --- Admin Analytics ---

export interface AnalyticsSummary {
  totalQuotes: number;
  totalCustomers: number;
  totalProducts: number;
  quotesThisMonth: number;
  topProducts: { title: string; quoteCount: number }[];
  quotesByMonth: { month: string; count: number }[];
  customersByRegion: { region: string; count: number }[];
}

// --- Team ---

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  imageUrl: string;
}

// --- Certification ---

export interface Certification {
  _id: string;
  name: string;
  description: string;
  issuer: string;
  validUntil: string;
  imageUrl: string;
}
