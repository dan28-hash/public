import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package, Layers } from "lucide-react";
import AddToQuote from "@/components/add-to-quote";
import ProductCard from "@/components/product-card";
import SectionHeader from "@/components/section-header";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { fetchProductBySlug, fetchRelatedProducts } from "@/lib/api";
import { getSession } from "@/lib/auth";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | Ningbo Siyang`,
      description: product.description,
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const [session, relatedProducts] = await Promise.all([
    getSession(),
    fetchRelatedProducts(product.categorySlug, product._id),
  ]);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border-primary bg-bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4">
          <Link href="/products" className="flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-secondary">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Products</span>
          </Link>
          <span className="text-xs text-text-muted">/</span>
          <Link href={`/products?category=${product.categorySlug}`} className="text-xs text-text-muted transition-colors hover:text-text-secondary">
            {product.category}
          </Link>
          <span className="text-xs text-text-muted">/</span>
          <span className="text-xs text-text-secondary">{product.title}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <FadeIn direction="left">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border-primary bg-bg-card">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </FadeIn>

            {/* Details */}
            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col">
                <span className="mb-2 text-xs font-bold tracking-widest uppercase text-accent">
                  {product.category}
                </span>
                <h1 className="text-2xl font-bold uppercase tracking-tight text-text-primary md:text-3xl">
                  {product.title}
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {product.description}
                </p>

                {/* MOQ Badge */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-md border border-border-accent bg-accent-muted px-4 py-2.5">
                    <Package className="h-4 w-4 text-accent" />
                    <span className="text-xs text-text-muted">MOQ:</span>
                    <span className="text-sm font-bold text-accent">
                      50 units
                    </span>
                  </div>
                  <span className="text-[10px] text-text-muted">
                    Suggested: {product.moq}+ units
                  </span>
                </div>

                {/* Specs Table */}
                <div className="mt-8">
                  <div className="mb-3 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-accent" />
                    <h2 className="text-xs font-bold tracking-widest uppercase text-accent">
                      Technical Specifications
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border-primary bg-border-primary">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex flex-col bg-bg-card px-4 py-3">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-text-muted">{key}</span>
                        <span className="mt-0.5 text-sm text-text-primary">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="rounded bg-bg-elevated px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Add to Quote CTA */}
                <div className="mt-8">
                  <AddToQuote product={product} isAuthenticated={session.isAuthenticated} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border-primary bg-bg-card py-16">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <SectionHeader label="Related Products" title="You May Also Need" />
            </FadeIn>
            <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rp) => (
                <StaggerItem key={rp._id}>
                  <ProductCard product={rp} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}
    </>
  );
}
