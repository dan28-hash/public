import type { Metadata } from "next";
import HeroSection from "@/components/hero-section";
import ProductCard from "@/components/product-card";
import CategoryFilter from "@/components/category-filter";
import { fetchProducts, fetchCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the complete Ningbo Siyang industrial power tools catalog. Drills, saws, grinders, sanders, impact tools, and combo kits available for B2B wholesale.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    fetchProducts(category),
    fetchCategories(),
  ]);

  return (
    <>
      <HeroSection
        title="Product"
        highlight="Catalog"
        subtitle="Browse our complete range of professional industrial power tools. Filter by category to find exactly what you need."
        showCta={false}
        compact
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={category || "all"}
          />

          {/* Results count */}
          <p className="mb-8 text-sm text-text-muted">
            Showing {products.length} product{products.length !== 1 ? "s" : ""}
            {category && category !== "all" && (
              <>
                {" "}
                in{" "}
                <span className="text-accent">
                  {categories.find((c) => c.slug === category)?.title ??
                    category}
                </span>
              </>
            )}
          </p>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-text-secondary">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
