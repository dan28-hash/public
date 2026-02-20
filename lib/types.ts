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
