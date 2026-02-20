import { products, categories, featuredProducts, mockQuotes, mockOrders, mockTeam, mockCertifications, mockAnalytics } from "./mock-data";
import type { Product, Category, Quote, Order, QuoteItem, TeamMember, Certification, AnalyticsSummary } from "./types";

// --- Products ---

export async function fetchProducts(categorySlug?: string): Promise<Product[]> {
  if (categorySlug && categorySlug !== "all") {
    return products.filter((p) => p.categorySlug === categorySlug);
  }
  return products;
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  return featuredProducts;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function fetchRelatedProducts(categorySlug: string, excludeId: string, limit: number = 4): Promise<Product[]> {
  return products.filter((p) => p.categorySlug === categorySlug && p._id !== excludeId).slice(0, limit);
}

// --- Categories ---

export async function fetchCategories(): Promise<Category[]> {
  return categories;
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  return categories.find((c) => c.slug === slug) ?? null;
}

// --- Contact ---

export async function submitContactForm(data: {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    message: "Thank you for your inquiry. We will respond within 24 hours.",
  };
}

// --- Quotes ---

export async function submitQuote(items: QuoteItem[], userId: string, userName: string, userCompany: string, userEmail: string, notes: string): Promise<{ success: boolean; quoteId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, quoteId: "QT-" + Date.now() };
}

export async function fetchUserQuotes(userId: string): Promise<Quote[]> {
  return mockQuotes.filter((q) => q.userId === userId || userId === "user-001");
}

export async function fetchQuoteById(id: string): Promise<Quote | null> {
  return mockQuotes.find((q) => q._id === id) ?? null;
}

export async function fetchAllQuotes(): Promise<Quote[]> {
  return mockQuotes;
}

// --- Orders ---

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  return mockOrders;
}

// --- Team ---

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  return mockTeam;
}

// --- Certifications ---

export async function fetchCertifications(): Promise<Certification[]> {
  return mockCertifications;
}

// --- Analytics ---

export async function fetchAnalytics(): Promise<AnalyticsSummary> {
  return mockAnalytics;
}

// --- Brochure ---

export async function submitBrochureRequest(data: {
  name: string;
  email: string;
  company: string;
  phone?: string;
}): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    message: "Your brochure download link has been sent to your email.",
  };
}
