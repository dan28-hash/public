import { products, categories, featuredProducts } from "./mock-data";
import type { Product, Category } from "./types";

/**
 * API Abstraction Layer
 *
 * Currently returns mock data from lib/mock-data.ts.
 * When connecting to Unchained Commerce, replace the function bodies
 * with GraphQL fetch calls to NEXT_PUBLIC_GRAPHQL_URL.
 *
 * No component changes will be needed - only this file changes.
 */

// --- Products ---

export async function fetchProducts(
  categorySlug?: string
): Promise<Product[]> {
  // TODO: Replace with Unchained GraphQL query:
  // query Products($categorySlug: String) {
  //   products(tags: [$categorySlug]) {
  //     _id
  //     texts { title slug description }
  //     media { file { url } }
  //     ...
  //   }
  // }

  if (categorySlug && categorySlug !== "all") {
    return products.filter((p) => p.categorySlug === categorySlug);
  }
  return products;
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  // TODO: Replace with Unchained query for featured/tagged products
  return featuredProducts;
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  // TODO: Replace with Unchained GraphQL query:
  // query Product($slug: String!) {
  //   product(slug: $slug) { ... }
  // }

  return products.find((p) => p.slug === slug) ?? null;
}

export async function fetchRelatedProducts(
  categorySlug: string,
  excludeId: string,
  limit: number = 4
): Promise<Product[]> {
  // TODO: Replace with Unchained assortment query
  return products
    .filter((p) => p.categorySlug === categorySlug && p._id !== excludeId)
    .slice(0, limit);
}

// --- Categories ---

export async function fetchCategories(): Promise<Category[]> {
  // TODO: Replace with Unchained GraphQL query:
  // query Assortments {
  //   assortments { _id texts { title slug description } }
  // }

  return categories;
}

export async function fetchCategoryBySlug(
  slug: string
): Promise<Category | null> {
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
  // TODO: Replace with actual email service or Unchained mutation
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock success
  console.log("Contact form submitted:", data);
  return {
    success: true,
    message: "Thank you for your inquiry. We will respond within 24 hours.",
  };
}
